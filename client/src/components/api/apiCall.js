import userEvent from '@testing-library/user-event';

export async function getUsers() {
	const res = await fetch('/api/users/');
	const data = await res.json();

	return data;
}

export async function getUser(id) {
	const res = await fetch(`/api/user/${id}`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
	console.log(data);

	return data;
}

export async function register(user) {
	const res = await fetch('/api/register/', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(user),
	});

	const data = await res.json();

	return data;
}

export async function login(user) {
	const res = await fetch('/api/login/', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(user),
	});

	const data = await res.json();

	return data;
}

export async function getClubs() {
	const res = await fetch('/api/clubs/', {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
	return data;
}

export async function getClubsCategory(id) {
	const res = await fetch(`/api/club/${id}/subclubs`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
	return data;
}

export async function createClub(club) {
	const res = await fetch('/api/addclub/', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(club),
	});
	const data = await res.json();
	return data;
}

export async function createsubClub(club) {
	const res = await fetch('/api/addsubclub/', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(club),
	});
	const data = await res.json();
	console.log(data);
}

export async function getsubClubs() {
	const res = await fetch('/api/subclubs/', {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
	return data;
}

export async function getsubClub(id) {
	const res = await fetch(`/api/subclubs/${id}`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
	console.log(data);
	return data;
}

export async function postForgot(email) {
	const res = await fetch('/api/passreset/', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(email),
	});
	const data = await res.json();
	return data;
}

export async function changePassword(token, newPassword) {
	const res = await fetch(`/api/passreset/${token}`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(newPassword),
	});
	const data = await res.json();
	return data;
}

export async function editsubClub(club) {
	const res = await fetch('/api/updsubclubs/', {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(club),
	});
	const data = await res.json();
	console.log(data);
}

export async function deletesubClub(id) {
	const res = await fetch(`/api/subclubs/delete/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
	console.log(data);
}

// subclubs posts
export async function getPosts(subClub) {
	const res = await fetch(`/api/Post/postsBySubClub/${subClub}`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
	console.log(data);

	return data;
}

export async function getPostsByAuthor(user) {
	const res = await fetch(`/api/Post/postsByAuthorId/${user}`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();

	return data;
}

export async function addPost(post) {
	const res = await fetch('/api/Post/addPost/', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(post),
	});
	const data = await res.json();
	return data;
}

export async function getUserMembership(user) {
	const res = await fetch(`/api/membership/user/${user}`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
	console.log(data);

	return data;
}

export async function addUserMembership(user) {
	const res = await fetch('/api/addmembership', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(user),
	});
	const data = await res.json();
	return data;
}

export async function addComment(comment) {
	const res = await fetch('/api/Comment/addComment', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(comment),
	});
	const data = await res.json();
	return data;
}

export async function getComments() {
	const res = await fetch(`/api/Comment/comments`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
	console.log(data);

	return data;
}

export async function addReport(report) {
	const res = await fetch('/api/addreport', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(report),
	});
	const data = await res.json();
	return data;
}

export async function rateClub(rate) {
	const res = await fetch('/api/membership/point', {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(rate),
	});
	const data = await res.json();
	return data;
}

export async function reviewClub(review) {
	const res = await fetch('/api/membership/review', {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(review),
	});
	const data = await res.json();
	console.log(data);
	return data;
}

export async function getMembers(id) {
	const res = await fetch(`/api/membership/subclub/${id}`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
	console.log(data);

	return data;
}

export async function userAbout(about) {
	const res = await fetch(`/api/user/about/`, {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(about),
	});
	const data = await res.json();

	return data;
}

export async function addAdminRequest(user) {
	const res = await fetch('/api/addAdminRequest', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(user),
	});
	const data = await res.json();
	return data;
}

export async function getReports() {
	const res = await fetch(`/api/reports`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();

	return data;
}

export async function deleteReport(id) {
	const res = await fetch(`/api/report/delete/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
}

export async function deleteAdminreq(id) {
	const res = await fetch(`/api/adminRequest/delete/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
}

export async function banUser(user) {
	const res = await fetch(`/api/membership/ban/`, {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(user),
	});
	const data = await res.json();

	return data;
}

export async function makesubadmin(user) {
	const res = await fetch(`/api/membership/makeadmin/`, {
		method: 'PUT',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(user),
	});
	const data = await res.json();

	return data;
}

export async function addClubRequest(club) {
	const res = await fetch('/api/addClubRequest', {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(club),
	});
	const data = await res.json();
	return data;
}

export async function getadminRequests() {
	const res = await fetch(`/api/adminRequest/all`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();

	return data;
}

export async function getclubRequests() {
	const res = await fetch(`/api/clubRequest/all`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();

	return data;
}

export async function getMessagesBetween(senderID, receiverID) {
	const res = await fetch(`/api/messages/conversation/${senderID}/${receiverID}`, {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		body: JSON.stringify(),
	});
	const data = await res.json();
	return data;
}
