const buttonClasses = "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-l yt-spec-button-shape-next--icon-button"

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function getButton() {
  const divs = document.querySelectorAll('[id="comments-button"]')
  for (const div of divs) {
    if (checkVisible(div)) {
      const buttons = div.getElementsByClassName(buttonClasses);
      return buttons.item(0);
    }
  }
  return null;
}

let oldHref = '';
const body = document.querySelector("body");
const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;

      setTimeout(() => {
        const button = getButton()
        button?.click();
      }, 0)
    }
  });
});
observer.observe(body, { childList: true, subtree: true });
