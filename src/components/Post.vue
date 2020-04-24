<template>
  <div class="post">
    <div class="transparent-background">
      <div v-if="this.post">
        <h3>{{ post.title }}</h3>
        <div class="author-and-date">
          <p v-if="this.post.author">By {{ post.author }}</p>
          <p v-if="this.post.createdAt">
            Posted on {{ new Date(post.createdAt.seconds) }}
          </p>
        </div>
        <div class="text-and-img">
          <img :src="this.post.imgUrl" v-if="this.post.imgUrl" />
          <p>
            {{ post.text }}
          </p>
        </div>
      </div>
    </div>
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
<style>
.post {
  padding: 10px 150px;
  background-color: #60a09e;
  position: absolute;
  top: 64px;
  bottom: 0;
}
.transparent-background {
  background-color: rgb(240, 255, 255, 0.25);
  padding: 50px;
  margin: 50px 10px 50px 0px;
  min-height: 600px;
}
img {
  max-height: 300px;
  max-width: 300px;
  margin: 5px 20px 0px 0px;
  float: left;
}
h3 {
  margin: 0px;
}
p {
  margin: 0;
}
.author-and-date {
  margin: 10px 0px;
}
.author-and-date p {
  font-size: 10px;
}
</style>
