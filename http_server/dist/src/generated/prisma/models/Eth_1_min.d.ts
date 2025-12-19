import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Eth_1_min
 *
 */
export type Eth_1_minModel = runtime.Types.Result.DefaultSelection<Prisma.$Eth_1_minPayload>;
export type AggregateEth_1_min = {
    _count: Eth_1_minCountAggregateOutputType | null;
    _avg: Eth_1_minAvgAggregateOutputType | null;
    _sum: Eth_1_minSumAggregateOutputType | null;
    _min: Eth_1_minMinAggregateOutputType | null;
    _max: Eth_1_minMaxAggregateOutputType | null;
};
export type Eth_1_minAvgAggregateOutputType = {
    id: number | null;
    time: number | null;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
};
export type Eth_1_minSumAggregateOutputType = {
    id: number | null;
    time: number | null;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
};
export type Eth_1_minMinAggregateOutputType = {
    id: number | null;
    time: number | null;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
};
export type Eth_1_minMaxAggregateOutputType = {
    id: number | null;
    time: number | null;
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
};
export type Eth_1_minCountAggregateOutputType = {
    id: number;
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    _all: number;
};
export type Eth_1_minAvgAggregateInputType = {
    id?: true;
    time?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
};
export type Eth_1_minSumAggregateInputType = {
    id?: true;
    time?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
};
export type Eth_1_minMinAggregateInputType = {
    id?: true;
    time?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
};
export type Eth_1_minMaxAggregateInputType = {
    id?: true;
    time?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
};
export type Eth_1_minCountAggregateInputType = {
    id?: true;
    time?: true;
    open?: true;
    high?: true;
    low?: true;
    close?: true;
    _all?: true;
};
export type Eth_1_minAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Eth_1_min to aggregate.
     */
    where?: Prisma.Eth_1_minWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Eth_1_mins to fetch.
     */
    orderBy?: Prisma.Eth_1_minOrderByWithRelationInput | Prisma.Eth_1_minOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.Eth_1_minWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Eth_1_mins from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Eth_1_mins.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Eth_1_mins
    **/
    _count?: true | Eth_1_minCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: Eth_1_minAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: Eth_1_minSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: Eth_1_minMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: Eth_1_minMaxAggregateInputType;
};
export type GetEth_1_minAggregateType<T extends Eth_1_minAggregateArgs> = {
    [P in keyof T & keyof AggregateEth_1_min]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEth_1_min[P]> : Prisma.GetScalarType<T[P], AggregateEth_1_min[P]>;
};
export type Eth_1_minGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.Eth_1_minWhereInput;
    orderBy?: Prisma.Eth_1_minOrderByWithAggregationInput | Prisma.Eth_1_minOrderByWithAggregationInput[];
    by: Prisma.Eth_1_minScalarFieldEnum[] | Prisma.Eth_1_minScalarFieldEnum;
    having?: Prisma.Eth_1_minScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Eth_1_minCountAggregateInputType | true;
    _avg?: Eth_1_minAvgAggregateInputType;
    _sum?: Eth_1_minSumAggregateInputType;
    _min?: Eth_1_minMinAggregateInputType;
    _max?: Eth_1_minMaxAggregateInputType;
};
export type Eth_1_minGroupByOutputType = {
    id: number;
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    _count: Eth_1_minCountAggregateOutputType | null;
    _avg: Eth_1_minAvgAggregateOutputType | null;
    _sum: Eth_1_minSumAggregateOutputType | null;
    _min: Eth_1_minMinAggregateOutputType | null;
    _max: Eth_1_minMaxAggregateOutputType | null;
};
type GetEth_1_minGroupByPayload<T extends Eth_1_minGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<Eth_1_minGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof Eth_1_minGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], Eth_1_minGroupByOutputType[P]> : Prisma.GetScalarType<T[P], Eth_1_minGroupByOutputType[P]>;
}>>;
export type Eth_1_minWhereInput = {
    AND?: Prisma.Eth_1_minWhereInput | Prisma.Eth_1_minWhereInput[];
    OR?: Prisma.Eth_1_minWhereInput[];
    NOT?: Prisma.Eth_1_minWhereInput | Prisma.Eth_1_minWhereInput[];
    id?: Prisma.IntFilter<"Eth_1_min"> | number;
    time?: Prisma.FloatFilter<"Eth_1_min"> | number;
    open?: Prisma.FloatFilter<"Eth_1_min"> | number;
    high?: Prisma.FloatFilter<"Eth_1_min"> | number;
    low?: Prisma.FloatFilter<"Eth_1_min"> | number;
    close?: Prisma.FloatFilter<"Eth_1_min"> | number;
};
export type Eth_1_minOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
};
export type Eth_1_minWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.Eth_1_minWhereInput | Prisma.Eth_1_minWhereInput[];
    OR?: Prisma.Eth_1_minWhereInput[];
    NOT?: Prisma.Eth_1_minWhereInput | Prisma.Eth_1_minWhereInput[];
    time?: Prisma.FloatFilter<"Eth_1_min"> | number;
    open?: Prisma.FloatFilter<"Eth_1_min"> | number;
    high?: Prisma.FloatFilter<"Eth_1_min"> | number;
    low?: Prisma.FloatFilter<"Eth_1_min"> | number;
    close?: Prisma.FloatFilter<"Eth_1_min"> | number;
}, "id">;
export type Eth_1_minOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
    _count?: Prisma.Eth_1_minCountOrderByAggregateInput;
    _avg?: Prisma.Eth_1_minAvgOrderByAggregateInput;
    _max?: Prisma.Eth_1_minMaxOrderByAggregateInput;
    _min?: Prisma.Eth_1_minMinOrderByAggregateInput;
    _sum?: Prisma.Eth_1_minSumOrderByAggregateInput;
};
export type Eth_1_minScalarWhereWithAggregatesInput = {
    AND?: Prisma.Eth_1_minScalarWhereWithAggregatesInput | Prisma.Eth_1_minScalarWhereWithAggregatesInput[];
    OR?: Prisma.Eth_1_minScalarWhereWithAggregatesInput[];
    NOT?: Prisma.Eth_1_minScalarWhereWithAggregatesInput | Prisma.Eth_1_minScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Eth_1_min"> | number;
    time?: Prisma.FloatWithAggregatesFilter<"Eth_1_min"> | number;
    open?: Prisma.FloatWithAggregatesFilter<"Eth_1_min"> | number;
    high?: Prisma.FloatWithAggregatesFilter<"Eth_1_min"> | number;
    low?: Prisma.FloatWithAggregatesFilter<"Eth_1_min"> | number;
    close?: Prisma.FloatWithAggregatesFilter<"Eth_1_min"> | number;
};
export type Eth_1_minCreateInput = {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
};
export type Eth_1_minUncheckedCreateInput = {
    id?: number;
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
};
export type Eth_1_minUpdateInput = {
    time?: Prisma.FloatFieldUpdateOperationsInput | number;
    open?: Prisma.FloatFieldUpdateOperationsInput | number;
    high?: Prisma.FloatFieldUpdateOperationsInput | number;
    low?: Prisma.FloatFieldUpdateOperationsInput | number;
    close?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type Eth_1_minUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    time?: Prisma.FloatFieldUpdateOperationsInput | number;
    open?: Prisma.FloatFieldUpdateOperationsInput | number;
    high?: Prisma.FloatFieldUpdateOperationsInput | number;
    low?: Prisma.FloatFieldUpdateOperationsInput | number;
    close?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type Eth_1_minCreateManyInput = {
    id?: number;
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
};
export type Eth_1_minUpdateManyMutationInput = {
    time?: Prisma.FloatFieldUpdateOperationsInput | number;
    open?: Prisma.FloatFieldUpdateOperationsInput | number;
    high?: Prisma.FloatFieldUpdateOperationsInput | number;
    low?: Prisma.FloatFieldUpdateOperationsInput | number;
    close?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type Eth_1_minUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    time?: Prisma.FloatFieldUpdateOperationsInput | number;
    open?: Prisma.FloatFieldUpdateOperationsInput | number;
    high?: Prisma.FloatFieldUpdateOperationsInput | number;
    low?: Prisma.FloatFieldUpdateOperationsInput | number;
    close?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type Eth_1_minCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
};
export type Eth_1_minAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
};
export type Eth_1_minMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
};
export type Eth_1_minMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
};
export type Eth_1_minSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    time?: Prisma.SortOrder;
    open?: Prisma.SortOrder;
    high?: Prisma.SortOrder;
    low?: Prisma.SortOrder;
    close?: Prisma.SortOrder;
};
export type Eth_1_minSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    time?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
}, ExtArgs["result"]["eth_1_min"]>;
export type Eth_1_minSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    time?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
}, ExtArgs["result"]["eth_1_min"]>;
export type Eth_1_minSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    time?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
}, ExtArgs["result"]["eth_1_min"]>;
export type Eth_1_minSelectScalar = {
    id?: boolean;
    time?: boolean;
    open?: boolean;
    high?: boolean;
    low?: boolean;
    close?: boolean;
};
export type Eth_1_minOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "time" | "open" | "high" | "low" | "close", ExtArgs["result"]["eth_1_min"]>;
export type $Eth_1_minPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Eth_1_min";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        time: number;
        open: number;
        high: number;
        low: number;
        close: number;
    }, ExtArgs["result"]["eth_1_min"]>;
    composites: {};
};
export type Eth_1_minGetPayload<S extends boolean | null | undefined | Eth_1_minDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$Eth_1_minPayload, S>;
export type Eth_1_minCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<Eth_1_minFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: Eth_1_minCountAggregateInputType | true;
};
export interface Eth_1_minDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Eth_1_min'];
        meta: {
            name: 'Eth_1_min';
        };
    };
    /**
     * Find zero or one Eth_1_min that matches the filter.
     * @param {Eth_1_minFindUniqueArgs} args - Arguments to find a Eth_1_min
     * @example
     * // Get one Eth_1_min
     * const eth_1_min = await prisma.eth_1_min.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Eth_1_minFindUniqueArgs>(args: Prisma.SelectSubset<T, Eth_1_minFindUniqueArgs<ExtArgs>>): Prisma.Prisma__Eth_1_minClient<runtime.Types.Result.GetResult<Prisma.$Eth_1_minPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Eth_1_min that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Eth_1_minFindUniqueOrThrowArgs} args - Arguments to find a Eth_1_min
     * @example
     * // Get one Eth_1_min
     * const eth_1_min = await prisma.eth_1_min.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Eth_1_minFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, Eth_1_minFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__Eth_1_minClient<runtime.Types.Result.GetResult<Prisma.$Eth_1_minPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Eth_1_min that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Eth_1_minFindFirstArgs} args - Arguments to find a Eth_1_min
     * @example
     * // Get one Eth_1_min
     * const eth_1_min = await prisma.eth_1_min.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Eth_1_minFindFirstArgs>(args?: Prisma.SelectSubset<T, Eth_1_minFindFirstArgs<ExtArgs>>): Prisma.Prisma__Eth_1_minClient<runtime.Types.Result.GetResult<Prisma.$Eth_1_minPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Eth_1_min that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Eth_1_minFindFirstOrThrowArgs} args - Arguments to find a Eth_1_min
     * @example
     * // Get one Eth_1_min
     * const eth_1_min = await prisma.eth_1_min.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Eth_1_minFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, Eth_1_minFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__Eth_1_minClient<runtime.Types.Result.GetResult<Prisma.$Eth_1_minPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Eth_1_mins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Eth_1_minFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Eth_1_mins
     * const eth_1_mins = await prisma.eth_1_min.findMany()
     *
     * // Get first 10 Eth_1_mins
     * const eth_1_mins = await prisma.eth_1_min.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const eth_1_minWithIdOnly = await prisma.eth_1_min.findMany({ select: { id: true } })
     *
     */
    findMany<T extends Eth_1_minFindManyArgs>(args?: Prisma.SelectSubset<T, Eth_1_minFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$Eth_1_minPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Eth_1_min.
     * @param {Eth_1_minCreateArgs} args - Arguments to create a Eth_1_min.
     * @example
     * // Create one Eth_1_min
     * const Eth_1_min = await prisma.eth_1_min.create({
     *   data: {
     *     // ... data to create a Eth_1_min
     *   }
     * })
     *
     */
    create<T extends Eth_1_minCreateArgs>(args: Prisma.SelectSubset<T, Eth_1_minCreateArgs<ExtArgs>>): Prisma.Prisma__Eth_1_minClient<runtime.Types.Result.GetResult<Prisma.$Eth_1_minPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Eth_1_mins.
     * @param {Eth_1_minCreateManyArgs} args - Arguments to create many Eth_1_mins.
     * @example
     * // Create many Eth_1_mins
     * const eth_1_min = await prisma.eth_1_min.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends Eth_1_minCreateManyArgs>(args?: Prisma.SelectSubset<T, Eth_1_minCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Eth_1_mins and returns the data saved in the database.
     * @param {Eth_1_minCreateManyAndReturnArgs} args - Arguments to create many Eth_1_mins.
     * @example
     * // Create many Eth_1_mins
     * const eth_1_min = await prisma.eth_1_min.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Eth_1_mins and only return the `id`
     * const eth_1_minWithIdOnly = await prisma.eth_1_min.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends Eth_1_minCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, Eth_1_minCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$Eth_1_minPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Eth_1_min.
     * @param {Eth_1_minDeleteArgs} args - Arguments to delete one Eth_1_min.
     * @example
     * // Delete one Eth_1_min
     * const Eth_1_min = await prisma.eth_1_min.delete({
     *   where: {
     *     // ... filter to delete one Eth_1_min
     *   }
     * })
     *
     */
    delete<T extends Eth_1_minDeleteArgs>(args: Prisma.SelectSubset<T, Eth_1_minDeleteArgs<ExtArgs>>): Prisma.Prisma__Eth_1_minClient<runtime.Types.Result.GetResult<Prisma.$Eth_1_minPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Eth_1_min.
     * @param {Eth_1_minUpdateArgs} args - Arguments to update one Eth_1_min.
     * @example
     * // Update one Eth_1_min
     * const eth_1_min = await prisma.eth_1_min.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends Eth_1_minUpdateArgs>(args: Prisma.SelectSubset<T, Eth_1_minUpdateArgs<ExtArgs>>): Prisma.Prisma__Eth_1_minClient<runtime.Types.Result.GetResult<Prisma.$Eth_1_minPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Eth_1_mins.
     * @param {Eth_1_minDeleteManyArgs} args - Arguments to filter Eth_1_mins to delete.
     * @example
     * // Delete a few Eth_1_mins
     * const { count } = await prisma.eth_1_min.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends Eth_1_minDeleteManyArgs>(args?: Prisma.SelectSubset<T, Eth_1_minDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Eth_1_mins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Eth_1_minUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Eth_1_mins
     * const eth_1_min = await prisma.eth_1_min.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends Eth_1_minUpdateManyArgs>(args: Prisma.SelectSubset<T, Eth_1_minUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Eth_1_mins and returns the data updated in the database.
     * @param {Eth_1_minUpdateManyAndReturnArgs} args - Arguments to update many Eth_1_mins.
     * @example
     * // Update many Eth_1_mins
     * const eth_1_min = await prisma.eth_1_min.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Eth_1_mins and only return the `id`
     * const eth_1_minWithIdOnly = await prisma.eth_1_min.updateManyAndReturn({
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
    updateManyAndReturn<T extends Eth_1_minUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, Eth_1_minUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$Eth_1_minPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Eth_1_min.
     * @param {Eth_1_minUpsertArgs} args - Arguments to update or create a Eth_1_min.
     * @example
     * // Update or create a Eth_1_min
     * const eth_1_min = await prisma.eth_1_min.upsert({
     *   create: {
     *     // ... data to create a Eth_1_min
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Eth_1_min we want to update
     *   }
     * })
     */
    upsert<T extends Eth_1_minUpsertArgs>(args: Prisma.SelectSubset<T, Eth_1_minUpsertArgs<ExtArgs>>): Prisma.Prisma__Eth_1_minClient<runtime.Types.Result.GetResult<Prisma.$Eth_1_minPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Eth_1_mins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Eth_1_minCountArgs} args - Arguments to filter Eth_1_mins to count.
     * @example
     * // Count the number of Eth_1_mins
     * const count = await prisma.eth_1_min.count({
     *   where: {
     *     // ... the filter for the Eth_1_mins we want to count
     *   }
     * })
    **/
    count<T extends Eth_1_minCountArgs>(args?: Prisma.Subset<T, Eth_1_minCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], Eth_1_minCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Eth_1_min.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Eth_1_minAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Eth_1_minAggregateArgs>(args: Prisma.Subset<T, Eth_1_minAggregateArgs>): Prisma.PrismaPromise<GetEth_1_minAggregateType<T>>;
    /**
     * Group by Eth_1_min.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Eth_1_minGroupByArgs} args - Group by arguments.
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
    groupBy<T extends Eth_1_minGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: Eth_1_minGroupByArgs['orderBy'];
    } : {
        orderBy?: Eth_1_minGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, Eth_1_minGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEth_1_minGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Eth_1_min model
     */
    readonly fields: Eth_1_minFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Eth_1_min.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__Eth_1_minClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the Eth_1_min model
 */
export interface Eth_1_minFieldRefs {
    readonly id: Prisma.FieldRef<"Eth_1_min", 'Int'>;
    readonly time: Prisma.FieldRef<"Eth_1_min", 'Float'>;
    readonly open: Prisma.FieldRef<"Eth_1_min", 'Float'>;
    readonly high: Prisma.FieldRef<"Eth_1_min", 'Float'>;
    readonly low: Prisma.FieldRef<"Eth_1_min", 'Float'>;
    readonly close: Prisma.FieldRef<"Eth_1_min", 'Float'>;
}
/**
 * Eth_1_min findUnique
 */
export type Eth_1_minFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eth_1_min
     */
    select?: Prisma.Eth_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Eth_1_min
     */
    omit?: Prisma.Eth_1_minOmit<ExtArgs> | null;
    /**
     * Filter, which Eth_1_min to fetch.
     */
    where: Prisma.Eth_1_minWhereUniqueInput;
};
/**
 * Eth_1_min findUniqueOrThrow
 */
export type Eth_1_minFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eth_1_min
     */
    select?: Prisma.Eth_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Eth_1_min
     */
    omit?: Prisma.Eth_1_minOmit<ExtArgs> | null;
    /**
     * Filter, which Eth_1_min to fetch.
     */
    where: Prisma.Eth_1_minWhereUniqueInput;
};
/**
 * Eth_1_min findFirst
 */
export type Eth_1_minFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eth_1_min
     */
    select?: Prisma.Eth_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Eth_1_min
     */
    omit?: Prisma.Eth_1_minOmit<ExtArgs> | null;
    /**
     * Filter, which Eth_1_min to fetch.
     */
    where?: Prisma.Eth_1_minWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Eth_1_mins to fetch.
     */
    orderBy?: Prisma.Eth_1_minOrderByWithRelationInput | Prisma.Eth_1_minOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Eth_1_mins.
     */
    cursor?: Prisma.Eth_1_minWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Eth_1_mins from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Eth_1_mins.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Eth_1_mins.
     */
    distinct?: Prisma.Eth_1_minScalarFieldEnum | Prisma.Eth_1_minScalarFieldEnum[];
};
/**
 * Eth_1_min findFirstOrThrow
 */
export type Eth_1_minFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eth_1_min
     */
    select?: Prisma.Eth_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Eth_1_min
     */
    omit?: Prisma.Eth_1_minOmit<ExtArgs> | null;
    /**
     * Filter, which Eth_1_min to fetch.
     */
    where?: Prisma.Eth_1_minWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Eth_1_mins to fetch.
     */
    orderBy?: Prisma.Eth_1_minOrderByWithRelationInput | Prisma.Eth_1_minOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Eth_1_mins.
     */
    cursor?: Prisma.Eth_1_minWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Eth_1_mins from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Eth_1_mins.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Eth_1_mins.
     */
    distinct?: Prisma.Eth_1_minScalarFieldEnum | Prisma.Eth_1_minScalarFieldEnum[];
};
/**
 * Eth_1_min findMany
 */
export type Eth_1_minFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eth_1_min
     */
    select?: Prisma.Eth_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Eth_1_min
     */
    omit?: Prisma.Eth_1_minOmit<ExtArgs> | null;
    /**
     * Filter, which Eth_1_mins to fetch.
     */
    where?: Prisma.Eth_1_minWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Eth_1_mins to fetch.
     */
    orderBy?: Prisma.Eth_1_minOrderByWithRelationInput | Prisma.Eth_1_minOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Eth_1_mins.
     */
    cursor?: Prisma.Eth_1_minWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Eth_1_mins from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Eth_1_mins.
     */
    skip?: number;
    distinct?: Prisma.Eth_1_minScalarFieldEnum | Prisma.Eth_1_minScalarFieldEnum[];
};
/**
 * Eth_1_min create
 */
