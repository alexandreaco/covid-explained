<template>
  <div class="home ">
    <div class="card topic-card teal lighten-5">
      <h2 class="teal-text topic">QUESTIONS</h2>
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
    <div class="card topic-card teal lighten-5">
      <h2 class="teal-text">SCENARIOS</h2>
      <div class="card post-card" v-for="post in scenarioPosts" :key="post.id">
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
    <div class="card topic-card teal lighten-5">
      <h2 class="teal-text">DEFINITIONS</h2>
      <div
        class="card post-card"
        v-for="post in definitionPosts"
        :key="post.id"
      >
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
    <div class="card topic-card teal lighten-5">
      <h2 class="teal-text">EXPLAINERS</h2>
      <div
        class="card post-card"
        v-for="post in explainersPosts"
        :key="post.id"
      >
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
    <div class="card topic-card teal lighten-5">
      <h2 class="teal-text">IN THE NEWS</h2>
      <div class="card post-card" v-for="post in newsPosts" :key="post.id">
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
      return questionPosts.slice(0, 2);
    },
    scenarioPosts: function() {
      let scenarioPosts = this.posts.filter(post => {
        if (post.topic === 'scenarios') {
          return post;
        }
      });
      return scenarioPosts.slice(0, 2);
    },
    definitionPosts: function() {
      let definitionPosts = this.posts.filter(post => {
        if (post.topic === 'definitions') {
          return post;
        }
        definitionPosts;
      });
      return definitionPosts.slice(0, 2);
    },
    explainersPosts: function() {
      let explainersPosts = this.posts.filter(post => {
        if (post.topic === 'explainers') {
          return post;
        }
      });
      return explainersPosts.slice(0, 2);
    },
    newsPosts: function() {
      let newsPosts = this.posts.filter(post => {
        if (post.topic === 'news') {
          return post;
        }
      });
      return newsPosts.slice(0, 2);
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
.home h2:hover {
  opacity: 0.5;
}
.card.post-card .card-content {
  padding: 0px;
}
.card.post-card {
  background-color: rgb(185, 220, 218);
  border-radius: 10px;
  margin: 0px 10px 15px 10px;
  padding: 0px;
}
.card.post-card:hover {
  opacity: 0.5;
}


.card.topic-card h2 {
  font-size: 25px;
  padding: 8px;
  margin: 0px;
  margin-bottom: 10px;
}
.card .card-content .card-title {
  font-size: 18px;
  background-color: rgb(66, 142, 143);
  border-radius: 10px 10px 0px 0px;
  margin: 0;
  padding: 5px;
  text-align: center;
}

.card .card-content .card-title {
  color: white;
}
.text-author {
  font-size: 10px;
}
.card .card-content p {
  padding: 5px;
  color: rgb(52, 121, 122);
}
</style>
