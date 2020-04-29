<template>
  <div class="topic">
    <h2 class="teal-text topic-title">{{ this.topicInCaps }}</h2>
    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Search" />
    </div>
    <div class="post-card-container">
      <div class="card post-card" v-for="post in filteredPosts" :key="post.id">
        <div class="card-content">
          <i
            v-if="admin"
            class="material-icons edit"
            @click="redirectToEditPost(post.id)"
            >edit</i
          >
          <router-link :to="{ name: 'Post', params: { postId: post.id } }">
            <span class="card-title">{{ post.title }}</span>
            <p class="text-author">By {{ post.author }}</p>
            <p class="text-snippet">{{ post.text | createSnippet }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
import firebase from 'firebase';

export default {
  name: 'Topic',
  data() {
    return {
      searchTerm: '',
      admin: null,
      posts: [],
      topic: this.$route.params.topicName,
      topicInCaps: this.$route.params.topicName.toUpperCase(),
    };
  },
  watch: {
    $route(to, from) {
      this.updateTopic();
    },
  },
  computed: {
    filteredPosts: function() {
      let postsFilteredByTitle = this.posts.filter(post => {
        return post.title.toLowerCase().match(this.searchTerm.toLowerCase());
      });
      let postsFilteredByContent = this.posts.filter(post => {
        return post.text.toLowerCase().match(this.searchTerm.toLowerCase());
      });

      const combinedArr = [...postsFilteredByTitle, ...postsFilteredByContent];
      return combinedArr;
    },
  },

  methods: {
    redirectToEditPost(postId) {
      this.$router.push({ name: 'EditPost', params: { postId: postId } });
    },
    updateTopic() {
      this.topic = this.$route.params.topicName;
      this.getPosts();
      this.topicInCaps = this.topic.toUpperCase();
    },
    getPosts() {
      if (this.posts.length > 0) {
        this.posts = [];
      }
      db.collection('posts')
        .where('topic', '==', this.topic)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let post = doc.data();
            post.id = doc.id;
            this.posts.push(post);
          });
        });
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
  filters: {
    createSnippet: function(value) {
      if (!value) {
        value = '';
      } else if (value.length > 100) {
        value = value.substring(0, 100) + '...';
      }
      return value;
    },
  },
  created() {
    this.getPosts();
    this.setAdminIfLoggedIn();
  },
};
</script>

<style scoped>
.topic {
  text-align: center;
  margin-left: 150px;
  padding: 20px;
}

.post-card-container {
  align-items: top;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}

.post-card {
  max-width: 350px;
  min-width: 200px;
  margin: 25px;
}
.edit {
  position: absolute;
  top: 4px;
  right: 4px;
}
.edit:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>
