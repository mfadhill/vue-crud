<template>
  <div class="flex h-screen w-full">
    <!-- Sidebar atau Navbar -->
    <Navbar class="w-64 bg-gray-800 text-white" />

    <!-- Konten utama -->
    <div class="flex-1 overflow-auto bg-gray-100">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
/* Styling global jika diperlukan */
</style>
