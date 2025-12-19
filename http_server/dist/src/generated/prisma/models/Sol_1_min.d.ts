import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Sol_1_min
 *
 */
export type Sol_1_minModel = runtime.Types.Result.DefaultSelection<Prisma.$Sol_1_minPayload>;
export type AggregateSol_1_min = {
    _count: Sol_1_minCountAggregateOutputType | null;
    _avg: Sol_1_minAvgAggregateOutputType | null;
    _sum: Sol_1_minSumAggregateOutputType | null;
    _min: Sol_1_minMinAggregateOutputType | null;
    _max: Sol_1_minMaxAggregateOutputType | null;
};
export type Sol_1_minAvgAggregateOutputType = {
    id: number | null;
    time: number | null;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
};
export type Sol_1_minSumAggregateOutputType = {
    id: number | null;
    time: number | null;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
};
export type Sol_1_minMinAggregateOutputType = {
    id: number | null;
    time: number | null;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
};
export type Sol_1_minMaxAggregateOutputType = {
    id: number | null;
    time: number | null;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
};
export type Sol_1_minCountAggregateOutputType = {
    id: number;
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    _all: number;
};
export type Sol_1_minAvgAggregateInputType = {
    id?: true;
    time?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
};
export type Sol_1_minSumAggregateInputType = {
    id?: true;
    time?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
};
export type Sol_1_minMinAggregateInputType = {
    id?: true;
    time?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
};
export type Sol_1_minMaxAggregateInputType = {
    id?: true;
    time?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
};
export type Sol_1_minCountAggregateInputType = {
    id?: true;
    time?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
    _all?: true;
};
export type Sol_1_minAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Sol_1_min to aggregate.
     */
    where?: Prisma.Sol_1_minWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sol_1_mins to fetch.
     */
    orderBy?: Prisma.Sol_1_minOrderByWithRelationInput | Prisma.Sol_1_minOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.Sol_1_minWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sol_1_mins from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sol_1_mins.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Sol_1_mins
    **/
    _count?: true | Sol_1_minCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Sol_1_minAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Sol_1_minSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Sol_1_minMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Sol_1_minMaxAggregateInputType;
};
export type GetSol_1_minAggregateType<T extends Sol_1_minAggregateArgs> = {
    [P in keyof T & keyof AggregateSol_1_min]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSol_1_min[P]> : Prisma.GetScalarType<T[P], AggregateSol_1_min[P]>;
};
export type Sol_1_minGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.Sol_1_minWhereInput;
    orderBy?: Prisma.Sol_1_minOrderByWithAggregationInput | Prisma.Sol_1_minOrderByWithAggregationInput[];
    by: Prisma.Sol_1_minScalarFieldEnum[] | Prisma.Sol_1_minScalarFieldEnum;
    having?: Prisma.Sol_1_minScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Sol_1_minCountAggregateInputType | true;
    _avg?: Sol_1_minAvgAggregateInputType;
    _sum?: Sol_1_minSumAggregateInputType;
    _min?: Sol_1_minMinAggregateInputType;
    _max?: Sol_1_minMaxAggregateInputType;
};
export type Sol_1_minGroupByOutputType = {
    id: number;
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    _count: Sol_1_minCountAggregateOutputType | null;
    _avg: Sol_1_minAvgAggregateOutputType | null;
    _sum: Sol_1_minSumAggregateOutputType | null;
    _min: Sol_1_minMinAggregateOutputType | null;
    _max: Sol_1_minMaxAggregateOutputType | null;
};
type GetSol_1_minGroupByPayload<T extends Sol_1_minGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Sol_1_minGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Sol_1_minGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Sol_1_minGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Sol_1_minGroupByOutputType[P]>;
}>>;
export type Sol_1_minWhereInput = {
    AND?: Prisma.Sol_1_minWhereInput | Prisma.Sol_1_minWhereInput[];
    OR?: Prisma.Sol_1_minWhereInput[];
    NOT?: Prisma.Sol_1_minWhereInput | Prisma.Sol_1_minWhereInput[];
    id?: Prisma.IntFilter<"Sol_1_min"> | number;
    time?: Prisma.FloatFilter<"Sol_1_min"> | number;
    open?: Prisma.FloatFilter<"Sol_1_min"> | number;
    high?: Prisma.FloatFilter<"Sol_1_min"> | number;
    low?: Prisma.FloatFilter<"Sol_1_min"> | number;
    close?: Prisma.FloatFilter<"Sol_1_min"> | number;
};
export type Sol_1_minOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
};
export type Sol_1_minWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.Sol_1_minWhereInput | Prisma.Sol_1_minWhereInput[];
    OR?: Prisma.Sol_1_minWhereInput[];
    NOT?: Prisma.Sol_1_minWhereInput | Prisma.Sol_1_minWhereInput[];
    time?: Prisma.FloatFilter<"Sol_1_min"> | number;
    open?: Prisma.FloatFilter<"Sol_1_min"> | number;
    high?: Prisma.FloatFilter<"Sol_1_min"> | number;
    low?: Prisma.FloatFilter<"Sol_1_min"> | number;
    close?: Prisma.FloatFilter<"Sol_1_min"> | number;
}, "id">;
export type Sol_1_minOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    _count?: Prisma.Sol_1_minCountOrderByAggregateInput;
    _avg?: Prisma.Sol_1_minAvgOrderByAggregateInput;
    _max?: Prisma.Sol_1_minMaxOrderByAggregateInput;
    _min?: Prisma.Sol_1_minMinOrderByAggregateInput;
    _sum?: Prisma.Sol_1_minSumOrderByAggregateInput;
};
export type Sol_1_minScalarWhereWithAggregatesInput = {
    AND?: Prisma.Sol_1_minScalarWhereWithAggregatesInput | Prisma.Sol_1_minScalarWhereWithAggregatesInput[];
    OR?: Prisma.Sol_1_minScalarWhereWithAggregatesInput[];
    NOT?: Prisma.Sol_1_minScalarWhereWithAggregatesInput | Prisma.Sol_1_minScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Sol_1_min"> | number;
    time?: Prisma.FloatWithAggregatesFilter<"Sol_1_min"> | number;
    open?: Prisma.FloatWithAggregatesFilter<"Sol_1_min"> | number;
    high?: Prisma.FloatWithAggregatesFilter<"Sol_1_min"> | number;
    low?: Prisma.FloatWithAggregatesFilter<"Sol_1_min"> | number;
    close?: Prisma.FloatWithAggregatesFilter<"Sol_1_min"> | number;
};
export type Sol_1_minCreateInput = {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
};
export type Sol_1_minUncheckedCreateInput = {
    id?: number;
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
};
export type Sol_1_minUpdateInput = {
    time?: Prisma.FloatFieldUpdateOperationsInput | number;
    open?: Prisma.FloatFieldUpdateOperationsInput | number;
    high?: Prisma.FloatFieldUpdateOperationsInput | number;
    low?: Prisma.FloatFieldUpdateOperationsInput | number;
    close?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type Sol_1_minUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    time?: Prisma.FloatFieldUpdateOperationsInput | number;
    open?: Prisma.FloatFieldUpdateOperationsInput | number;
    high?: Prisma.FloatFieldUpdateOperationsInput | number;
    low?: Prisma.FloatFieldUpdateOperationsInput | number;
    close?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type Sol_1_minCreateManyInput = {
    id?: number;
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
};
export type Sol_1_minUpdateManyMutationInput = {
    time?: Prisma.FloatFieldUpdateOperationsInput | number;
    open?: Prisma.FloatFieldUpdateOperationsInput | number;
    high?: Prisma.FloatFieldUpdateOperationsInput | number;
    low?: Prisma.FloatFieldUpdateOperationsInput | number;
    close?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type Sol_1_minUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    time?: Prisma.FloatFieldUpdateOperationsInput | number;
    open?: Prisma.FloatFieldUpdateOperationsInput | number;
    high?: Prisma.FloatFieldUpdateOperationsInput | number;
    low?: Prisma.FloatFieldUpdateOperationsInput | number;
    close?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type Sol_1_minCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
};
export type Sol_1_minAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
};
export type Sol_1_minMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
};
export type Sol_1_minMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
};
export type Sol_1_minSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
};
export type Sol_1_minSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    time?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
}, ExtArgs["result"]["sol_1_min"]>;
export type Sol_1_minSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    time?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
}, ExtArgs["result"]["sol_1_min"]>;
export type Sol_1_minSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    time?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
}, ExtArgs["result"]["sol_1_min"]>;
export type Sol_1_minSelectScalar = {
    id?: boolean;
    time?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
};
export type Sol_1_minOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "time" | "open" | "high" | "low" | "close", ExtArgs["result"]["sol_1_min"]>;
export type $Sol_1_minPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Sol_1_min";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        time: number;
        open: number;
        high: number;
        low: number;
        close: number;
    }, ExtArgs["result"]["sol_1_min"]>;
    composites: {};
};
export type Sol_1_minGetPayload<S extends boolean | null | undefined | Sol_1_minDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$Sol_1_minPayload, S>;
export type Sol_1_minCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<Sol_1_minFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Sol_1_minCountAggregateInputType | true;
};
export interface Sol_1_minDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Sol_1_min'];
        meta: {
            name: 'Sol_1_min';
        };
    };
    /**
     * Find zero or one Sol_1_min that matches the filter.
     * @param {Sol_1_minFindUniqueArgs} args - Arguments to find a Sol_1_min
     * @example
     * // Get one Sol_1_min
     * const sol_1_min = await prisma.sol_1_min.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Sol_1_minFindUniqueArgs>(args: Prisma.SelectSubset<T, Sol_1_minFindUniqueArgs<ExtArgs>>): Prisma.Prisma__Sol_1_minClient<runtime.Types.Result.GetResult<Prisma.$Sol_1_minPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Sol_1_min that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Sol_1_minFindUniqueOrThrowArgs} args - Arguments to find a Sol_1_min
     * @example
     * // Get one Sol_1_min
     * const sol_1_min = await prisma.sol_1_min.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Sol_1_minFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, Sol_1_minFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__Sol_1_minClient<runtime.Types.Result.GetResult<Prisma.$Sol_1_minPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Sol_1_min that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sol_1_minFindFirstArgs} args - Arguments to find a Sol_1_min
     * @example
     * // Get one Sol_1_min
     * const sol_1_min = await prisma.sol_1_min.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Sol_1_minFindFirstArgs>(args?: Prisma.SelectSubset<T, Sol_1_minFindFirstArgs<ExtArgs>>): Prisma.Prisma__Sol_1_minClient<runtime.Types.Result.GetResult<Prisma.$Sol_1_minPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Sol_1_min that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sol_1_minFindFirstOrThrowArgs} args - Arguments to find a Sol_1_min
     * @example
     * // Get one Sol_1_min
     * const sol_1_min = await prisma.sol_1_min.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Sol_1_minFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, Sol_1_minFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__Sol_1_minClient<runtime.Types.Result.GetResult<Prisma.$Sol_1_minPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Sol_1_mins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sol_1_minFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sol_1_mins
     * const sol_1_mins = await prisma.sol_1_min.findMany()
     *
     * // Get first 10 Sol_1_mins
     * const sol_1_mins = await prisma.sol_1_min.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const sol_1_minWithIdOnly = await prisma.sol_1_min.findMany({ select: { id: true } })
     *
     */
    findMany<T extends Sol_1_minFindManyArgs>(args?: Prisma.SelectSubset<T, Sol_1_minFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$Sol_1_minPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Sol_1_min.
     * @param {Sol_1_minCreateArgs} args - Arguments to create a Sol_1_min.
     * @example
     * // Create one Sol_1_min
     * const Sol_1_min = await prisma.sol_1_min.create({
     *   data: {
     *     // ... data to create a Sol_1_min
     *   }
     * })
     *
     */
    create<T extends Sol_1_minCreateArgs>(args: Prisma.SelectSubset<T, Sol_1_minCreateArgs<ExtArgs>>): Prisma.Prisma__Sol_1_minClient<runtime.Types.Result.GetResult<Prisma.$Sol_1_minPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Sol_1_mins.
     * @param {Sol_1_minCreateManyArgs} args - Arguments to create many Sol_1_mins.
     * @example
     * // Create many Sol_1_mins
     * const sol_1_min = await prisma.sol_1_min.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends Sol_1_minCreateManyArgs>(args?: Prisma.SelectSubset<T, Sol_1_minCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Sol_1_mins and returns the data saved in the database.
     * @param {Sol_1_minCreateManyAndReturnArgs} args - Arguments to create many Sol_1_mins.
     * @example
     * // Create many Sol_1_mins
     * const sol_1_min = await prisma.sol_1_min.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Sol_1_mins and only return the `id`
     * const sol_1_minWithIdOnly = await prisma.sol_1_min.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends Sol_1_minCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, Sol_1_minCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$Sol_1_minPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Sol_1_min.
     * @param {Sol_1_minDeleteArgs} args - Arguments to delete one Sol_1_min.
     * @example
     * // Delete one Sol_1_min
     * const Sol_1_min = await prisma.sol_1_min.delete({
     *   where: {
     *     // ... filter to delete one Sol_1_min
     *   }
     * })
     *
     */
    delete<T extends Sol_1_minDeleteArgs>(args: Prisma.SelectSubset<T, Sol_1_minDeleteArgs<ExtArgs>>): Prisma.Prisma__Sol_1_minClient<runtime.Types.Result.GetResult<Prisma.$Sol_1_minPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Sol_1_min.
     * @param {Sol_1_minUpdateArgs} args - Arguments to update one Sol_1_min.
     * @example
     * // Update one Sol_1_min
     * const sol_1_min = await prisma.sol_1_min.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends Sol_1_minUpdateArgs>(args: Prisma.SelectSubset<T, Sol_1_minUpdateArgs<ExtArgs>>): Prisma.Prisma__Sol_1_minClient<runtime.Types.Result.GetResult<Prisma.$Sol_1_minPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Sol_1_mins.
     * @param {Sol_1_minDeleteManyArgs} args - Arguments to filter Sol_1_mins to delete.
     * @example
     * // Delete a few Sol_1_mins
     * const { count } = await prisma.sol_1_min.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends Sol_1_minDeleteManyArgs>(args?: Prisma.SelectSubset<T, Sol_1_minDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Sol_1_mins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sol_1_minUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sol_1_mins
     * const sol_1_min = await prisma.sol_1_min.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends Sol_1_minUpdateManyArgs>(args: Prisma.SelectSubset<T, Sol_1_minUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Sol_1_mins and returns the data updated in the database.
     * @param {Sol_1_minUpdateManyAndReturnArgs} args - Arguments to update many Sol_1_mins.
     * @example
     * // Update many Sol_1_mins
     * const sol_1_min = await prisma.sol_1_min.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Sol_1_mins and only return the `id`
     * const sol_1_minWithIdOnly = await prisma.sol_1_min.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends Sol_1_minUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, Sol_1_minUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$Sol_1_minPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Sol_1_min.
     * @param {Sol_1_minUpsertArgs} args - Arguments to update or create a Sol_1_min.
     * @example
     * // Update or create a Sol_1_min
     * const sol_1_min = await prisma.sol_1_min.upsert({
     *   create: {
     *     // ... data to create a Sol_1_min
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sol_1_min we want to update
     *   }
     * })
     */
    upsert<T extends Sol_1_minUpsertArgs>(args: Prisma.SelectSubset<T, Sol_1_minUpsertArgs<ExtArgs>>): Prisma.Prisma__Sol_1_minClient<runtime.Types.Result.GetResult<Prisma.$Sol_1_minPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Sol_1_mins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sol_1_minCountArgs} args - Arguments to filter Sol_1_mins to count.
     * @example
     * // Count the number of Sol_1_mins
     * const count = await prisma.sol_1_min.count({
     *   where: {
     *     // ... the filter for the Sol_1_mins we want to count
     *   }
     * })
    **/
    count<T extends Sol_1_minCountArgs>(args?: Prisma.Subset<T, Sol_1_minCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Sol_1_minCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Sol_1_min.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sol_1_minAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Sol_1_minAggregateArgs>(args: Prisma.Subset<T, Sol_1_minAggregateArgs>): Prisma.PrismaPromise<GetSol_1_minAggregateType<T>>;
    /**
     * Group by Sol_1_min.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Sol_1_minGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends Sol_1_minGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: Sol_1_minGroupByArgs['orderBy'];
    } : {
        orderBy?: Sol_1_minGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, Sol_1_minGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSol_1_minGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Sol_1_min model
     */
    readonly fields: Sol_1_minFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Sol_1_min.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__Sol_1_minClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Sol_1_min model
 */
export interface Sol_1_minFieldRefs {
    readonly id: Prisma.FieldRef<"Sol_1_min", 'Int'>;
    readonly time: Prisma.FieldRef<"Sol_1_min", 'Float'>;
    readonly open: Prisma.FieldRef<"Sol_1_min", 'Float'>;
    readonly high: Prisma.FieldRef<"Sol_1_min", 'Float'>;
    readonly low: Prisma.FieldRef<"Sol_1_min", 'Float'>;
    readonly close: Prisma.FieldRef<"Sol_1_min", 'Float'>;
}
/**
 * Sol_1_min findUnique
 */
export type Sol_1_minFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sol_1_min
     */
    select?: Prisma.Sol_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Sol_1_min
     */
    omit?: Prisma.Sol_1_minOmit<ExtArgs> | null;
    /**
     * Filter, which Sol_1_min to fetch.
     */
    where: Prisma.Sol_1_minWhereUniqueInput;
};
/**
 * Sol_1_min findUniqueOrThrow
 */
export type Sol_1_minFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sol_1_min
     */
    select?: Prisma.Sol_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Sol_1_min
     */
    omit?: Prisma.Sol_1_minOmit<ExtArgs> | null;
    /**
     * Filter, which Sol_1_min to fetch.
     */
    where: Prisma.Sol_1_minWhereUniqueInput;
};
/**
 * Sol_1_min findFirst
 */
export type Sol_1_minFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sol_1_min
     */
    select?: Prisma.Sol_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Sol_1_min
     */
    omit?: Prisma.Sol_1_minOmit<ExtArgs> | null;
    /**
     * Filter, which Sol_1_min to fetch.
     */
    where?: Prisma.Sol_1_minWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sol_1_mins to fetch.
     */
    orderBy?: Prisma.Sol_1_minOrderByWithRelationInput | Prisma.Sol_1_minOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sol_1_mins.
     */
    cursor?: Prisma.Sol_1_minWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sol_1_mins from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sol_1_mins.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sol_1_mins.
     */
    distinct?: Prisma.Sol_1_minScalarFieldEnum | Prisma.Sol_1_minScalarFieldEnum[];
};
/**
 * Sol_1_min findFirstOrThrow
 */
export type Sol_1_minFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sol_1_min
     */
    select?: Prisma.Sol_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Sol_1_min
     */
    omit?: Prisma.Sol_1_minOmit<ExtArgs> | null;
    /**
     * Filter, which Sol_1_min to fetch.
     */
    where?: Prisma.Sol_1_minWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sol_1_mins to fetch.
     */
    orderBy?: Prisma.Sol_1_minOrderByWithRelationInput | Prisma.Sol_1_minOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sol_1_mins.
     */
    cursor?: Prisma.Sol_1_minWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sol_1_mins from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sol_1_mins.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sol_1_mins.
     */
    distinct?: Prisma.Sol_1_minScalarFieldEnum | Prisma.Sol_1_minScalarFieldEnum[];
};
/**
 * Sol_1_min findMany
 */
