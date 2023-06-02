<template>
  <div class="friend-component">
    <h2 class="friend-component__title">Buscar mara</h2>
    <div class="friend-component__search-bar mt-5">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar mara..."
        class="friend-component__search-input"
      />
      <button class="friend-component__search-button">Buscar</button>
    </div>

    <ul class="mt-15 friend-component__recommendations">
      <li
        v-for="user in recommendations"
        :key="user.ID"
        class="friend-component__recommendation"
      >
        <div class="friend-component__avatar"></div>
        <div class="friend-component__name">{{ user.fullname }}</div>
        <div class="button-container">
  <button @click="addUser(user.ID)" class="friend-component__agregar-button">Agregar</button>
</div>
      </li>
    </ul>
  </div>

  <div v-if="showToast" class="toast">
      ¡Amigo agregado!
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  created(){
    const properties = this.$store.state.properties;
    this.id = properties.properties.ID
    this.getUsers()
  },
  name: 'FriendComponent',
  data() {
    return {
      showToast: false,
      toastMessage: '',
      recommendations: [
      ],
      searchQuery: '',
    }
  },
  methods: {
    addUser(userID){
      this.addFriend(userID)
      alert("Amigo agregado")

    },
    async getUsers() {
      try {
        const user = {
          ID: this.id,
        };
        const res = await axios.post('http://localhost:8000/api/getnofriends', user);
        console.log(res.data)

        res.data.forEach((entry) => {
          const user = {
            ID: entry._fields[0],
            fullname: entry._fields[1],
          };
          this.recommendations.push(user);
        });
      } catch (err) {
        console.error(err)
      }
    },
    async addFriend(friend_ID) {
      try {
        const user = {
          ID: this.id,
          friendID: friend_ID
        };
        const res = await axios.post('http://localhost:8000/api/addfriend', user);
        console.log(res.data)
        this.showToast = true;
     
      } catch (err) {
        console.error(err)
      }
    },
  },
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

  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;

}
.toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #000;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    opacity: 0.9;
    z-index: 9999;
  }
</style>
