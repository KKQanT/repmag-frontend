<script lang="ts">
import { OtherUser } from '../types';
import socket from '../socket'
import { getTime } from '../utils';

export default {
  name: "MatchedList",
  props: {
    mathcedListProps: Array<OtherUser>,
    selfName: String,
    partnerName: String,
    selfUserID: String,
    partnerUserID: String,
    messages: Object,
  },

  data() {
    return {
      newMessage: "" as String,
      userIDtoUserName: new Map()
    }
  },

  created() {
    this.userIDtoUserName.set(this.selfUserID, this.selfName),
      this.userIDtoUserName.set(this.partnerUserID, this.partnerName);
  },

  methods: {
    selectUser(userInfo: OtherUser) {
      this.$emit("emittedSelectedUserToChat", userInfo)
    },
    onSendMessage() {

      socket.emit("private message", {
        message: this.newMessage,
        fromSocketID: socket.id,
        toUserID: this.partnerUserID,
        fromUserID: this.selfUserID
      });
      this.messages!.push({
        message: this.newMessage,
        time: getTime(),
        senderID: this.selfUserID
      });
      this.newMessage = '';
    },
  }
}

</script>

<template>
  <!--<div v-for="userInfo in mathcedListProps">
        <div @click="() => selectUser(userInfo)">{{ userInfo.name }}</div>
    </div>-->
  <div class="container">
    <div class="row">
      <div class="col-md-4 bg-primary">
        <div class="card">
          <div class="card-header text-center">
          </div>
          <div class="card-body">
            <div class="row border-bottom border-secondary padding-bottom mb-3" v-for="userInfo in mathcedListProps"
              :key="userInfo.userID" @click="selectUser(userInfo)">
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
                <div class="col-md-1 d-flex justify-content-center align-items-center">
                  <div class="badge badge-pill bg-danger">3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 mb-4 bg-info">
        <div class="container">
          <div class="chatbox">
            <div class="chat-header">Test</div>
            <!-- Chat messages -->
            <div class="message received">
              <p class="message-content">Received message</p>
              <span class="text-muted">10:00 AM</span>
            </div>
            <div class="message sent">
              <p class="message-content">Sent message</p>
              <span class="text-muted">10:05 AM</span>
            </div>
            <!-- Add more message items as needed -->
          </div>
          <div class="message-input">
            <input type="text" class="form-control" placeholder="Type a message..." />
            <button class="btn btn-primary">Send</button>
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

.padding-bottom {
  padding-bottom: 15px;
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
  margin-bottom: 10px;
  border-radius: 5px;
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
</style>
  
  
  
  
  
  
  