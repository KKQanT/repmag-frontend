<template>
  <div class="profile-edit">
    <!--div class="profile-edit-left bg-info">
      <div class="profile-image" @click="openImageGallery">
        <img :src="profileImage" alt="Profile Image">
        <div class="image-overlay">
          <span>Click to View Images</span>
        </div>
      </div>
      <div class="image-gallery" v-if="showImageGallery">
        <div class="gallery-item" v-for="(image, index) in userImages" :key="index">
          <img :src="image" alt="User Image">
        </div>
        <div class="gallery-item" v-for="index in remainingImages" :key="index" @click="openImageUpload">
          <div class="upload-icon">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </div>
      <div class="image-upload" v-if="showImageUpload">
        <input type="file" accept="image/*" @change="handleUserImagesChange">
        <div class="upload-instructions">
          <span>Click to Upload Image</span>
        </div>
      </div>
    </div-->
    <div class="profile-edit-left">
      <div class="card">
        <div class="card-body">
          <div class="card-img-top mb-3" @click="openImageGallery">
            <img :src="'/download.jpg'" alt="Profile Image">
            <div class="image-overlay">
              <span>Click to View Images</span>
            </div>
          </div>
          <h4 class="card-title">{{ "User 1" }}</h4>
          <h7 class="card-title">{{ "Software Developer" }}, {{ "SMC" }}</h7>
          <br>
          <h7 class="card-title">{{ "Chulalongkorn University" }}</h7>
          <br>
          <h9 class="card-title">{{ "age: 26" }}, {{ "Bangkok" }}, {{ "Thailand" }}</h9>
          <p class="card-text mt-3">Some quick example text to build on the card title and make up the bulk of the card's
            content.</p>
          <h9 class="card-title">interested in:</h9>
          <ul class="interested-in">
            <li>Lorem</li>
            <li>Praesent</li>
            <li>Nulla</li>
            <li>Curabitur</li>
            <li>Etiam</li>
            <li>Donec</li>
          </ul>
          <div></div>
        </div>
      </div>
    </div>
    <div class="profile-edit-right">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Edit Profile</h5>
          <form>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="name" class="form-control">
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="gender">Gender</label>
                <select id="gender" v-model="gender" class="form-control">
                  <option value="" disabled selected>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="age">Age</label>
                <input type="number" id="age" v-model="age" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label for="university">University</label>
              <input type="text" id="university" v-model="university" class="form-control">
            </div>
            <div class="form-group">
              <label for="occupation">Occupation</label>
              <input type="text" id="occupation" v-model="occupation" class="form-control">
            </div>
            <div class="form-group">
              <label for="bio">Bio</label>
              <textarea id="bio" v-model="bio" class="form-control"></textarea>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="city">City</label>
                <input type="text" id="city" v-model="location.city" class="form-control">
              </div>
              <div class="form-group col-md-6">
                <label for="country">Country</label>
                <input type="text" id="country" v-model="location.country" class="form-control">
              </div>
            </div>
          </form>
        </div>
        <div class="card-footer text-right">
          <button class="btn btn-primary" @click="saveProfile">Save</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      inputProfile: true,
      name: null,
      gender: null,
      university: null,
      age: null,
      occupation: null,
      userImages: [],
      bio: null,
      location: {
        city: null,
        country: null
      },
      preferences: null,
      preferGender: null,
      minPreferAge: null,
      maxPreferAge: null,
      preferUniversities: [],
      preferOccupations: [],
      showImageGallery: false,
      showImageUpload: false
    };
  },
  computed: {
    profileImage() {
      return this.userImages.length > 0 ? this.userImages[0] : 'placeholder.png';
    },
    remainingImages() {
      return Math.max(0, 5 - this.userImages.length);
    }
  },
  methods: {
    openImageGallery() {
      this.showImageGallery = true;
    },
    openImageUpload() {
      this.showImageGallery = false;
      this.showImageUpload = true;
    },
    handleUserImagesChange(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.userImages.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
      this.showImageUpload = false;
    },
    toggleInputProfile() {
      this.inputProfile = !this.inputProfile;
    },
    saveProfile() {
      // Handle saving profile logic
      // Access the updated values in this.name, this.gender, this.university, this.age, this.occupation,
      // this.userImages, this.bio, this.location, this.preferences, this.preferGender, this.minPreferAge,
      // this.maxPreferAge, this.preferUniversities, this.preferOccupations
    }
  }
};
</script>

<style scoped>
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
}

.profile-edit-right {
  flex: 1;
}

.profile-image {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.profile-image img {
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
</style>