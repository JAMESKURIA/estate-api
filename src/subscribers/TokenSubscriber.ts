import { AES, enc } from "crypto-js";
// import signale from "signale";

import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { RefreshToken } from "./../models/RefreshToken";

@EventSubscriber()
export class TokenSubscriber
  implements EntitySubscriberInterface<RefreshToken>
{
  listenTo() {
    return RefreshToken;
  }

  afterLoad(entity: RefreshToken) {
    // signale.log(`AFTER ENTITY LOADED: `, entity);

    const decryptedToken = AES.decrypt(
      entity.token,
      String(process.env.ENCRYPTION_KEY)
    ).toString(enc.Utf8);

    entity.token = decryptedToken;

    // signale.log("Decrypted token: ", decryptedToken);
  }

  async beforeInsert(event: InsertEvent<RefreshToken>) {
    const token: string = event.entity.token;

    const encryptedToken = AES.encrypt(
      token,
      String(process.env.ENCRYPTION_KEY)
    ).toString();

    event.entity.token = encryptedToken;
  }
}
