import { apiRequest, buildUrl } from ".";

export async function createRequestToken() {
  return await apiRequest({
    path: "/authentication/token/new",
  });
}
