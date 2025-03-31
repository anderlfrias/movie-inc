import { apiRequest } from ".";

export async function apiCreateRequestToken() {
  return await apiRequest({
    path: "/authentication/token/new",
  });
}

export async function apiGetRequestToken() {
  return await apiRequest({
    path: "/authentication/token/new",
  });
}

export async function apiCreateSession(requestToken) {
  return await apiRequest({
    path: "/authentication/session/new",
    method: "POST",
    body: {
      request_token: requestToken,
    },
  });
}

export async function apiGetAccountBySessionId(sessionId) {
  return await apiRequest({
    path: `/account`,
    method: "GET",
    params: {
      session_id: sessionId,
    },
  });
}
