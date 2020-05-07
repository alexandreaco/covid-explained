<template>
  <div class="contact-us container">
    <form class="card-panel" @submit.prevent="signup">
      <h4 class="mb-4 text-xl md:text-3xl font-light">Contact Us</h4>
      <div class="field">
        <label for="senderName">Name</label>
        <input id="senderName" type="text" v-model="senderName" />
      </div>
      <div class="field">
        <label for="senderEmail">Email</label>
        <input id="senderEmail" type="email" v-model="senderEmail" />
      </div>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="field">
              <label class="active" for="message">Message</label>
              <textarea v-model="message" id="message" class="materialize-textarea"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="field center">
        <button class="btn">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'ContactUs',
  data() {
    return {
      senderName: null,
      senderEmail: null,
      message: null,
    };
  },
  methods: {
    createMessage() {
      db.collection('messages')
        .add({
          senderName: this.senderName,
          senderEmail: this.senderEmail.toLowerCase(),
          message: this.message,
          createdAt: Date.now(),
        })
        .then(docRef => {
          this.$router.push({
            name: 'MessageSent',
          });
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    },
  },
};
</script>

<style scoped>
.contact-us {
  max-width: 900px;
  margin-top: 60px;
  padding: 0 20px;
}
.contact-us h3 {
  margin-bottom: 1rem;
}
.contact-us label {
  display: block;
}

.contact-us input,
.contact-us textarea {
  padding: 0.5rem;
  width: 300px;
}
.contact-us .field {
  margin-bottom: 16px;
}

.btn {
  border: 1px solid black;
  padding: 1rem;
}

#textarea1 {
  height: 100px;
  width: 300px;
}
</style>
