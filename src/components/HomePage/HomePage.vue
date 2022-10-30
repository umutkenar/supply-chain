<template>
  <div class="w-full h-screen flex justify-center items-center">
    <Card style="width: 25em">
      <template #title> Merhaba <span v-if="!isLogged">KENAR Silah San. ve Tic. AŞ</span></template>
      <template #content>
        <div class="flex flex-col gap-2">
          <span>
            Blokzincir Tedarik Takip Sistemine hoşgeldin. Bu sistem üreticileri ve tüketicileri korumak, üretimi ve
            lojistiği güvenilir, şeffaf ve daha verimli hale getirmek için kurulmulştur.
          </span>
          <span>
            Sen ve senin gibi geleceğin teknolojisinde yer edinmek isteyen insanlara bir teşekkürü borç biliriz.
          </span>
          <span> Sisteme dair öneri, şikayet ve istekleriniz <b>johndoe@supplyapp.com </b>yoluyla iletebilirsin. </span>
          <span> Teşekkürler. </span>
        </div>
      </template>
      <template #footer>
        <div class="w-full flex justify-center items-center gap-2">
          <ScButtonVue v-if="!isLogged" button-link="AddProduct" button-text="Veri Gir" primary></ScButtonVue>
          <ScButtonVue v-else button-link="AddProduct" button-text="Giriş Yap" primary></ScButtonVue>
          <ScButtonVue button-link="AddProduct" button-text="Veri Sorgula" primary></ScButtonVue>
        </div>
      </template>
    </Card>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import ScButtonVue from "../BaseComponents/ScButton.vue";

const isLogged = ref(localStorage.getItem("isLoggedIn"));
onMounted(() => {
  // let temp = localStorage.getItem("isLoggedIn");
  // console.log("sadasdasdas");
  // if (temp === "true") isLogged.value = true;
  // else isLogged.value = false;
});
watch(localStorage.getItem("isLoggedIn"), async (newQuestion) => {
  console.log("asdasdasdasdadas", newQuestion);
  if (newQuestion === "true") isLogged.value = true;
  else isLogged.value = false;
});
</script>
<style></style>
