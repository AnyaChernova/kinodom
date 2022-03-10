import {serializeToUrl} from "@/utils/serialize";

let getAuthParams_VK = (state) => ({
	provider: 'vkontakte',
	client_id: state.env.VK_CLIENT_ID,
	redirect_uri: `${state.env.BASE_HOST}/oauth`,
	display: 'page',
	response_type: 'token',
	scope: 'email offline',
	v: '5.131',
	state: 'vkontakte',
});
let getAuthParams_FB = (state) => ({
	client_id: state.env.FB_CLIENT_ID,
	redirect_uri: `${state.env.BASE_HOST}/oauth`,
	response_type: 'token',
	scope: 'email public_profile',
	state: 'facebook',
});
let getAuthParams_GOOGLE = (state) => ({
	client_id: state.env.GOOGLE_CLIENT_ID,
	redirect_uri: `${state.env.BASE_HOST}/oauth`,
	response_type: 'token',
	scope: 'openid profile email',
	state: 'google',
});
let getAuthParams_APPLE = (state) => ({
	client_id: state.env.APPLE_CLIENT_ID,
	redirect_uri: `${state.env.BASE_HOST}/oauth`,
	response_type: 'code id_token',
	response_mode : 'form_post',
	scope: 'email',
	state: 'apple',
});

export const auth_VK = function ({state} = {}) {
	let params = serializeToUrl({
		...getAuthParams_VK(state),
	});
	window.location.assign(`https://oauth.vk.com/authorize?${params}`);
};

export const auth_FB = function ({state} = {}) {
	let params = serializeToUrl({
		...getAuthParams_FB(state),
	});
	window.location.assign(`https://www.facebook.com/v3.2/dialog/oauth?${params}`);
};

export const auth_GOOGLE = function ({state} = {}) {
	let params = serializeToUrl({
		...getAuthParams_GOOGLE(state)
	});
	window.location.assign(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
};

export const auth_APPLE = function ({state} = {}) {
	let params = serializeToUrl({
		...getAuthParams_APPLE(state)
	});
	window.location.assign(`https://appleid.apple.com/auth/authorize?${params}`);
};
