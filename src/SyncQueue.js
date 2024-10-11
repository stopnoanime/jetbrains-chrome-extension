// We need this queue to avoid concurrency issues when updating chrome.storage.
// Without this queue we might miss some increments if requests complete in rapid succession.
// This queue makes sure that the previous write completes before the next read starts.

export class SyncQueue {
    queue = [];
    processingInProgress = false;
    messageCallback;

    constructor(messageCallback) {
        this.messageCallback = messageCallback;
    }

    async addToQueue(message) {
        this.queue.push(message);

        if (!this.queueIsProcessing)
            await this.processQueue();
    }

    async processQueue() {
        this.queueIsProcessing = true;

        while (this.queue.length) {
            const message = this.queue.shift();
            await this.messageCallback(message);
        }

        this.queueIsProcessing = false;
    }
}