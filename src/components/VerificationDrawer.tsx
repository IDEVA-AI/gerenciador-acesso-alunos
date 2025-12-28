import { useState } from 'react';
import { X, User, Mail, FileText, CheckCircle, XCircle, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { HotmartPurchase, findStudentByDocument, Student } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface VerificationDrawerProps {
  purchase: HotmartPurchase | null;
  isOpen: boolean;
  onClose: () => void;
}

const VerificationDrawer = ({ purchase, isOpen, onClose }: VerificationDrawerProps) => {
  const [isRegistering, setIsRegistering] = useState(false);
  
  if (!purchase) return null;
  
  const existingStudent = findStudentByDocument(purchase.buyerDocument);
  
  const handleRegister = async () => {
    setIsRegistering(true);
    
    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsRegistering(false);
    
    toast({
      title: 'Aluno cadastrado com sucesso!',
      description: `${purchase.buyerName} foi adicionado ao sistema.`,
    });
    
    onClose();
  };

  const StatusBadge = ({ active, label }: { active: boolean; label: string }) => (
    <Badge className={active ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
      {active ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
      {label}
    </Badge>
  );

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Verificação de Acesso</SheetTitle>
          <SheetDescription>
            Verifique o status do aluno e gerencie seu acesso
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Purchase Info from Hotmart */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Dados da Compra (Hotmart)
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{purchase.buyerName}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-medium">{purchase.buyerEmail}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">CPF</p>
                  <p className="font-medium">{purchase.buyerDocument}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Produto</p>
              <p className="font-medium">{purchase.productName}</p>
              <p className="text-sm text-muted-foreground mt-2">Pedido: {purchase.orderId}</p>
            </div>
          </div>
          
          <Separator />
          
          {/* Internal Status */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Status Interno
            </h3>
            
            {existingStudent ? (
              <div className="space-y-4">
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium text-success">Aluno Cadastrado</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Este aluno já está cadastrado no sistema interno.
                  </p>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <StatusBadge active={existingStudent.planActive} label={existingStudent.planActive ? 'Plano Ativo' : 'Plano Inativo'} />
                  <StatusBadge active={existingStudent.active} label={existingStudent.active ? 'Conta Ativa' : 'Conta Inativa'} />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipo de Documento</span>
                    <span>{existingStudent.documentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cadastrado em</span>
                    <span>{new Date(existingStudent.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="w-5 h-5 text-warning" />
                    <span className="font-medium text-warning">Aluno Não Cadastrado</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Este comprador ainda não foi cadastrado no sistema interno.
                  </p>
                </div>
                
                {/* Registration Preview */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-sm">Dados para cadastro:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nome</span>
                      <span>{purchase.buyerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">E-mail</span>
                      <span>{purchase.buyerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPF</span>
                      <span>{purchase.buyerDocument}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo Documento</span>
                      <Badge variant="outline">CPF</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Plano Ativo</span>
                      <Badge className="bg-success text-success-foreground">Sim</Badge>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleRegister}
                  disabled={isRegistering}
                >
                  {isRegistering ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Cadastrando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Confirmar Cadastro
                    </span>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VerificationDrawer;
