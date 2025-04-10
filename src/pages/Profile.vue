<template>
  <div class="profile-container" v-if="user">
    <h1>Welcome, {{ user.displayName }}</h1>
    <p>Email: {{ user.email }}</p>
    <button @click="logout" class="logout-button">Logout</button>
  </div>
  <div v-else>
    <h1>Loading...</h1>
  </div>
</template>

<script>
import { auth, logout } from "../services/firebase"; // Import auth and logout from firebase.js

export default {
  data() {
    return {
      user: null
    };
  },
  async mounted() {
    this.user = auth.currentUser;
    if (!this.user) {
      this.$router.push("/login"); // Redirect to login if no user is logged in
    }
  },
  methods: {
    async logout() {
      try {
        await logout();
        this.$router.push("/login"); // Redirect to login page after logout
      } catch (error) {
        console.error("Logout failed:", error.message);
        alert("Logout failed: " + error.message);
      }
    }
  }
};
</script>

<style>
.profile-container {
  text-align: center;
  padding: 50px;
}

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c0392b;
}
</style>
