<script lang="ts">
import userServices from "../services/userServices";
import matchService from "../services/matchedServices";
import { calculateAge, notifyError } from "./../utils";
import { UserInfo, MatchingStatus } from "../types";
import socket from "../socket";
import { faL } from "@fortawesome/free-solid-svg-icons";
import ProfileCard from "../components/ProfileCard.vue";

export default {
  name: "Swipping",
  props: {
    recommendedUsersProps: Array<UserInfo>
  },
  components: {
    ProfileCard
  },
  data() {
    return {
      selectedPartner: null as UserInfo | null,
      showModal: false,
      age: 0,
    }
  },
  methods: {
    async likeUser(targetUserID: string) {
      const resp = await matchService.likeUser(targetUserID);
      if (resp.status === 200) {
        const result = resp.data.result;
        if (result === MatchingStatus.matched) {
          //emit match status
          socket.emit("match notify", { targetUserID: targetUserID })
        } else if (result === "liked") {
          console.log("liked")
          socket.emit("liked notify", { targetUserID: targetUserID })
        }
      }
      this.removeUserCard(targetUserID);

    },

    async passUser(targetUserID: string) {
      await matchService.passUser(targetUserID);
      this.removeUserCard(targetUserID)
    },

    removeUserCard(userID: string) {
      this.recommendedUsersProps?.forEach((
        item: UserInfo, index: number, object: UserInfo[]
      ) => {
        if (item.userID === userID) {
          object.splice(index, 1)
        }
      });
    },

    openCard(partner: UserInfo) {
      console.log(partner)
      this.selectedPartner = partner;
      if (partner.birthdate) {
        this.age = calculateAge(new Date(partner.birthdate!));
      }
      this.showModal = true
    },

    closeCard() {
      this.selectedPartner = null;
      this.showModal = false
    },

    getAndParseAge(partner: UserInfo) {
      return calculateAge(new Date(partner.birthdate!)).toString()
    },

    getLocation(partner: UserInfo) {
      if (partner.location) {
        console.log(partner.location)
        const city = partner.location.city ? partner.location.city : "-"
        const country = partner.location.country ? partner.location.country : "-"
        return city + ', ' + country
      } else {
        return "-, -"
      }
    }
  },
}
</script>

<template>
  <div class="container justify-content-center align-items-center d-flex">
    <div class="card-list mt-3">
      <div class="card-sm box-shadow upper-slide-hover" v-for="partner in recommendedUsersProps" :key="partner.userID"
        @click="() => openCard(partner)">
        <img src="/download.jpg" alt="partner img" class="img-fluid">
        <div class="card-body">
          <h5 class="card-title">{{ partner.name }}</h5>
          <p>
            {{ partner.occupation ? partner.occupation : "-" }}<br>
            {{ partner.university ? partner.university : "-" }} <br>
            {{ `age: ${getAndParseAge(partner)}` }} {{ "location: " + getLocation(partner) }}
          </p>
          <div class="button-group">
            <button class="btn btn-danger btn-pass">
              Pass
            </button>
            <button class="btn btn-primary btn-like">
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" :class="{ 'show': showModal }">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Detailed Info</h5>
          <button type="button" class="btn btn-secondary btn-close" @click="closeCard">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <ProfileCard :user-info="selectedPartner!" :age="age" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 1500px;
}

.card-sm {
  flex: 0 0 calc(25% - 20px);
  /*100 1  50 2  30 3  25 4*/
  /* Adjust the width as needed */
}

.upper-slide-hover:hover {
  transform: translateY(-5px);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

.profile-image {
  position: relative;
  height: 600px;
  overflow: hidden;
  cursor: pointer;
}

/*since bootraps modal is not working so this section is needed*/
.modal {
  display: none;
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}

.modal.show {
  display: block;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 0.5rem auto;
  /* Updated: Set left and right margins to auto */
  pointer-events: none;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  outline: 0;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.modal-title {
  margin-bottom: 0;
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #e9ecef;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn-like,
.btn-pass {
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}

.btn-like {
  background-color: #55acee;
  color: #fff;
}

.btn-pass {
  background-color: #ff6861;
  color: #fff;
}

.btn-close {
  background-color: lightgray;
  color: #fff;
}

@media (max-width: 1000px) {


  .card-sm {
    flex: 0 0 calc(50% - 20px);
  }
}

@media (max-width: 500px) {

  .card-sm {
    flex: 0 0 calc(100% - 20px);
  }
}
</style>