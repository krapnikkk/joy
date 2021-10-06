import { injectCustomJs } from '../utils';
function init() {
    injectCustomJs("js/inject.bundle.js").then(()=>{
        console.log("inject");
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}



// injects a copy of stylesheets so that other extensions(e.g. dark reader) could read
// resolves when style is loaded to prevent render without proper styles
// async function injectStyles(url: string) {
//     return new Promise<void>(resolve => {
//         const linkElement = document.createElement('link')
//         linkElement.setAttribute('rel', 'stylesheet')
//         linkElement.setAttribute('href', url)
//         linkElement.onload = () => resolve()
//         document.head.appendChild(linkElement)
//     })
// }
