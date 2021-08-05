chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	getUserInfo();
	displayPopup(tabs[0].url);
});

function loginUser() {
	MAJOR_VERSION = 2.0;
	if (!localStorage.updateread || localStorage.updateread != MAJOR_VERSION) {
		isValid = false;
		regex = /^[^\s@]+@[^\s@]+$/;

		while (!isValid) {
			email = prompt('What is your Google email address?');
			console.log(email);
			if (email === null) {
				window.close();
				return;
			}
			isValid = regex.test(email);
		}
		localStorage['Email'] = email;
		localStorage.updateread = MAJOR_VERSION;
	}
}

function getUserInfo() {
	if (!localStorage['Email']) {
		addEventListener('load', loginUser(), 0);
	}
}

function displayPopup(url) {
	strippedUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
	document.getElementById('url').innerHTML = strippedUrl;

	button = document.getElementById('diffuse-button');
	button.addEventListener('click', function (e) {
		quickThoughts = document.getElementById('quick-thoughts').textContent;
		category = document.getElementById('categories').value;

		sendData(url, quickThoughts, category);
	});

	emailButton = document.getElementById('email-button');
	emailButton.addEventListener('click', function (e) {
		localStorage.updateread = 0;
		loginUser();
		window.close();
	});
	if (localStorage['Email']) {
		emailButton.innerHTML = localStorage['Email'];
	}
}

function sendData(url, quickThoughts, category) {
	email = localStorage['Email'];
	username = email.replace(/[^a-zA-Z0-9 ]/g, '');
	message = `New content added!\n${quickThoughts}\n${category}`;
	endpoint =
		'https://diffusion-board-creator-default-rtdb.firebaseio.com/' +
		username +
		'/data/newContent.json';

	fetch(endpoint, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			url: url,
			quickThoughts: quickThoughts,
			category: category,
			date: Date.now(),
		}),
	})
		.then((res) => res.json())
		.then(() => alert(message))
		.then(() => window.close());
}
