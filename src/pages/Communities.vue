<template>
  <div class="friend-component">
    <h2 class="friend-component__title">Unite a una comunidad chilera</h2>
    <div class="mt-5 friend-component__community-selector">
      <v-select
        v-model="selectedCommunity"
        :items="communities"
        label="Comunidad"
        dense
      ></v-select>
    </div>
    <div class="mt-3 friend-component__role-input">
      <v-text-field
        v-model="role"
        :label="'Tu rol en ' + selectedCommunity"
        dense
      ></v-text-field>
    </div>
    <button class="friend-component__search-button">Unite chavo</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FriendComponent',
  data() {
    return {
      friends: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alex Johnson' },
      ],
      recommendations: [
        { id: 1, name: 'Michael Brown', mutualConnections: 2 },
        { id: 2, name: 'Sonic Davis', mutualConnections: 5 },
        { id: 3, name: 'David Johnson', mutualConnections: 1 },
      ],
      searchQuery: '',
      selectedCommunity: '',
      role: '',
      communities: ['Community 1', 'Community 2', 'Community 3'],
    }
  },
  computed: {
    filteredFriends() {
      const query = this.searchQuery.toLowerCase()
      return this.friends.filter((friend) =>
        friend.name.toLowerCase().includes(query)
      )
    },
  },
  methods: {
    removeFriend(id) {
      this.friends = this.friends.filter((friend) => friend.id !== id)
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

.friend-component__community-selector {
  margin-bottom: 10px;
}

.friend-component__role-input {
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
