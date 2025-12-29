# Especificação do Projeto

## Sistema de gerenciamento de acesso ao criador de site

### Resumo do Projeto

Como Analista de Negócios, apresento a primeira etapa da documentação para o Sistema de Gerenciamento de Acesso ao Criador de Sites.

# Nome: Sistema de Gerenciamento de Acesso ao Criador de Sites

## Resumo do problema/oportunidade
Atualmente, a equipe enfrenta desafios na gestão de credenciais de usuários e parceiros devido à ausência de um sistema integrado. A verificação manual de compras de parceiros (Hotmart) e o cadastramento de usuários são processos morosos e propensos a erros, impactando a eficiência operacional e a experiência do usuário. Este sistema visa centralizar e automatizar essas operações, fornecendo uma interface intuitiva para consulta e cadastro.

## Objetivos do Sistema
*   Permitir a validação rápida da existência de cadastro de usuários que realizaram compras via parceiros (Hotmart).
*   Facilitar o cadastramento manual de novos usuários na base interna.
*   Automatizar a criação de registros de alunos com base em dados de compra validados.
*   Fornecer uma interface segura e acessível para equipes internas e parceiros gerenciarem acessos.
*   Exibir o status de planos e ativação de alunos existentes de forma clara.

## Stakeholders/personas
*   **Equipe de Parceiros:** Necessitam validar compras e cadastrar usuários de forma eficiente.
*   **Equipe Interna de Suporte/Operações:** Responsáveis por gerenciar acessos e resolver problemas de cadastro.
*   **Usuários Finais (Compradores):** Indiretamente afetados pela agilidade e precisão do processo de cadastro e acesso.

### Resumos da IA

#### Produto
Como Estrategista de Produto, apresento a visão para o Sistema de Gerenciamento de Acesso ao Criador de Sites.

### Principais Features e Diferenciais

1.  **Validação de Compras Hotmart Integrada:** Verificação direta e eficiente de compras de parceiros (Hotmart) por CPF, e-mail ou nome, eliminando processos manuais e reduzindo erros.
2.  **Cadastro Simplificado de Usuários:** Interface intuitiva para cadastrar novos usuários automaticamente após a validação da compra, ou manualmente, garantindo a consistência e agilidade no onboarding.
3.  **Gestão Centralizada de Credenciais:** Um único ponto de controle para gerenciar o acesso de usuários ao Criador de Sites, tanto para clientes diretos quanto para parceiros, otimizando a administração.
4.  **Visibilidade Instantânea do Status do Usuário:** Consulta rápida do status de planos (`plan_active`) e ativação (`active`) de usuários existentes, facilitando o suporte e a tomada de decisões.
5.  **Acesso Controlado e Seguro:** Permite que apenas equipes internas e parceiros autorizados acessem e gerenciem as credenciais, protegendo informações sensíveis e garantindo a conformidade.

#### Requisitos
Olá! Como Engenheiro de Requisitos da Fábrica de Sistemas, analisei a visão geral do seu projeto e os requisitos selecionados. Com base neles, estruturei as User Stories, seus Critérios de Aceite e um resumo das Regras de Negócio chave, focando em complementar e refinar o que já foi estabelecido.

---

## User Stories e Critérios de Aceite

**Persona:** Agente de Suporte (representando a equipe de parceiros e interna que precisa de acesso à interface)

### 1. Gerenciamento de Acesso ao Sistema

**US 1: Como um Agente de Suporte, quero fazer login no sistema, para que eu possa acessar as funcionalidades de gerenciamento de alunos.**

*   **Critérios de Aceite:**
    *   **Dado** que estou na tela de Login, **quando** insiro credenciais (email/usuário e senha) válidas, **então** sou redirecionado para a tela de Consulta de Compras e Gerenciamento de Alunos.
    *   **Dado** que estou na tela de Login, **quando** insiro credenciais inválidas, **então** o sistema exibe uma mensagem de erro e não permite o acesso.
    *   **Dado** que estou na tela de Login, **quando** tento fazer login com o campo de E-mail/Usuário vazio, **então** o sistema exibe uma mensagem de validação "E-mail/Usuário não pode ser vazio".
    *   **Dado** que estou na tela de Login, **quando** tento fazer login com o campo de Senha vazio, **então** o sistema exibe uma mensagem de validação "Senha não pode ser vazia".
    *   **Dado** que estou na tela de Login, **quando** insiro um e-mail com formato inválido, **então** o sistema exibe uma mensagem de validação "E-mail deve ser válido (formato)".
    *   **Dado** que minhas credenciais são válidas, **quando** meu perfil de acesso não tem permissão para o sistema, **então** o sistema nega o acesso e informa o motivo.

### 2. Consulta de Compras Hotmart e Verificação Interna

**US 2: Como um Agente de Suporte, quero consultar dados de compra na Hotmart por CPF, E-mail ou Nome, para que eu possa verificar a existência de uma compra e seus detalhes.**

*   **Critérios de Aceite:**
    *   **Dado** que estou na tela de Consulta de Compras e Gerenciamento de Alunos, **quando** insiro um CPF, E-mail ou Nome válido no campo de busca e clico em "Consultar", **então** o sistema exibe os detalhes da compra Hotmart (comprador_nome_completo, comprador_email, comprador_documento, nome_do_produto, numero_pedido, status) para correspondências exatas.
    *   **Dado** que estou na tela de Consulta de Compras e Gerenciamento de Alunos, **quando** o usuário Hotmart possui múltiplos registros de compra, **então** todos os registros de compra correspondentes são exibidos.
    *   **Dado** que estou na tela de Consulta de Compras e Gerenciamento de Alunos, **quando** o campo de busca (CPF/E-mail/Nome) está vazio e clico em "Consultar", **então** o sistema exibe uma mensagem de validação "Campo de busca não pode ser vazio".
    *   **Dado** que estou na tela de Consulta de Compras e Gerenciamento de Alunos, **quando** insiro um CPF inválido no campo de busca, **então** o sistema exibe uma mensagem de validação "CPF deve ser válido".
    *   **Dado** que estou na tela de Consulta de Compras e Gerenciamento de Alunos, **quando** insiro um E-mail com formato inválido no campo de busca, **então** o sistema exibe uma mensagem de validação "E-mail deve ser válido (formato)".
    *   **Dado** que estou na tela de Consulta de Compras e Gerenciamento de Alunos, **quando** não há correspondência exata na Hotmart para o critério de busca, **então** o sistema informa que nenhum dado foi encontrado.

