<template>
  <div class="bg-white border-gray-500 rounded-xl py-12 px-6 border max-w-[1200px] m-auto flex flex-col gap-2">
    <p class="text-lg">{{ walletAddress }} cüzdanı için veri girişi yapıyorsunuz.</p>
    <p class="text-lg font-semibold"></p>
    <div class="flex gap-4 flex-col w-full">
      <div class="w-full flex items-center gap-4">
        <div class="flex flex-col gap-2 w-1/2">
          <div class="flex items-center w-full justify-between">
            <span class="text-sm text-GREY_TEXT">Cüzdan adresi</span>
            <div class="flex items-center gap-2 text-sm text-GREY_2">
              Tanımlı Kullanıcılardan Seç
              <InputSwitch v-model="savedCustomerToggler" />
            </div>
          </div>
          <div v-if="!savedCustomerToggler" class="flex items-center gap-2">
            <InputText
              id="inputtext"
              type="text"
              v-model="customerData.walletAddress"
              placeholder="Alıcı cüzdan adresi"
              class="w-full"
            />
            <Button @click="openSaveCustomer()" icon="pi pi-save" aria-label="Submit" />
          </div>
          <Dropdown
            v-else
            v-model="selectedCustomer"
            :options="savedWalletAddressList"
            option-label="name"
            placeholder="Bir alıcı seç veya yeni cüzdan adresi gir"
            empty-message="Kayıtlı alıcınız yok, yeni alıcı kayıt ediniz"
            class="w-full"
          >
            <template #value="slotProps">
              <div class="flex gap-2" v-if="slotProps.value">
                <div>
                  {{ slotProps.value.name }}
                </div>
              </div>
            </template>
            <template #option="slotProps">
              <div class="flex gap-2 items-center justify-between">
                <div>{{ slotProps.option.name }}</div>
                <Button
                  @click="openSaveCustomer(slotProps.option, true)"
                  icon="pi pi-user-edit"
                  aria-label="Submit"
                  size="small"
                  text
                  rounded
                />
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="flex flex-col gap-2 w-1/2">
          <span class="text-sm text-GREY_TEXT">Veri tipi</span>
          <Dropdown v-model="dataType" :options="dataTypes" option-label="name" placeholder="Parça seç" class="w-full">
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
          placeholder="Parça Seç"
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
              v-model="originalProduct"
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
            v-model="transport.transportDetail.arrivalDate"
            placeholder="Geliş Tarihi"
            slotChar="mm/dd/yyyy"
          />
          <InputMask
            class="w-1/2"
            id="date"
            mask="99/99/9999"
            v-model="transport.transportDetail.departureDate"
            placeholder="Çıkış Tarihi"
            slotChar="mm/dd/yyyy"
          />
        </div>
        <div class="flex gap-4 items-center w-full rounded-md">
          <InputText
            id="inputtext"
            type="text"
            v-model="transport.transportDetail.transportFrom"
            placeholder="Gönderinin geldiği yer"
            class="w-full"
          />
          <InputText
            id="inputtext"
            type="text"
            v-model="transport.transportDetail.transportTo"
            placeholder="Gönderinin gittiği yer"
            class="w-full"
          />
        </div>
        <div class="flex gap-4 items-center w-full rounded-md">
          <InputText
            id="inputtext"
            type="text"
            v-model="transport.transportDetail.productHealthBefore"
            placeholder="Gelen gönderinin durumu(bozuk,kırık, ezilmiş vs.)"
            class="w-full"
          />
          <InputText
            id="inputtext"
            type="text"
            v-model="transport.transportDetail.productHealthAfter"
            placeholder="Giden gönderinin durumu(bozuk,kırık, ezilmiş vs.)"
            class="w-full"
          />
        </div>
        <InputText
          id="inputtext"
          type="text"
          v-model="transport.transportDetail.additionalDesc"
          placeholder="Ek açıklama(opsiyonel)"
          class="w-full"
        />
      </div>
      <div class="max-w-fit">
        <Button v-if="dataType.type === 1" @click="addPart" type="submit">Veri Gir</Button>
        <Button v-else-if="dataType.type === 3" @click="addOriginalProduct" type="submit">Veri Gir</Button>
        <Button v-else-if="dataType.type === 4" @click="addTransport" type="submit">Veri Gir</Button>
        <Button v-else @click="addProduct" type="submit">Veri Gir</Button>
      </div>
    </div>
    <Dialog v-model:visible="visible" modal header="Tanımlı Alıcı Ekle" :style="{ width: '50vw' }">
      <div class="flex items-center gap-2">
        <InputText
          class="w-1/2"
          id="inputtext"
          v-model="editedCustomer.walletAddress"
          placeholder="Alıcı Cüzdan Adresi"
        />
        <InputText class="w-1/2" id="inputtext" v-model="editedCustomer.name" placeholder="Alıcı adı" />
      </div>
      <template #footer>
        <Button label="İptal et" icon="pi pi-times" @click="visible = false" text />
        <Button label="Sil" @click="editCustomer(true)" icon="pi pi-trash" severity="danger" />
        <Button label="Kaydet" icon="pi pi-check" @click="addSavedWalletAddress(true)" autofocus />
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { ref, onMounted } from "vue";
import partsList from "@/assets/json/shotgunParts";
import { v4 as uuidv4 } from "uuid";