export type Eth_1_minCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eth_1_min
     */
    select?: Prisma.Eth_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Eth_1_min
     */
    omit?: Prisma.Eth_1_minOmit<ExtArgs> | null;
    /**
     * The data needed to create a Eth_1_min.
     */
    data: Prisma.XOR<Prisma.Eth_1_minCreateInput, Prisma.Eth_1_minUncheckedCreateInput>;
};
/**
 * Eth_1_min createMany
 */
export type Eth_1_minCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Eth_1_mins.
     */
    data: Prisma.Eth_1_minCreateManyInput | Prisma.Eth_1_minCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Eth_1_min createManyAndReturn
 */
export type Eth_1_minCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eth_1_min
     */
    select?: Prisma.Eth_1_minSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Eth_1_min
     */
    omit?: Prisma.Eth_1_minOmit<ExtArgs> | null;
    /**
     * The data used to create many Eth_1_mins.
     */
    data: Prisma.Eth_1_minCreateManyInput | Prisma.Eth_1_minCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Eth_1_min update
 */
export type Eth_1_minUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eth_1_min
     */
    select?: Prisma.Eth_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Eth_1_min
     */
    omit?: Prisma.Eth_1_minOmit<ExtArgs> | null;
    /**
     * The data needed to update a Eth_1_min.
     */
    data: Prisma.XOR<Prisma.Eth_1_minUpdateInput, Prisma.Eth_1_minUncheckedUpdateInput>;
    /**
     * Choose, which Eth_1_min to update.
     */
    where: Prisma.Eth_1_minWhereUniqueInput;
};
/**
 * Eth_1_min updateMany
 */
