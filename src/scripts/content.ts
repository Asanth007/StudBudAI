

function readLeetCodeProblem() {
  const title = document.querySelector('[data-cy="question-title"]')?.innerText;
  const desc = document.querySelector('[data-track-load="description_content"]')?.innerText;

  return { title, description: desc };
}

function injectHelpButton() {
  const button = document.createElement("button");
  button.innerText = "Help";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.zIndex = "9999";
  button.style.padding = "10px 16px";
  button.style.backgroundColor = "#2563eb";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "8px";
  button.style.cursor = "pointer";

  button.addEventListener("click", () => {
    const problem = readLeetCodeProblem();
    chrome.runtime.sendMessage({
      type: "OPEN_HELP",
      data: problem
    });
  });

if (!document.getElementById("studbud-help-btn")) {
  button.id = "studbud-help-btn";
  document.body.appendChild(button);
}
}

window.addEventListener("load", () => {
  setTimeout(injectHelpButton, 1000);
});