<script lang="ts">

import { HtmlHTMLAttributes, PropType } from 'vue';
import { GenderEnum, UserInfo, Location, UserImage } from '../types';
import { stringify } from 'querystring';
import { calculateAge } from "../utils";
import userServices from '../services/userServices';
import { event } from 'jquery';
import UserImagesPanel from '../components/UserImagesPanel.vue';
import imageService from '../services/imageService';
import {preprocessImgData} from "../utils";

export default {
  name: "ProfileEdit",
  props: {
    isFirst: Boolean,
    profileEditProps: Object as PropType<UserInfo>
  },
  components: {
    UserImagesPanel
  },

  data() {
    return {
      name: undefined as string | undefined,
      gender: undefined as GenderEnum | undefined | null,
      university: undefined as string | null | undefined,
      birthdate: undefined as Date | null | undefined,
      occupation: undefined as string | undefined | null,
      company: undefined as string | undefined | null,
      bio: undefined as string | undefined | null,
      location: { city: "", country: "" } as Location,
      interestedIn: [] as string[],
      interestedItem: "" as string,
      age: null as null | number,
      birthdateString: null as null | string,
      userImages: [
        { url: '/img2.png', order: 0 },
        { url: '/img2.png', order: 1 },
        { url: '/download.jpg', order: 2 },
        { url: '/download.jpg', order: 3 },
        { url: '/download.jpg', order: 4 },
        { url: '/img1.png', order: 0 },
        { url: '/img2.png', order: 1 },
        { url: '/download.jpg', order: 2 },
        { url: '/download.jpg', order: 3 },
      ] as UserImage[],
      showModal: false as boolean,
      testImg: "/download.jpg" as string
    };
  },
  computed: {
    profileImage() {
      return this.userImages.length > 0 ? this.userImages[0].url : 'placeholder.png';
    },
    remainingImages() {
      return Math.max(0, 5 - this.userImages.length);
    },
    getAge() {
      console.log(this.birthdate)
      if (this.birthdate) {
        return calculateAge(this.birthdate)
      } else {
        return 0
      }
    }
  },
  watch: {
    birthdateString(newVal, _oldVal) {
      if (newVal) {
        this.birthdate = new Date(this.birthdateString!)
      }
    },
    showModal(newVal, _oldVal) {
      console.log('show modal')
      console.log(newVal)
    }
  },
  methods: {
    saveProfile() {
      if (
        this.name && this.gender && this.birthdate && this.location
      ) {
        userServices.updateUserInfo(
          this.name,
          this.gender,
          //@ts-ignore
          this.university,
          this.birthdate,
          this.occupation,
          this.company,
          this.bio,
          this.location,
          this.interestedIn,
          true
        )
        if (this.isFirst) {
          this.$emit("emittedSwitchPage", "");
        }
        //button loading
      } else {
        //display red text
      }
    },
    addInterest(): void {
      console.log('addInterest')
      this.interestedIn.push(this.interestedItem)
      this.interestedItem = "";
      (this.$refs.interestInput as HTMLInputElement).value = ''

    },
    clearInterest() {
      this.interestedIn = []
    },
    removeInterested(item: string) {
      const index = this.interestedIn.indexOf(item);
      if (index !== -1) {
        this.interestedIn.splice(index, 1)
      }
    }
    ,
    handleInputBio(event: Event): void {
      const target = event.target as HTMLInputElement;
      console.log(target.value)
      this.bio = target.value;
    },
    onChangeInterested(event: Event): void {
      const target = event.target as HTMLInputElement;
      this.interestedItem = target.value;
    },
    async queryImage() {
      const resp = await imageService.queryImage("test.png");
      const data = resp.data;
      const img  = preprocessImgData(resp.data);
      console.log("img", img)
      this.testImg = img;
    }
  },
  mounted() {
    this.name = this.profileEditProps?.name;
    this.gender = this.profileEditProps?.gender;
    this.birthdate = this.profileEditProps?.birthdate;
    this.university = this.profileEditProps?.university;
    this.occupation = this.profileEditProps?.occupation
    this.company = this.profileEditProps?.company;
    this.bio = this.profileEditProps?.bio;
    this.location = this.profileEditProps?.location!;
    this.interestedIn = [...this.profileEditProps?.interestedIn!];
    this.birthdateString = this.birthdate ? new Date(this.birthdate).toDateString() : "";
    this.queryImage();
  }
};
</script>

