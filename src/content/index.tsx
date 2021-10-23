import { DEFAULT_ACTIVITY_HOST, HOME_PAGE, LOGIN_PAGE, MARK, SCENE_VAL } from "@src/constants";
import { CLOSE_LOGIN_WINDOW, LOGIN_SUCCESS } from "@src/Events"
import { injectCustomJs, postChromeMessage } from "@src/utils"

// import { injectCustomJs } from '../utils';
function init() {
    if (location.href.indexOf(MARK) > -1) {
        if (location.href.indexOf(`${LOGIN_PAGE}`) > -1) {
            window.onbeforeunload = () => {
                postChromeMessage({ // 用户主动关闭窗口
                    type: CLOSE_LOGIN_WINDOW
                })
            }
        }
        if (location.href.indexOf(`${HOME_PAGE}?${SCENE_VAL}`) > -1) {
            postChromeMessage({
                type: LOGIN_SUCCESS
            })
            window.close();
        }

    }
    // window.onbeforeunload = function (){
    //     /* CODE */
    //     postChromeMessage({
    //         type: CLOSE_LOGIN_WINDOW
    //     })
    // }
}

if (document.readyState === 'loading') {
    onLoading();
    document.addEventListener('DOMContentLoaded', init);
} else {
    init()
}

function onLoading() {
    if (location.href.indexOf(DEFAULT_ACTIVITY_HOST) > -1) {
        injectCustomJs("js/inject.bundle.js").then(()=>{});
    }
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
