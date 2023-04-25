
<script lang="ts">

import pageStage from "./types";
import Auth from "./views/Auth.vue";

export default {

  name: "App",
  components: {
    Auth
  },

  data() {
    return {
      alreadyLoggedIn: false,
      userInfo: {
        name: "",
        gender: "",
        interestedIn: "",
      }
    }
  },

  mounted() {
    this.checkLogInStatus();
  },

  watch: {
    //setUserProfile
    alreadyLoggedIn(newVal: boolean, oldVal: boolean) {
      if (newVal || oldVal) {
        console.log('alreadyLoggedIn is true');
        // to continue
      } 
    }
  },

  methods: {
    checkLogInStatus() {
      const bearerToken = window.localStorage.getItem("bearerToken");
      if (bearerToken) {
        console.log('foung bearer:' + bearerToken)
        this.alreadyLoggedIn = true
      }
    }
  }
}

</script>

<template>
  <div id="app">
    <div v-if="!alreadyLoggedIn">
      <Auth @emittedLoggedIn="(value) => alreadyLoggedIn = value"/>
    </div>
    <div v-else>
      <div>
        You have logged in
      </div>
    </div>
  </div>
</template>