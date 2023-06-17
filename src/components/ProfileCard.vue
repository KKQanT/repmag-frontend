<script lang="ts">
import { PropType } from 'vue';
import { UserInfo } from '../types';
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

    getAge(birthdate: Date | null | undefined) {
      if (birthdate) {
        return calculateAge(birthdate)!.toString()
      } else {
        return ""
      }
    },

    handleClose() {
      this.$emit('emitClose')
    }
  },

};
</script>

<template>
  <div class="card-sm box-shadow border-0">
    <div class="d-flex flex-row-reverse bd-highlight">
      <button type="button" class="btn-close p-2" aria-label="Close" @click = handleClose></button>
    </div>
    <div class="card-body">
      <div class="d-flex justify-content-center align-items-center">
        <div class="profile-image">
          <img class="card-img-top mb-5" src="/download.jpg" alt="Profile Image">
          <div class="image-overlay mb-5">
            Show all images
          </div>
        </div>
      </div>
      <div class="title-container">
        <div class="d-flex justify-content-center align-items-center">
          <h4 class="card-title">{{ parseInfo(userInfo?.name) }}
          </h4>
        </div>
        <div class="btn-toolbar">
          <button class="btn btn-danger btn-pass mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"
              width="24" height="24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <button class="btn btn-primary btn-like">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-heart-fill"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg>
          </button>
        </div>
      </div>
      <h7 class="card-title">{{ parseInfo(userInfo?.occupation) }}{{ userInfo?.company ? ', ' +
        parseInfo(userInfo?.company) : '' }}</h7>
      <br>
      <h7 class="card-title">{{ parseInfo(userInfo?.university) }}</h7>
      <br>
      <h9 class="card-title">{{ age ? 'age: ' + age?.toString() : '' }}{{ userInfo?.location.city ? ', ' +
        parseInfo(userInfo.location.city) : '' }}{{
    userInfo?.location.country ? ', ' + parseInfo(userInfo?.location.country) : '' }}</h9>
      <p class="card-text mt-3">{{ parseInfo(userInfo?.bio) }}</p>
      <h9 class="card-title" v-if="(userInfo) && (userInfo.interestedIn.length > 0)">Interested in:</h9>
      <ul class="interested-in">
        <li v-for="item in userInfo?.interestedIn" :key="item" class="list-card">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.button-group {
  background-color: #dc3545;
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
  padding: 5px 20px 5px 20px;
}

.btn-like {
  background-color: #55acee;
  color: #fff;
}

.btn-pass {
  background-color: #ff6861;
  color: #fff;
}
</style>