**US 3: Como um Agente de Suporte, quero verificar a existência e o status de um aluno na base interna ('student') após uma consulta Hotmart, para evitar duplicações e entender seu acesso atual.**

*   **Critérios de Aceite:**
    *   **Dado** que uma compra Hotmart foi consultada, **quando** o aluno correspondente já existe na tabela 'student' (verificado por CPF ou E-mail), **então** o sistema informa que o aluno já existe e exibe seu status de 'plan_active' e 'active'.
    *   **Dado** que uma compra Hotmart foi consultada, **quando** o aluno correspondente não existe na tabela 'student', **então** o sistema informa que o aluno não está cadastrado internamente e apresenta a opção de cadastrá-lo.

### 3. Cadastro de Alunos

**US 4: Como um Agente de Suporte, quero cadastrar um novo aluno na base interna ('student') utilizando os dados de uma compra Hotmart, para conceder acesso ao criador de sites de forma eficiente.**

*   **Critérios de Aceite:**
    *   **Dado** que uma compra Hotmart foi consultada e o aluno não existe na base interna, **quando** clico no botão "Cadastrar Aluno", **então** o sistema cria um novo registro na tabela 'student' com os seguintes dados:
        *   `plan_active = true`
        *   `active = true`
        *   `document_type = CPF`
        *   `document_number` (do `comprador_documento` da Hotmart)
        *   `name` (do `comprador_nome_completo` da Hotmart)
        *   `email` (do `comprador_email` da Hotmart)
    *   **Dado** que uma compra Hotmart foi consultada e o aluno não existe na base interna, **quando** clico no botão "Cadastrar Aluno", **então** o sistema verifica se já existe um aluno com o mesmo E-mail ou CPF na tabela 'student'.
    *   **Dado** que uma compra Hotmart foi consultada e o aluno não existe na base interna, **quando** clico no botão "Cadastrar Aluno" e não há duplicidade de E-mail ou CPF, **então** o sistema cadastra o aluno e exibe uma mensagem de sucesso.
    *   **Dado** que uma compra Hotmart foi consultada e o aluno não existe na base interna, **quando** clico no botão "Cadastrar Aluno" e já existe um aluno com o mesmo E-mail ou CPF, **então** o sistema informa que o aluno já existe e mostra seus status 'plan_active' e 'active', sem cadastrar novamente.

**US 5: Como um Agente de Suporte, quero cadastrar um novo aluno manualmente, fornecendo apenas Nome e CPF, para gerenciar casos específicos ou sem registro Hotmart.**

*   **Critérios de Aceite:**
    *   **Dado** que estou na tela de Cadastro Manual de Aluno, **quando** preencho os campos "Nome" e "CPF" com dados válidos e clico em "Cadastrar", **então** o sistema cria um novo registro na tabela 'student' com os seguintes dados:
        *   `plan_active = true`
        *   `active = true`
        *   `document_type = CPF`
        *   `document_number` (o CPF informado)
        *   `name` (o Nome informado)
        *   `email` (o E-mail informado, se houver campo, ou um padrão se não for fornecido na tela manual - *necessário definir se email é obrigatório no cadastro manual*)
    *   **Dado** que estou na tela de Cadastro Manual de Aluno, **quando** o campo "Nome" está vazio e clico em "Cadastrar", **então** o sistema exibe uma mensagem de validação "Nome é obrigatório".
    *   **Dado** que estou na tela de Cadastro Manual de Aluno, **quando** o campo "CPF" está vazio e clico em "Cadastrar", **então** o sistema exibe uma mensagem de validação "CPF é obrigatório".
    *   **Dado** que estou na tela de Cadastro Manual de Aluno, **quando** o campo "CPF" contém um valor inválido e clico em "Cadastrar", **então** o sistema exibe uma mensagem de validação "CPF deve ser válido".
    *   **Dado** que estou na tela de Cadastro Manual de Aluno, **quando** preencho os campos e clico em "Cadastrar", **então** o sistema verifica se já existe um aluno com o mesmo E-mail ou CPF na tabela 'student'.
    *   **Dado** que estou na tela de Cadastro Manual de Aluno, **quando** preencho os campos e não há duplicidade de E-mail ou CPF, **então** o sistema cadastra o aluno e exibe uma mensagem de sucesso.
    *   **Dado** que estou na tela de Cadastro Manual de Aluno, **quando** preencho os campos e já existe um aluno com o mesmo E-mail ou CPF, **então** o sistema informa que o aluno já existe e mostra seus status 'plan_active' e 'active', sem cadastrar novamente.

---

## Resumo de Regras de Negócio Chave

1.  **Fonte de Dados Hotmart:** A tabela da Hotmart é uma fonte de consulta **apenas**, sem listagem geral de dados. A busca deve ser por critério específico (CPF, E-mail ou Nome) e por correspondência exata.
2.  **Verificação de Duplicidade:** Antes de qualquer cadastro (seja via Hotmart ou manual), o sistema deve verificar a existência do aluno na tabela interna `student` por E-mail ou CPF. Se o aluno já existir, não deve ser cadastrado novamente; apenas seus status (`plan_active` e `active`) devem ser informados.
3.  **Dados Padrão para Cadastro de Aluno:** Ao cadastrar um novo aluno na tabela `student`, os campos `plan_active` e `active` devem ser definidos como `true`. O `document_type` deve ser sempre `CPF`.
4.  **Campos Obrigatórios para Cadastro Manual:** Para o cadastro manual, o Nome e o CPF são campos obrigatórios. O CPF deve ser válido.
5.  **Exibição de Múltiplas Compras:** Um usuário Hotmart pode ter múltiplos registros de compra; todos os registros correspondentes ao critério de busca devem ser exibidos.
6.  **Acesso ao Sistema:** Somente usuários ativos e com permissão de acesso válida podem utilizar o sistema.

