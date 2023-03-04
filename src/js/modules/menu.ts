export const menu = () => {

  const btn = document.querySelector(".cite_btn");

  btn?.addEventListener("click", () => {
    document.body.classList.toggle("open-menu");
  });
}