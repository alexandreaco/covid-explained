<template>
  <div id="app">
    <NavBar />
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>
