<template>
  <div class="post">
    <h3>{{ post.title }}</h3>
    <p>{{ post.text }}</p>
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
        console.log('doc.data():', doc.data());
        let post = doc.data();
        post.id = doc.id;
        this.post = post;
      });
  },
};
</script>
