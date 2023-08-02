import bcrypt, { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import UserModel from '../Model/ModelUser';
import tokenMiddleware from '../middlewares/tokenMiddleware';

async function createUser(req: Request, res: Response) {
  try {
    const foundUser = await UserModel.findOne({
      where: { username: req.body.username, email: req.body.email },
    });

    const salt = 10;

    const cryp = bcrypt.hashSync(req.body.password, salt);

    if (!foundUser) {
      const user = await UserModel.create({
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: cryp,
        age: req.body.age,
        image: req.file?.buffer,
      });

      const imageUrl = `${req.protocol}://${req.get('host')}/imagensUser/${req.file?.filename}`;
      return res.status(201).json({
        message: 'Usuario Cadastrado com sucesso!!!',
        Usuário: {
          id: user.id,
          usuário: user.username,
          nome: user.name,
          sobreNome: user.lastname,
          email: user.email,
          senha: cryp,
          idade: user.age,
          imagem: imageUrl,
        },
      });
    } else {
      return res
        .status(409)
        .json({ message: 'Usuário já existente tente um UserName ou Email diferentes' });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Não foi possível cadastrar o usuário' });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const findUser = await UserModel.findOne({
      where: { username, email },
    });
    console.log('Usuário encontrado:', findUser);
    if (!findUser) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const cripPassword = compareSync(password, findUser.password);
    if (!cripPassword) {
      return res.status(400).json({ message: 'Senha inválida' });
    }

    const token = tokenMiddleware.generateToken({
      username: findUser.username,
      email: findUser.email,
      password: findUser.password,
    });

    return res.status(200).json({
      data: {
        User: findUser,
        Token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

async function listUser(req: Request, res: Response) {
  try {
    const list = await UserModel.findAll();

    return res.status(200).json({
      data: {
        message: 'Usuário cadastrado com sucesso',
        Users: {
          list,
        },
      },
    });
  } catch (error) {}
}

export default {
  createUser,
  login,
  listUser,
};
