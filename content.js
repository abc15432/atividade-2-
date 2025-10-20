const links = document.querySelectorAll('a');
for (const link of links) {
  if (link.href.includes("playlist") || link.href.includes("study")) {
    link.style.outline = "2px solid green";
  } else {
    link.style.outline = "2px solid red";
  }
}
