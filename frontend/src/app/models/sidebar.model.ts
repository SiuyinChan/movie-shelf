export interface Category {
  icon?: string;
  id: number;
  name: string;
}

export interface Section {
  id: number;
  title: string;
  categories: Category[];
}

export interface ActiveCategory {
  section: string;
  category: string;
}
