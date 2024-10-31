// ** JWT import
import * as jose from "jose";
import { Cookies } from "react-cookie";

// ** Mock Adapter
import mock from "src/_fake-db/mock";

// ** Default AuthConfig
import defaultAuthConfig from "src/configs/auth";

// ** Types
import { UserDataType } from "src/context/context.types";

type ResponseType = [number, { [key: string]: any }];

const users: UserDataType[] = [
  {
    id: 1,
    password: "user123",
    email: "user@creainc.com",
  },
];

// ** JWT Config
// ! These two secrets should be in .env file.
const jwtConfig = {
  secret: new TextEncoder().encode(process.env.REACT_APP_PUBLIC_JWT_SECRET!),
  expirationTime: process.env.REACT_APP_PUBLIC_JWT_EXPIRATION!,
  issuer: process.env.REACT_APP_PUBLIC_JWT_ISSUER!,
  audience: process.env.REACT_APP_PUBLIC_JWT_AUDIENCE!,
};

const sign = (payload: any) => {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setIssuer(jwtConfig.issuer)
    .setAudience(jwtConfig.audience)
    .setExpirationTime(jwtConfig.expirationTime)
    .sign(jwtConfig.secret);
};

const verify = (token: string) => {
  //TODO: Implement this
  return new Promise<any>((resolve) => {
    resolve({
      payload: {
        id: 1,
      },
    });
  });
  // return jose.jwtVerify(token, jwtConfig.secret, {
  //   issuer: jwtConfig.issuer,
  //   audience: jwtConfig.audience,
  // });
};

const decode = (token: string) => {
  return jose.decodeJwt(token);
};

mock.onPost(defaultAuthConfig.loginEndpoint).reply(async (request) => {
  const { email, password } = JSON.parse(request.data);

  let error = {
    email: ["Something went wrong"],
  };

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    const accessToken = await sign({ id: user.id });

    const response = {
      accessToken,
      userData: { ...user, password: undefined },
    };

    return [200, response];
  } else {
    error = {
      email: ["email or Password is Invalid"],
    };

    return [400, { error }];
  }
});

mock.onGet(defaultAuthConfig.meEndpoint).reply(async (config) => {
  // @ts-ignore
  const token = config.headers.Authorization as string;
  const cookie = new Cookies();

  // ** Default response
  let response: ResponseType = [200, {}];

  try {
    const decoded = await verify(token);
    const userId = decoded.payload.id;

    const user = users.find((u) => u.id === userId);

    response = [200, { userData: { ...user, password: undefined } }];
  } catch (error) {
    console.log("🚀 ~ file: jwt.ts:118 ~ mock.onGet ~ err", error);

    if (defaultAuthConfig.onTokenExpiration === "logout") {
      response = [401, { error: { error: "Invalid User" } }];
    } else {
      const oldDecodedToken = decode(token);

      const id = oldDecodedToken.id;

      const user = users.find((u) => u.id === id);

      const accessToken = await sign({ id });

      cookie.set(defaultAuthConfig.storageTokenKeyName, accessToken);

      const obj = { userData: { ...user, password: undefined } };

      response = [200, obj];
    }
  }

  return response;
});
