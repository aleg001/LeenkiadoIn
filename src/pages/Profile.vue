<template>
  <div class="profile">
    <div class="profile-header">
      <div class="profile-info">
        <h2 class="profile-name">{{ user.name }}</h2>
        <p class="profile-title">{{ user.title }}</p>
        <p class="profile-location">{{ user.location }}</p>
      </div>
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
</template>

<script>
export default {
  data() {
    return {
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
</style>
