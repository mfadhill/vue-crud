<template>
  <div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">
      <p>Error: {{ error }}</p>
    </div>

    <div v-if="!loading && !error">
      <h1 class="text-2xl font-bold mb-4">Categories</h1>
      <div class="overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead class="bg-blue-400">
            <tr>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">No</th>
              <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
              <th scope="col" class="px-6 pl-10 py-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            <tr v-for="(category, index) in paginatedCategories" :key="category.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td class="px-6 py-4">{{ category.name }}</td>
              <td class="px-6 py-4">
                <div class="flex justify-center gap-4">
                  <button @click="openEditModal(category)" type="button" class="text-blue-500 hover:text-blue-700">
                    <!-- Edit Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  
                  <button @click="deleteCategory(category.id)" type="button" class="text-red-500 hover:text-red-700">
                    <!-- Delete Icon -->
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
      <div class="flex justify-between items-center mt-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Next</button>
      </div>
    </div>

    <!-- Modal Form for Editing Category -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h2 class="text-lg font-semibold mb-4">Edit Category</h2>
        <form @submit.prevent="submitEdit">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="editForm.name" type="text" id="name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
          </div>
          <div class="mb-4">
            <label for="parent_id" class="block text-sm font-medium text-gray-700">Parent ID</label>
            <input v-model="editForm.parent_id" type="number" id="parent_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
          </div>
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
            <button type="submit" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Save</button>
          </div>
        </form>
      </div>
      <div class="fixed inset-0 bg-gray-500 opacity-50"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
      showModal: false,
      editForm: {
        id: null,
        name: '',
        parent_id: null,
      },
    };
  },
  computed: {
    ...mapState(['categories', 'loading', 'error']),
    totalPages() {
      return Math.ceil(this.categories.length / this.itemsPerPage);
    },
    paginatedCategories() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.categories.slice(start, end);
    },
  },
  methods: {
    ...mapActions([
      'fetchCategories', 
      'updateCategory', 
      'deleteCategory'
    ]),
    openEditModal(category) {
      this.editForm = { ...category };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editForm = { id: null, name: '', parent_id: null };
    },
    async submitEdit() {
      if (this.editForm.name && !isNaN(this.editForm.parent_id)) {
        try {
          await this.updateCategory(this.editForm);
          this.closeModal();
        } catch (error) {
          console.error('Failed to update category:', error);
          alert('Failed to update category.');
        }
      } else {
        alert('Please provide valid values.');
      }
    },
    deleteCategory(id) {
      if (confirm('Are you sure you want to delete this category?')) {
        this.deleteCategory(id);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>

<style scoped>
.loading {
  font-size: 1.5em;
  color: #007bff;
}

.error {
  color: red;
  font-size: 1.2em;
}

button {
  margin-left: 10px;
}
</style>
