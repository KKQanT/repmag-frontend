
<script lang="ts">

import userServices from "./services/userServices";
import { PageStatus, OtherUsers } from "./types";
import { getBearerToken, notifyError } from "./utils";
import Auth from "./views/Auth.vue";
import InputProfilePage from "./views/InputProfilePage.vue";
import ChatRoom from "./views/ChatRoom.vue";
import socket from "./socket";
import matchServices from "./services/matchedServices";
import Swipping from "./views/Swipping.vue"

export default {

  name: "App",
  components: {
    Auth,
    InputProfilePage,
    Swipping,
    ChatRoom
},

  data() {
    return {
      loginSignal: false as boolean,
      pageStatus: PageStatus.Auth as PageStatus,
      userInfo: {
        name: "",
        gender: "",
        age: null,
        occupation: null,
        university: null
      },
      recommendsUsers: [] as OtherUsers[],
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
            age: userData.age,
            occupation: userData.occupation,
            university: userData.university
          }
          if (!userData.name || !userData.gender) { 
            this.pageStatus = PageStatus.InputProfile 
          } else {
            //get users for swipping
            console.log("run");
            const respA = await userServices.getRecomendedUsers();
            if (respA.status === 200) {
              this.recommendsUsers = respA.data;
            }
            this.pageStatus = PageStatus.Swipping;
            socket.auth = {bearerToken: bearerToken};
            socket.connect();
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
    },
  },
}

</script>

<template>
  <div id="app">
    <Auth @emittedLoggedIn="(value) => loginSignal = value" v-if='pageStatus === "auth"' />
    <InputProfilePage @emittedPageStatus="(value) => pageStatus = value" v-else-if='pageStatus === "inputProfile"'/>
    <Swipping v-else-if="pageStatus==='swipping'" :recommended-users-props="recommendsUsers"/>
  </div>
</template>