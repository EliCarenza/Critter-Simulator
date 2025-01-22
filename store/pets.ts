import {defineStore} from 'pinia';
import {Pet} from '../models/Pet';
import {generateUniqueId} from '../utils/idGenerator';
import {generateRandomName} from '../utils/nameGenerator';
import {generateRandomColor} from '../utils/colorGenerator';
import {breedPets} from '../utils/geneMixer';

export const usePetStore = defineStore('petStore', {
    state: () => ({
        pets: [] as Pet[],
    }),
    actions: {
        addPet(pet: Pet) {
            this.pets.push(pet);
            this.saveToLocalStorage();
        },
        breedPets(parent1Id: string, parent2Id: string) {
            const parent1 = this.pets.find(pet => pet.id === parent1Id);
            const parent2 = this.pets.find(pet => pet.id === parent2Id);
            if (parent1 && parent2) {
                const newPet = breedPets(parent1, parent2);
                this.addPet(newPet);
            }
        },
        loadFromLocalStorage() {
            const storedPets = localStorage.getItem('pets');
            if (storedPets) {
                this.pets = JSON.parse(storedPets);
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('pets', JSON.stringify(this.pets));
        },
        createStarterPets() {
            const existingIds = new Set<string>();
            const pet1 = new Pet(generateUniqueId(existingIds), generateRandomName(), 'Starter Pet 1', generateRandomColor());
            const pet2 = new Pet(generateUniqueId(existingIds), generateRandomName(), 'Starter Pet 2', generateRandomColor());
            this.addPet(pet1);
            this.addPet(pet2);
        }
    },
});