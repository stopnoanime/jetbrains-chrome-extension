import { getRequestCountForTabId, getCurrentTabId, displayRequestCount } from './utils.js'

async function init() {
    const tabId = await getCurrentTabId()

    if (tabId !== undefined)
        displayRequestCount(await getRequestCountForTabId(tabId))
}

async function updateDisplayRequestCount(changeObject) {
    const tabId = await getCurrentTabId()

    if (tabId !== undefined && changeObject[tabId])
        displayRequestCount(changeObject[tabId].newValue);
}

async function resetRequestCount() {
    const tabId = await getCurrentTabId()

    if (tabId !== undefined)
        chrome.runtime.sendMessage({ type: 'reset-count', tabId: tabId })
}

init();
chrome.storage.session.onChanged.addListener(updateDisplayRequestCount)
document.getElementById("reset-button").addEventListener("click", resetRequestCount)