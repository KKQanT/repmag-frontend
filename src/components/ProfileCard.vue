<script lang="ts">
import {  PropType } from 'vue';
import {  UserInfo } from '../types';
import { calculateAge } from '../utils';

export default {
  name: "ProfileCard",
  props: {
    userInfo: Object as PropType<UserInfo>,
    age: Number
  },
  data() {
    return {
      name: 'John Doe',
      occupation: 'Developer',
      company: 'OpenAI',
      university: 'University of AI',
      location: {
        city: 'San Francisco',
        country: 'USA'
      },
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      interestedIn: ['Programming', 'Artificial Intelligence', 'Machine Learning']
    };
  },

  methods: {
    parseInfo(info: any) {
      return info ? info : "-"
    },

    getAge(birthdate: Date|null|undefined) {
      if (birthdate) {
        return calculateAge(birthdate)!.toString()
      } else {
        return ""
      }
    }
  },

};
</script>

<template v-show="errors">
  <div class="card shadow-none border-0">
    <div class="card-body">
      <div class="d-flex justify-content-center align-items-center">
        <div class="profile-image">
          <img class="card-img-top mb-5" src="/download.jpg" alt="Profile Image">
          <div class="image-overlay mb-5">
            show all images
          </div>
        </div>
      </div>
      <h4 class="card-title">{{ parseInfo(userInfo?.name) }}</h4>
      <h7 class="card-title">{{ parseInfo(userInfo?.occupation) }}{{ userInfo?.company ? ', ' + parseInfo(userInfo?.company) : '' }}</h7>
      <br>
      <h7 class="card-title">{{ parseInfo(userInfo?.university) }}</h7>
      <br>
      <h9 class="card-title">{{ age ? 'age: ' + age?.toString() : '' }}{{ userInfo?.location.city ? ', ' + parseInfo(userInfo.location.city) : '' }}{{
        userInfo?.location.country ? ', ' + parseInfo(userInfo?.location.country) : '' }}</h9>
      <p class="card-text mt-3">{{ parseInfo(userInfo?.bio) }}</p>
      <h9 class="card-title" v-if="(userInfo) && (userInfo.interestedIn.length > 0)">interested in:</h9>
      <ul class="interested-in">
        <li v-for="item in userInfo?.interestedIn" :key="item" class="list-card">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>

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

.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}

.close:hover {
  color: #000;
  text-decoration: none;
  opacity: 0.75;
}

.close:focus,
.close:hover {
  color: #000;
  text-decoration: none;
  opacity: 0.75;
  outline: 0;
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
  margin: 5px;
  list-style: none;
}

.list-card {
  position: relative;
  background-color: hsl(0, 0%, 91%);
  padding: 5px 20px 5px 20px
}

</style>