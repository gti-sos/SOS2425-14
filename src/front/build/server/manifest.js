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
		client: {start:"_app/immutable/entry/start.PxXSKmmI.js",app:"_app/immutable/entry/app.ubzYngOD.js",imports:["_app/immutable/entry/start.PxXSKmmI.js","_app/immutable/chunks/DLwjlRFA.js","_app/immutable/chunks/BaMWEeME.js","_app/immutable/chunks/D71RAph_.js","_app/immutable/chunks/C8OUaCOK.js","_app/immutable/entry/app.ubzYngOD.js","_app/immutable/chunks/BaMWEeME.js","_app/immutable/chunks/rnFZeDME.js","_app/immutable/chunks/ClsRt7R4.js","_app/immutable/chunks/DT8wYXko.js","_app/immutable/chunks/_I-LaDUW.js","_app/immutable/chunks/CQXpAjan.js","_app/immutable/chunks/D71RAph_.js","_app/immutable/chunks/C8OUaCOK.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BVoqA1V2.js')),
			__memo(() => import('./chunks/1-B54KOdgd.js')),
			__memo(() => import('./chunks/2--UDtV9-G.js')),
			__memo(() => import('./chunks/3-D_u92tqz.js')),
			__memo(() => import('./chunks/4-Dmst2LY4.js')),
			__memo(() => import('./chunks/5-BXEqJzWJ.js')),
			__memo(() => import('./chunks/6-Bn2JnzMK.js')),
			__memo(() => import('./chunks/7-C6WnFPgb.js')),
			__memo(() => import('./chunks/8-Cakf8AWr.js')),
			__memo(() => import('./chunks/9-cji98yn6.js')),
			__memo(() => import('./chunks/10-CBL0GjcF.js')),
			__memo(() => import('./chunks/11-iCbYWMvA.js')),
			__memo(() => import('./chunks/12-e-siH1wj.js')),
			__memo(() => import('./chunks/13-3hz4hVMk.js')),
			__memo(() => import('./chunks/14-C-2lvJjB.js'))
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
				id: "/analytics",
				pattern: /^\/analytics\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/cybercrime",
				pattern: /^\/cybercrime\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/cybercrime/edit/[autonomous_community]/[year]",
				pattern: /^\/cybercrime\/edit\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"autonomous_community","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/education-graph",
				pattern: /^\/education-graph\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/education",
				pattern: /^\/education\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/education/edit/[autonomous_community]/[year]",
				pattern: /^\/education\/edit\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"autonomous_community","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/employment-graph",
				pattern: /^\/employment-graph\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/employment",
				pattern: /^\/employment\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/employment/edit/[autonomous_community]/[year]/[education_level]",
				pattern: /^\/employment\/edit\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"autonomous_community","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false},{"name":"education_level","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/integrations",
				pattern: /^\/integrations\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/integrations/jaime",
				pattern: /^\/integrations\/jaime\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
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
