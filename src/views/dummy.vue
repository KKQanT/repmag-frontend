<template>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card mt-4">
            <div class="card-header">
              <h5 class="card-title">Matched Users</h5>
            </div>
            <div class="card-body">
              <div v-for="userInfo in matchedListProps" :key="userInfo.id" class="user-info" @click="selectUser(userInfo)">
                <div>
                  <div class="user-info-avatar">
                    <img :src="userInfo.avatar" :alt="userInfo.name" class="rounded-circle" />
                  </div>
                  <div class="user-info-details">
                    <div class="user-info-name">{{ userInfo.name }}</div>
                    <div class="user-info-metadata">
                      <span class="badge badge-info">{{ userInfo.age }}</span>
                      <span class="badge badge-primary">{{ userInfo.location }}</span>
                    </div>
                  </div>
                </div>
                <div v-if="userInfo.hasUnreadMessages" class="notification-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        matchedListProps: [
          // Your matched user objects (B, C, D) will go here
          {
            id: 1,
            name: "User B",
            age: 25,
            location: "New York",
            avatar: "/download.jpg",
            hasUnreadMessages: false,
          },
          {
            id: 2,
            name: "User C",
            age: 28,
            location: "London",
            avatar: "/download.jpg",
            hasUnreadMessages: true,
          },
          {
            id: 3,
            name: "User D",
            age: 30,
            location: "Paris",
            avatar: "/download.jpg",
            hasUnreadMessages: false,
          },
        ],
      };
    },
    methods: {
      selectUser(user) {
        // Implement your logic to open the chat room for the selected user
        console.log("Opening chat room for", user.name);
      },
    },
  };
  </script>
  
  <style scoped>
  .user-info {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    justify-content: space-between;
  }
  
  .user-info-avatar {
    position: relative;
    margin-right: 10px;
  }
  
  .user-info-avatar img {
    width: 40px;
    height: 40px;
  }
  
  .notification-dot {
    position: relative;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
  }
  
  .user-info-name {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .user-info-metadata {
    display: flex;
    justify-content: space-between;
  }
  
  .badge {
    margin-right: 5px;
    color: black;
  }
  </style>