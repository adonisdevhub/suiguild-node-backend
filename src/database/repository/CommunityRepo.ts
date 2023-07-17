import Community, { CommunityModel } from "../model/Community";

async function exists(title: string): Promise<boolean> {
  const community = await CommunityModel.exists({ title: title });
  return community !== null && community !== undefined;
}

async function createCommunity(community: Community): Promise<void> {
  const comm = await CommunityModel.create(community);
  console.log(comm)
}

async function getAllCommunities(): Promise<Community[]> {
  return CommunityModel.find();
}

async function getTrendingCommunities(): Promise<Community[]> {
  return CommunityModel.find({ postCnt:{ $gt: 0 } }).sort({ followingCnt: 1 }).limit(5);
}

export default {
  exists,
  createCommunity,
  getAllCommunities,
  getTrendingCommunities
}