<template>
  <div class="bg-white border-gray-500 rounded-xl py-12 px-6 border max-w-[1200px] m-auto flex flex-col gap-2">
    <p class="text-lg">{{ walletAddress }} cüzdanı için veri girişi yapıyorsunuz.</p>
    <p class="text-lg font-semibold"></p>
    <div class="flex gap-4 flex-col w-full">
      <div class="w-full flex items-center gap-4">
        <div class="flex flex-col gap-2 w-1/2">
          <span class="text-sm text-GREY_TEXT">Cüzdan adresi</span>
          <InputText
            id="inputtext"
            type="text"
            v-model="customerWalletAddress"
            placeholder="Alıcı cüzdan adresi"
            class="w-full"
          />
        </div>
        <div class="flex flex-col gap-2 w-1/2">
          <span class="text-sm text-GREY_TEXT">Veri tipi</span>
          <Dropdown
            v-model="dataType"
            :options="dataTypes"
            option-label="name"
            placeholder="Select a part"
            class="w-full"
          >
            <template #value="slotProps">
              <div class="flex gap-2" v-if="slotProps.value">
                <!-- <div>{{ slotProps.value.id }}</div> -->
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex gap-2">
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
      </div>
      <div v-if="dataType.type === 1" class="flex gap-3 items-center w-full rounded-md">
        <Dropdown
          v-model="partData.part"
          :options="parts"
          optionLabel="name"
          scrollHeight="250px"
          :filter="true"
          placeholder="Select a part"
          class="w-1/3"
          :showClear="true"
        >
          <template #value="slotProps">
            <div class="flex gap-2" v-if="slotProps.value">
              <!-- <div>{{ slotProps.value.id }}</div> -->
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="flex gap-2">
              <!-- <div>{{ slotProps.option.id }}</div> -->
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
        <InputMask
          class="w-1/3"
          id="date"
          mask="99/99/9999"
          v-model="partData.supplyDate"
          placeholder="99/99/9999"
          slotChar="mm/dd/yyyy"
        />
        <InputText
          class="w-1/3"
          id="inputtext"
          type="number"
          v-model="partData.supplyAmount"
          placeholder="Parça adedi"
        />
      </div>
      <div v-if="dataType.type === 2" class="w-full flex gap-4 items-end">
        <div class="flex flex-col gap-3 w-full">
          <div class="flex flex-col gap-2 w-1/2">
            <span class="text-sm text-GREY_TEXT">Ürün seri numarası</span>
            <InputText
              id="inputtext"
              type="text"
              v-model="product.serialNo"
              placeholder="Seri numarası giriniz"
              class="w-full"
            />
          </div>
          <div class="w-full flex items-center gap-3" v-for="(part, index) in product.parts" :key="part">
            <InputText class="w-1/2" id="inputtext" type="text" v-model="part.id" placeholder="Parça Transaction Id" />
            <Button
              rounded
              outlined
              @click="deletePart(index)"
              v-if="product.parts.length !== 1"
              icon="pi pi-trash"
              severity="danger"
              class="mb-2"
            ></Button>
            <Button
              @click="addMorePart"
              v-if="index === product.parts.length - 1"
              severity="success"
              rounded
              outlined
              icon="pi pi-plus"
              class="mb-2"
            ></Button>
          </div>
        </div>
      </div>
      <div v-if="dataType.type === 3" class="w-full flex gap-4 items-end">
        <div class="flex gap-3 w-full">
          <div class="flex flex-col gap-2 w-1/2">
            <span class="text-sm text-GREY_TEXT">Ürün seri numarası</span>
            <InputText
              id="inputtext"
              type="text"
              v-model="product.serialNo"
              placeholder="Seri numarası giriniz"
              class="w-full"
            />
          </div>
          <!-- <div class="flex flex-col gap-2 w-1/2">
            <span class="text-sm text-GREY_TEXT">Tedarik Adedi</span>
            <InputText id="inputtext" type="number" v-model="product.supplyAmount" placeholder="Adet" class="w-full" />
          </div> -->
        </div>
      </div>
      <div v-if="dataType.type === 4" class="flex flex-col w-full gap-4">
        <div class="flex flex-col gap-2 w-1/2 pr-2">
          <span class="text-sm text-GREY_TEXT">İrsaliye numarası</span>
          <InputText
            id="inputtext"
            type="text"
            v-model="transport.waybillNumber"
            placeholder="Gönderi irsaliye numarası"
            class="w-full"
          />
        </div>
        <div class="flex gap-4 items-center w-full rounded-md">
          <InputMask
            class="w-1/2"
            id="date"
            mask="99/99/9999"
            v-model="transport.arrivalDate"
            placeholder="Arrival date"
            slotChar="mm/dd/yyyy"
          />
          <InputMask
            class="w-1/2"
            id="date"
            mask="99/99/9999"
            v-model="transport.arrivalDate"
            placeholder="Departure date"
            slotChar="mm/dd/yyyy"
          />
        </div>
        <div class="flex gap-4 items-center w-full rounded-md">
          <InputText
            id="inputtext"
            type="text"
            v-model="transport.transportFrom"
            placeholder="Gönderinin geldiği yer"
            class="w-full"
          />
          <InputText
            id="inputtext"
            type="text"
            v-model="transport.transportTo"
            placeholder="Gönderinin gittiği yer"
            class="w-full"
          />
        </div>
        <div class="flex gap-4 items-center w-full rounded-md">
          <InputText
            id="inputtext"
            type="text"
            v-model="transport.productHealthBefore"
            placeholder="Gelen gönderinin durumu(bozuk,kırık, ezilmiş vs.)"
            class="w-full"
          />
          <InputText
            id="inputtext"
            type="text"
            v-model="transport.productHealthAfter"
            placeholder="Giden gönderinin durumu(bozuk,kırık, ezilmiş vs.)"
            class="w-full"
          />
        </div>
        <InputText
          id="inputtext"
          type="text"
          v-model="transport.additionalDesc"
          placeholder="Ek açıklama(opsiyonel)"
          class="w-full"
        />
      </div>
      <div class="max-w-fit">
        <Button v-if="dataType.type === 1" @click="addPart" type="submit">Veri Gir</Button>
        <Button v-else @click="addProduct" type="submit">Veri Gir</Button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { ref } from "vue";
