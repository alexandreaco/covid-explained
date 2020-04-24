<template>
  <div class="post">
    <h3 v-if="this.post">{{ post.title }}</h3>
    <p v-if="this.post">{{ post.text }}</p>
  </div>
</template>

<script>
import db from '@/firebase/init';
export default {
  name: 'Post',
  data() {
    return {
      postId: this.$route.params.postId,
      post: null,
    };
  },
  created() {
    db.collection('posts')
      .doc(this.postId)
      .get()
      .then(doc => {
        let post = doc.data();
        post.id = doc.id;
        this.post = post;
      });
  },
};
</script>
