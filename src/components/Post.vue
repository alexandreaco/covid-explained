<template>
  <div class="post">
    <div class="transparent-background">
      <div v-if="post">
        <div class="post-title">
          <h3>{{ post.title }}</h3>
          <i v-if="admin" class="material-icons edit" @click="redirectToEditPost(post.id)">edit</i>
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
        <!-- <span v-if="this.post.author">By {{ post.author }}</span>
            <span v-if="this.post.createdAt">
              {{ new Date(post.updatedAt) }}
        </span>-->
      </div>
      <div id="ck-output" class="post-body"></div>
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
};
</script>


<style scoped>
.post {
  padding: 0px 20px;
}

.post h3 {
  margin: 0px;
  font-size: 64px;
  line-height: 64px;
  max-width: 700px;
}

@media (max-width: 1024px) {
  h3 {
    font-size: 48px;
    line-height: 48px;
  }
}
.post-body {
  font-size: 18px;
  line-height: 24px;
  padding: 0rem;
  max-width: 900px;
}

.post-body img {
  /* height: 300px; */
  width: 100%;
  margin: auto;
}

p {
  margin: 2rem 0;
}
.author-and-date {
  margin: 10px 0px;
  font-size: 12px;
}

.social-icons {
  font-size: 12px;
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
