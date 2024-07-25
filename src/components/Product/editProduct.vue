<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Tambah Produk</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          v-model="product.name"
          id="name"
          type="text"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div class="mb-4">
        <label for="price" class="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          v-model.number="product.price"
          id="price"
          type="number"
          step="0.01"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div class="mb-4">
        <label for="quantity" class="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          v-model.number="product.quantity"
          id="quantity"
          type="number"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div class="mb-4">
        <label
          for="category_id"
          class="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <input
          v-model.number="product.category_id"
          id="category_id"
          type="number"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
        :disabled="loading"
      >
        {{ loading ? "Menyimpan..." : "Simpan" }}
      </button>

      <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EditProduct",

  data() {
    return {
      product: {
        name: "",
        price: null,
        quantity: null,
        category_id: null,
      },
    };
  },

  computed: {
    productId() {
      return parseInt(this.$route.params.id, 10);
    },
    ...mapGetters(["loading", "error"]),
  },

  methods: {
    ...mapActions(["updateProduct"]),

    async handleSubmit() {
      try {
        await this.updateProduct(this.product);
        this.$router.push({ name: "ProductList" });
      } catch (error) {
        if (error.graphQLErrors) {
          console.error("GraphQL Errors:", error.graphQLErrors);
        }
        if (error.networkError) {
          console.error("Network Error:", error.networkError);
        }
        console.error("Terjadi kesalahan:", error.message);
      }
    },
  },

  async mounted() {
    try {
      const productId = this.productId;

      if (isNaN(productId)) {
        throw new Error("ID produk tidak valid");
      }

      console.log("Fetching product with ID:", productId);

      const { data } = await this.$apollo.query({
        query: gql`
          query GetProduct($id: Int!) {
            product_by_pk(id: $id) {
              id
              name
              price
              quantity
              category_id
            }
          }
        `,
        variables: { id: productId },
      });

      console.log("Product data fetched:", data);

      if (data.product_by_pk) {
        this.product = data.product_by_pk;
      } else {
        console.error("No product data found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
};
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
