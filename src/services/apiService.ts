import axios from "axios";

export const createUser = async (token: string) => {
  try {
    const response = await axios.post("http://localhost:3001/users/", null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const validateUserExists = async (token: string) => {
  try {
    const response = await axios.get("http://localhost:3001/users/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByUid = async (token: string) => {
  try {
    const response = await axios.get("http://localhost:3001/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

   return response.data;
  } catch (error) {
    console.log(error);
  }
};
