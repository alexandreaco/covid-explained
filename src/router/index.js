import Vue from 'vue';
import Router from 'vue-router';
import Post from '@/components/Post';
import Home from '@/components/Home';
import AboutUs from '@/components/AboutUs';
import ContactUs from '@/components/ContactUs';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about-us',
      name: 'AboutUs',
      component: AboutUs,
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: ContactUs,
    },
    {
      path: '/post/:postId',
      name: 'Post',
      component: Post,
    },
  ],
});
