# Template Profissional para Pequenos Negócios

Um template Next.js moderno e responsivo para sites de pequenos negócios, desenvolvido com React, TypeScript e Tailwind CSS.

## 🚀 Características

- ✨ **Design Moderno**: Interface profissional e atrativa
- 📱 **Totalmente Responsivo**: Otimizado para mobile, tablet e desktop
- ⚡ **Performance**: Next.js 15 com App Router para máxima velocidade
- 🎨 **Tailwind CSS**: Estilização moderna e flexível
- 📞 **Integração WhatsApp**: Botões de contato direto
- 📧 **Formulário de Contato**: Sistema de envio de mensagens
- 🔍 **SEO Otimizado**: Meta tags e estrutura otimizada para buscadores
- 🛠️ **TypeScript**: Desenvolvimento type-safe

## 📋 Seções Incluídas

1. **Header** - Navegação fixa com menu responsivo
2. **Hero** - Seção principal com call-to-action
3. **Sobre** - História e valores da empresa
4. **Serviços** - Catálogo de serviços com preços
5. **Contato** - Formulário e informações de contato
6. **Footer** - Links e informações complementares

## 🎯 Ideal Para

- Lojas físicas
- Restaurantes e lanchonetes  
- Clínicas e profissionais liberais
- Prestadores de serviços
- Consultórios
- Pequenas empresas em geral

## ⚙️ Configuração Rápida

### 1. Personalizar Informações da Empresa

Edite o arquivo `src/config/business.ts` com as informações do seu cliente:

```typescript
export const defaultBusinessConfig: BusinessConfig = {
  name: "Nome da Empresa",
  slogan: "Slogan da empresa",
  description: "Descrição dos serviços...",
  phone: "(11) 99999-9999",
  whatsapp: "5511999999999", // Formato internacional
  email: "contato@empresa.com.br",
  address: "Endereço completo",
  // ... outros campos
};
```

### 2. Customizar Serviços

No mesmo arquivo, altere o array `services`:

```typescript
services: [
  {
    id: "1",
    name: "Nome do Serviço",
    description: "Descrição detalhada",
    price: "R$ 299"
  },
  // Adicione mais serviços conforme necessário
]
```

### 3. Cores e Branding

Personalize as cores no arquivo de configuração:

```typescript
colors: {
  primary: "#2563eb",    // Cor principal
  secondary: "#1e40af",  // Cor secundária
  accent: "#f59e0b"      // Cor de destaque
}
```

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm start
```

## 💼 Modelo de Negócio

### Precificação Sugerida
- **Site Simples**: R$ 800 - R$ 1.500
- **Site Intermediário**: R$ 1.500 - R$ 2.500
- **Site Completo**: R$ 2.500 - R$ 4.000

### Tempo de Entrega
- **Personalização básica**: 1-2 dias
- **Customizações avançadas**: 3-5 dias
- **Site completamente novo**: 1-2 semanas

### Estratégia de Vendas
1. Demonstre o template funcionando
2. Mostre a facilidade de personalização
3. Enfatize design moderno e responsivo
4. Destaque integração com WhatsApp
5. Ofereça suporte pós-entrega

## 📱 Funcionalidades WhatsApp

O template inclui integração completa com WhatsApp:
- Botões de contato em várias seções
- Links personalizados por serviço
- Mensagens pré-formatadas
- Ícones e estilos otimizados

## 🎨 Customização Avançada

### Adicionar Nova Seção
1. Crie o componente em `src/components/`
2. Importe e adicione em `src/app/page.tsx`
3. Atualize navegação se necessário

### Modificar Estilos
- Use classes Tailwind para mudanças rápidas
- Customize `src/app/globals.css` para estilos globais
- Modifique componentes individuais conforme necessário

### Integrar com CMS
O template está preparado para integração com:
- Contentful
- Strapi
- Sanity
- WordPress (headless)

## 📊 Analytics e SEO

### SEO Incluído
- Meta tags otimizadas
- Open Graph tags
- Schema markup preparado
- URLs amigáveis
- Sitemap automático

### Analytics Recomendados
- Google Analytics 4
- Google Search Console
- Facebook Pixel (opcional)

### Checkout e Página de Obrigado
- Configure os links de pagamento em `src/config/business.ts` (campo `paymentLink` por plano)
- Defina a URL de retorno do seu provedor para `/thank-you` para registrar a conversão
- A página `/thank-you` dispara um evento `purchase` no GA4 automaticamente

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React** - Biblioteca UI
- **ESLint** - Linting
- **PostCSS** - Processamento CSS

## 📦 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload da pasta .next para Netlify
```

### Hospedagem Tradicional
```bash
npm run build
npm run export
# Upload da pasta out/
```

## 🎯 Próximos Passos

Após entregar o site para o cliente:

1. **Treinamento básico** - Como editar conteúdo
2. **Configurar analytics** - Google Analytics/Search Console  
3. **SEO local** - Google My Business
4. **Backup** - Configurar backups automáticos
5. **Manutenção** - Plano de atualizações

## 💡 Dicas de Vendas

### Pitch de Vendas
"Site profissional moderno, responsivo e otimizado para conversões, com integração WhatsApp e entrega em 3 dias."

### Diferenciais
- Design moderno e profissional
- Carregamento ultrarrápido
- Integração WhatsApp nativa
- SEO otimizado
- Suporte técnico incluso

### Upsells Possíveis
- Integração com redes sociais
- Sistema de agendamento
- Blog/notícias
- E-commerce básico
- Certificado SSL
- Domínio personalizado

## 📞 Suporte

Para dúvidas sobre customização ou vendas, consulte a documentação do Next.js ou entre em contato.

---

**Desenvolvido para maximizar suas vendas de sites profissionais! 🚀**
