const buttonClasses =
  "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-l yt-spec-button-shape-next--icon-button";

function checkVisible(elm) {
  const rect = elm.getBoundingClientRect();
  const viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function getButton() {
  const divs = document.querySelectorAll('[id="comments-button"]');
  for (const div of divs) {
    if (checkVisible(div)) {
      const buttons = div.getElementsByClassName(buttonClasses);
      return buttons.item(0);
    }
  }
  return null;
}

function updateCommments() {
  setTimeout(() => {
    const button = getButton();
    button?.click();
  }, 0);
}

updateCommments();

let oldPathname = "";
const body = document.querySelector("body");

const observer = new MutationObserver((mutations) => {
  mutations.forEach((m) => {
    const pathname = document.location.pathname;

    if (oldPathname === pathname) {
      return;
    }

    if (
      oldPathname !== "" &&
      pathname.startsWith("/shorts") !== oldPathname.startsWith("/shorts")
    ) {
      window.location.reload();
      return;
    }

    oldPathname = pathname;
    updateCommments();
  });
});
observer.observe(body, { childList: true });
