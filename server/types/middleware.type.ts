import { IUser } from "./model.type";

export interface IDecodedToken {
	id: string;
	user: IUser;
	iat: number;
	exp: number;
}
