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
		client: {start:"_app/immutable/entry/start.ClLatqA-.js",app:"_app/immutable/entry/app.Batlu4o3.js",imports:["_app/immutable/entry/start.ClLatqA-.js","_app/immutable/chunks/CnWt8w9j.js","_app/immutable/chunks/C8gLBHYj.js","_app/immutable/chunks/K_54QM3B.js","_app/immutable/entry/app.Batlu4o3.js","_app/immutable/chunks/C8gLBHYj.js","_app/immutable/chunks/r9gLMdC5.js","_app/immutable/chunks/DaiKAr2_.js","_app/immutable/chunks/DPajP3yk.js","_app/immutable/chunks/BaqPXSF-.js","_app/immutable/chunks/CD6EvZl9.js","_app/immutable/chunks/K_54QM3B.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BUemMJwv.js')),
			__memo(() => import('./chunks/1-_ddUzlhJ.js')),
			__memo(() => import('./chunks/2-DadriyBA.js')),
			__memo(() => import('./chunks/3-DJMjNE3T.js')),
			__memo(() => import('./chunks/4-C7NvCdyP.js')),
			__memo(() => import('./chunks/5-Dn9DXjhF.js')),
			__memo(() => import('./chunks/6-Do1vq-nQ.js')),
			__memo(() => import('./chunks/7-DyiI1Rdr.js')),
			__memo(() => import('./chunks/8-BzIghshI.js')),
			__memo(() => import('./chunks/9-CjQ6Zc_l.js'))
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
