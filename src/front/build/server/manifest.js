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
		client: {start:"_app/immutable/entry/start.BVV_e27r.js",app:"_app/immutable/entry/app.Bor-Evm6.js",imports:["_app/immutable/entry/start.BVV_e27r.js","_app/immutable/chunks/CBd0k46R.js","_app/immutable/chunks/9WqpKGnU.js","_app/immutable/chunks/Bs83m-22.js","_app/immutable/chunks/C8PSm_dE.js","_app/immutable/entry/app.Bor-Evm6.js","_app/immutable/chunks/9WqpKGnU.js","_app/immutable/chunks/e9-FdQ4l.js","_app/immutable/chunks/CoNQuiwa.js","_app/immutable/chunks/0Uz-nMqn.js","_app/immutable/chunks/7L3gHbTa.js","_app/immutable/chunks/Fd7H7wga.js","_app/immutable/chunks/Bs83m-22.js","_app/immutable/chunks/C8PSm_dE.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CR4785N_.js')),
			__memo(() => import('./chunks/1-Din5w8gv.js')),
			__memo(() => import('./chunks/2-Dm-x8Ur-.js')),
			__memo(() => import('./chunks/3-uERc5V_D.js')),
			__memo(() => import('./chunks/4-Dph5WoXK.js')),
			__memo(() => import('./chunks/5-ChMblBLy.js')),
			__memo(() => import('./chunks/6-BrD1rbCs.js')),
			__memo(() => import('./chunks/7-BqEM0Df7.js')),
			__memo(() => import('./chunks/8-CnoLgZKc.js')),
			__memo(() => import('./chunks/9-BAmsuJfh.js')),
			__memo(() => import('./chunks/10-BbmfbZpS.js'))
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
