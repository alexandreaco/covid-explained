
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
    background: #fff;
    color: #33322d;
    margin: 120px 20px 100px 20px;
  }
  @media (max-width: 1024px) {
    body {
      /* margin: 120px 0px 100px 0; */
    }
  }

  h1,
  h2,
  h3,
  h4 {
    /* font-family: 'Playfair Display', serif; */
    font-weight: 100;
  }
  h3 {
    margin: 0px;
    font-size: 96px;
    line-height: 96px;
  }
  @media (max-width: 1024px) {
    h3 {
      font-size: 48px;
      line-height: 48px;
    }
  }
  strong{
    font-weight:800;
  }


  @media (max-width: 1024px) {
    .post-card {
      width: 100%;
      margin: 0.25rem 0;
    }
  }

  .post-card:hover {
    opacity: 0.75;
  }

  .bullet {
    display: inline-block;
    width: 10px;
    height: 10px;
  }

  .questions {
    background: #dd694a;
  }

  .definitions {
    background: #6c446d;
  }
  .explainers {
    background: #197278;
  }

  .post-card.definitions {
    word-wrap: break-word;
    background: #d9bdd7;
    color: #6c446d;
  }
  .post-card.definitions .text-author {
    display: none;
  }
  .post-card.definitions .text-snippet {
  }
  .post-card.explainers,.post-card.explainers a {
    background: none;
    text-decoration: underline;
    text-decoration-color: #197278;
    padding: 1rem 0;
  }

  .post-card.explainers{
    text-decoration: none;
  }
  .post-card.explainers   .card-title {
    text-decoration: underline;
    text-decoration-color: #197278;
  }
    .post-card.explainers .text-snippet {
    text-decoration: none;
  }

  .post-card.questions,   .post-card.questions a{
    background: none;
    text-decoration: underline;
    text-decoration-color: #dd694a;
    padding: 1rem 0;
  }
  .text-snippet {
    font-size: 12px;
  }

  .search-bar input {
    padding: 1rem;
    border: 1px solid gray;
  }

</style>
