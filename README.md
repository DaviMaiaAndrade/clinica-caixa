# 🏥 Sistema de Gestão Financeira para Clínica

Sistema web para controle de caixa, consultas médicas e gestão financeira de clínicas.

## 🚀 Tecnologias

### Backend
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 16+
- npm ou yarn

## ⚙️ Instalação

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure DATABASE_URL no .env
npx prisma migrate dev
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🗂️ Estrutura do Banco

- **Especialidade** - Especialidades médicas
- **Medico** - Cadastro de médicos
- **Consulta** - Registro de consultas com valores
- **Despesa** - Controle de despesas
- **Movimentacao** - Depósitos e saques
- **SaldoCaixa** - Fechamento diário

## 🔐 Variáveis de Ambiente

Criar arquivo `.env` no backend:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/clinica_caixa?schema=public"
```

## 📝 Status do Projeto

🚧 Em desenvolvimento - Fase 2 concluída (Database Setup)

## 👨‍💻 Autor

Davi