---

Espero que esta estrutura ajude a avançar no desenvolvimento do seu Sistema de Gerenciamento de Acesso ao Criador de Site!

#### Design de Lógica
Como Projetista de Funcionalidades, vou detalhar os componentes, funções, fluxos de dados e casos de borda para o "Sistema de gerenciamento de acesso ao criador de site", complementando as informações já fornecidas.

---

### Componentes/Módulos de Core

Para atender aos requisitos, o sistema pode ser estruturado nos seguintes módulos principais:

1.  **Módulo de Autenticação e Autorização (`AuthModule`)**
    *   **Responsabilidade**: Gerenciar o acesso dos usuários ao sistema, validando credenciais e controlando permissões baseadas no `perfil_acesso` da tabela `Usuario`.
    *   **Dependências**: Tabela `Usuario`.

2.  **Módulo de Integração Hotmart (`HotmartIntegrationModule`)**
    *   **Responsabilidade**: Interagir com a base de dados ou API da Hotmart para consultar informações de compra. Este módulo deve encapsular a lógica de conexão e consulta, garantindo que apenas os dados necessários sejam retornados e que a consulta seja feita por critério específico (CPF, E-mail, Nome), sem listar todos os dados.
    *   **Dependências**: Base de dados/API Hotmart.

3.  **Módulo de Gerenciamento de Alunos (`StudentManagementModule`)**
    *   **Responsabilidade**: Gerenciar as operações CRUD (Create, Read, Update, Delete) na tabela `student` da base de dados interna. Inclui a verificação de existência, cadastro e recuperação de status de alunos.
    *   **Dependências**: Tabela `student` (base de dados interna).

4.  **Módulo de Validação de Dados (`ValidationModule`)**
    *   **Responsabilidade**: Centralizar e aplicar todas as regras de validação de entrada de dados (CPF, E-mail, Nome, campos de busca, etc.) antes que as informações sejam processadas pelos outros módulos.
    *   **Dependências**: Nenhuma direta, mas serve a todos os módulos que recebem entrada do usuário.

5.  **Módulo de Interface de Usuário (UI/API Gateway - `UserInterfaceModule`)**
    *   **Responsabilidade**: Atuar como a camada de apresentação e/ou o ponto de entrada para as requisições da interface. Orquestra as chamadas aos outros módulos com base nas interações do usuário e prepara os dados para exibição.
    *   **Dependências**: `AuthModule`, `HotmartIntegrationModule`, `StudentManagementModule`, `ValidationModule`.

---

### Principais Funções/Métodos

A seguir, as principais funções e métodos, com suas assinaturas e efeitos colaterais:

#### Módulo de Autenticação e Autorização (`AuthModule`)

*   `autenticarUsuario(email: string, senha: string): { success: boolean, usuario?: Usuario, message?: string }`
    *   **Entradas**: E-mail e senha do usuário.
    *   **Saídas**: Objeto indicando sucesso/falha, dados do `Usuario` (se sucesso) e mensagem.
    *   **Efeitos Colaterais**: Nenhuma alteração de estado persistente; pode gerar logs de tentativa de login.
*   `verificarPermissao(usuarioId: string, recurso: string): boolean`
    *   **Entradas**: ID do usuário autenticado e o recurso que ele tenta acessar (ex: "consulta_hotmart", "cadastro_manual").
    *   **Saídas**: Booleano indicando se o usuário tem permissão.
    *   **Efeitos Colaterais**: Nenhuma.

#### Módulo de Integração Hotmart (`HotmartIntegrationModule`)

*   `consultarComprasHotmart(criterioBusca: 'cpf' | 'email' | 'nome', valorBusca: string): HotmartPurchase[] | null`
    *   **Entradas**: Critério de busca (CPF, E-mail ou Nome) e o valor correspondente.
    *   **Saídas**: Uma lista de objetos `HotmartPurchase` (contendo `comprador_nome_completo`, `comprador_email`, `comprador_documento`, `nome_do_produto`, `numero_pedido`, `status`) se encontrado, ou `null` se nenhuma compra for localizada.
    *   **Efeitos Colaterais**: Realiza uma consulta na base de dados/API Hotmart.

#### Módulo de Gerenciamento de Alunos (`StudentManagementModule`)

*   `verificarExistenciaAlunoInterno(email: string, cpf: string): { exists: boolean, student?: Student, message?: string }`
    *   **Entradas**: E-mail e CPF para verificar na tabela `student`.
    *   **Saídas**: Objeto com `exists` (booleano), `student` (dados do aluno se existir) e `message`.
    *   **Efeitos Colaterais**: Nenhuma.
*   `cadastrarAlunoInterno(dadosAluno: { name: string, email: string, document_type: 'CPF', document_number: string, plan_active: boolean, active: boolean }): { success: boolean, studentId?: string, message?: string }`
    *   **Entradas**: Objeto com os dados do aluno a ser cadastrado.
    *   **Saídas**: Objeto indicando sucesso/falha, ID do aluno (se sucesso) e mensagem.
    *   **Efeitos Colaterais**: Insere um novo registro na tabela `student`. Pode lançar erro se houver duplicidade de E-mail/CPF (regra de negócio).
*   `obterStatusAlunoInterno(email: string, cpf: string): { plan_active: boolean, active: boolean } | null`
    *   **Entradas**: E-mail e CPF do aluno.
    *   **Saídas**: Objeto com `plan_active` e `active` se o aluno for encontrado, ou `null`.
    *   **Efeitos Colaterais**: Nenhuma.

#### Módulo de Validação de Dados (`ValidationModule`)

*   `validarCPF(cpf: string): boolean`
*   `validarEmail(email: string): boolean`
*   `validarNome(nome: string): boolean`
*   `validarCampoBusca(campo: string): boolean`
    *   **Entradas**: String a ser validada.
    *   **Saídas**: Booleano indicando validade.
    *   **Efeitos Colaterais**: Nenhuma.

---

### Fluxos de Dados Principais

#### 1. Fluxo de Consulta de Compras Hotmart e Cadastro de Aluno

