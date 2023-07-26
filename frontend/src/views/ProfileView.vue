<template>
  <div>
    <form>
      <div class="profile__title">Profile</div>
      <label>Username:</label>
      <input type="text" v-model="username" required>
      <label>Email:</label>
      <input type="text" v-model="email" required>
      <div>
        <button class="button" @click="deleteAccount">Delete Account</button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        data: '',
        username: '',
        email: '',
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        let myToken_deserialized = JSON.parse(localStorage.getItem("myToken"));
        if(myToken_deserialized !== null || undefined) {
          try {
            const response = await axios.get("http://localhost:3000/api/profile",{
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + myToken_deserialized.token
              }
          });
            console.log(response);
            this.data = response.data;
            this.username = response.data[0].username;
            this.email = response.data[0].email;
            // console.log(response.data);
          } catch (error) {
            console.log(error.message);
          }
        } else {
          this.$router.push('/login');
        }
      },
      async deleteAccount() {
        let myToken_deserialized = JSON.parse(localStorage.getItem("myToken"));
        if(myToken_deserialized !== null || undefined) {
          try { 
            const deleteProfile = await axios.delete("http://localhost:3000/api/profile", {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + myToken_deserialized.token
              }
            });
            console.log(deleteProfile);
            console.log('Account deleted');
            this.data = '';
            this.username = '';
            this.email = '';
            this.$router.push('/login');
            localStorage.clear();
          } catch(err) {
            console.log(err);
          }
        }
      }
  }
}
</script>

<style>
  .profile__title {
    color: #30415F;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
  }
  .button {
    margin-top: 1rem;
    border: none;
    padding: 6px 24px;
    font-weight: bold;
    color: #2c3e50;
    background: #FF4500;
    border-radius: 24px;
    cursor: pointer;
  }

  .button:hover {
    color: white;
  }
</style>