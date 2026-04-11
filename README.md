# Analisador de Currículos com IA

![Cover](./public/images/Cover.png)

## Descrição

O **Analisador de Currículos com IA** é uma aplicação React escalável que utiliza Inteligência Artificial Generativa (LLMs) para avaliar a compatibilidade de currículos com descrições de vagas. Simulando algoritmos de sistemas ATS (_Applicant Tracking Systems_), a ferramenta ajuda candidatos a identificarem pontos de melhoria, otimizando seus currículos de acordo com métricas e dados quantificáveis, a fim de aumentar suas taxas de sucesso nos processos seletivos.

## Demonstração

<table>
  <tr>
    <td height="400px">
      <img src="./public/images/Demo.png" alt="Demo">
    </td>
    <td align="center">
      <strong>Link de Acesso:</strong><br>
      <a href="https://analisador-de-curriculos-com-ia.vercel.app/">https://analisador-de-curriculos-com-ia.vercel.app/</a>
    </td>
  </tr>
</table>

## Tecnologias Utilizadas

- **React** e **TypeScript:** Construção da interface com componentes reativos, moderna e com forte segurança de tipos.
- **Tailwind CSS:** Construção rápida e direta de _layouts_ responsivos e de alto desempenho visual.
- **Zustand:** Gerenciamento de estado global simplificado.
- **Puter.js:** Fornecimento de infraestrutura _cloud_, integrando diretamente no _frontend_ o processamento de IA (LLMs), a autenticação e o armazenamento.

## Decisões Técnicas

### Por que adotar uma Arquitetura Serverless?

A decisão de adotar uma arquitetura _serverless_ e centralizar o acesso a infraestruturas de nuvem via **Puter.js** foi tomada visando dois objetivos essenciais: **redução de custos e agilidade**.

No modelo de uma aplicação serveless desse formato, remove-se a necessidade de se levantar, provisionar, dar manutenção e principalmente pagar por um servidor _backend_ tradicional. Implementando um modelo que muitas vezes viabiliza custo zero (ou delega os custos computacionais via processamento direto pelo usuário e serviços parceiros), o projeto pôde nascer e ser escalado sem depender de orçamentos e sem gargalos de _DevOps_. Esse ganho de tempo e eficiência liberou o esforço do desenvolvimento para estar 100% concentrado em entregar uma excelente interface que se integra facilmente às tecnologias da IA generativa.

### Por que usar Zustand no lugar de Redux?

Comparado à robustez (e muitas vezes à imensa burocracia) do **Redux**, o uso do **Zustand** foi escolhido pelas seguintes vantagens práticas ao construir o analisador:

1. **Zero Boilerplate:** O Redux frequentemente exige a criação de arquivos vastos apenas para ações simples contendo _reducers_, _actions_, configurações de _Store_ longas e hierarquias de _Providers_. O Zustand permite criar um _store_ em apenas um arquivo usando somente um Hook enxuto (`useStore`).
2. **Baixa curva de complexidade e leveza:** Sem sobrecarregar o _bundle size_ (tamanho final do pacote JavaScript) da aplicação e mantendo a legibilidade, o Zustand entrega excelente velocidade e agilidade sem exigir que o dev defina arquiteturas confusas para lidar com estados que não precisariam de uma reatividade tão engessada.
3. Sem precisar de _Context Providers_ ao redor de todo o App, renderizações desnecessárias da aplicação são evitadas naturalmente na organização dos hooks da biblioteca.

## Como rodar localmente

Siga o rápido passo a passo abaixo para construir e testar a aplicação no seu computador:

1. Clone este repositório:

```bash
git clone https://github.com/SeuUsuario/analisador-de-curriculos-com-IA.git
```

2. Acesse a pasta do diretório criado:

```bash
cd analisador-de-curriculos-com-IA
```

3. Instale todas as dependências recomendadas:

```bash
npm install
# ou utilize yarn / pnpm install
```

4. Suba a aplicação em modo de desenvolvimento local:

```bash
npm run dev
# ou utilize yarn dev / pnpm dev
```

5. Acesse no navegador a porta indicada, que geralmente é:

```text
http://localhost:5173
```
