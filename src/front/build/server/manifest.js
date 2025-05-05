const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/crime_data.webp","images/enrollment_data.jpg","images/labor_data.jpg"]),
	mimeTypes: {".png":"image/png",".webp":"image/webp",".jpg":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.X_hwSnkI.js",app:"_app/immutable/entry/app.COOk4GH3.js",imports:["_app/immutable/entry/start.X_hwSnkI.js","_app/immutable/chunks/9_0LQjj_.js","_app/immutable/chunks/DqzT7aWf.js","_app/immutable/chunks/CB1d58Jo.js","_app/immutable/chunks/S0sOL0db.js","_app/immutable/entry/app.COOk4GH3.js","_app/immutable/chunks/DqzT7aWf.js","_app/immutable/chunks/BjFHoynf.js","_app/immutable/chunks/AwDElgrE.js","_app/immutable/chunks/dUYLJQ_5.js","_app/immutable/chunks/DOsWdp3o.js","_app/immutable/chunks/CW2Z7qG6.js","_app/immutable/chunks/CB1d58Jo.js","_app/immutable/chunks/S0sOL0db.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-D0E4gSBK.js')),
			__memo(() => import('./chunks/1-DJ8G7GoF.js')),
			__memo(() => import('./chunks/2-CS6AUeuI.js')),
			__memo(() => import('./chunks/3-BrZ_NBhl.js')),
			__memo(() => import('./chunks/4-CGMinxgT.js')),
			__memo(() => import('./chunks/5-CY9XlM-8.js')),
			__memo(() => import('./chunks/6-DDbKCv_z.js')),
			__memo(() => import('./chunks/7-AeHMYpeF.js')),
			__memo(() => import('./chunks/8-DwBabxOt.js')),
			__memo(() => import('./chunks/9-C0hv89RJ.js')),
			__memo(() => import('./chunks/10-CtAp4nAp.js')),
			__memo(() => import('./chunks/11-3UJxXyM8.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/cybercrime",
				pattern: /^\/cybercrime\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/cybercrime/edit/[autonomous_community]/[year]",
				pattern: /^\/cybercrime\/edit\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"autonomous_community","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/education",
				pattern: /^\/education\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/education/edit/[autonomous_community]/[year]",
				pattern: /^\/education\/edit\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"autonomous_community","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/employment-graph",
				pattern: /^\/employment-graph\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/employment",
				pattern: /^\/employment\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/employment/edit/[autonomous_community]/[year]/[education_level]",
				pattern: /^\/employment\/edit\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"autonomous_community","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false},{"name":"education_level","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/integrations",
				pattern: /^\/integrations\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
