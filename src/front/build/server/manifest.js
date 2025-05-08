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
		client: {start:"_app/immutable/entry/start.sQjL5Hld.js",app:"_app/immutable/entry/app.B2bGcK9O.js",imports:["_app/immutable/entry/start.sQjL5Hld.js","_app/immutable/chunks/CDmGmuv6.js","_app/immutable/chunks/CpQaROA0.js","_app/immutable/chunks/BGUR6pdq.js","_app/immutable/chunks/BXqaL1Zo.js","_app/immutable/entry/app.B2bGcK9O.js","_app/immutable/chunks/CpQaROA0.js","_app/immutable/chunks/D1bc0aDY.js","_app/immutable/chunks/BgiXASfF.js","_app/immutable/chunks/D1Iy4rpg.js","_app/immutable/chunks/DoZVsEKz.js","_app/immutable/chunks/CiueXfto.js","_app/immutable/chunks/BGUR6pdq.js","_app/immutable/chunks/BXqaL1Zo.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DnYRdvuK.js')),
			__memo(() => import('./chunks/1-D7NU9IEm.js')),
			__memo(() => import('./chunks/2-BMGt7CPw.js')),
			__memo(() => import('./chunks/3-Clar_Oxq.js')),
			__memo(() => import('./chunks/4-2UqykP7G.js')),
			__memo(() => import('./chunks/5-CGyCOrhu.js')),
			__memo(() => import('./chunks/6-BZVyP30M.js')),
			__memo(() => import('./chunks/7-CZeTaVUQ.js')),
			__memo(() => import('./chunks/8-bRNxCKJ4.js')),
			__memo(() => import('./chunks/9-CIJA6Op-.js')),
			__memo(() => import('./chunks/10-Cy3FdHGn.js')),
			__memo(() => import('./chunks/11-E_FdbO5I.js')),
			__memo(() => import('./chunks/12-B3Gz_KYD.js')),
			__memo(() => import('./chunks/13-BIivCd5L.js')),
			__memo(() => import('./chunks/14-Dt1usZTx.js')),
			__memo(() => import('./chunks/15-BDxRrAlk.js'))
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
