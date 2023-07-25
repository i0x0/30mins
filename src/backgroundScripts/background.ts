export { };

console.log("background script loaded");

const check30Mins = () => {
  chrome.identity.getAuthToken({
    interactive: true,
  }, (token) => {
    console.log(token)
  })
}

chrome.commands.onCommand.addListener((cmd) => {
  console.log(cmd)
  if (cmd === '30mins') {
    check30Mins()
  }
})