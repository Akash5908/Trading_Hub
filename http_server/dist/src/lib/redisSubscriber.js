import { createClient } from "redis";
export const CALLBACK_QUEUE = "callback-queue";
export class RedisSubscriber {
    client;
    callbacks;
    constructor() {
        this.client = createClient();
        this.client.connect();
        this.runLoop();
        this.callbacks = {};
    }
    async runLoop() {
        while (1) {
            const response = await this.client.xRead({
                key: CALLBACK_QUEUE,
                id: "$",
            }, {
                COUNT: 1,
                BLOCK: 0,
            });
            console.log("hi there");
            if (!response) {
                continue;
            }
            //@ts-ignore
            const { name, messages } = response[0];
            const order = JSON.parse(messages[0].message.message);
            console.log("received message from the callback queue/engine");
            const messageId = order.id;
            if (this.callbacks[messageId]) {
                this.callbacks[messageId]({ order });
                delete this.callbacks[messageId];
            }
        }
    }
    // throw an error (reject) if u dont get back a message in 5s
    waitForMessage(callbackId) {
        return new Promise((resolve, reject) => {
            this.callbacks[callbackId] = resolve;
            setTimeout(() => {
                if (this.callbacks[callbackId]) {
                    reject();
                }
            }, 5000);
        });
    }
}
//# sourceMappingURL=redisSubscriber.js.map