<template>
  <div class="home">
    <h2 class="teal-text topic-title">HOME</h2>
    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Search" />
    </div>
    <div class="post-card-container">
      <div class="card post-card" v-for="(post, i) in filteredPosts" :key="i">
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
  name: 'Home',
  data() {
    return {
      posts: null,
      searchTerm: '',
      admin: null,
    };
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
    getPosts() {
      if (this.posts === null) {
        this.posts = [];
      }
      db.collection('posts')
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
.home {
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
