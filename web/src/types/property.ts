export type PropertyCategory = "sale" | "rent";

export type PropertyStatus = "available" | "sold" | "rented";

export type PropertyFeature = {
  label: string;
  value: string;
};

export type PropertyCoordinates = {
  lat: number;
  lng: number;
};

export type PropertyAgent = {
  name: string;
  role: string;
  phone: string;
  email: string;
};

export type PropertyImage = {
  url: string;
  slug: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  category: PropertyCategory;
  status: PropertyStatus;
  featured: boolean;
  price: number;
  priceSuffix?: string;
  location: string;
  summary: string;
  description: string;
  features: PropertyFeature[];
  amenities: string[];
  images: (string | PropertyImage)[];
  coordinates: PropertyCoordinates;
  agent: PropertyAgent;
};

export type PropertyPayload = Omit<Property, "id">;