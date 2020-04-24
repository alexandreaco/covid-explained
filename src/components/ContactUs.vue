<template>
  <div class="contact-us">
    <div class="transparent-background">
      <h3>SEND US A NOTE</h3>
      <div class="input-field col s6">
        <i class="material-icons prefix">account_circle</i>
        <input v-model="sender.name" id="name" type="text" class="validate" />
        <label class="active" for="name">Name</label>
      </div>
      <div class="input-field col s6">
        <i class="material-icons prefix">phone</i>
        <input
          v-model="sender.email"
          id="email"
          type="email"
          class="validate"
        />
        <label class="active" for="email">Email</label>
      </div>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <i class="material-icons prefix">mode_edit</i>
              <textarea
                v-model="sender.message"
                id="textarea1"
                class="materialize-textarea"
              ></textarea>
              <label class="active" for="textarea1">Message</label>
            </div>
          </div>
        </form>
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">
        Submit
        <i class="material-icons right">send</i>
      </button>
    </div>
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
  text-align: center;
  padding: 50px 150px;
  background-color: #60a09e;
  position: absolute;
  top: 64px;
  bottom: 0;
  height: 100%;
  width: 100%;
}

.transparent-background {
  background-color: rgb(240, 255, 255, 0.25);
  padding: 50px;
  margin: 50px 10px 50px 0px;
  min-height: 600px;
}

.input-field label {
  color: rgb(172, 223, 221);
}

#textarea1 {
  height: 100px;
}
</style>
