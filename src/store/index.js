import { createStore } from 'vuex';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

const apolloClient = new ApolloClient({
  uri: 'https://sirefcode.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': 'jw8y3lwW7Vk4HKuROjlbs3flnrYaDsE1vkqNqhtTgv3rIo8bC655Fx6WmSZk4KvO',
    'Content-Type': 'application/json',
  },
});

const store = createStore({
  state: {
    categories: [],
    products: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchCategories({ commit }) {
      commit('SET_LOADING', true);
      try {
        const { data } = await apolloClient.query({
          query: gql`
            query GetCategories {
              categories {
                id
                name
                parent_id
              }
            }
          `,
        });
        commit('SET_CATEGORIES', data.categories);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true);
      try {
        const { data } = await apolloClient.query({
          query: gql`
            query GetProducts {
              products {
                id
                name
                price
                quantity
                category_id
              }
            }
          `,
        });
        commit('SET_PRODUCTS', data.products);
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async createCategory({ commit }, newCategory) {
      commit('SET_LOADING', true);
      try {
        await apolloClient.mutate({
          mutation: gql`
            mutation CreateCategory($name: String!, $parent_id: Int) {
              insert_categories_one(object: { name: $name, parent_id: $parent_id }) {
                id
                name
                parent_id
              }
            }
          `,
          variables: newCategory,
        });
        await this.dispatch('fetchCategories');
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async updateCategory({ commit }, { id, updates }) {
      commit('SET_LOADING', true);
      try {
        await apolloClient.mutate({
          mutation: gql`
            mutation UpdateCategory($id: Int!, $name: String, $parent_id: Int) {
              update_categories_by_pk(pk_columns: { id: $id }, _set: { name: $name, parent_id: $parent_id }) {
                id
                name
                parent_id
              }
            }
          `,
          variables: { id, ...updates },
        });
        await this.dispatch('fetchCategories');
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async deleteCategory({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        await apolloClient.mutate({
          mutation: gql`
            mutation DeleteCategory($id: Int!) {
              delete_categories_by_pk(id: $id) {
                id
              }
            }
          `,
          variables: { id },
        });
        await this.dispatch('fetchCategories');
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async createProduct({ commit }, newProduct) {
      commit('SET_LOADING', true);
      try {
        await apolloClient.mutate({
          mutation: gql`
            mutation CreateProduct($name: String!, $price: Float!, $quantity: Int!, $category_id: Int!) {
              insert_products_one(object: { name: $name, price: $price, quantity: $quantity, category_id: $category_id }) {
                id
                name
                price
                quantity
                category_id
              }
            }
          `,
          variables: newProduct,
        });
        await this.dispatch('fetchProducts');
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async updateProduct({ commit }, { id, updates }) {
      commit('SET_LOADING', true);
      try {
        await apolloClient.mutate({
          mutation: gql`
            mutation UpdateProduct($id: Int!, $name: String, $price: Float, $quantity: Int, $category_id: Int) {
              update_products_by_pk(pk_columns: { id: $id }, _set: { name: $name, price: $price, quantity: $quantity, category_id: $category_id }) {
                id
                name
                price
                quantity
                category_id
              }
            }
          `,
          variables: { id, ...updates },
        });
        await this.dispatch('fetchProducts');
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    async deleteProduct({ commit }, id) {
      commit('SET_LOADING', true);
      try {
        await apolloClient.mutate({
          mutation: gql`
            mutation DeleteProduct($id: Int!) {
              delete_products_by_pk(id: $id) {
                id
              }
            }
          `,
          variables: { id },
        });
        await this.dispatch('fetchProducts');
      } catch (error) {
        commit('SET_ERROR', error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
  getters: {
    categories: (state) => state.categories,
    products: (state) => state.products,
    loading: (state) => state.loading,
    error: (state) => state.error,
  },
});

export default store;
