import { Router } from "express";
import { getUser, getUsers } from "../controllers/users.comtroller";
import { isAuth } from "../middlewares/verifyToken";

const router: Router = Router();

router.get("/", getUsers);
router.get("/:idUser", getUser);

export default router;
