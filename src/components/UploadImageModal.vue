<script lang="ts">
import ImageService from '../services/imageService';
import { Cropper, CropperResult } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { RawUserImageData, ImageUploadImage } from '../types';
import { PropType } from 'vue';
import { AxiosResponse } from 'axios';

export default {
  name: "UploadImageModal",
  components: {
    Cropper
  },
  props: {
    selectedImage: Object as PropType<ImageUploadImage>,
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
      console.log('invokde uplaod')
      const cropper = this.$refs.cropper as typeof Cropper;
      const cropperResult : CropperResult = cropper.getResult();
      const croppedData = cropperResult.canvas?.toDataURL();
      console.log(croppedData)
      const file = this.dataURLtoFile(croppedData!, "test_img.jpeg");
      let resp: AxiosResponse
      if (this.selectedImage?.imageID) {
        resp = await ImageService.updateImage(file, this.selectedImage.imageID);
      } else {
        resp = await ImageService.uploadImage(file);
      }
      if (resp.status == 200) {
        const dataUploaded = resp.data;
        this.$emit('emitCloseUploadModal', (dataUploaded as RawUserImageData))
      } else {
        alert("upload image error")
      }
      this.file = null;
      
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