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
		client: {start:"_app/immutable/entry/start.QeOw-Lmm.js",app:"_app/immutable/entry/app.jfgz7nZn.js",imports:["_app/immutable/entry/start.QeOw-Lmm.js","_app/immutable/chunks/DIK3C3aQ.js","_app/immutable/chunks/B9KnJm2w.js","_app/immutable/chunks/BiU55LNS.js","_app/immutable/chunks/BKuOihLL.js","_app/immutable/entry/app.jfgz7nZn.js","_app/immutable/chunks/B9KnJm2w.js","_app/immutable/chunks/b-klYKnl.js","_app/immutable/chunks/CcBKTLYU.js","_app/immutable/chunks/DRx51zI4.js","_app/immutable/chunks/C-71lY44.js","_app/immutable/chunks/CEZ9NSaU.js","_app/immutable/chunks/BiU55LNS.js","_app/immutable/chunks/BKuOihLL.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0--MTUI_gs.js')),
			__memo(() => import('./chunks/1-DxWTFhxa.js')),
			__memo(() => import('./chunks/2-BzvEsYW8.js')),
			__memo(() => import('./chunks/3-jSryeXPa.js')),
			__memo(() => import('./chunks/4-B07TFaLR.js')),
			__memo(() => import('./chunks/5-DgNMseNy.js')),
			__memo(() => import('./chunks/6-iMgOeqaI.js')),
			__memo(() => import('./chunks/7-CRYj6u7K.js')),
			__memo(() => import('./chunks/8-DN9IfuFZ.js')),
			__memo(() => import('./chunks/9-Dd_FbpUN.js')),
			__memo(() => import('./chunks/10-BFHFAowf.js')),
			__memo(() => import('./chunks/11-BsKrMrw9.js')),
			__memo(() => import('./chunks/12-D9eqG8OD.js')),
			__memo(() => import('./chunks/13-zWt05U-G.js')),
			__memo(() => import('./chunks/14-DVx3O3Kk.js')),
			__memo(() => import('./chunks/15-BQowyNvP.js')),
			__memo(() => import('./chunks/16-YA1Lb2V9.js')),
			__memo(() => import('./chunks/17-C_AP6GZy.js'))
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
				id: "/api/g15precipitation",
				pattern: /^\/api\/g15precipitation\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-D3YymV2S.js'))
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
				id: "/api/newsapi",
				pattern: /^\/api\/newsapi\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-CDTUelUw.js'))
			},
			{
				id: "/api/openweather",
				pattern: /^\/api\/openweather\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Buuh8X6M.js'))
			},
			{
				id: "/cybercrime-graph",
				pattern: /^\/cybercrime-graph\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
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
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/education",
				pattern: /^\/education\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/education/edit/[autonomous_community]/[year]",
				pattern: /^\/education\/edit\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"autonomous_community","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/employment-graph",
				pattern: /^\/employment-graph\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/employment",
				pattern: /^\/employment\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/employment/edit/[autonomous_community]/[year]/[education_level]",
				pattern: /^\/employment\/edit\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"autonomous_community","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false},{"name":"education_level","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/integrations",
				pattern: /^\/integrations\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/integrations/fran",
				pattern: /^\/integrations\/fran\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/integrations/jaime",
				pattern: /^\/integrations\/jaime\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/integrations/pablo",
				pattern: /^\/integrations\/pablo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
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
