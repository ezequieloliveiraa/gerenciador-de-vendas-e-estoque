# gerenciador-de-vendas-e-estoque
Sistema de gerenciamento de estoque, clientes, vendas e carrinhos de compras moderno, totalmente interativo e executado direto no navegador. Desenvolvido para oferecer performance, responsividade e uma experiência de usuário fluida, sem a necessidade de um servidor backend tradicional.

---

## Tecnologias Utilizadas

* **HTML5:** Estruturação semântica e acessível.
* **CSS3:** Estilização customizada avançada, propriedades personalizadas e layout totalmente responsivo via Flexbox.
* **JavaScript (ES6+):** Lógica de negócios modular, manipulação dinâmica do DOM e gestão de eventos.
* **Bootstrap 5.3:** Framework CSS responsável pela consistência visual, modais e componentes responsivos.
* **Bootstrap Icons:** Iconografia vetorial moderna.
* **Chart.js:** Renderização de gráficos dinâmicos para análise de desempenho comercial.
* **Web Storage API (`localStorage`):** Banco de dados gerenciado nativamente pelo navegador para persistência contínua das informações.

---

## Principais Funcionalidades

* **Persistência de Dados Local (`localStorage`):** Sistema autossuficiente que inicializa um banco de dados simulado robusto e salva todas as alterações de estoque, vendas e clientes diretamente no navegador.
* **Design Responsivo Avançado:** Layout adaptado para diferentes resoluções de tela (desktops, tablets e dispositivos móveis), contando com menu de navegação dinâmico.
* **Dashboard Analítico:** Indicadores em tempo real de receita total, volume de clientes, status do estoque e alerta automatizado de itens em nível crítico.
* **Gestão de Carrinhos e Vendas:** Permite o agrupamento de itens por cliente, ajuste flexível de quantidades, cálculo automático de subtotais e baixa automática de estoque ao concluir a transação.
* **Filtros e Localização Rápida:** Ferramentas de busca instantânea na central de clientes.
* **Padronização Monetária:** Entradas de valores formatadas nativamente para o padrão da moeda brasileira (BRL).

---

##  Estrutura do Repositório

```
├── index.html       # Arquivo raiz com a marcação estrutural e modais
├── style.css        # Folha de estilos customizada e media queries
└── script.js        # Motor lógico da aplicação, controle de estado e persistência
```
### Como Executar o Projeto

Como a aplicação faz uso de módulos JavaScript (`type="module"`), as políticas de segurança dos navegadores modernos bloqueiam o carregamento direto via protocolo local (`file://`). Por isso, é necessário executar o projeto através de um servidor de desenvolvimento local.

A forma mais prática de fazer isso é utilizando o Visual Studio Code:

1. Abra a pasta do projeto no VS Code.
2. Certifique-se de ter a extensão **Live Server** instalada.
3. Clique com o botão direito sobre o arquivo **`index.html`** e selecione a opção **"Open with Live Server"**.
4. O navegador padrão será aberto automaticamente com a aplicação rodando de forma integrada e o banco de dados local inicializado.
