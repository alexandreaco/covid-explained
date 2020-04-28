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
          <p v-if="this.post.createdAt">Posted on {{ new Date(post.createdAt.seconds) }}</p>
        </div>
        <div class="text-and-img">
          <img :src="this.post.imgUrl" v-if="this.post.imgUrl" />
          <p>{{ post.text }}</p>
        </div>
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
      });
    this.setAdminIfLoggedIn();
  },
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
