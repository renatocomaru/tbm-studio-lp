document.addEventListener("DOMContentLoaded", () => {
  const emoji = document.getElementById("emoji");

  emoji.addEventListener("mouseover", () => {
    emoji.src = "/src/assets/rocket-emoji.png";
  });

  emoji.addEventListener("mouseout", () => {
    emoji.src = "/src/assets/thinking-emoji.png";
  });
});
