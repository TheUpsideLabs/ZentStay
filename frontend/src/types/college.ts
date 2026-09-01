export interface College {
  id: string;
  slug: string;

  name: string;
  shortName: string;

  city: string;
  state: string;

  logo: string;
  banner: string;

  latitude: number;
  longitude: number;

  totalProperties: number;
  studentCount: number;

  rating: number;
  popular: boolean;

  website?: string;
  established?: number;
  nirfRank?: number;
}