import {Entity, property, model} from '@loopback/repository';

@model({
  name: "user"
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true
  })
  id?: number;

  @property({
    type: 'string',
    required: true
  })
  firstname: string;

  @property({
    type: 'string'
  })
  lastname: string;

  @property({
    type: 'string'
  })
  email: string;

  @property({
    type: 'string'
  })
  password: string;

  getId() {
    return this.id;
  }
}