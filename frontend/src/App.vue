<template>
  <div>
    <div id="nav">
      <nav class="container-fluid navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Logo Here</a>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="navbar-nav mr-auto">
            <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
            <router-link v-if="!isLoggedIn" to="/register" class="nav-link">Register</router-link>
            <a href="/login" v-if="isLoggedIn" class="btn" @click="logout">Logout</a>
          </div>
        </div>
      </nav>
    </div>

    <router-view @message="setLoggedIn" />
  </div>
</template> 

  

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  data() {
    return {
      isLoggedIn: false,
    };
  },

  methods: {
    setLoggedIn(login_status) {
      this.isLoggedIn = login_status;
    },

    logout() {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userProfile");
    }
  },
};
</script> 

  

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: whitesmoke;
  background: crimson;
  border-radius: 0.5rem;
}
</style> 

 