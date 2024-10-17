<template>
  <div class="register-container">
    <h1>Register</h1>
    <b-form @submit.prevent="registerUser">
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

      <!-- Registration Error (e.g., Firebase errors) -->
      <div v-if="registrationError" class="text-danger">
        {{ registrationError }}
      </div>

      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '@/firebase/init';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import router from '@/router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const emailError = ref('');
    const passwordError = ref('');
    const registrationError = ref('');

    // Helper functions to validate email and password
    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    const validatePassword = (password) => {
      // Ensure password has at least 8 characters, 1 uppercase, 1 number
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordPattern.test(password);
    };

    const registerUser = async () => {
      emailError.value = '';
      passwordError.value = '';
      registrationError.value = '';

      // Validate email and password
      if (!validateEmail(email.value)) {
        emailError.value = 'Please enter a valid email.';
        return;
      }
      if (!validatePassword(password.value)) {
        passwordError.value = 'Password must be at least 8 characters long and contain at least one uppercase letter and one number.';
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log('Registered:', userCredential.user);
        router.push('/posts'); // Redirect to home or posts page
      } catch (error) {
        // Handle Firebase errors
        registrationError.value = error.message;
      }
    };

    return {
      email,
      password,
      emailError,
      passwordError,
      registrationError,
      registerUser
    };
  }
};
</script>

<style scoped>
/* Add some custom styles if needed */
.register-container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
