chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  getUserInfo();
  displayForm(tabs[0].url);
});

function getUserInfo() {
  addEventListener(
    "load",
    function () {
      var MAJOR_VERSION = 1.0;
      if (
        !localStorage.updateread ||
        localStorage.updateread != MAJOR_VERSION
      ) {
        var email = prompt("What is your Google email address?");
        localStorage["Email"] = email;
        localStorage.updateread = MAJOR_VERSION;
      }
    },
    0
  );
}

function displayForm(url) {
  strippedUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0];
  document.getElementById("url").innerHTML = strippedUrl;

  button = document.getElementById("diffuse-button");
  button.addEventListener("click", function (e) {
    title = document.getElementById("title").value;
    brainfart = document.getElementById("brainfart").value;
    category = document.getElementById("categories").value;

    sendData(title, brainfart, category);
  });
}

function sendData(title, brainfart, category) {
  fetch("http://localhost:3000/api/getLists", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ a: 1, b: "Textual content" }),
  })
    .then((res) => res.json())
    .then((res) => alert(res));
}
