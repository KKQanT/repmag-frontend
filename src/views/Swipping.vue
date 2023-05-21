<script lang="ts">
import userServices from "../services/userServices";
import matchService from "../services/matchedServices";
import { notifyError } from "./../utils";
import { UserInfo, MatchingStatus } from "../types";
import socket from "../socket";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default {
    name: "Swipping",
    props: {
        recommendedUsersProps: Array<UserInfo>
    },
    data() {
        return {
            selectedPartner: null as UserInfo | null,
            showModal: "none"
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
                    console.log("liked")
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
                item: UserInfo, index: number, object: UserInfo[]
            ) => {
                if (item.userID === userID) {
                    object.splice(index, 1)
                }
            });
        },

        openCard(partner: UserInfo) {
            console.log(partner)
            this.selectedPartner = partner;
            this.showModal = "inline"
        },

        closeCard() {
            this.selectedPartner = null;
            this.showModal = "none";
        }
    },
}
</script>

<template>
    <!--to do solve 4 4 1 issue-->

    <div class="container justify-content-center align-items-center d-flex">
        <div class="card-list mt-3">
            <div v-for="partner in recommendedUsersProps" :key="partner.userID" class="card"
                @click="() => openCard(partner)">
                <img src="/download.jpg" alt="partner img" class="img-fluid">
                <div class="card-body">
                    <h5 class="card-title">{{ partner.name }}</h5>
                    <p class="card-text">{{ partner.age }}</p>
                </div>
            </div>
        </div>
    </div>

    <modal class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ selectedPartner?.name }}</h5>
                    <button type="button" class="btn-close" @click="closeCard">
                    </button>
                </div>
                <div class="modal-body">
                    <img src="/download.jpg" alt="partner img" class="full-card-img">
                    <p class="full-card-info">Age: {{ selectedPartner?.age }}</p>
                    <p class="full-card-info">University: {{ selectedPartner?.university }}</p>
                    <p class="full-card-info">Occupation: {{ selectedPartner?.occupation }}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger" @click="() => passUser(selectedPartner!.userID)">pass</button>
                    <button class="btn btn-success" @click="() => likeUser(selectedPartner!.userID)">like</button>
                </div>
            </div>
        </div>
    </modal>
</template>

<style scoped>
.card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    max-width: 80%;
}

.card {
    flex: 0 0 calc(25% - 20px);
    /* Adjust the width as needed */
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .card {
        flex: 0 0 calc(50% - 20px);
        /* Adjust the width for smaller screens */
    }
}

/*since bootraps modal is not working so this section is needed*/
modal {
    display: v-bind(showModal);
}
</style>