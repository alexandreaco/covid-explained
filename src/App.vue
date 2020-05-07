<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
require('dotenv').config();
export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style>
body {
  font-family: 'Libre Franklin', sans-serif;
  background: #fff;
  color: #33322d;
  margin: 120px 20px 100px 20px;
}
@media (max-width: 1024px) {
  body {
    margin: 80px 20px 100px 20px;
  }
}

h1,
h2,
h3,
h4 {
  /* font-family: 'Playfair Display', serif; */
  font-weight: 100;
}

strong {
  font-weight: 800;
}

.post-card.definitions .text-author {
  display: none;
}

.post-card.explainers {
  text-decoration: none;
}

.post-card.explainers .text-snippet {
  text-decoration: none;
}

.underline-orange {
  text-decoration: underline;
  text-decoration-color: #dd694a;
}

.underline-teal {
  text-decoration: underline;
  text-decoration-color: #197278;
}

.underline-orange:hover,
.underline-teal:hover {
  text-decoration: underline;
  text-decoration-color: #33322d;
}

.text-snippet {
  font-size: 12px;
}

input,
textarea {
  padding: 1rem;
  border: 1px solid gray;
}
</style>
