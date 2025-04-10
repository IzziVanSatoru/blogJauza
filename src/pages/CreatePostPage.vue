<template>
  <section class="create-post-page">
    <div class="create-post-container">
      <CreatePost />
    </div>
  </section>
</template>

<script>
import CreatePost from '../components/CreatePost.vue'

export default {
  components: {
    CreatePost
  }
}
</script>

<style>
.create-post-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 80vh;
}

.create-post-container {
  width: 100%;
  max-width: 700px;
}
</style>
