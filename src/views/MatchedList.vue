<script lang="ts">
import { OtherUser, Message } from '../types';
import socket from '../socket'
import { getTime } from '../utils';
import { PropType } from 'vue';

export default {
  name: "MatchedList",
  props: {
    mathcedListProps: Array<OtherUser>,
    selfName: String,
    selfUserID: String,
    allMessages: Object as PropType<Map<string, Message[]>>,
    countUnreads: Object as PropType<Map<string, number>>,
  },

  data() {
    return {
      newMessage: "" as string,
      userIDtoUserName: new Map(),
      selectedPartner: null as OtherUser | null,
      messages: [] as Message[] | undefined
    }
  },

  methods: {
    selectUser(userInfo: OtherUser) {
      this.messages = this.allMessages?.get(userInfo.userID);
      this.selectedPartner = userInfo;
      this.$emit("emittedSelectedUserToChat", userInfo)
    },
    onSendMessage() {

      socket.emit("private message", {
        message: this.newMessage,
        fromSocketID: socket.id,
        toUserID: this.selectedPartner!.userID,
        fromUserID: this.selfUserID
      });
      this.messages!.push({
        message: this.newMessage,
        time: getTime(),
        senderID: this.selfUserID!,
        isRead: true
      });
      this.newMessage = '';
    },
  },
}

</script>

<template>
  <!--<div v-for="userInfo in mathcedListProps">
        <div @click="() => selectUser(userInfo)">{{ userInfo.name }}</div>
    </div>-->
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header text-center">
          </div>
          <div class="card-body">
            <div class="row border-bottom border-secondary padding-bottom mb-3 user-card"
              v-for="userInfo in mathcedListProps" :key="userInfo.userID" @click="selectUser(userInfo)">
              <div class="col-md-12 row">
                <div class="col-md-3 user-info-avartar d-flex justify-content-center">
                  <img src="/download.jpg" alt="user image" class="rounded-circle">
                </div>
                <div class="col-md-8 d-flex flex-column p-2">
                  <div class="mb-auto">
                    {{ userInfo.name }}
                  </div>
                  <div class="text-muted">
                    {{ "this is template message" }}
                  </div>
                </div>
                <div v-if="countUnreads?.get(userInfo.userID)! > 0" class="col-md-1 d-flex justify-content-center align-items-center">
                  <div class="badge badge-pill bg-danger">{{countUnreads?.get(userInfo.userID)}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 mb-4">
        <div class="chat-header">{{ selectedPartner?.name ? selectedPartner?.name : "" }}</div>
        <div class="container">
          <div class="chatbox">
            <div v-for="item in messages">
              <div v-if="item.senderID === selfUserID" 
              class="message sent">
                <p class="message-content">{{ item.message }}</p>
                <div class="time-text">
                  {{ item.isRead ? "Read" : "sent" }} {{ (new Date(item.time)).toLocaleTimeString([], { timeStyle: "short" }) }}

                </div>
              </div>
              <div v-else class="message received">
                <p class="message-content">{{ item.message }}</p>
                <div class="time-text">
                  {{ (new Date(item.time)).toLocaleTimeString([], { timeStyle: "short" }) }}
                </div>
              </div>
            </div>
          </div>
          <div class="message-input">
            <input 
            type="text" 
            class="form-control" 
            placeholder="Type a message..." 
            v-model="newMessage"
            v-on:keyup.enter="onSendMessage"
            />
            <button class="btn btn-primary" @click="onSendMessage">Send</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-info-avartar {
  position: relative;
}

.user-info-avartar img {
  width: 60px;
  height: 60px;
}

.container {
  margin-top: 20px;
}

.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.chatbox {
  height: 800px;
  overflow-y: scroll;
}

.message {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
}

.received {
  background-color: #f2f2f2;
  text-align: left;
}

.sent {
  background-color: #dcf8c6;
  text-align: right;
}

.message-content {
  margin-bottom: 5px;
}

.message-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.chat-header {
  padding: auto;
  margin-bottom: 10px;
  font-size: large;
  font-weight: 500;
}

.user-card {
  cursor: pointer;
  padding-bottom: 15px;
}

.user-card:hover {
  border-color: #000;
  /* Change border color on hover */
  background: #dcf8c6;
}

.time-text {
  font-size:x-small;
}

</style>
  
  
  
  
  
  
  