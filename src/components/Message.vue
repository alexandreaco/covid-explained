<template>
  <div class="message">
    <p class="lead">From: {{message.senderName}}</p>
    <p class="lead">Email: {{message.senderEmail}}</p>
    <p>{{message.message}}</p>
    <button class="btn red" @click="deleteMessage(messageId)">
      Delete Message
      <i class="material-icons right">delete</i>
    </button>
  </div>
</template>

<script>
import db from '@/firebase/init';
export default {
  name: 'Message',
  data() {
    return {
      messageId: this.$route.params.messageId,
      message: {},
    };
  },
  watch: {
    $route(to, from) {
      this.updateMessageId();
    },
  },
  methods: {
    updateMessageId() {
      this.messageId = this.$route.params.messageId;
      this.getMessage();
    },
    getMessage() {
      db.collection('messages')
        .doc(this.messageId)
        .get()
        .then(doc => {
          this.message = doc.data();
          this.message.id = doc.id;
        });
    },
    deleteMessage(messageId) {
      db.collection('messages')
        .doc(messageId)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
          this.$router.push({ name: 'Inbox' });
        })
        .catch(error => {
          console.error('Error removing document: ', error);
        });
    },
  },
  created() {
    this.getMessage();
  },
};
</script>
<style scoped>
.lead {
  font-size: 42px;
  line-height: 48px;
  font-weight: 100;
}

.message {
  max-width: 900px;
}
h3 {
  margin-bottom: 1rem;
}

h4 {
  font-size: 24px;
  margin: 1rem 0;
}
.message p {
  margin: 2rem 0;
}
.cell {
  padding: 10px 0;
}
.name {
  width: 150px;
  font-weight: 800;
}
.creds {
  width: 250px;
}
.links {
  width: 150px;
}
</style>
