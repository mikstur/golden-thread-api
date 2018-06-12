import {repository} from '@loopback/repository';
import {post, get, requestBody, HttpErrors, param} from '@loopback/rest';
import {UserRepository} from '../repositories/user.repository';
import {User} from '../models/user';
import {Login} from '../models/login';
import {sign, verify} from 'jsonwebtoken';

import * as bcrypt from 'bcrypt';

export class UserController {
  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository,
  ) {}

  @post('/registration')
  async createUser(@requestBody() user: User) {

    console.log(user.password);
    let hashedPassword = await bcrypt.hash(user.password, 10);

    var userToStore = new User();
    userToStore.id = user.id;
    userToStore.firstname = user.firstname;
    userToStore.lastname = user.lastname;
    userToStore.email = user.email;
    userToStore.password = hashedPassword;

    let storedUser = await this.userRepo.create(userToStore);
    storedUser.password = "";
    return storedUser;
  }

  @post('/login')
  async login(@requestBody() login: Login): Promise<any> {
    var users = await this.userRepo.find();

    var email = login.email;

    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      if (user.email == email && await bcrypt.compare(login.password, user.password)) {

        var jwt = sign(
          {
            user: {
              id: user.id,
              firstname: user.firstname,
              email: user.email
            },
            anything: "hello"
          },
          'shh',
          {
            issuer: 'auth.ix.co.za',
            audience: 'ix.co.za',
          },
        );
        
        return {
          token: jwt,
        };
      }
    }

    throw new HttpErrors.Unauthorized('User not found, sorry!');
    //return "Error";
  }

  @post('/login-with-query')
  async loginWithQuery(@requestBody() login: Login): Promise<User> {
    var users = await this.userRepo.find({
      where: {
        and: [{email: login.email}, {password: login.password}],
      },
    });

    if (users.length == 0) {
      throw new HttpErrors.NotFound('User not found, sorry!');
    }

    return users[0];
  }

  @get('/users')
  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepo.find();
  }

  @get('/users/{id}')
  async getUserById(@param.query.number('id') id: number): Promise<User> {
    try {
      return await this.userRepo.findById(id);
    } catch (err) {
      throw new HttpErrors.NotFound('User not found, sorry!');
    }
  }
}
