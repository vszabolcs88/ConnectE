<template>
    <div class="container__article">
        <span>User: </span>
        <article v-for="article in articles" :key="article.post_id">
            <div class="card__header">
                <div>
                    <div>
                        <span class="card__username">{{ article.username }}</span>
                    </div>
                    <div>
                        <span class="card__published">{{ article.date_published }}</span>
                    </div>
                </div>
                <div v-if='article.p_readby_user!=this.readbyUser' class ="card__sticker">
                    <span  class="card__sticker__content">New</span>
                </div>
            </div>
            <a :href="url + article.post_id"><h2>{{ article.title }}</h2></a>
            <p>{{ article.body }}</p>
            <div v-if="article.imgUrl" class="article__img__container">
                <a :href="url + article.post_id">
                    <img class="article__img" :src="article.imgUrl" alt="">
                </a>
            </div>
        </article>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                articles: [],
                url: 'http://localhost:8080/#/post/',
                readbyUser: true
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

    .card__header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        padding: 1rem 0;
        border-bottom: 1px solid #bcc0c4;
    }

    .card__username {
        font-weight: bold;
        font-size: 1.2rem;
    }

    .card__published {
        font-style: italic;
        font-size: 0.9rem;
    }

    .card__sticker {
        background-color: #7FFFD4;
        padding: 0.5rem 0.7rem;
    }

    .card__sticker__content {
        font-weight: bold;
    }
    .article__img__container {
        height: 250px;
    }

    article a {
        text-decoration: none;
        color: #2c3e50;
    }

    .article__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

   
</style>
