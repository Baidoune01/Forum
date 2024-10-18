<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-xl font-semibold mb-4">Welcome to MyForum!</h2>
      <p class="mb-6">Please login, register, or continue as a guest to proceed.</p>
      <div class="flex justify-between">
        <button @click="onLogin" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Login
        </button>
        <button @click="onRegister" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Register
        </button>
        <button @click="onGuest" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Continue as Guest
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onLogin() {
      this.$emit('login');
    },
    onRegister() {
      this.$emit('register');
    },
    onGuest() {
      this.$emit('guest');
    },
  },
};
</script>

