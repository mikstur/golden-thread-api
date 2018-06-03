import { repository } from "@loopback/repository";
import { PizzaRepository } from "../repositories/pizza.repository";
import { post, get, requestBody } from "@loopback/rest";
import { Pizza } from "../models/pizza";

export class PizzaController {

  constructor(
    @repository(PizzaRepository.name) private pizzaRepo: PizzaRepository
  ) {}

  @post('/pizzas')
  async createPizza(@requestBody() pizza: Pizza) {
    return await this.pizzaRepo.create(pizza);
  }

  @get('/pizzas')
  async getAllPizzas(): Promise<Array<Pizza>> {
    return await this.pizzaRepo.find();
  }
}
