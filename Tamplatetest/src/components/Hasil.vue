

<template>

  <div class="w-full h-screen overflow-hidden bg-coba2">
    <h1 class="text-warna1 text-center text-2xl font-bold font-sans my-8">Ticket Filem Anda </h1>

    <div class="grid grid-cols-4 p-4 gap-6 w-full h-[40rem] overflow-auto">
      <div
        v-for="(item, index) in matchedData"
        :key="item.id"
        class="hover:scale-110 duration-300 hover:shadow-bayang hover:text-warna1 text-white h-[20rem]"
      >
        <div class="flex group flex-col gap-2 justify-center items-center">
          <div class="relative  p-4 ">
            <img
              :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
              alt="foto"
              class="w-[15rem] h-[15rem] object-contain"
            />

          </div>

          <h1 >{{ item.title }}</h1>

        </div>
      </div>
    </div>


  </div>

</template>

<script >
import { ref } from 'vue'
import axiosClient from '../axiosClient';
import axiosClient2 from '../axiosClient2';




export default {

  data() {
    return {
      datas: [],
      datas2: [], // Data dari API kedua
     
      matchedData: [] // Data yang sesuai

    };
  },


methods : {


  async DataApi() {
    try {
      const response = await axiosClient2.get('/data');
      this.datas = response.data;
      console.log('datas', this.datas);

      // Setelah data1 diambil, coba ambil data2
      await this.Datafilem();
    } catch (error) {
      console.log(error);
    }
  },

  async Datafilem() {
    try {
      const response = await axiosClient.get('/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc');
      this.datas2 = response.data.results;
      console.log('datas2', this.datas2);

      // Filter data berdasarkan kriteria yang diinginkan
      this.filterData();
    } catch (error) {
      console.log(error);
    }
  },

  filterData() {  // Ingat kalo mau filtering Tipe datanya harus sama !
    
    this.matchedData = this.datas2.filter(item2 => 
      this.datas.some(item1 => item1.id === item2.id) 
    );
    console.log('Matched Data', this.matchedData);
  } 

  },


async created () {
  await this.DataApi();
  await this.Datafilem();
   this.filterData();
}

}

</script>