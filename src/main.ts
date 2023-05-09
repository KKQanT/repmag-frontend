import { createApp } from 'vue'
import App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import './style.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import '@popperjs/core'
import 'mosha-vue-toastify/dist/style.css'


library.add(faEye, faEyeSlash);

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')
