export type TimeRange = 'short_term' | 'medium_term' | 'long_term';
export type Limit = 5 | 10 | 50;

export interface FilterOptions {
    timeRange: TimeRange;
    limit: Limit;
}
