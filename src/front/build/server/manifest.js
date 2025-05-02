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
		client: {start:"_app/immutable/entry/start.yz4f-ogT.js",app:"_app/immutable/entry/app.VsIID-fZ.js",imports:["_app/immutable/entry/start.yz4f-ogT.js","_app/immutable/chunks/DUTV1AL5.js","_app/immutable/chunks/DOV76-9X.js","_app/immutable/chunks/BFnYxA1T.js","_app/immutable/entry/app.VsIID-fZ.js","_app/immutable/chunks/DOV76-9X.js","_app/immutable/chunks/ByobJIaC.js","_app/immutable/chunks/B3u6e_HZ.js","_app/immutable/chunks/Ggrbtp_H.js","_app/immutable/chunks/DRl-et_x.js","_app/immutable/chunks/BwcI-lJy.js","_app/immutable/chunks/BFnYxA1T.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-9-hOrgcE.js')),
			__memo(() => import('./chunks/1-Np1OELeD.js')),
			__memo(() => import('./chunks/2-ClQVNLet.js')),
			__memo(() => import('./chunks/3-VjpsMVAK.js')),
			__memo(() => import('./chunks/4-CqpQoKKy.js')),
			__memo(() => import('./chunks/5-C2YBeFOw.js')),
			__memo(() => import('./chunks/6-D9kZcL9k.js')),
			__memo(() => import('./chunks/7-BO5aSa0e.js')),
			__memo(() => import('./chunks/8-BvYXg7S1.js')),
			__memo(() => import('./chunks/9-Du8C6wce.js'))
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
