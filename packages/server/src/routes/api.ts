import express from "express";
import { authenticateUser } from "./auth";
import playerRouter from "./players";

const router = express.Router();

// all routes under this router require authentication
router.use(authenticateUser);

router.use("/players", playerRouter);

export default router;