export declare const CALLBACK_QUEUE = "callback-queue";
export declare class RedisSubscriber {
    private client;
    private callbacks;
    constructor();
    runLoop(): Promise<void>;
    waitForMessage(callbackId: string): Promise<unknown>;
}
//# sourceMappingURL=redisSubscriber.d.ts.map