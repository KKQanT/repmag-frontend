<script lang="ts">
import { OtherUser } from '../types';

export default {
    name: "MatchedList",
    props: {
        mathcedListProps: Array<OtherUser>
    },

    methods: {
        selectUser(userInfo: OtherUser) {
            this.$emit("emittedSelectedUserToChat", userInfo)
        }
    }
}

</script>

<template>
    <div v-for="userInfo in mathcedListProps">
        <div @click="() => selectUser(userInfo)">{{ userInfo.name }}</div>
    </div>
</template>