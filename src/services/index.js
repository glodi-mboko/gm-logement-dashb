// eslint-disable-next-line import/no-import-module-exports
import api from "./api";

// eslint-disable-next-line import/prefer-default-export
export const getStats = async () => {
  const response = await api.get("/realEstate/stats");
  return response;
};

export const getRealEstate = async () => {
  const response = await api.get("/realEstate");
  return response;
};

export const getRealEstateForSales = async () => {
  const response = await api.get("/realEstate/for_sales");
  return response;
};

export const getRealEstateForRen = async () => {
  const response = await api.get("/realEstate/for_ren");
  return response;
};

export const signIn = async (user) => {
  const response = await api.post("/auth/login", user);
  return response;
};

export const signUp = async (newUser) => {
  const response = await api.post("/auth/signup", newUser);
  return response;
};
