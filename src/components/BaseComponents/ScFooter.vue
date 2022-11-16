<template>
  <div class="w-full h-32 border-t py-4 px-8 bg-[#4f8ff7]">
    <div class="w-full h-full px-8 py-4 flex flex-col gap-4 justify-center items-center text-white">
      <div class="w-full flex justify-between items-center">
        <h1 class="text-xl">Supply Chain App</h1>
        <div v-if="isLogged !== 'false'" class="w-full h-full max-w-max flex gap-3 items-center text-white">
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
      </div>
      <div>
        <p>Supply Chain App-2022.Tüm hakları saklıdır.</p>
      </div>
    </div>
  </div>
</template>
<script setup>

import { computed } from "vue";

const isLogged = computed({
  get() {
    return localStorage.getItem("isLogged");
  },
  set(newValue) {
    localStorage.setItem("isLogged", newValue);
  },
});

</script>
