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
		client: {start:"_app/immutable/entry/start.DCz1vfP5.js",app:"_app/immutable/entry/app.Cx7bUFaO.js",imports:["_app/immutable/entry/start.DCz1vfP5.js","_app/immutable/chunks/IfJAF4wA.js","_app/immutable/chunks/ByauXACf.js","_app/immutable/chunks/DjyX3Siz.js","_app/immutable/chunks/CAVi3Kxg.js","_app/immutable/entry/app.Cx7bUFaO.js","_app/immutable/chunks/ByauXACf.js","_app/immutable/chunks/yVykksX0.js","_app/immutable/chunks/f42NyxNk.js","_app/immutable/chunks/DVcqKrii.js","_app/immutable/chunks/B_L8OCB9.js","_app/immutable/chunks/BOINOfoF.js","_app/immutable/chunks/DZmdmqJe.js","_app/immutable/chunks/DjyX3Siz.js","_app/immutable/chunks/CAVi3Kxg.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DGegdAmB.js')),
			__memo(() => import('./chunks/1-BG3GVx9J.js')),
			__memo(() => import('./chunks/2-DHZoTcm4.js')),
			__memo(() => import('./chunks/3-C4cun3fO.js')),
			__memo(() => import('./chunks/4-Be5qPsdm.js')),
			__memo(() => import('./chunks/5-DF0xFDyC.js')),
			__memo(() => import('./chunks/6-DaIi_Ywc.js')),
			__memo(() => import('./chunks/7-V0HFw05L.js')),
			__memo(() => import('./chunks/8-GxL-8HhR.js')),
			__memo(() => import('./chunks/9-1jYwB8tM.js')),
			__memo(() => import('./chunks/10-DSCGiW71.js')),
			__memo(() => import('./chunks/11-BQKB2PSh.js')),
			__memo(() => import('./chunks/12-BE_OUy96.js'))
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
				id: "/education-graph",
				pattern: /^\/education-graph\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
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
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/employment",
				pattern: /^\/employment\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/employment/edit/[autonomous_community]/[year]/[education_level]",
				pattern: /^\/employment\/edit\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"autonomous_community","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false},{"name":"education_level","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/integrations",
				pattern: /^\/integrations\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
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
