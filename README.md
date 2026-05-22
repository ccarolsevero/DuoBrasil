# DUO BRASIL — Landing Page

Landing page do **Método E.P.I.C™** — gestão de tráfego pago com metodologia de indústria japonesa.

## Estrutura

```
DuoBrasil/
├── index.html        # Página principal
├── depoimentos.html  # Depoimentos em vídeo e feedbacks
├── cases.html        # Redireciona para depoimentos.html
├── css/styles.css    # Estilos globais
├── css/cases.css     # Estilos da página de depoimentos
├── js/main.js
├── assets/           # Logo, fotos, vídeos
├── vercel.json     # Configuração de deploy
└── README.md
```

## Desenvolvimento local

```bash
python3 -m http.server 8080
# ou: npx serve .
```

Acesse: http://localhost:8080

## Deploy na Vercel

1. Faça login em [vercel.com](https://vercel.com) com sua conta GitHub.
2. **Add New Project** → importe o repositório `DuoBrasil`.
3. A Vercel detecta site estático automaticamente (sem build).
4. Clique em **Deploy**.

O site ficará online em uma URL como `https://duo-brasil.vercel.app`.

### Deploy via CLI (opcional)

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Repositório

Repositório: **https://github.com/ccarolsevero/DuoBrasil**

```bash
git clone https://github.com/ccarolsevero/DuoBrasil.git
cd DuoBrasil
```
