<template>
  <div id="app">
    <NavBar />
    <SideNav />
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import SideNav from '@/components/Sidenav';

export default {
  name: 'App',
  components: {
    NavBar,
    SideNav,
  },
};
</script>
