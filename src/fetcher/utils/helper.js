import crypto from "crypto";

export class Helper {
  getRandomFromArr(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  hash(str) {
    return crypto.createHash("sha256").update(str).digest("hex");
  }
}
