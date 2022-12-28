export function blurOnEscape(node) {
  const handleKey = (event) => {
    if (event.key === "Escape" && node && typeof node.blur === "function") {
      node.blur();
    }
  };

  node.addEventListener("keydown", handleKey);

  return {
    destroy() {
      node.removeEventListener("keydown", handleKey);
    },
  };
}
