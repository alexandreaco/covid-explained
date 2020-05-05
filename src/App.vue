
<template>
  <div id="app">
    <NavBar />
    <SideNav />
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

<style>
body{
  font-family: 'Libre Franklin', sans-serif;
  background:#F4F3E9;
  color:#33322D;
  margin:120px 130px 100px 0;
}
h1,h2,h3,h4,.card-title{
  font-family: 'Playfair Display', serif;
}
h3 {
  margin: 0px;
  font-size:96px;
  line-height:100px;
}


.post-card {
  position: relative;
  width:30%;
  padding:1rem;
  margin:0 1rem 1rem 0;
  /* transform: rotate(-1deg); */
  transition:.5s all;
}
.post-card:hover {
    transform: rotate(.5deg);
}


.bullet{
  display: inline-block;
  width:10px;
  height:10px;
}


.questions{
  background:#DD694A;
  color:#F8E1DB;
}
.news{
  background:#33322D;
  color:#F4F3E9;
}
.definitions{
  background:#604E60;
  color:#FDFFFF;
}
.explainers{
  background:#197278;
  color:#FDFFFF;
}
.scenarios{
  background:#C7D3DD;
  /* color:#FDFFFF; */
}

.post-card.definitions{
  word-wrap: break-word;
  background: #D9BDD7;
  color:#604E60;
}
.post-card.explainers{
  color: #D1E3E4;
  /* color:#197278; */
}
.post-card.questions .card-title{
  /* font-family: 'Libre Franklin', sans-serif; */
  font-style: italic;

}
.definitions a .card-title {
    font-size: 48px;
    line-height: 48px;
    font-weight:100;
}
.definitions .text-author,.definitions .text-snippet,
.explainers .text-author,.explainers .text-snippet{
  display: none;
}

.search-bar{
  position: fixed;
  z-index:5;
  left:200px;
  top:20px;
}
.search-bar input{
  padding:1rem;
  border:1px solid gray;
}
</style>
