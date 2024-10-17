import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PostsView from '../views/PostsView.vue';
import AddPostView from '../views/AddPostView.vue';
import ProfileView from '../views/ProfileView.vue';

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/add-post', // Add the route for adding posts
        name: 'addPost',
        component: AddPostView
    },
    {
        path: '/posts',
        component: PostsView
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileView, // User profile page
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;