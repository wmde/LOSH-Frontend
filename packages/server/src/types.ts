export interface SearchItemsArgs {
  query: string;
  license: LicenseValue;
  page: number;
  pageSize: number;
}

export interface GetItemsArgs {
  id: string;
}

export type LicenseValue = "weak" | "strong" | "non";
