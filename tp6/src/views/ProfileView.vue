<template>
  <div class="max-w-4xl mx-auto py-10 px-5">
    <h1 class="text-4xl font-bold text-gray-800 mb-10 text-center">Your Profile</h1>

    <!-- User Info -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 text-center">
      <!-- Profile Picture Placeholder -->
      <div class="mb-4">
        <img
          :src="profilePicture"
          alt="Profile Picture"
          class="w-32 h-32 rounded-full mx-auto"
        />
      </div>

      <!-- User Email -->
      <p class="text-xl font-semibold text-gray-800">{{ auth.currentUser.email }}</p>

      <!-- Placeholder for Name (or any other details you want to display) -->
      <p class="text-gray-600 mt-2">Name: {{ userName || 'Not available' }}</p>

      <!-- Logout Button -->
      <button
        @click="logout"
        class="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '@/firebase/init'; 
import { signOut } from 'firebase/auth';
import router from '@/router';

export default {
  setup() {
    const userName = ref(''); // Placeholder for name (you can fetch or set this dynamically if needed)

    // Placeholder for profile picture (use a default image for now)
    const profilePicture = ref(
      'https://www.gravatar.com/avatar?d=mp' // Gravatar placeholder or any default image
    );

    // Logout function
    const logout = async () => {
      try {
        await signOut(auth);
        router.push('/login'); // Redirect to login page after logging out
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    return {
      userName,
      profilePicture,
      logout,
      auth,
    };
  },
};
</script>

