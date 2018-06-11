import {repository} from '@loopback/repository';
import {PizzaRepository} from '../repositories/pizza.repository';
import {post, get, requestBody, param, HttpErrors} from '@loopback/rest';
import {Pizza} from '../models/pizza';

import {sign, verify} from 'jsonwebtoken';

export class PizzaController {
  constructor(
    @repository(PizzaRepository.name) private pizzaRepo: PizzaRepository,
  ) {}

  @post('/pizzas')
  async createPizza(@requestBody() pizza: Pizza) {
    return await this.pizzaRepo.create(pizza);
  }

  @get('/pizzas')
  async getAllPizzas(@param.query.string('jwt') jwt: string): Promise<any> {
    if (!jwt) throw new HttpErrors.Unauthorized('JWT token is required.');

    try {
      var jwtBody = verify(jwt, 'shh');
      console.log(jwtBody);
      return jwtBody;
    } catch (err) {
      throw new HttpErrors.BadRequest('JWT token invalid');
    }

    //return await this.pizzaRepo.find();
  }
}
