<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="field">
      <span>
        <form>
          <label for="firma_unvani">Firma Ünvanı: </label>
          <input type="text" id="firma_unvani" v-model="value1" /><br />
          <label for="firma_vergi_daire">Vergi Dairesi: </label>
          <input type="text" id="firma_vergi_daire" v-model="value1" />
        </form>
      </span>
      {{ value1 }}
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const value1 = ref();
</script>
