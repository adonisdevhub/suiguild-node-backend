import User, { UserModel } from "../model/User";
import {
  JsonRpcProvider,
  TransactionBlock,
  testnetConnection,
} from "@mysten/sui.js";
import {
  ZERO_ADDRESS,
  getReturnValuesFromInspectResults,
} from "@interest-protocol/sui-amm-sdk";
import { BCS, getSuiMoveConfig } from "@mysten/bcs";
import { PACKAGE_ID, PROFILE_STORE } from "../../config";

const bcs = new BCS(getSuiMoveConfig());
const provider = new JsonRpcProvider(testnetConnection);
const txb = new TransactionBlock();

bcs.registerStructType("Url", {
  url: BCS.STRING,
});

bcs.registerEnumType("Option<T>", {
  none: null,
  some: "T",
});

bcs.registerStructType("GilderProfile", {
  id: BCS.ADDRESS,
  avatar: "Option<Url>",
  cover_image: "Option<Url>",
  name: `Option<${BCS.STRING}>`,
  display_name: `Option<${BCS.STRING}>`,
  email: `Option<${BCS.STRING}>`,
  bio: `Option<${BCS.STRING}>`,
  nation: `Option<${BCS.STRING}>`,
  language: `Option<${BCS.STRING}>`,
  website: `Option<${BCS.STRING}>`,
});

async function getInfo(address: string): Promise<User | null> {
  return UserModel.findOne({ address: address });
}

async function existsNickName(nickName: string): Promise<boolean> {
  const user = await UserModel.exists({ displayName: nickName });
  return user !== null && user !== undefined;
}

async function existsEmail(email: string): Promise<boolean> {
  const user = await UserModel.exists({ email: email });
  return user !== null && user !== undefined;
}

async function updateUser(address: string): Promise<void> {
  txb.moveCall({
    target: `${PACKAGE_ID}::profile::get_personal_info`,
    arguments: [txb.object(PROFILE_STORE), txb.pure(address)],
  });

  const result = await provider.devInspectTransactionBlock({
    transactionBlock: txb,
    sender: ZERO_ADDRESS,
  });

  const r = getReturnValuesFromInspectResults(result);
  if (r) {
    const user = bcs.de("GilderProfile", Uint8Array.from(r[0][0]));
    console.log(user);
    UserModel.findOne({ address: address }).then((exist) => {
      const current = Date.now();
      console.log(current);
      if (exist == null) {
        UserModel.create({
          address: address,
          avatar: user.avatar.some.url,
          cover: user.cover_image.some.url,
          name: user.name.some,
          displayName: user.display_name.some,
          email: user.email.some,
          bio: user.bio.some,
          nation: user.nation.some,
          lang: user.language.some,
          website: user.website.some,
          createdAt: Date.now(),
        });
      } else {
        UserModel.findOneAndUpdate(
          { address: address },
          {
            $set: {
              avatar: user.avatar.some.url,
              cover: user.cover_image.some.url,
              name: user.name.some,
              displayName: user.display_name.some,
              email: user.email.some,
              bio: user.bio.some,
              nation: user.nation.some,
              lang: user.language.some,
              website: user.website.some,
              updatedAt: Date.now(),
            },
          }
        )
          .lean()
          .exec();
      }
    });
  }
}

export default {
  getInfo,
  existsNickName,
  existsEmail,
  updateUser,
};