export type Sol_1_minFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sol_1_min
     */
    select?: Prisma.Sol_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Sol_1_min
     */
    omit?: Prisma.Sol_1_minOmit<ExtArgs> | null;
    /**
     * Filter, which Sol_1_mins to fetch.
     */
    where?: Prisma.Sol_1_minWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sol_1_mins to fetch.
     */
    orderBy?: Prisma.Sol_1_minOrderByWithRelationInput | Prisma.Sol_1_minOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Sol_1_mins.
     */
    cursor?: Prisma.Sol_1_minWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sol_1_mins from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sol_1_mins.
     */
    skip?: number;
    distinct?: Prisma.Sol_1_minScalarFieldEnum | Prisma.Sol_1_minScalarFieldEnum[];
};
/**
 * Sol_1_min create
 */
export type Sol_1_minCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sol_1_min
     */
    select?: Prisma.Sol_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Sol_1_min
     */
    omit?: Prisma.Sol_1_minOmit<ExtArgs> | null;
    /**
     * The data needed to create a Sol_1_min.
     */
    data: Prisma.XOR<Prisma.Sol_1_minCreateInput, Prisma.Sol_1_minUncheckedCreateInput>;
};
/**
 * Sol_1_min createMany
 */
export type Sol_1_minCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sol_1_mins.
     */
    data: Prisma.Sol_1_minCreateManyInput | Prisma.Sol_1_minCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Sol_1_min createManyAndReturn
 */
