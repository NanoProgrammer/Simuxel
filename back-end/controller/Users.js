import { validateUser, optionalUser } from '../validators/users.js';
import {UserModel} from '../model/postgres/db.js';

export class UserController {

  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }
  getAll = async(req, res) => {
    const users = await this.UserModel.getAll();
    if (!users || users.length === 0) return res.status(404).send('No users found');
    res.json(users);
  }

  getById = async (req, res) => {
    const user = await this.UserModel.findById(req.params.id);
    if (user) res.send(user);
    else res.status(404).send('User not found');
  }

  getByEmail = async (req, res) => {
    const user = await this.UserModel.findByEmail(req.params.email);
    if (user) res.send(user);
    else res.status(404).send('User not found');
  }

  create = async (req, res) => {
    const result = validateUser(req.body);
    if (!result.success) return res.status(400).json(result.error);

    const newUser = await this.UserModel.create(result.data);
    res.status(201).send(newUser);
  }

  update = async (req, res) => {
    const result = optionalUser(req.body);
    if (!result.success) return res.status(400).json(result.error);

    const updatedUser = await this.UserModel.update(req.params.id, result.data);
    if (!updatedUser) return res.status(404).send('User not found');

    res.send(updatedUser);
  }

  delete = async (req, res) => {
    const success = await this.UserModel.delete(req.params.id);
    if (!success) return res.status(404).send('User not found');
    res.status(204).send();
  }
}
