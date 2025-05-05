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
		client: {start:"_app/immutable/entry/start.C6_jqTUl.js",app:"_app/immutable/entry/app.CHWM3N3b.js",imports:["_app/immutable/entry/start.C6_jqTUl.js","_app/immutable/chunks/nMuzWX3t.js","_app/immutable/chunks/mo2ikcES.js","_app/immutable/chunks/BTLwrUpF.js","_app/immutable/chunks/71C4m3Rj.js","_app/immutable/entry/app.CHWM3N3b.js","_app/immutable/chunks/mo2ikcES.js","_app/immutable/chunks/B77rumEH.js","_app/immutable/chunks/C41bWG8Z.js","_app/immutable/chunks/B3qMGVQT.js","_app/immutable/chunks/B0zZURH1.js","_app/immutable/chunks/0gMdZzAC.js","_app/immutable/chunks/BTLwrUpF.js","_app/immutable/chunks/71C4m3Rj.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DdkFWz1u.js')),
			__memo(() => import('./chunks/1-zfqUhe3k.js')),
			__memo(() => import('./chunks/2-D_n5TIKO.js')),
			__memo(() => import('./chunks/3-xXGWji5y.js')),
			__memo(() => import('./chunks/4-DNpcR8uS.js')),
			__memo(() => import('./chunks/5-S-NFPzBx.js')),
			__memo(() => import('./chunks/6-bVch3OYS.js')),
			__memo(() => import('./chunks/7-DOm_UMJD.js')),
			__memo(() => import('./chunks/8-NkyWyCxI.js')),
			__memo(() => import('./chunks/9-PVwKOx3Q.js')),
			__memo(() => import('./chunks/10-BqegFT8U.js')),
			__memo(() => import('./chunks/11-ei4YvegF.js')),
			__memo(() => import('./chunks/12-CpEyc3F3.js'))
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
