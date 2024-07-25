<!-- src/components/ProductForm.vue -->
<template>
    <div>
      <h3>{{ product ? 'Edit' : 'Tambah' }} Produk</h3>
      <form @submit.prevent="saveProduct">
        <input v-model="form.name" type="text" placeholder="Nama Produk" required />
        <input v-model="form.price" type="number" step="0.01" placeholder="Harga" required />
        <input v-model="form.quantity" type="number" placeholder="Jumlah" required />
        <input v-model="form.category_id" type="number" placeholder="ID Kategori" required />
        <button type="submit">{{ product ? 'Update' : 'Create' }}</button>
        <button type="button" @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    props: {
      product: Object,
    },
    data() {
      return {
        form: this.product ? { ...this.product } : { name: '', price: '', quantity: '', category_id: '' },
      };
    },
    methods: {
      ...mapActions(['createProduct', 'updateProduct']),
      async saveProduct() {
        if (this.product) {
          await this.updateProduct({ id: this.product.id, updates: this.form });
        } else {
          await this.createProduct(this.form);
        }
        this.$emit('close');
      }
    }
  };
  </script>
  