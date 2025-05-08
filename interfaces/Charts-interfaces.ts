export interface ChartsInterfaces {
    count:    number;
    next:     null;
    previous: null;
    results:  ChartsInterfacesResult[];
}

export interface ChartsInterfacesResult {
    id:                          number;
    short_id:                    string;
    name:                        string;
    derived_name:                null | string;
    filters:                     Filters;
    query:                       Query;
    order:                       null;
    deleted:                     boolean;
    dashboards:                  any[];
    dashboard_tiles:             any[];
    last_refresh:                Date | null;
    cache_target_age:            Date | null;
    next_allowed_client_refresh: Date | null;
    result:                      ResultResult[] | null;
    hasMore:                     boolean | null;
    columns:                     null;
    created_at:                  Date;
    created_by:                  EdBy | null;
    description:                 string;
    updated_at:                  Date;
    favorited:                   boolean;
    saved:                       boolean;
    last_modified_at:            Date;
    last_modified_by:            EdBy | null;
    is_sample:                   boolean;
    effective_restriction_level: number;
    effective_privilege_level:   number;
    user_access_level:           UserAccessLevel;
    timezone:                    Timezone;
    is_cached:                   boolean;
    query_status:                null;
    hogql:                       null | string;
    types:                       null;
    tags:                        any[];
    filters_hash:                string;
}

export interface EdBy {
    id:                   number;
    uuid:                 string;
    distinct_id:          DistinctID;
    first_name:           FirstName;
    last_name:            LastName;
    email:                Email;
    is_email_verified:    boolean;
    hedgehog_config:      null;
    role_at_organization: RoleAtOrganization;
}

export enum DistinctID {
    G8Re8MVxKVa2Y2FzEjDKuDGarJodFeGH9CMMkAKDI5B = "g8Re8mVxKVa2Y2FzEjDKuDGarJodFeGH9cMMkAKDI5b",
}

export enum Email {
    JaimeArrietaNextaiMX = "jaime.arrieta@nextai.mx",
}

export enum FirstName {
    Jaime = "Jaime",
}

export enum LastName {
    Arrieta = "Arrieta",
}

export enum RoleAtOrganization {
    Product = "product",
}

export interface Filters {
}

export interface Query {
    kind:   QueryKind;
    source: Source;
}

export enum QueryKind {
    InsightVizNode = "InsightVizNode",
}

export interface Source {
    kind:                string;
    series?:             Series[];
    trendsFilter?:       TrendsFilter;
    breakdownFilter?:    BreakdownFilter | null;
    interval?:           string;
    dateRange?:          DateRange;
    properties?:         Property[] | PropertiesClass;
    conversionGoal?:     null;
    filterTestAccounts?: boolean;
    compareFilter?:      CompareFilter;
    funnelsFilter?:      FunnelsFilter;
    lifecycleFilter?:    LifecycleFilter;
    retentionFilter?:    RetentionFilter;
}

export interface BreakdownFilter {
    breakdown?:     string;
    breakdown_type: BreakdownTypeEnum;
}

export enum BreakdownTypeEnum {
    Event = "event",
}

export interface CompareFilter {
    compare: boolean;
}

export interface DateRange {
    date_to?:      null;
    date_from:     string;
    explicitDate?: boolean;
}

export interface FunnelsFilter {
    layout:                   string;
    exclusions:               any[];
    funnelVizType:            string;
    funnelOrderType:          string;
    funnelStepReference:      FunnelStepReference;
    funnelWindowInterval:     number;
    breakdownAttributionType: string;
    funnelWindowIntervalUnit: FunnelWindowIntervalUnit;
}

export enum FunnelStepReference {
    Dau = "dau",
    FirstTimeForUser = "first_time_for_user",
    Total = "total",
    UniqueSession = "unique_session",
}

export enum FunnelWindowIntervalUnit {
    Day = "day",
}

export interface LifecycleFilter {
    showLegend: boolean;
}

export interface Property {
    key:      Breakdown;
    type:     BreakdownTypeEnum;
    value:    ValueEnum;
    operator: Operator;
    label?:   null;
}

export enum Breakdown {
    DeviceType = "$device_type",
    Pathname = "$pathname",
}

export enum Operator {
    Exact = "exact",
}

export enum ValueEnum {
    Desktop = "Desktop",
}

export interface PropertiesClass {
    type:   string;
    values: PropertiesValue[];
}

export interface PropertiesValue {
    type:   string;
    values: ValueValue[];
}

export interface ValueValue {
    key:      Breakdown;
    type:     BreakdownTypeEnum;
    value:    any[];
    operator: Operator;
    label?:   null;
}

export interface RetentionFilter {
    period:          string;
    targetEntity:    Entity;
    retentionType:   string;
    totalIntervals:  number;
    returningEntity: Entity;
}

export interface Entity {
    id:   ID;
    type: EntityTypeEnum;
}

export enum ID {
    IDPageview = "Pageview",
    Pageview = "$pageview",
}

export enum EntityTypeEnum {
    Events = "events",
}

export interface Series {
    kind:         SeriesKind;
    math?:        FunnelStepReference;
    name:         ID;
    event:        ID;
    custom_name?: string;
}

export enum SeriesKind {
    EventsNode = "EventsNode",
}

export interface TrendsFilter {
    display:                  string;
    showLegend?:              boolean;
    yAxisScaleType?:          YAxisScaleType;
    showValuesOnSeries?:      boolean;
    smoothingIntervals?:      number;
    showPercentStackView?:    boolean;
    aggregationAxisFormat?:   AggregationAxisFormat;
    showAlertThresholdLines?: boolean;
}

export enum AggregationAxisFormat {
    Numeric = "numeric",
}

export enum YAxisScaleType {
    Linear = "linear",
}

export interface ResultResult {
    data:              number[];
    days:              Date[];
    count:             number;
    aggregated_value?: number;
    label:             string;
    filter:            Filter;
    action:            Action;
    breakdown_value?:  string;
    labels?:           string[];
    compare?:          boolean;
    compare_label?:    string;
}

export interface Action {
    days:                  Date[];
    id:                    ID;
    type:                  EntityTypeEnum;
    order:                 number;
    name:                  ID;
    custom_name:           CustomName | null;
    math:                  FunnelStepReference;
    math_property:         null;
    math_hogql:            null;
    math_group_type_index: null;
    properties:            Filters;
}

export enum CustomName {
    UniqueVisitors = "Unique visitors",
}

export interface Filter {
    insight:                 Insight;
    properties:              Property[] | PropertiesClass;
    filter_test_accounts:    boolean;
    date_to:                 Date;
    date_from:               Date;
    entity_type:             EntityTypeEnum;
    interval:                FunnelWindowIntervalUnit;
    aggregationAxisFormat:   AggregationAxisFormat;
    display:                 Display;
    resultCustomizationBy:   ResultCustomizationBy;
    showAlertThresholdLines: boolean;
    showLegend:              boolean;
    showMultipleYAxes:       boolean;
    showPercentStackView:    boolean;
    showValuesOnSeries:      boolean;
    smoothingIntervals:      number;
    yAxisScaleType:          YAxisScaleType;
    breakdown?:              Breakdown;
    breakdown_type?:         BreakdownTypeEnum;
}

export enum Display {
    ActionsLineGraph = "ActionsLineGraph",
    ActionsTable = "ActionsTable",
    BoldNumber = "BoldNumber",
}

export enum Insight {
    Trends = "TRENDS",
}

export enum ResultCustomizationBy {
    Value = "value",
}

export enum Timezone {
    UTC = "UTC",
}

export enum UserAccessLevel {
    Editor = "editor",
}
