import { API_BASE } from "../config/apiConfig";
import { authFetch } from "../utils/authFetch";

console.log("[backendClient] Using backend:", API_BASE);

const backend = {
  async get(path, options = {}) {
    const res = await authFetch(API_BASE + path, {
      method: "GET",
      ...options,
    });

    if (!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
    return res.status === 204 ? null : res.json();
  },

  async post(path, body, options = {}) {
    const isFormData = body instanceof FormData;

    const res = await authFetch(API_BASE + path, {
      method: "POST",
      headers: isFormData ? undefined : { "Content-Type": "application/json" },
      body: isFormData ? body : JSON.stringify(body),
      ...options,
    });

    if (!res.ok) throw new Error(`POST ${path} failed (${res.status})`);
    return res.status === 204 ? null : res.json();
  },

  async put(path, body, options = {}) {
    const isFormData = body instanceof FormData;

    const res = await authFetch(API_BASE + path, {
      method: "PUT",
      headers: isFormData ? undefined : { "Content-Type": "application/json" },
      body: isFormData ? body : JSON.stringify(body),
      ...options,
    });

    if (!res.ok && res.status !== 204) {
      throw new Error(`PUT ${path} failed (${res.status})`);
    }

    return res.status === 204 ? null : res.json();
  },
};

export default backend;