<template>
  <div class="container d-flex justify-content-center align-items-center mt-5">
    <div class="row mb-5">
      <div class="col-lg-6 d-flex align-items-stretch">
        <div class="card" style="width: 25rem;">
          <div class="card-body">
            <h5 class="card-title">Preview</h5>
            <div class="d-flex justify-content-center align-items-center">
              <div class="profile-image">
                <img class="card-img-top mb-3" :src="testImg" alt="Profile Image">
                <div class="image-overlay" @click="showModal=!showModal">
                  Upload new image
                </div>
              </div>
            </div>
            <h4 class="card-title">{{ name }}</h4>
            <h7 class="card-title">{{ occupation }} {{ company ? ", " + company : "" }}</h7>
            <br>
            <h7 class="card-title">{{ university }}</h7>
            <br>
            <h9 class="card-title">{{ getAge ? "age: " + getAge : "" }} {{ location.city ? `, ${location.city}` : "" }} {{
              location.country
              ? `, ${location.country}` : "" }}</h9>
            <p class="card-text mt-3">{{ bio }}</p>
            <h9 class="card-title">{{ interestedIn.length > 0 ? "interested in:" : "" }}</h9>
            <ul class="interested-in">
              <li v-for="item in interestedIn" class="list-card">
                <span class="close-button" @click="removeInterested(item)">x</span>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-6 d-flex align-items-stretch justify-content-center">
        <div class="card" style="width: 25rem;">
          <div class="card-body">
            <h5 v-if="!isFirst" class="card-title">Edit Profile</h5>
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" v-model="name" class="form-control" :placeholder="name">
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="gender">Gender</label>
                  <select id="gender" v-model="gender" class="form-control" :disabled="!isFirst">
                    <option value="" disabled selected>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="form-group col-md-6">
                  <label for="birthdate">birthdate</label>
                  <input type="date" id="birthdate" v-model="birthdateString" class="form-control"
                    :placeholder="birthdateString ? birthdateString : ''">
                </div>
              </div>
              <div class="form-group">
                <label for="university">University</label>
                <input type="text" id="university" v-model="university" class="form-control"
                  :placeholder="university ? university : ''">
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="occupation">Occupation</label>
                  <input type="text" id="occupation" v-model="occupation" class="form-control"
                    :placeholder="occupation ? occupation : ''">
                </div>
                <div class="form-group col-md-6">
                  <label for="company">Company</label>
                  <input type="text" id="company" v-model="company" class="form-control"
                    :placeholder="company ? company : ''">
                </div>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Bio</label>
                <textarea class="form-control" id="bio" rows="3" v-on:input="handleInputBio">{{ bio }}</textarea>
              </div>
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="city">City</label>
                  <input type="text" id="city" v-model="location.city" class="form-control"
                    :placeholder="location.city ? location.city : ''">
                </div>
                <div class="form-group col-md-6">
                  <label for="country">Country</label>
                  <input type="text" id="country" v-model="location.country" class="form-control"
                    :placeholder="location.country ? location.country : ''">
                </div>
              </div>
            </form>
            <div class="form-group">
              <label for="interestedIn">interested</label>
              <div class="d-flex">
                <input class="form-group me-3" type="text" id="interestedIn" ref="interestInput"
                  v-on:change="onChangeInterested">
                <button class="add-button me-2" @click="addInterest">add</button>
                <button class="clear-button" @click="clearInterest">clear</button>
              </div>
            </div>
          </div>
          <div class="card-footer text-right d-flex justify-content-center align-items-center">
            <button class="btn btn-primary w-50 mt-0" @click="saveProfile">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" :class="{ 'show': showModal }">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Your uploaded images</h5>
            <button type="button" class="close" @click="showModal=false">
            <span>&times;</span>
          </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <UserImagesPanel :user-images="userImages"/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.list-card {
  position: relative;
  background-color: hsl(0, 0%, 91%);
  padding: 5px 20px 5px 20px
}

.close-button {
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
  font-size: small;
  color: black;
  padding-right: 4px;
}

.profile-edit {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.profile-edit-left {
  flex: 1;
  margin-right: 30px;
  align-items: stretch;
}

.profile-edit-right {
  flex: 1;
  align-items: stretch;
}

.profile-image {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.3s;
}

.profile-image:hover .image-overlay {
  opacity: 1;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.gallery-item {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 5px;
}

.image-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  cursor: pointer;
}

.upload-icon {
  font-size: 24px;
  color: #999999;
}

.form-group {
  margin-bottom: 5px;
}

label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input[type="text"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-size: 14px;
}

select {
  height: 40px;
}

textarea {
  height: 100px;
  resize: vertical;
}

.toggle-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn.btn-toggle {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn.btn-toggle:hover {
  background-color: #0056b3;
}

.btn-primary {
  display: block;
  width: 100%;
  margin-top: 30px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.interested-in {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 0px;
  margin-top: 5px;
}

li {
  text-align: center;
  margin-right: 20px;
  list-style: none;
}

.add-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #296aeb;
  color: #ffffff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #121ac0;
}

.add-button:focus {
  outline: none;
}

.clear-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #b40303;
  color: #ffffff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.clear-button:hover {
  background-color: darkred;
}

.clear-button:focus {
  outline: none;
}

@media (max-width: 767px) {
  .profile-edit {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }

  .profile-edit-left {
    margin-right: 0;
    margin-bottom: 30px;
  }

  .profile-edit-right {
    width: 100%;
  }

  .toggle-button {
    justify-content: center;
  }

  .btn.btn-toggle {
    width: auto;
  }
}

.modal.show {
  display: block;
}
</style>
