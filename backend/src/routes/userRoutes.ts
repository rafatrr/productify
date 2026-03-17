import { Router } from "express";
import { syncUser } from "../controllers/userController";
import { requireAuth } from "@clerk/express";

const router = Router();


// /api/users/sync - sync users from clerk to our database (protected)
router.post('/sync', requireAuth(),syncUser)



 
  

export default router;  