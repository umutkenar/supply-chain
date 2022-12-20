<template>
  <div class="bg-white border-gray-500 rounded-xl py-12 px-6 border max-w-[1200px] m-auto flex flex-col gap-2">
    <p class="text-lg">Merhaba KENAR Silah San. ve Tic. AŞ, bu ekrandan verilerini girebilirsin</p>
    <p class="text-lg font-semibold"></p>
    <div class="flex gap-4 flex-col max-w-sm">
      <InputText id="inputtext" type="text" v-model="productID" placeholder="Ürün Seri Numarası" />
      <Dropdown
        v-model="selectedPart"
        :options="parts"
        optionLabel="name"
        scrollHeight="250px"
        :filter="true"
        placeholder="Select a part"
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
      <!-- <InputNumber inputId="minmax-buttons" v-model="partCount" mode="decimal" showButtons :min="1" /> -->
      <InputMask id="date" mask="99/99/9999" v-model="supplyDate" placeholder="99/99/9999" slotChar="mm/dd/yyyy" />
      <InputText id="inputtext" type="text" v-model="desc" placeholder="Açıklama" />
      <div class="max-w-fit">
        <Button @click="addData(selectedPart.id)">Veri Gir</Button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import partsList from "@/assets/json/shotgunParts";

const selectedPart = ref();
// const partCount = ref(1);
const productID = ref();
const desc = ref();
const supplyDate = ref();
const parts = ref(partsList);
function addData() {
  let getProduct = JSON.parse(localStorage.getItem("products"));
  if (getProduct === null) {
    getProduct = [];
    let tempProduct = {
      id: productID.value,
      part: [
        {
          partName: selectedPart.value.name,
          partDesc: desc.value,
          partSupplyDate: supplyDate.value,
        },
      ],
    };
    getProduct.push(tempProduct);
    localStorage.setItem("products", JSON.stringify(getProduct));
  } else {
    for (let index = 0; index < getProduct.length; index++) {
      const element = getProduct[index];
      if (element.id == productID.value) {
        localStorage.setItem("products", null);
        let productPart = {
          partName: selectedPart.value.name,
          partDesc: desc.value,
          partSupplyDate: supplyDate.value,
        };
        getProduct[index].part.push(productPart);
        localStorage.setItem("products", JSON.stringify(getProduct));
        break;
      } else if (element.id !== productID.value && index == getProduct.length - 1) {
        localStorage.setItem("products", null);
        let tempProduct = {
          id: productID.value,
          part: [
            {
              partName: selectedPart.value.name,
              partDesc: desc.value,
              partSupplyDate: supplyDate.value,
            },
          ],
        };
        getProduct.push(tempProduct);
        localStorage.setItem("products", JSON.stringify(getProduct));
        break;
      }
    }
  }
}
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
