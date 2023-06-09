
<script lang="ts">

import userServices from "./services/userServices";
import { PageStatus, UserInfo, PrivateMessageArgs, Message } from "./types";
import { getBearerToken, getTime, notifyError } from "./utils";
import Auth from "./views/Auth.vue";
import socket from "./socket";
import matchServices from "./services/matchedServices";
import Swipping from "./views/Swipping.vue"
import { createToast } from "mosha-vue-toastify";
import MatchedList from "./views/MatchedList.vue";
import chatServices from "./services/chatServices";
import Loading from "./views/Loading.vue";
import ProfileEdit from "./views/ProfileEdit.vue";

interface MatchNotifyData {
  name: string
}

export default {

  name: "App",
  components: {
    Auth,
    Swipping,
    MatchedList,
    Loading,
    ProfileEdit
  },

  data() {
    return {
      loginSignal: false as boolean,
      isDropdownOpen: false,
      pageStatus: PageStatus.Auth as PageStatus,
      userInfo: {
        userID: "",
        name: "",
        gender: null,
        birthdate: null,
        university: null,
        occupation: null,
        company: null,
        bio: null,
        location: {
          city: null,
          country: null
        },
        interestedIn: []
      } as UserInfo,
      recommendsUsers: [] as UserInfo[],
      matchedUser: [] as UserInfo[],
      matchedUserMap: new Map(),
      selectedUserToChat: null as UserInfo | null,
      inMemoryCacheChat: new Map<string, Message[]>(),
      countUnreads: new Map<string, number>(),
      recentMessages: new Map<string, string>(),
      profilePicture: "/download.jpg",
      visible: false
    }
  },

  mounted() {
    this.setUpPageWithLoading();
  },

  watch: {
    //setUserProfile
    loginSignal(newVal: boolean, oldVal: boolean) {
      console.log("login signal invoked");
      if (newVal || oldVal) {
        this.setUpPage();
        this.loginSignal = false
      }
    },

    pageStatus(newVal: string, oldVal: string) {
      console.log(newVal)
      console.log("pageStatus invoked");
      if ((oldVal === PageStatus.InputProfile) && (newVal === PageStatus.Swipping)) {
        this.getRecommendedUsers()
      }
    },

    selectedUserToChat(newVal: UserInfo | null, _oldVal: UserInfo | null) {
      console.log('selected_user_to_chat has changed');
      if (newVal) {
        const partnerUserID_ = newVal.userID;
        let messages = this.inMemoryCacheChat.get(partnerUserID_);
        messages?.map((element, index, object) => {
          if (!element.isRead && (element.senderID === partnerUserID_)) {
            object[index].isRead = true
          }
        })
        this.countUnreads.set(partnerUserID_, 0);
        socket.emit("receiver has read all messages", {
          fromUserID: partnerUserID_,
          toUserID: this.userInfo.userID
        });
        console.log('invoke emit read all messaged')
      }
    }

  },

  methods: {

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

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
            birthdate: userData.birthdate,
            occupation: userData.occupation,
            company: userData.company,
            university: userData.university,
            bio: userData.bio,
            location: userData.location,
            interestedIn: userData.interestedIn
          };
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
      console.log('setUpPageWithLoading')
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
        this.recommendsUsers = [...resp.data, ...resp.data, ...resp.data, ...resp.data,
        ...resp.data, ...resp.data, ...resp.data, ...resp.data]
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
          this.countUnreads.set(item.userID, 0);

          if (respB.status === 200 && respB.data.length > 0) {
            let messages = this.inMemoryCacheChat.get(item.userID);
            let countUnread = 0;
            let recentMessage = '';
            if (messages) {
              for (const [index, messageData] of respB.data.entries()) {
                messages.push({
                  message: messageData.message,
                  time: messageData.createdAt,
                  senderID: messageData.fromUserID,
                  isRead: messageData.isRead
                });

                if ((messageData.senderID === item.userID) && messageData.isRead) {
                  countUnread += 1
                }

                if (index === respB.data.length - 1) {
                  recentMessage = messageData.message
                }
              }
              console.log('chat')
              console.log(item.name)
              console.log(messages)
            }
            this.recentMessages.set(item.userID, recentMessage);
            this.countUnreads.set(item.userID, countUnread);
          }
        }
        console.log('recentMessages')
        console.log(this.recentMessages)
      }
    },

    switchPage(pageStatus) {
      console.log('switch page invoke')
      this.pageStatus = pageStatus
      if (pageStatus !== PageStatus.MatchedList) {
        this.selectedUserToChat = null
      }
    },

    handleEmittedSelectedUserToChat(value: UserInfo) {
      this.selectedUserToChat = value;
    },

    logout() {
      localStorage.removeItem("bearerToken");
      this.switchPage(PageStatus.Auth);
      socket.disconnect();
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
        const isRead = this.selectedUserToChat?.userID === senderID ? true : false;
        if (senderID !== this.userInfo.userID) {
          if (!isRead) {
            let countUnread = this.countUnreads.get(senderID);
            countUnread! += 1
            this.countUnreads.set(senderID, countUnread!);
            console.log('update count unread')
            console.log(this.countUnreads)
          }
        }

        if (isRead) { socket.emit("receiver instant read message", data); }

        if (messages) {
          messages.push({
            message: data.message,
            time: getTime(),
            senderID: senderID,
            isRead: isRead
          });
        }
      }),

      socket.on("receiver instant read message", (data) => {
        const userID_ = data.fromUserID;
        const partnerUserID_ = data.toUserID;
        const recentReadTime = data.recentReadTime;
        let messages = this.inMemoryCacheChat.get(partnerUserID_);
        messages?.map((element, index, object) => {
          if (!element.isRead && (element.time < recentReadTime) && (element.senderID === userID_)) {
            object[index].isRead = true
          }
        });
        //to continue
      });

    socket.on("receiver has read all messages", (data: PrivateMessageArgs) => {
      const userID_ = data.fromUserID;
      const partnerUserID_ = data.toUserID;
      let messages = this.inMemoryCacheChat.get(partnerUserID_);
      messages?.map((element, index, object) => {
        if (!element.isRead && (element.senderID === userID_)) {
          object[index].isRead = true
        }
      })
    })

    socket.on("self private message", (data: PrivateMessageArgs) => {
      const senderID = data.fromUserID;
      const toUserID = data.toUserID;
      let messages = this.inMemoryCacheChat.get(toUserID);
      if (messages) {
        messages.push({
          message: data.message,
          time: getTime(),
          senderID: senderID,
          isRead: true
        });
      }
    });
  },
}

