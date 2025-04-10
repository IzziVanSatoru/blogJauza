<template>
  <div class="login-container">
    <h1>Login</h1>
    <button @click="loginWithGoogle" class="login-button">
      Login with Google
    </button>
  </div>
</template>

<script>
import { loginWithGoogle } from "../services/firebase"; // Import login function

export default {
  methods: {
    async loginWithGoogle() {
      try {
        const result = await loginWithGoogle();
        const user = result.user;
        console.log("User logged in:", user);
        this.$router.push("/profile"); // Redirect ke profile setelah login
      } catch (error) {
        console.error("Login failed:", error.message);
        alert("Login failed: " + error.message); // Menampilkan error di UI untuk debugging
      }
    }
  }
};
</script>

<style>
.login-container {
  text-align: center;
  padding: 50px;
}

.login-button {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #357ae8;
}
</style>
