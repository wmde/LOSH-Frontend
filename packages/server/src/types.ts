export interface SearchItemsArgs {
  query: string;
  license: LicenceValue;
  page: number;
  pageSize: number;
}

export interface GetItemsArgs {
  id: string;
}

export type LicenceValue = "weak" | "strong" | "non";
