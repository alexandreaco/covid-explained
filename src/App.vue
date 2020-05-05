
<template>

  <div id="app">
    <NavBar />
    <SideNav />
    <router-view />
  </div>

</template>

<script>

  import NavBar from '@/components/NavBar'
  import SideNav from '@/components/Sidenav'
  export default {
    name: 'App',
    components: {
      NavBar,
      SideNav
    }
  }

</script>

<style>

  body {
    font-family: 'Libre Franklin', sans-serif;
    background: #f4f3e9;
    color: #33322d;
    margin: 120px 130px 100px 0;
  }
  @media (max-width: 1024px){
    body {
        margin: 120px 0px 100px 0;
    }

  }

  h1,
  h2,
  h3,
  h4,
  .card-title {
    font-family: 'Playfair Display', serif;
  }
  h3 {
    margin: 0px;
    font-size: 96px;
    line-height: 100px;
  }

  .post-card {
    position: relative;
    width: 33%;
    padding: 1rem;
    margin: 0.15%;
    /* transform: rotate(-1deg); */
    transition: 0.5s all;
  }
  .post-card:hover {
    transform: rotate(0.5deg);
  }

  .bullet {
    display: inline-block;
    width: 10px;
    height: 10px;
  }

  .questions {
    background: #dd694a;
    color: #f8e1db;
  }
  .news {
    background: #33322d;
    color: #f4f3e9;
  }
  .definitions {
    background: #604e60;
    color: #fdffff;
  }
  .explainers {
    background: #197278;
    color: #fdffff;
  }
  .scenarios {
    background: #c7d3dd;
  }

  .post-card.definitions {
    word-wrap: break-word;
    background: #d9bdd7;
    color: #604e60;
  }
  .post-card.definitions .text-author,
  .post-card.definitions .text-snippet {
  }
  .post-card.explainers {
    color: #d1e3e4;
  }
  .post-card.news {
    border-bottom: 1px solid #33322d;
    padding: 1rem 0;
    color: #33322d;
    background: #f4f3e9;
    width: 100%;
  }
  .text-snippet {
    font-size: 12px;
  }

  .search-bar {
    position: fixed;
    z-index: 5;
    left: 200px;
    top: 20px;
  }
  .search-bar input {
    padding: 1rem;
    border: 1px solid gray;
  }

</style>
