<template>
  <div>
    <h2>Breed Pets</h2>
    <div>
      <label for="parent1">Parent 1:</label>
      <select v-model="parent1Id">
        <option v-for="pet in pets" :key="pet.id" :value="pet.id">{{ pet.name }}</option>
      </select>
    </div>
    <div>
      <label for="parent2">Parent 2:</label>
      <select v-model="parent2Id">
        <option v-for="pet in pets" :key="pet.id" :value="pet.id">{{ pet.name }}</option>
      </select>
    </div>
    <button @click="breed">Breed</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePetStore } from '../store/pets';

const petStore = usePetStore();
const pets = computed(() => petStore.pets);
const parent1Id = ref('');
const parent2Id = ref('');

function breed() {
  if (parent1Id.value && parent2Id.value) {
    petStore.breedPets(parent1Id.value, parent2Id.value);
  }
}
</script>