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
        <social-sharing
          :url="postURL"
          :title="postDescription"
          :description="postDescription"
          :quote="postDescription"
          hashtags="covidexplained"
          inline-template
        >
          <div class="social-links">
            <network network="facebook" class="social-link">
              <i class="fab fa-facebook-square"></i>
              Facebook
            </network>
            <network network="linkedin" class="social-link">
              <i class="fa fa-linkedin social-links"></i>
              LinkedIn
            </network>
            <network network="twitter" class="social-link">
              <i class="fa fa-twitter social-links"></i>
              Twitter
            </network>
          </div>
        </social-sharing>
        <div class="author-and-date">
          <p v-if="this.post.author">By {{ post.author }}</p>
          <p v-if="this.post.createdAt">
            Last updated on {{ new Date(post.updatedAt) }}
          </p>
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
      postURL: `https://covid-explained.firebaseapp.com/post/${this.$route.params.postId}`,
      post: null,
      postDescription: null,
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
    console.log('this.$route:', this.$route);
    db.collection('posts')
      .doc(this.postId)
      .get()
      .then(doc => {
        let post = doc.data();
        post.id = doc.id;
        this.post = post;
        this.postDescription = `${this.post.title}: ${this.post.subtitle}`;
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
  margin-left: 150px;
  padding: 10px 150px;
  top: 64px;
}
.transparent-background {
  align-content: center;
  /* background-image: linear-gradient(45deg, #d7f5e3, #b8f7f6); */
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
.post-title h3 {
  /* color: white;
  font-size: 70px;
  text-shadow: -1px 0 rgb(87, 143, 127), 0 1px black, 3px 0 rgb(87, 143, 127),
    0 -1px rgb(87, 143, 127); */
}

.edit:hover {
  opacity: 0.5;
  cursor: pointer;
}

.social-links {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
