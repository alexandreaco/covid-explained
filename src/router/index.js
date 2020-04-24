import Vue from 'vue';
import Router from 'vue-router';
import Post from '@/components/Post';
import Home from '@/components/Home';
import AboutUs from '@/components/AboutUs';
import ContactUs from '@/components/ContactUs';
import AdminLogin from '@/components/AdminLogin';

Vue.use(Router);

export default new Router({
  mode: 'history',
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
      path: '/admin-login',
      name: 'AdminLogin',
      component: AdminLogin,
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
