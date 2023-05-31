<template>
  <div class="profile">
    <div class="profile-header">
      <div class="profile-info">
        <h2 class="profile-name">{{ user.name }}</h2>
        <p class="profile-title">{{ user.title }}</p>
        <p class="profile-location">{{ user.location }}</p>
      </div>
      <v-btn class="edit-button" @click="dialog = true" outlined>Editar</v-btn>
    </div>
    <div class="profile-connections">
      <h3 class="profile-connections-title">Cuates</h3>
      <ul class="profile-friends">
        <li
          v-for="friend in user.friends"
          :key="friend.id"
          class="profile-friend"
        >
          <span class="profile-friend-name">{{ friend.name }}</span>
        </li>
      </ul>
    </div>
  </div>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Cambia de identidad</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedUser.name"
                label="Nombre"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedUser.title"
                label="Titulo"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedUser.location"
                label="Donde vivís"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="dialog = false">Cerrar</v-btn>
        <v-btn color="blue darken-1" text @click="updateProfile"
          >Actualizar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  mounted() {
    const properties = this.$store.state.properties;
    console.log(properties);
  },
  data() {
    return {
      dialog: false,
      editedUser: {},
      user: {
        name: 'Alecraft GOMAS',

        title: 'Full Stack Dev',
        location: 'Guaremala Ciri',
        friends: [
          {
            id: 1,
            name: 'Racso',
          },
          {
            id: 2,
            name: 'Pedrin',
          },
          {
            id: 3,
            name: 'Mario Barrientos',
          },
        ],
      },
    }
  },
  methods: {
    updateProfile() {
      this.user.name = this.editedUser.name
      this.user.title = this.editedUser.title
      this.user.location = this.editedUser.location
      this.dialog = false
    },
  },
  created() {
    this.editedUser = Object.assign({}, this.user)
  },
}
</script>

<style scoped>
.profile {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.profile-info {
  flex-grow: 1;
}

.profile-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.profile-title {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
}

.profile-location {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
}

.profile-connections-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.profile-friends {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.profile-friend {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.profile-friend-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-friend-name {
  font-size: 16px;
}

.edit-button {
  color: white;
  background-color: #0e76a8;
  border-color: #0e76a8;
  margin-left: auto;
  text-transform: unset !important;
}
</style>
