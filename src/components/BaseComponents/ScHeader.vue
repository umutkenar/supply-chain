<template>
  <div class="w-full h-16 border-b bg-PRIMARY_BLUE">
    <div class="w-full h-full px-8 py-4 flex justify-between items-center">
      <div class="flex gap-6 items-center">
        <h1 class="text-xl text-white">Supply Chain App</h1>
      </div>
      <div class="flex items-center gap-6 h-2/3">
        <div v-if="walletAddress !== ''" class="w-full h-full max-w-max flex gap-3 items-center text-white">
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
          <ScButtonVue
            :button-text="walletAddress !== '' ? walletAddress : 'Login'"
            tertiary
            @click="logIn"
          ></ScButtonVue>
          <!-- <ScButtonVue v-else :button-text="'metamaskAdrs'" tertiary></ScButtonVue> -->
        </div>
        <vue-metamask ref="metamask" :initConnect="false" @onComplete="onComplete"></vue-metamask>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch, defineEmits } from "vue";
import ScButtonVue from "./ScButton.vue";
import VueMetamask from "vue-metamask";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();
const emit = defineEmits(["loggedIn"]);
const metamask = ref();
const metamaskWallet = ref();
const walletAddress = ref("");
const isLogged = ref(false);

onMounted(() => {
  if (localStorage.getItem("metaMaskWalletAddress") !== "") {
    metamask.value.init();
    isLogged.value = true;
    walletAddress.value = localStorage.getItem("metaMaskWalletAddress");
  }
});

function onComplete(data) {
  console.log(data);
  metamaskWallet.value = data;
  walletAddress.value = data.metaMaskAddress;
  emit("loggedIn", walletAddress.value);
  if (route.path.includes("product-add")) {
    router.push("/");
  }
  localStorage.setItem("metaMaskWalletAddress", data.metaMaskAddress);
}
function logIn() {
  metamask.value.init();
}

watch(
  () => metamaskWallet.value,
  () => {
    if (metamaskWallet.value.metaMaskAddress === "") {
      localStorage.setItem("metaMaskWalletAddress", metamaskWallet.value.metaMaskAddress);
    }
  },
);
</script>
