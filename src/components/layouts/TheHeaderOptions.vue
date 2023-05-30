<template>
  <li
    class="hover:border-b-[2px] hover:border-b-black cursor-pointer mr-4"
    @click="clickHandler"
  >
    <router-link
      :to="route || 'javascript:void(0)'"
      class="flex transition content-container items-center flex-col"
    >
      <span>
        <i class="transition text-gray-500 text-[1rem]" :class="Icon"></i>
      </span>
      <h3
        class="transition font-medium font-Roboto text-gray-500 text-[0.75rem]"
      >
        {{ title }}
      </h3>
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    Icon: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      default: null,
    },
    clickHandler: {
      type: Function,
      default: null,
    },
  },
}
</script>

<style scoped>
a.content-container:hover > span > i,
a.content-container:hover > h3 {
  color: black;
}
</style>
