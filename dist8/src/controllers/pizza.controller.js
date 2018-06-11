"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const pizza_repository_1 = require("../repositories/pizza.repository");
const rest_1 = require("@loopback/rest");
const pizza_1 = require("../models/pizza");
const jsonwebtoken_1 = require("jsonwebtoken");
let PizzaController = class PizzaController {
    constructor(pizzaRepo) {
        this.pizzaRepo = pizzaRepo;
    }
    async createPizza(pizza) {
        return await this.pizzaRepo.create(pizza);
    }
    async getAllPizzas(jwt) {
        if (!jwt)
            throw new rest_1.HttpErrors.Unauthorized('JWT token is required.');
        try {
            var jwtBody = jsonwebtoken_1.verify(jwt, 'hello');
            console.log(jwtBody);
            return jwtBody;
        }
        catch (err) {
            throw new rest_1.HttpErrors.BadRequest('JWT token invalid');
        }
        //return await this.pizzaRepo.find();
    }
};
__decorate([
    rest_1.post('/pizzas'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pizza_1.Pizza]),
    __metadata("design:returntype", Promise)
], PizzaController.prototype, "createPizza", null);
__decorate([
    rest_1.get('/pizzas'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PizzaController.prototype, "getAllPizzas", null);
PizzaController = __decorate([
    __param(0, repository_1.repository(pizza_repository_1.PizzaRepository.name)),
    __metadata("design:paramtypes", [pizza_repository_1.PizzaRepository])
], PizzaController);
exports.PizzaController = PizzaController;
//# sourceMappingURL=pizza.controller.js.map