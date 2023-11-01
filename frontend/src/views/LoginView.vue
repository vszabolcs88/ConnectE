<template>
    <form @submit.prevent="loginUser" class="login">
        <div class="login__title">Login</div>
        <label>Email:</label>
        <input type="text" v-model="email" placeholder="Email" class="custom-input" @click="removeMsg" required>
        <label>Password:</label>
        <input type="password" v-model="password" placeholder="Password" class="custom-input" @click="removeMsg" required>
        <p>{{ errorMsg }}</p>
        <div class="buttons">
            <input type="submit" value="Login">
            <p>
                <router-link to="/signup">Signup</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: '',
            password: '',
            errorMsg: '',
        }
    }, 
    methods: {
        async loginUser() {
            try {
                const data = {email: this.email, password: this.password};
                const response = await axios.post("http://localhost:3000/api/signup/login", JSON.stringify(data),{
                    headers: {'Content-Type': 'application/json'}
                    });
                    console.log("Success:", response.data);
                    let myToken_serialized = JSON.stringify(response.data);
                    localStorage.setItem('myToken', myToken_serialized);
                    this.$router.push('/');
            } catch(error) {
                console.log(error.response.data.error);
                this.errorMsg = error.response.data.error;
            }
            /*const data = {email: this.email, password: this.password};
            fetch("http://localhost:3000/api/signup/login", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then((response) => response.json()) 
            .then((data) => {
                // if(data){
                    console.log("Success:", data);
                
                    //store the userId and the token in localstorage
                    let myToken_serialized = JSON.stringify(data);
                    localStorage.setItem('myToken', myToken_serialized);
                    //this.$router.push('/');
                // } else {
                //     console.log(error);
                    //this.errorMsg = data.error
                // }  
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
            console.log(this.email, this.password);
            this.email = "";
            this.password = "";*/
        },
        removeMsg() {
            this.errorMsg = '';
        }
    }
}
</script>

<style>
    form {
        max-width: 420px;
        margin: 30px auto;
        background: white;
        text-align: left;
        padding: 40px;
        border: 2px solid #aaa;
        border-radius: 10px;
    }
    .login__title {
        color: #30415F;
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
  }

    label {
        color: #30415F;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }

    input {
        display: block;
        padding: 10px 6px;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #555;
    }

    input[type="text"],
    input[type="password"] {
        width: 100%;
    }

    input[type="file"] {
        border-bottom: none;
    }

    input[type="submit"] {
        font-weight: bold;
        color: #2c3e50;
        padding: 12px 24px;
        border-radius: 24px;
        background: #FF4500;
        margin-right: 12px;
        cursor: pointer;
    }

    input[type="submit"]:hover {
        color: white;
    }

    .custom-input::placeholder {
    color: #b6b6b6;
  }

    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: center;
        margin-top: 32px;
        text-align: center;
    }

    @media (max-width: 765px) {
        form {
            margin-top: 230px;
        }
    }
</style>