export type Sol_1_minCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sol_1_min
     */
    select?: Prisma.Sol_1_minSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Sol_1_min
     */
    omit?: Prisma.Sol_1_minOmit<ExtArgs> | null;
    /**
     * The data used to create many Sol_1_mins.
     */
    data: Prisma.Sol_1_minCreateManyInput | Prisma.Sol_1_minCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Sol_1_min update
 */
export type Sol_1_minUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sol_1_min
     */
    select?: Prisma.Sol_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Sol_1_min
     */
    omit?: Prisma.Sol_1_minOmit<ExtArgs> | null;
    /**
     * The data needed to update a Sol_1_min.
     */
    data: Prisma.XOR<Prisma.Sol_1_minUpdateInput, Prisma.Sol_1_minUncheckedUpdateInput>;
    /**
     * Choose, which Sol_1_min to update.
     */
    where: Prisma.Sol_1_minWhereUniqueInput;
};
/**
 * Sol_1_min updateMany
 */
export type Sol_1_minUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Sol_1_mins.
     */
    data: Prisma.XOR<Prisma.Sol_1_minUpdateManyMutationInput, Prisma.Sol_1_minUncheckedUpdateManyInput>;
    /**
     * Filter which Sol_1_mins to update
     */
    where?: Prisma.Sol_1_minWhereInput;
    /**
     * Limit how many Sol_1_mins to update.
     */
    limit?: number;
};
/**
 * Sol_1_min updateManyAndReturn
 */
