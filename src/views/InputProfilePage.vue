<script lang="ts">

import userServices from "../services/userServices";
import { GenderEnum } from "../types";

export default {
    name: "InputProfilePage",
    data() {
        return {
            name: null as string | null,
            gender: null as GenderEnum | null,
            interestedIn: null as GenderEnum | null
        }
    },

    methods: {
        async onSubmit() {
            if ((this.name) && (this.gender) && (this.interestedIn)) {
                const resp = await userServices.updateUserInfo(
                    this.name, this.gender, this.interestedIn
                )
                this.$emit("emittedPageStatus", "swipping")
            } else {
                alert('pls input value')
            }
        }
    }
}
</script>

<template>
    <div>
        <div>name</div>
        <input type="text" v-model="name">

        <select v-model="gender">
            <option>{{ "Man" }}</option>
            <option>{{ "Woman" }}</option>
        </select>

        <select v-model="interestedIn">
            <option>{{ "Man" }}</option>
            <option>{{ "Woman" }}</option>
        </select>

    </div>
    <div>
        <button @click="onSubmit">
            submit
        </button>
    </div>
</template>