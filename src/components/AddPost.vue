<template>
  <div class="add-post container">
    <form class="card-panel" @submit.prevent>
      <h2 class="center teal-text">Add Post</h2>
      <p v-if="feedback" class="required">{{ feedback }}</p>
      <div class="field">
        <label for="title">
          <p class="required">*</p>
          <p>Title</p>
        </label>

        <input id="title" type="text" v-model="title" />
      </div>
      <div class="field">
        <label for="author">Author</label>
        <input id="author" type="text" v-model="author" />
      </div>
      <div class="field">
        <label for="topic" class="title">
          <p class="required">*</p>
          <p>Topic</p>
        </label>
        <p>
          <label>
            <input
              name="topic"
              type="radio"
              value="questions"
              v-model="topic"
            />
            <span>QUESTIONS</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name="topic"
              type="radio"
              value="scenarios"
              v-model="topic"
            />
            <span>SCENARIOS</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name="topic"
              type="radio"
              value="definitions"
              v-model="topic"
            />
            <span>DEFINITIONS</span>
          </label>
        </p>
        <p>
          <label>
            <input
              name="topic"
              type="radio"
              value="explainers"
              v-model="topic"
            />
            <span>EXPLAINERS</span>
          </label>
        </p>
        <p>
          <label>
            <input name="topic" type="radio" value="news" v-model="topic" />
            <span>IN THE NEWS</span>
          </label>
        </p>
      </div>
      <div class="field">
        <label for="imgUrl">
          Image: Be sure to first choose the file and then upload the image
          before submitting changes.
        </label>
        <br />
        <div class="image-buttons">
          1. <input type="file" @change="onFileSelected" accept="image/*" /> 2.
          <button @click="onUpload">Upload Image</button>
        </div>

        <br />
        <label for="imgUrl">Image Preview</label>
        <br />
        <img :src="this.imgUrl" v-if="this.imgUrl" />
      </div>
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="field">
              <label class="active" for="textarea1">
                <p class="required">*</p>
                <p>Text</p>
              </label>
              <textarea
                v-model="text"
                id="textarea1"
                class="materialize-textarea"
              ></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="field center">
        <button class="btn teal" @click="createPost">
          Create Post
          <i class="material-icons right">send</i>
        </button>
        <button class="btn red" @click="deletePost(postId)">
          Delete Post
          <i class="material-icons right">delete</i>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import db from '@/firebase/init';
import firebase from 'firebase';

export default {
  name: 'AddPost',
  data() {
    return {
      selectedFile: null,
      uploadValue: 0,
      picture: null,
      postId: this.$route.params.postId,
      title: null,
      imgUrl: null,
      text: null,
      author: null,
      topic: null,
      feedback: null,
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },

    onUpload() {
      const storageRef = firebase
        .storage()
        .ref(`images/${this.selectedFile.name}`);
      const task = storageRef.put(this.selectedFile);
      task.on(
        'state_changed',
        snapshot => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadValue = percentage;
        },
        error => {
          console.error(error);
        },
        () => {
          this.uploadValue = 100;
          task.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
            this.imgUrl = this.picture;
          });
        }
      );
    },

    deletePost(postId) {
      db.collection('posts')
        .doc(postId)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
          this.$router.push({ name: 'Home' });
        })
        .catch(error => {
          console.error('Error removing document: ', error);
        });
    },
    createPost() {
      if (this.title && this.text && this.topic) {
        db.collection('posts')
          .add({
            title: this.title,
            text: this.text,
            topic: this.topic,
            author: this.author,
            imgUrl: this.imgUrl,
            createdAt: Date.now(),
          })
          .then(docRef => {
            this.$router.push({ name: 'Post', params: { postId: docRef.id } });
          })
          .catch(error => {
            console.error('Error adding document: ', error);
          });
      } else {
        this.feedback =
          'Please make sure that all required feilds are completed.';
        window.scrollTo(0, 0);
      }
    },
  },
};
</script>
<style scoped>
.add-post {
  margin-left: 150px;
  padding: 50px 0px 10px 150px;
  /* max-width: 600px;
  margin-top: 60px;
  margin-left: 150px; */
}
label {
  display: flex;
}
.add-post h2 {
  font-size: 2.4em;
}
.add-post .field {
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

img {
  max-width: 150px;
  padding: 10px 10px 10px 0px;
}

.image-buttons {
  padding: 5px 10px 10px 0px;
}
.required {
  color: red;
}
</style>
