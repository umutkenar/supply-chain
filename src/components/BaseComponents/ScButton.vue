<template>
  <button :class="buttonClass"
    >{{buttonText}}</button
  >
</template>
<script setup>
import { defineProps,computed } from "vue";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  primary:{
    type:Boolean,
    default: false,
  },
  secondary:{
    type:Boolean,
    default: false,
  },
  tertiary:{
    type:Boolean,
    default: false,
  },
});

const buttonClass = computed(()=>{
  return [
   "max-w-max py-2 px-4 rounded-full",
    {
      "bg-PRIMARY_BLUE  text-white": props.primary,
      "bg-PRIMARY_RED  text-white": props.secondary,
      "bg-GREYSCALE_3 text-white": props.tertiary,
    }
  ]
})
</script>
