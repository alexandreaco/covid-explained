<template>
  <div class="contact-us container">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center teal-text">Contact Us</h2>
      <div class="field">
        <label for="name">Name</label>
        <input id="name" type="text" v-model="name" />
      </div>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="field">
              <label class="active" for="textarea1">Message</label>
              <textarea v-model="sender.message" id="textarea1" class="materialize-textarea"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="field center">
        <button class="btn teal">
          Submit
          <i class="material-icons right">send</i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  data() {
    return {
      sender: {
        name: null,
        email: null,
        message: null,
      },
    };
  },
};
</script>

<style>
.contact-us {
  max-width: 400px;
  margin-top: 60px;
}
.contact-us h2 {
  font-size: 2.4em;
}
.contact-us .field {
  margin-bottom: 16px;
}
#textarea1 {
  height: 100px;
}
</style>
