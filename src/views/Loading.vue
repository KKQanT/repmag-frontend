<script lang="ts">
export default {
  name: "Loading",
}
</script>

<template>
  <div class="loading-container">
    <div class="spinner-border text-primary" role="status"></div>
    <div class="heart-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-heart-fill"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
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
}</style>