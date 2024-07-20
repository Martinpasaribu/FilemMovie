<template>
  <div class="flex ">

    <SideBar />
    <main class="pt-2 flex-1 w-full h-screen overflow-hidden bg-coba2">
      <router-view />
    </main>
   
  </div>
</template>

<script setup>
import SideBar from '../components/SideBar.vue'
</script>

<style scoped>
.bg-coba2 {
  background-image: url('/src/assets/bg5.jpg');
  background-size: cover; /* Membuat gambar mencakup seluruh elemen tanpa merusak proporsi */
  background-position: center; /* Memastikan gambar terpusat di elemen */
  background-repeat: no-repeat; /* Mencegah pengulangan gambar */
}
</style>