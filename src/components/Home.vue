<template>
  <div class="home ">
    <div class="card" v-for="topic in topics" :key="topic.id">
      <div class="card-content">
        <h2 class="indigo-text">{{ topic.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      topics: [
        {
          title: 'QUESTIONS',
          slug: 'questions',
        },
        {
          title: 'DEFINITIONS',
          slug: 'definitions',
        },
        {
          title: 'IN THE NEWS',
          slug: 'in the news',
        },
        {
          title: 'EXPLAINERS',
          slug: 'explainers',
        },
        {
          title: 'SCENARIOS',
          slug: 'scenarios',
        },
      ],
    };
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
