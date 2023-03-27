<template>
  <HeaderApp title="Raicardo" />
  <main>
    <router-view />
  </main>
  <FooterApp />
</template>

<script>
// import Home from './components/Home.vue'
import HeaderApp from './components/Header.vue'
import FooterApp from './components/Footer.vue'


export default {
  name: 'App',
  components: {
    // Home,
    HeaderApp,
    FooterApp
  }
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>