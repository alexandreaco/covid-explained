<template>
  <div class="login container">
    <form class="card-panel" @submit.prevent="checkIfAdminIsApproved">
      <h2 class="center teal-text">Log In</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn teal">login</button>
      </div>
    </form>
  </div>
</template>


<script>
import firebase from 'firebase';
import db from '@/firebase/init';

export default {
  name: 'AdminLogin',
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      isApproved: false,
    };
  },
  methods: {
    checkIfAdminIsApproved() {
      let lowerCaseEmail = this.email.toLowerCase();
      db.collection('users')
        .where('email', '==', lowerCaseEmail)
        .get()
        .then(snapshot => {
          let admin = {};
          snapshot.forEach(doc => {
            admin = doc.data();
            admin.id = doc.id;
          });
          if (admin.isApproved === true) {
            this.login();
          } else {
            alert(
              'Your account has not been approved yet. Please try again later.'
            );
          }
        });
    },
    login() {
      if (this.email && this.password) {
        this.feedback = null;

        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            this.$router.push({ name: 'Home' });
          })
          .catch(err => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = 'Please fill in both fields';
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin-top: 60px;
}
.login h2 {
  font-size: 2.4em;
}
.login .field {
  margin-bottom: 16px;
}
</style>
