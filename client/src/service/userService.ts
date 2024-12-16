import { AxiosResponse } from "axios";
import API from "./API";

export interface PayloadRegister {
  name: string;
  username: string;
  preferred_timezone: string;
}
const userServices = {
  login: (payload: { username: string }): Promise<AxiosResponse> => {
    return API().post("/users/login", payload);
  },
  register: (payload: PayloadRegister): Promise<AxiosResponse> => {
    return API().post("/users/register", payload);
  },
};

export default userServices;
