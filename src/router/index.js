import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

// Views:
import Home from '@/components/Home';
import Post from '@/components/Post';
import Topic from '@/components/Topic';
import AboutUs from '@/components/AboutUs';
import ContactUs from '@/components/ContactUs';
import AdminSignup from '@/components/AdminSignup';
import AdminLogin from '@/components/AdminLogin';
import EditPost from '@/components/EditPost';
import AddPost from '@/components/AddPost';

import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use(Router);

Vue.use(CKEditor);

const router = new Router({
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
      path: '/admin-signup',
      name: 'AdminSignup',
      component: AdminSignup,
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
      path: '/post/add',
      name: 'AddPost',
      component: AddPost,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/post/:postId',
      name: 'Post',
      component: Post,
    },
    {
      path: '/topic/:topicName',
      name: 'Topic',
      component: Topic,
    },
    {
      path: '/post/edit/:postId',
      name: 'EditPost',
      component: EditPost,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

// router guards
router.beforeEach((to, from, next) => {
  // check to see if route has auth guard
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      // User is signed in. Proceed to route
      next();
    } else {
      // No user is signed in. Redirect to login
      next({
        name: 'LogIn',
      });
    }
  } else {
    // if route is not guarded by auth, proceed
    next();
  }
});

export default router;
