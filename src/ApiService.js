export async function call(api, method, request) {
	let API_BASE_URL = null;
	const hostname = window.location.href;

	// alert('api: ' + api);
	// alert(api.indexOf('/proposals'));
	// alert(api.indexOf('/requirements'));
	if (api.indexOf('/proposals') > -1 /*|| hostname.indexOf("/~~~") > 0*/) {
		API_BASE_URL = 'http://localhost:8080';
		// } else if (hostname.indexOf('/RequirementBoard') > 0) {
	} else if (api.indexOf('/requirements') > -1) {
		API_BASE_URL = 'http://localhost:8081';
	}

	const accessToken = localStorage.getItem('ACCESS_TOKEN');

	let headers = new Headers({
		'Content-Type': 'application/json',
	});

	if (accessToken && accessToken != null) {
		headers.append('Authorization', 'Bearer ' + accessToken);
	}

	let options = {
		headers,
		url: API_BASE_URL + api,
		method: method,
	};

	if (request) {
		options.body = JSON.stringify(request);
	}

	try {
		// alert('hostname : ' + window.location.href);
		// alert(API_BASE_URL);
		// alert(options.toString());
		const response = await fetch(options.url, options);
		if (response.status === 200) {
			// alert('status 200 ok');
			return response.json();
		} else if (response.status === 400) {
			alert('login 실패');
			window.location.href = '/sign-in';
		} else {
			throw new Error(response.statusText);
		}
	} catch (error) {
		// alert('HTTP Error');
		// alert(error);
	}
}

// export async function signup(userDTO) {
// 	alert(userDTO);
// 	return await call('/auth/signup', 'POST', userDTO);
// }

export function signout() {
	localStorage.setItem('ACCESS_TOKEN', null);
	localStorage.setItem('USER_NAME', null);
	localStorage.setItem('USER_ROLE', null);
	window.location.href = '/';
}

export async function proposalList() {
	return await call('/proposals', 'GET');
}

export async function proposal(proposalDTO) {
	// alert('저장값 : ' + JSON.stringify(proposalDTO));
	return await call('/proposals', 'POST', proposalDTO);
}

export async function proposalDetail(proposalId = '') {
	if (proposalId) {
		return await call('/proposals/' + proposalId);
	}
	return null;
}

export async function requirementList() {
	return await call('/requirements', 'GET');
}

export async function requirement(requirementDTO) {
	return await call('/requirements', 'POST', requirementDTO);
}

/* requirement id로 조회하는 proposalList 조회함수 */
export async function proposalListByRequirementId(requirementId = '') {
	if (requirementId) {
		return await call('/proposals/requirement/' + requirementId, 'GET');
	}
	return null;
}
