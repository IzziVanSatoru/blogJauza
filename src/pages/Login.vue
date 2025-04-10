<template>
  <section class="login-page">
    <div class="login-container">
      <h1>Login</h1>
      <button @click="loginWithGoogle" class="login-button">
        Login with Google
      </button>
    </div>
  </section>
</template>

<script>
import { auth, provider, signInWithPopup } from '../services/firebase'

export default {
  methods: {
    async loginWithGoogle() {
      try {
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        console.log('User Info:', user)
        alert('Login Success, Welcome ' + user.displayName)
      } catch (error) {
        console.error('Login Error:', error.message)
        alert('Failed to login: ' + error.message)
      }
    }
  }
}
</script>

<style>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.login-container {
  text-align: center;
  border: 1px solid #dcdcdc;
  padding: 30px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.login-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4285F4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #357ae8;
}
</style>
