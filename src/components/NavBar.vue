<template>
  <div class="navbar-fixed">
    <nav class="lighten-3">
      <div class="nav-wrapper teal lighten-3">
        <a href="#" class="brand-logo">
          <router-link :to="{ name: 'Home' }">
            COVID EXPLAINED
          </router-link>
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <a href="#">
              <router-link :to="{ name: 'AboutUs' }">
                About Us
              </router-link>
            </a>
          </li>
          <li>
            <a href="#"
              ><router-link :to="{ name: 'ContactUs' }">
                Contact Us
              </router-link>
            </a>
          </li>
          <li>
            <a href="#"
              ><router-link :to="{ name: 'AdminLogin' }">
                Admin Login
              </router-link>
            </a>
          </li>
        </ul>
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
nav .brand-logo {
  padding: 0 10px;
}
</style>
