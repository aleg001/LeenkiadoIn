<template>
  <div class="feed justify-center">

    <!-- 
    <div class="post-card">
      <div class="create-post">
        <textarea
          v-model="newPost.content"
          placeholder="¿Qué tenés en la mente chavo?"
          class="create-post-text"
        ></textarea>
      </div>
      <button @click="addPost" class="create-post-btn mt-5">Publicalo</button>
    </div> -->

    <v-card v-for="post in posts" :key="post.id" class="post-card mb-4">
      <v-card-text>
        <div class="post-header">
          <div class="post-author">
            <div class="post-author-name">{{ post.author }}</div>
            <div class="post-timestamp">{{ post.timestamp }}</div>
          </div>
        </div>
        <div class="post-content">{{ post.content }}</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import TheNav from '../components/layouts/TheNav.vue'
import axios from 'axios'
export default {
  mounted() {
    const properties = this.$store.state.properties;
    this.id = properties.properties.ID
    console.log(properties);
    this.getFriendsPosts();
  },
  data() {
    return {
      dialog: false,
      newPostContent: '',
      TheNav,
      id: 1,
      newPost: {
        id: null,
        author: 'User Name',
        timestamp: 'Just now',
        content: '',
        likes: 0,
        comments: 0,
        shares: 0,
      },
      posts: [
       
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
    async getFriendsPosts() {
      try {
        const user = {
          ID: this.id,
        }
        const response = await axios.post('http://localhost:8000/api/getposts', user)
        console.log(response)

        console.log(response.data)
        for(let i=0; i<response.data.length; i++) {
      let postContent = response.data[i]._fields[0];
      let postDate = response.data[i]._fields[1];
      let postAuthor = response.data[i]._fields[2];

      let postToAdd = {
        id: i,  
        author: postAuthor, 
        timestamp: new Date(
          postDate.year.high, 
          postDate.month.high - 1,
          postDate.day.high, 
          postDate.hour.high,
          postDate.minute.high, 
          postDate.second.high
        ).toString(), 
        content: postContent,
        likes: 0, 
        comments: 0, 
        shares: 0, 
      }
      this.posts.push(postToAdd);
    }

        
      } catch (error) {
        console.error('Error haciendo fetch de los posts', error);
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
