export async function getCurrentTabId() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    return tab?.id?.toString()
}

export async function getRequestCountForTabId(tabId) {
    return (await chrome.storage.session.get(tabId))[tabId];
}

export function displayRequestCount(count) {
    document.getElementById('request-display').textContent = count || 0;
}
