<script lang="ts">

import userServices from "../services/userServices";
import { GenderEnum, PreferencesType } from "../types";

export default {
    name: "InputProfilePage",
    data() {
        return {

            inputProfile: true as boolean,

            name: null as string | null,
            gender: null as GenderEnum | null,
            university: null as string | null,
            age: null as number | null,
            occupation: null as string | null,
            
            preferences: null as PreferencesType | null,
            preferGender: null as GenderEnum | null,
            minPreferAge: null as number | null,
            maxPreferAge: null as number | null,
            preferUiversities: [] as string[],
            preferOccupations: [] as string[],

            preferUniversity: null as string | null,
            preferOccupation: null as string | null
        }
    },

    methods: {
        async onSubmit() {
            if (
                this.name && this.gender && this.university &&
                this.age && this.occupation
            ) {
                this.preferences = {
                    gender: this.preferGender,
                    ageRange: {min: this.minPreferAge, max: this.maxPreferAge},
                    universities: this.preferUiversities,
                    occupations: this.preferOccupations
                }
                const resp = await userServices.updateUserInfo(
                    this.name, this.gender, this.university, this.age,
                    this.occupation, this.preferences
                )
                this.$emit("emittedPageStatus", "swipping")
            } else {
                alert('pls input value')
            }
        },

        onAddPreferUniversity() {
            if (this.preferUniversity) {
                this.preferUiversities.push(this.preferUniversity);
                this.preferUniversity = null
            }
        },

        clearPreferUniversities() {
            this.preferUiversities = [];
        },

        onAddPreferOccupation() {
            if (this.preferOccupation) {
                this.preferOccupations.push(this.preferOccupation);
                this.preferOccupation = null
            }
        },

        clearPreferOccupations() {
            this.preferOccupations = [];
        }
    }
}
</script>

<template>
    <div v-if="inputProfile">
        <div>
            <div>name</div>
            <input type="text" v-model="name">
        </div>

        <div>
            <div>gender</div>
            <select v-model="gender">
                <option>{{ "Man" }}</option>
                <option>{{ "Woman" }}</option>
            </select>
        </div>

        <div>
            <div>university</div>
            <input type="text" v-model="university">
        </div>

        <div>
            <div>age</div>
            <input type="number" v-model="age">
        </div>

        <div>
            <div>occupation</div>
            <input type="text" v-model="occupation">
        </div>

        <div>
            <button @click="inputProfile = false">
                next
            </button>
        </div>

    </div>

    <div v-else>
        <div>
            <div>gender</div>
            <select v-model="preferGender">
                <option>{{ "Man" }}</option>
                <option>{{ "Woman" }}</option>
            </select>
        </div>

        <div>
            <div>ageRange</div>
            <div>
                <div>min</div>
                <input type="number" v-model="minPreferAge">
                <div>max</div>
                <input type="number" v-model="maxPreferAge">
            </div>
        </div>

        <div v-if="preferUiversities">
            <div>universities</div>
            <li v-for="item in preferUiversities" :key="item">{{ item }}</li>
        </div>

        <div v-if="preferOccupations">
            <div>occupations</div>
            <li v-for="item in preferOccupations" :key="item">{{ item }}</li>
        </div>

        <div>
            <div>universities</div>
            <input type="text" v-model="preferUniversity">
            <button @click="onAddPreferUniversity">add</button>
            <button @click="clearPreferUniversities">clear</button>
        </div>

        <div>
            <div>occupations</div>
            <input type="text" v-model="preferOccupation">
            <button @click="onAddPreferOccupation">add</button>
            <button @click="clearPreferOccupations">clear</button>
        </div>

        <div>
            <button @click="onSubmit">
                submit
            </button>
        </div>

    </div>
</template>
