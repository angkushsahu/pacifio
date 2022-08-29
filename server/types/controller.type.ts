export interface ISignup {
	name: string;
	email: string;
	password: string;
	pic: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface IUpdateUser {
	name: string;
	email: string;
	pic: string;
}

export interface IReviewRequestBody {
	productId: string;
	rating: number;
	message: string;
}