defineProps({
  walletAddress: String,
});

const savedCustomerToggler = ref(false);
const editMode = ref(false);
const parts = ref(partsList);
const dataTypes = ref([
  { name: "Parça Gir", type: 1 },
  { name: "Ürün Gir", type: 2 },
  { name: "Orijinal Ürün Gir", type: 3 },
  { name: "Taşıma Bilgisi Gir", type: 4 },
]);
const dataType = ref({ name: "Parça Gir", type: 1 });

const visible = ref(false);
const customerData = ref({
  walletAddress: "",
  name: "",
});
const selectedCustomer = ref(null);
const editedCustomer = ref({
  walletAddress: "",
  name: "",
});
const savedWalletAddressList = ref([]);
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

const originalProduct = ref();

const transport = ref({
  waybillNumber: null,
  transportDetail: {
    arrivalDate: null,
    departureDate: null,
    transportFrom: null,
    transportTo: null,
    productHealthBefore: null,
    productHealthAfter: null,
    additionalDesc: null,
  },
});

const openSaveCustomer = (customer = null, edit = false) => {
  editedCustomer.value = customer || customerData.value;
  editMode.value = edit;
  visible.value = true;
};

const editCustomer = (deleteMode = null) => {
  for (let index = 0; index < savedWalletAddressList.value.length; index++) {
    const element = savedWalletAddressList.value[index];
    if (element.walletAddress === editedCustomer.value.walletAddress) {
      if (deleteMode === true) {
        savedWalletAddressList.value.splice(index, 1);
      } else {
        savedWalletAddressList.value[index].walletAddress = editedCustomer.value.walletAddress;
        savedWalletAddressList.value[index].name = editedCustomer.value.name;
        editMode.value = false;
      }
    }
  }
  visible.value = false;
  setSavedCustomer();
};

const addSavedWalletAddress = () => {
  const index = savedWalletAddressList.value.findIndex((a) => a.walletAddress === editedCustomer.value.walletAddress);
  if (index !== -1) {
    editCustomer(false);
  } else {
    savedWalletAddressList.value.push(editedCustomer.value);
  }
  visible.value = false;
  setSavedCustomer();
};

const setSavedCustomer = () => {
  localStorage.setItem("savedWalletAddress", null);
  // setTimeout(() => {
  localStorage.setItem("savedWalletAddress", JSON.stringify(savedWalletAddressList.value));
  // }, 50);
  getSavedCustomer();
};

