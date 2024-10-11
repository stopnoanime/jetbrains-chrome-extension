import { getRequestCountForTabId } from './utils.js'

function displayRequestCount(count) {
    document.getElementById('request-display').textContent = count;
}

async function main() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    if (tab?.id !== undefined)
        displayRequestCount(await getRequestCountForTabId(tab.id))
}

main();
