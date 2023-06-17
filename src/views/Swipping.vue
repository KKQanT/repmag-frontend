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
      <div class="card-md box-shadow upper-slide-hover" v-for="partner in recommendedUsersProps" :key="partner.userID"
        @click="() => openCard(partner)">
        <div class="profile-image">
          <img src="/download.jpg" alt="partner img">
        </div>
        <div class="card-body mt-3">
          <h5 class="card-title">{{ partner.name }}</h5>
          <p>
            {{ partner.occupation ? partner.occupation : "-" }}<br>
            {{ partner.university ? partner.university : "-" }} <br>
            {{ `age: ${getAndParseAge(partner)}` }} <br>
            {{ "location: " + getLocation(partner) }}
          </p>
          <div class="button-group">
            <button class="btn btn-danger btn-pass">
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
      </div>
    </div>
  </div>
  <div class="modal" :class="{ 'show': showModal }">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-body">
          <ProfileCard :user-info="selectedPartner!" :age="age" @emitClose="(_value) => showModal = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*since bootraps modal is not working so this section is needed*/

.modal.show {
  display: block;
}


.profile-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 1000px;
}


.card-md {
  flex: 0 0 calc(25% - 20px);
  /*100 1  50 2  30 3  25 4*/
  /* Adjust the width as needed */

}

.upper-slide-hover:hover {
  transform: translateY(-5px);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}


.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn-like,
.btn-pass {
  font-weight: bold;
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

@media (max-width: 1000px) {


  .card-md {
    flex: 0 0 calc(50% - 20px);
  }
}

@media (max-width: 500px) {

  .card-md {
    flex: 0 0 calc(100% - 20px);
  }
}
</style>