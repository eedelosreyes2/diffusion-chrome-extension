chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  // isLoggedIn();
  setForm();
  displayUrl(tabs[0].url);
});

function isLoggedIn() {
  // GET request to server
}

function setForm() {
  button = document.getElementById("diffuse-button");

  button.addEventListener("click", function (e) {
    title = document.getElementById("title").value;
    brainfart = document.getElementById("brainfart").value;
    categories = document.getElementById("categories").value;

    alert(title + " " + brainfart + " " + categories);
  });
}

function displayUrl(url) {
  strippedUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0];
  document.getElementById("url").innerHTML = strippedUrl;
}

// Edit
function sendData() {
  $.ajax({
    type: "POST",
    url: serviceUrl,
    data: data,
    success: function (msg) {
      if (typeof Me.config.onSumitted == "function") {
        Me.config.onSumitted(msg);
      }
    },
    error: function () {
      if (typeof Me.config.onError == "function") {
        Me.config.onError();
      }
    },
  });
}
