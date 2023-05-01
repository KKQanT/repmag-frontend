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
    <div class="login-page">
        <div class="form-card">
            <div class="label">Email</div>
            <input type="text" v-model="email" placeholder="user@gmail.com">
            <div class="label" Password>Password</div>
            <input :type="hidePasswordInput" v-model="password" placeholder="user@gmail.com" @keyup.enter="onLogin">
            <i v-if="hidePassword" @click="viewPassword">
                <font-awesome-icon :icon="['fas', 'eye']" />
            </i>
            <i v-else @click="viewPassword">
                <font-awesome-icon :icon="['fas', 'eye-slash']" />
            </i>
        </div>
        <button @click="onSignUp">
            Sign Up
        </button>
        <button @click="onLogin">
            Log in
        </button>
    </div>
</template>