<!-- src/components/CategoryForm.vue -->
<template>
    <div>
      <h3>{{ category ? 'Edit' : 'Tambah' }} Kategori</h3>
      <form @submit.prevent="saveCategory">
        <input v-model="form.name" type="text" placeholder="Nama Kategori" required />
        <input v-model="form.parent_id" type="number" placeholder="ID Induk" />
        <button type="submit">{{ category ? 'Update' : 'Create' }}</button>
        <button type="button" @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    props: {
      category: Object,
    },
    data() {
      return {
        form: this.category ? { ...this.category } : { name: '', parent_id: null },
      };
    },
    methods: {
      ...mapActions(['createCategory', 'updateCategory']),
      async saveCategory() {
        if (this.category) {
          await this.updateCategory({ id: this.category.id, updates: this.form });
        } else {
          await this.createCategory(this.form);
        }
        this.$emit('close');
      }
    }
  };
  </script>
  