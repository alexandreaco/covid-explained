<template>

  <div class="home">
    <div class="preamble">
      <p class="lead">
        COVID-19 is confusing. There's a lot of conflicting information out there—<a href="#" class="questionlink">can you get the virus from food?</a> Is there such
        a thing as <a href="#" class="defintionlink">immunity</a>? <a href="#" class="questionlink">What kind of tests are really out there?</a> <a href="#" class="questionlink">Who is most at risk?</a> And all the conflicting information
        can make it hard to make decisions, from whether to go to the grocery store to when to send your kids back to day care.
      </p>
      <p>
        We are a team of researchers and students at Brown, MIT, Harvard, Mass General and elsewhere. We care about getting information
        out there. </p>
      <p>
        <em>Emily Oster</em> is an American economist, professor at Brown Univeristy, and bestselling author. <em>Galit Alter</em> is a Professor of
        Medicine at Harvard Medical School and a Group Leader at the Ragon Institute of MGH, MIT and Harvard.
      </p>
      <p>
        Wondering where to Start? Try one of our
        <router-link class="explainerlink" :to="{ name: 'Topic', params: { topicName: 'explainers' } }">explainers</router-link> on testing, or the path of the virus. Or check out our
        <router-link class="defintionlink" :to="{ name: 'Topic', params: { topicName: 'definitions' } }">definitions,</router-link> or
        <router-link class="questionlink" :to="{ name: 'Topic', params: { topicName: 'questions' } }">questions</router-link>. Or find out more
        <router-link :to="{ name: 'AboutUs' }">about our team,</router-link> and
        <router-link :to="{ name: 'ContactUs' }">contact us</router-link> with ideas!
      </p>
    </div>

    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Search" />
    </div>
    <div class="questions-module">
      <p class="py-6"><span class="questions bullet"></span> Common Questions</p>
      <div class="question-carousel">
        <div v-for="(post, i) in filteredQuestionPosts" :key="i">
          <router-link :to="{ name: 'Post', params: { postId: post.id } }">
            <span class="question-list">{{ post.title }}</span>
          </router-link>
        </div>
      </div>

    </div>

    <p class="py-6"><span class="explainers bullet"></span> Explainers</p>

    <div class="post-card-container">
      <!-- <div class="card post-card" v-bind:class="post.topic" v-for="post in filteredExplainerPosts.slice(0, 3)"> -->
      <div class="card post-card" v-bind:class="post.topic" v-for="(post, i) in filteredExplainerPosts" :key="i">

        <i v-if="admin" class="material-icons edit" @click="redirectToEditPost(post.id)">edit</i>

        <router-link :to="{ name: 'Post', params: { postId: post.id } }">
          <div class="card-content">
            <span class="card-title">{{ post.title }}</span>
            <p class="text-snippet" v-if="post.subtitle">{{ post.subtitle }}</p>
            <p class="text-snippet" v-else>{{ post.text | createSnippet }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <p class="py-6"><span class="definitions bullet"></span> Definitions</p>

    <div class="post-card-container">
      <div class="card post-card" v-bind:class="post.topic" v-for="(post, i) in filteredDefintionsPosts" :key="i">
        <i v-if="admin" class="material-icons edit" @click="redirectToEditPost(post.id)">edit</i>

        <router-link :to="{ name: 'Post', params: { postId: post.id } }">
          <div class="card-content">
            <span class="card-title">{{ post.title }}</span>

          </div>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>

  import db from '@/firebase/init'
  import firebase from 'firebase'
  export default {
    name: 'Home',
    data() {
      return {
        posts: null,
        searchTerm: '',
        admin: null
      }
    },
    computed: {
      filteredPosts: function() {
        let postsFilteredByTitle = this.posts.filter(post => {
          return post.title.toLowerCase().match(this.searchTerm.toLowerCase())
        })
        let postsFilteredByContent = this.posts.filter(post => {
          return post.text.toLowerCase().match(this.searchTerm.toLowerCase())
        })
        let combinedArr = postsFilteredByTitle.concat(postsFilteredByContent)
        let deduplicatedArr = this.deduplicateById(combinedArr)
        return deduplicatedArr
      },
      filteredExplainerPosts: function() {
        return this.filteredPosts.filter(post => post.topic === 'explainers')
      },
      filteredDefintionsPosts: function() {
        return this.filteredPosts.filter(post => post.topic === 'definitions')
      },
      filteredQuestionPosts: function() {
        return this.filteredPosts.filter(post => post.topic === 'questions')
      }
    },
    methods: {
      deduplicateById(arr) {
        var obj = {}
        var stop = arr.length
        for (var i = 0, len = stop; i < len; i++) {
          obj[arr[i]['id']] = arr[i]
        }
        let arr2 = new Array()
        for (var key in obj) {
          if (key !== 'undefined') {
            arr2.push(obj[key])
          }
        }
        return arr2
      },
      redirectToEditPost(postId) {
        this.$router.push({
          name: 'EditPost',
          params: {
            postId: postId
          }
        })
      },
      getPosts() {
        if (this.posts === null) {
          this.posts = []
        }
        db.collection('posts')
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let post = doc.data()
              post.id = doc.id
              this.posts.push(post)
            })
          })
      },
      setAdminIfLoggedIn() {
        let admin = firebase.auth().currentUser
        firebase.auth().onAuthStateChanged(admin => {
          if (admin) {
            this.admin = admin
          } else {
            this.admin = null
          }
        })
      }
    },

    filters: {
      createSnippet: function(value) {
        if (!value) {
          value = ''
        } else if (value.length > 50) {
          value = value.substring(0, 50) + '...'
        }
        return value
      }
    },
    created() {
      this.getPosts()
      this.setAdminIfLoggedIn()
    }
  }

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
    max-width: 1200px;
    font-weight: 100;

    padding: 1rem 0 2rem 0;
  }
  .preamble p {
    margin: 1rem 0;
    font-size: 20px;
  }
  .preamble .lead {
    font-size: 32px;
  }

  .preamble a {
    text-decoration: underline;
    text-decoration-style: solid;
  }

  .questions-module {
    width:100%;
    margin-bottom: 1rem;

  }

  .question-carousel {
    width: 100%;
    display: flex;
  }
  a.questionlink{
    text-decoration-color: #dd694a;
  }
  a.defintionlink{
    text-decoration-color: #6c446d;
  }
  a.explainerlink{
    text-decoration-color: #197278;
  }


    .search-bar input{
      width:100%;
    }

  .question-carousel div {
    /* background: rgba(248, 225, 219, .25); */
    background: #dd694a;
    color: #fff;
    padding: 1rem;
    /* border-radius: 100%; */
    border-bottom: 1px solid #a64f38;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  .question-list {
    font-size: 48px;
    line-height: 48px;
    font-style: italic;
    font-family: 'Playfair Display', serif;
  }

  .card-topic {
    font-size: 11px;
  }

  .card-title {
    font-size: 32px;
    line-height: 32px;
    padding: 10px 0;
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
