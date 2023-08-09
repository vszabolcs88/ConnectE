<template>
    <form @submit.prevent ="submitUser" class="login">
        <div class="signup__title">create an account</div>
        <label>Username:</label>
        <input type="text" v-model="username" required>
        <label>Email:</label>
        <input type="text" v-model="email" required>
        <label>Password:</label>
        <input type="password" v-model="password" required>
        <div class="buttons">
            <input type="submit" value="Sign up">
        </div>
    </form>
</template>

<script>

export default {
    data() {
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        submitUser(){
            const data = {username: this.username, email: this.email, password: this.password};
            
            fetch("http://localhost:3000/api/signup", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((data) =>  {
                console.log("Success: ", data);
            })
            .catch((error) => {
                console.log("Error: ", error);
            });

            console.log(this.username + this.email + this.password);
            this.username = "";
            this.email = "";
            this.password = "";
            this.$router.push('/');
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
</style>