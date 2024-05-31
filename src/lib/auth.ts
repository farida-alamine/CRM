import { sign, verify } from "jsonwebtoken";

export function generateJWT(username: string, password: string) {
  return sign(
    {
      username,
      password,
    },
    "QFW7fMWAesg3GoXROsHM+hrCfKBbkirnTrp9mfGOejQ=",
    {
      algorithm: "HS256",
      expiresIn: "1m",
    },
  );
}

export function verifyJWT(jwt: string) {
  try {
    verify(jwt, "QFW7fMWAesg3GoXROsHM+hrCfKBbkirnTrp9mfGOejQ=", {
      algorithm: "HS256",
    });
    return true;
  } catch (e) {
    console.log(e, "efasdfasfaeergerag");
    return false;
  }
}
