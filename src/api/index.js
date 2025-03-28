import { API_KEY, API_URL } from "../constants";

export const buildUrl = (endpoint, params = {}) => {
  let url = `${API_URL}${endpoint}`;
  const queryParams = [`api_key=${API_KEY}`];
  Object.keys(params).forEach((key) => {
    queryParams.push(`${key}=${encodeURIComponent(params[key])}`);
  });
  return `${url}?${queryParams.join("&")}`;
};

export const apiRequest = async (options) => {
  const { path, method = "GET", body = null, params = {} } = options;

  try {
    const url = buildUrl(path, params);
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data,
        message: '',
        error: null,
      };
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: 'Error al realizar la solicitud',
      error: error,
    };
  }
}