<template>
  <div class="register-container">
    <h1>Register</h1>
    <b-form @submit.prevent="registerUser">
      <b-form-group label="Email:" label-for="email-input">
        <b-form-input
          id="email-input"
          type="email"
          v-model="email"
          required
          placeholder="Enter email"
        />
      </b-form-group>
      <b-form-group label="Password:" label-for="password-input">
        <b-form-input
          id="password-input"
          type="password"
          v-model="password"
          required
          placeholder="Enter password"
        />
      </b-form-group>
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

    const registerUser = async () => {
      try {
        const userCredential = createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log('Registered:', userCredential.user);
        router.push('/posts'); // Redirect to home or posts page
      } catch (error) {
        console.error('Registration error:', error.message);
      }
    };

    return {
      email,
      password,
      registerUser
    };
  }
};
</script>
