<template>
  <div>
    <div class="edit-post container">
      <form class="card-panel" @submit.prevent="updatePost">
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
          <input id="topic" type="text" v-model="topic" />
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
          <button class="btn teal">
            Submit
            <i class="material-icons right">send</i>
          </button>
        </div>
      </form>
    </div>
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
    };
  },
  watch: {
    $route(to, from) {
      this.updatePostId();
    },
  },
  methods: {
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
  max-width: 400px;
  margin-top: 60px;
}
.edit-post h2 {
  font-size: 2.4em;
}
.edit-post .field {
  margin-bottom: 16px;
}
#textarea1 {
  height: 100px;
}
</style>
