export interface ITransactionForm {
  type: string;
  category: string;
  amount: number;
  date: string;
}

export interface ITransaction extends ITransactionForm {
  id: string;
}

export interface ITransactionAPI {
  [key: string]: ITransaction;
}

export interface ICategoryForm {
  name: string;
  type: string;
}

export interface ICategory extends ICategoryForm {
  id: string;
}

export interface ICategoryAPI {
  [key: string]: ICategory;
}