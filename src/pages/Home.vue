<template>
  <section class="home-page">
    <div class="home-container">
      <h1 class="home-title">Latest Posts</h1>

      <div v-if="posts.length > 0" class="posts-list">
        <router-link
          v-for="post in posts"
          :key="post.id"
          :to="`/post/${post.id}`"
          class="post-link"
        >
          <PostCard :post="post" />
        </router-link>
      </div>

      <div v-else class="no-posts">
        <p>No posts available yet.</p>
      </div>
    </div>
  </section>
</template>

<script>
import PostCard from '../components/PostCard.vue'
import { supabase } from '../services/supabase'

export default {
  components: {
    PostCard
  },
  data() {
    return {
      posts: []
    }
  },
  async mounted() {
    const { data, error } = await supabase
      .from('JauzaBlog')
      .select('*')
      .eq('type', 'post')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error.message)
    } else {
      this.posts = data
    }
  }
}
</script>

<style>
.home-page {
  padding: 20px;
}

.home-container {
  max-width: 800px;
  margin: 0 auto;
}

.home-title {
  font-size: 32px;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-link {
  text-decoration: none;
}

.no-posts {
  text-align: center;
  color: #7f8c8d;
  margin-top: 50px;
}
</style>
