<script lang="ts">
import userServices from "../services/userServices";
import matchService from "../services/matchedServices";
import { notifyError } from "./../utils";
import { OtherUser, MatchingStatus } from "../types";
import socket from "../socket";

export default {
    name: "Swipping",
    props: {
        recommendedUsersProps: Array<OtherUser>
    },
    data() {
        return {
            selfUserId: "",
        }
    },
    methods: {
        async likeUser(targetUserID: string) {
            const resp = await matchService.likeUser(targetUserID);
            if (resp.status === 200) {
                const result = resp.data.result;
                if (result === MatchingStatus.matched) {
                    //emit match status
                    socket.emit("match notify", { targetUserID: targetUserID })
                } else if (result === "liked") {
                    socket.emit("liked notify", { targetUserID: targetUserID })
                }
            }
            this.removeUserCard(targetUserID);

        },

        async passUser(targetUserID: string) {
            await matchService.passUser(targetUserID);
            this.removeUserCard(targetUserID)
        },

        removeUserCard(userID: string) {
            this.recommendedUsersProps?.forEach((
                item: OtherUser, index: number, object: OtherUser[]
            ) => {
                if (item.userID === userID) {
                    object.splice(index, 1)
                }
            });
        },
    },
}
</script>

<template>
    <div>Swipping page</div>
    <div v-for="userData in recommendedUsersProps">
        <div>{{ userData.name }}</div>
        <div>
            <button @click="() => likeUser(userData.userID)">like</button>
            <button @click="() => passUser(userData.userID)">pass</button>
        </div>
    </div>
</template>

