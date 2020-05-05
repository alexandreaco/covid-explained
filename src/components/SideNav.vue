<template>

  <div class="container">

    <div class="lg:px-16 px-6  lg:py-0 py-2 menu-wrapper">

      <label for="menu-toggle" class="pointer-cursor lg:hidden">
               <svg class="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title>
                 <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
               </svg>
             </label>
      <input class="hidden" type="checkbox" id="menu-toggle" />

      <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
        <div class="nav">
          <ul>
            <li>
              <router-link :to="{ name: 'Topic', params: { topicName: 'explainers' } }">
                <span class="explainers bullet"></span> Explainers
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Topic', params: { topicName: 'definitions' } }">
                <span class="definitions bullet"></span> Definitions
              </router-link>
            </li>
            <li>
              <a href="#" class="brand-logo">
                <router-link :to="{ name: 'Topic', params: { topicName: 'questions' } }">
                  <span class="questions bullet"></span> Questions
                </router-link>
              </a>
            </li>

          </ul>
          <ul>

            <li>
              <a href="#">
                <router-link :to="{ name: 'AboutUs' }">About Us</router-link>
              </a>
            </li>
            <li>
              <a href="#">
                <router-link :to="{ name: 'OurSources' }">Our Sources</router-link>
              </a>
            </li>
            <li>
              <a href="#">
                <router-link :to="{ name: 'ContactUs' }">Contact Us</router-link>
              </a>
            </li>
          </ul>
        </div>
      </div>

    </div>

    <ul class="if-admin">
      <li v-if="!admin">
        <a href="#">
          <router-link class="white-text admin-links" :to="{ name: 'AdminLogin' }">Admin Log In</router-link>
        </a>
      </li>
      <li v-if="admin">
        <a href="#">
                <a class="white-text admin-links" @click="redirectToAddPost"
                  >Create New Post</a
                >
              </a>
      </li>
      <li v-if="admin">
        <a href="#">
                <a class="white-text admin-links" @click="logout">Log Out</a>
        </a>
      </li>
    </ul>
  </div>

</template>

<script>

  import firebase from 'firebase'
  import db from '@/firebase/init'
  export default {
    data: () => {
      return {
        admin: null,
        adminFromDb: null,
        isSuperAdmin: false,
        isApproved: false
      }
    },
    methods: {
      logout() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push({ name: 'AdminLogin' })
          })
      },
      redirectToAddPost() {
        this.$router.push({ name: 'AddPost' })
      },

      checkApprovalStatus(adminId) {
        console.log('adminId:', adminId)
        db.collection('users')
          .doc(adminId)
          .get()
          .then(doc => {
            console.log('doc:', doc.data())
            // let adminFromDb = doc.data();
            // adminFromDb.id = doc.id;
            // this.adminFromDb = adminFromDb;
          })
          .then(() => {
            console.log('this.adminFromDb:', this.adminFromDb)
            // if (this.adminFromDb.isApproved === true) {
            //   this.isApproved = true;
            // }
          })
      },

      checkIfAdminIsSuperAdmin() {
        if (this.admin.email === 'liv@someemail.com') {
          this.isSuperAdmin = true
        }
      }
    },
    created() {
      //let admin = firebase.auth().currentUser;
      firebase.auth().onAuthStateChanged(admin => {
        if (admin) {
          this.admin = admin
          console.log('this.admin:', this.admin.id)
          //this.checkApprovalStatus(this.admin.id);
          this.checkIfAdminIsSuperAdmin()
        } else {
          this.admin = null
        }
      })
    }
  }

</script>

<style scoped>

  .container {
    position: fixed;
    z-index: 3;
  }
  .container .nav {
    background: #f4f3e9;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    top: 60px;
    right: 0;
    width: 150px;
    padding: 1rem;
    bottom: 0;
  }

  .bullet {
    display: inline-block;
    width: 10px;
    height: 10px;
  }

  .container .if-admin {
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: 5;
  }

  ul {
    display: flex;
    flex-direction: column;
  }

  .container li:hover {
    opacity: 0.75;
  }
  .container li {
    padding: 5px 0px;
    margin: 0;
  }
  .admin-links {
    font-size: 12px;
    background: #fff;
    padding: 1rem;
  }
  .menu-wrapper {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #f4f3e9;
  }

  #menu-toggle:checked + #menu {
    display: block;
  }

</style>
