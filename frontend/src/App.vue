<template>
  <nav>
    <div class="container__logo">
      <img class="logo" src="./assets/logo.png">
    </div>
    <div class="container__links">
      <router-link to="/">Home</router-link>
      <router-link to="/Create">Create</router-link>
      <router-link to="/Profile">Profile</router-link>
      <router-link to="/Login">Login</router-link>
      <span class="signout" @click="signOut">
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" size="lg" />
      </span>
      <!-- <button class="signout" @click="signOut">Sign out</button>
       -->
    </div>
  </nav>
  <router-view/>
</template>

<script>
 export default {
  methods: {
    signOut() {
      localStorage.clear();
      this.user = null;
      this.$router.push('/login');
    }
  }
 }
</script>

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
  position: sticky;
  left: 0;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
  padding-right: 0;
  /* border-bottom: 1px solid #aaa; */
  background: #CC525B;
}

nav a {
  font-weight: bold;
  color: #FEFFFE;
  text-decoration: none;
  padding: 6px 24px;
  margin-left: 12px;
  border-radius: 24px;
  background: #30415F;
}

nav a.router-link-exact-active {
  color: white;
  color: #CC525B;
}

nav a:hover {
  background: #FEFFFE;
  color: #30415F;
  
}
.signout {
  font-weight: bold;
  font-size: 1rem;
  color: #2c3e50;
  text-decoration: none;
  padding: 6px 24px;
  margin-left: 12px;
  border-radius: 24px;
  background: #FF4500;
  border: none;
  cursor: pointer;
}

.signout:hover {
  color:#FEFFFE;
}

nav .logo {
  display: block;
  object-fit: cover;
  object-position: center;
  padding-left: 30px;
  height: 32px;
  width: 128px;
}

.container__links {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 30px;
  width: 80%;
}

@media (max-width: 700px) {
  nav {
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .container__links {
    display: block;
    width: 100%;
    padding: 0;
  }
  nav a {
    display: block;
    margin-left: 0px;
    border-radius: 0px;
    width: 100%;
  }
}
</style>
