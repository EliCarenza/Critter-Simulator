import {defineStore} from 'pinia';
import {Gene} from '../models/Gene';

export const useGeneStore = defineStore('geneStore', {
    state: () => ({
        genes: [] as Gene[],
    }),
    actions: {
        addGene(gene: Gene) {
            this.genes.push(gene);
            this.saveToLocalStorage();
        },
        loadFromLocalStorage() {
            const storedGenes = localStorage.getItem('genes');
            if (storedGenes) {
                this.genes = JSON.parse(storedGenes);
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('genes', JSON.stringify(this.genes));
        },
    },
});