## ProductsAPI

Este guia irá ajudá-lo a configurar e executar um projeto que utiliza NestJS, MongoDB e Docker em seu computador local. O projeto consiste em um sistema de CRUD para produtos e pedidos. Você poderá criar novos pedidos, atualizar seus status e gerenciar os produtos relacionados a esses pedidos.

### Tecnologias
- NestJS
- MongoDB
- Docker

### Passos

1. **Clonar o Repositório:**
    Clone o repositório do projeto para o seu computador:

    ```
    git clone https://github.com/rafacandido7/products-api
    ```

2. **Iniciar os Contêineres:**
    Navegue até o diretório do projeto onde está localizado o arquivo docker-compose.yaml e execute o seguinte comando:

    ```
    docker-compose up -d
    ```

3. **Acessar a Aplicação:**
    Verifique o status da api com

    ```
    docker logs products-api
    ```

    O resultado esperado é: Listening in port 8080 🚀!

    Depois que os contêineres estiverem em execução, acesse sua aplicação NestJS em seu navegador, digitando `localhost:8080/help`.

4. **Testar a Aplicação:**
    Interaja com sua aplicação através do navegador (Swagger), Postman ou outra ferramenta de API. Crie produtos, faça pedidos e atualize os status para garantir que tudo esteja funcionando conforme o esperado.

5. **Parar os Contêineres:**
    Quando terminar de trabalhar, pare os contêineres executando o seguinte comando no terminal:

    ```
    docker-compose down
    ```

    Isso encerrará os contêineres e liberará os recursos do seu sistema.

Com esses passos, você poderá facilmente executar e testar este projeto localmente. Aproveite para explorar e familiarizar-se com as funcionalidades oferecidas pela aplicação!
