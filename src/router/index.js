import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../components/MainLayout.vue";
import Home from "../views/Home.vue";
import ProductList from "../views/Product.vue";
import Categories from "../views/Categories.vue";
import addProduct from "../components/Product/addProduct.vue";
import EditProduct from "../components/Product/editProduct.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: Home },
      { path: "product", component: ProductList, name: "ProductList" },
      { path: "addproduct", component: addProduct },
      {
        path: "editproduct/:id",
        component: EditProduct,
        name: "EditProduct",
        props: true,
      },
      { path: "categories", component: Categories },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
