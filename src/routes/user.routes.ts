import { Router } from "express";
import { isAuth } from "../middlewares/verifyToken";
import {
  deleteUser,
  getUser,
  getUsers,
  saveUser,
  updateUser,
} from "../controllers/users.controller";
import { checkRolesExists, checkUsernameAndEmailExists } from "../middlewares/checkSignUp";
import { isAdmin, isSuperAdmin } from "../middlewares/permissionsLevel";

const router: Router = Router();

router.get("/", getUsers);
router.get("/:idUser", getUser);
router.post("/", [isAuth, checkRolesExists, checkUsernameAndEmailExists, isAdmin], saveUser);
router.put("/:idUser", [isAuth, checkRolesExists,checkUsernameAndEmailExists, isAdmin], updateUser);
router.delete("/:idUser", [isAuth, checkRolesExists, isSuperAdmin, isAdmin], deleteUser);

export default router;
