import { Post, PostRequest, Get, Put, Delete } from "./Server_Request";

export const LoginRequest = async (data) => {
  return await PostRequest({ url: "api/auth/signin" }, data);
};

export const RegisterRequest = async (data) => {
  return await Post({ url: "api/auth/signup" }, data);
};

export const LogoutRequest = async (data) => {
  return await Put({ url: "/auth/logout" }, data);
};
