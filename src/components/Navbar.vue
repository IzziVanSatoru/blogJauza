<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">JauzaBlog</router-link>

      <div class="navbar-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/create" class="nav-link">Create Post</router-link>
        <!-- Tampilkan Login hanya jika user belum login -->
        <router-link v-if="!user" to="/login" class="nav-link">Login</router-link>
        <!-- Tampilkan Profile dan Logout jika user sudah login -->
        <router-link v-if="user" to="/profile" class="nav-link">Profile</router-link>
        <button v-if="user" @click="logout" class="logout-button">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from "../services/firebase"; // Import auth dari firebase.js
import { logout } from "../services/firebase"; // Import logout dari firebase.js

export default {
  data() {
    return {
      user: null
    };
  },
  async mounted() {
    // Memantau status login user secara real-time
    auth.onAuthStateChanged((user) => {
      this.user = user; // Menyimpan informasi user setelah login
    });
  },
  methods: {
    logout() {
      logout(); // Panggil fungsi logout yang sudah didefinisikan di firebase.js
    }
  }
};
</script>

<style>
/* Styling untuk navbar */
.navbar {
  width: 100%;
  background-color: #34495e;
  padding: 15px 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-brand {
  color: #ecf0f1;
  font-size: 28px;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar-brand:hover {
  color: #f39c12;
}

.navbar-links {
  display: flex;
  gap: 25px;
}

.nav-link {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s, transform 0.3s;
}

.nav-link:hover {
  color: #ffffff;
  transform: scale(1.05);
}

.logout-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.logout-button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

@media (max-width: 1024px) {
  .navbar-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-links {
    flex-direction: column;
    margin-top: 10px;
    width: 100%;
  }

  .nav-link {
    padding: 8px 0;
  }
}
</style>
