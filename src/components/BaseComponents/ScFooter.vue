<template>
  <div class="w-full h-32 border-t py-4 px-8">
    <div class="w-full h-full px-8 py-4 flex flex-col gap-4 justify-center items-center">
      <div class="w-full flex justify-between items-center">
        <h1 class="text-xl">Supply Chain App</h1>
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
      <div>
        <p>Supply Chain App-2022.Tüm hakları saklıdır.</p>
      </div>
    </div>
  </div>
</template>
