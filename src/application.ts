import {ApplicationConfig} from '@loopback/core';
import {RestApplication, RestServer, RestBindings} from '@loopback/rest';
import {MySequence} from './sequence';

/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
import {BootMixin, Booter, Binding} from '@loopback/boot';
import {
  Class,
  Repository,
  RepositoryMixin,
  juggler
} from '@loopback/repository';
import { env } from 'shelljs';
/* tslint:enable:no-unused-variable */

export class GoldenThreadApiApplication extends BootMixin(
  RepositoryMixin(RestApplication)
) {
  constructor(options?: ApplicationConfig) {
    super(options);

    // Set up port
    this.bind(RestBindings.PORT).to(process.env.PORT as any || 3000);

    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      }
    };

    var environment = process.env.NODE_ENV;
    var databaseName = null;
    var databaseUsername = 'root';
    var databasePassword = 'root';

    if (environment == "miki") {
      databaseName = process.env.DATABASE_NAME as string;
    }

    if (environment == "perry") {
      databaseName = 'hello';
    }

    console.log("environment: ", environment);
    console.log("database name: ", databaseName);

    // Use below to connect to a MySQL database
    // var dataSourceConfig = new juggler.DataSource({
    //   name: "db",
    //   connector: 'loopback-connector-mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   database: databaseName,
    //   user: databaseUsername,
    //   password: databasePassword
    // });

    // Use below for an in-memory database
    var dataSourceConfig = new juggler.DataSource({
      name: "db",
      connector: 'memory'
    });

    this.dataSource(dataSourceConfig);

    //this.bind("auth.service").toClass(AuthService);
  }

  async start() {
    await super.start();

    const server = await this.getServer(RestServer);
    const port = await server.get(RestBindings.PORT);
    console.log(`Server is running at http://127.0.0.1:${port}`);
    console.log(`Try http://127.0.0.1:${port}/swagger-ui`);
  }
}
