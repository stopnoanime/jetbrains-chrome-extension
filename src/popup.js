import { getRequestCountForTabId, getCurrentTabId, setRequestCountForTabId } from './utils.js'

function displayRequestCount(count) {
    document.getElementById('request-display').textContent = count;
}

async function main() {
    const tabId = await getCurrentTabId()

    if (tabId !== undefined)
        displayRequestCount(await getRequestCountForTabId(tabId))
}

async function resetRequestCount() {
    const tabId = await getCurrentTabId()

    if (tabId === undefined)
        return

    setRequestCountForTabId(tabId, 0);
    displayRequestCount(0);
}

main();
document.getElementById("reset-button").addEventListener("click", resetRequestCount)