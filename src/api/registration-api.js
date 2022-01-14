import { api } from './api';
import { registerEntityEndpoint } from './../common/constants/api-constants';

export const registrationUserAPI = {
  checkCorpEmail(model) {
    return api.Client.post(
      `/${registerEntityEndpoint.resource}/${registerEntityEndpoint.urlCorp}`,
      null,
      {
        params: { email: model },
      }
    );
  },

  connectTwoEmails(model) {
    return api.Client.post(
      `/${registerEntityEndpoint.resource}/${registerEntityEndpoint.urlCreds}`,
      model
    );
  },

  confirmRegistration(params) {
    return api.Client.get(
      `/${registerEntityEndpoint.resource}/${registerEntityEndpoint.urlConfirm}`,
      {
        params: params,
      }
    );
  },

  auth(bodyGoogle) {
    return api.Client.post(`/${registerEntityEndpoint.urlAuth}`, bodyGoogle);
  },
};
