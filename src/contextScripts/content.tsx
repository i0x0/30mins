export { }
import { Inject } from "./inject";
//import React from "react";
import ReactDOM from "react-dom/client";

const { createElement } = document

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelectorAll(
        "body > div.tEhMVd > div.pSp5K > div.KKOvEb > div.SGWAac > div.QQYuzf > div > div.hEtGGf.HDIIVe.sBn5T"
    )

    const div = document.createElement("div")
    div.className = ""
    const text = document.createElement("h2")
    text.innerHTML = "hi"
    div.append(text)
    sidebar[0].append(div)
});

/// TODO: lazy load inject
const observer = new MutationObserver((mutations, mutationInstance) => {
    const sidebar = document.querySelector(
        "body > div.tEhMVd > div.pSp5K > div.KKOvEb > div.SGWAac > div.QQYuzf > div > div.hEtGGf.HDIIVe.sBn5T"
    )
    if (sidebar) {
        console.log(sidebar)
        inject(sidebar)
        mutationInstance.disconnect()
    }
})

observer.observe(document, {
    childList: true,
    subtree: true
});

const inject = (x: Element) => {
    const wrapper = document.createElement("div")
    wrapper.id = 'crx-root'
    x.appendChild(wrapper)
    ReactDOM.createRoot(wrapper).render(<Inject />)
}