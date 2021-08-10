import { Router } from "express";
import {
  checkRolesExists,
  checkUsernameAndEmailExists,
} from "../middlewares/checkSignUp";
import { isAuth } from "../middlewares/verifyToken";
import { profile, signIn, signUp } from "../controllers/auth/auth.controller";

const router: Router = Router();

router.post("/signin", signIn);
router.post("/signup", [checkRolesExists, checkUsernameAndEmailExists], signUp);
router.get("/profile", isAuth, profile);

export default router;
