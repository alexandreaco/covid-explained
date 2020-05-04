<template>
  <div class="home">
    <div class="preamble">
      <p>
        Wondering Where to Start? Try one of our
        <router-link
          :to="{ name: 'Topic', params: { topicName: 'explainers' } }"
          >explainers</router-link
        > on testing, or the path of the virus. Or check out our
        <router-link
          :to="{ name: 'Topic', params: { topicName: 'definitions' } }"
          >definitions,</router-link
        >or
        <router-link :to="{ name: 'Topic', params: { topicName: 'questions' } }"
          >questions</router-link
        >. Or find out more
        <router-link :to="{ name: 'AboutUs' }">about our team,</router-link>and
        <router-link :to="{ name: 'ContactUs' }">contact us</router-link> with
        ideas!
      </p>
    </div>

    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Search" />
    </div>
    <div class="post-card-container">
      <div class="card post-card" v-bind:class="post.topic" v-for="(post, i) in filteredPosts" :key="i">
        <i
          v-if="admin"
          class="material-icons edit"
          @click="redirectToEditPost(post.id)"
          >edit</i
        >

        <router-link :to="{ name: 'Post', params: { postId: post.id } }">
          <div class="card-content">
            <span class="card-topic capitalize">{{ post.topic }}</span>
            <span class="card-title">{{ post.title }}</span>
            <p class="text-author" v-if="post.author">By {{ post.author }}</p>
            <p class="text-author" v-else></p>
            <p class="text-snippet" v-if="post.subtitle">{{ post.subtitle }}</p>
            <p class="text-snippet" v-else>{{ post.text | createSnippet }}</p>
          </div>
        </router-link>
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
.home {
  padding: 0 20px;
}

.post-card-container {
  align-items: top;
  display: flex;
  flex-wrap: wrap;
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

.preamble {
  max-width: 900px;
  font-weight:100;
  font-size:32px;
  padding:1rem 0 2rem 0;
}
.preamble a{
  text-decoration: underline;
  text-decoration-style: solid;
}
.card-topic{
  font-size:11px;
}
.card-title {
  font-size: 32px;
  line-height:32px;
  padding: 10px 0;
}
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.text-author {
  font-size: 11px;
  padding: .5rem 0;
}
.text-snippet {
  font-size: 18px;
  line-height:24px;
}
</style>
