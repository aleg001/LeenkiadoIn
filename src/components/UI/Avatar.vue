<template>
  <li class="flex flex-col items-center justify-center avatar__container">
    <div class="flex flex-col items-center justify-center image-container">
      <!-- user name -->
      <h3 class="font-normal font-['Roboto'] text-[0.75rem] text-gray-400">
        Yo
        <span class="hover:text-black cursor-pointer"
          ><i class="bi bi-caret-down-fill"></i
        ></span>
      </h3>
    </div>
  </li>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const userProfile = computed(() => {
      return props.imageSrc
    })

    return {
      userProfile,
    }
  },
}
</script>

<style scoped>
li.avatar-container {
  display: flex;
  object-fit: contain;
  border-radius: 50%;
  width: 100px;
}
div.image-container {
  max-width: 100%;
  overflow: hidden;
}
div.image-container > img {
  width: 30px;
  max-height: 30px;
  border-radius: 50%;
  object-fit: contain;
}
</style>
