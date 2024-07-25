<template>
  <div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">
      <p>Error: {{ error }}</p>
    </div>
    <div v-if="!loading && !error">
      <h1 class="text-2xl font-bold mb-4">Products</h1>
      <div class="overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-blue-400">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">No</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Price</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Quantity</th>
              <th scope="col" class="px-6 pl-10 py-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            <tr v-for="(product, index) in products" :key="product.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              <td class="px-6 py-4">{{ product.name }}</td>
              <td class="px-6 py-4">{{ product.price }}</td>
              <td class="px-6 py-4">{{ product.quantity }}</td>
              <td class="px-6 py-4">
                <div class="flex justify-center gap-4 mr-10">
                  <button @click="editProduct(product)" type="button" class="text-blue-500 hover:text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  
                  <button @click="deleteProduct(product.id)" type="button" class="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['products', 'categories', 'loading', 'error']),
  },
  methods: {
    ...mapActions([
      'fetchProducts', 
      'fetchCategories', 
      'updateProduct', 
      'deleteProduct',
      'updateCategory',
      'deleteCategory'
    ]),
    editProduct(product) {
      const name = prompt('New name:', product.name);
      const price = prompt('New price:', product.price);
      const quantity = prompt('New quantity:', product.quantity);
      const category_id = prompt('New category ID:', product.category_id);

      if (name && price && !isNaN(price) && quantity && !isNaN(quantity) && category_id && !isNaN(category_id)) {
        const updates = {
          name: name.trim(),
          price: parseFloat(price),
          quantity: parseInt(quantity),
          category_id: parseInt(category_id),
        };
        this.updateProduct({ id: product.id, ...updates });
      } else {
        alert('Please provide valid values.');
      }
    },
    deleteProduct(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        this.deleteProduct({ id });
      }
    },
    editCategory(category) {
      const name = prompt('New name:', category.name);
      const parent_id = prompt('New parent ID:', category.parent_id);

      if (name && parent_id && !isNaN(parent_id)) {
        const updates = {
          name: name.trim(),
          parent_id: parseInt(parent_id),
        };
        this.updateCategory({ id: category.id, ...updates });
      } else {
        alert('Please provide valid values.');
      }
    },
    deleteCategory(id) {
      if (confirm('Are you sure you want to delete this category?')) {
        this.deleteCategory({ id });
      }
    },
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
};
</script>

<style scoped>
/* Styling tambahan jika diperlukan */
.loading {
  text-align: center;
  padding: 20px;
}
.error {
  color: red;
  text-align: center;
  padding: 20px;
}
</style>
