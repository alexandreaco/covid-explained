<template>
  <div class="home">
    <div class="p-5 bg-gray-100 lg:ml-16 float-none lg:float-right lg:w-1/4">
      <p>We are a team of researchers and students at Brown, MIT, Harvard, Mass General and elsewhere.</p>
      <p>
        <strong>Emily Oster</strong> is an American economist, professor at Brown Univeristy, and bestselling author.
      </p>
      <p>
        <strong>Galit Alter</strong> is a Professor of Medicine at Harvard Medical School and a Group Leader at the Ragon Institute
        of MGH, MIT and Harvard.
      </p>
    </div>

    <div class="preamble">
      <p class="text-2xl md:text-4xl">
        <strong>COVID-19 is confusing.</strong> There's a lot of conflicting information out there—
        <a
          href="#"
          class="underline-orange transition"
        >can you get the virus from food?</a>
        <a href="#" class="underline-orange transition">Is there such a thing as immunity?</a>
        <a href="#" class="underline-orange transition">What kind of tests are really out there?</a>
        <a href="#" class="underline-orange transition">Who is most at risk?</a> And all the conflicting information can make
        it hard to make decisions, from whether to go to the grocery store to when to send your kids back to day care.
      </p>

      <!-- <p>
              Wondering where to start? Try one of our
              <router-link class="explainerlink"
                           :to="{ name: 'Topic', params: { topicName: 'explainers' } }">explainers</router-link> on testing, or the path of the virus. Or check out our
              <router-link class="defintionlink" :to="{ name: 'Topic', params: { topicName: 'definitions' } }">definitions,</router-link> or
              <router-link class="questionlink" :to="{ name: 'Topic', params: { topicName: 'questions' } }">questions</router-link>. Or find out more
              <router-link :to="{ name: 'AboutUs' }">about our team,</router-link> and
              <router-link :to="{ name: 'ContactUs' }">contact us</router-link> with ideas!
      </p>-->
    </div>
    <!-- <div class="search-bar">
            <input type="text" v-model="searchTerm" placeholder="Search" />
    </div>-->

    <div class="block">
      <h2
        class="text-2xl mt-24 mb-8 font-bold"
      >We hear a lot of the same questions, we're here with answers.</h2>

      <div class="flex flex-wrap bg-white">
        <div
          class="question-item relative w-full pl-4 border-l-2 md:w-1/2 bg-white my-2 md:pr-16"
          v-bind:class="post.topic"
          v-for="(post, i) in filteredQuestionPosts"
          :key="i"
        >
          <i v-if="authAdmin" class="material-icons edit" @click="redirectToEditPost(post.id)">edit</i>

          <router-link :to="{ name: 'Post', params: { postId: post.id } }">
            <span class="question-title underline-orange">{{ post.title }}</span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="block">
      <h2 class="text-2xl mt-24 mb-8 font-bold">Getting more in depth.</h2>

      <div class="flex flex-wrap">
        <div
          class="w-full sm:w-1/2 bg-white"
          :class="post.topic"
          v-for="(post, i) in filteredExplainerPosts"
          :key="i"
        >
          <div class="explainer-item relative border-b mb-4 md:mr-16 py-2">
            <i
              v-if="authAdmin"
              class="material-icons edit"
              @click="redirectToEditPost(post.id)"
            >edit</i>

            <router-link class="block" :to="{ name: 'Post', params: { postId: post.id } }">
              <p class="question-title mb-2 text-2xl underline-teal">{{ post.title }}</p>
              <p class="font-light question-subtitle text-gray-600 text-md">{{ post.subtitle }}</p>
            </router-link>
          </div>
        </div>
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
      authAdmin: {},
      dbAdmin: {},
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
    filteredExplainerPosts: function() {
      return this.filteredPosts.filter(post => post.topic === 'explainers');
    },
    filteredDefintionsPosts: function() {
      return this.filteredPosts.filter(post => post.topic === 'definitions');
    },
    filteredQuestionPosts: function() {
      return this.filteredPosts.filter(post => post.topic === 'questions');
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

    redirectToEditPost(postId) {
      this.$router.push({
        name: 'EditPost',
        params: {
          postId: postId,
        },
      });
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
    console.log('admin -------> :', firebase.auth().currentUser);
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
  max-width: 1280px;
  font-weight: 100;
  padding: 1rem 0 2rem 0;
}

.preamble img {
  width: 30px;
  height: 30px;
  border: 100%;
  display: inline-block;
}


.question-item {
  background-color: none;
  text-decoration: underline;
  text-decoration-color: #dd694a;
}

a.questionlink:hover {
  color: #dd694a;
}

a.defintionlink {
  text-decoration-color: #6c446d;
}

a.explainerlink {
  text-decoration-color: #197278;
}

.search-bar {
  position: sticky;
  z-index: 5;
  top: 20px;
}

.search-bar input {
  width: 30%;
}

.card-topic {
  font-size: 11px;
}

.card-title {
  font-size: 32px;
  line-height: 32px;
  padding: 10px 0;
  font-weight: 100;
}

.q-graphic {
  width: 350px;
  height: auto;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.text-author {
  font-size: 11px;
  padding: 0.5rem 0;
}

.text-snippet {
  font-size: 18px;
  line-height: 24px;
}
</style>
