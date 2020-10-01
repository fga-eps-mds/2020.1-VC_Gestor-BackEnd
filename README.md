# 2020.1-VC_Gestor-BackEnd


<p align="center">
  <img src="https://i.imgur.com/eit3CHj.png" alt="logo" />
</p>

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/33d1a8ef503c4dbdb056454ab10682f2)](https://www.codacy.com/gh/fga-eps-mds/2020.1-VC_Gestor-BackEnd/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=fga-eps-mds/2020.1-VC_Gestor-BackEnd&amp;utm_campaign=Badge_Grade) <img src="https://travis-ci.org/fga-eps-mds/2020.1-VC_Gestor-BackEnd.svg?branch=development" alt="travis" /> [![Maintainability](https://api.codeclimate.com/v1/badges/4307ac42aa172e3db36b/maintainability)](https://codeclimate.com/github/fga-eps-mds/2020.1-VC_Gestor-BackEnd/maintainability)


## ℹ️ Sobre o projeto
<p align="justify">Projeto desenvolvido durante as disciplinas de Engenharia de Produto de Software e Métodos de Desenvolvimento de Software da Universidade de Brasília, campus Gama.</p>
<p align="justify">Este projeto é parte do desenvolvimento do aplicativo "Vamos Cuidar", e tem como objetivo desenvolver um sistema gerenciador para o aplicativo. Este aplicativo é feito em parceria com o DAF da UnB, e tem como objetivo fornecer uma interface para que pessoas vinculadas a UnB possam relatar problemas no ambiente da UnB e assim ter esses relatos entregues aos departamentos responsáveis. O sistema gerenciador, dentro do projeto, visa fornecer uma interface para que se possa gerenciar o conteúdo do aplicativo.</p>


## 🐳 Guia de Uso do Docker

* ### Instalação
Primeiramente é necessário ter o docker instalado, caso não tenha acesse o [Instalação docker](https://docs.docker.com/engine/installation/linux/docker-ce/). Após feito isso, instale o [Docker-compose](https://docs.docker.com/compose/install/).

* ### Organização do projeto
O projeto é separado em diferentes pacotes, sendo que cada microserviço está separado em um container, sendo que todos os pacotes precisam do container "postgres" para funcionar corretamente. Os containers existentes atualmente são: resolution, user e postgres.

* ### Comandos básicos 

 &emsp;&emsp; Caso queira rodar todos os containers:

 ```terminal
  docker-compose up 
 ```
 &emsp;&emsp; Caso queira rodar os containers separadamente:

 ```terminal
  docker-compose up resolution
  docker-compose up user
  docker-compose up postgres
 ```


&emsp;&emsp; Caso entrar no bash no container (Ele tem que estar rodando):

 ```terminal
  docker-compose exec -it resolution1 /bin/bash #Necessário o nº1 depois
 ```

 &emsp;&emsp; Para parar um container:

  ```terminal
  docker-compose stop resolution1
 ```
 &emsp;&emsp; E para religar um container parado use o comando: 
 
 ```terminal
  docker-compose start resolution1
 ```

 &emsp;&emsp; Para listar os containers que estão em execução:
 
 ```terminal
  docker ps
 ```
 &emsp;&emsp; Para listar todos os containers já executados na sua máquina:
 
 ```terminal
  docker ps -a
 ```


### 👤 Equipe

<table>
    <tr>
        <td align="center"><a href="https://github.com/Guilherme-Aguiar"><img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/23269406?s=460&u=9f370da31c2c3b4ac576952c78e0d0467a4bc75e&v=4" width="100px;" alt=""/><br /><sub><b>Guilherme Aguiar</b></sub></a><br /><a href="https://github.com/Guilherme-Aguiar"></a></td>
        <td align="center"><a href="https://github.com/Mateusas3s"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/18116735?s=460&u=e7294b4b5d8ffe63d1a0ccc702947dcd98b56ada&v=4" width="100px;" alt=""/><br /><sub><b>Mateus Sousa</b></sub></a><br /><a href="https://github.com/Mateusas3s"></a></td>
        <td align="center"><a href="https://github.com/gabrielfilipe7unb"><img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/37154573?s=460&u=6f3a8f4aa83489a2cb1efe0eec06482de1fc04e0&v=4" width="100px;" alt=""/><br /><sub><b>Gabriel Filipe</b></sub></a><br /><a href="https://github.com/gabrielfilipe7unb"></a></td>
        <td align="center"><a href="https://github.com/brunocmo"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/43324383?s=400&u=8bf9fb89a5d27a8e90c5d4355459425d07a1a790&v=4" width="100px;" alt=""/><br /><sub><b>Bruno Carmo </b></sub></a><br /><a href="https://github.com/brunocmo"></a></td>
        <td align="center"><a href="https://github.com/ismaelg456g"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/29930270?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Hércules Ismael</b></sub></a><br /><a href="https://github.com/ismaelg456g"></a></td>
        <td align="center"><a href="https://github.com/julianavalle"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/62117139?s=460&u=da3e1ef77632f5737c862c7ec77e33a43664b00d&v=4" width="100px;" alt=""/><br /><sub><b>Juliana Pereira</b></sub></a><br /><a href="https://github.com/julianavalle"></a></td>
        <td align="center"><a href="https://github.com/Vitorsulzbach"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/37155586?s=460&u=a21082a58f847c9f3d79e0828d0b11bb3002d507&v=4" width="100px;" alt=""/><br /><sub><b>Vitor Sulzbach</b></sub></a><br /><a href="https://github.com/Vitorsulzbach"></a></td> 
        <td align="center"><a href="https://github.com/tomasvelos0"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/48571671?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Tomás Veloso</b></sub></a><br /><a href="https://github.com/tomasvelos0"></a></td> 
        <td align="center"><a href="https://github.com/ArielSixwings"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/38080649?s=460&u=7fefc33dbd3d6651b0cea984337a9d5809573463&v=4" width="100px;" alt=""/><br /><sub><b>ArielSixwings</b></sub></a><br /><a href="https://github.com/ArielSixwings"></a></td> 
    </tr>
</table>


