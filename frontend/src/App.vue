<template>
  <nav>
    <div class="container__logo">
      <img class="logo" src="./assets/logo.png">
    </div>
    <div class="container__links">
      <router-link to="/">Home</router-link>
      <router-link to="/Create">Create</router-link>
      <router-link to="/About">About</router-link>
      <router-link to="/Login">Login</router-link>
    </div>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #d1d1d1;
}
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  border-bottom: 1px solid #aaa;

}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 6px 24px;
  margin-left: 12px;
  border-radius: 24px;
  background: #FF4500;
}

nav a.router-link-exact-active {
  color: white;
}

nav .logo {
  display: block;
  object-fit: cover;
  object-position: center;
  height: 32px;
  width: 128px;
}

.container__links {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 30%;
}
</style>
