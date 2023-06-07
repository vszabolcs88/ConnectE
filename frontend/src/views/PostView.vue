<template>
    <router-view/>
    <h1>This is a post {{ id }}</h1>
    <div class="post__container">
        <div v-if="post">
            <h3>Title: <span>{{ post[0].title }}</span></h3>
            <h3>Post: <span>{{ post[0].body }}</span></h3>
            <p>UserId: {{ userId }}</p>
            <button @click="deletePost">Delete</button>
        </div>
        <div v-else>
            <p>Your post has been deleted</p>
        </div>
    </div>
   
</template>

<script>

export default {
    props:['id'],
    data() {
        return {
            post: null,
            userId: null
        }
    },
    mounted() {

        let myToken_deserialized = JSON.parse(localStorage.getItem("myToken"));
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
    .post__container {
        width: 50vw;
        margin: 0 auto;
        background: white;
        text-align: left;
        padding: 16px;
        border: 2px solid #aaa;
        border-radius: 16px;

    }
    .post__container span {
        font-size: 16px;
        font-weight: normal;
    }
</style>