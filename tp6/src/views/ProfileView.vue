<template>
  <div class="max-w-4xl mx-auto py-10 px-5">
    <h1 class="text-4xl font-bold text-gray-800 mb-10 text-center">Community Forum</h1>

    <!-- Button to add a post (only if logged in) -->
    <div v-if="auth.currentUser" class="text-center mb-6">
      <b-button @click="goToAddPost" variant="primary" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Want to post something?</b-button>
    </div>

    <!-- Loop through posts -->
    <div v-if="posts.length">
      <div v-for="post in posts" :key="post.id" class="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
        <h3 class="text-xl font-semibold text-gray-800">{{ post.title }}</h3>
        <p class="text-gray-600 mt-2 mb-4">{{ post.content }}</p>

        <!-- Display author of the post -->
        <div class="flex items-center space-x-2 mb-4">
          <span class="text-gray-500">Posted by:</span>
          <b class="text-gray-700">{{ post.authorName }}</b>
        </div>

        <!-- Edit Post button (only for post author) -->
        <div v-if="auth.currentUser?.uid === post.authorId" class="mb-4">
          <b-button
            size="sm"
            @click="editPost(post.id)"
            class="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded"
          >Edit Post</b-button>
        </div>

        <!-- Display comments -->
        <div v-if="post.comments && post.comments.length" class="space-y-4">
          <h4 class="font-semibold text-lg text-gray-800">Comments</h4>
          <div v-for="comment in post.comments" :key="comment.id" class="bg-gray-100 p-4 rounded-lg">
            <p class="text-gray-700">{{ comment.text }}</p>
            <p class="text-sm text-gray-500 mt-1">- {{ comment.authorName }}</p>
          </div>
        </div>

        <!-- Comment section (each post has its own comment input) -->
        <div v-if="auth.currentUser" class="mt-6">
          <h4 class="font-semibold text-gray-800">Add a Comment</h4>
          <b-form @submit.prevent="addComment(post.id)" class="mt-4 space-y-3">
            <b-form-input
              v-model="commentTexts[post.id]"
              placeholder="Write your comment here..."
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></b-form-input>
            <b-button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Comment</b-button>
          </b-form>
        </div>
        <div v-else class="text-gray-500 mt-4">
          <p class="text-sm">Please log in to comment.</p>
        </div>
      </div>
    </div>

    <!-- Message if no posts are available -->
    <div v-else class="text-center text-gray-500">
      <p>Be the first to post something...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db, auth } from '@/firebase/init'; 
import { collection, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore'; 
import { useRouter } from 'vue-router'; // Import useRouter for navigation

export default {
  setup() {
    const router = useRouter(); // Initialize the router instance
    const posts = ref([]);
    const commentTexts = ref({}); // Object to store comment text per post ID

    // Fetch posts and ensure comments array is initialized
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        posts.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          comments: doc.data().comments || [], 
        }));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const addComment = async (postId) => {
      if (!auth.currentUser) {
        alert('You must be logged in to comment.');
        return;
      }

      const commentData = {
        text: commentTexts.value[postId], 
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.email,
        createdAt: new Date(),
      };

      try {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
          comments: arrayUnion(commentData),
        });

        await fetchPosts();
        commentTexts.value[postId] = '';
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };

    const goToAddPost = () => {
      router.push('/add-post'); // Navigate to the add post page
    };

    onMounted(fetchPosts);

    return {
      posts,
      commentTexts, 
      addComment,
      goToAddPost, // Add function to return
      auth,
    };
  },
};
</script>
