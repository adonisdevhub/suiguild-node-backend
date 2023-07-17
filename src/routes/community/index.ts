import express, { Request, Response } from 'express';
import asyncHandler from '../../helpers/asyncHandler';
import { SuccessResponse, SuccessMsgResponse } from '../../core/ApiResponse';
import CommunityRepo from '../../database/repository/CommunityRepo';

const router = express.Router();

router.post('/', asyncHandler(async (req: Request, res: Response)=> {
  await CommunityRepo.createCommunity(req.body);
  return new SuccessMsgResponse('A new community created successfully!').send(res);
}));

router.get('/get_all_communities', asyncHandler(async (req: Request, res: Response) => {
  const communities = await CommunityRepo.getAllCommunities();
  return new SuccessResponse('All communities', communities).send(res);
}));

router.get('/get_trending_communities', asyncHandler(async (req: Request, res: Response) => {
  const communities = await CommunityRepo.getTrendingCommunities();
  return new SuccessResponse('Trending communities', communities).send(res);
}))

export default router;