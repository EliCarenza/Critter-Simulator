<template>
  <div>
    <h1>Welcome to the Critter Simulator App</h1>
    <BreedPets />
    <div v-if="pets.length >= 2 && svgContent">
      <div v-for="pet in pets" :key="pet.id" class="pet">
        <div v-html="getColoredSvg(pet.color)"></div>
        <p>Color: {{ pet.color }}</p>
        <p>{{ pet.name }} - {{ pet.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { usePetStore } from './store/pets';
import { loadSvgContent } from './utils/loadSvg';
import BreedPets from './components/BreedPets.vue';

const petStore = usePetStore();
const pets = computed(() => petStore.pets);
const svgContent = ref('');

onMounted(async () => {
  petStore.loadFromLocalStorage();
  if (petStore.pets.length < 2) {
    petStore.createStarterPets();
  }
  svgContent.value = await loadSvgContent();
});

function getColoredSvg(color: string, width: number = 100, height: number = 100): string {
  if (!svgContent.value) return '';

  try {
    const updatedSvgContent = svgContent.value.replace(/#ffffff/gi, color);

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(updatedSvgContent, 'image/svg+xml');

    const svgElement = svgDoc.documentElement;
    svgElement.setAttribute('width', width.toString());
    svgElement.setAttribute('height', height.toString());

    const serializer = new XMLSerializer();
    return serializer.serializeToString(svgDoc);
  } catch (error) {
    console.error('Error processing SVG:', error);
    return '';
  }
}
</script>

<style scoped>
.pet {
  display: inline-block;
  margin: 10px;
  text-align: center;
}
</style>