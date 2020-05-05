<template>
  <div class="contact-us container">
    <form class="card-panel" @submit.prevent="signup">
      <h3 class="center teal-text">Contact Us</h3>
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
              <textarea
                v-model="message"
                id="textarea1"
                class="materialize-textarea"
              ></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="field center">
        <button class="btn">
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
      name: null,
      email: null,
      message: null,
    };
  },
};
</script>

<style scoped>
.contact-us {
  max-width: 900px;
  margin-top: 60px;
  padding:0 20px;
}
.contact-us h3 {
  margin-bottom:1rem;
}
.contact-us label {
  display: block;
}
.contact-us  input{
    padding:.5rem;
}
.contact-us .field {
  margin-bottom: 16px;
}

.btn {
  border:1px solid black;
  padding:1rem;
}

#textarea1 {
  height: 100px;
}
</style>
