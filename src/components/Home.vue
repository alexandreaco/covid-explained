<template>
  <div class="home ">
    <div class="card">
      <h2 class="teal-text">QUESTIONS</h2>
      <div class="card" v-for="post in questionPosts" :key="post.id">
        <div class="card-content">
          <span class="card-title">
            <router-link :to="{ name: 'Post', params: { postId: post.id } }">
              {{ post.title }}
            </router-link>
          </span>
          <p>
            {{ post.text }}
          </p>
        </div>
      </div>
    </div>
    <div class="card">
      <h2 class="teal-text">SCENARIOS</h2>
      <div class="card" v-for="post in scenarioPosts" :key="post.id">
        <div class="card-content">
          <span class="card-title">
            <router-link :to="{ name: 'Post', params: { postId: post.id } }">
              {{ post.title }}
            </router-link>
          </span>
          <p>{{ post.text }}</p>
        </div>
      </div>
    </div>
    <div class="card">
      <h2 class="teal-text">DEFINITIONS</h2>
      <div class="card" v-for="post in definitionPosts" :key="post.id">
        <div class="card-content">
          <span class="card-title">
            <router-link :to="{ name: 'Post', params: { postId: post.id } }">
              {{ post.title }}
            </router-link>
          </span>
          <p>{{ post.text }}</p>
        </div>
      </div>
    </div>
    <div class="card">
      <h2 class="teal-text">EXPLAINERS</h2>
      <div class="card" v-for="post in explainersPosts" :key="post.id">
        <div class="card-content">
          <span class="card-title">
            <router-link :to="{ name: 'Post', params: { postId: post.id } }">
              {{ post.title }}
            </router-link>
          </span>
          <p>{{ post.text }}</p>
        </div>
      </div>
    </div>
    <div class="card">
      <h2 class="teal-text">IN THE NEWS</h2>
      <div class="card" v-for="post in newsPosts" :key="post.id">
        <div class="card-content">
          <span class="card-title">
            <router-link :to="{ name: 'Post', params: { postId: post.id } }">
              {{ post.title }}
            </router-link>
          </span>
          <p>{{ post.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
export default {
  name: 'Home',
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    questionPosts: function() {
      let questionPosts = this.posts.filter(post => {
        if (post.topic === 'questions') {
          return post;
        }
      });
      return questionPosts;
    },
    scenarioPosts: function() {
      let scenarioPosts = this.posts.filter(post => {
        if (post.topic === 'scenarios') {
          return post;
        }
      });
      return scenarioPosts;
    },
    definitionPosts: function() {
      let definitionPosts = this.posts.filter(post => {
        if (post.topic === 'definitions') {
          return post;
        }
      });
      return definitionPosts;
    },
    explainersPosts: function() {
      let explainersPosts = this.posts.filter(post => {
        if (post.topic === 'explainers') {
          return post;
        }
      });
      return explainersPosts;
    },
    newsPosts: function() {
      let newsPosts = this.posts.filter(post => {
        if (post.topic === 'news') {
          return post;
        }
      });
      return newsPosts;
    },
  },
  created() {
    console.log('IN CREATED');
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
};
</script>

<style>
.home {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  margin-top: 30px;
  margin: 10px;
}
.home h2 {
  font-size: 1.5em;
  text-align: center;
  margin-top: 0;
}
</style>
