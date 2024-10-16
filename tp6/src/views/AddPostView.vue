<template>
  <div class="add-post">
    <h2>Add New Post</h2>
    <form @submit.prevent="submitPost">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required />
      </div>

      <div class="form-group">
        <label for="content">Content:</label>
        <textarea id="content" v-model="content" required></textarea>
      </div>

      <button type="submit">Submit Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'AddPostView',
  setup() {
    const title = ref('');
    const content = ref('');
    const store = useStore();
    const router = useRouter();

    const submitPost = async () => {
      if (title.value && content.value) {
        // Dispatch the addPost action to Vuex to add the post
        await store.dispatch('addPost', {
          title: title.value,
          content: content.value
        });

        // Redirect to the posts page after successful submission
        router.push('/posts');
      } else {
        alert('Please fill in both the title and content.');
      }
    };

    return {
      title,
      content,
      submitPost
    };
  }
};
</script>

<style scoped>
.add-post {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

textarea {
  height: 150px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

button:hover {
  background-color: #36a373;
}
</style>
