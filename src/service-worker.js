import { getRequestCountForTabId, setRequestCountForTabId } from './utils.js'

chrome.webRequest.onCompleted.addListener(
    async (details) => {
        if (details.tabId == -1)
            return

        const count = await getRequestCountForTabId(details.tabId);
        setRequestCountForTabId(details.tabId, count + 1);
    },
    { urls: ["<all_urls>"] }
);