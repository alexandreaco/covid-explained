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
        <input id="title" type="text" v-model="subtitle" />
      </div>
      <div class="field">
        <label for="subtitle">
          <p class="required">*</p>
          <p>Subtitle</p>
        </label>
        <input id="subtitle" type="text" v-model="title" />
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
      </div>

      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="field">
              <label class="active" for="textarea1">
                <p class="required">*</p>
                <p>Body of Post</p>
              </label>
              <div class="image-instructions">
                <p>Using Images</p>
                <br />
                <p>Images can be used by clicking the image icon in the text editor and then entering the image url. If you'd like to upload an image from your computer and it does not have a url, follow these steps to generate a url:</p>
                <ol>
                  <li>Click the 'Choose File' button.</li>
                  <li>Select your file.</li>
                  <li>Click 'Get Image Url' button. A url and an image preview should pop up.</li>
                  <li>Copy the url</li>
                  <li>Click the image icon in the text editor. A pop-up will open.</li>
                  <li>Paste your url into the url feild.</li>
                </ol>
              </div>
              <div class="field">
                <div class="image-buttons">
                  1.
                  <input type="file" @change="onFileSelected" accept="image/*" /> 2.
                  <button @click="onUpload">Get Image Url From</button>
                </div>
                <div class="image-preview" v-if="imgUrl">
                  <div class="preview-section">
                    <label for="imgUrl">Image URL:</label>
                    <p v-if="imgUrl">{{ imgUrl }}</p>
                  </div>
                  <div class="preview-section">
                    <label for="imgUrl">Image Preview</label>
                    <img :src="this.imgUrl" v-if="this.imgUrl" />
                  </div>
                </div>
              </div>
              <ckeditor v-model="text" :config="editorConfig"></ckeditor>
            </div>
          </div>
        </form>
      </div>
      <div class="field center">
        <button class="btn teal" @click="createPost">
          Create Post
          <i class="material-icons right">send</i>
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
      subtitle: null,
      imgUrl: null,
      text: '<p>Body of post.</p>',
      author: null,
      topic: null,
      feedback: null,
      // ckeditor:
      editorConfig: {
        // The configuration of the editor.
      },
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

    createPost() {
      if (this.title && this.text && this.subtitle && this.topic) {
        db.collection('posts')
          .add({
            title: this.title,
            subtitle: this.subtitle,
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

.image-preview {
  display: flex;
  justify-content: flex-start;
}

.preview-section {
  margin: 15px;
}

.image-instructions {
  max-width: 600px;
  background-color: rgb(249, 217, 217);
  padding: 10px;
  margin-bottom: 5px;
}
.image-instructions p {
  margin: 0;
}
</style>
