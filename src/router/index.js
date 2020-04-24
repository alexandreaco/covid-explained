import Vue from 'vue';
import Router from 'vue-router';
import Post from '@/components/Post';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/post/:postId',
      name: 'Post',
      component: Post,
    },
  ],
});
