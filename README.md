## Verbos HTTP - Definem o que está sendo feito pela API

- GET - Busca/recupera informações no backend.
- POST - Enviar informações ao servidor (usado para criar algo novo). UTILIZADOS EM LOGIN
- PUT - Atualiza TODOS os campos do usuário.
- PATCH - Atualiza parcialmente os campos que forem alterados.
- DELETE - Deleta o dado específico.

## ROTAS via API:
- GET - localhost:3000/product/ - lista todos os produtos
- GET - localhost:3000/product/1 - lista apenas 1 produto
- POST - localhost:3000/product/ - cria um novo produto
- PUT - localhost:3000/product/1 - atualiza as infos do produto
- PATCH - localhost:3000/product/1 - atualiza infos específicas do produto.
- DELETE - localhost:3000/product/1 - deleta o produto

## ROTAS via Backend e HTTP request:
<!-- Só existe o método GET e POST -->
*@* GET - localhost:3000/get-products/ - lista todos os produtos
*@* GET - localhost:3000/get-product/1 - lista apenas 1 produto
*@* POST - localhost:3000/create-product/ - cria um novo produto
*@* POST - localhost:3000/edit-product-full/1 - atualiza as infos do produto
*@* POST - localhost:3000/edit-product-fragment/1/1 - atualiza infos específicas do produto.
*@* POST - localhost:3000/delete-product/1 - deleta o produto

## Modelo MVC para desenvolvimento e organização do backend.

- MODEL
- VIEW
- CONTROLLERS

MANEIRA DE COMUNICAR DE FORMA ORGANIZADA A API E sauas camadas

VIEW - pasta que ficarão as ROTAS;

caso de usuário de site:  rotas acessadas pelo cliente, atraves da view. localhos/user.
você pode ter user para criar, deletar, editar, listar. A MESMA rota user servirá para as 5 ações, todas com a mesma rota user. RESUMINDO: /user -> trará todos os recursos relacionados ao usuário.
A view tem como principal objetivo é permitir que haja a comunicação do client com o servidor

## ----------------------------------------

CONTROLLERS -- regras de negócios - lógica do backend
construir autorizações 

dentro das funções da VIEW ficarão os controllers, para dar ou não permicionamento ao usuário acessar aquilo. vai verificar dados como ID, nome da empresa, nivel de autorização, etc.

## ----------------------------------------

MODELS - Depois disso, será acessado o banco de dados através da pasta MODELS

Model são conjuntos de classes identicas as do banco de dados, e por isso eles conseguem se comunicar e pegar informações. Vai no banco e volta com a resposta







