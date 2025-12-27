interface OpenOrder {
    id: string;
    asset: "BTC" | "SOL" | "ETH";
    side: "buy" | "sell";
    kind?: string;
    qty: number;
    entryPrice: number;
    positionValue?: number;
    userName: string;
    currentPnl?: number;
}
export declare function calculatePnL(order: OpenOrder, currentPrice: number): number;
export declare function calculatePositionValue(order: OpenOrder): number;
export {};
//# sourceMappingURL=index.d.ts.map