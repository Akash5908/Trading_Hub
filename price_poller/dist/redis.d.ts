declare const assetArray: {
    btc: string;
    sol: string;
    eth: string;
};
export declare function pushToRedis(redis: any, trades: any, asset: keyof typeof assetArray): Promise<void>;
export {};
//# sourceMappingURL=redis.d.ts.map