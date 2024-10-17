<template>
  <div class="login-container">
    <h1>Login</h1>
    <b-form @submit.prevent="loginUser">
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

    const loginUser = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log('Logged in:', userCredential.user);
        router.push('/posts'); // Redirect to home or posts page
      } catch (error) {
        console.error('Login error:', error.message);
      }
    };

    return {
      email,
      password,
      loginUser
    };
  }
};
</script>
