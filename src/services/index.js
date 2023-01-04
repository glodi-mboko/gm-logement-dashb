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
