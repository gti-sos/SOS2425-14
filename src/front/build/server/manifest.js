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
		client: {start:"_app/immutable/entry/start.BXsNUi6e.js",app:"_app/immutable/entry/app.BRI1dYIF.js",imports:["_app/immutable/entry/start.BXsNUi6e.js","_app/immutable/chunks/DDgU0adY.js","_app/immutable/chunks/gUvyREcO.js","_app/immutable/chunks/CKZwt7A8.js","_app/immutable/chunks/WRe_eenc.js","_app/immutable/entry/app.BRI1dYIF.js","_app/immutable/chunks/gUvyREcO.js","_app/immutable/chunks/wr67jiHF.js","_app/immutable/chunks/tvbMF9Pj.js","_app/immutable/chunks/DoNM67fw.js","_app/immutable/chunks/BQI4ghyB.js","_app/immutable/chunks/Ctlj-CgM.js","_app/immutable/chunks/CKZwt7A8.js","_app/immutable/chunks/WRe_eenc.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-lGgOHTMG.js')),
			__memo(() => import('./chunks/1-B6OO9PFZ.js')),
			__memo(() => import('./chunks/2-DmVvdYqL.js')),
			__memo(() => import('./chunks/3-i3B7ZUD6.js')),
			__memo(() => import('./chunks/4-E_8FKSot.js')),
			__memo(() => import('./chunks/5-CVlf0YIY.js')),
			__memo(() => import('./chunks/6-BRFPgJPt.js')),
			__memo(() => import('./chunks/7-B0yuklin.js')),
			__memo(() => import('./chunks/8-xEipdpJn.js'))
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
				id: "/employment",
				pattern: /^\/employment\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/employment/edit/[autonomous_community]/[year]/[education_level]",
				pattern: /^\/employment\/edit\/([^/]+?)\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"autonomous_community","optional":false,"rest":false,"chained":false},{"name":"year","optional":false,"rest":false,"chained":false},{"name":"education_level","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
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
