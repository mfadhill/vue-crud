<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      products: state => state.products,
      loading: state => state.loading,
      error: state => state.error,
    }),
  },
  methods: {
    ...mapActions([
      'fetchProducts',
      'updateProduct',
      'deleteProduct',
    ]),
    async editProduct(product) {
      const name = prompt('New name:', product.name);
      const price = prompt('New price:', product.price);
      const quantity = prompt('New quantity:', product.quantity);
      const category_id = prompt('New category ID:', product.category_id);

      if (name && !isNaN(price) && !isNaN(quantity) && !isNaN(category_id)) {
        const updates = {
          name: name.trim(),
          price: parseFloat(price),
          quantity: parseInt(quantity),
          category_id: parseInt(category_id),
        };
        try {
          await this.updateProduct({ id: product.id, ...updates });
          alert('Product updated successfully.');
        } catch (error) {
          alert('Error updating product.');
        }
      } else {
        alert('Please provide valid values.');
      }
    },
    async deleteProduct(id) {
      if (confirm('Are you sure you want to delete this product?')) {
        try {
          await this.deleteProduct(id);
          alert('Product deleted successfully.');
        } catch (error) {
          alert('Error deleting product.');
        }
      }
    },
  },
  async created() {
    await this.fetchProducts();
  },
};
</script>
