<template>
  <div>
    <ScHeader></ScHeader>
    <div class="w-full p-9 bg-[#eff3f7] h-screen">
      <RouterView></RouterView>
    </div>
    <ScFooter></ScFooter>
  </div>
</template>

<script setup>
import ScHeader from "./components/BaseComponents/ScHeader.vue";
import ScFooter from "./components/BaseComponents/ScFooter.vue";
</script>

<style></style>
