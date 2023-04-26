<template>
  <div class="w-full h-full flex justify-center items-center">
    <Card style="max-width: min-content;min-width: 25em;">
      <template #title>
        <div v-if="walletAddress !== ''">
          Şu an <span>{{ walletAddress }}</span> cüzdanı için işlem yapmaktasınız!
        </div>
        <div v-else>Merhaba</div>
      </template>
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
          <ScButtonVue
            v-if="walletAddress !== ''"
            button-link="AddProduct"
            button-text="Veri Gir"
            primary
          ></ScButtonVue>
          <ScButtonVue v-else button-link="AddProduct" button-text="Giriş Yap" primary></ScButtonVue>
          <ScButtonVue button-link="GetProduct" button-text="Veri Sorgula" primary></ScButtonVue>
        </div>
      </template>
    </Card>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import ScButtonVue from "../BaseComponents/ScButton.vue";

defineProps({
  walletAddress: String,
});
</script>
<style></style>
