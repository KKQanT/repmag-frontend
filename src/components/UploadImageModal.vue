<script lang="ts">
import ImageService from '../services/imageService';
export default {
  name: "UploadImageModal",
  data() {
    return {
      file: null as File|null
    };
  },
  methods: {
    handleFileSelect(event: Event) {
      const input = (event.target as HTMLInputElement);
      if (input.files) {
        this.file = input.files[0];
      }
    },
    async uploadImage() {
      if (this.file) {
        await ImageService.uploadImage(this.file);
        this.file = null;
        //invoke close modal
      }
    }
  }
}
</script>

<template>
  <div class="upload-modal">
    <h2>Upload Image</h2>
    <input type="file" @change="handleFileSelect" />
    <button @click="uploadImage">upload</button>
  </div>
</template>