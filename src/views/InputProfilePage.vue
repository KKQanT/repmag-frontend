<script lang="ts">

import userServices from "../services/userServices";
import { GenderEnum, PreferencesType, Location } from "../types";

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
      userImages: [] as string[],
      bio: null as string | null,
      location: {
        city: null as string | null,
        country: null as string | null
      } as Location | null,

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
          ageRange: { min: this.minPreferAge, max: this.maxPreferAge },
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
  <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="row" style="width:50%;">
      <div class="col-lg-6 mx-auto">
        <h3 class="mb-3">Tell us more about yourself</h3>
        <div v-if="inputProfile">
          <div class="mb-3">
            <label for="name" class="form-label">Display Name</label>
            <input type="text" class="form-control" id="name" v-model="name">
          </div>
          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select class="form-select" id="gender" v-model="gender">
              <option>Man</option>
              <option>Woman</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="age" class="form-label">Age</label>
            <input type="number" class="form-control" id="age" v-model="age">
          </div>
          <div class="mb-3">
            <label for="university" class="form-label">university</label>
            <input type="text" class="form-control" v-model="university" id="university">
          </div>
          <div class="mb-3">
            <label for="occupation" class="form-label">Occupation</label>
            <input type="text" class="form-control" id="occupation" v-model="occupation">
          </div>
          <div class="d-grid gap-2 mt-5">
            <button class="btn btn-primary" type="button" @click="inputProfile = false">Next</button>
          </div>
        </div>

        <div v-else>
          <div class="mb-3">
            <label for="preferGender" class="form-label">Prefer Gender</label>
            <select class="form-select" id="preferGender" v-model="preferGender">
              <option>Man</option>
              <option>Woman</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="preferAge" class="form-label">Prefer Age</label>
            <div class="form-group">
              <label for="minPreferAge">minimum age</label>
              <input type="number" id="minPreferAge" v-model="minPreferAge">
              <label for="maxPreferAge">maximum age</label>
              <input type="number" id="maxPreferAge" v-model="maxPreferAge">
            </div>
          </div>
          <div class="mb-3">
            <label for="preferUniversities" class="form-label">prefer universities</label>
            <div class="d-flex align-items-center">
              <input id="preferUniversities" type="text" v-model="preferUniversity" class="mb-0" />
              <button class="btn btn-outline-secondary btn-sm ms-2" @click="onAddPreferUniversity">Add</button>
              <button class="btn btn-outline-secondary btn-sm ms-2" @click="clearPreferUniversities">Clear</button>
            </div>
          </div>
          <div class="mb-3">
            <label for="preferOccupation" class="form-label">prefer occupations</label>
            <div id="preferOccupation" class="d-flex align-items-center">
              <input type="text" v-model="preferOccupation" class="mb-0" />
              <button class="btn btn-outline-secondary btn-sm ms-2" @click="onAddPreferOccupation">Add</button>
              <button class="btn btn-outline-secondary btn-sm ms-2" @click="clearPreferOccupations">Clear</button>
            </div>
          </div>
          <div class="d-grid gap-2 mt-5">
            <button class="btn btn-primary" type="button" @click="onSubmit">Continue</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
