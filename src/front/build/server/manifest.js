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
		client: {start:"_app/immutable/entry/start.CJCNzhIH.js",app:"_app/immutable/entry/app.DkwzAQqK.js",imports:["_app/immutable/entry/start.CJCNzhIH.js","_app/immutable/chunks/DKwB5Sk6.js","_app/immutable/chunks/B9KnJm2w.js","_app/immutable/chunks/BiU55LNS.js","_app/immutable/chunks/BKuOihLL.js","_app/immutable/entry/app.DkwzAQqK.js","_app/immutable/chunks/B9KnJm2w.js","_app/immutable/chunks/b-klYKnl.js","_app/immutable/chunks/CcBKTLYU.js","_app/immutable/chunks/DRx51zI4.js","_app/immutable/chunks/C-71lY44.js","_app/immutable/chunks/CEZ9NSaU.js","_app/immutable/chunks/BiU55LNS.js","_app/immutable/chunks/BKuOihLL.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BIqt-XIF.js')),
			__memo(() => import('./chunks/1-gSk-u5wH.js')),
			__memo(() => import('./chunks/2-qOELPKUD.js')),
			__memo(() => import('./chunks/3-CPHRCzhU.js')),
			__memo(() => import('./chunks/4-C_qiCV24.js')),
			__memo(() => import('./chunks/5-CI5YA2Tr.js')),
			__memo(() => import('./chunks/6-DibKHl38.js')),
			__memo(() => import('./chunks/7-BoQ-zESX.js')),
			__memo(() => import('./chunks/8-CdWKJXQZ.js')),
			__memo(() => import('./chunks/9-BUz_jBM7.js')),
			__memo(() => import('./chunks/10-CcPhlCnq.js')),
			__memo(() => import('./chunks/11-B-i6Gv5E.js')),
			__memo(() => import('./chunks/12-C0IZJzs5.js')),
			__memo(() => import('./chunks/13-DB4pcjSF.js')),
			__memo(() => import('./chunks/14-BmaFa9u_.js')),
			__memo(() => import('./chunks/15-B6bVeiey.js'))
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
				id: "/api/aemet",
				pattern: /^\/api\/aemet\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DkPu3l0z.js'))
			},
			{
				id: "/api/g15",
				pattern: /^\/api\/g15\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DjlrUhJS.js'))
			},
			{
				id: "/api/nasa",
				pattern: /^\/api\/nasa\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-QujSquKU.js'))
			},
			{
				id: "/api/openweather",
				pattern: /^\/api\/openweather\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Buuh8X6M.js'))
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
				id: "/integrations/fran",
				pattern: /^\/integrations\/fran\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/integrations/jaime",
				pattern: /^\/integrations\/jaime\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
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
