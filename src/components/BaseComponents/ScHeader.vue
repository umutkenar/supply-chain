<template>
  <div class="w-full h-16 border-b bg-PRIMARY_BLUE">
    <div class="w-full h-full px-8 py-4 flex justify-between items-center">
      <div class="flex gap-6 items-center">
        <h1 class="text-xl text-white">Supply Chain App</h1>
      </div>
      <div class="flex items-center gap-6 h-2/3">
        <div v-if="isLogged" class="w-full h-full max-w-max flex gap-3 items-center text-white">
          <RouterLink to="/">Anasayfa</RouterLink>
          <div class="h-full w-[1px] bg-white"></div>
          <RouterLink :to="{ name: 'AboutProject' }">Proje Hakkında</RouterLink>
          <div class="h-full w-[1px] bg-white"></div>
          <RouterLink :to="{ name: 'AddProduct' }">Veri Gir</RouterLink>
          <div class="h-full w-[1px] bg-white"></div>
          <RouterLink :to="{ name: 'GetProduct' }">Veri Sorgula</RouterLink>
        </div>
        <div v-else class="w-full h-full max-w-max flex gap-3 items-center text-white">
          <RouterLink to="/">Anasayfa</RouterLink>
          <div class="h-full w-[1px] bg-white"></div>
          <RouterLink :to="{ name: 'AboutProject' }">Proje Hakkında</RouterLink>
          <div class="h-full w-[1px] bg-white"></div>
          <RouterLink :to="{ name: 'GetProduct' }">Veri Sorgula</RouterLink>
        </div>
        <div>
          <ScButtonVue v-if="!isLogged" button-text="Login" tertiary @click="logIn"></ScButtonVue>
          <ScButtonVue v-else button-text="Logout" tertiary @click="logOut"></ScButtonVue>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { ref } from "vue";
import ScButtonVue from "./ScButton.vue";


const isLogged = ref(false);
function logIn() {
  localStorage.setItem("isLoggedIn", "true");
  isLogged.value = true;
}
function logOut() {
  localStorage.setItem("isLoggedIn", "false");
  isLogged.value = false;
}
// onMounted(() => {
//   let temp = localStorage.getItem("isLoggedIn");
// });

// watch(isLogged, () => {
//   let temp = localStorage.getItem("isLoggedIn");
//   console.log("sadasdasdas");
//   if (temp === "true") isLogged.value = true;
//   else isLogged.value = false;
// });
// watch(
//   () => {
//     isLogged.value = localStorage.getItem("isLoggedIn") === "true" ? true : false;
//   },
// );
</script>
