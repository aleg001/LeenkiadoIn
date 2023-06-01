<template>
  <div class="main-nav__container flex justify-start">
    <nav class="flex">
      <ul class="flex nav-links">
        <header-options
          v-for="link in links"
          :title="link.id"
          :key="link.id"
          :id="link.id"
          :Icon="link.Icon"
          :route="link.route"
          :clickHandler="link.clickHandler"
        ></header-options>
      </ul>
    </nav>
    <div v-if="dialogOpen" class="dialog" @keydown.escape="handleEscapeKey">
      <div class="dialog-header">
        <h3 style="color: white">Ingresa el nombre:</h3>
        <span class="close-icon" @click="closeDialog">x</span>
      </div>
      <v-card class="vcard">
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Busca a tu mara..."
            @input="searchFriends"
          />
          <button class="enter-button" @click="searchFriends">Buscar</button>
        </div>
        <div
          v-for="friend in searchResults"
          :key="friend.id"
          class="friend-item"
        >
          {{ friend.name }}
        </div>
      </v-card>
    </div>
    <div v-if="dialogOpen" class="overlay"></div>
  </div>
</template>

<script>
import HeaderOptions from '../layouts/TheHeaderOptions.vue'
import UserAvatar from '../UI/Avatar.vue'

import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  components: {
    HeaderOptions,
    UserAvatar,
  },
  setup() {
    let dialogOpen = ref(false)
    let searchQuery = ref('')
    let searchResults = ref([])

    const links = reactive([
      { id: 'Inicio', Icon: 'bi bi-house-door', route: '/feed' },
      { id: 'Mis cuates', Icon: ' bi bi-people', route: '/friends' },
      {
        id: 'Agregar mara',
        Icon: ' bi bi-person-plus',
        route: '/agregar-mara',
      },
      {
        id: 'Comunidades',
        Icon: ' bi bi-briefcase',
        route: '/comunidades',
      },
      { id: 'Perfil', Icon: 'bi bi-person', route: '/profile' },
    ])

    const closeDialog = () => {
      dialogOpen.value = false
    }

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeDialog()
      }
    }

    onMounted(() => {
      window.addEventListener('keydown', handleEscapeKey)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleEscapeKey)
    })

    return {
      links,
      dialogOpen,
      searchQuery,
      searchResults,
      closeDialog,
      handleEscapeKey,
    }
  },
}
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(152, 152, 152);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  height: 50%;
  max-width: 500px;
  z-index: 10000;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.dialog-header h3 {
  margin-top: 15px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  pointer-events: auto;
}

.close-icon {
  cursor: pointer;
  font-size: 18px;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border: none;

  font-size: 16px;
}

.enter-button {
  margin-left: 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;

  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.friend-item {
  margin-bottom: 5px;
  padding: 5px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
