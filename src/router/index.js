import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/components/HomePage/HomePage.vue";
import AboutProjectVue from "@/components/AboutProject/AboutProject.vue";
import CompanyRegisterVue from "@/components/CompanyRegister/CompanyRegister.vue";
const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/proje-hakkinde",
    name: "AboutProject",
    component: AboutProjectVue,
  },
  {
    path: "/kayit-ol",
    name: "CompanyRegister",
    component: CompanyRegisterVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "link_router_active_class",
});

export default router;
