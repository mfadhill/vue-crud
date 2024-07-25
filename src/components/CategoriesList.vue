<template>
  <div>
    <h1>Categories</h1>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }} (Parent ID: {{ category.parent_id }})
        <button @click="editCategory(category)">Edit</button>
        <button @click="deleteCategory(category.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
  },
  methods: {
    editCategory(category) {
      const name = prompt('New name:', category.name);
      const parent_id = prompt('New parent ID:', category.parent_id);

      if (name && parent_id && !isNaN(parent_id)) {
        const updates = {
          name: name.trim(),
          parent_id: parseInt(parent_id),
        };
        this.$emit('update-category', { id: category.id, ...updates });
      } else {
        alert('Please provide valid values.');
      }
    },
    deleteCategory(id) {
      if (confirm('Are you sure you want to delete this category?')) {
        this.$emit('delete-category', id);
      }
    },
  },
};
</script>
