import { getRequestCountForTabId, getCurrentTabId, setRequestCountForTabId } from './utils.js'

function displayRequestCount(count) {
    document.getElementById('request-display').textContent = count;
}

async function init() {
    const tabId = await getCurrentTabId()

    if (tabId !== undefined)
        displayRequestCount(await getRequestCountForTabId(tabId))
}

async function resetRequestCount() {
    const tabId = await getCurrentTabId()

    if (tabId === undefined)
        return

    setRequestCountForTabId(tabId, 0);
}

async function updateDisplayRequestCount(changeObject) {
    const tabId = await getCurrentTabId()

    if (tabId === undefined)
        return

    if (changeObject[tabId]) {
        const newCount = changeObject[tabId].newValue;
        displayRequestCount(newCount);
    }
}

init();
chrome.storage.session.onChanged.addListener(updateDisplayRequestCount)
document.getElementById("reset-button").addEventListener("click", resetRequestCount)