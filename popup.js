chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	getUserInfo();
	displayForm(tabs[0].url);
});

function getUserInfo() {
	addEventListener(
		'load',
		function () {
			var MAJOR_VERSION = 2.0;
			if (
				!localStorage.updateread ||
				localStorage.updateread != MAJOR_VERSION
			) {
				var email = prompt('What is your Google email address?');
				var username = prompt(
					'What would you like your username to be?'
				);
				localStorage['Email'] = email;
				localStorage['Username'] = username;
				localStorage.updateread = MAJOR_VERSION;
			}
		},
		0
	);
}

function displayForm(url) {
	strippedUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
	document.getElementById('url').innerHTML = strippedUrl;

	button = document.getElementById('diffuse-button');
	button.addEventListener('click', function (e) {
		title = document.getElementById('title').value;
		brainfart = document.getElementById('brainfart').value;
		category = document.getElementById('categories').value;

		sendData(strippedUrl, title, brainfart, category);
	});
}

function sendData(strippedUrl, title, brainfart, category) {
	email = localStorage['Email'];
	username = localStorage['Username'];

	message = `New content added!\n${title}\n${brainfart}\n${category}`;

	url =
		'https://diffusion-web-app-mvp-default-rtdb.firebaseio.com/' +
		username +
		'/newList.json';

	fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			url: strippedUrl,
			contentTitle: title,
			brainfart: brainfart,
			category: category,
		}),
	})
		.then((res) => res.json())
		.then(() => alert(message))
		.then(() => window.close());
}
