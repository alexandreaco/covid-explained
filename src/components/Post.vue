<template>
  <div class="post">
    <div class="transparent-background">
      <div v-if="this.post">
        <div class="post-title">
          <h3>{{ post.title }}</h3>
          <i v-if="admin" class="material-icons edit" @click="redirectToEditPost(post.id)">edit</i>
        </div>
        <div class="author-and-date">
          <p v-if="this.post.author">By {{ post.author }}</p>
          <p v-if="this.post.createdAt">Posted on {{ new Date(post.createdAt) }}</p>
        </div>
        <div id="ck-output"></div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
import firebase from 'firebase';

export default {
  name: 'Post',
  data() {
    return {
      admin: null,
      postId: this.$route.params.postId,
      post: null,
    };
  },
  methods: {
    getData: function() {
      return this.$http.get('<div>').then(response => {
        // return the Promise so .then() above works.
        this.data = response.body;
        return response;
      });
    },
    displayCKEditorContent(string) {
      // console.log('string:', string, typeof string);

      //Get element:
      var element = document.getElementById('ck-output');
      console.log('1. element:', element, typeof element);

      // Make Child Component:
      var div = document.createElement('div');
      div.innerHTML = string;
      console.log('div:', div, typeof div);

      // Attach child component to element:
      element.innerHTML = '';
      element.appendChild(div);
      console.log('2. element:', element, typeof element);
    },
    redirectToEditPost(postId) {
      this.$router.push({ name: 'EditPost', params: { postId: postId } });
    },
    setAdminIfLoggedIn() {
      let admin = firebase.auth().currentUser;
      firebase.auth().onAuthStateChanged(admin => {
        if (admin) {
          this.admin = admin;
        } else {
          this.admin = null;
        }
      });
    },
  },
  created() {
    db.collection('posts')
      .doc(this.postId)
      .get()
      .then(doc => {
        let post = doc.data();
        post.id = doc.id;
        this.post = post;
        console.log('CREATED this.post:', this.post);
        console.log('CREATED this.post.text:', this.post.text);
        this.$nextTick(function() {
          // DOM is now updated
          // `this` is bound to the current instance
          this.displayCKEditorContent(this.post.text);
        });
      });
    this.setAdminIfLoggedIn();
  },
  mounted() {},
};
</script>
<style scoped>
.post {
  margin-left: 150px;
  padding: 10px 150px;
  background-color: #60a09e;
  position: absolute;
  top: 64px;
  bottom: 0;
  position: absolute;
}
.transparent-background {
  align-content: center;
  background-color: rgb(240, 255, 255, 0.25);
  padding: 50px;
  margin: 50px 0px 00px 0px;
  min-height: 600px;
}
img {
  max-height: 300px;
  max-width: 300px;
  margin: 5px 20px 0px 0px;
  float: left;
}
h3 {
  margin: 0px;
}
p {
  margin: 0;
}
.author-and-date {
  margin: 10px 0px;
}
.author-and-date p {
  font-size: 10px;
}

.post-title {
  display: flex;
  justify-content: space-between;
}

.edit:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>
