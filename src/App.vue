
<script lang="ts">

import userServices from "./services/userServices";
import { PageStatus, OtherUser, PrivateMessageArgs, Message } from "./types";
import { getBearerToken, getTime, notifyError } from "./utils";
import Auth from "./views/Auth.vue";
import InputProfilePage from "./views/InputProfilePage.vue";
import ChatRoom from "./views/ChatRoom.vue";
import socket from "./socket";
import matchServices from "./services/matchedServices";
import Swipping from "./views/Swipping.vue"
import { createToast } from "mosha-vue-toastify";
import MatchedList from "./views/MatchedList.vue";
import chatServices from "./services/chatServices";
import { data } from "jquery";
import Loading from "./views/Loading.vue";

interface MatchNotifyData {
  name: string
}

export default {

  name: "App",
  components: {
    Auth,
    InputProfilePage,
    Swipping,
    MatchedList,
    ChatRoom,
    Loading
  },

  data() {
    return {
      loginSignal: false as boolean,
      pageStatus: PageStatus.Auth as PageStatus,
      userInfo: {
        userID: "",
        name: "",
        gender: "",
        age: null,
        occupation: null,
        university: null
      },
      recommendsUsers: [] as OtherUser[],
      matchedUser: [] as OtherUser[],
      matchedUserMap: new Map(),
      selectedUserToChat: null as OtherUser | null,
      inMemoryCacheChat: new Map<string, Message[]>(),
    }
  },

  mounted() {
    this.setUpPageWithLoading();
  },

  watch: {
    //setUserProfile
    loginSignal(newVal: boolean, oldVal: boolean) {
      console.log("login signal invoked")
      if (newVal || oldVal) {
        this.setUpPage();
        this.loginSignal = false
      }
    },

    pageStatus(newVal: string, oldVal: string) {
      if ((oldVal === PageStatus.InputProfile) && (newVal === PageStatus.Swipping)) {
        this.getRecommendedUsers()
      }
    },

  },

  methods: {

    async setUpPage() {
      this.pageStatus = PageStatus.Loading
      const bearerToken = getBearerToken();
      if (bearerToken) {
        const userData = await this.getUserProfile();
        if (userData) {
          this.userInfo = {
            userID: userData.userID,
            name: userData.name,
            gender: userData.gender,
            age: userData.age,
            occupation: userData.occupation,
            university: userData.university
          }
          if (!userData.name || !userData.gender) {
            this.pageStatus = PageStatus.InputProfile
          } else {
            await this.getRecommendedUsers();
            await this.getMatchedAndChatHistory();
            this.pageStatus = PageStatus.Swipping;
            socket.auth = { bearerToken: bearerToken };
            socket.connect();
          }
        }
      } else {
        this.pageStatus = PageStatus.Auth;
      }
    },

    async setUpPageWithLoading() {
      try {
        this.switchPage(PageStatus.Loading);
        await this.setUpPage()
      } catch (err) {
        console.log(err)
        this.switchPage(PageStatus.Auth);
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

    async getRecommendedUsers() {
      const resp = await userServices.getRecomendedUsers();
      if (resp.status === 200) {
        this.recommendsUsers = resp.data;
      }
    },

    async getMatchedAndChatHistory() {

      const respA = await matchServices.getMatched();

      if (respA.status === 200) {
        this.matchedUser = respA.data

        for (const item of this.matchedUser) {
          this.matchedUserMap.set(item.userID, item)
          const respB = await chatServices.getChatHistory(item.userID)
          this.inMemoryCacheChat.set(item.userID, []);

          if (respB.status === 200 && respB.data.length > 0) {
            let messages = this.inMemoryCacheChat.get(item.userID);
            if (messages) {
              for (const messageData of respB.data) {
                messages.push({
                  message: messageData.message,
                  time: messageData.createdAt,
                  senderID: messageData.fromUserID
                });
              }
            }
          }
        }
      }
    },

    switchPage(pageStatus) {
      this.pageStatus = pageStatus
    },

    handleEmittedSelectedUserToChat(value: OtherUser) {
      this.selectedUserToChat = value;
    },

    logout() {
      localStorage.removeItem("bearerToken");
      this.switchPage(PageStatus.Auth);
    }
  },

  created() {
    socket.on("match notify", (data: MatchNotifyData) => {
      const partnerName = data.name;
      createToast(`${partnerName} has liked you back!`)
    }),

      socket.on("liked notify", (_data: MatchNotifyData) => {
        createToast(`someone has liked you`)
      }),

      socket.on("private message", (data: PrivateMessageArgs) => {
        const senderID = data.fromUserID;
        let messages = this.inMemoryCacheChat.get(senderID);
        if (messages) {
          messages.push({
            message: data.message,
            time: getTime(),
            senderID: senderID
          });
        }
      }),

      socket.on("self private message", (data: PrivateMessageArgs) => {
        const senderID = data.fromUserID;
        const toUserID = data.toUserID;
        let messages = this.inMemoryCacheChat.get(toUserID);
        if (messages) {
          messages.push({
            message: data.message,
            time: getTime(),
            senderID: senderID
          });
        }
      });
  }
}

</script>

<template>
  <Loading v-if="pageStatus === 'loading'" />
  <Auth @emittedLoggedIn="(value) => loginSignal = value" v-else-if='pageStatus === "auth"' />
  <InputProfilePage @emittedPageStatus="(value) => pageStatus = value" v-else-if='pageStatus === "inputProfile"' />
  <div v-else>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand mx-2" href="#">Logo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a type="button" class="nav-link" @click="() => switchPage('swipping')">Swipping</a>
          </li>
          <li class="nav-item">
            <a type="button" class="nav-link" @click="() => switchPage('matchedList')">MatchedList</a>
          </li>
        </ul>
      </div>
      <button class="btn btn-outline-danger mx-2" @click="logout">
        logout
      </button>
    </nav>
    <div>
      <Swipping v-if="pageStatus === 'swipping'" :recommended-users-props="recommendsUsers" />
      <MatchedList v-else-if="pageStatus === 'matchedList'" :mathced-list-props="matchedUser" :self-name="userInfo.name"
        :self-user-i-d="userInfo.userID" :all-messages="inMemoryCacheChat" />
    </div>
  </div>
</template>