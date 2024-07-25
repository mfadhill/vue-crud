<template>
  <div id="app" class="flex flex-col h-screen w-full">
    <router-view class="flex-1"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>

#app {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Mengatur tinggi penuh layar */
  width: 100vw;  /* Mengatur lebar penuh layar */
}
</style>
