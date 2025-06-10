import express from 'express';
import { UserController } from '../controller/Users.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const UserRouter = ({ UserModel }) => {
  const router = express.Router();
  const userController = new UserController({ UserModel });

  router.get('/me', requireAuth, async (req, res) => {
    const user = await UserModel.findByEmailNoPassword(req.user.email);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  });
  
  // 👮‍♂️ Solo admins
  router.get('/', requireAuth, requireAdmin, userController.getAll);
  router.get('/email/:email', requireAuth, requireAdmin, userController.getByEmail);
  router.post('/', requireAuth, requireAdmin, userController.create);
  router.put('/:id', requireAuth, requireAdmin, userController.update);
  router.delete('/:id', requireAuth, requireAdmin, userController.delete);



  return router;
};

export default UserRouter;
