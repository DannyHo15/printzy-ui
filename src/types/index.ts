import { Icons } from "@/components/Icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  color?: string;
  action?: () => void;
}

export interface IMetaPagination {
  currentPage: number;
  itemsPerPage: number;
  sortBy: string[];
  totalItems: number;
  totalPages: number;
}
