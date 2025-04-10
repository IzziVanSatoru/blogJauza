<template>
  <div class="create-post">
    <h2>Create a New Post</h2>

    <form @submit.prevent="submitPost" class="post-form">
      <input
        v-model="title"
        type="text"
        placeholder="Post Title"
        required
      />
      <textarea
        v-model="content"
        placeholder="Post Content"
        required
      ></textarea>
      <button type="submit">Publish</button>
    </form>
  </div>
</template>

<script>
import { supabase } from '../services/supabase'

export default {
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    async submitPost() {
      if (!this.title.trim() || !this.content.trim()) {
        alert('Title and Content cannot be empty')
        return
      }

      const { data, error } = await supabase
        .from('JauzaBlog')
        .insert([
          {
            type: 'post',             // <- Wajib "post"
            title: this.title,         // <- Judul post
            content: this.content      // <- Isi post
            // parent_id tidak diisi karena ini bukan comment
          }
        ])

      if (error) {
        console.error('Error creating post:', error.message)
        alert('Failed to create post: ' + error.message)
      } else {
        console.log('Post created:', data)
        alert('Post created successfully!')
        this.title = ''
        this.content = ''
        this.$router.push('/') // Balik ke Home
      }
    }
  }
}
</script>

<style>
.create-post {
  border: 1px solid #dcdcdc;
  padding: 30px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.post-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #219150;
}
</style>
