class ApiFeatures {
	query = {} as any;
	queryString = {} as any;
	constructor(query: any, queryString: Object) {
		this.query = query;
		this.queryString = queryString;
	}

	search() {
		const item = this.queryString?.item
			? {
					name: {
						$regex: this.queryString.item,
						$options: "i",
					},
			  }
			: {};

		this.query = this.query.find({ ...item });
		return this;
	}

	filter() {
		const tempQuery = { ...this.queryString };
		const removeFields = ["item", "page", "limit"];
		removeFields.forEach(field => delete tempQuery[field]);

		let queryStr = JSON.stringify(tempQuery);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	pagination(resultPerPage: number) {
		const currentPage = Number(this.queryString?.page) || 1;
		const skip = resultPerPage * (currentPage - 1);

		this.query = this.query.limit(resultPerPage).skip(skip);
		return this;
	}
}

export default ApiFeatures;
