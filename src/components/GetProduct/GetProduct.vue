<template>
  <div class="bg-white border-gray-500 rounded-xl py-12 px-6 border max-w-[1200px] m-auto flex flex-col gap-2">
    <p class="text-lg">
      Blokzincir tedarik takip uygulamasının öncelikli amacı şeffaf üretim ağının takibidir. Bu hizmeti sağlayabilmek
      için ürün seri numaralarıyla burada yaptığınız aramada size blokzincirden gelen veriler sergilenmektedir.
    </p>
    <p>Örnek parça sorgu için: d83c09ac-56ff-4caf-9f14-b82fe7d91c95</p>
    <p>Örnek ürün sorgu için: c6c02bdd-3c5e-4893-bbdd-8aaeffe82526</p>
    <p class="text-lg font-semibold">Ürün seri numarası girerek arama yapabilirsiniz</p>
    <div class="w-full flex flex-col gap-7">
      <div class="flex gap-4 w-full">
        <InputText id="inputtext" type="text" v-model="idSearch" class="w-full" />
        <Button @click="getData()">Search</Button>
      </div>
      <div v-if="productObj" class="flex flex-col gap-2">
        <p class="text-lg font-bold">Seri Numarası: {{ productObj.serialNo }}</p>
        <p class="text-base font-semibold">Göndericinin cüzdan adresi: {{ productObj.senderWalletAdress }}</p>
        <p class="text-base font-semibold">Alıcının cüzdan adresi: {{ productObj.receiverWalletAdress }}</p>
      </div>
      <Timeline :value="transactionList" align="alternate" class="customized-timeline">
        <template #content="slotProps">
          <Card>
            <template #title> Parça Adı: {{ slotProps.item.partName }} </template>
            <template #subtitle> Gönderenin Cüzdanı: {{ slotProps.item.senderWalletAdress }} </template>
            <template #content>
              <div class="flex flex-col gap-2">
                <p>Temin Adedi: {{ slotProps.item.supplyAmount }}</p>
                <p>Temin Edildiği Tarih: {{ slotProps.item.supplyDate }}</p>
              </div>
            </template>
          </Card>
        </template>
      </Timeline>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const idSearch = ref();
const transactionList = ref([]);
const productObj = ref(null);
const getProductParts = (data, product) => {
  productObj.value = product;
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    for (let index = 0; index < product.parts.length; index++) {
      const part = product.parts[index];
      if (element.id === part.id) {
        transactionList.value.push(element);
      }
    }
  }
};

const getData = () => {
  transactionList.value = [];
  let data = JSON.parse(localStorage.getItem("data"));
  if (data === null) {
    transactionList.value = "Veri Yok";
  } else {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      console.log(element);
      if (element.id === idSearch.value && element.type === "part") {
        transactionList.value.push(element);
        break;
      } else if (element.id === idSearch.value && element.type === "product") {
        getProductParts(data, element);
        break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-marker {
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-radius: 50%;
  z-index: 1;
}

::v-deep(.p-timeline-event-content),
::v-deep(.p-timeline-event-opposite) {
  line-height: 1;
}

@media screen and (max-width: 960px) {
  ::v-deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row !important;

      .p-timeline-event-content {
        text-align: left !important;
      }
    }

    .p-timeline-event-opposite {
      flex: 0;
    }

    .p-card {
      margin-top: 1rem;
    }
  }
}
</style>
