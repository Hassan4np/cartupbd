document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn-6");

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", function (e) {
      const rect = this.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      const span = this.querySelector("span");
      span.style.top = relY + "px";
      span.style.left = relX + "px";
    });

    btn.addEventListener("mouseout", function (e) {
      const rect = this.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      const span = this.querySelector("span");
      span.style.top = relY + "px";
      span.style.left = relX + "px";
    });
  });
});