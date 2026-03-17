import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as commentController from '../controllers/commentController';

const router = Router();
// POST /api/comments/:productId => create comment (protected)
router.post('/:productId', requireAuth(), commentController.createComment);
 
// DELETE /api/comments/:commentId => delete comment (protected - only owner)
router.delete('/:commentId', requireAuth(), commentController.deleteComment);



export default router; 