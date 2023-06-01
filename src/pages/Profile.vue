<template>
  <div class="profile">
    <v-btn class="edit-button align-right" @click="dialog = true" outlined
      >Editar</v-btn
    >
    <div class="mt-5 profile-header">
      <div class="profile-info">
        <h2 class="profile-name">{{ user.name }}</h2>

        <p class="profile-location">{{ user.location }}</p>
        <div class="profile-education mt-5">
          <h3 class="profile-education-title">Educación</h3>
          <ul class="profile-college-list">
            <li
              v-for="college in user.college_list"
              :key="college"
              class="profile-skill-item"
            >
              <span class="profile-skill-name">{{ college }}</span>
            </li>
          </ul>
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
              v-for="skill in user.skills_list"
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
                v-for="(skill, i) in editedUser.skills_list"
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
import axios from 'axios';
export default {
  created() {
    const properties = this.$store.state.properties;

    this.user.id = properties.properties.ID;
    console.log(this.user.id)

    if (properties.properties.fullname) {
      this.user.name = properties.properties.fullname;
    } else {
      this.user.name = "No name"
    }

    if (properties.properties.title) {
      this.user.title = properties.properties.title;
    } else {
      this.user.title = "No title"
    }

    if (properties.properties.location) {
      this.user.location = properties.properties.location;
    } else {
      this.user.location = "No Location"
    }

    if (properties.properties.community) {
      this.user.community = properties.properties.community;
    } else {
      this.user.community = "No community"
    }

    if (properties.properties.communityRole) {
      this.user.communityRole = properties.properties.communityRole;
    } else {
      this.user.communityRole = "No community Role"
    }

    if (properties.properties.skills) {
      this.user.skills = properties.properties.skills
      this.user.skills_list = properties.properties.skills.map((skill, index) => {
        return {
          id: index + 1,
          name: properties.properties.skills[index],
        };
      });
    } else {
      this.user.skills_list = []
    }

    this.getCollege()

    this.editedUser = Object.assign({}, this.user);
  },
  data() {
    return {
      dialog: false,
      editedUser: {},
      addSkillDialog: false,
      newSkill: '',
      user: {
        id: '1',
        name: 'Ale',
        title: 'Full Stack Dev',
        education: 'UVG',
        location: 'Guaremala Ciri',
        community: 'UVG',
        communityRole: 'Estudiante',
        skills: [
        ],
        skills_list: [
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
        college_list: [],
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
        this.editedUser.skills_list.push({
          id: this.editedUser.skills_list.length + 1,
          name: this.newSkill,
        })
        this.editedUser.skills.push(this.newSkill)
        this.newSkill = ''
        this.addSkillDialog = false
      }
    },
    removeSkill(index) {
      this.editedUser.skills_list.splice(index, 1)
      this.editedUser.skills.splice(index, 1)
    },
    updateProfile() {
      this.user.name = this.editedUser.name
      this.user.title = this.editedUser.title
      this.user.location = this.editedUser.location
      this.user.education = this.editedUser.education
      this.user.skills = this.editedUser.skills
      this.user.skills_list = this.editedUser.skills_list
      this.user.community = this.editedUser.community
      this.user.communityRole = this.editedUser.communityRole

      this.dialog = false
      this.updateUser()
    },
    async updateUser(){
      try {
        const user = {
          ID: this.user.id,
          fullname: this.user.name,
          title: this.user.title,
          location: this.user.location,
          education: this.user.education,
          community: this.user.community,
          communityRole: this.user.communityRole,
          skills: this.user.skills,
        }
        const res = await axios.post('http://localhost:8000/api/userupdate', user)
        const properties = res.data.records[0]._fields[0]
        this.$store.commit('setProperties', properties);
        console.log(properties)
      } catch (err) {
        console.error(err)
      }
    },
    async getCollege(){
      try {
        const user = {
          ID: this.user.id,
        }
        const res = await axios.post('http://localhost:8000/api/getcollege', user)
        this.user.college_list = res.data.records[0]._fields
      } catch (err) {
        console.error(err)
      }
    }
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