export type Eth_1_minUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Eth_1_mins.
     */
    data: Prisma.XOR<Prisma.Eth_1_minUpdateManyMutationInput, Prisma.Eth_1_minUncheckedUpdateManyInput>;
    /**
     * Filter which Eth_1_mins to update
     */
    where?: Prisma.Eth_1_minWhereInput;
    /**
     * Limit how many Eth_1_mins to update.
     */
    limit?: number;
};
/**
 * Eth_1_min updateManyAndReturn
 */
export type Eth_1_minUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eth_1_min
     */
    select?: Prisma.Eth_1_minSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Eth_1_min
     */
    omit?: Prisma.Eth_1_minOmit<ExtArgs> | null;
    /**
     * The data used to update Eth_1_mins.
     */
    data: Prisma.XOR<Prisma.Eth_1_minUpdateManyMutationInput, Prisma.Eth_1_minUncheckedUpdateManyInput>;
    /**
     * Filter which Eth_1_mins to update
     */
    where?: Prisma.Eth_1_minWhereInput;
    /**
     * Limit how many Eth_1_mins to update.
     */
    limit?: number;
};
/**
 * Eth_1_min upsert
 */
export type Eth_1_minUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eth_1_min
     */
    select?: Prisma.Eth_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Eth_1_min
     */
    omit?: Prisma.Eth_1_minOmit<ExtArgs> | null;
    /**
     * The filter to search for the Eth_1_min to update in case it exists.
     */
    where: Prisma.Eth_1_minWhereUniqueInput;
    /**
     * In case the Eth_1_min found by the `where` argument doesn't exist, create a new Eth_1_min with this data.
     */
    create: Prisma.XOR<Prisma.Eth_1_minCreateInput, Prisma.Eth_1_minUncheckedCreateInput>;
    /**
     * In case the Eth_1_min was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.Eth_1_minUpdateInput, Prisma.Eth_1_minUncheckedUpdateInput>;
};
/**
 * Eth_1_min delete
 */
export type Eth_1_minDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eth_1_min
     */
    select?: Prisma.Eth_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Eth_1_min
     */
    omit?: Prisma.Eth_1_minOmit<ExtArgs> | null;
    /**
     * Filter which Eth_1_min to delete.
     */
    where: Prisma.Eth_1_minWhereUniqueInput;
};
/**
 * Eth_1_min deleteMany
 */
export type Eth_1_minDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Eth_1_mins to delete
     */
    where?: Prisma.Eth_1_minWhereInput;
    /**
     * Limit how many Eth_1_mins to delete.
     */
    limit?: number;
};
/**
 * Eth_1_min without action
 */
export type Eth_1_minDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eth_1_min
     */
    select?: Prisma.Eth_1_minSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Eth_1_min
     */
    omit?: Prisma.Eth_1_minOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Eth_1_min.d.ts.map