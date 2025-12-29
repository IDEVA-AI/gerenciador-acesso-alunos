import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCPF, validateCPF } from "@/utils/cpf";
import { toast } from "@/hooks/use-toast";
import { registerManualStudent } from "@/services/student";
import { StudentRecord } from "@/types/domain";

interface ManualRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentRegistered?: (student: StudentRecord) => void;
}

const ManualRegistrationDialog = ({ isOpen, onClose, onStudentRegistered }: ManualRegistrationDialogProps) => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; cpf?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCpfChange = (value: string) => {
    setCpf(formatCPF(value));
    if (errors.cpf) setErrors((prev) => ({ ...prev, cpf: undefined }));
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async () => {
    const newErrors: { name?: string; cpf?: string; email?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (name.trim().length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
    }
    
    if (!email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!validateEmail(email)) {
      newErrors.email = "E-mail inválido";
    }

    const cleanedCpf = cpf.replace(/\D/g, '');
    if (!cleanedCpf) {
      newErrors.cpf = "CPF é obrigatório";
    } else if (cleanedCpf.length !== 11) {
      newErrors.cpf = "CPF deve ter 11 dígitos";
    } else if (!validateCPF(cpf)) {
      newErrors.cpf = "CPF inválido";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        const { student, alreadyExists } = await registerManualStudent({
          name,
          cpf,
          email,
        });

        toast({
          title: alreadyExists ? "Aluno já existe" : "Aluno cadastrado com sucesso!",
          description: alreadyExists
            ? "Já existe um cadastro para este CPF ou e-mail."
            : `${name} foi adicionado ao sistema com plano ativo.`,
          variant: alreadyExists ? "default" : "default",
        });

        onStudentRegistered?.(student);
        handleClose();
      } catch (error: any) {
        toast({
          title: "Erro ao cadastrar",
          description: error?.message || "Não foi possível cadastrar o aluno.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setName("");
    setCpf("");
    setEmail("");
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastro Manual de Aluno</DialogTitle>
          <DialogDescription>
            Cadastre um novo aluno manualmente no sistema
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              placeholder="Digite o nome completo"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => handleCpfChange(e.target.value)}
              className={errors.cpf ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.cpf && (
              <p className="text-sm text-destructive">{errors.cpf}</p>
            )}
          </div>
          
          <Separator />
          
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-sm">Configurações automáticas:</h4>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline">Tipo: CPF</Badge>
              <Badge className="bg-success text-success-foreground">Plano Ativo</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              O aluno será cadastrado automaticamente com plano ativo e tipo de documento CPF.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Cadastrando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Cadastrar Aluno
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManualRegistrationDialog;
