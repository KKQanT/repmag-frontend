import { createApp } from 'vue'
import App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue3GoogleLogin from "vue3-google-login";

import './style.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import '@popperjs/core'
import 'mosha-vue-toastify/dist/style.css'


library.add(faEye, faEyeSlash);

console.log("clientId: ", import.meta.env.VITE_APP_GOOGLE_OAUTH_ID)

const app = createApp(App);

app.use(Vue3GoogleLogin, {
    clientId: import.meta.env.VITE_APP_GOOGLE_OAUTH_ID
})

app
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')