export async function getRequestCountForTabId(tabId) {
    tabId = tabId.toString();

    return (await chrome.storage.session.get(tabId))[tabId] || 0;
}

export function setRequestCountForTabId(tabId, requestCount) {
    tabId = tabId.toString();

    chrome.storage.session.set({ [tabId]: requestCount })
}

export async function getCurrentTabId() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    return tab?.id
}