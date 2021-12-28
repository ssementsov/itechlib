import { ApiCore } from "./utilities/core";

const urlUsers = "users";
const urlCorp = "check/corp-email";
const urlCreds = "check";
const urlConfirm = "confirm/google";

export const apiUsers = new ApiCore({
  getGoogle: true,
  post: true,
  postCreds: true,
  postCorp: true,
  url: urlUsers,
  id: urlCorp,
  id2: urlCreds,
  id3: urlConfirm,
});
