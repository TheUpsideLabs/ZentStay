export interface CreateCollegeDTO {
  name: string;
  shortName: string;
  slug: string;
  city: string;
  state: string;

  logo?: string;
  banner?: string;
  latitude?: number;
  longitude?: number;
  rating?: number;

  aisheCode?: string;
  source?: string;
  sourceYear?: string;
  officialWebsite?: string;
  verified?: boolean;
  isActive?: boolean;
}

export interface UpdateCollegeDTO
  extends Partial<CreateCollegeDTO> {}