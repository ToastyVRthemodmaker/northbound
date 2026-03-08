console.log("Website loaded");

/* Example button interaction */
function showMessage() {
alert("Hello! Thanks for visiting my website.");
}

/* Example API request to backend */
async function loadInfo() {
try {
const response = await fetch("/api/info");
const data = await response.json();

```
const infoBox = document.getElementById("apiData");
if (infoBox) {
  infoBox.innerText =
    "Name: " + data.name + " | Site: " + data.site;
}
```

} catch (err) {
console.error("API request failed:", err);
}
}

/* Run when page loads */
window.onload = () => {
loadInfo();
};
