<template>
  <div class="container">
    <ul>
      <li>
        <router-link :to="{ name: 'Topic', params: { topicName: 'explainers' } }">
          <p class="white-text">EXPLAINERS</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Topic', params: { topicName: 'definitions' } }">
          <p class="white-text">DEFINITIONS</p>
        </router-link>
      </li>
      <li>
        <a href="#" class="brand-logo">
          <router-link :to="{ name: 'Topic', params: { topicName: 'questions' } }">
            <p class="white-text">QUESTIONS</p>
          </router-link>
        </a>
      </li>
      <!-- <li>
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
      </li>-->
    </ul>
    <ul>
      <li v-if="!authAdmin">
        <a href="#">
          <router-link class="white-text admin-links" :to="{ name: 'AdminLogin' }">Admin Log In</router-link>
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
      </li>-->
    </ul>
    <ul v-if="authAdmin">
      <li v-if="dbAdmin.isApproved && isSuperAdmin">
        <a href="#">
          <router-link class="white-text admin-links" :to="{ name: 'AdminApproval' }">Admin Approval</router-link>
        </a>
      </li>
      <li v-if="dbAdmin.isApproved">
        <a href="#">
          <a class="white-text admin-links" @click="redirectToAddPost">Create New Post</a>
        </a>
      </li>
      <li v-if="dbAdmin.isApproved">
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
      authAdmin: {},
      dbAdmin: {},
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
      db.collection('users')
        .doc(adminId)
        .get()
        .then(doc => {
          let dbAdmin = doc.data();
          dbAdmin.id = doc.id;
          this.dbAdmin = dbAdmin;
        });
    },

    checkIfAdminIsSuperAdmin() {
      if (this.authAdmin.email === 'livmarks@someemail.com') {
        this.isSuperAdmin = true;
      }
    },
  },
  created() {
    this.authAdmin = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(admin => {
      if (admin) {
        this.authAdmin = admin;
        this.checkApprovalStatus(this.authAdmin.uid);
        this.checkIfAdminIsSuperAdmin();
      } else {
        this.authAdmin = null;
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
