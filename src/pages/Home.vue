<template>
  <home-body></home-body>
</template>

<script>
import HomeBody from "../components/home/TheHomeBody.vue";
export default {
  mounted() {
    const properties = this.$store.state.properties;
    console.log(properties);
  },
  components: {
    HomeBody,
  },
};
</script>
