<template>
  <div class="navbar">
    <nav class="nav-extended teal lighten-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Home' }">
          <span class="nav-title">COVID EXPLAINED</span>
        </router-link>
        <router-link :to="{ name: 'AboutUs' }">
          About Us
        </router-link>
        <router-link :to="{ name: 'ContactUs' }">
          Contact Us
        </router-link>
        <router-link :to="{ name: 'AdminLogin' }">
          Admin Login
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {};
  },
};
</script>

<style>
.navbar nav {
  padding: 0 20px;
}
</style>
