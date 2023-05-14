<script lang="ts">
import { OtherUser } from '../types';

export default {
  name: "MatchedList",
  props: {
    mathcedListProps: Array<OtherUser>
  },

  methods: {
    selectUser(userInfo: OtherUser) {
      this.$emit("emittedSelectedUserToChat", userInfo)
    }
  }
}

</script>

<template>
  <!--<div v-for="userInfo in mathcedListProps">
        <div @click="() => selectUser(userInfo)">{{ userInfo.name }}</div>
    </div>-->
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card mt-4">
          <div class="card-header text-center">
            <h5 class="card-title aligns">Matched</h5>
          </div>
          <div class="card-body">
            <div class="row border-bottom border-secondary padding-bottom mb-3" v-for="userInfo in mathcedListProps" :key="userInfo.userID"
              @click="selectUser(userInfo)">
              <div class="col-md-10 row bg">
                <div class="col-md-2 user-info-avartar bg">
                  <img src="/download.jpg" alt="user image" class="rounded-circle">
                </div>
                <div class="col-md-8 d-flex flex-column bg p-2">
                  <div class="mb-auto">
                    {{ userInfo.name }}
                  </div>
                  <div>
                    {{ "this is template message" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-info {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  justify-content: space-between;
}

.user-info-avartar {
  position: relative;
}

.user-info-avartar img {
  width: 60px;
  height: 60px;
}

.user-name-message {
  justify-content: space-between;
}

.padding-bottom {
  padding-bottom: 15px;
}
</style>
  
  
  
  
  
  
  