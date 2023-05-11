<script lang="ts">

import userServices from '../services/userServices'
import { createToast } from 'mosha-vue-toastify';
import { notifyError } from "./../utils";

export default {
  name: "Auth",
  data() {
    return {
      email: "" as string,
      password: "" as string,
      hidePassword: true as Boolean,
    }
  },
  methods: {
    async onSignUp() {
      if (this.email !== '') {
        const resp = await userServices.signUp(this.email, this.password);
        if (resp.status === 200) {
          createToast("Sign Up successfully")
        } else {
          notifyError(resp);
        }
      }
    },
    async onLogin() {
      console.log('run login')
      const resp = await userServices.login(this.email, this.password);
      if (resp.status === 200) {
        const bearerToken = resp.data.bearerToken;
        window.localStorage.setItem("bearerToken", bearerToken);
        this.$emit("emittedLoggedIn", true);
      } else {
        notifyError(resp)
      }
    },

    viewPassword() {
      this.hidePassword = !this.hidePassword
    }
  },
  computed: {
    hidePasswordIcon() {
      return this.hidePassword ? "fa-eye" : 'fa-eye-slash';
    },

    hidePasswordInput() {
      return this.hidePassword ? "password" : "text";
    }
  }
}
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="card" style="width: 18rem;">
      <div class="p-5 box-shadow bg-white">
        <h2 class="mb-4">Welcome to Repmag</h2>
        <div>
          <div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address: </label>
              <input type="text" v-model="email" class="form-control" id="email" placeholder="example@gmail.com">
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between">
                <label for="password" class="form-label">Password: </label>
                <i v-if="hidePassword" @click="viewPassword">
                  <font-awesome-icon :icon="['fas', 'eye']" />
                </i>
                <i v-else @click="viewPassword">
                  <font-awesome-icon :icon="['fas', 'eye-slash']" />
                </i>
              </div>
              <input v-model="password" class="form-control" :type="hidePassword ? 'password' : 'text'">
            </div>
            <button class="btn btn-primary w-100" @click="onLogin">Login</button>
            <div class="mt-3 text-center">
              <a>Don't have an account?</a><br>
              <a href="#" @click="onSignUp">Create account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>