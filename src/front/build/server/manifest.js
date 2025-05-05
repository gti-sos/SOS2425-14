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
		client: {start:"_app/immutable/entry/start.CkCH_yB-.js",app:"_app/immutable/entry/app.CYv4C8YL.js",imports:["_app/immutable/entry/start.CkCH_yB-.js","_app/immutable/chunks/DV9dEzUr.js","_app/immutable/chunks/B7Fb9UaI.js","_app/immutable/chunks/AHbVUzIP.js","_app/immutable/chunks/CdZcpzbW.js","_app/immutable/entry/app.CYv4C8YL.js","_app/immutable/chunks/B7Fb9UaI.js","_app/immutable/chunks/Bq2OTwYh.js","_app/immutable/chunks/CnxHc7CN.js","_app/immutable/chunks/CHhKVqn7.js","_app/immutable/chunks/DGYlsBAu.js","_app/immutable/chunks/Dni-b0P9.js","_app/immutable/chunks/AHbVUzIP.js","_app/immutable/chunks/CdZcpzbW.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-B3xRD6h7.js')),
			__memo(() => import('./chunks/1-Pv9Eq6hf.js')),
			__memo(() => import('./chunks/2-C7VaPRYG.js')),
			__memo(() => import('./chunks/3-CSnVxEHM.js')),
			__memo(() => import('./chunks/4-B6kwqKJV.js')),
			__memo(() => import('./chunks/5-CTrinmLw.js')),
			__memo(() => import('./chunks/6-DHLLKgcx.js')),
			__memo(() => import('./chunks/7-D6mkL0_f.js')),
			__memo(() => import('./chunks/8-eTwrx9O2.js')),
			__memo(() => import('./chunks/9-COCmYvQI.js')),
			__memo(() => import('./chunks/10-FjzmmG4r.js')),
			__memo(() => import('./chunks/11-kb1R3kGT.js'))
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
