<template>
  <div class="max-w-2xl mx-auto py-10 px-5 bg-white shadow-md rounded-lg pt-32">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Add a New Post</h1>
    
    <!-- Post Form -->
    <form @submit.prevent="submitPost" class="space-y-6">
      <!-- Title Field -->
      <div>
        <label for="post-title" class="block text-gray-700 font-semibold mb-2">Title:</label>
        <input
          id="post-title"
          v-model="title"
          type="text"
          placeholder="Enter post title"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      
      <!-- Content Field -->
      <div>
        <label for="post-content" class="block text-gray-700 font-semibold mb-2">Content:</label>
        <textarea
          id="post-content"
          v-model="content"
          rows="4"
          placeholder="What's on your mind?"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>
      
      <!-- Submit Button -->
      <div class="text-center">
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
        >
          {{ loading ? 'Submitting...' : 'Submit Post' }}
        </button>
      </div>
    </form>

    <!-- Display error message if any -->
    <div v-if="error" class="mt-4 text-center text-red-500">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db, auth } from '@/firebase/init';
import { collection, addDoc } from 'firebase/firestore';
import router from '@/router';

export default {
  setup() {
    const title = ref('');
    const content = ref('');
    const loading = ref(false);
    const error = ref(null);

    const submitPost = async () => {
      if (!auth.currentUser) {
        alert("You must be logged in to submit a post.");
        return;
      }

      const postData = {
        title: title.value,
        content: content.value,
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.email,
        createdAt: new Date(),
        comments: []
      };

      try {
        loading.value = true;
        // Add post to Firestore's "posts" collection
        await addDoc(collection(db, "posts"), postData);
        router.push('/posts'); // Redirect to posts page
      } catch (err) {
        console.error("Error adding post:", err);
        error.value = "There was an error submitting your post. Please try again.";
      } finally {
        loading.value = false;
      }
    };

    return {
      title,
      content,
      submitPost,
      loading,
      error
    };
  }
};
</script>
