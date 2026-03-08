const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", e => {

glow.style.left = e.clientX - 200 + "px";
glow.style.top = e.clientY - 200 + "px";

});

document.addEventListener("mousedown", () => {
glow.style.opacity = "1";
});

document.addEventListener("mouseup", () => {
glow.style.opacity = "0.6";
});
