<template>
    <section class="profile-page">
      <div class="profile-container">
        <h1>User Profile</h1>
  
        <div v-if="user" class="profile-info">
          <p><strong>Name:</strong> {{ user.displayName }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <button @click="logout" class="logout-button">Logout</button>
        </div>
  
        <div v-else class="loading">
          Loading user info...
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { auth, signOut } from '../services/firebase'
  
  export default {
    data() {
      return {
        user: null
      }
    },
    async mounted() {
      this.user = auth.currentUser
      if (!this.user) {
        this.$router.push('/login') // Redirect to login if user is not logged in
      }
    },
    methods: {
      async logout() {
        try {
          await signOut(auth)
          this.$router.push('/login') // Redirect to login after logout
        } catch (error) {
          console.error('Error logging out:', error.message)
          alert('Logout failed: ' + error.message)
        }
      }
    }
  }
  </script>
  
  <style>
  .profile-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    min-height: 80vh;
  }
  
  .profile-container {
    max-width: 600px;
    width: 100%;
    text-align: center;
  }
  
  .profile-info p {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .logout-button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
  }
  
  .logout-button:hover {
    background-color: #c0392b;
  }
  
  .loading {
    font-size: 18px;
    color: #7f8c8d;
  }
  </style>
  