import { AxiosResponse } from "axios";
import API from "./API";

type APIResponse = {
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
};

export default AppointmentServices;
