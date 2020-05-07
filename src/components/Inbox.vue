<template>
  <div class="inbox">
    <p class="lead">All Messages from Covid Explained</p>

    <table>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Date Sent</td>
          <td>Replied Status</td>
          <td></td>
        </tr>
        <tr v-for="message in messages" :key="message.id">
          <td class="name">{{ message.senderName }}</td>
          <td class="creds">{{ message.senderEmail }}</td>
          <td class="creds">{{ message.createdAt }}</td>
          <td class="creds">
            <label>
              <input
                type="checkbox"
                v-model="message.haveReplied"
                @change="updateRepliedStatus(message.id, message.haveReplied)"
              />
              <span></span>
            </label>
          </td>
          <td class="creds ">
            <button class="btn red" @click="redirectToEdit(message.id)">See Message</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import db from '@/firebase/init';
export default {
  name: 'Inbox',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    getMessages() {
      db.collection('messages')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let message = doc.data();
            message.id = doc.id;
            this.messages.push(message);
          });
        });
    },
    updateRepliedStatus(messageId, repliedStatus) {
      db.collection('messages')
        .doc(messageId)
        .update({
          haveReplied: repliedStatus,
        })
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch(error => {
          console.error('Error writing document: ', error);
        });
    },
    redirectToEdit(messageId) {
      this.$router.push({ name: 'Message', params: { messageId: messageId } });
    },

  },
  created() {
    this.getMessages();
  },
};
</script>

<style scoped>
.lead {
  font-size: 42px;
  line-height: 48px;
  font-weight: 100;
}

.inbox {
  max-width: 900px;
}
h3 {
  margin-bottom: 1rem;
}

h4 {
  font-size: 24px;
  margin: 1rem 0;
}
.inbox p {
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
