<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
          <div class="card-img-left d-none d-md-flex">
            <!-- Background image for card set in CSS! -->
          </div>
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Register</h5>
            <form>
              <div class="form-floating mb-3">
                <input v-model="username" type="text" class="form-control" id="floatingInputUsername" placeholder="Username" required autofocus>
                <label for="floatingInputUsername">Username</label>
              </div>

              <div class="form-floating mb-3">
                <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
              </div>

              <div class="form-floating mb-3">
                <input v-model="confirm_password" type="password" class="form-control" id="floatingPasswordConfirm" placeholder="Confirm Password">
                <label for="floatingPasswordConfirm">Confirm Password</label>
              </div>

              <div class="d-grid mb-2">
                <router-link to="/login" @click="onSubmit" class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Register</router-link>
              </div>

              <router-link class="nav-link d-block text-center mt-2 small" to="/login">Have an account? Sign In</router-link>
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
  name: "Register",
  data() {
    return {
      username: '',
      password: '',
      confirm_password: ''
    }
  },

  beforeMount() {
    this.initRegister();
  },

  methods: {
    ...mapActions("user", {
        register: "register",
        initRegister: "registerReset",
      }
    ),

    onSubmit(e){
      e.preventDefault();
      console.log("Register");
      console.log(this.username);
      console.log(this.password);
      console.log(this.confirm_password);
      const user = {
        username: this.username,
        password: this.password,
      };
      this.register(user);
    }
  }
}
</script>

<style scoped>

</style>