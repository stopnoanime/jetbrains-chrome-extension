export async function getRequestCountForTabId(tabId) {
    tabId = tabId.toString();

    return (await chrome.storage.session.get(tabId))[tabId] || 0;
}

export async function setRequestCountForTabId(tabId, requestCount) {
    tabId = tabId.toString();

    await chrome.storage.session.set({ [tabId]: requestCount })
}

export async function getCurrentTabId() {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    return tab?.id
}