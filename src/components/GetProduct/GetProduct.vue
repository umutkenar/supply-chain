<template>
  <h1>Search with product ID</h1>
  <div class="flex flex-col gap-12 h-screen">
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
              {{slotProps.item.content}}
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
const products = ref([
  {
    id: "SC0001",
    data: [
      {
        status: "SC0001.KASA",
        date: "15/10/2020 10:30",
        color: "#9C27B0",
        content: "KASA TEMİNİ XYZ TARAFINDAN YAPILMIŞTIR"
      },
      { status: "SC0001.KUNDAK", date: "15/10/2020 14:00", color: "#673AB7",content: "KUNDAK TEMİNİ XYZ TARAFINDAN YAPILMIŞTIR" },
      { status: "SC0001.NAMLU", date: "15/10/2020 16:15", color: "#FF9800",content: "NAMLU TEMİNİ XYZ TARAFINDAN YAPILMIŞTIR" },
      { status: "SC0001.TETİK", date: "16/10/2020 10:00", color: "#607D8B",content: "TETİK TEMİNİ XYZ TARAFINDAN YAPILMIŞTIR" },
    ],
  },
  {
    id: "SC0002",
    data: [
      {
        status: "SC0002.KASA",
        date: "15/10/2020 10:30",
        color: "#9C27B0",
        content: "KASA TEMİNİ XYZ TARAFINDAN YAPILMIŞTIR"
      },
      { status: "SC0002.KUNDAK", date: "15/10/2020 14:00", color: "#673AB7",content: "KUNDAK TEMİNİ XYZ TARAFINDAN YAPILMIŞTIR" },
      { status: "SC0002.NAMLU", date: "15/10/2020 16:15", color: "#FF9800",content: "NAMLU TEMİNİ XYZ TARAFINDAN YAPILMIŞTIR" },
      { status: "SC0002.TETİK", date: "16/10/2020 10:00", color: "#607D8B",content: "TETİK TEMİNİ XYZ TARAFINDAN YAPILMIŞTIR" },
    ],
  },
]);
const searchedId = ref(false);
const idSearch = ref();
const foundedId = ref();
function getData(id) {
  for (let index = 0; index < products.value.length; index++) {
    const element = products.value[index];
    if (element.id == id) {
      searchedId.value = true;
      foundedId.value = element.data;
      console.log("founded");
      break;
    } else {
      searchedId.value = false;
      foundedId.value = null;
      console.log('not fonunded')
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
