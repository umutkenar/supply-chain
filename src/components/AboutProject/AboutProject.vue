<template>
  <div class="bg-white border-gray-500 rounded-xl py-12 px-6 border max-w-[1200px] m-auto flex flex-col gap-2">
    <span  class="text-2xl font-bold">Blockchain Tedarik Takip </span>
    <span class="text-lg font-semibold">Projenin Amacı</span>
    <p>
      Projenin amacı av tüfeği sektöründeki kaçak üretimin engellenmesi, son kullanıcının eline geçen av tüfeğinin
      hammaddesine kadar nereden geldiği, hangi ellerden geçtiğini takip edebilmesi.
    </p>
    <span class="text-lg font-semibold">Projede Takip Edilecek Adımlar</span>
    <p>
      Projenin front-end kısmı Vuejs ve TailwindCSS kullanılarak yazılacaktır. Back-end kodlaması Solidity ile yapılacak
      olup, kullanılacak blok zincir teknolojisi AVAX Chain olacaktır.
    </p>
    <p>
      İlk adım olarak av tüfeği fabrikalarından tüfek üretimine dair detaylar öğrenilecektir. Bir bilgi havuzu
      oluşturulacaktır, bilgi havuzundaki verilere göre front-end ve blok zincir kodlanacağı için bu adımda projenin
      nasıl yapılacağı ve nasıl görüneceği şekillenecektir. Şirketlerden alınacak bilgileri örnekleyecek olursak, bir
      tüfekte kaç parça olduğu, bu parçaların hammaddelerinin nereden temin edildiği, temin edilen hammaddelerin nasıl
      şirkete ulaştığı, şirkette nasıl işlendiği, üretimden sonraki süreçte av tüfeğinin satışı için hangi adımların
      izlendiği(bayi yoluyla mı, bireysel mi), av tüfeğinin son kullanıcıya kadar ulaştığı tüm aşamaların bilgisi
      edinilecektir. Bu aşama için tahmin edilen süre minimumu 3 maksimum 4 haftadır.
    </p>
    <p>
      İkinci aşama olarak front-end kodlamaya başlanacaktır. Bu aşamada şirketlerden edinilen bilgiye ve blok zincirden
      gelen verilere uygun bir tasarım kodlanacaktır. Bu aşamada blok zincirden gelen verileri sorgulama yapısı
      kurulacaktır ve gelen verilerin sergilenme, kullanıcıyı gösterilme şekli kodlanacaktır. Front-end kodlaması için
      tahmin edilen süre minimum 5 maksimum 7 haftadır. Front-end kodlaması devam ederken AVAX Chain araştırmaları
      yapılacaktır ve Solidity kullanımı incelenecektir.
    </p>
    <p>
      Üçüncü aşama olarak AVAX Chain üzerinde işlemlere başlanacaktır. AVAX Chain üzerine yapılan araştırmalara
      istinaden öncelikle front-end ile zincir yapısı bağlanacak, denemeler yapılacaktır ve bilgi girişi yapılacaktır.
      Bu aşamada front-end testleri de yapılacaktır. Front-end testlerinin sebebi, yapmış olduğumuz tasarımın blok
      zincire uygun olup olmadığı dummy verilerle denenecek, gerek görülürse geliştirmeler yapılacaktır. Üçüncü aşamanın
      amacı AVAX Chaini akıllı kontratlarını yazmak ve veri girişi üzerine çalışmaktır. Bu aşama, projenin en zor
      aşaması olup zinciri kullanabilmemiz için elzemdir ve tahmin edilen süre minimum 8 haftadır.
    </p>
    <p>
      Dördüncü aşamada şirketlerden elde edilen tüm verilerin zincire işlenmesi, zincirden gelen verilerin düzenli ve
      güzel bir şekilde tasarımda gösterilmesi amaçlanacaktır. Bu aşamada zincirden gelen verilerin durumuna göre gerek
      görüldüğü takdirde front-end güncellenecektir. Bu aşama için tahmin edilen süre minimum 2 maksimum 3 haftadır.
    </p>
    <p>
      Son aşama olarak ek geliştirmeler yapılabilir mi araştırmaları yapılacaktır ve projenin kullanışlılığı üzerine
      çalışılacaktır.
    </p>
    <span class="text-lg font-semibold"> Birinci Dönem Hedefleri </span>
    <p>
      1.Şirketlerden tedarik, üretim ve satış ağının bilgilerinin alınması<br>2.Front-end kodlamasının bitmesi<br>3.AVAX
      zincirinin projeye bağlanması
    </p>
    <span class="text-lg font-semibold"> İkinci Dönem Hedefleri: </span>
    <p>
      1.AVAX zinciri üzerinde veri girme ve veri çekme işlemlerinin yapılabilmesi.<br>2.Front-end tasarımda zincir
      üzerinden gelecek verilerin gösterilmesi<br>3.Kaçak üretimin engellenmesi için gerekli sorgulamaların yapılabilmesi.
    </p>
  </div>
</template>
