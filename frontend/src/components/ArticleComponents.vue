<template>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="container__article">
        <article v-for="article in articles" :key="article.post_id">
            <div class="card__header">
                <div>
                    <div>
                        <span class="card__username">{{ article.username }}</span>
                    </div>
                    <div>
                        <span class="card__published">{{ article.nicedate }}</span>
                    </div>
                </div>
                <div v-if='article.p_readby_user!=this.readbyUser' class ="card__sticker">
                    <span  class="card__sticker__content">New</span>
                </div>
            </div>
            <a :href="url + article.post_id"><h2>{{ article.title }}</h2></a>
            <div class="card__content__container">
                <span class="card__content">{{ article.body }}</span>
            </div>
            <div v-if="article.imgUrl" class="article__img__container">
                <a :href="url + article.post_id">
                    <img class="article__img" :src="article.imgUrl" alt="">
                </a>
            </div>
        </article>
        <p>{{error}}</p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                articles: null,
                url: 'http://localhost:8080/#/post/',
                readbyUser: true,
                error: null,
                loading: false
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            async fetchData() {
                this.loading = true;
                let myToken_deserialized = JSON.parse(localStorage.getItem("myToken"));
                if(myToken_deserialized !== null || undefined) {
                    try {
                        const response = await axios.get("http://localhost:3000/api/posts",{
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + myToken_deserialized.token
                            }
                        });
                        console.log(response);
                        this.loading = false;
                        this.articles = response.data;
                    } catch (error) {
                        console.log(error.message);
                        this.loading = false;
                        this.error = error.message;
                        this.$router.push('/login');
                    }
                } else {
                    this.$router.push('/login');
                }
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

    .loading {
        color: white;
    }

    article {
        width: 100%;
        background: white;
        /* border: 1px solid #bcc0c4; */
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
    
    .card__header span {
        color: black;
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

    .card__content__container{
        padding-bottom: 0.7rem;
    }

    .card__content {
        display: block;
        max-width: 80%; 
        overflow: hidden; 
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .article__img__container {
        height: 250px;
    }

    article a {
        text-decoration: none;
        color: black;
    }

    .article__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

   
</style>
