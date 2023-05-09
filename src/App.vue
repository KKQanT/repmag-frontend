
<script lang="ts">

import userServices from "./services/userServices";
import { PageStatus, OtherUser, PrivateMessageArgs } from "./types";
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
      inMemoryCacheChat: new Map(),
    }
  },

  mounted() {
    this.setUpPageWithLoading();
  },

  watch: {
    //setUserProfile
    loginSignal(newVal: boolean, oldVal: boolean) {
      if (newVal || oldVal) {
        this.setUpPage();
      }
    },

    pageStatus(newVal: string, oldVal: string) {
      if ((oldVal === PageStatus.InputProfile) && (newVal === PageStatus.Swipping)) {
        this.getRecommendedUsers()
      }
    },

    selectedUserToChat(_newVal: OtherUser | null, _oldVal: OtherUser | null) {
      this.switchPage(PageStatus.Chatroom);
    }
  },

  methods: {

    async setUpPage() {
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
    },

    switchPage(pageStatus) {
      this.pageStatus = pageStatus
    },

    handleEmittedSelectedUserToChat(value: OtherUser) {
      this.selectedUserToChat = value;
      this.switchPage(PageStatus.Chatroom);
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
        messages.push({
          message: data.message,
          time: getTime(),
          senderID: senderID
        });
      }),

      socket.on("self private message", (data: PrivateMessageArgs) => {
        const senderID = data.fromUserID;
        const toUserID = data.toUserID;
        let messages = this.inMemoryCacheChat.get(toUserID);
        messages.push({
          message: data.message,
          time: getTime(),
          senderID: senderID
        });
      });
  }
}

</script>

<template>
  <Loading v-if="pageStatus === 'loading'" />
  <Auth @emittedLoggedIn="(value) => loginSignal = value" v-else-if='pageStatus === "auth"' />
  <InputProfilePage @emittedPageStatus="(value) => pageStatus = value" v-else-if='pageStatus === "inputProfile"' />
  <div v-else>
    <div>
      <button @click="() => switchPage('swipping')">Swipping</button>
      <button @click="() => switchPage('matchedList')">MatchedList</button>
      <button @click="() => logout()">logout</button>
    </div>
    <div>
      <Swipping v-if="pageStatus === 'swipping'" :recommended-users-props="recommendsUsers" />
      <MatchedList v-else-if="pageStatus === 'matchedList'" :mathced-list-props="matchedUser"
        @emittedSelectedUserToChat="(value) => handleEmittedSelectedUserToChat(value)" />
      <ChatRoom v-else-if="pageStatus === 'chatroom'" :self-name="userInfo.name" :partner-name="selectedUserToChat?.name"
        :self-user-i-d="userInfo.userID" :partner-user-i-d="selectedUserToChat?.userID"
        :messages="inMemoryCacheChat.get(selectedUserToChat?.userID)" />
    </div>
  </div>
</template>