<template>
  <div class="topic">
    <h2 class="teal-text topic-title">{{ this.topic }}</h2>
    <div class="card post-card" v-for="post in posts" :key="post.id">
      <router-link :to="{ name: 'Post', params: { postId: post.id } }">
        <div class="card-content">
          <span class="card-title">{{ post.title }}</span>
          <p class="text-author">By {{ post.author }}</p>
          <p class="text-snippet">{{ post.text | createSnippet }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
export default {
  name: 'Topic',
  data() {
    return {
      posts: [],
      topic: this.$route.params.topicName,
    };
  },
  watch: {
    $route(to, from) {
      this.updateTopic();
    },
  },
  methods: {
    updateTopic() {
      this.topic = this.$route.params.topicName;
      this.getPosts();
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
  },
};
</script>

<style >
.topic {
  padding-left: 200px;
}
</style>
