<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="bg-white shadow-lg py-4 fixed top-0 left-0 right-0 z-50">
      <div class="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-16">
        <!-- Forum Title on the left side -->
        <router-link class="text-2xl font-extrabold text-indigo-600 tracking-wide hover:text-indigo-800 transition duration-300" to="/">
          Forum Communautaire
        </router-link>

        <!-- Navigation Links on the right side -->
        <div class="flex items-center space-x-6">
          <!-- Show Login/Register if not logged in -->
          <router-link
            v-if="!isLoggedIn"
            class="text-gray-600 font-medium hover:text-indigo-600 transition duration-300"
            to="/login"
          >
            Login
          </router-link>
          <router-link
            v-if="!isLoggedIn"
            class="text-gray-600 font-medium hover:text-indigo-600 transition duration-300"
            to="/register"
          >
            Register
          </router-link>

          <!-- Show Profile Dropdown if logged in -->
          <div v-if="isLoggedIn" class="relative">
            <!-- User Icon Button -->
            <button class="flex items-center text-gray-600 hover:text-indigo-600 transition duration-300" @click="toggleProfileMenu">
              <img
                src="https://www.gravatar.com/avatar?d=mp"
                alt="User avatar"
                class="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
              >
              <!-- Add a downward arrow for the profile dropdown -->
              <svg
                v-if="!showProfileMenu"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5 ml-2 text-gray-500"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
              <svg
                v-if="showProfileMenu"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-5 h-5 ml-2 text-gray-500"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="showProfileMenu"
              class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
            >
              <button
                class="block w-full text-left px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 transition duration-200"
                @click="viewProfile"
              >
                View Profile
              </button>
              <button
                class="block w-full text-left px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 transition duration-200"
                @click="logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Modal for login/register choice -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Welcome to the Forum!</h2>
        <p class="text-center text-gray-600 mb-6">Would you like to register, log in, or continue as a guest?</p>
        <div class="flex justify-between">
          <router-link to="/login" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Login</router-link>
          <router-link to="/register" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Register</router-link>
          <button @click="continueAsGuest" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Continue as Guest</button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="pt-24">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const showProfileMenu = ref(false);
    const showModal = ref(true); // Modal visibility state

    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    const toggleProfileMenu = () => {
      showProfileMenu.value = !showProfileMenu.value;
    };

    const viewProfile = () => {
      router.push('/profile');
      showProfileMenu.value = false;
    };

    const logout = async () => {
      await store.dispatch('logout');
      router.push('/');
      showProfileMenu.value = false;
    };

    const continueAsGuest = () => {
      showModal.value = false; // Close the modal and proceed to posts
      router.push('/posts');
    };

    return {
      isLoggedIn,
      showProfileMenu,
      toggleProfileMenu,
      viewProfile,
      logout,
      showModal,
      continueAsGuest,
    };
  },
};
</script>

<style scoped>
/* Custom styling for the modal */
.dropdown-menu {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 12rem;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  color: #555;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f7f7f7;
}

.dropdown-menu.show {
  display: block;
}
</style>
