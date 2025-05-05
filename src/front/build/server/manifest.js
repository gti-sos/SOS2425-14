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
		client: {start:"_app/immutable/entry/start.Cb3nLMe1.js",app:"_app/immutable/entry/app.D6nQ8BRf.js",imports:["_app/immutable/entry/start.Cb3nLMe1.js","_app/immutable/chunks/CUq3oMZr.js","_app/immutable/chunks/cdyx5pLP.js","_app/immutable/chunks/BhTQ0MDZ.js","_app/immutable/chunks/CV6rVgxM.js","_app/immutable/entry/app.D6nQ8BRf.js","_app/immutable/chunks/cdyx5pLP.js","_app/immutable/chunks/dBgfGCkZ.js","_app/immutable/chunks/C0k3Nw9y.js","_app/immutable/chunks/CEmQKR9v.js","_app/immutable/chunks/CzsArJTE.js","_app/immutable/chunks/BxI2X47k.js","_app/immutable/chunks/BhTQ0MDZ.js","_app/immutable/chunks/CV6rVgxM.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CEGSglc9.js')),
			__memo(() => import('./chunks/1-ClEqj6mU.js')),
			__memo(() => import('./chunks/2-D7z1rGmi.js')),
			__memo(() => import('./chunks/3-Hn0GuAsY.js')),
			__memo(() => import('./chunks/4-HE7Gc09M.js')),
			__memo(() => import('./chunks/5-tKB22S7W.js')),
			__memo(() => import('./chunks/6-zypC6ftj.js')),
			__memo(() => import('./chunks/7-Sfcb3IXs.js')),
			__memo(() => import('./chunks/8-C-GWhgKT.js')),
			__memo(() => import('./chunks/9-BjnRTFUG.js')),
			__memo(() => import('./chunks/10-DgyfTVFc.js')),
			__memo(() => import('./chunks/11-3dNhiQv6.js'))
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
			},
			{
				id: "/integrations",
				pattern: /^\/integrations\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
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
