const Route = require('@core/abstract_routes/route');

class ApiRoute extends Route {
	constructor(additionalRoutes) {
		const routes = [
			...additionalRoutes
		]
		super(routes);
	}

	docData() {
		console.warn("WARN: ApiRoute virtual `docData()` called. Provide your documentation definition by implementing `docData()` on your ApiRoute subclass.")
	}
}

module.exports = ApiRoute;