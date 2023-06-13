<script lang="ts">
import { PropType } from 'vue';
import ImageService from '../services/imageService';
import UploadImageModal from './UploadImageModal.vue';
import { ImageUploadImage, RawUserImageData, UploadImageType } from "../types";

export default {
  name: "UserImagesPanel",
  components: {
    UploadImageModal
  },
  props: {
    userImages: {
      type: Array as PropType<ImageUploadImage[]>,
      required: true
    }
  },
  data() {
    return {
      images: this.userImages,
      showUploadModal: false,
      selectedImage: null as null | ImageUploadImage,
      uploadType: UploadImageType.add as UploadImageType
    };
  },
  methods: {
    handleImageClick(image: ImageUploadImage) {
      this.selectedImage = image;
      if (image.url) {
        this.uploadType = UploadImageType.add
      } else {
        this.uploadType = UploadImageType.update
      }
      console.log('this.selectedImage');
      console.log(this.selectedImage);
      this.showUploadModal = true;
      console.log('images array');
      console.log(this.images);
    },
    closeAndAddImage(dataUploaded: RawUserImageData) {
      if (this.selectedImage?.imageID) {
        this.$emit('emitRefreshImage', {dataUploaded: dataUploaded, type: "update"});
      } else {
        this.$emit('emitRefreshImage', {dataUploaded: dataUploaded, type: "add"});
      }
      this.selectedImage = null;
      this.showUploadModal = false;
    },
    async deleteImage(imageID) {
      await ImageService.deleteImage(imageID);
      this.$emit('emitDeleteImage', imageID);
      this.selectedImage = null;
      this.showUploadModal = false;
    }
  }
};
</script>

<template>
  <div class="main-modal">
    <h2>Image Gallery</h2>
    <div class="image-container">
      <div v-for="(image, index) in images" :key="index" class="image-item">
        <button type="button" class="close" v-if="image.url != null" @click="deleteImage(image.imageID!)">
          <span>&times;</span>
        </button>
        <div class="image-wrapper" @click="handleImageClick(image)">
          <img :src="image.url" v-if="image.url" />
          <div v-else class="upload-placeholder">
            <img :src="'Placeholder_view_vector.png'"/>
          </div>
          <div class="image-overlay">
            <img class="upload-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABW0lEQVR4nO2VX0rDQBCH81JfFF988wgWqS/WCoI38Gb963H64h1sL2C9gFUwYuGT0V9gDdsk3W41hfxgIZvMZL7JzGSTpFGjOok/Uv0Bkh1p/wCI/Mn3FyAJVANADUpwAtz8G0BewC3wsFMAoA0MgRnwpjXTvXaZczAAcADcAyvWy55NzDYqAD/BpzJ/B0ZAFzjUugLGQCqbqReCcADL3PQEnBfYdYCFbCdRAFTzlTL/FdznL4hUPmeVANboTjbWXKZhWULOfesD02AbgFPZzLW/3ADAesL0WMmhSMCr3I4qQH+/22y1XcYAWAYAHGv74gWoIscnK0HXA+dNCOgVlqCKHJ+sCccbAGRj20+2lTOGNlqdMgDgAvjwjmGonLFa5CE8wZ9lOwoO6Hlxy/kVpwLqqdttXeuzW+bIthUNQBB2HljgosPoU+dE3OA5EOuJgXW4/hG27Lrvq/kXy6SVhuwJjUkAAAAASUVORK5CYII=">
          </div>
        </div>
      </div>
    </div>
  </div>
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
        <UploadImageModal
        :selectedImage="selectedImage"
        @emitCloseUploadModal = "(value: RawUserImageData) => closeAndAddImage(value)" />
      </div>
    </div>
  </div>
</div>
</template>

<style>

.upload-icon {
  max-width: 20%;
}

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

.image-item img {
  width: 100%;
  height: auto;
  display: block;
}

.upload-placeholder {
  position: relative;
  background-color: lightgray;
}

.upload-placeholder:hover {
  cursor: pointer;
}

</style>