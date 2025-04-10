<template>
  <section class="post-detail">
    <div v-if="post" class="post-container">
      <PostCard :post="post" />
      <button @click="deletePost" class="delete-button">Delete Post</button>
      <CommentSection :postId="post.id" />
    </div>

    <div v-else class="loading">
      Loading Post...
    </div>
  </section>
</template>

<script>
import PostCard from '../components/PostCard.vue'
import CommentSection from '../components/CommentSection.vue'
import { supabase } from '../services/supabase'

export default {
  components: {
    PostCard,
    CommentSection
  },
  data() {
    return {
      post: null
    }
  },
  async mounted() {
    const { data, error } = await supabase
      .from('JauzaBlog')
      .select('*')
      .eq('id', this.$route.params.id)
      .eq('type', 'post')
      .single()

    if (error) {
      console.error('Error fetching post:', error.message)
      alert('Failed to load post: ' + error.message)
    } else {
      this.post = data
    }
  },
  methods: {
    async deletePost() {
      const confirmation = confirm('Are you sure you want to delete this post?')

      if (confirmation) {
        const { error } = await supabase
          .from('JauzaBlog')
          .delete()
          .eq('id', this.post.id)

        if (error) {
          console.error('Error deleting post:', error.message)
          alert('Failed to delete post!')
        } else {
          alert('Post deleted successfully!')
          this.$router.push('/') // Redirect ke Home setelah dihapus
        }
      }
    }
  }
}
</script>

<style>
.post-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  min-height: 80vh;
}

.post-container {
  width: 100%;
  max-width: 700px;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.delete-button:hover {
  background-color: #c0392b;
}

.loading {
  font-size: 18px;
  color: #7f8c8d;
}
</style>