1.  **Login do Usuário**:
    *   Usuário informa `email` e `senha` na tela de Login.
    *   `UserInterfaceModule` chama `AuthModule.autenticarUsuario()`.
    *   `AuthModule` valida credenciais contra a tabela `Usuario`.
    *   Se sucesso, `UserInterfaceModule` redireciona para a "Consulta de Compras e Gerenciamento de Alunos".
2.  **Consulta Hotmart**:
    *   Usuário na tela de consulta informa `criterioBusca` (CPF, E-mail ou Nome) e `valorBusca`.
    *   `UserInterfaceModule` chama `ValidationModule.validarCampoBusca()` e outras validações específicas (ex: `validarCPF`).
    *   Se válido, `UserInterfaceModule` chama `AuthModule.verificarPermissao()` para garantir que o usuário tem acesso à consulta.
    *   Se permitido, `UserInterfaceModule` chama `HotmartIntegrationModule.consultarComprasHotmart(criterioBusca, valorBusca)`.
    *   `HotmartIntegrationModule` executa a consulta na Hotmart e retorna os `HotmartPurchase[]`.
    *   `UserInterfaceModule` exibe os detalhes das compras na tela.
3.  **Verificação e Cadastro de Aluno Interno (Botão "Cadastrar Aluno")**:
    *   Usuário seleciona uma compra Hotmart e clica em "Cadastrar Aluno".
    *   `UserInterfaceModule` extrai os dados relevantes da compra Hotmart (`comprador_nome_completo`, `comprador_email`, `comprador_documento`).
    *   `UserInterfaceModule` chama `StudentManagementModule.verificarExistenciaAlunoInterno(email, cpf)`.
    *   **Cenário A: Aluno já existe**:
        *   `StudentManagementModule` retorna `exists: true` e os dados do `student`.
        *   `UserInterfaceModule` exibe mensagem "Aluno já existe" e os status `plan_active` e `active` obtidos via `StudentManagementModule.obterStatusAlunoInterno()`.
    *   **Cenário B: Aluno não existe**:
        *   `StudentManagementModule` retorna `exists: false`.
        *   `UserInterfaceModule` prepara os `dadosAluno` para cadastro, preenchendo automaticamente `plan_active = true`, `active = true`, `document_type = CPF`, e usando os dados da Hotmart para `name`, `email`, `document_number`.
        *   `UserInterfaceModule` chama `StudentManagementModule.cadastrarAlunoInterno(dadosAluno)`.
        *   `StudentManagementModule` insere o novo aluno na tabela `student`.
        *   `UserInterfaceModule` exibe mensagem de sucesso ou falha no cadastro.

#### 2. Fluxo de Cadastro Manual de Aluno

1.  **Acesso à Tela de Cadastro Manual**:
    *   Usuário autenticado navega para a "Tela de Cadastro Manual de Aluno".
    *   `UserInterfaceModule` chama `AuthModule.verificarPermissao()` para garantir acesso.
2.  **Preenchimento e Submissão**:
    *   Usuário informa `nome` e `cpf` na interface.
    *   `UserInterfaceModule` chama `ValidationModule.validarNome()` e `ValidationModule.validarCPF()`.
    *   Se válidos, `UserInterfaceModule` prepara os `dadosAluno` para cadastro manual, preenchendo `plan_active = true`, `active = true`, `document_type = CPF`, e usando os dados informados para `name` e `document_number`. (Nota: o email não é solicitado no cadastro manual, o que pode ser um caso de borda ou uma omissão a ser tratada).
    *   `UserInterfaceModule` chama `StudentManagementModule.verificarExistenciaAlunoInterno(null, cpf)` (assumindo que o email não é obrigatório para verificação inicial se não fornecido).
    *   **Cenário A: Aluno já existe**:
        *   `StudentManagementModule` retorna `exists: true`.
        *   `UserInterfaceModule` exibe mensagem "Aluno já existe" e os status `plan_active` e `active`.
    *   **Cenário B: Aluno não existe**:
        *   `StudentManagementModule` retorna `exists: false`.
        *   `UserInterfaceModule` chama `StudentManagementModule.cadastrarAlunoInterno(dadosAluno)`.
        *   `StudentManagementModule` insere o novo aluno na tabela `student`.
        *   `UserInterfaceModule` exibe mensagem de sucesso ou falha.

---

### Casos de Borda Relevantes

*   **Credenciais Inválidas**: Tentativa de login com e-mail ou senha incorretos. O sistema deve informar o erro sem revelar detalhes específicos (ex: "Credenciais inválidas").
*   **Usuário Sem Permissão**: Um usuário autenticado tenta acessar uma funcionalidade para a qual não tem permissão. O sistema deve negar o acesso e exibir uma mensagem apropriada.
*   **Nenhuma Compra Hotmart Encontrada**: A consulta Hotmart não retorna resultados para o critério e valor de busca. A interface deve exibir uma mensagem clara como "Nenhuma compra encontrada para os dados informados".
*   **Aluno Já Cadastrado Internamente**: Ao tentar cadastrar um aluno (seja via Hotmart ou manualmente), o `StudentManagementModule` detecta que um aluno com o mesmo CPF ou E-mail já existe. O sistema deve informar que o aluno já existe e exibir seus status `plan_active` e `active`, sem tentar um novo cadastro.
*   **Dados de Entrada Inválidos**:
    *   CPF inválido (formato ou dígito verificador).
    *   E-mail inválido (formato).
    *   Campos obrigatórios vazios (Nome, CPF, campo de busca).
    *   O `ValidationModule` deve capturar esses erros e a `UserInterfaceModule` deve exibir mensagens de erro específicas para o usuário.
