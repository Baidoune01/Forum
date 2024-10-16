<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterView',
  setup() {
    const store = useStore()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    const register = async () => {
      if (password.value !== confirmPassword.value) {
        alert("Passwords don't match")
        return
      }
      // Perform registration
      await store.dispatch('register', { email: email.value, password: password.value })
      
      // Show welcome message
      alert('Welcome! Your registration was successful.')
      
      // Redirect to the login page
      router.push('/login')
    }

    return {
      email,
      password,
      confirmPassword,
      register
    }
  }
}
</script>

<style scoped>
.register {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
