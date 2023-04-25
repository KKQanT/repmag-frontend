<script lang="ts">

import userServices from '../services/userServices'
import { createToast } from 'mosha-vue-toastify';

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
                    alert("error"  + resp.status + " : " + resp.data.message);
                }
            }
        },
        async onLogin() {
            console.log('email', ' ', this.email);
            console.log('password', ' ', this.password);
            createToast('Wow, easy')
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
            <input :type="hidePasswordInput" v-model="password" placeholder="user@gmail.com">
            <i v-if="hidePassword" @click="viewPassword">
                <font-awesome-icon :icon="['fas', 'eye']" />
            </i>
            <i v-else @click="viewPassword">
                <font-awesome-icon :icon="['fas', 'eye-slash']" />
            </i>
        </div>
        <button  @click="onSignUp">
            Sign Up
        </button>
        <button  @click="onLogin">
            Log in
        </button>
    </div>
</template>