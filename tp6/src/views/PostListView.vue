<template>
  <div class="post-list">
    <h2>Forum Posts</h2>

    <!-- Button to add a new post -->
    <button class="add-post-btn" @click="addPost">Want to post something?</button>

    <!-- Display posts fetched from Vuex -->
    <template v-if="posts.length">
      <div v-for="post in posts" :key="post.id" class="post">
        <div class="post-content">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
        </div>
      </div>
    </template>

    <!-- If there are no posts -->
    <div v-else>
      <p>No posts yet. Be the first to post something!</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'PostListView',
  setup() {
    const store = useStore();
    const router = useRouter();

    // Get posts from Vuex store
    const posts = computed(() => store.getters.posts);

    // Fetch posts when component is mounted
    onMounted(() => {
      store.dispatch('fetchPosts');
    });

    // Redirect to the add post page
    const addPost = () => {
      router.push('/add-post');
    };

    return {
      posts,
      addPost
    };
  }
};
</script>

<style scoped>
.post-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.add-post-btn {
  display: block;
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.post {
  background: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-content {
  margin-bottom: 15px;
}
</style>
