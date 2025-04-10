<template>
  <div class="comment-section">
    <h3>Comments</h3>

    <form @submit.prevent="submitComment" class="comment-form">
      <textarea v-model="newComment" placeholder="Write a comment..." required></textarea>
      <button type="submit">Post Comment</button>
    </form>

    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <p class="comment-text">{{ comment.content }}</p>
        <button @click="deleteComment(comment.id)" class="delete-comment-button">Delete</button>
        <small class="comment-meta">{{ formatDate(comment.created_at) }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../services/supabase'
import { formatDate } from '../utils/helpers'

export default {
  props: {
    postId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      newComment: '',
      comments: []
    }
  },
  methods: {
    async fetchComments() {
      const { data, error } = await supabase
        .from('JauzaBlog')
        .select('*')
        .eq('type', 'comment')
        .eq('parent_id', this.postId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching comments:', error.message)
      } else {
        this.comments = data
      }
    },
    async submitComment() {
      if (!this.newComment.trim()) return

      const { error } = await supabase
        .from('JauzaBlog')
        .insert([
          {
            type: 'comment',
            content: this.newComment,
            parent_id: this.postId
          }
        ])

      if (error) {
        console.error('Error posting comment:', error.message)
        alert('Failed to post comment!')
      } else {
        this.newComment = ''
        this.fetchComments()
      }
    },
    async deleteComment(commentId) {
      const confirmation = confirm('Are you sure you want to delete this comment?')

      if (confirmation) {
        const { error } = await supabase
          .from('JauzaBlog')
          .delete()
          .eq('id', commentId)

        if (error) {
          console.error('Error deleting comment:', error.message)
          alert('Failed to delete comment!')
        } else {
          alert('Comment deleted successfully!')
          this.fetchComments() // Refresh comments after delete
        }
      }
    },
    formatDate(date) {
      return formatDate(date)
    }
  },
  mounted() {
    this.fetchComments()
  }
}
</script>

<style>
.comment-section {
  margin-top: 40px;
}

h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

textarea {
  width: 100%;
  min-height: 80px;
  padding: 10px;
  font-size: 14px;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  align-self: flex-end;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

.comments-list {
  margin-top: 20px;
}

.comment-item {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

.delete-comment-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-comment-button:hover {
  background-color: #c0392b;
}

.comment-text {
  margin: 0 0 5px 0;
  color: #34495e;
}

.comment-meta {
  font-size: 12px;
  color: #7f8c8d;
}
</style>
