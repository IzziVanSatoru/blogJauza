<template>
  <div v-if="post" class="post-card">
    <h2 class="post-title">{{ post.title }}</h2>
    <p class="post-content">{{ post.content }}</p>
    <div class="post-meta">
      <span>{{ formatDate(post.created_at) }}</span>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../utils/helpers'

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      return formatDate(date)
    }
  }
}
</script>

<style>
.post-card {
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-title {
  font-size: 24px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.post-content {
  font-size: 16px;
  margin-bottom: 20px;
  color: #34495e;
}

.post-meta {
  font-size: 14px;
  color: #7f8c8d;
  text-align: right;
}
</style>
