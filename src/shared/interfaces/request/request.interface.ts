import {UserI} from "../user/user.interface";

export interface RequestI {
  id: number;
  text: string;
  isRead: boolean
  dateOfCreation: Date
  isAdminRequest: boolean
  user: UserI
}
