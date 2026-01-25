import { Router } from "express";
import { updateUser } from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.patch("/me", protectedRoute, updateUser);

export default router;
