<template>
  <div class="profile">
    <div class="mt-5 profile-header">
      <div class="profile-info">
        <h2 class="profile-name">{{ user.name }}</h2>

        <p class="profile-location">{{ user.location }}</p>
        <div class="profile-education mt-5">
          <h3 class="profile-education-title">Educación</h3>
          <p class="profile-education-details">{{ user.education }}</p>
        </div>
        <div class="profile-work">
          <h3 class="profile-work-title">Trabajo</h3>
          <p class="profile-work-details">{{ user.title }}</p>
        </div>
        <div class="profile-work">
          <h3 class="profile-work-title">Comunidad</h3>
          <p class="profile-work-details">{{ user.community }}</p>
        </div>
        <div class="profile-work">
          <h3 class="profile-work-title">Rol en la comunidad</h3>
          <p class="profile-work-details">{{ user.communityRole }}</p>
        </div>
        <div class="profile-skills">
          <h3 class="profile-skills-title">Skills</h3>
          <ul class="profile-skills-list">
            <li
              v-for="skill in user.skills"
              :key="skill.id"
              class="profile-skill-item"
            >
              <span class="profile-skill-name">{{ skill.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="profile-connections">
      <h3 class="profile-connections-title">Cuates</h3>
      <p>{{ user.friends.length }} amigos</p>
    </div>
  </div>
  <v-dialog v-model="dialog" persistent max-width="50%">
    <v-card>
      <v-card-title class="mt-1">
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
                v-model="editedUser.education"
                label="Donde estudiaste"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedUser.title"
                label="Trabajo"
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

            <v-col cols="12">
              <v-text-field
                v-model="editedUser.community"
                label="Comunidad"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="editedUser.communityRole"
                label="Rol en la comunidad"
                required
              ></v-text-field>
            </v-col>

            <h3 class="profile-work-title">Skills</h3>

            <v-col cols="12">
              <v-chip
                v-for="(skill, i) in editedUser.skills"
                :key="i"
                close
                class="ml-1"
                color="blue"
                @click:close="removeSkill(i)"
              >
                {{ skill.name }}
                <v-icon
                  class="v-chip__close"
                  color="red"
                  @click.stop="removeSkill(i)"
                >
                  bi-x
                </v-icon>
              </v-chip>
            </v-col>
            <v-btn
              @click="addSkillDialog = true"
              outlined
              color="green"
              class="mt-3"
              >Añadir skill</v-btn
            >
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

  <template>
    <v-dialog v-model="addSkillDialog" persistent max-width="30%">
      <v-card>
        <v-card-title class="headline">Añadir skill</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newSkill"
            label="Skill"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="addSkillDialog = false"
            >Cerrar</v-btn
          >
          <v-btn color="blue darken-1" text @click="addSkill">Añadir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      editedUser: {},
      addSkillDialog: false,
      newSkill: '',
      user: {
        name: 'Alecraft GOMAS',

        title: 'Full Stack Dev',
        education: 'UVG',
        location: 'Guaremala Ciri',
        community: 'UVG',
        communityRole: 'Estudiante',
        skills: [
          {
            id: 1,
            name: 'JavaScript',
          },
          {
            id: 2,
            name: 'Vue.js',
          },
          {
            id: 3,
            name: 'HTML & CSS',
          },
        ],
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
    addSkill() {
      if (this.newSkill) {
        this.editedUser.skills.push({
          id: this.editedUser.skills.length + 1,
          name: this.newSkill,
        })
        this.newSkill = ''
        this.addSkillDialog = false
      }
    },
    removeSkill(index) {
      this.editedUser.skills.splice(index, 1)
    },
    updateProfile() {
      this.user.name = this.editedUser.name
      this.user.title = this.editedUser.title
      this.user.location = this.editedUser.location
      this.user.education = this.editedUser.education
      this.user.title = this.editedUser.title
      this.user.skills = this.editedUser.skills
      this.user.community = this.editedUser.community
      this.user.communityRole = this.editedUser.communityRole

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

.profile-education-title,
.profile-work-title,
.profile-skills-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.profile-education-details,
.profile-work-details {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 10px;
}

.profile-skills-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.profile-skill-item {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 8px;
  padding: 5px;
  border: 1px solid #0e76a8;
  border-radius: 5px;
}

.profile-skill-name {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
.align-right {
  margin-left: auto;
}
</style>
