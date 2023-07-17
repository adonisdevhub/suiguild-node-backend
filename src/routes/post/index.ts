import express, { Request, Response } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import { SuccessResponse, SuccessMsgResponse } from '../../core/ApiResponse';

const router = express.Router();

router.post('/create_post', asyncHandler(async (req: Request, res: Response)=> {
    
}));

router.post('/create_comment', asyncHandler(async (req: Request, res: Response)=> {
    
}));

router.get('/get_posts', asyncHandler(async (req: Request, res: Response) => {
  
}));

router.get('/get_trending_posts', asyncHandler(async (req: Request, res: Response) => {
  
}));
  
router.get('/get_replies', asyncHandler(async (req: Request, res: Response) => {
  
}));

export default router;