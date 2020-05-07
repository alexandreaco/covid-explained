<template>
  <div class="message-sent">
    <p
      class="lead"
    >Thank you for your thoughts, questions, and feedback! We'll try to respond as soon as we can.</p>
  </div>
</template>

<script>
export default {
  name: 'MessageSent',
  data() {
    return {};
  },
};
</script>

<style scoped>
.lead {
  font-size: 42px;
  line-height: 48px;
  font-weight: 100;
}

.message-sent {
  max-width: 900px;
}
h3 {
  margin-bottom: 1rem;
}

h4 {
  font-size: 24px;
  margin: 1rem 0;
}
.about-us p {
  margin: 2rem 0;
}
</style>
