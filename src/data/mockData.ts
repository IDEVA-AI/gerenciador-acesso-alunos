// Mock data for the Access Management System
// This simulates Hotmart API responses

export interface HotmartPurchase {
  id: string;
  buyerName: string;
  buyerEmail: string;
  buyerDocument: string;
  productName: string;
  orderId: string;
  status: 'approved' | 'refunded' | 'pending' | 'cancelled';
  purchaseDate: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  documentNumber: string;
  documentType: 'CPF' | 'CNPJ';
  planActive: boolean;
  active: boolean;
  createdAt: string;
}

// Mock Hotmart purchases
export const mockHotmartPurchases: HotmartPurchase[] = [
  {
    id: '1',
    buyerName: 'Maria Silva Santos',
    buyerEmail: 'maria.silva@email.com',
    buyerDocument: '123.456.789-00',
    productName: 'Curso Completo de Marketing Digital',
    orderId: 'HP-2024-001234',
    status: 'approved',
    purchaseDate: '2024-01-15',
  },
  {
    id: '2',
    buyerName: 'João Pedro Oliveira',
    buyerEmail: 'joao.pedro@email.com',
    buyerDocument: '987.654.321-00',
    productName: 'Mentoria Premium',
    orderId: 'HP-2024-001235',
    status: 'approved',
    purchaseDate: '2024-01-16',
  },
  {
    id: '3',
    buyerName: 'Ana Carolina Ferreira',
    buyerEmail: 'ana.ferreira@email.com',
    buyerDocument: '456.789.123-00',
    productName: 'Curso Completo de Marketing Digital',
    orderId: 'HP-2024-001236',
    status: 'pending',
    purchaseDate: '2024-01-17',
  },
  {
    id: '4',
    buyerName: 'Carlos Eduardo Lima',
    buyerEmail: 'carlos.lima@email.com',
    buyerDocument: '321.654.987-00',
    productName: 'Pack de Templates',
    orderId: 'HP-2024-001237',
    status: 'approved',
    purchaseDate: '2024-01-18',
  },
  {
    id: '5',
    buyerName: 'Fernanda Costa Souza',
    buyerEmail: 'fernanda.souza@email.com',
    buyerDocument: '789.123.456-00',
    productName: 'Mentoria Premium',
    orderId: 'HP-2024-001238',
    status: 'refunded',
    purchaseDate: '2024-01-19',
  },
  {
    id: '6',
    buyerName: 'Roberto Almeida Junior',
    buyerEmail: 'roberto.junior@email.com',
    buyerDocument: '654.321.987-00',
    productName: 'Curso Completo de Marketing Digital',
    orderId: 'HP-2024-001239',
    status: 'approved',
    purchaseDate: '2024-01-20',
  },
];

// Mock internal students (some match Hotmart, some don't)
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Maria Silva Santos',
    email: 'maria.silva@email.com',
    documentNumber: '123.456.789-00',
    documentType: 'CPF',
    planActive: true,
    active: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Carlos Eduardo Lima',
    email: 'carlos.lima@email.com',
    documentNumber: '321.654.987-00',
    documentType: 'CPF',
    planActive: true,
    active: false,
    createdAt: '2024-01-18',
  },
];

// Helper function to search purchases
export const searchPurchases = (
  query: string,
  searchType: 'cpf' | 'email' | 'name'
): HotmartPurchase[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  return mockHotmartPurchases.filter((purchase) => {
    switch (searchType) {
      case 'cpf':
        return purchase.buyerDocument.replace(/\D/g, '').includes(normalizedQuery.replace(/\D/g, ''));
      case 'email':
        return purchase.buyerEmail.toLowerCase().includes(normalizedQuery);
      case 'name':
        return purchase.buyerName.toLowerCase().includes(normalizedQuery);
      default:
        return false;
    }
  });
};

// Helper function to check if student exists internally
export const findStudentByDocument = (document: string): Student | undefined => {
  const normalizedDoc = document.replace(/\D/g, '');
  return mockStudents.find(
    (student) => student.documentNumber.replace(/\D/g, '') === normalizedDoc
  );
};

// Helper function to check if student exists by email
export const findStudentByEmail = (email: string): Student | undefined => {
  return mockStudents.find(
    (student) => student.email.toLowerCase() === email.toLowerCase()
  );
};
