<template>
  <!-- Hero Section -->
  <section class="hero-section h-screen bg-cover bg-center flex items-center justify-center">
    <div class="text-white text-center">
      <h1 class="text-6xl font-bold mb-4">¡Hola, soy Ricardo!</h1>
      <h3 class="text-xl">{{ heroTitle }}</h3>
      <p class="text-xl">Desarrollador de IA y apasionado por la jardinería</p>
      <router-link to="/projects">
        <button class="mt-8 px-4 btn">
          Ver proyectos
        </button>
      </router-link>
    </div>
  </section>

  <section class="hero-section w-2/4 h-screen mx-auto bg-cover bg-center flex items-center justify-center shadow-lg"
    :style="{ backgroundImage: 'url(' + heroImage + ')' }">
  </section>
  
  <section class="py-20">
    <div class="container mx-auto grid grid-cols-2 gap-8 items-center">
      <!-- Pokemon Image -->
      <div class="pokemon-image">
        <img :src="pokemonData.image" :alt="pokemonData.name" class="w-full h-full object-contain">
      </div>
      <!-- Pokemon Description -->
      <div class="pokemon-description">
        <h2 class="text-3xl font-bold mb-4">{{ pokemonData.name }}</h2>
        <p class="text-gray-700">{{ pokemonData.description }}</p>
      </div>
    </div>
  </section>
  
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {      
      heroTitle: '',
      heroImage: null,
      pokemonData: {},
    };
  },
  mounted() {
    this.fetchInspirobot();
    this.fetchPokemonData();
  },
  methods: {
    async fetchInspirobot() { 
      const { data } = await axios.get('https://inspirobot.me/api?generate=true')
      this.heroImage = data;
    },

    async fetchPokemonData() {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/25');
      const data = response.data;
      this.pokemonData = {
        name: data.name,
        description: data.flavor_text_entries[0].flavor_text,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hero-section {
  background-image: url('https://via.placeholder.com/1920x1080');
  background-color: rgba(0, 0, 0, 0.5);
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
