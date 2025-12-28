import { useState, useEffect } from 'react';
import { Search, Loader2, FileSearch, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HotmartPurchase, searchPurchases, findStudentByDocument, mockHotmartPurchases } from '@/data/mockData';
import { formatCPF } from '@/utils/cpf';
import VerificationDrawer from '@/components/VerificationDrawer';
import ManualRegistrationDialog from '@/components/ManualRegistrationDialog';

type SearchType = 'cpf' | 'email' | 'name';

const Dashboard = () => {
  const [searchType, setSearchType] = useState<SearchType>('cpf');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<HotmartPurchase[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<HotmartPurchase | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isManualDialogOpen, setIsManualDialogOpen] = useState(false);

  const handleInputChange = (value: string) => {
    if (searchType === 'cpf') {
      setSearchQuery(formatCPF(value));
    } else {
      setSearchQuery(value);
    }
  };

  useEffect(() => {
    setSearchQuery('');
  }, [searchType]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const searchResults = searchPurchases(searchQuery, searchType);
    setResults(searchResults);
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleManageAccess = (purchase: HotmartPurchase) => {
    setSelectedPurchase(purchase);
    setIsDrawerOpen(true);
  };

  const getStatusBadge = (status: HotmartPurchase['status']) => {
    const variants: Record<typeof status, { className: string; label: string }> = {
      approved: { className: 'bg-success text-success-foreground', label: 'Aprovado' },
      pending: { className: 'bg-warning text-warning-foreground', label: 'Pendente' },
      refunded: { className: 'bg-destructive text-destructive-foreground', label: 'Reembolsado' },
      cancelled: { className: 'bg-muted text-muted-foreground', label: 'Cancelado' },
    };
    
    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const getInternalStatus = (purchase: HotmartPurchase) => {
    const student = findStudentByDocument(purchase.buyerDocument);
    if (student) {
      return <Badge variant="outline" className="border-success text-success">Cadastrado</Badge>;
    }
    return <Badge variant="outline" className="border-warning text-warning">Não Cadastrado</Badge>;
  };

  const getPlaceholder = () => {
    switch (searchType) {
      case 'cpf':
        return '000.000.000-00';
      case 'email':
        return 'email@exemplo.com';
      case 'name':
        return 'Nome do comprador';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Consulta de Compras</h1>
            <p className="text-muted-foreground">
              Busque compras da Hotmart e gerencie acessos dos alunos
            </p>
          </div>
          <Button onClick={() => setIsManualDialogOpen(true)} variant="outline">
            <UserPlus className="w-4 h-4 mr-2" />
            Cadastro Manual
          </Button>
        </div>

        {/* Search Bar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Buscar Compra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={searchType} onValueChange={(value: SearchType) => setSearchType(value)}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpf">CPF</SelectItem>
                  <SelectItem value="email">E-mail</SelectItem>
                  <SelectItem value="name">Nome</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                placeholder={getPlaceholder()}
                value={searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              
              <Button onClick={handleSearch} disabled={isSearching || !searchQuery.trim()}>
                {isSearching ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Consultar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resultados</CardTitle>
          </CardHeader>
          <CardContent>
            {!hasSearched ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  Faça uma busca
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Use a barra de busca acima para encontrar compras por CPF, e-mail ou nome do comprador.
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mb-4">
                  <FileSearch className="w-8 h-8 text-warning" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Não encontramos compras para "{searchQuery}". Verifique os dados e tente novamente.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Comprador</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Pedido</TableHead>
                      <TableHead>Status Hotmart</TableHead>
                      <TableHead>Status Interno</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((purchase) => {
                      const isNotRegistered = !findStudentByDocument(purchase.buyerDocument);
                      return (
                        <TableRow key={purchase.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{purchase.buyerName}</p>
                              <p className="text-sm text-muted-foreground">{purchase.buyerEmail}</p>
                              <p className="text-sm text-muted-foreground">{purchase.buyerDocument}</p>
                            </div>
                          </TableCell>
                          <TableCell>{purchase.productName}</TableCell>
                          <TableCell className="font-mono text-sm">{purchase.orderId}</TableCell>
                          <TableCell>{getStatusBadge(purchase.status)}</TableCell>
                          <TableCell>{getInternalStatus(purchase)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant={isNotRegistered ? 'default' : 'outline'}
                              onClick={() => handleManageAccess(purchase)}
                            >
                              Gerenciar Acesso
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Verification Drawer */}
      <VerificationDrawer
        purchase={selectedPurchase}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedPurchase(null);
        }}
      />

      {/* Manual Registration Dialog */}
      <ManualRegistrationDialog
        isOpen={isManualDialogOpen}
        onClose={() => setIsManualDialogOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
