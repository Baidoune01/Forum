<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="bg-indigo-600 text-white py-4 fixed top-0 left-0 right-0 z-50 shadow-lg h-20">
      <div class="container mx-auto flex justify-between items-center h-full px-4 md:px-8 lg:px-16">
        <!-- Left: Logo or Brand Name -->
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-semibold hover:text-gray-200">MyForum</router-link>
        </div>

        <!-- Center: Links when logged out -->
        <div v-if="!isLoggedIn" class="flex items-center space-x-10 h-full">
          <router-link
            class="text-white text-lg font-medium hover:text-gray-300 transition duration-300"
            to="/login"
          >
            Login
          </router-link>
          <router-link
            class="text-white text-lg font-medium hover:text-gray-300 transition duration-300"
            to="/register"
          >
            Register
          </router-link>
          <router-link
            class="text-white text-lg font-medium hover:text-gray-300 transition duration-300"
            to="/about"
          >
            About
          </router-link>
        </div>

        <!-- Right: Profile, Notifications, Dots menu when logged in -->
        <div v-else class="flex items-center space-x-10">
          <div class="flex items-center space-x-6">
            <!-- Profile Icon -->
            <router-link to="/profile">
              <img src="https://www.gravatar.com/avatar?d=mp" alt="User avatar" class="w-12 h-12 rounded-full shadow-sm cursor-pointer">
            </router-link>

            <!-- Notifications -->
            <router-link to="/notifications" class="relative">
              <i class="fas fa-bell text-2xl"></i>
              <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-3 w-3 rounded-full"></span>
            </router-link>
          </div>

          <!-- Dots Menu -->
          <div class="relative flex items-center space-x-4">
            <button @click="toggleMenu" ref="menuButton" class="focus:outline-none">
              <i class="fas fa-ellipsis-v text-2xl"></i>
            </button>
            <transition name="fade">
              <div v-if="showMenu" class="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-lg z-50" ref="dropdownMenu">
                <router-link to="/posts" class="block px-4 py-2 hover:bg-gray-100">Home</router-link>
                <router-link to="/profile" class="block px-4 py-2 hover:bg-gray-100">View Profile</router-link>
                <router-link to="/about" class="block px-4 py-2 hover:bg-gray-100">About</router-link>
                <button @click="logout" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </nav>

    <!-- Modal for login/register choice -->
    <div v-if="showModal && !isLoggedIn" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Welcome to the Forum!</h2>
        <p class="text-center text-gray-600 mb-6">Would you like to register, log in, or continue as a guest?</p>
        <div class="flex justify-between">
          <router-link to="/login" @click="handleModalClose" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Login</router-link>
          <router-link to="/register" @click="handleModalClose" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Register</router-link>
          <button @click="continueAsGuest" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Continue as Guest</button>
        </div>
      </div>
    </div>

    <!-- Main Content with dynamic padding to account for navbar height -->
    <div class="flex-grow">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const showMenu = ref(false);
    const menuButton = ref(null);
    const dropdownMenu = ref(null);
    const showModal = ref(false);

    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
    };

    const closeMenu = (event) => {
      if (showMenu.value && dropdownMenu.value && !dropdownMenu.value.contains(event.target) && !menuButton.value.contains(event.target)) {
        showMenu.value = false;
      }
    };

    const logout = async () => {
      await store.dispatch('logout');
      localStorage.removeItem('modalShown'); // Reset modal for guest mode
      localStorage.removeItem('guestMode'); // Reset guest mode
      router.push('/');
      showMenu.value = false;
      showModal.value = true; // Show modal after logout
    };

    const handleModalClose = () => {
      showModal.value = false;
      localStorage.setItem('modalShown', 'true');
    };

    const continueAsGuest = () => {
      showModal.value = false;
      localStorage.setItem('guestMode', 'true'); // Modal reappears for guest on refresh
      router.push('/posts');
    };

    // Check the modal state and user status on mounted
    onMounted(() => {
      // Modal should appear when not logged in and on the home page
      if (!localStorage.getItem('guestMode') && !isLoggedIn.value && route.path === '/') {
        showModal.value = true;
      }

      // Modal should not appear when logged in
      if (isLoggedIn.value) {
        showModal.value = false;
      }
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeMenu);
    });

    return {
      isLoggedIn,
      showMenu,
      toggleMenu,
      logout,
      showModal,
      handleModalClose,
      continueAsGuest,
    };
  },
};
</script>

<style scoped>
/* Ensure navbar height is consistent in both states */
nav {
  height: 80px;
}

.flex-grow {
  flex-grow: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Global overflow handling */
html, body {
  height: 100%;
}

body {
  margin: 0;
  display: flex;
  flex-direction: column;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.flex-grow {
  flex-grow: 1;
}
</style>
