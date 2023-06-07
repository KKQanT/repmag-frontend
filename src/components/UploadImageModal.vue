<script lang="ts">
import ImageService from '../services/imageService';
import { Cropper, CropperResult } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
  name: "UploadImageModal",
  components: {
    Cropper
  },
  data() {
    return {
      file: null as File | null,
      imageSrc: "",
      cropCanvas: null as HTMLCanvasElement|null
    };
  },
  methods: {
    handleFileSelect(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        this.file = input.files[0];
        this.loadImage();
      }
    },
    loadImage() {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageSrc = e.target?.result as string;
      };
      reader.readAsDataURL(this.file as Blob);
    },
    async uploadImage() {
      //if (this.file) {
      //  await ImageService.uploadImage(this.file);
      //  this.file = null;
      //  // invoke close modal
      //}
      console.log('invokde uplaod')
      const cropper = this.$refs.cropper as typeof Cropper;
      const cropperResult : CropperResult = cropper.getResult();
      const croppedData = cropperResult.canvas?.toDataURL();
      console.log(croppedData)
      const file = await this.dataURLtoFile(croppedData!, "test_img.jpeg");
      await ImageService.uploadImage(file);
      
    },
    dataURLtoFile(dataURL: string, filename: string): File {
      const arr = dataURL.split(",");
      const mime = arr[0].match(/:(.*?);/)![1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
  }
};
</script>

<template>
  <div class="upload-modal">
    <h2>Upload Image</h2>
    <input type="file" @change="handleFileSelect" />
    <div v-if="file">
      <cropper
        ref="cropper"
        :src="imageSrc"
      />
    </div>
    <button @click="uploadImage">Upload</button>
  </div>
</template>