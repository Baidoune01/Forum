<template>
  <div class="login-container">
    <h1>Login</h1>
    <b-form @submit.prevent="loginUser">
      <!-- Email Field with Error Message -->
      <b-form-group label="Email:" label-for="email-input">
        <b-form-input
          id="email-input"
          type="email"
          v-model="email"
          required
          placeholder="Enter email"
          :state="emailError === '' ? null : false"
        />
        <b-form-invalid-feedback v-if="emailError">{{ emailError }}</b-form-invalid-feedback>
      </b-form-group>

      <!-- Password Field with Error Message -->
      <b-form-group label="Password:" label-for="password-input">
        <b-form-input
          id="password-input"
          type="password"
          v-model="password"
          required
          placeholder="Enter password"
          :state="passwordError === '' ? null : false"
        />
        <b-form-invalid-feedback v-if="passwordError">{{ passwordError }}</b-form-invalid-feedback>
      </b-form-group>

      <!-- Login Error (e.g., Firebase errors) -->
      <div v-if="loginError" class="text-danger">
        {{ loginError }}
      </div>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '@/firebase/init';
import { signInWithEmailAndPassword } from 'firebase/auth';
import router from '@/router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const emailError = ref('');
    const passwordError = ref('');
    const loginError = ref('');

    // Helper functions to validate email and password
    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    const loginUser = async () => {
      emailError.value = '';
      passwordError.value = '';
      loginError.value = '';

      // Validate email format
      if (!validateEmail(email.value)) {
        emailError.value = 'Please enter a valid email.';
        return;
      }
      if (password.value === '') {
        passwordError.value = 'Please enter your password.';
        return;
      }

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log('Logged in:', userCredential.user);
        router.push('/posts'); // Redirect to home or posts page
      } catch (error) {
        // Handle Firebase-specific errors (e.g., incorrect password)
        loginError.value = error.message;
      }
    };

    return {
      email,
      password,
      emailError,
      passwordError,
      loginError,
      loginUser
    };
  }
};
</script>

<style scoped>
/* Add some custom styles if needed */
.login-container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
