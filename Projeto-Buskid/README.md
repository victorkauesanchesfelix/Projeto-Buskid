Link do site: https://victorkauesanchesfelix.github.io/Projeto-Buskid/

Requisitos para rodar a parte do front-end:
    - Clonar o repositorio e abrir o link direto.

Requisitos para rodar a parte do backend via Visual Code Studio:
    - Insomnia para rodar API:
        Pastas:
            - Autenticação:
                - Login:
                    -POST:
                        - http://localhost:8081/api/auth/login
                    - Body: {
                                "email": "mariana@email.com",
                                "senha": "123456"
                            }
                    - Headers:
                        - Content-Type: application/json

            - Motorista e Aluno:
                - Desfazer Falta do Aluno:
                    - POST:
                        - http://localhost:8081/api/alunos/std_01/desfazer-falta
                    - Body:
                        - {}
                - Registrar Falta do Aluno:
                    - POST:
                        - http://localhost:8081/api/alunos/std_01/falta
                    - Body:
                        - {
                                "motivo": "Consulta Médica",
                                "turno": "Manhã"
                          }
                    - Headers:
                        - Content-Type: application/json

                - Atualizar Status do Aluno:
                    - PATCH:
                        - http://localhost:8081/api/alunos/std_01/status
                    - Body:
                        - {
                                "status": "EMBARCOU",
                                "horario": "07:14"
                          }
                    - Headers:
                        - Content-Type: application/json
                - Obter Dashboard Geral:
                    - GET:
                        - http://localhost:8081/api/dashboard

    - Java JDK version 17
    - Mavel
    - SQLite
        Extensões:
            - Extension Pack for Java (Microsoft)
            - Extension Pack for Java Auto Config (Pleiades)
            - Live Server (Ritwick Dey)
            - SQLite (Florian Klampfer)
            - XML (Red Hat)
                Comandos:
                    - Entrar na pasta buskid-backend, abrir o console e rodar o comando: mvn spring-boot:run