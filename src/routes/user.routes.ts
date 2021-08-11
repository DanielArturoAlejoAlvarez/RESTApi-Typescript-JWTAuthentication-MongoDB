import { Router } from "express";
import { isAuth } from "../middlewares/verifyToken";
import { getUser, getUsers, saveUser } from "../controllers/users.controller";
import { checkRolesExists } from "../middlewares/checkSignUp";
import { isAdmin, isSuperAdmin } from "../middlewares/permissionsLevel";

const router: Router = Router();

router.get("/", getUsers);
router.get("/:idUser", getUser);
router.post("/", [isAuth, checkRolesExists, isSuperAdmin, isAdmin], saveUser);

export default router;
