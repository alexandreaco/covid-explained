<template>
  <div class="edit-post container">
    <form class="card-panel" @submit.prevent>
      <h2 class="center teal-text">Edit Post</h2>
      <p v-if="feedback" class="required">{{ feedback }}</p>
      <div class="field">
        <label for="title">
          <p class="required">*</p>
          <p>Title</p>
        </label>
        <input id="title" type="text" v-model="title" />
      </div>
      <div class="field">
        <label for="subtitle">
          <p>Subtitle</p>
        </label>

        <textarea id="subtitle" type="text" v-model="subtitle" />
      </div>
      <div class="field">
        <label for="author">Author</label>
        <input id="author" type="text" v-model="author" />
      </div>
      <div class="field">
        <label for="topic">
          <p class="required">*</p>
          <p>Topic</p>
        </label>
        <p>
          <label>
            <input name="topic" type="radio" value="questions" v-model="topic" />
            <span>QUESTIONS</span>
          </label>
        </p>
        <!-- <p>
          <label>
            <input
              name="topic"
              type="radio"
              value="scenarios"
              v-model="topic"
            />
            <span>SCENARIOS</span>
          </label>
        </p>-->
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
        <!-- <p>
          <label>
            <input name="topic" type="radio" value="news" v-model="topic" />
            <span>IN THE NEWS</span>
          </label>
        </p>-->
      </div>
      <div class="field">
        <label class="active" for="textarea1">
          <p class="required">*</p>
          <p>Body of Post</p>
        </label>
        <div class="image-instructions">
          <p>Using Images</p>
          <br />
          <p>
            Images can be used by clicking the image icon in the text editor and
            then entering the image url. If you'd like to upload an image from
            your computer and it does not have a url, follow these steps to
            generate a url:
          </p>
          <ol>
            <li>Click the 'Choose File' button.</li>
            <li>Select your file.</li>
            <li>
              Click 'Get Image Url' button. A url and an image preview should
              pop up.
            </li>
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
        <ckeditor :editor="editor" v-model="text" :config="editorConfig"></ckeditor>
      </div>
      <div class="field center">
        <button class="btn teal" @click="updatePost">
          Submit Changes
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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'EditPost',
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
      editor: ClassicEditor,
      //editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  watch: {
    $route(to, from) {
      this.updatePostId();
    },
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
    updatePostId() {
      this.postId = this.$route.params.postId;
      this.getPost();
    },
    getPost() {
      db.collection('posts')
        .doc(this.postId)
        .get()
        .then(doc => {
          this.title = doc.data().title;
          this.subtitle = doc.data().subtitle;
          this.text = doc.data().text;
          this.author = doc.data().author;
          this.topic = doc.data().topic;
          this.imgUrl = null;
        });
    },
    updatePost() {
      if (this.title && this.topic && this.text) {
        if (
          (this.topic === 'explainers' && this.subtitle === null) ||
          this.subtitle === ''
        ) {
          this.feedback =
            'Since you are posting an explainer, a subtitle is required.';
          window.scrollTo(0, 0);
        } else {
          let subtitle = this.subtitle || '';
          db.collection('posts')
            .doc(this.postId)
            .update({
              title: this.title,
              subtitle: subtitle,
              text: this.text,
              topic: this.topic,
              author: this.author,
              imgUrl: this.imgUrl,
              updatedAt: Date.now(),
            })
            .then(() => {
              console.log('Document successfully written!');
              this.$router.push({
                name: 'Post',
                params: { postId: this.postId },
              });
            })
            .catch(error => {
              console.error('Error writing document: ', error);
            });
        }
      } else {
        this.feedback =
          'Please make sure that all required feilds are completed.';
        window.scrollTo(0, 0);
      }
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
label {
  display: flex;
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

input[type='text'],
textarea {
  min-width: 400px;
}
</style>
