export interface ProductInterface {
  name        : string;
  brand       : string;
  description : string;
  category    : "Writing" | "Office Supplies" | "Art Supplies" | "Educational" | "Technology";
  price       : number;
  quantity    : number;
  inStock?    : boolean;
} // prettier-ignore
