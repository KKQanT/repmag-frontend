<script lang="ts">
export default {
    name: "Loading",
}
</script>

<template>
    <div class="loading-container">
      <div class="spinner-border text-primary" role="status"></div>
      <div class="heart-icon">
        <svg width="10em" height="10em" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
          <path d="M8 14.7l-.7-.7C3.4 10.8.6 8.4.6 5.5c0-2.4 2-4.4 4.4-4.4 1.5 0 2.9.7 3.6 1.9h.8c.7-1.2 2.1-1.9 3.6-1.9 2.4 0 4.4 2 4.4 4.4 0 2.9-2.8 5.3-6.7 8.5L8 14.7z" />
        </svg>
      </div>
    </div>
  </template>
  
  <style scoped>
  .loading-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .spinner-border {
    width: 10rem;
    height: 10rem;
    border-width: 0.2rem;
    position: absolute;
    animation: spin 2s linear infinite;
    border-top-color: black;
    border-left-color: black;
    border-bottom-color: black;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .heart-icon {
    position: relative;
    width: 5rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: heartbeat 1s ease-in-out infinite;
  }
  
  .heart-icon svg {
    fill: "#007bff";
  }
  
  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  </style>