<template>
  <div class="admin-approval">
    <h3>Admin Approval</h3>
    <table>
      <tbody>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Approved Status</td>
        </tr>
        <tr v-for="admin in admins" :key="admin.id">
          <td>{{ admin.name }}</td>
          <td>{{ admin.email }}</td>
          <td>
            <label>
              <input
                type="checkbox"
                v-model="admin.isApproved"
                @change="updateApprovalStatus(admin.id, admin.isApproved)"
              />
              <span></span>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init';

export default {
  name: 'AdminApproval',
  data() {
    return {
      admins: null,
    };
  },
  methods: {
    updateApprovalStatus(adminId, approvalStatus) {
      console.log('approvalStatus:', approvalStatus);
      db.collection('users')
        .doc(adminId)
        .update({
          isApproved: approvalStatus,
        })
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch(error => {
          console.error('Error writing document: ', error);
        });
    },
    getAdmin() {
      if (this.admins === null) {
        this.admins = [];
      }
      db.collection('users')
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let admin = doc.data();
            admin.id = doc.id;
            this.admins.push(admin);
          });
        });
    },
  },
  created() {
    let admin = firebase.auth().currentUser;
    this.getAdmin();
  },
};
</script>

<style scoped>
.admin-approval {
  margin-left: 150px;
  padding: 50px;
  display: flex;
  text-align: center;
  flex-direction: column;
}
</style>