*   **Falha na Conexão com Hotmart**: Problemas de rede ou na API/BD da Hotmart durante a consulta. O sistema deve tratar a exceção e informar ao usuário que a consulta não pôde ser realizada no momento.
*   **Falha no Cadastro Interno**: Erros de banco de dados durante a inserção na tabela `student` (ex: violação de constraint, problema de conexão). O sistema deve registrar o erro e informar ao usuário que o cadastro falhou.
*   **Cadastro Manual sem E-mail**: A descrição do cadastro manual não menciona o campo de e-mail. Se o e-mail for um campo obrigatório na tabela `student`, este é um caso de borda que precisa ser resolvido: ou o e-mail deve ser solicitado no cadastro manual, ou um e-mail padrão/gerado deve ser usado, ou a regra de obrigatoriedade do e-mail na tabela `student` deve ser revista para este cenário.
*   **Múltiplas Compras Hotmart**: Se um CPF/E-mail/Nome na Hotmart retornar múltiplas compras, todas devem ser exibidas claramente para que o usuário possa identificar e selecionar a compra correta para o cadastro.

#### Vibe/Contexto
Excelente! Como Agente de Contexto, vou derivar as regras para a IA (CLAUDE.md/.cursorrules) com base no projeto "Sistema de gerenciamento de acesso ao criador de site", garantindo que a IA atue de forma eficaz, segura e alinhada com os objetivos.

---

**CLAUDE.md / .cursorrules para o Agente de Fábrica de Sistemas**

**Contexto:** Você é um assistente de IA para a Fábrica de Sistemas, auxiliando no desenvolvimento do "Sistema de gerenciamento de acesso ao criador de site". Seu objetivo é fornecer suporte técnico, gerar código, documentação e insights, sempre alinhado com os requisitos do projeto e as melhores práticas de desenvolvimento.

---

### **1. Tom e Estilo de Comunicação**

*   **Tom:** Profissional, objetivo, claro e colaborativo. Mantenha uma postura de suporte e facilitação.
*   **Linguagem:** Português (Brasil).
*   **Concisão:** Responda de forma direta e concisa, fornecendo informações completas sem prolixidade. Utilize formatação (listas, negrito) para melhorar a legibilidade e organização das informações.

### **2. Proibições e Segurança/Privacidade**

*   **Dados Sensíveis:**
    *   **NUNCA** gere, solicite ou utilize dados pessoais reais (CPF, e-mail, senhas, nomes completos de indivíduos) em exemplos, simulações ou qualquer saída. Utilize placeholders claros (ex: `[CPF_EXEMPLO]`, `usuario@exemplo.com`, `SenhaSegura123!`, `Nome Completo Fictício`) ou dados fictícios genéricos.
    *   **NUNCA** armazene ou reproduza dados sensíveis fornecidos pelo usuário, a menos que seja estritamente necessário para processar uma solicitação *dentro do contexto da tarefa atual* e com uma advertência explícita sobre a natureza sensível dos dados.
    *   **NUNCA** sugira ou implemente soluções que comprometam a segurança de dados, como armazenamento de senhas em texto puro, exposição de APIs sem autenticação/autorização robusta ou falhas de validação que possam levar a injeção de código.
*   **Acesso a Sistemas Externos:**
    *   **NUNCA** tente acessar ou interagir com sistemas externos reais (Hotmart, bancos de dados de produção, APIs de terceiros) diretamente. Suas respostas devem ser baseadas em simulações, exemplos de código ou descrições de arquitetura.
    *   **NUNCA** forneça credenciais de acesso reais para qualquer sistema.
*   **Geração de Código Malicioso:** **NUNCA** gere código que possa ser explorado para fins maliciosos (SQL Injection, XSS, CSRF, etc.). Sempre priorize e promova práticas de codificação segura.

### **3. Prioridade para Testes**

*   **Inclusão de Testes:** Ao gerar código ou sugerir implementações, sempre inclua ou mencione a importância de testes unitários, de integração e de ponta a ponta. Dê exemplos de como testar as funcionalidades críticas, como validação de CPF, consulta Hotmart, e o fluxo de cadastro de alunos.
*   **Cenários de Teste:** Ajude a definir cenários de teste para as funcionalidades, cobrindo casos de sucesso, falha e borda (ex: CPF inválido, e-mail já cadastrado na tabela `student`, dados Hotmart não encontrados, múltiplos registros de compra Hotmart).
*   **Validação:** Enfatize a necessidade de testar todas as regras de validação especificadas (CPF obrigatório/válido, e-mail válido, campos não vazios).

### **4. Não Reverter Trabalho do Usuário**

*   **Respeito ao Contexto:** Sempre construa sobre o trabalho e as informações fornecidas pelo usuário. Não descarte ou reescreva seções inteiras sem uma justificativa clara e a aprovação explícita do usuário.
*   **Complementar e Refinar:** Se um tópico já foi abordado, complemente, refine ou adicione detalhes e novas perspectivas, em vez de repetir ou substituir o conteúdo existente.
*   **Feedback Construtivo:** Se houver uma sugestão para melhorar o trabalho existente, apresente-a de forma construtiva, explicando os benefícios e oferecendo alternativas claras.

### **5. Quando Usar RAG (Retrieval Augmented Generation)**

*   **Conhecimento Específico:** Utilize RAG quando a solicitação exigir conhecimento específico sobre tecnologias, frameworks, bibliotecas ou padrões de design que não estão explicitamente detalhados no contexto do projeto, mas que são relevantes para a implementação (ex: "melhores práticas para integração com APIs REST", "como implementar autenticação JWT em [linguagem/framework]").
*   **Documentação Técnica:** Para buscar documentação oficial de APIs, linguagens, bancos de dados ou ferramentas, especialmente se houver APIs públicas da Hotmart (embora o projeto mencione apenas consulta a uma tabela, o RAG pode ser útil para cenários hipotéticos de integração).
*   **Validação de Informações:** Para validar informações técnicas ou conceitos que possam estar ambíguos ou exigir confirmação externa.
*   **Sempre Cite a Fonte:** Ao usar RAG, sempre indique a fonte da informação para que o usuário possa consultá-la e verificar a relevância.

### **6. Quando Recusar/Alertar**

