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
		client: {start:"_app/immutable/entry/start.BqwLPovw.js",app:"_app/immutable/entry/app.uzKda9Gd.js",imports:["_app/immutable/entry/start.BqwLPovw.js","_app/immutable/chunks/CZPLEHah.js","_app/immutable/chunks/DvUjY8h5.js","_app/immutable/chunks/GyJkTNFx.js","_app/immutable/entry/app.uzKda9Gd.js","_app/immutable/chunks/DvUjY8h5.js","_app/immutable/chunks/BaA98Pk7.js","_app/immutable/chunks/BloMgKyR.js","_app/immutable/chunks/CDjYmTfr.js","_app/immutable/chunks/Dapz-wY9.js","_app/immutable/chunks/GyJkTNFx.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-CZ-y_cdN.js')),
			__memo(() => import('./chunks/1-BmN-z1Zj.js')),
			__memo(() => import('./chunks/2-7ZNgjtQu.js')),
			__memo(() => import('./chunks/3-oKDFiPkG.js')),
			__memo(() => import('./chunks/4-D92tIw4j.js'))
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
				id: "/education",
				pattern: /^\/education\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
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
