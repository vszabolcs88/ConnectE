<template>
  <div class="main__container">
    <div class="background__wrapper">
      <div class=image_background>
        <img  class=image_background src="../assets/Groupomania.jpg" alt="">
      </div>
    </div>
    <div class="main">
      <div class="main__aside">
        <AsideComponents/>
      </div>
      <div class="container__article">
        <ArticleComponents/>
      </div>
    </div>
  </div>
</template>

<script>
import AsideComponents from '../components/AsideComponents.vue'
import ArticleComponents from '../components/ArticleComponents.vue'

export default {
  name: 'App',
  components: {AsideComponents, ArticleComponents},
 
  mounted() {
     let myToken_deserialized = JSON.parse(localStorage.getItem('myToken'));
     if(myToken_deserialized  === null || undefined){
      this.$router.push('/login')
     }
  }
}
</script>

<style>
  .main__container {
    /* background-color: rgba(209, 209, 209,0.8); */
    background-color:rgba(48, 65, 95,0.8);
    min-height: 100vh;
  }
  .background__wrapper {
    position: fixed;
    width: 100vw;
    left:0;
    top: 0;
    z-index: -3;
  }
  .main {
    display: flex;
    justify-content: flex-start;
    padding: 1rem;
    padding-bottom: 0;
  }

  .main__aside {
    width: 15vw;
  }
  .container__article {
        width: 50vw;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        row-gap: 16px;
    }

  @media (max-width: 700px) {
    .main__container {
      width: 100vw;
    }

    .main {
      display: block;
      width: 100%;
      padding: 0;
      margin-top: 210px;
    }

    .main__aside {
      display: none;
    }

    .container__article {
      width: 90%;
      margin-top: 12px;
      
    }
  }
</style>