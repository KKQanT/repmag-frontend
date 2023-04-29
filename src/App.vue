
<script lang="ts">

import userServices from "./services/userServices";
import { PageStatus } from "./types";
import { getBearerToken, notifyError } from "./utils";
import Auth from "./views/Auth.vue";
import InputProfilePage from "./views/InputProfilePage.vue";

export default {

  name: "App",
  components: {
    Auth,
    InputProfilePage
  },

  data() {
    return {
      loginSignal: false as boolean,
      pageStatus: PageStatus.Auth as PageStatus,
      userInfo: {
        name: "",
        gender: "",
        interestedIn: "",
      }
    }
  },

  mounted() {
    this.checkPageStatus();
  },

  watch: {
    //setUserProfile
    loginSignal(newVal: boolean, oldVal: boolean) {
      if (newVal || oldVal) {
        console.log('run watch')
        this.checkPageStatus();
      }
    }
  },

  //user1@gmail.com
  //password

  methods: {

    async checkPageStatus() {
      const bearerToken = getBearerToken();
      if (bearerToken) {
        const userData = await this.getUserProfile();
        if (userData) {
          this.userInfo = {
            name: userData.name,
            gender: userData.gender,
            interestedIn: userData.interestedIn
          }
          if (!userData.name || !userData.gender || !userData.interestedIn) { 
            this.pageStatus = PageStatus.InputProfile 
          } else {
            this.pageStatus = PageStatus.Swipping
          }
        }
      } else {
        this.pageStatus = PageStatus.Auth;
      }
    },

    async getUserProfile() {
      const resp = await userServices.getSelfProfile();
      if (resp.status === 200) {
        return resp.data
      } else {
        notifyError(resp);
      }
    }

    //to continue

  }
}

</script>

<template>
  <div id="app">
    <Auth @emittedLoggedIn="(value) => loginSignal = value" v-if='pageStatus === "auth"' />
    <InputProfilePage @emittedPageStatus="(value) => pageStatus = value" v-else-if='pageStatus === "inputProfile"'/>
    <div v-else-if='pageStatus === "swipping"'>swipping page</div>
  </div>
</template>