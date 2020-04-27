<template>
  <div class="container">
    <ul>
      <li>
        <a href="#" class="brand-logo">
          <router-link :to="{ name: 'Topic', params: { topicName: 'questions' } }">
            <p class="white-text">QUESTIONS</p>
          </router-link>
        </a>
      </li>
      <li>
        <router-link :to="{ name: 'Topic', params: { topicName: 'scenarios' } }">
          <p class="white-text">SCENARIOS</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Topic', params: { topicName: 'definitions' } }">
          <p class="white-text">DEFINITIONS</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Topic', params: { topicName: 'explainers' } }">
          <p class="white-text">EXPLAINERS</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Topic', params: { topicName: 'news' } }">
          <p class="white-text">IN THE NEWS</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      showSidebar: false,
      showLink: false,
    };
  },
  methods: {
    showNav() {
      if (this.showSidebar) {
        this.showLink = false;
        setTimeout(() => {
          this.showSidebar = false;
        }, 500);
      } else {
        this.showSidebar = true;
        setTimeout(() => {
          this.showLink = true;
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  padding: 10px;
  padding-top: 74px;
  min-height: calc(100vh - 20px);
  background-color: rgb(25, 136, 134);
  z-index: 1;
}

.container li:hover {
  opacity: 0.5;
}
</style>
