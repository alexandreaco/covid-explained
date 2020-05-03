<template>
  <div class="container">
    <ul>
      <li>
        <router-link
          :to="{ name: 'Topic', params: { topicName: 'explainers' } }"
        >
          <p class="white-text">EXPLAINERS</p>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'Topic', params: { topicName: 'definitions' } }"
        >
          <p class="white-text">DEFINITIONS</p>
        </router-link>
      </li>
      <li>
        <a href="#" class="brand-logo">
          <router-link
            :to="{ name: 'Topic', params: { topicName: 'questions' } }"
          >
            <p class="white-text">QUESTIONS</p>
          </router-link>
        </a>
      </li>
      <li>
        <router-link
          :to="{ name: 'Topic', params: { topicName: 'scenarios' } }"
        >
          <p class="white-text">SCENARIOS</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Topic', params: { topicName: 'news' } }">
          <p class="white-text">IN THE NEWS</p>
        </router-link>
      </li>
    </ul>
    <ul>
      <li v-if="!admin">
        <a href="#">
          <router-link
            class="white-text admin-links"
            :to="{ name: 'AdminLogin' }"
            >Admin Log In</router-link
          >
        </a>
      </li>
      <!-- <li v-if="!admin">
        <a href="#">
          <router-link
            class="white-text admin-links"
            :to="{ name: 'AdminSignup' }"
            >Admin Sign Up</router-link
          >
        </a>
      </li> -->
      <!-- <li v-if="admin && isSuperAdmin">
        <a href="#">
          <router-link
            class="white-text admin-links"
            :to="{ name: 'AdminApproval' }"
            >Admin Approval</router-link
          >
        </a>
      </li> -->
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
import firebase from 'firebase';
import db from '@/firebase/init';
export default {
  data: () => {
    return {
      admin: null,
      adminFromDb: null,
      isSuperAdmin: false,
      isApproved: false,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: 'AdminLogin' });
        });
    },
    redirectToAddPost() {
      this.$router.push({ name: 'AddPost' });
    },

    checkApprovalStatus(adminId) {
      console.log('adminId:', adminId);
      db.collection('users')
        .doc(adminId)
        .get()
        .then(doc => {
          console.log('doc:', doc.data());
          // let adminFromDb = doc.data();
          // adminFromDb.id = doc.id;
          // this.adminFromDb = adminFromDb;
        })
        .then(() => {
          console.log('this.adminFromDb:', this.adminFromDb);
          // if (this.adminFromDb.isApproved === true) {
          //   this.isApproved = true;
          // }
        });
    },

    checkIfAdminIsSuperAdmin() {
      if (this.admin.email === 'liv@someemail.com') {
        this.isSuperAdmin = true;
      }
    },
  },
  created() {
    //let admin = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(admin => {
      if (admin) {
        this.admin = admin;
        console.log('this.admin:', this.admin.id);
        //this.checkApprovalStatus(this.admin.id);
        this.checkIfAdminIsSuperAdmin();
      } else {
        this.admin = null;
      }
    });
  },
};
</script>

<style scoped>
.container {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 150px;
  padding: 10px;
  padding-top: 74px;
  min-height: calc(100vh - 20px);
  background-color: rgb(25, 136, 134);
  z-index: 1;
  bottom: 0;
}

ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container li:hover {
  opacity: 0.5;
}
.container li {
  padding: 5px 0px;
  margin: 0;
}
.admin-links {
  font-size: 12px;
}
</style>
