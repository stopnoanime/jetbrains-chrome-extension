const requestCounts = chrome.storage.session.get()

chrome.webRequest.onCompleted.addListener(
    async (req) => {
        if (req.tabId == -1)
            return

        const counts = await requestCounts;

        if (!counts[req.tabId])
            counts[req.tabId] = 0;

        counts[req.tabId]++;
        await chrome.storage.session.set({ [req.tabId]: counts[req.tabId] })
    },
    { urls: ["<all_urls>"] }
);

chrome.storage.session.onChanged.addListener((changes) => {
    for (const key in changes) {
        chrome.action.setBadgeText({ text: changes[key].newValue?.toString() || '', tabId: Number(key) });
    }
})

chrome.runtime.onMessage.addListener(async msg => {
    if (msg?.type === 'reset-count') {
        delete (await requestCounts)[msg.tabId]
        chrome.storage.session.remove(msg.tabId)
    }
});