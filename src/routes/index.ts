import express from "express";
import community from './community';
import post from './post';
import reply from './reply';
import setting from './setting';
import user from './user';

const router = express.Router();

router.use('/community', community);
router.use('/post', post);
router.use('/reply', reply);
router.use('/user', user);

export default router;
