<template>
    <div class="w-full h-screen flex justify-center items-center">
      <div class="field">
        <span class="p-float-label">
          <InputText id="inputtext" type="text" v-model="value1" />
          <label for="inputtext">InputText</label>
        </span>
      </div>
    </div>
  </template>
  <script setup>
  import {ref} from 'vue'
  const value1 = ref();
  </script>
  <style></style>