export interface CreateOrg {
  name: string;
  slug: string;
}

export interface Org extends CreateOrg {
  id: string;
  enabled: boolean;
}
