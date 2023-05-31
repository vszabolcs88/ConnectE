<template>
    <div class="container__article">
        <article v-for="article in articles" :key="article.id">
          <a :href="url + article.id"><h2>{{ article.title }}</h2></a>
          <p>{{ article.body }}</p>
          <div class="article__img__container">
            <img class="article__img" src="https://cdn.pixabay.com/photo/2023/04/24/21/48/nature-7949073_960_720.jpg" alt="">
          </div>
        </article>
    </div>
    
    
</template>

<script>
    export default {
        data() {
            return {
                articles: [],
                url: 'http://localhost:8080/#/post/'
            }
        },
        mounted() {
            
            //when I fetch the data I need to pass token
            //sending headers
            //pull the token from localstorage
           
            let myToken_deserialized = JSON.parse(localStorage.getItem("myToken"));
            console.log(myToken_deserialized.id);
            
            if (myToken_deserialized === null || undefined) {
                this.$router.push('/login');
            } else {
                const myHeaders = new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + myToken_deserialized.token
                });
           
                fetch("http://localhost:3000/api/posts", {
                    method: 'GET',
                    headers: myHeaders
                })
                .then(res => res.json())
                .then(data => this.articles = data)
                .catch(err => console.log(err.message))
            }
        }
    }
</script>

<style>
    .container__article {
        width: 50vw;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        row-gap: 16px;
    }

    article {
        width: 100%;
        background: white;
        border: 1px solid #bcc0c4;
        border-radius: 8px;
        padding: 6px;
    }

    .article__img {
        max-inline-size: 100%;
        block-size: auto;
        object-fit: cover;
    }

   
</style>
