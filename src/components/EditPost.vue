<template>
  <div class="edit-post container">
    <form class="card-panel" @submit.prevent>
      <h2 class="center teal-text">Edit Post</h2>
      <div class="field">
        <label for="title">Title</label>
        <input id="title" type="text" v-model="title" />
      </div>
      <div class="field">
        <label for="author">Author</label>
        <input id="author" type="text" v-model="author" />
      </div>
      <div class="field">
        <label for="topic">Topic</label>
        <p>
          <label>
            <input name="topic" type="radio" value="questions" v-model="topic" />
            <span>QUESTIONS</span>
          </label>
        </p>
        <p>
          <label>
            <input name="topic" type="radio" value="scenarios" v-model="topic" />
            <span>SCENARIOS</span>
          </label>
        </p>
        <p>
          <label>
            <input name="topic" type="radio" value="definitions" v-model="topic" />
            <span>DEFINITIONS</span>
          </label>
        </p>
        <p>
          <label>
            <input name="topic" type="radio" value="explainers" v-model="topic" />
            <span>EXPLAINERS</span>
          </label>
        </p>
        <p>
          <label>
            <input name="topic" type="radio" value="news" v-model="topic" />
            <span>IN THE NEWS</span>
          </label>
        </p>
        <!-- <label for="topic">Topic</label>
        <input id="topic" type="text" v-model="topic" />-->
      </div>
      <div class="field">
        <label for="imgUrl">Image URL</label>
        <input id="imgUrl" type="text" v-model="imgUrl" />
      </div>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="field">
              <label class="active" for="textarea1">Text</label>
              <textarea v-model="text" id="textarea1" class="materialize-textarea"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="field center">
        <button class="btn teal" @click="updatePost">
          Submit Changes
          <i class="material-icons right">send</i>
        </button>
        <button class="btn red">
          Delete Post
          <i class="material-icons right">delete</i>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import db from '@/firebase/init';

export default {
  name: 'EditPost',
  data() {
    return {
      postId: this.$route.params.postId,
      title: null,
      imgUrl: null,
      text: null,
      author: null,
      topic: null,
      selected: '',
    };
  },
  watch: {
    $route(to, from) {
      this.updatePostId();
    },
  },
  methods: {
    deletePost() {},
    updatePostId() {
      this.postId = this.$route.params.postId;
      this.getPost();
    },
    getPost() {
      db.collection('posts')
        .doc(this.postId)
        .get()
        .then(doc => {
          console.log('doc:', doc.data());
          this.title = doc.data().title;
          this.text = doc.data().text;
          this.author = doc.data().author;
          this.topic = doc.data().topic;
          this.imgUrl = doc.data().imgUrl;
        });
    },
    updatePost() {
      db.collection('posts')
        .doc(this.postId)
        .set({
          title: this.title,
          text: this.text,
          topic: this.topic,
          author: this.author,
          imgUrl: this.imgUrl,
          updatedAt: Date.now(),
        })
        .then(() => {
          console.log('Document successfully written!');
          this.$router.push({ name: 'Post', params: { postId: this.postId } });
        })
        .catch(error => {
          console.error('Error writing document: ', error);
        });
    },
  },
  created() {
    this.getPost();
  },
};
</script>
<style scoped>
.edit-post {
  margin-left: 150px;
  padding: 50px 0px 10px 150px;
  /* max-width: 600px;
  margin-top: 60px;
  margin-left: 150px; */
}
.edit-post h2 {
  font-size: 2.4em;
}
.edit-post .field {
  margin-bottom: 16px;
}
#textarea1 {
  height: 300px;
}
.btn {
  margin: 5px;
}
select {
  z-index: 1;
  background-color: thistle;
}
</style>
