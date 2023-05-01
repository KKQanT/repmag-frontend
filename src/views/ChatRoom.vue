<script lang="ts">
import socket from '../socket'
import { PrivateMessageArgs } from "../types";

interface Message {
    message: string,
    time: string,
    sender: string
}

export default {
    name: "ChatRoom",
    props: {
        selfUserID: String,
        selfUsername: String,
        otherUserID: String,
        otherUsername: String
    },
    data() {
        return {
            messages: [] as Message[],
            newMessage: "" as string
        }
    },

    created() {
        socket.on("private message", (data: PrivateMessageArgs) => {
            this.messages.push({
                message: data.message,
                time: this.getTime(),
                sender: this.otherUsername!
            }
            );
        });
    },

    methods: {
        onSendMessage() {
            socket.emit("private message", ({
                message: this.newMessage,
                fromSocketID: socket.id,
                toUserID: this.otherUserID
            }));
            this.messages.push({
                message: this.newMessage,
                time: this.getTime(),
                sender: this.selfUsername!
            });
            this.newMessage = '';
        },

        getTime() {
            const now = new Date();
            const dateTimeString = now.toLocaleString(
                'en-US',
                {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
            return dateTimeString    
        }
    }
}

</script>

<template>
    <div class="chat-component">
        <div v-for="item in messages" :key="item.time" class="message">
        <p class="message-content">{{ item.sender }} : {{ item.message }}</p>
        </div>
        <div class="message-input">
            <input type="text" v-model="newMessage" @keyup.enter="onSendMessage" placeholder="type a message">
            <button class="send-message-button" @click="onSendMessage">Send</button>
        </div>
    </div>
</template>