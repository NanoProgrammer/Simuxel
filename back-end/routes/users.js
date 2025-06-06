import express from 'express';
import {UserController} from '../controller/Users.js';
import { verifyToken } from '../middleware/auth.js';

const UserRouter = ({UserModel}) => {
    const UsersRouter = express.Router();

    const userController = new UserController({ UserModel });

    UsersRouter.get('/', userController.getAll);
    UsersRouter.get('/email/:email', userController.getByEmail);
UsersRouter.get('/:id', userController.getById);
    UsersRouter.post('/', userController.create);
    UsersRouter.put('/:id', userController.update);
    UsersRouter.delete('/:id', userController.delete);

    UsersRouter.get("/me", verifyToken, async (req, res) => {
  const user = await UserModel.findByEmailNoPassword(req.user.email);
  res.send(user);
    }
    );

    return UsersRouter;
}
export default UserRouter;