<template>
  <div class="feed justify-center">
    <div class="post-card">
      <div class="create-post">
        <textarea
          v-model="newPost.content"
          placeholder="¿Qué tenés en la mente chavo?"
          class="create-post-text"
        ></textarea>
      </div>
      <button @click="addPost" class="create-post-btn mt-5">Publicalo</button>
    </div>

    <v-card v-for="post in posts" :key="post.id" class="post-card mb-4">
      <v-card-text>
        <div class="post-header">
          <v-avatar class="post-avatar">
            <v-img :src="post.authorImage" />
          </v-avatar>
          <div class="post-author">
            <div class="post-author-name">{{ post.author }}</div>
            <div class="post-timestamp">{{ post.timestamp }}</div>
          </div>
        </div>
        <div class="post-content">{{ post.content }}</div>
        <div class="post-engagement">
          <div class="post-engagement-item">
            <i class="bi bi-hand-thumbs-up post-icon"></i>
            <span class="post-engagement-count">{{ post.likes }}</span>
          </div>
          <div class="post-engagement-item">
            <i class="bi bi-chat-dots post-icon"></i>
            <span class="post-engagement-count">{{ post.comments }}</span>
          </div>
          <div class="post-engagement-item">
            <i class="bi bi-share post-icon"></i>
            <span class="post-engagement-count">{{ post.shares }}</span>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import TheNav from '../components/layouts/TheNav.vue'
export default {
  mounted() {
    const properties = this.$store.state.properties;
    console.log(properties);
  },
  data() {
    return {
      dialog: false,
      newPostContent: '',
      TheNav,
      newPost: {
        id: null,
        author: 'User Name',
        authorImage: 'https://example.com/user-avatar.jpg',
        timestamp: 'Just now',
        content: '',
        likes: 0,
        comments: 0,
        shares: 0,
      },
      posts: [
        {
          id: 1,
          author: 'Racsin BARRIOS',
          authorImage: 'https://example.com/john-doe.jpg',
          timestamp: '2 hours ago',
          content: 'This is the content of the first post.',
          likes: 10,
          comments: 5,
          shares: 2,
        },
        {
          id: 2,
          author: 'Alecraft GOMAS',
          authorImage: 'https://example.com/jane-smith.jpg',
          timestamp: '1 day ago',
          content: 'This is the content of the second post.',
          likes: 15,
          comments: 3,
          shares: 1,
        },
        {
          id: 2,
          author: 'Pedro Arriola',
          authorImage: 'https://example.com/jane-smith.jpg',
          timestamp: '1 day ago',
          content: 'This is the content of the second post.',
          likes: 15,
          comments: 3,
          shares: 1,
        },
      ],
    }
  },
  methods: {
    addPost() {
      if (this.newPost.content !== '') {
        this.newPost.id = this.posts.length + 1
        this.posts.unshift(Object.assign({}, this.newPost))
        this.newPost.content = ''
      }
    },
  },
}
</script>

<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 40%;
}

.post-card {
  width: 250%;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.post-card:not(:last-child) {
  margin-bottom: 16px;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.post-avatar {
  width: 40px;
  height: 40px;
  margin-right: 16px;
}

.post-author {
  display: flex;
  flex-direction: column;
}

.post-author-name {
  font-size: 16px;
  font-weight: bold;
  color: #0a66c2;
}

.post-timestamp {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}

.post-content {
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.8);
}

.post-engagement {
  display: flex;
}

.post-engagement-item {
  display: flex;
  align-items: center;
  margin-right: 16px;
  color: rgba(0, 0, 0, 0.6);
}

.post-icon {
  margin-right: 4px;
}

.post-engagement-count {
  font-size: 14px;
}

.post-card .v-textarea {
  margin-bottom: 16px;
}

.create-post {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.create-post-text {
  flex-grow: 1;
  margin-right: 16px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.create-post-btn {
  padding: 8px 16px;
  color: #fff;
  background-color: #0a66c2;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-post-btn:hover {
  background-color: #004182;
}
</style>
