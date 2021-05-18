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

function load() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
}
