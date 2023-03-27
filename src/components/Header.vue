<template>
  <div class="header fixed top-0 w-full bg-white shadow-md">
    <div class="container mx-auto flex justify-between items-center h-16 px-4">
      <h1 class="text-2xl font-bold">Raicardo</h1>
      <router-link to="/projects">
        <button class="btn">
          Projects
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderApp",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 100;
}

.header__left h1 {
  margin: 0;
}

.header__right button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #007aff;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
</style>