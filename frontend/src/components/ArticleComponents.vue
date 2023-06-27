<template>
    <div class="container__article">
        <article v-for="article in articles" :key="article.id">
          <p>User: {{ article.userId }}</p> 
          <p>Username: {{ article.username }}</p> 
          <p>Published: {{ article.date_published }}</p>
          <p>{{ article.id }}</p>
          <a :href="url + article.id"><h2>{{ article.title }}</h2></a>
          <p>{{ article.body }}</p>
          <div class="article__img__container">
            <img class="article__img" :src="article.imgUrl" alt="">
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
           
            let myToken_deserialized = JSON.parse(localStorage.getItem("myToken"));
            
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
    .article__img__container {
        height: 250px;
    }

    .article__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

   
</style>
