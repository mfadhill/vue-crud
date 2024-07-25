<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Tambah Produk</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">
          Nama Produk
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
          Harga Produk
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
          Kuantitas
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
          Kategori
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "addProduct",

  data() {
    return {
      product: {
        name: "",
        price: null, // Inisialisasi sebagai null, karena akan diubah menjadi float di handleSubmit
        quantity: null, // Inisialisasi sebagai null, karena akan diubah menjadi integer di handleSubmit
        category_id: null, // Inisialisasi sebagai null
      },
    };
  },

  computed: {
    ...mapGetters(["loading", "error"]),
  },

  methods: {
    ...mapActions(["fetchCategories", "createProduct"]),

    async handleSubmit() {
      const productToSubmit = {
        ...this.product,
        price: parseFloat(this.product.price), // Konversi menjadi float
        quantity: parseInt(this.product.quantity, 10), // Konversi menjadi integer
      };

      try {
        await this.createProduct(productToSubmit);
        this.$router.push({ name: "ProductList" }); // Arahkan ke daftar produk setelah berhasil
      } catch (error) {
        if (error.graphQLErrors) {
          // Kesalahan dari server GraphQL
          console.error("GraphQL Errors:", error.graphQLErrors);
        }
        if (error.networkError) {
          // Kesalahan jaringan
          console.error("Network Error:", error.networkError);
        }
        console.error("Terjadi kesalahan:", error.message);
      }
    },
  },

  async mounted() {
    await this.fetchCategories();
  },
};
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