</script>

<template>
  <Loading v-if="pageStatus === 'loading'" />
  <Auth @emittedLoggedIn="(value) => loginSignal = value" v-else-if='pageStatus === "auth"' />
  <div class="container" v-else-if="pageStatus === 'inputProfile'">
    <div class="p-3 m-5 text-center">
      <h1>Tell your partner about yourself</h1>
    </div>
    <ProfileEdit @emittedSwitchPage="(_value) => switchPage('swipping')" :profile-edit-props="userInfo"
      :is-first="true" />
  </div>
  <div v-else>
    <!--https://stackoverflow.com/questions/72299785/bootstrap-5-navbar-not-toggling-in-vue3-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand ms-3 logo" href="#">Your Logo</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" @click="switchPage('swipping')">Swipping</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="switchPage('matchedList')">MatchedList</a>
          </li>
        </ul>
      </div>
      <div class="nav-item dropdown me-2">
        <a class="nav-link dropdown-toggle" href="#" @click="toggleDropdown" role="button" aria-haspopup="true"
          aria-expanded="false">
          <img class="profile-picture rounded-circle" :src="profilePicture" alt="Profile Picture">
        </a>
        <div class="dropdown-menu dropdown-menu-right" :class="{ 'show': isDropdownOpen }">
          <a class="dropdown-item" href="#" @click="switchPage('profileEdit')">Profile</a>
          <a class="dropdown-item" href="#" @click="logout">Logout</a>
        </div>
      </div>
    </nav>
    <div>
      <Swipping v-if="pageStatus === 'swipping'" :recommended-users-props="recommendsUsers" />
      <MatchedList v-else-if="pageStatus === 'matchedList'" :mathced-list-props="matchedUser" :self-name="userInfo.name"
        :self-user-i-d="userInfo.userID" :all-messages="inMemoryCacheChat" :count-unreads="countUnreads"
        :recent-messages="recentMessages"
        @emittedSelectedUserToChat="(value) => handleEmittedSelectedUserToChat(value)" />
      <ProfileEdit v-else-if="pageStatus === 'profileEdit'" :profile-edit-props="userInfo" :is-first="false" />
    </div>
  </div>
</template>

<style>
.profile-picture {
  width: 60px;
  height: 60px;
}

.logo {
  display: inline;
}

@media (max-width: 991px) {
  .logo {
    display: none;
  }
}
</style>