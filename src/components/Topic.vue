<template>
  <div class="topic">
    <!-- <h2 class="topic-title capitalize">{{ this.topic }}</h2> -->
    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Search" />
    </div>
    <div class="post-card-container">
      <div class="card post-card" v-bind:class="post.topic" v-for="post in filteredPosts" :key="post.id">
        <div class="card-content">
          <i
            v-if="authAdmin && dbAdmin.isApproved"
            class="material-icons edit"
            @click="redirectToEditPost(post.id)"
          >edit</i>
          <router-link :to="{ name: 'Post', params: { postId: post.id } }">
            <span class="card-title">{{ post.title }}</span>
            <p class="text-author" v-if="post.author">By {{ post.author }}</p>
            <p class="text-snippet" v-if="post.subtitle">{{ post.subtitle }}</p>
            <p class="text-snippet" v-else>{{ post.text | createSnippet }}</p>
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
      authAdmin: null,
      dbAdmin: {},
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
      let combinedArr = postsFilteredByTitle.concat(postsFilteredByContent);
      let deduplicatedArr = this.deduplicateById(combinedArr);
      return deduplicatedArr;
    },
  },

  methods: {
    deduplicateById(arr) {
      var obj = {};
      var stop = arr.length;
      for (var i = 0, len = stop; i < len; i++) {
        obj[arr[i]['id']] = arr[i];
      }
      let arr2 = new Array();
      for (var key in obj) {
        if (key !== 'undefined') {
          arr2.push(obj[key]);
        }
      }
      return arr2;
    },
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
    checkApprovalStatus(adminId) {
      db.collection('users')
        .doc(adminId)
        .get()
        .then(doc => {
          let dbAdmin = doc.data();
          dbAdmin.id = doc.id;
          this.dbAdmin = dbAdmin;
        });
    },
    setAdminIfLoggedIn() {
      let authAdmin = firebase.auth().currentUser;
      firebase.auth().onAuthStateChanged(admin => {
        if (admin) {
          this.authAdmin = admin;
          this.checkApprovalStatus(this.authAdmin.uid);
        } else {
          this.authAdmin = null;
        }
      });
    },
  },
  filters: {
    createSnippet: function(value) {
      if (!value) {
        value = '';
      } else if (value.length > 50) {
        value = value.substring(0, 50) + '...';
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
  padding: 20px;

}
h2.topic-title {
  margin: 0px;
  font-size:96px;
  line-height:100px;
  margin-bottom:2rem;
}
.search-bar {
  position: sticky;
  z-index: 5;
  top: 20px;
}
.search-bar input{
  width:30%;
}

.post-card-container {
  align-items: top;
}

  .post-card {
    position: relative;
    padding: 1rem 0;
    transition: 0.5s all;
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
.card-title {
  font-size: 30px;
}
.text-author {
  font-size: 12px;
}
.text-snippet {
  font-size: 22px;
}

.header {
  /* background-image: image; */
}
</style>
