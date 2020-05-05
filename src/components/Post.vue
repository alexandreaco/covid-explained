<template>
  <div class="post">
    <div class="transparent-background">
      <div v-if="post">
        <div class="post-title">
          <h3>{{ post.title }}</h3>
          <i
            v-if="admin"
            class="material-icons edit"
            @click="redirectToEditPost(post.id)"
            >edit</i
          >
        </div>
        <br />
        <social-sharing :url="this.postId" inline-template>
          <div class="social-icons">
            <network network="facebook">
              <i class="fa fa-facebook"></i> Facebook
            </network>
            <network network="linkedin">
              <i class="fa fa-linkedin"></i> LinkedIn
            </network>
            <network network="twitter">
              <i class="fa fa-twitter"></i> Twitter
            </network>
          </div>
        </social-sharing>
        <div class="author-and-date">
          <p>
          <span class="bullet" v-bind:class="post.topic"></span>
          <span v-if="this.post.author">By {{ post.author }}</span>
          <span v-if="this.post.createdAt">
            {{ new Date(post.updatedAt) }}
          </span>
        </p>
        </div>
        <div id="ck-output" class="post-body"></div>
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
    createSocialMediaLinks() {
      var element = document.getElementById('links');
    },
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

      // Make Child Component:
      var div = document.createElement('div');
      div.innerHTML = string;

      // Attach child component to element:
      element.innerHTML = '';
      element.appendChild(div);
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
    console.log('this.$route:', this.$route.fullPath);
    db.collection('posts')
      .doc(this.postId)
      .get()
      .then(doc => {
        let post = doc.data();
        post.id = doc.id;
        this.post = post;
        this.$nextTick(function() {
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
  display: flex;
  justify-content: center;
  top: 64px;
  max-width:900px;
}
.post-body{
  font-size:18px;
  line-height:24px;
}
.transparent-background {
  align-content: center;
  padding: 50px;
  margin: 50px 0px 00px 0px;
  min-height: 600px;
}
img {
  max-height: 300px;
  width: 100%;
  margin: auto;
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

.social-icons {
  font-size:11px;
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
