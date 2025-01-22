export class Pet {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public color: string,
    public parent1Id?: string,
    public parent2Id?: string
  ) {}
}