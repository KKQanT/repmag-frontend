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
                  <div>
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
      <div class="col-md-8 bg-info vh-100 mb-4">
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

.user-name-message {
  justify-content: space-between;
}

.padding-bottom {
  padding-bottom: 15px;
}

</style>
  
  
  
  
  
  
  