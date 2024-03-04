import {RequestI} from "../request/request.interface";

export interface UserI {
  id: number;
  role: string;
  email: string;
  password: string;
  messages: RequestI[]
}
