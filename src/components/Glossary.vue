<template>
  <div class="topic">
    <!-- <h2 class="topic-title capitalize">Glossary</h2> -->
    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Search" />
    </div>
    <div class="definition" v-bind:class="post.topic" v-for="post in filteredPosts" :key="post.id">
      <div class="definition-content">
        <i v-if="admin" class="material-icons edit" @click="redirectToEditPost(post.id)">edit</i>
          <span class="definition-title">{{ post.title }}</span>
          <p class="definition-text" v-html="post.text"></p>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
import firebase from 'firebase';

export default {
  name: 'Glossary',
  data() {
    return {
      searchTerm: '',
      admin: null,
      posts: [],
      topic: 'definitions',
      topicInCaps: 'Glossary',
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
          this.posts.sort((a, b) => (a.title > b.title) ? 1 : -1)
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
  margin-bottom:1rem;
}
.search-bar input{
  width:30%;
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

.definitions {
  background: none;
  max-width: 900px;
}

.definition{
  padding-bottom: 2em;
}

.definition-title {
  font-size: 24px;
  font-weight: bold;
  background: #33322d;
  color: white;
  padding: 5px 10px;
}

.definition-text {
  padding-top: 5px;
  font-size: 16px;
}
</style>
