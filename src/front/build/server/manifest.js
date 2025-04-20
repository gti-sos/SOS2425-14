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
		client: {start:"_app/immutable/entry/start.AsPrQLUx.js",app:"_app/immutable/entry/app.DfcUXp4W.js",imports:["_app/immutable/entry/start.AsPrQLUx.js","_app/immutable/chunks/B--KP6qa.js","_app/immutable/chunks/DlljSLY3.js","_app/immutable/chunks/DRvqIi7_.js","_app/immutable/entry/app.DfcUXp4W.js","_app/immutable/chunks/DlljSLY3.js","_app/immutable/chunks/4MEhUbmR.js","_app/immutable/chunks/Dv6fXY4X.js","_app/immutable/chunks/Dl4PlIxG.js","_app/immutable/chunks/CGysUMuK.js","_app/immutable/chunks/Di2JEKVx.js","_app/immutable/chunks/DRvqIi7_.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DJ7B3w7b.js')),
			__memo(() => import('./chunks/1-CnoOTXMd.js')),
			__memo(() => import('./chunks/2-Dr4UPnaI.js')),
			__memo(() => import('./chunks/3-BlaaxG8A.js')),
			__memo(() => import('./chunks/4-BtGjmPcc.js')),
			__memo(() => import('./chunks/5-B8LgR5Rr.js')),
			__memo(() => import('./chunks/6-DP-8Lzql.js')),
			__memo(() => import('./chunks/7-BsxbMREw.js')),
			__memo(() => import('./chunks/8-Qd56ChvR.js')),
			__memo(() => import('./chunks/9-BwzD2CJQ.js'))
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
