import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils";

const authorizeRoles = (...roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!roles.includes(res.locals.user.role)) {
			return next(new ErrorHandler("You are not allowed to perform this action", 403));
		}

		next();
	};
};

export default authorizeRoles;
