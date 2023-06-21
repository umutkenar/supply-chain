<template>
  <div class="bg-white border-gray-500 rounded-xl py-12 px-6 border max-w-[1200px] m-auto flex flex-col gap-6">
    <h1 class="text-2xl font-bold text-black">Profil Detayı</h1>
    <div class="flex flex-col gap-4 w-full">
      <h1 class="text-xl underline font-semibold">Gönderilen İşlemler</h1>
      <div class="flex flex-col border rounded-md divide-y">
        <div class="w-full flex items-center">
          <div class="w-1/2 flex items-center border-r px-3 py-2 text-sm font-semibold">Transaction ID</div>
          <div class="w-1/2 flex items-center px-3 py-2 text-sm font-semibold">Wallet Address</div>
        </div>
        <template v-if="sendedTransactions.length > 0">
          <div v-for="send in sendedTransactions" :key="send.id" class="w-full flex items-center">
            <div class="w-1/2 flex items-center px-3 py-2 border-r">{{ send.id }}</div>
            <div class="w-1/2 flex items-start px-3 py-2 flex-col gap-1">
              {{ send.receiver.walletAddress }}
              <div v-if="send.receiver.name.length > 0" class="text-sm text-PRIMARY_BLUE"><span class="text-GREY_TEXT">Kayıtlı isim:</span> {{ send.receiver.name }}</div>
            </div>
          </div>
        </template>
        <div v-else class="w-full justify-center flex items-center px-3 py-2 text-sm font-semibold">Veri yok</div>
      </div>
    </div>
    <div class="flex flex-col gap-4 w-full">
      <h1 class="text-xl underline font-semibold">Alınan İşlemler</h1>
      <div class="flex flex-col border rounded-md divide-y">
        <div class="w-full flex items-center">
          <div class="w-1/2 flex items-center border-r px-3 py-2 text-sm font-semibold">Transaction ID</div>
          <div class="w-1/2 flex items-center px-3 py-2 text-sm font-semibold">Wallet Address</div>
        </div>
        <template v-if="gettedTransactions.length > 0">
          <div v-for="getted in gettedTransactions" :key="getted.id" class="w-full flex items-center">
            <div class="w-1/2 flex items-center px-3 py-2 border-r">{{ getted.id }}</div>
            <div class="w-1/2 flex items-center px-3 py-2">{{ getted.senderWalletAddress }}</div>
          </div>
        </template>
        <div v-else class="w-full justify-center flex items-center px-3 py-2 text-sm font-semibold">Veri yok</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
const sendedTransactions = ref([]);
const gettedTransactions = ref([]);

const getData = () => {
  sendedTransactions.value = [];
  gettedTransactions.value = [];
  let data = JSON.parse(localStorage.getItem("data"));
  let loggedWalletAddress = localStorage.getItem("metaMaskWalletAddress");
  if (data) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.senderWalletAddress === loggedWalletAddress) {
        sendedTransactions.value.push(element);
      } else if (element.receiver.walletAddress === loggedWalletAddress) {
        gettedTransactions.value.push(element);
      }
    }
  }
};

onMounted(() => {
  setTimeout(() => {
    getData();
  }, 2000);
});
</script>
