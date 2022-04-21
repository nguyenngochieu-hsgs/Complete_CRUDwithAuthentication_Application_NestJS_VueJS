<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
          <div class="card-img-left d-none d-md-flex">
            <!-- Background image for card set in CSS! -->
          </div>
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Login</h5>
            <form>
              <div class="form-floating mb-3">
                <input v-model="username" type="text" class="form-control" id="floatingInputUsername" placeholder="Username" required autofocus>
                <label for="floatingInputUsername">Username</label>
              </div>

              <div class="form-floating mb-3">
                <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
              </div>

              <div class="d-grid mb-2">
                <button @click="onSubmit" class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Login</button>
              </div>

<!--              <router-link class="nav-link d-block text-center mt-2 small" to="/login">Have an account? Sign In</router-link>-->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
    }
  },

  methods: {
    ...mapActions("user", {
      login: "login",
    }),

    onSubmit(e){
      e.preventDefault();
      console.log("Login");
      console.log(this.username);
      console.log(this.password);
      const user = {
        username: this.username,
        password: this.password
      }
      this.login(user);
    }
  }
}
</script>

<style scoped>

</style>