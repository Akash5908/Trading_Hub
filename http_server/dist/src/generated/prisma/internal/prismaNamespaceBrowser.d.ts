import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly User: "User";
    readonly Btc_1_min: "Btc_1_min";
    readonly Sol_1_min: "Sol_1_min";
    readonly Eth_1_min: "Eth_1_min";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly username: "username";
    readonly password: "password";
    readonly token: "token";
    readonly userBalance: "userBalance";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const Btc_1_minScalarFieldEnum: {
    readonly id: "id";
    readonly time: "time";
    readonly open: "open";
    readonly high: "high";
    readonly low: "low";
    readonly close: "close";
};
export type Btc_1_minScalarFieldEnum = (typeof Btc_1_minScalarFieldEnum)[keyof typeof Btc_1_minScalarFieldEnum];
export declare const Sol_1_minScalarFieldEnum: {
    readonly id: "id";
    readonly time: "time";
    readonly open: "open";
    readonly high: "high";
    readonly low: "low";
    readonly close: "close";
};
export type Sol_1_minScalarFieldEnum = (typeof Sol_1_minScalarFieldEnum)[keyof typeof Sol_1_minScalarFieldEnum];
export declare const Eth_1_minScalarFieldEnum: {
    readonly id: "id";
    readonly time: "time";
    readonly open: "open";
    readonly high: "high";
    readonly low: "low";
    readonly close: "close";
};
export type Eth_1_minScalarFieldEnum = (typeof Eth_1_minScalarFieldEnum)[keyof typeof Eth_1_minScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map