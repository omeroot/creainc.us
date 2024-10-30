const authConfig = {
  meEndpoint: "/v1/auth/me",
  loginEndpoint: "/v1/auth/login",
  onTokenExpiration: "logout", // logout | refreshToken
  storageTokenKeyName: "auth.accessToken",
};

export default authConfig;
