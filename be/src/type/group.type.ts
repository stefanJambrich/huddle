import { IUser } from './user.type';

export interface IGroup {
    id: number;
    name: string;
    users?: Array<IUser>
}