import { AxiosResponse } from "axios";
import API from "./API";

export type APIResponse = {
  message: string;
  status: string;
};

export type Appointment = {
  title: string;
  withName: string;
  start: Date;
  end: Date;
};

const AppointmentServices = {
  getAppointMents: (): Promise<
    AxiosResponse<APIResponse & { data: Appointment[] }>
  > => {
    return API().get("/appointments/list");
  },
  createAppointMent: (
    payload: Appointment & { with_user_id: number }
  ): Promise<AxiosResponse<APIResponse>> => {
    return API().post("/appointments", payload);
  },
};

export default AppointmentServices;
