<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center teal-text">Sign Up</h2>
      <div class="field">
        <label for="name">Name</label>
        <input id="name" type="text" v-model="name" />
      </div>
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
        <button class="btn teal">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>


<script>
import firebase from 'firebase';
import db from '@/firebase/init';

export default {
  name: 'AdminLogin',
  data() {
    return {
      email: null,
      password: null,
      name: null,
      feedback: null,
    };
  },
  methods: {
    signup() {
      this.feedback = null;
      if (this.name && this.email && this.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user);
            db.collection('users')
              .add({
                name: this.name,
                email: this.email,
                password: this.password,
                userId: cred.user.uid,
              })
              .then(docRef => {
                console.log('Document written with ID: ', docRef.id);
                this.$router.push({ name: 'Home' });
              })
              .catch(error => {
                console.error('Error adding document: ', error);
              });
          })
          .catch(error => {
            console.error(error);
            this.feedback = error.message;
          });
      } else {
        this.feedback = 'You must enter all feilds.';
      }
    },
  },
};
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>
