// Set CSS styles for an element
const setCSS = (element, style) => {
  for (const property in style) element.style[property] = style[property];
};

// Swap two DOM elements
const swapElements = function (nodeA, nodeB) {
  const parentA = nodeA.parentNode;
  const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

  nodeB.parentNode.insertBefore(nodeA, nodeB);
  parentA.insertBefore(nodeB, siblingA);
};

// Get Google Meet toolbar
const getToolbar = () =>
  Array.from(document.querySelectorAll("*")).find((element) => {
    const computedStyle = window.getComputedStyle(element);
    return element.children.length === 8 && computedStyle.display === "grid";
  });

// Observe DOM changes to apply button rearrangement
const observer = new MutationObserver(() => {
  const toolbar = getToolbar();
  // Check if the toolbar is in the DOM
  if (document.contains(toolbar)) {
    const toolbarItems = toolbar.children;

    // Set initial styles for all toolbar items
    Array.from(toolbarItems).forEach((element) =>
      setCSS(element, {
        transition: ".3s all",
        "margin-left": "0px",
      })
    );

    // After 1 second, apply new styles and swap the elements
    setTimeout(() => {
      setCSS(toolbarItems[3], { "margin-left": "20px" });
      setCSS(toolbarItems[5], { "margin-left": "20px" });
      setCSS(toolbarItems[7], { "margin-left": "20px" });

      swapElements(toolbarItems[3], toolbarItems[5]);
    }, 1000);

    // Disconnect the observer after rearranging the buttons
    observer.disconnect();
  }
});

// Begin observing DOM for changes
observer.observe(document, {
  childList: true, // Observe direct children of the target node
  subtree: true, // Observe all descendant nodes of the target node
});
