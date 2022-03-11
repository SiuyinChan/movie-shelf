import { Observable } from "rxjs";

export interface Category {
  icon?: string;
  id: number;
  name: string;
  endpoint?: () => Observable<any>;
}

export interface Section {
  id: number;
  title: string;
  categories: Category[];
}

export interface ActiveCategory {
  sectionId: number;
  categoryId: number;
}
