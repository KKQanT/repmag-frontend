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
      <div v-for="(image, index) in images" :key="index" class="image-item" @click="handleImageClick(index)">
        <button type="button" class="close">
          <span>&times;</span>
        </button>
        <div class="image-wrapper">
          <img :src="image.url" v-if="image.url" />
          <div v-else class="upload-placeholder">
            click to upload
          </div>
          <div class="image-overlay"></div>
        </div>
      </div>
    </div>
  </div>
  <!--div class="modal" :class="{ 'show': showUploadModal }">
    <div class="card-md">
      <div class="card-header">
        <h5 class="card-title">Your uploaded images</h5>
        <button type="button" class="close" @click="showUploadModal = false">
          <span>&times;</span>
        </button>
        <div class="card-content">
          <UploadImageModal />
        </div>
      </div>
    </div>
  </div-->
  <div class="modal" tabindex="-1" role="dialog" :class="{ 'show': showUploadModal }">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showUploadModal = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <UploadImageModal />
      </div>
    </div>
  </div>
</div>
</template>

<style>
.modal.show {
  display: block;
}

.image-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.image-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-item:hover .image-overlay {
  opacity: 1;
}

.upload-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f5f5f5;
  color: #888;
  font-size: 14px;
}

.upload-placeholder:hover {
  cursor: pointer;
}

.image-item img {
  width: 100%;
  height: auto;
  display: block;
}
</style>