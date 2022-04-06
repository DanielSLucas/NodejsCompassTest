# Teste compasso uol nodeJS

Aplicação desenvolvida com o objetivo de aplicar para vaga de desenvolvedor node.js
na empresa compasso uol.

## Sobre o teste

O teste consiste em na contrução de uma API REST com node.js com as seguintes funcionalidades:

- Cadastrar cidade
  - Uma cidade deve ter `nome` e `estado`
- Cadastrar cliente
  - Uma cliente deve ter `nome completo`, `sexo`, `data de nascimento`, `idade` e `cidade onde mora`
- Consultar cidade pelo nome
- Consultar cidade pelo estado
- Consultar cliente pelo nome
- Consultar cliente pelo Id
- Remover cliente
- Alterar o nome do cliente

## Para rodar a API em sua máquina

**Ateção**: para executar esse projeto é necessário:
- Ter o [node](https://nodejs.org) instalado, pelo menos em sua versão lts.
- Ter o [docker](https://www.docker.com/get-started/) instalado.
- Criar um arquivo `.env` que igual ao `.env.example`

```bash
  # Clone esse repositório
  git clone https://github.com/DanielSLucas/NodejsCompassTest.git

  # entre na pasta desse projeto
  cd NodejsCompassTest

  # inicie o container docker com o postgres
  docker-compose up

  # Para rodar o projeto em desenvolvimento execute:
  npm run dev
  # ou
  yarn dev
```

*Também é possível rodar como se fosse em produção, executando os scripts de `build` e `start`
