import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3308,
  logging: console.log,
});


export default {
  sequelize: sequelize,
  Sequelize: Sequelize,
};
