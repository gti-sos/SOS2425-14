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
		client: {start:"_app/immutable/entry/start.BOPUprfk.js",app:"_app/immutable/entry/app.D99qcrAi.js",imports:["_app/immutable/entry/start.BOPUprfk.js","_app/immutable/chunks/Bj9Jtfmp.js","_app/immutable/chunks/C8gLBHYj.js","_app/immutable/chunks/K_54QM3B.js","_app/immutable/entry/app.D99qcrAi.js","_app/immutable/chunks/C8gLBHYj.js","_app/immutable/chunks/r9gLMdC5.js","_app/immutable/chunks/DaiKAr2_.js","_app/immutable/chunks/DPajP3yk.js","_app/immutable/chunks/BaqPXSF-.js","_app/immutable/chunks/CD6EvZl9.js","_app/immutable/chunks/K_54QM3B.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CXG6PW3W.js')),
			__memo(() => import('./chunks/1-N8czftCD.js')),
			__memo(() => import('./chunks/2-DadriyBA.js')),
			__memo(() => import('./chunks/3-DJMjNE3T.js')),
			__memo(() => import('./chunks/4-BtM4hEHA.js')),
			__memo(() => import('./chunks/5-D__1rF67.js')),
			__memo(() => import('./chunks/6-CPCVsVc1.js')),
			__memo(() => import('./chunks/7-Cardp8IZ.js')),
			__memo(() => import('./chunks/8-z4eafCho.js')),
			__memo(() => import('./chunks/9-CAAK7Zo9.js'))
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
