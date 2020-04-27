<template>
  <div class="topic">
    <h2 class="teal-text topic-title">{{ this.topic }}</h2>
    <div class="card post-card" v-for="post in questionPosts" :key="post.id">
      <router-link :to="{ name: 'Post', params: { postId: post.id } }">
        <div class="card-content">
          <span class="card-title">
            {{ post.title }}
          </span>
          <p class="text-author">By {{ post.author }}</p>
          <p class="text-snippet">
            {{ post.text | createSnippet }}
          </p>
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
    db.collection('posts')
      .where('topic', '==', this.$route.params.topicName)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let post = doc.data();
          post.id = doc.id;
          this.posts.push(post);
        });
      });
  },
};
</script>
