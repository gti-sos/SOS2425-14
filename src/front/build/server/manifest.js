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
<<<<<<< HEAD
		client: {start:"_app/immutable/entry/start.BHhZ_ON6.js",app:"_app/immutable/entry/app.CLMCm3WZ.js",imports:["_app/immutable/entry/start.BHhZ_ON6.js","_app/immutable/chunks/qeoeCQnM.js","_app/immutable/chunks/DAzD3k1F.js","_app/immutable/chunks/BR8YSTUf.js","_app/immutable/entry/app.CLMCm3WZ.js","_app/immutable/chunks/DAzD3k1F.js","_app/immutable/chunks/CT_G_oTq.js","_app/immutable/chunks/CgYYCX5b.js","_app/immutable/chunks/Cbj_j5Yp.js","_app/immutable/chunks/C0EkS0_U.js","_app/immutable/chunks/DXPy19jP.js","_app/immutable/chunks/BR8YSTUf.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-9pGiCsT-.js')),
			__memo(() => import('./chunks/1-BcP48Fmh.js')),
			__memo(() => import('./chunks/2-BV4uBPQz.js')),
			__memo(() => import('./chunks/3-D3GS7aS_.js')),
			__memo(() => import('./chunks/4-BWEKPIPD.js')),
			__memo(() => import('./chunks/5-9DbHtZP4.js')),
			__memo(() => import('./chunks/6-B_kHrAWa.js')),
			__memo(() => import('./chunks/7-DwSyPmiU.js')),
			__memo(() => import('./chunks/8-GZn2J6lF.js')),
			__memo(() => import('./chunks/9-C5yIWv2N.js'))
=======
		client: {start:"_app/immutable/entry/start.BeqwG0JT.js",app:"_app/immutable/entry/app.D-5JPxxC.js",imports:["_app/immutable/entry/start.BeqwG0JT.js","_app/immutable/chunks/DuTt44cL.js","_app/immutable/chunks/DOV76-9X.js","_app/immutable/chunks/BFnYxA1T.js","_app/immutable/entry/app.D-5JPxxC.js","_app/immutable/chunks/DOV76-9X.js","_app/immutable/chunks/ByobJIaC.js","_app/immutable/chunks/B3u6e_HZ.js","_app/immutable/chunks/Ggrbtp_H.js","_app/immutable/chunks/DRl-et_x.js","_app/immutable/chunks/BwcI-lJy.js","_app/immutable/chunks/BFnYxA1T.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DuYcOx3k.js')),
			__memo(() => import('./chunks/1-BR1zL9j3.js')),
			__memo(() => import('./chunks/2-ClQVNLet.js')),
			__memo(() => import('./chunks/3-VjpsMVAK.js')),
			__memo(() => import('./chunks/4-CD5rTdkL.js')),
			__memo(() => import('./chunks/5-Bg5pmrvW.js')),
			__memo(() => import('./chunks/6-DUNQZ6Ke.js')),
			__memo(() => import('./chunks/7-CvR_Bh8o.js')),
			__memo(() => import('./chunks/8-B8gGGlzQ.js')),
			__memo(() => import('./chunks/9--voE10qc.js'))
>>>>>>> cdc4fc996163e20ae88e7cc66c3657d3190cdf43
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
