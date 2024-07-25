import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../components/MainLayout.vue';
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import Categories from '../views/Categories.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'product', component: Product },
      { path: 'categories', component: Categories },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
