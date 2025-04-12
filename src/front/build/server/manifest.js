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
		client: {start:"_app/immutable/entry/start.DvccfI5y.js",app:"_app/immutable/entry/app.BklYg2Wn.js",imports:["_app/immutable/entry/start.DvccfI5y.js","_app/immutable/chunks/DTE9iFec.js","_app/immutable/chunks/D2QEyh5V.js","_app/immutable/chunks/CvjAcaUl.js","_app/immutable/entry/app.BklYg2Wn.js","_app/immutable/chunks/D2QEyh5V.js","_app/immutable/chunks/CqA-SK5v.js","_app/immutable/chunks/D8RsNkBn.js","_app/immutable/chunks/DhYTbytf.js","_app/immutable/chunks/CvjAcaUl.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BUe4TMLh.js')),
			__memo(() => import('./chunks/1-CIJ2888U.js')),
			__memo(() => import('./chunks/2-D_btYZPN.js')),
			__memo(() => import('./chunks/3-YrgcwCpx.js'))
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
