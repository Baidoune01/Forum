<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">Register</h1>

      <!-- Registration Form -->
      <form @submit.prevent="registerUser" class="space-y-4">
        <!-- Email Field with Error Message -->
        <div>
          <label for="email-input" class="block text-gray-700 font-semibold mb-2">Email:</label>
          <input
            id="email-input"
            type="email"
            v-model="email"
            placeholder="Enter email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
        </div>

        <!-- Password Field with Error Message -->
        <div>
          <label for="password-input" class="block text-gray-700 font-semibold mb-2">Password:</label>
          <input
            id="password-input"
            type="password"
            v-model="password"
            placeholder="Enter password"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
        </div>

        <!-- Registration Error -->
        <div v-if="registrationError" class="text-red-500 text-sm text-center">
          {{ registrationError }}
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
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

    const validateEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    const validatePassword = (password) => {
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordPattern.test(password);
    };

    const registerUser = async () => {
      emailError.value = '';
      passwordError.value = '';
      registrationError.value = '';

      if (!validateEmail(email.value)) {
        emailError.value = 'Please enter a valid email.';
        return;
      }
      if (!validatePassword(password.value)) {
        passwordError.value = 'Password must be at least 8 characters long and contain at least one uppercase letter and one number.';
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        router.push('/posts');
      } catch (error) {
        registrationError.value = error.message;
      }
    };

    return {
      email,
      password,
      emailError,
      passwordError,
      registrationError,
      registerUser,
    };
  },
};
</script>
