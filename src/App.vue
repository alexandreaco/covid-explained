
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
  margin:120px 100px 100px 0;
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
  width: 300px;
  height: 300px;
  padding:1rem;
  margin:0 1rem 1rem 0;
  transform: rotate(-1deg);
  transition:.5s all;
}
.post-card:hover {
    transform: rotate(.5deg);
}


.questions{
  background:#CF5C36;
  color:#FDFFFF;
}
.news{
  background:#C7D3DD;
}
.definitions{
  background:#736372;
  color:#FDFFFF;
}

.explainers{
  background:#197278;
  color:#FDFFFF;
}
.scenarios{
  background:#283D3B;
  color:#FDFFFF;
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
