import { PizzaRepository } from "../repositories/pizza.repository";
import { Pizza } from "../models/pizza";
export declare class PizzaController {
    private pizzaRepo;
    constructor(pizzaRepo: PizzaRepository);
    createPizza(pizza: Pizza): Promise<Pizza>;
    getAllPizzas(): Promise<Array<Pizza>>;
}
