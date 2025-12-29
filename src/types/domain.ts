export type PurchaseStatus = string;

export interface HotmartPurchase {
  id: string;
  buyerName: string;
  buyerEmail: string;
  buyerDocument: string;
  productName: string;
  orderId: string;
  status: PurchaseStatus;
  purchaseDate?: string | null;
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string | null;
  documentNumber: string;
  documentType: string;
  planActive: boolean;
  active: boolean;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  username?: string | null;
  email?: string | null;
  profileAccess?: string | null;
  active?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

