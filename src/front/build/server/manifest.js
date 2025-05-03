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
		client: {start:"_app/immutable/entry/start.BkDTQZ-R.js",app:"_app/immutable/entry/app.DNdvxI2e.js",imports:["_app/immutable/entry/start.BkDTQZ-R.js","_app/immutable/chunks/DStGZoPE.js","_app/immutable/chunks/BGtGGxyh.js","_app/immutable/chunks/CvRm9i6i.js","_app/immutable/chunks/Dy25ky0p.js","_app/immutable/entry/app.DNdvxI2e.js","_app/immutable/chunks/BGtGGxyh.js","_app/immutable/chunks/D3YLEh_f.js","_app/immutable/chunks/CSKOCQES.js","_app/immutable/chunks/C4thPrJc.js","_app/immutable/chunks/DMWQqX9J.js","_app/immutable/chunks/BG-cjSUA.js","_app/immutable/chunks/CvRm9i6i.js","_app/immutable/chunks/Dy25ky0p.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DszInO9W.js')),
			__memo(() => import('./chunks/1-BmBOfuSB.js')),
			__memo(() => import('./chunks/2-6N5j1WwB.js')),
			__memo(() => import('./chunks/3-BX06cspH.js')),
			__memo(() => import('./chunks/4-EpBvo-3C.js')),
			__memo(() => import('./chunks/5-otVG7GU9.js')),
			__memo(() => import('./chunks/6-BxpfJc7x.js')),
			__memo(() => import('./chunks/7-BxCdWd5x.js')),
			__memo(() => import('./chunks/8-BzYLGfWb.js')),
			__memo(() => import('./chunks/9-kOpzxj3z.js')),
			__memo(() => import('./chunks/10-pifGXYNt.js'))
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