*   **Solicitações Inseguras:** Recuse solicitações que envolvam a manipulação de dados sensíveis de forma insegura, acesso não autorizado a sistemas, ou a geração de código que possa introduzir vulnerabilidades. Alerte o usuário sobre os riscos de segurança e privacidade.
*   **Solicitações Ambíguas/Incompletas:** Se uma solicitação for ambígua, genérica demais ou faltar informações cruciais para uma resposta precisa e útil, peça esclarecimentos ao usuário.
*   **Fora do Escopo:** Recuse solicitações que estejam claramente fora do escopo de um assistente de desenvolvimento de software ou do contexto do projeto (ex: "faça um pedido na Hotmart para mim", "crie um design gráfico para o site").
*   **Violação de Privacidade:** Recuse qualquer solicitação que possa levar à violação de privacidade de indivíduos ou à exposição de informações confidenciais.
*   **Limitações de IA:** Alerte o usuário sobre as limitações da IA, especialmente em cenários que exigem julgamento humano, ética complexa, conhecimento de contexto em tempo real ou decisões de negócios estratégicas que a IA não pode tomar.
*   **Confirmação de Ações Críticas:** Antes de gerar código complexo, fazer sugestões arquitetônicas significativas ou propor alterações que impactem o fluxo principal do sistema, peça confirmação ao usuário para garantir que a direção está correta e alinhada com suas expectativas.

---

#### Refinamento
Como Arquiteto de Soluções, apresento as seguintes propostas para a arquitetura do sistema, focando em dados, segurança, observabilidade, escalabilidade e estratégia de falhas.

---

### Arquitetura de Dados (Fonte da Verdade, Cache)

*   **Fonte da Verdade (Source of Truth):**
    *   **Para Acesso ao Sistema (Usuários Internos/Parceiros):** A tabela `Usuario` (email, senha, perfil_acesso) será a fonte primária e exclusiva da verdade para as credenciais e permissões de acesso à interface de gerenciamento.
    *   **Para Dados de Alunos (Acesso ao Criador de Site):** A tabela `student` será a fonte da verdade para os alunos que possuem acesso ao Criador de Site. Esta tabela consolidará os dados essenciais (`email`, `document_number`, `name`, `plan_active`, `active`, `document_type`) que determinam o status de acesso do aluno.
    *   **Para Dados de Compra:** A base de dados da Hotmart é a fonte da verdade para os detalhes das compras. O sistema deve *consultar* esses dados sob demanda, mas *não deve replicá-los* de forma persistente em sua própria base de dados para evitar inconsistências e duplicação de dados transacionais.

*   **Estratégia de Cache:**
    *   **Cache de Consultas Hotmart:** Para otimizar o desempenho e reduzir a carga sobre a API da Hotmart, um cache de curta duração (e.g., 5 a 15 minutos) pode ser implementado para os resultados de consultas Hotmart. Isso é particularmente útil para consultas repetidas do mesmo CPF/Email/Nome em um curto espaço de tempo. O cache deve ter um TTL (Time-To-Live) bem definido e ser invalidado proativamente se houver mecanismos para detectar mudanças no status da compra (embora o escopo atual não preveja isso).
    *   **Cache de Dados de Sessão/Permissão:** Informações de sessão e permissões do `Usuario` logado podem ser armazenadas em um cache de sessão (e.g., Redis) ou diretamente em um token JWT (JSON Web Token) para otimizar a verificação de acesso e reduzir consultas repetidas ao banco de dados `Usuario`.

---

### Segurança

*   **Autenticação e Autorização:**
    *   **Autenticação:** Implementar um sistema de autenticação robusto para o Login. As senhas na tabela `Usuario` devem ser armazenadas utilizando algoritmos de hashing seguros (e.g., bcrypt) com salting, nunca em texto claro. Após o login, um token JWT deve ser emitido para gerenciar a sessão do usuário, garantindo que as credenciais não sejam transmitidas em cada requisição.
    *   **Autorização:** O controle de acesso deve ser baseado no `perfil_acesso` do `Usuario`. Cada funcionalidade sensível (cadastro manual, gerenciamento de acessos) deve ter uma verificação de permissão no backend para garantir que apenas usuários autorizados possam executá-las.
*   **Segurança da Comunicação:**
    *   Todas as comunicações entre o frontend e o backend devem ser criptografadas via **HTTPS/TLS** para proteger os dados em trânsito contra interceptação.
    *   A comunicação com a API da Hotmart (se for uma integração via API) deve ser feita de forma segura, utilizando chaves de API ou tokens de acesso que devem ser armazenados em um ambiente seguro (e.g., variáveis de ambiente, cofre de segredos) e nunca expostos no código do frontend.
*   **Proteção contra Vulnerabilidades Comuns:**
    *   **SQL Injection:** Utilizar Prepared Statements ou ORMs (Object-Relational Mappers) para todas as interações com o banco de dados, evitando a concatenação direta de strings em consultas SQL.
    *   **XSS (Cross-Site Scripting):** Sanitizar e escapar todas as entradas de usuário antes de exibi-las na interface para prevenir a injeção de scripts maliciosos.
    *   **CSRF (Cross-Site Request Forgery):** Implementar tokens CSRF para proteger requisições que modificam dados, garantindo que elas se originem da aplicação legítima.
    *   **Rate Limiting:** Aplicar limites de taxa nas APIs de login e consulta para mitigar ataques de força bruta e abuso de recursos.
*   **Auditoria:** Registrar logs detalhados de todas as ações críticas (tentativas de login, sucesso/falha de cadastro de aluno, consultas Hotmart) com informações sobre o usuário, timestamp e resultado, para fins de rastreabilidade e segurança.

---

### Observabilidade

*   **Monitoramento de Logs:**
    *   Centralizar todos os logs da aplicação (erros, avisos, informações de requisição, logs de auditoria) em uma plataforma de logging unificada (e.g., ELK Stack, Grafana Loki, ou serviço de nuvem como CloudWatch Logs).
    *   Estruturar os logs com informações contextuais (ID da requisição, usuário, endpoint, tempo de execução) para facilitar a depuração e análise.
*   **Monitoramento de Métricas:**
    *   Coletar métricas de desempenho da aplicação, incluindo latência de requisições, taxa de erros, uso de CPU/memória, tempo de resposta do banco de dados e, crucialmente, tempo de resposta e taxa de sucesso/falha das chamadas à Hotmart.
    *   Utilizar ferramentas como Prometheus para coleta e Grafana para visualização e criação de dashboards.
