<script lang="ts">
import socket from '../socket'
import { getTime } from '../utils';

export default {
    name: "ChatRoom",
    props: {
        selfName: String,
        partnerName: String,
        selfUserID: String,
        partnerUserID: String,
        messages: Object,
    },
    data() {
        return {
            newMessage: "" as String,
            userIDtoUserName : new Map()
        }
    },

    created() {
        this.userIDtoUserName.set(this.selfUserID, this.selfName),
        this.userIDtoUserName.set(this.partnerUserID, this.partnerName);
    },

    methods: {
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
    <div class="chat-component">
        <div v-for="item in messages" :key="item.time" class="message">
            <p class="message-content">{{ userIDtoUserName.get(item.senderID) }} : {{ item.message }}</p>
        </div>
        <div class="message-input">
            <input type="text" v-model="newMessage" @keyup.enter="onSendMessage" placeholder="type a message">
            <button class="send-message-button" @click="onSendMessage">Send</button>
        </div>
    </div>
</template>