<template>
  <div>
    <h1 class="text-warna1 text-center text-2xl font-bold font-sans my-8">FIlemSukaKu.com</h1>

    <div class="grid grid-cols-4 p-4 gap-6 w-full h-[40rem] overflow-auto">
      <div
        v-for="(item, index) in datas"
        :key="item.id"
        class="hover:scale-110 duration-300 hover:shadow-bayang hover:text-warna1 text-white"
      >
        <div class="flex group flex-col gap-2 justify-center items-center">
          <div class="relative  p-4 ">
            <img
              :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
              alt="foto"
              class="w-[15rem] h-[15rem] object-contain"

              
            />
            <button @click="handleClick(item)" 
                    class="hidden group-hover:block absolute top-[8rem] right-[7rem] group-hover:text-warna1 text-transparent text-xl">
                <img src="../assets/play.png" alt="" class="w-15 h-15 object-contain">
            </button>

          </div>

          <h1 >{{ item.title }}</h1>

        </div>
      </div>
    </div>

  </div>

          <!-- Detail Produk -->
          <figure v-show="showDetail"  class="flex justify-center items-center  z-9 fixed top-[5rem] left-[1rem] w-full  h-[40rem]  animate-status" >
            <div  v-if="filteredPick" class="flex relative w-[50rem] h-[34rem] bg-biru rounded-xl">
                  <button @click="closePopup" class="  w-[2.2rem] h-[2rem] font-bold text-xl absolute rounded-full bg-white right-[1rem] md:right-10 top-[2rem] md:top-[2rem] hover:text-red">X</button>
                  <article v-show="!pesan"  v-for="item in filteredPick" :key="item.id"  class="flex flex-col justify-center items-center bg- h-[32rem] w-full m-4 ">
                      <div class=" flex justify-center items-center  h-full w-full">
                          <div class=" w-[40rem] h-[24rem]">
                            <img
                              :src="`https://image.tmdb.org/t/p/w500${item.backdrop_path}`"
                              alt="foto"
                              class=" w-full h-full  object-contain"
                            />
                          </div>
                          <div class="flex justify-around items-center bottom-[11rem] w-full h-[2rem] absolute text-warna1  font-KodeMono font-extrabold text-[1.1rem]">
                            <span class="bg-black px-3 rounded-lg">Rate : {{ item.vote_average }}</span>
                            <span class="bg-black px-3 rounded-lg">Release : {{ item.release_date }}</span>
                          </div>
                      </div>
                      <div class="flex flex-col justify-around items-center h-1/2 w-full p-5 gap-4 text-white">
                          <div class="w-full h-[2rem] text-2xl text-center font-Calistoga"><h1>{{ item.title }}</h1></div>
          

                          <div><button @click="() => { PesanTiket(item.id); generateQRCode(item);  } " class="w-[12rem] h-[2rem] bg-warna1  font-bold rounded-md text-black">Pesan Tiket</button></div>
                      </div>
            
                  </article>

                  <article v-show="pesan"  v-for="item in filteredPick" :key="item.id"  class="flex  justify-center items-center bg- h-full w-full m-4 ">
                    <div class="flex flex-col w-[20rem] h-[20rem] justify-center items-center gap-5" >
                      <button @click="generateQRCode(item)" class="text-warna1 text-2xl ">Scan Code Anda</button>
                      <canvas :id="`qrcode-${item.id}`" class="bg-white"></canvas>
                      <!-- <button @click="selectForScan(item)">Scan QR Code</button> -->
                    </div>
                  </article>

            </div>
        </figure>

</template>

<script>
import axiosClient from '../axiosClient';
import axiosClient2 from '../axiosClient2';
import QRCode from 'qrcode';
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  components: {
    QrcodeStream,
  },
  data() {
    return {
      datas: [],
      scanning: false,
      picks : '',  
      picks2 : '',  
      showDetail: false,
      pesan: false,

    };
  },

  computed: {

    filteredPick() {
      return this.datas.filter(item => item.id === this.picks);
     
    }
  },

  async created() {
    try {
      const response = await axiosClient.get(
        '/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
      );
      this.datas = response.data.results;
      console.log('data', response.data.results);
    } catch (error) {
      console.log(error);
    }
  },

  
  methods: {

    async SubmitData() {
      try {
        const formData = new FormData();
        formData.append('id', this.picks);
        formData.append('original_title', this.picks2);

        const { data } = await axiosClient2.post("/data", formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (data) {
          alert("Tiket Berhasil dibuat");
          // Clear form after submission
          this.picks = '';
          this.picks2 = '';
    
          // this.SlideBerhasil = true;
        } else {
          alert("Registrasi gagal");
        }
      } catch (error) {
        alert("Error, please try again: " + error.message);
      }
    },


    generateQRCode(item) {
    const canvas = document.getElementById(`qrcode-${item.id}`);
    if (canvas) {

      // Dapatkan base URL dari axiosClient2
      const baseURL = axiosClient2.defaults.baseURL;
  
      // Bangun URL API dengan parameter
      // const apiUrl = `${baseURL}/data?itemId=${item.id}&title=${encodeURIComponent(item.title)}`;
      const apiUrl = `${baseURL}/TicketAnda`
      // Encode URL ke dalam QR Code
      console.log('Generating QR Code with URL:', apiUrl);
      QRCode.toCanvas(
        canvas,
        apiUrl,
        { width: 200 },
        function (error) {
          if (error) {
            console.error('Error generating QR Code:', error);
          } else {
            console.log('QR Code generated for URL:', apiUrl);
          }
        }
      );
    } else {
      console.error('Canvas element not found for item:', item);
    }

    this.SubmitData()
  },

  displayDetail() {
      this.showDetail = true;
    },
    closePopup() {
      this.showDetail = false;
      this.pesan = false
    },
    pick(value){
      this.picks = value,
      console.log('Data Pick : ', value)
    },

    handleClick(item) {
      this.displayDetail();
      this.picks = item.id;
      this.picks2 = item.original_title;
    },

    PesanTiket(){
      this.pesan = true
    },
}

};
</script>

<style scoped>
/* Tambahkan gaya Anda di sini */
qrcode-stream {
  width: 100%;
  height: 400px;
}
</style>
