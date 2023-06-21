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
        <p class="text-base font-semibold">Göndericinin cüzdan adresi: {{ productObj.senderWalletAddress }}</p>
        <p class="text-base font-semibold">Alıcının cüzdan adresi: {{ productObj.receiver.walletAddress }}</p>
      </div>
      <div v-if="transportObj" class="flex flex-col gap-2">
        <p class="text-lg font-bold">İrsaliye Numarası: {{ transportObj.waybillNumber }}</p>
        <p class="text-base font-semibold">Alıcının cüzdan adresi: {{ transportObj.receiver.walletAddress }}</p>
      </div>
      <Timeline v-if="transportObj" :value="transportDetailList" align="alternate" class="customized-timeline">
        <template #content="slotProps">
          <Card>
            <template #title>
              <div>{{ slotProps.item.transportFrom }} - {{ slotProps.item.transportTo }}</div>
            </template>
            <template #content>
              <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-2">
                  <span class="text-sm text-GREY_TEXT font-extrabold">Birime Geliş Bilgileri</span>
                  <p>Geliş Tarihi: {{ slotProps.item.arrivalDate }}</p>
                  <p>Paket Durumu: {{ slotProps.item.productHealthBefore }}</p>
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-sm text-GREY_TEXT font-extrabold">Birimden Çıkış Bilgileri</span>
                  <p>Çıkış Tarihi: {{ slotProps.item.departureDate }}</p>
                  <p>Paket Durumu: {{ slotProps.item.productHealthAfter }}</p>
                </div>
                <p>Ek Açıklama: {{ slotProps.item.additionalDesc }}</p>
              </div>
            </template>
          </Card>
        </template>
      </Timeline>
      <Timeline v-else-if="orgProductObj" :value="orgProductsList" align="alternate" class="customized-timeline">
        <template #content="slotProps">
          <Card>
            <template #title>
              <div>{{ slotProps.item.viewCount > 0 ? "Ürün orijinal değil" : "Ürün orijinal" }}</div>
            </template>
            <template #content>
              <div class="flex flex-col gap-3 text-lg text-GREY_TEXT font-bold">
                Bu ürünün sorgulanma sayısı: {{ slotProps.item.viewCount }}
              </div>
            </template>
          </Card>
        </template>
      </Timeline>
      <Timeline v-else :value="transactionList" align="alternate" class="customized-timeline">
        <template #content="slotProps">
          <Card>
            <template #title> Parça Adı: {{ slotProps.item.partName }} </template>
            <template #subtitle> Gönderenin Cüzdanı: {{ slotProps.item.senderWalletAddress }} </template>
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
const transportObj = ref(null);
const transportDetailList = ref([]);
const orgProductObj = ref(null);
const orgProductsList = ref([]);

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

const getTransportDetails = (transport) => {
  console.log(transport);
  transportObj.value = transport;
  for (let index = 0; index < transport.transportDetailList.length; index++) {
    transportDetailList.value.push(transport.transportDetailList[index]);
  }
};

const countOriginalProduct = (data) => {
  orgProductObj.value = data;
  orgProductsList.value.push(data);
  let getProduct = JSON.parse(localStorage.getItem("data"));
  if (getProduct === null) {
    getProduct = [];
  }
  localStorage.setItem("data", null);
  const index = getProduct.findIndex((a) => a.serialNo === data.serialNo);
  if (index >= 0) {
    getProduct[index].viewCount++;
  }
  localStorage.setItem("data", JSON.stringify(getProduct));
};

const getData = () => {
  transactionList.value = [];
  transportDetailList.value = [];
  orgProductsList.value = [];
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
      } else if (element.waybillNumber === idSearch.value && element.type === "transport") {
        getTransportDetails(element);
        break;
      } else if (element.serialNo === idSearch.value && element.type === "orgProduct") {
        countOriginalProduct(element);
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
