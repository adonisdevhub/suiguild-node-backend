import {
  JsonRpcProvider,
  testnetConnection,
  SuiEvent,
  SuiEventFilter,
} from "@mysten/sui.js";
import { PACKAGE_ID } from "../../config";
import UserRepo from "./UserRepo";

const provider = new JsonRpcProvider(testnetConnection);

async function watchForEvents(): Promise<void> {
  const filter: SuiEventFilter = {
    MoveModule: {
      package: PACKAGE_ID,
      module: "profile",
    },
  };

  const subscriber = await provider.subscribeEvent({
    filter: filter,
    async onMessage(event: SuiEvent) {
      switch (event.type) {
        case `${PACKAGE_ID}::profile::ECreateAccount`: {
          await UserRepo.updateUser(event.parsedJson?.account);
          break;
        }
      }
    },
  });
}

export default {
  watchForEvents,
};
