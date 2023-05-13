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
      showModal: false
    }
  },
  methods: {

    onOpenSignup() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

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
              <a href="#" @click="onOpenSignup">Create account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <modal class="modal justify-content-center align-items-center d-flex" v-if="showModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Sign Up</h5>
          <button type="button" class="close" @click="closeModal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
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
          <button class="btn btn-primary w-100" @click="onSignUp">Login</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
}

/* Center the modal content */
.modal-dialog {
  margin: 0;
}

/* Set the width of the modal */
.modal-content {
  width: 18rem;
}

/* Additional styling for the modal header */
.modal-header {
  background-color: #f8f9fa;
  padding: 1rem;
}

/* Additional styling for the modal body */
.modal-body {
  padding: 1rem;
}

/* Additional styling for the modal title */
.modal-title {
  margin: 0;
}

/* Additional styling for the close button */
.close {
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.close:focus,
.close:hover {
  color: #000;
  text-decoration: none;
}
</style>