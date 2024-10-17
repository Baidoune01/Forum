import { createStore } from 'vuex';
import { auth, db } from '@/firebase/init';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default createStore({
    state: {
        user: null,
        posts: []
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_POSTS(state, posts) {
            state.posts = posts;
        },
        ADD_POST(state, post) {
            state.posts.unshift(post); // Add new post to the beginning of the array
        },
    },
    actions: {
        async fetchUser({ commit }) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    commit('SET_USER', user); // Set user in Vuex store
                } else {
                    commit('SET_USER', null); // Clear user from Vuex store when logged out
                }
            });
        },

        // Login action
        async login({ commit }, { email, password }) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                commit('SET_USER', userCredential.user);
            } catch (error) {
                console.error("Login Error:", error);
                throw error;
            }
        },

        // Register action
        async register({ commit }, { email, password }) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                commit('SET_USER', userCredential.user);
            } catch (error) {
                console.error("Registration Error:", error);
                throw error;
            }
        },

        // Logout action
        async logout({ commit }) {
            try {
                await signOut(auth);
                commit('SET_USER', null);
            } catch (error) {
                console.error("Logout Error:", error);
                throw error;
            }
        },
        async fetchPosts({ commit }) {
            try {
                const postsRef = collection(db, 'posts');
                const q = query(postsRef, orderBy('createdAt', 'desc')); // Order by creation time, newest first
                const querySnapshot = await getDocs(q);

                const posts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                commit('SET_POSTS', posts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        },

        // Add a post to Firestore and Vuex
        async addPost({ commit, state }, post) {
            try {
                const newPost = {
                    ...post,
                    userId: state.user.uid,
                    createdAt: new Date().toISOString(),
                    comments: []
                };

                const docRef = await addDoc(collection(db, 'posts'), newPost);
                newPost.id = docRef.id;

                commit('ADD_POST', newPost);
            } catch (error) {
                console.error("Error adding post:", error);
            }
        }
    },
    getters: {
        isLoggedIn: (state) => !!state.user,
        posts: (state) => state.posts
    }
});