// import { useRouter } from "vue-router";
import partsList from "@/assets/json/shotgunParts";
import { v4 as uuidv4 } from "uuid";

defineProps({
  walletAddress: String,
});

// const router = useRouter();
const parts = ref(partsList);
const dataTypes = ref([
  { name: "Parça Gir", type: 1 },
  { name: "Ürün Gir", type: 2 },
  { name: "Orijinal Ürün Gir", type: 3 },
  { name: "Taşıma Bilgisi Gir", type: 4 },
]);
const dataType = ref({ name: "Parça Gir", type: 1 });

const customerWalletAddress = ref();
const uniqueId = ref(uuidv4());
const partData = ref({ part: null, supplyDate: null, supplyAmount: null });

const product = ref({
  serialNo: null,
  supplyAmount: null,
  viewCount: null,
  parts: [
    {
      id: null,
    },
  ],
});

const transport = ref({
  arrivalDate: null,
  departureDate: null,
  waybillNumber: null,
  transportFrom: null,
  transportTo: null,
  productHealthBefore: null,
  productHealthAfter: null,
  additionalDesc: null,
});

const clearAllData = () => {
  customerWalletAddress.value = "";
  uniqueId.value = uuidv4();
  partData.value = { part: null, supplyDate: null, supplyAmount: null };
  product.value = {
    serialNo: null,
    supplyAmount: null,
    viewCount: null,
    parts: [
      {
        id: null,
      },
    ],
  };
};

const getSenderWalletAdress = () =>{
  return localStorage.getItem("metaMaskWalletAddress");
}

const addProduct = () => {
  let getProduct = JSON.parse(localStorage.getItem("data"));
  if (getProduct === null) {
    getProduct = [];
  }
  localStorage.setItem("data", null);
  let tempProduct = {
    receiverWalletAdress: customerWalletAddress.value,
    senderWalletAdress: getSenderWalletAdress(),
    id: uniqueId.value,
    type: "product",
    serialNo: product.value.serialNo,
    supplyAmount: product.value.supplyAmount || 1,
    viewCount: 0,
    parts: product.value.parts,
  };
  getProduct.push(tempProduct);
  console.log("eklenen urun:", tempProduct);
  localStorage.setItem("data", JSON.stringify(getProduct));
  clearAllData();
};

const addMorePart = () => {
  product.value.parts.push({
    id: null,
  });
};

const deletePart = (index) => {
  product.value.parts.splice(index, 1);
};

const addPart = () => {
  let getPart = JSON.parse(localStorage.getItem("data"));
  if (getPart === null) {
    getPart = [];
  }
  localStorage.setItem("data", null);
  let tempPart = {
    receiverWalletAdress: customerWalletAddress.value,
    senderWalletAdress: getSenderWalletAdress(),
    id: uniqueId.value,
    type: "part",
    partName: partData.value.part.name,
    supplyAmount: partData.value.supplyAmount,
    supplyDate: partData.value.supplyDate,
  };
  getPart.push(tempPart);
  console.log("eklenen parca:", tempPart);
  localStorage.setItem("data", JSON.stringify(getPart));
  clearAllData();
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
