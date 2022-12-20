<template>
  <div>
    <ScHeader @logged-in="loggedIn"></ScHeader>
    <div class="w-full p-9 bg-[#eff3f7] een">
      <RouterView :walletAddress="walletAddress"></RouterView>
    </div>
    <ScFooter :walletAddress="walletAddress"></ScFooter>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ScHeader from "./components/BaseComponents/ScHeader.vue";
import ScFooter from "./components/BaseComponents/ScFooter.vue";

const walletAddress = ref('');
function loggedIn(e) {
  console.log("basardikkk", e);
  walletAddress.value = e;
}
</script>

<style></style>
