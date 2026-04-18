import { Router } from "express";
import { syncUser, updatePhoneNumber } from "../controllers/userController";
import { requireAuth } from "@clerk/express";

const router = Router();


// /api/users/sync - sync users from clerk to our database (protected)
router.post('/sync', requireAuth(),syncUser)


// /api/users/phone
router.put('/phone', requireAuth(), updatePhoneNumber);
 
  

export default router;  