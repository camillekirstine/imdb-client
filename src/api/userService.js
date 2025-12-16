import backend from "./backendClient";

export const userService = {
  getProfile: () => backend.get("/Auth/me"),

  updateProfile: ({ fullName, email, avatar }) => {
    const form = new FormData();
    if (fullName) form.append("fullName", fullName);
    if (email) form.append("email", email);
    if (avatar) form.append("avatar", avatar);
  
    return backend.put("/Auth/profile", form);
  },
  

  updatePassword: ({ currentPassword, newPassword }) =>
    backend.put("/Auth/password", {
      currentPassword,
      newPassword,
    }),

  updateEmail: (email) =>
    backend.put("/Auth/email", { email }),

  getBookmarks: () => backend.get("/Bookmarks"),
  getRatings: () => backend.get("/Ratings/user"),
  getSearchHistory: ({ page, pageSize }) =>
    backend.get("/SearchHistory", { params: { page, pageSize } }),
};
