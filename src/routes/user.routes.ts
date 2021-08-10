import { Router } from "express";
import { getUser, getUsers } from "../controllers/users.comtroller";

const router: Router = Router();

router.get("/", getUsers);
router.get("/:idUser", getUser);

export default router;
