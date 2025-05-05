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
		client: {start:"_app/immutable/entry/start.DdW3seDR.js",app:"_app/immutable/entry/app.CfzH6m3q.js",imports:["_app/immutable/entry/start.DdW3seDR.js","_app/immutable/chunks/BNKqdnSx.js","_app/immutable/chunks/mo2ikcES.js","_app/immutable/chunks/BTLwrUpF.js","_app/immutable/chunks/71C4m3Rj.js","_app/immutable/entry/app.CfzH6m3q.js","_app/immutable/chunks/mo2ikcES.js","_app/immutable/chunks/B77rumEH.js","_app/immutable/chunks/C41bWG8Z.js","_app/immutable/chunks/B3qMGVQT.js","_app/immutable/chunks/B0zZURH1.js","_app/immutable/chunks/0gMdZzAC.js","_app/immutable/chunks/BTLwrUpF.js","_app/immutable/chunks/71C4m3Rj.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-Cs3K7wzg.js')),
			__memo(() => import('./chunks/1-DbJQn68p.js')),
			__memo(() => import('./chunks/2-D_n5TIKO.js')),
			__memo(() => import('./chunks/3-xXGWji5y.js')),
			__memo(() => import('./chunks/4-Ch5X1BKq.js')),
			__memo(() => import('./chunks/5-DN7jtZ3w.js')),
			__memo(() => import('./chunks/6--zV0jqbh.js')),
			__memo(() => import('./chunks/7-DP-lKMUL.js')),
			__memo(() => import('./chunks/8-B_p-vGSS.js')),
			__memo(() => import('./chunks/9-DSUl2fPn.js')),
			__memo(() => import('./chunks/10-CFr4xzEM.js')),
			__memo(() => import('./chunks/11-t30K1QKE.js')),
			__memo(() => import('./chunks/12-BncEaMhW.js')),
			__memo(() => import('./chunks/13-DMlXBLhe.js'))
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
