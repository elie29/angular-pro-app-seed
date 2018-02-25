export interface Meal {
  name: string;
  ingerdients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}