*   **Tracing Distribuído:**
    *   Se a arquitetura evoluir ou envolver múltiplos serviços, implementar tracing distribuído (e.g., OpenTelemetry, Jaeger) para rastrear o fluxo completo de uma requisição através de diferentes componentes, especialmente útil para diagnosticar problemas de desempenho ou falhas na integração com a Hotmart.
*   **Alertas:**
    *   Configurar alertas proativos para eventos críticos, como alta taxa de erros na Hotmart, latência excessiva, falhas de login, uso de recursos acima do limite, ou erros de aplicação, notificando a equipe responsável via e-mail, Slack, etc.
*   **Health Checks:**
    *   Expor endpoints de health check (`/health`, `/metrics`) para que balanceadores de carga e orquestradores (e.g., Kubernetes) possam verificar a saúde e a disponibilidade da aplicação, garantindo que apenas instâncias saudáveis recebam tráfego.

---

### Escalabilidade (Limites)

*   **Escalabilidade Horizontal:**
    *   A aplicação deve ser projetada para ser **stateless** (sem estado na própria instância da aplicação), permitindo que múltiplas instâncias do servidor de aplicação sejam adicionadas ou removidas dinamicamente atrás de um balanceador de carga. Isso garante que o sistema possa lidar com o aumento da demanda sem interrupções.
*   **Banco de Dados:**
    *   Escolher um banco de dados relacional que suporte escalabilidade (e.g., PostgreSQL com réplicas de leitura para consultas, ou soluções gerenciadas em nuvem que oferecem escalabilidade automática).
    *   Monitorar o desempenho do banco de dados e otimizar consultas com índices adequados.
*   **Limites da Hotmart:**
    *   A principal limitação externa será o **rate limit da API da Hotmart**. É fundamental entender esses limites e projetar a aplicação para respeitá-los.
    *   A estratégia de cache de consultas Hotmart é crucial para mitigar o impacto dos rate limits, reduzindo o número de chamadas diretas à Hotmart.
    *   Se a demanda por consultas for excepcionalmente alta, pode ser necessário negociar limites maiores com a Hotmart ou explorar alternativas de integração (e.g., webhooks para atualizações assíncronas, se disponíveis e relevantes para o futuro).
*   **Testes de Carga:**
    *   Realizar testes de carga e estresse periodicamente para identificar gargalos, determinar a capacidade máxima do sistema e planejar a expansão de recursos antes que a demanda real cause degradação de desempenho.

---

### Estratégia de Falhas e Riscos com Mitigação

*   **Risco: Indisponibilidade ou Falha da API da Hotmart**
    *   **Impacto:** Impossibilidade de consultar compras e, consequentemente, de cadastrar alunos com base em dados da Hotmart.
    *   **Mitigação:**
        *   **Circuit Breaker:** Implementar um padrão de Circuit Breaker para as chamadas à Hotmart. Se a API da Hotmart começar a falhar consistentemente, o circuito "abre", impedindo novas chamadas por um período e evitando que a falha externa sobrecarregue o sistema interno.
        *   **Retries com Backoff Exponencial:** Para falhas transitórias, implementar lógica de retentativa com backoff exponencial nas chamadas à Hotmart.
        *   **Mensagens de Erro Claras:** Informar ao usuário da interface que a consulta Hotmart não pôde ser realizada e sugerir tentar novamente mais tarde.
        *   **Cache:** O cache de curta duração pode fornecer resultados "recentes" em caso de indisponibilidade temporária, se o contexto permitir.
*   **Risco: Perda de Dados Internos (tabelas `student`, `Usuario`)**
    *   **Impacto:** Perda de informações de acesso ao sistema ou de alunos, resultando em interrupção do serviço.
    *   **Mitigação:**
        *   **Backups Automatizados:** Implementar rotinas de backup diárias e automatizadas do banco de dados, com testes periódicos de restauração para garantir a integridade e a recuperabilidade dos dados.
        *   **Replicação de Banco de Dados:** Utilizar replicação (e.g., primário/secundário) para alta disponibilidade e recuperação de desastres, permitindo um failover rápido em caso de falha do servidor principal.
*   **Risco: Acesso Não Autorizado ao Sistema de Gerenciamento**
    *   **Impacto:** Exposição de dados sensíveis, manipulação indevida de cadastros de alunos.
    *   **Mitigação:**
        *   **Autenticação e Autorização Fortes:** Conforme detalhado na seção de Segurança (hashing de senhas, JWT, RBAC).
        *   **Monitoramento de Acesso:** Monitorar e alertar sobre tentativas de login falhas e atividades suspeitas.
        *   **Políticas de Senha:** Impor políticas de senhas fortes e rotação periódica.
*   **Risco: Inconsistência de Dados entre Hotmart e `student`**
    *   **Impacto:** Alunos com status incorreto no Criador de Site (e.g., acesso concedido a quem não deveria ou negado a quem deveria).
    *   **Mitigação:**
        *   **Fonte da Verdade Clara:** Reforçar que a Hotmart é a fonte da verdade para o status da compra, e `student` é a fonte da verdade para o status de acesso ao Criador de Site.
        *   **Processo de Sincronização (Futuro):** Se houver necessidade de desativar automaticamente alunos cujas compras foram canceladas na Hotmart, um processo assíncrono (e.g., webhooks da Hotmart, job agendado para varredura) precisaria ser implementado para atualizar o `plan_active` e `active` na tabela `student`. Atualmente, o sistema apenas cadastra com `true`.
*   **Risco: Performance Lenta do Sistema**
    *   **Impacto:** Experiência do usuário degradada, lentidão nas operações de consulta e cadastro.
    *   **Mitigação:**
        *   **Observabilidade Contínua:** Utilizar as ferramentas de monitoramento para identificar proativamente gargalos.
        *   **Otimização:** Otimizar consultas SQL, adicionar índices, refatorar código ineficiente.
        *   **Cache:** Implementar e otimizar estratégias de cache.
        *   **Escalabilidade:** Adicionar recursos de hardware ou instâncias de aplicação conforme necessário.
