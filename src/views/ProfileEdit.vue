<template>
    <div class="profile-edit">
      <h1>Edit Profile</h1>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" class="form-control">
      </div>
      <div class="form-group">
        <label for="bio">Bio</label>
        <textarea id="bio" v-model="bio" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label for="profile-picture">Profile Picture</label>
        <input type="file" id="profile-picture" @change="handleProfilePictureChange" accept="image/*" class="form-control-file">
      </div>
      <div class="form-group">
        <label for="cover-image">Cover Image</label>
        <input type="file" id="cover-image" @change="handleCoverImageChange" accept="image/*" class="form-control-file">
      </div>
      <button class="btn btn-primary" @click="saveProfile">Save</button>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        name: "",
        bio: "",
        profilePicture: null,
        coverImage: null
      };
    },
    methods: {
      handleProfilePictureChange(event) {
        this.profilePicture = event.target.files[0];
      },
      handleCoverImageChange(event) {
        this.coverImage = event.target.files[0];
      },
      saveProfile() {
        // Handle saving profile logic
        // You can access the updated values in this.name, this.bio, this.profilePicture, this.coverImage
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-edit {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
  }
  
  textarea {
    height: 150px;
  }
  </style>