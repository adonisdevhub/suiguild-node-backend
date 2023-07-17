import express, { Request, Response } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import { SuccessResponse, SuccessMsgResponse } from '../../core/ApiResponse';

const router = express.Router();

router.post('/create_reply', asyncHandler(async (req: Request, res: Response)=> {
    
}));

router.get('/get_replies', asyncHandler(async (req: Request, res: Response)=> {
    
}));

export default router;