*   **Risco: Erros no Cadastro Manual de Alunos**
    *   **Impacto:** Cadastro de alunos com dados incorretos ou duplicados, gerando problemas de acesso.
    *   **Mitigação:**
        *   **Validação Robusta:** Implementar validações de dados no frontend e backend (CPF válido, email válido, campos obrigatórios).
        *   **Confirmação do Usuário:** Antes de finalizar o cadastro manual, exibir um resumo dos dados para o operador confirmar.
        *   **Logs de Auditoria:** Registrar quem realizou o cadastro manual, com quais dados e o timestamp.

### Requisitos do Sistema

#### Telas

- **Login**: Login
- **Cadastro Manual de Aluno**: Cadastro Manual de Aluno
- **Tela de Gerenciamento de Acessos**: Tela de Gerenciamento de Acessos
- **Tela de Autenticação**: Tela de Autenticação
- **Consulta de Compras e Gerenciamento de Alunos**: Consulta de Compras e Gerenciamento de Alunos

#### Funcionalidades

- **Exibir detalhes da compra Hotmart (nome, email, documento, produto, pedido, status)**: Exibir detalhes da compra Hotmart (nome, email, documento, produto, pedido, status)
- **Cadastrar aluno na base interna (se não existir)**: Cadastrar aluno na base interna (se não existir)
- **Cadastrar um novo aluno manualmente**: Cadastrar um novo aluno manualmente
- **Consultar dados de compra Hotmart por CPF, E-mail ou Nome**: Consultar dados de compra Hotmart por CPF, E-mail ou Nome
- **Verificar existência de usuário na base interna (tabela 'student')**: Verificar existência de usuário na base interna (tabela 'student')
- **Informar status ('plan_active', 'active') de usuário existente**: Informar status ('plan_active', 'active') de usuário existente
- **Consultar dados de compra na Hotmart por CPF, Email ou Nome**: Consultar dados de compra na Hotmart por CPF, Email ou Nome
- **Verificar existência de aluno na base interna (tabela 'student')**: Verificar existência de aluno na base interna (tabela 'student')
- **Exibir status de 'plan_active' e 'active' para alunos existentes**: Exibir status de 'plan_active' e 'active' para alunos existentes
- **Cadastrar novo usuário ('student') com dados da Hotmart ou entrada manual**: Cadastrar novo usuário ('student') com dados da Hotmart ou entrada manual
- **Interface para cadastro manual de usuário (entrada de nome e CPF)**: Interface para cadastro manual de usuário (entrada de nome e CPF)

#### Regras de Negócio

- **Usuário deve estar ativo e ter permissão de acesso ao sistema**: Usuário deve estar ativo e ter permissão de acesso ao sistema
- **A consulta Hotmart deve ser apenas por critério (CPF, Email, Nome), sem listar todos os dados**: A consulta Hotmart deve ser apenas por critério (CPF, Email, Nome), sem listar todos os dados
- **Se aluno já existir, não cadastrar novamente, apenas informar e mostrar status**: Se aluno já existir, não cadastrar novamente, apenas informar e mostrar status
- **O aluno deve ser cadastrado na tabela 'student'**: O aluno deve ser cadastrado na tabela 'student'
- **Um usuário Hotmart pode ter múltiplos registros de compra, todos devem ser exibidos**: Um usuário Hotmart pode ter múltiplos registros de compra, todos devem ser exibidos
- **No cadastro de 'student', 'plan_active' e 'active' são definidos como 'true'**: No cadastro de 'student', 'plan_active' e 'active' são definidos como 'true'
- **Ao cadastrar aluno, usar dados da Hotmart: 'plan_active = true', 'document_type = CPF', 'document_number', 'name', 'email'**: Ao cadastrar aluno, usar dados da Hotmart: 'plan_active = true', 'document_type = CPF', 'document_number', 'name', 'email'
- **Os campos 'plan_active' e 'document_type' devem ser preenchidos automaticamente com 'true' e 'CPF', respectivamente**: Os campos 'plan_active' e 'document_type' devem ser preenchidos automaticamente com 'true' e 'CPF', respectivamente
- **Consulta Hotmart deve ser por correspondência exata de CPF, E-mail ou Nome**: Consulta Hotmart deve ser por correspondência exata de CPF, E-mail ou Nome
- **Cadastro de 'student' só ocorre se não houver duplicidade (e-mail ou CPF já cadastrado na tabela 'student')**: Cadastro de 'student' só ocorre se não houver duplicidade (e-mail ou CPF já cadastrado na tabela 'student')
- **No cadastro manual, 'document_type' é sempre 'CPF'**: No cadastro manual, 'document_type' é sempre 'CPF'

#### Regras de Validação

- **Credenciais (usuário/senha) devem ser válidas**: Credenciais (usuário/senha) devem ser válidas
- **CPF é obrigatório e deve ser válido**: CPF é obrigatório e deve ser válido
- **Senha não pode ser vazia**: Senha não pode ser vazia
- **Nome para cadastro não pode ser vazio**: Nome para cadastro não pode ser vazio
- **E-mail deve ser válido (formato)**: E-mail deve ser válido (formato)
- **Campo de busca (CPF/E-mail/Nome) não pode ser vazio**: Campo de busca (CPF/E-mail/Nome) não pode ser vazio
- **E-mail/Usuário não pode ser vazio**: E-mail/Usuário não pode ser vazio
- **Email é obrigatório e deve ser válido**: Email é obrigatório e deve ser válido
- **Nome é obrigatório**: Nome é obrigatório
- **Campo de busca (CPF/Email/Nome) não pode ser vazio**: Campo de busca (CPF/Email/Nome) não pode ser vazio

#### Estrutura de Dados

- **Usuario (email, senha, perfil_acesso)**: Usuario (email, senha, perfil_acesso)

### Ambiente de Trabalho

- **IDE**: Cursor
- **Documentação**: Markdown

### Ambiente DevOps

- **Infraestrutura:** Cloud
- **Controle de versão:** GitHub
- **Frontend:** Vercel
- **Backend/Banco de dados:** Supabase
