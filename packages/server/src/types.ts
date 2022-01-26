export interface SearchItemsArgs {
  query: string;
  license: LicenseValue;
  organization: string;
  page: number;
  pageSize: number;
}

export interface GetItemsArgs {
  id: string;
}

export type LicenseValue = "weak" | "strong" | "non";
