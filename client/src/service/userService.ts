import { AxiosResponse } from "axios";
import API from "./API";
import { APIResponse } from "./appointmentServices";

export interface PayloadRegister {
  name: string;
  username: string;
  preferred_timezone: string;
}

export type DropdownOption = {
  id: number;
  username: string;
  preferred_timezone: string;
};
const userServices = {
  login: (payload: { username: string }): Promise<AxiosResponse> => {
    return API().post("/users/login", payload);
  },
  register: (payload: PayloadRegister): Promise<AxiosResponse> => {
    return API().post("/users/register", payload);
  },
  getDropdownOptions: (): Promise<
    AxiosResponse<APIResponse & { data: DropdownOption[] }>
  > => {
    return API().get("/users/timezone");
  },
};

export default userServices;
