import express from 'express';
import { UserController } from '../controller/Users.js';
import { requireAuth } from '../middleware/auth.js';

const UserRouter = ({ UserModel }) => {
  const UsersRouter = express.Router();
  const userController = new UserController({ UserModel });

  // Ruta protegida: ver todos los usuarios (opcionalmente restringir solo a admin)
  UsersRouter.get('/', requireAuth, async (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).send('Forbidden: Admins only');
    }
    return userController.getAll(req, res);
  });

  // Obtener usuario por email (protegido)
  UsersRouter.get('/email/:email', requireAuth, userController.getByEmail);

  // Obtener usuario por ID (protegido)
  UsersRouter.get('/:id', requireAuth, userController.getById);

  // Crear usuario (si quieres protegerla, puedes agregar requireAuth)
  UsersRouter.post('/', userController.create);

  // Actualizar usuario (protegido)
  UsersRouter.put('/:id', requireAuth, userController.update);

  // Eliminar usuario (protegido)
  UsersRouter.delete('/:id', requireAuth, userController.delete);

  // Obtener datos del usuario logueado
  UsersRouter.get('/me', requireAuth, async (req, res) => {
    const user = await UserModel.findByEmailNoPassword(req.user.email);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  });

  return UsersRouter;
};

export default UserRouter;
  