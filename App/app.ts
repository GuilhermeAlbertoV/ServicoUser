import Express from 'express';
import connectionDB from './DB/connectionDB';

const server = Express();
class App {
  constructor() {
    this.servidor();
    this.database();
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
