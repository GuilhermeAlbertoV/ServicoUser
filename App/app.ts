import bodyParser from 'body-parser';
import Express from 'express';
import connectionDB from './DB/connectionDB';
import routers from './rotas/rotasUser';

const server = Express();
class App {
  constructor() {
    this.servidor();
    this.database();
    this.serverConfigs();
    this.rotas();
  }

  rotas() {
    server.use('/usuarios', routers);
    server.use('/autenticacao', routers);
    server.use('/usuarios', routers);
  }

  serverConfigs() {
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
  }

  database() {
    connectionDB.sequelize
      .authenticate()
      .then(() => {
        console.log('Conexão com o banco de dados realizada com sucesso!!!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  servidor() {
    server.listen(5000, () => {
      console.log('Servidor Rodando na porta 5000');
    });
  }
}

new App();
