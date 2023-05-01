<script lang="ts">
import userServices from "../services/userServices";
import { notifyError } from "./../utils";
import { OtherUsers } from "../types";
export default {
    name: "Swipping",
    props: {
        recommendedUsersProps: Array<OtherUsers>
    },
    data() {
        return {
            selfUserId: "",
            recommendedUsers: [] as Array<OtherUsers> | undefined,
        }
    },
    methods: {
        getRecommendedUsers() {
            this.recommendedUsers = this.recommendedUsersProps
        }
    },
    mounted() {
        this.getRecommendedUsers()
    }
}
</script>

<template>
    <div>Swipping page</div>
    <div v-for="userData in recommendedUsers">
        <div>{{ userData.name }}</div>
        <!-- to do add like button -->
    </div>
</template>

