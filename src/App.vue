<template>
  <div>
    <the-header></the-header>
    <main class="flex mt-[80px] pb-[2rem]">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import neo4j from 'neo4j-driver'
import TheHeader from './components/layouts/TheHeader.vue'

export default {
  components: {
    TheHeader,
  },
  computed: {
    Classes() {
      if (this.$route.path === '/login') {
        return 'hidebodyOverflow'
      } else {
        return ''
      }
    },
  },
  mounted() {
    const uri = 'neo4j+s://17959895.databases.neo4j.io:7687'
    const user = 'neo4j'
    const password = 'Bi6I2NT6dJLeTOv852zALmY1NQS_LPPjNJlSGHnvN_Q'
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))

    const session = driver.session()

    const bodyEl = document.getElementsByTagName('body')[0]
    if (this.$route.path === '/login') {
      bodyEl.classList.add('overflow-hide')
    } else {
      bodyEl.classList.remove('overflow-hide')
    }
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  width: 100%;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  background-color: rgba(240, 238, 238, 0.8);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

body.overflow-hide {
  overflow-y: hidden;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0px);
}
</style>
