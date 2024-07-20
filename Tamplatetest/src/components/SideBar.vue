

<template>
<div class="flex flex-col justify-center items-center  w-[20rem] bg-coba bg-black bg-no-repeat  ">

    <div class="flex flex-col justify-around items-center w-[10rem]  h-[8rem] text-xl font-KodeMono font- text-black">

      <router-link :to="{ name :'home'}">
        <h1 class="flex bg-warna1 w-[9rem] h-[3rem] rounded-lg"> <h1 class="m-auto">Home</h1> </h1>
      </router-link>

      <router-link  :to="{  name:'coba'}">
        <h1 class="flex bg-warna1 w-[9rem] h-[3rem] rounded-lg"> <h1 class="m-auto">Cek</h1>  </h1>
      </router-link>
  
    
    </div>


</div>

</template>

<script >



</script>