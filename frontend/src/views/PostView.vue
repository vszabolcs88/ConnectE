<template>
    <router-view/>
    <div class="post__wrapper">
    <div class="post__container">
        <div v-if="post">
            <h1>{{ post[0].title }}</h1>
            <p>{{ post[0].body }}</p>
            <div v-if="post[0].imgUrl" class="article__img__container">
                <img class="article__img" :src="post[0].imgUrl" alt="">
            </div>
            <div class="button__container" v-if="post[0].userId == this.loggedInUser">
                <button @click="deletePost">Delete</button>
            </div>
        </div>
        <div v-else>
            <p>Your post has been deleted</p>
        </div>
    </div>
    </div>
   
</template>

<script>
export default {
    props:['id'],
    data() {
        return {
            post: null,
            userPosted: null,
            loggedInUser: null
        }
    },
    created() {

        let myToken_deserialized = JSON.parse(localStorage.getItem("myToken"));
        this.loggedInUser = myToken_deserialized.id
        console.log(myToken_deserialized);

        if(myToken_deserialized === null || undefined) {
            this.$router.push('/login');
        } else {
            this.userId = myToken_deserialized.id;
            const myHeaders = new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + myToken_deserialized.token
            })

            fetch("http://localhost:3000/api/posts/" + this.id, {
                method: 'GET',
                headers: myHeaders
            })
            .then(res => res.json())
            .then(data => 
            this.post = data)
            .catch(err => console.log(err.message));
        }
    },
    methods: {
        deletePost() {
            let myToken_deserialized = JSON.parse(localStorage.getItem("myToken"));
            if (myToken_deserialized === null || undefined) {
                this.$router.push('/login');
            } else {
                const myHeaders = new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + myToken_deserialized.token
                })

                fetch("http://localhost:3000/api/posts/" + this.id, {
                method: 'DELETE',
                headers: myHeaders
                })
                .then(response => {
                    if (response.ok) {
                        console.log('deleted')
                        this.post = null;
                    } else {
                    throw new Error('Failed to delete post');
                    }
                })
                .catch(error => error.message);
            }
        }
    }
}
</script>
    
<style>
    .post__wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
    }
    .post__container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 50vw;
        margin: 0 auto;
        background: white;
        text-align: left;
        padding: 16px;
        border: 2px solid #aaa;
        border-radius: 16px;

    }
    .button__container button {
        margin-top: 1rem;
        border: none;
        padding: 6px 24px;
        font-weight: bold;
        color: #2c3e50;
        background: #FF4500;
        border-radius: 24px;
        cursor: pointer;
    }

    .button__container button:hover {
        color: white;
    }
</style>