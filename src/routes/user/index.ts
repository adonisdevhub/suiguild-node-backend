import express, { Request, Response } from "express";
import asyncHandler from "../../helpers/asyncHandler";
import { SuccessResponse, SuccessMsgResponse } from "../../core/ApiResponse";
import UserRepo from "../../database/repository/UserRepo";

const router = express.Router();

router.get(
  "/get_info",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserRepo.getInfo(req.query.address as string);
    return new SuccessResponse("User", user).send(res);
  })
);

router.get(
  "/exist_email",
  asyncHandler(async (req: Request, res: Response) => {
    console.log(req.query.email);
    const email = await UserRepo.existsEmail(req.query.email as string);
    return new SuccessResponse("Validate", email).send(res);
  })
);

router.post(
  "/exist_nickname",
  asyncHandler(async (req: Request, res: Response) => {
    const nickName = await UserRepo.existsNickName(req.body.nickName);
    return new SuccessResponse("Validate", nickName).send(res);
  })
);

export default router;
