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
		client: {start:"_app/immutable/entry/start.DcVlZ7Dg.js",app:"_app/immutable/entry/app.-4ZbH9QM.js",imports:["_app/immutable/entry/start.DcVlZ7Dg.js","_app/immutable/chunks/DiWoTeV4.js","_app/immutable/chunks/UhFziN8V.js","_app/immutable/chunks/D-IH1sAi.js","_app/immutable/entry/app.-4ZbH9QM.js","_app/immutable/chunks/UhFziN8V.js","_app/immutable/chunks/-BXE7098.js","_app/immutable/chunks/DPAxXt5P.js","_app/immutable/chunks/Dv-5-jWs.js","_app/immutable/chunks/o-NSeyhv.js","_app/immutable/chunks/CSo_blNX.js","_app/immutable/chunks/D-IH1sAi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-B2gYoJwI.js')),
			__memo(() => import('./chunks/1-DB0VXEOF.js')),
			__memo(() => import('./chunks/2-jxRxrQWH.js')),
			__memo(() => import('./chunks/3-OghpW_N_.js')),
			__memo(() => import('./chunks/4-BK1woyja.js')),
			__memo(() => import('./chunks/5-CSU_O8Ir.js')),
			__memo(() => import('./chunks/6-UjJHGgao.js')),
			__memo(() => import('./chunks/7-CyiG06-r.js')),
			__memo(() => import('./chunks/8-DSqj9jrC.js')),
			__memo(() => import('./chunks/9-ioOxxBqo.js'))
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
