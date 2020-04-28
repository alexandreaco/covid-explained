<template>
  <div class="container">
    <ul>
      <li>
        <a href="#" class="brand-logo">
          <router-link :to="{ name: 'Topic', params: { topicName: 'questions' } }">
            <p class="white-text">QUESTIONS</p>
          </router-link>
        </a>
      </li>
      <li>
        <router-link :to="{ name: 'Topic', params: { topicName: 'scenarios' } }">
          <p class="white-text">SCENARIOS</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Topic', params: { topicName: 'definitions' } }">
          <p class="white-text">DEFINITIONS</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Topic', params: { topicName: 'explainers' } }">
          <p class="white-text">EXPLAINERS</p>
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
          <router-link class="white-text admin-links" :to="{ name: 'AdminLogin' }">Admin Log In</router-link>
        </a>
      </li>
      <li v-if="!admin">
        <a href="#">
          <router-link class="white-text admin-links" :to="{ name: 'AdminSignup' }">Admin Sign Up</router-link>
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

export default {
  data: () => {
    return {
      admin: null,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push(-1);
        });
    },
  },
  created() {
    let admin = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(user => {
      if (admin) {
        this.admin = admin;
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
