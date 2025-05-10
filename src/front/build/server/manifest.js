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
		client: {start:"_app/immutable/entry/start.U0vjU06u.js",app:"_app/immutable/entry/app.CqABaAwW.js",imports:["_app/immutable/entry/start.U0vjU06u.js","_app/immutable/chunks/TJL-RTKS.js","_app/immutable/chunks/LDrxhfq1.js","_app/immutable/chunks/DupIHeaP.js","_app/immutable/chunks/C73a-Tmm.js","_app/immutable/entry/app.CqABaAwW.js","_app/immutable/chunks/LDrxhfq1.js","_app/immutable/chunks/1neYngIx.js","_app/immutable/chunks/Cw--0ebe.js","_app/immutable/chunks/BG8tU1X3.js","_app/immutable/chunks/Cji-WUv_.js","_app/immutable/chunks/BMAFkVZ0.js","_app/immutable/chunks/BkYYwUoI.js","_app/immutable/chunks/DupIHeaP.js","_app/immutable/chunks/C73a-Tmm.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BpWgte-z.js')),
			__memo(() => import('./chunks/1-BjvbsU6V.js')),
			__memo(() => import('./chunks/2-Bho2vDlM.js')),
			__memo(() => import('./chunks/3-CMLxsnkn.js')),
			__memo(() => import('./chunks/4-BVONvSHA.js')),
			__memo(() => import('./chunks/5-CjVkufwr.js')),
			__memo(() => import('./chunks/6-CQewdXVG.js')),
			__memo(() => import('./chunks/7-DzYPHn-Y.js')),
			__memo(() => import('./chunks/8-Dn7_rRfT.js')),
			__memo(() => import('./chunks/9-CwgnTXyF.js')),
			__memo(() => import('./chunks/10-CzNVuMfn.js')),
			__memo(() => import('./chunks/11-BJCXWjEp.js')),
			__memo(() => import('./chunks/12-Dja0WEN7.js')),
			__memo(() => import('./chunks/13-CBu9xOMW.js')),
			__memo(() => import('./chunks/14-JTs-FcuZ.js')),
			__memo(() => import('./chunks/15-BVNULc0Y.js')),
			__memo(() => import('./chunks/16-4W4ZjMy3.js')),
			__memo(() => import('./chunks/17-D49nFCkB.js'))
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
