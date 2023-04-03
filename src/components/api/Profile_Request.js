import { Post, Get, Put, Delete } from "./Server_Request";

export const ProfileGetRequest = async (data) => {
  return await Get({ url: "api/profiles" }, data);
};
