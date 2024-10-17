<template>
  <div class="add-post-container">
    <h1>Add a New Post</h1>
    <b-form @submit.prevent="submitPost">
      <b-form-group label="Title:" label-for="post-title">
        <b-form-input
          id="post-title"
          v-model="title"
          required
          placeholder="Enter post title"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Content:" label-for="post-content">
        <b-form-textarea
          id="post-content"
          v-model="content"
          required
          placeholder="What's on your mind?"
          rows="4"
        ></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary" :disabled="loading">Submit Post</b-button>
    </b-form>

    <!-- Display error message if any -->
    <div v-if="error" class="alert alert-danger">
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
    authorName: auth.currentUser.email, // or displayName if available
    createdAt: new Date(),
    comments: []
  };

  try {
    // Add post to Firestore's shared "posts" collection
    addDoc(collection(db, "posts"), postData);
    router.push('/posts'); // Redirect to posts page
  } catch (error) {
    console.error("Error adding post:", error);
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

<style scoped>
.add-post-container {
  margin: 20px;
}
</style>
