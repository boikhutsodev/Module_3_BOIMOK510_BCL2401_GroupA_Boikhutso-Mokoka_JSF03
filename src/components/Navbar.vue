<template>
  <nav
    class="fixed top-0 left-0 w-full bg-pink-500 text-white flex justify-between p-4"
  >
    <router-link to="/" class="text-xl font-bold">My Store</router-link>
    <div class="space-x-4">
      <router-link to="/" class="hover:text-pink-200">Home</router-link>
    </div>
  </nav>
</template>

<script>
/**
 * The navigation bar component.
 *
 * @component
 */

export default {
  name: "Navbar",
};
</script>

<style scoped>
nav {
  z-index: 10;
}
</style>
