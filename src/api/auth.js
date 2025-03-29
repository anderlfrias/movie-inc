import { apiRequest } from ".";

export async function createRequestToken() {
  return await apiRequest({
    path: "/authentication/token/new",
  });
}

export async function createGuestSession() {
  return await apiRequest({
    path: "/authentication/guest_session/new",
  });
}
