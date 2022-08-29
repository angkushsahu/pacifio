export interface IContact {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export interface ISignUp {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	pic: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface IResetPassword {
	password: string;
	confirmPassword: string;
}

export interface IUpdateAccount {
	name: string;
	email: string;
	pic: string;
}