const getSavedCustomer = () => {
  savedWalletAddressList.value = [];
  let data = JSON.parse(localStorage.getItem("savedWalletAddress"));
  if (data === null) {
    savedWalletAddressList.value = [];
  } else {
    for (let index = 0; index < data.length; index++) {
      savedWalletAddressList.value.push(data[index]);
    }
  }
};

onMounted(() => {
  getSavedCustomer();
});

const clearAllData = () => {
  customerData.value = { walletAddress: "", name: "" };
  selectedCustomer.value = null;
  uniqueId.value = uuidv4();
  originalProduct.value = null;
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

const getSenderWalletAddress = () => {
  return localStorage.getItem("metaMaskWalletAddress");
};

const addTransport = () => {
  let getProduct = JSON.parse(localStorage.getItem("data"));
  if (getProduct === null) {
    getProduct = [];
  }
  localStorage.setItem("data", null);
  const index = getProduct.findIndex((t) => t.waybillNumber === transport.value.waybillNumber);
  if (index === -1) {
    let tempTransport = {
      type: "transport",
      id: uniqueId.value,
      waybillNumber: transport.value.waybillNumber,
      receiver: selectedCustomer.value !== null ? selectedCustomer.value : customerData.value,
      senderWalletAddress: getSenderWalletAddress(),
      transportDetailList: [
        {
          arrivalDate: transport.value.transportDetail.arrivalDate,
          departureDate: transport.value.transportDetail.departureDate,
          transportFrom: transport.value.transportDetail.transportFrom,
          transportTo: transport.value.transportDetail.transportTo,
          productHealthBefore: transport.value.transportDetail.productHealthBefore,
          productHealthAfter: transport.value.transportDetail.productHealthAfter,
          additionalDesc: transport.value.transportDetail.additionalDesc,
        },
      ],
    };
    getProduct.push(tempTransport);
  } else {
    getProduct[index].transportDetailList.push({
      arrivalDate: transport.value.transportDetail.arrivalDate,
      departureDate: transport.value.transportDetail.departureDate,
      transportFrom: transport.value.transportDetail.transportFrom,
      transportTo: transport.value.transportDetail.transportTo,
      productHealthBefore: transport.value.transportDetail.productHealthBefore,
      productHealthAfter: transport.value.transportDetail.productHealthAfter,
      additionalDesc: transport.value.transportDetail.additionalDesc,
    });
  }
  localStorage.setItem("data", JSON.stringify(getProduct));
  clearAllData();
};

const addProduct = () => {
  let getProduct = JSON.parse(localStorage.getItem("data"));
  if (getProduct === null) {
    getProduct = [];
  }
  localStorage.setItem("data", null);
  let tempProduct = {
    receiver: selectedCustomer.value !== null ? selectedCustomer.value : customerData.value,
    senderWalletAddress: getSenderWalletAddress(),
    id: uniqueId.value,
    type: "product",
    serialNo: product.value.serialNo,
    supplyAmount: product.value.supplyAmount || 1,
    viewCount: 0,
    parts: product.value.parts,
  };
  getProduct.push(tempProduct);
  localStorage.setItem("data", JSON.stringify(getProduct));
  clearAllData();
};

const addOriginalProduct = () => {
  let getProduct = JSON.parse(localStorage.getItem("data"));
  if (getProduct === null) {
    getProduct = [];
  }
  localStorage.setItem("data", null);
  let tempProduct = {
    type: "orgProduct",
    receiver: selectedCustomer.value !== null ? selectedCustomer.value : customerData.value,
    serialNo: originalProduct.value,
    senderWalletAddress: getSenderWalletAddress(),
    viewCount: 0,
  };
  getProduct.push(tempProduct);
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
    receiver: selectedCustomer.value !== null ? selectedCustomer.value : customerData.value,
    senderWalletAddress: getSenderWalletAddress(),
    id: uniqueId.value,
    type: "part",
    partName: partData.value.part.name,
    supplyAmount: partData.value.supplyAmount,
    supplyDate: partData.value.supplyDate,
  };
  getPart.push(tempPart);
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
