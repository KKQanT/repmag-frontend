<script lang="ts">
import { PropType, ref } from 'vue';
import ImageService from '../services/imageService';
import UploadImageModal from './UploadImageModal.vue';
import { UserImage } from "../types"
export default {
  name: "UserImagesPanel",
  components: {
    UploadImageModal
  },
  props: {
    userImages: {
      type: Array as PropType<UserImage[]>,
      required: true
    }
  },
  setup(props) {
    const images = ref<UserImage[]>(props.userImages);
    const showUploadModal = ref<boolean>(false);
    const selectedImageIndex = ref<number | null>(null);

    const handleImageClick = (index: number) => {
      selectedImageIndex.value = index;
      showUploadModal.value = true;
    };

    const closeUploadModal = () => {
      if (
        selectedImageIndex.value !== null
        && images.value[selectedImageIndex.value].url
      ) {
        images.value[selectedImageIndex.value].url = "" //to do add image url
      }
      selectedImageIndex.value = null;
      showUploadModal.value = false;
    };

    return {
      images,
      showUploadModal,
      selectedImageIndex,
      handleImageClick,
      closeUploadModal
    }
  }
}
</script>

<template>
  <div class="main-modal">
    <h2>Image Gallery</h2>
    <div class="image-container">
      <div v-for="(image, index) in images" :key="index" @click="handleImageClick(index)">
        <button type="button" class="close">
          <span>&times;</span>
        </button>
        <img :src="image.url" v-if="image.url" />
        <div v-else class="upload-placeholder">
          click to upload
        </div>
      </div>
    </div>
  </div>
  <div class="modal" :class="{ 'show': showUploadModal }">
    <div class="modal-header">
      <h5 class="modal-title">Your uploaded images</h5>
      <button type="button" class="close" @click="showUploadModal = false">
        <span>&times;</span>
      </button>
      <UploadImageModal />
    </div>
  </div>
</template>

<style>
.modal.show {
  display: block
}
</style>