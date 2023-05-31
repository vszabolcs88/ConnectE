<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <ul>
    <li v-for="link in apiResponse" :key="link.id">
      <a v-bind:href="link.url">{{ link.name }}</a>
    </li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        apiResponse: [
          {name: 'Github', url:'https://github.com/', id: 1},
          {name: 'Facebook', url: 'https://www.facebook.com/', id: 2},
          {name: 'Twitter', url: 'https://twitter.com/?lang=en-gb', id: 3}
        ]
      }
    }
  }
</script>