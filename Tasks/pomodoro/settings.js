const focusInput = document.querySelector("#focusTime");
const breakInput = document.querySelector("#breakTime");

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const focus = Math.max(1, parseInt(focusInput.value));
  const brk = Math.max(1, parseInt(breakInput.value));
  localStorage.setItem("focusTime", focus);
  localStorage.setItem("breakTime", brk);
});