export type Sol_1_minUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sol_1_min
     */
    select?: Prisma.Sol_1_minSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Sol_1_min
     */
    omit?: Prisma.Sol_1_minOmit<ExtArgs> | null;
    /**
     * The data used to update Sol_1_mins.
     */
    data: Prisma.XOR<Prisma.Sol_1_minUpdateManyMutationInput, Prisma.Sol_1_minUncheckedUpdateManyInput>;
    /**
     * Filter which Sol_1_mins to update
     */
    where?: Prisma.Sol_1_minWhereInput;
    /**
     * Limit how many Sol_1_mins to update.
     */
    limit?: number;
};
/**
 * Sol_1_min upsert
 */
export type Sol_1_minUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sol_1_min
     */
    select?: Prisma.Sol_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Sol_1_min
     */
    omit?: Prisma.Sol_1_minOmit<ExtArgs> | null;
    /**
     * The filter to search for the Sol_1_min to update in case it exists.
     */
    where: Prisma.Sol_1_minWhereUniqueInput;
    /**
     * In case the Sol_1_min found by the `where` argument doesn't exist, create a new Sol_1_min with this data.
     */
    create: Prisma.XOR<Prisma.Sol_1_minCreateInput, Prisma.Sol_1_minUncheckedCreateInput>;
    /**
     * In case the Sol_1_min was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.Sol_1_minUpdateInput, Prisma.Sol_1_minUncheckedUpdateInput>;
};
/**
 * Sol_1_min delete
 */
export type Sol_1_minDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sol_1_min
     */
    select?: Prisma.Sol_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Sol_1_min
     */
    omit?: Prisma.Sol_1_minOmit<ExtArgs> | null;
    /**
     * Filter which Sol_1_min to delete.
     */
    where: Prisma.Sol_1_minWhereUniqueInput;
};
/**
 * Sol_1_min deleteMany
 */
export type Sol_1_minDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Sol_1_mins to delete
     */
    where?: Prisma.Sol_1_minWhereInput;
    /**
     * Limit how many Sol_1_mins to delete.
     */
    limit?: number;
};
/**
 * Sol_1_min without action
 */
export type Sol_1_minDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sol_1_min
     */
    select?: Prisma.Sol_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Sol_1_min
     */
    omit?: Prisma.Sol_1_minOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Sol_1_min.d.ts.map