<template>
  <div>
    <form  @submit.prevent="deleteAccount" class="profile__container">
      <div class="profile__title">Profile</div>
      <label>Username:</label>
      <input type="text" v-model="username">
      <label>Email:</label>
      <input type="text" v-model="email">
      <label>Password</label>
      <input type="password" v-model="password" required>
      <div>
        <input class="button" type="submit" value="Delete Accout">
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
        password: ''
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
            // console.log(response);
            this.data = response.data;
            this.username = response.data[0].username;
            this.email = response.data[0].email;
            //console.log(response.data);
          } catch (error) {
            console.log(error.message);
            this.$router.push('/login');
          }
        } else {
          this.$router.push('/login');
        }
      },

      async deleteAccount() {
        const data = {password: this.password};
        //console.log(data);
        let myToken_deserialized = JSON.parse(localStorage.getItem("myToken"));
        if(myToken_deserialized !== null || undefined) {
          try { 
            const deleteProfile = await axios.delete("http://localhost:3000/api/profile", {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + myToken_deserialized.token
              },
              data: data
            });
            console.log(deleteProfile);
            console.log('Account deleted');
            this.data = '';
            this.username = '';
            this.email = '';
            localStorage.clear();
            console.log("Profile deleted");
            this.$router.push('/login');
          } catch(err) {
            console.log(err);
          }
        }
      }
  }
}
</script>

<style>
  .profile__container {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border: 2px solid #aaa;
    border-radius: 10px;
  }
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

  @media (max-width: 765px) {
    .profile__container {
            margin-top: 230px;
        }
    }
</style>