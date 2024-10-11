import { getRequestCountForTabId, setRequestCountForTabId } from './utils.js'
import { SyncQueue } from './SyncQueue.js'

const queue = new SyncQueue(async (tabId) => {
    const count = await getRequestCountForTabId(tabId);
    await setRequestCountForTabId(tabId, count + 1);
})

chrome.webRequest.onCompleted.addListener(
    async (details) => {
        if (details.tabId == -1)
            return

        await queue.addToQueue(details.tabId);
    },
    { urls: ["<all_urls>"] }
);