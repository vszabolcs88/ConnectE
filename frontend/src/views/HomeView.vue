<template>
  <div class="main">
    <div class="main__aside">
      <AsideComponents/>
    </div>
    
    <div class="container__article">
      <ArticleComponents/>
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
  .main {
    display: flex;
    justify-content: flex-start;
    padding: 1rem;
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
</style>