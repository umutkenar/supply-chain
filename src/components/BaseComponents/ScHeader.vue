<template>
  <div class="w-full h-16 border-b">
    <div class="w-full h-full px-8 py-4 flex justify-between items-center ">
        <h1 class=" text-xl">Supply Chain App</h1>
        <div class="w-full h-full max-w-max flex gap-3 items-center">
            <RouterLink to="/">Anasayfa</RouterLink>
            <div class="h-full w-[1px] bg-slate-300"></div>
            <RouterLink :to="{ name: 'AboutProject' }">Proje Hakkında</RouterLink>
            <div class="h-full w-[1px] bg-slate-300"></div>
            <RouterLink to="/">Veri Gir</RouterLink>
            <div class="h-full w-[1px] bg-slate-300"></div>
            <RouterLink to="/">Veri Sorgula</RouterLink>

        </div>
    </div>
  </div>
</template>
