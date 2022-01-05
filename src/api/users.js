import { ApiCore } from './utilities/core';

const urlUsers = 'users';
const urlCorp = 'check/corp-email';
const urlCreds = 'check';
const urlConfirm = 'confirm/google';
const urlAuth = 'auth';

export const apiUsers = new ApiCore({
  getGoogle: true,
  postAuth: true,
  postCreds: true,
  postCorp: true,
  url: urlUsers,
  id: urlCorp,
  id2: urlCreds,
  id3: urlConfirm,
  id4: urlAuth,
});
