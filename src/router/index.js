import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage/HomePage.vue";
import AboutProjectVue from "@/components/AboutProject/AboutProject.vue";
import AddProduct from "@/components/AddProduct/AddProduct.vue";
import GetProduct from "@/components/GetProduct/GetProduct.vue";
import CheckOriginal from "@/components/CheckOriginal/CheckOriginal.vue";
import ProfileView from "@/components/ProfileView/ProfileView.vue";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/about-us",
    name: "AboutProject",
    component: AboutProjectVue,
  },
  {
    path: "/product-add",
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/product-get",
    name: "GetProduct",
    component: GetProduct,
  },
  {
    path: "/check-original",
    name: "CheckOriginal",
    component: CheckOriginal,
  },
  {
    path: "/profile-view",
    name: "ProfileView",
    component: ProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "link_router_active_class",
});

export default router;
