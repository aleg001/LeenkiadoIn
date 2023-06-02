<template>
  <div class="friend-component">
    <h2 class="friend-component__title">Cuates</h2>
    <ul class="mt-5 friend-component__list">
      <li
        v-for="friend in friends_list"
        :key="friend.ID"
        class="friend-component__item"
      >
        <div class="friend-component__name">{{ friend.fullname }}</div>
      
        <button
          @click="removeFriends(friend.ID)"
          class="friend-component__delete-button"
        >
          Eliminar
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  created() {
    const properties = this.$store.state.properties;
    this.id = properties.properties.ID
    this.getFriends()
  },
  name: 'FriendComponent',
  data() {
    return {
      friends_list: [],
      db_friends_list: [],
      searchQuery: '',
      id: 1
    }
  },
  methods: {
    async getFriends() {
      try {
        const user = {
          ID: this.id,
        };
        const res = await axios.post('http://localhost:8000/api/getfriends', user);
        console.log(res.data)

        res.data.forEach((entry) => {
          const friend = {
            ID: entry._fields[0],
            fullname: entry._fields[1],
          };
          this.friends_list.push(friend);
          this.db_friends_list.push(friend);
        });
      } catch (err) {
        console.error(err)
      }
    },
    removeFriends(friend_id) {
    
        const user = {
          ID: this.id,
          friendID: friend_id
        };
        axios.post('http://localhost:8000/api/removefriend', user)
        
    .then(res => {
      console.log(res.data);
      this.friends_list = this.friends_list.filter(friend => friend.ID !== friend_id);
      
    })
    alert('Se ha eliminado a tu cuate')
    .catch(err => console.error(err));
},
    }
 
})
</script>

<style scoped>
.friend-component {
  width: 100%;
  padding: 20px;
  margin-left: 25px;
  margin-right: 25px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.friend-component__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.friend-component__search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.friend-component__search-input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  background-color: rgb(238, 234, 234);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.friend-component__search-button {
  margin-left: 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.friend-component__list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.friend-component__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.friend-component__avatar {
  width: 40px;
  height: 40px;
  background-color: #bbb;
  border-radius: 50%;
  margin-right: 10px;
}

.friend-component__name {
  font-size: 16px;
}

.friend-component__delete-button {
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #b84652;
  color: white;
  cursor: pointer;
}

.friend-component__recommendations {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.friend-component__recommendation {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.friend-component__mutual-connections {
  font-size: 14px;
  color: #777;
  margin-left: auto;
}

.friend-component__agregar-button {
  margin-left: 10px;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}
</style>
