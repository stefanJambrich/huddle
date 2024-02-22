export type IUser = {
    id: number;
    firstname: string;
    surname: string;
    email: string;
    password: string;
    //Roles have to be redone to account for different groups, probably create roles table
    role: string;
}