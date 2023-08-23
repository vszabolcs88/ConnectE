<template>
    <form @submit.prevent ="submitUser" class="login">
        <div class="signup__title">create an account</div>
        <label>Username:</label>
        <input type="text" v-model="username" placeholder="Username" class="custom-input" required>
        <p class="error-msg">{{ error }}</p>
        <label>Email:</label>
        <input type="text" v-model="email" placeholder="Email" class="custom-input" required>
        <p class="error-msg">{{ error }}</p>
        <label>Password:</label>
        <input type="password" v-model="password" placeholder="Password" class="custom-input" required>
        <div class="buttons">
            <input type="submit" value="Sign up">
        </div>
    </form>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async submitUser(){
            const data = {username: this.username, email: this.email, password: this.password};
            try{
                const response = await axios.post("http://localhost:3000/api/signup", JSON.stringify(data), {
                    headers: {'Content-Type': 'application/json'},
                    // body: JSON.stringify(data)
                });
                console.log(data);
                console.log(response);
                this.username = "";
                this.email = "";
                this.password = "";
                this.$router.push('/')
            } catch(error) {
                console.log(error.response.data.error);
                this.error = error.response.data.error;
            }
        }
    }
}
</script>

<style>
    .signup__title {
        color: #30415F;
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
  }
  .custom-input::placeholder {
    color: #b6b6b6;
  }
  .error-msg {
    color: red;
  }
</style>