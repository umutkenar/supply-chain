<template>
  <div class="bg-white border-gray-500 rounded-xl py-12 px-6 border max-w-[1200px] m-auto flex flex-col gap-2">
    <p class="text-lg">Blokzincir tedarik takip uygulamasının öncelikli amacı şeffaf üretim ağının takibidir. Bu hizmeti sağlayabilmek için ürün seri numaralarıyla burada yaptığınız aramada size blokzincirden gelen veriler sergilenmektedir.</p>
    <p class="text-lg font-semibold">Ürün seri numarası girerek arama yapabilirsiniz</p>
    <div class="flex gap-4">
      <InputText id="inputtext" type="text" v-model="idSearch" />
      <Button @click="getData(idSearch)">Search</Button>
    </div>
    <Timeline :value="foundedId" align="alternate" class="customized-timeline">
      <template #marker="slotProps">
        <span class="custom-marker shadow-2" :style="{ backgroundColor: slotProps.item.color }">
          {{ slotProps.index + 1 }}
        </span>
      </template>
      <template #content="slotProps">
        <Card>
          <template #title>
            {{ slotProps.item.status }}
          </template>
          <template #subtitle>
            {{ slotProps.item.date }}
          </template>
          <template #content>
            <p>
              {{ slotProps.item.content }}
            </p>
            <!-- <Button label="Read more" class="p-button-text"></Button> -->
          </template>
        </Card>
      </template>
    </Timeline>
  </div>
</template>
<script setup>
import { ref } from "vue";
import products from "@/assets/json/products";
const searchedId = ref(false);
const idSearch = ref();
const foundedId = ref();
function getData(id) {
  for (let index = 0; index < products.length; index++) {
    const element = products[index];
    if (element.id == id) {
      searchedId.value = true;
      foundedId.value = element.data;
      break;
    } else {
      searchedId.value = false;
      foundedId.value = null;
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
