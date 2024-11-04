const express = require('express');
const app = express();
const porta = 3000;

app.use(express.urlencoded({ extended: true }));

var listaDisciplinas = [];


app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Menu Principal</title>
          <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <a class="navbar-brand" href="/">Sistema de Disciplinas</a>
              <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                          <a class="nav-link" href="/CadastroDisciplinas">Cadastrar Disciplina</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="/listagem-disciplinas">Listar Disciplinas</a>
                      </li>
                  </ul>
              </div>
          </nav>
          <div class="container mt-5">
              <h1>Bem-vindo ao Sistema de Gerenciamento de Disciplinas</h1>
              <p>Use o menu acima para navegar pelas opções.</p>
          </div>
      </body>
      </html>
    `);
});

app.get('/CadastroDisciplinas', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cadastro de Disciplina</title>
          <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <a class="navbar-brand" href="/">Sistema de Disciplinas</a>
              <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                          <a class="nav-link" href="/CadastroDisciplinas">Cadastrar Disciplina</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="/listagem-disciplinas">Listar Disciplinas</a>
                      </li>
                  </ul>
              </div>
          </nav>
          <div class="container py-5">
              <h2 class="mb-4">Cadastro de Disciplina</h2>
              <form action="/cadastrar-disciplina" method="POST">
                  <div class="form-group">
                      <label for="nomeDisciplina">Nome da disciplina</label>
                      <input type="text" class="form-control" id="nomeDisciplina" name="nomeDisciplina" required>
                  </div>
                  <div class="form-group">
                      <label for="codigo">Código da disciplina</label>
                      <input type="text" placeholder="1112223334" class="form-control" id="codigo" name="codigo" required>
                  </div>
                  <div class="form-group">
                      <label for="modalidade">Modalidade:</label>
                      <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" id="modalidadePresencial" value="presencial" name="modalidade" required>
                          <label class="form-check-label" for="modalidadePresencial">Presencial</label>
                      </div>
                      <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" id="modalidadeOnline" value="online" name="modalidade" required>
                          <label class="form-check-label" for="modalidadeOnline">Online</label>
                      </div>
                  </div>
                  <div class="form-group">
                      <label for="ementa">Ementa</label>
                      <input type="text" class="form-control" id="ementa" name="ementa">
                  </div>
                  <div class="form-group">
                      <label for="cargaHoraria">Carga Horária por semana</label>
                      <input type="number" class="form-control" id="cargaHoraria" name="cargaHoraria" required>
                  </div>
                  <div class="form-group">
                      <label for="telefoneProfessor">Telefone do professor</label>
                      <input type="tel" pattern="\\(\\d{2}\\)\\s\\d{5}-\\d{4}" title="(99) 99999-9999" class="form-control" id="telefoneProfessor" name="telefoneProfessor" required>
                  </div>
                  <div class="form-group">
                      <label for="emailProfessor">Email do professor</label>
                      <input type="email" placeholder="email@email.com.br" class="form-control" id="emailProfessor" name="emailProfessor" required>
                  </div>
                  <div class="form-group">
                      <label for="nomeProfessor">Nome do professor</label>
                      <input type="text" class="form-control" id="nomeProfessor" name="nomeProfessor"d required>
                  </div>
                  <div class="form-group">
                      <label for="bibliografiaRecomendada">Bibliografia recomendada</label>
                      <textarea id="bibliografiaRecomendada" class="form-control" rows="5" name="bibliografiaRecomendada"></textarea>
                  </div>
                  <div class="form-group mb-0">
                      <input type="submit" value="Enviar" class="btn btn-primary px-3">
                  </div>
              </form>
          </div>
      </body>
      </html>
    `);
});

app.post('/cadastrar-disciplina', (req, res) => {
    const novaDisciplina = {
        nomeDisciplina: req.body.nomeDisciplina,
        codigo: req.body.codigo,
        modalidade: req.body.modalidade,
        ementa: req.body.ementa,
        cargaHoraria: req.body.cargaHoraria,
        telefoneProfessor: req.body.telefoneProfessor,
        emailProfessor: req.body.emailProfessor,
        nomeProfessor: req.body.nomeProfessor,
        bibliografiaRecomendada: req.body.bibliografiaRecomendada,
    };

    listaDisciplinas.push(novaDisciplina);
    res.redirect('/listagem-disciplinas');
});

app.get('/listagem-disciplinas', (req, res) => {
    let listaHtml = `
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Listagem de Disciplinas</title>
          <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <a class="navbar-brand" href="/">Sistema de Disciplinas</a>
              <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                          <a class="nav-link" href="/CadastroDisciplinas">Cadastrar Disciplina</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="/listagem-disciplinas">Listar Disciplinas</a>
                      </li>
                  </ul>
              </div>
          </nav>
          <div class="container mt-5">
              <h2>Listagem de Disciplinas</h2><ul>`;

    listaDisciplinas.forEach((disciplina) => {
        listaHtml += `
            <li>
                <strong>Nome:</strong> ${disciplina.nomeDisciplina}<br>
                <strong>Código:</strong> ${disciplina.codigo}<br>
                <strong>Modalidade:</strong> ${disciplina.modalidade}<br>
                <strong>Ementa:</strong> ${disciplina.ementa}<br>
                <strong>Carga Horária:</strong> ${disciplina.cargaHoraria} horas/semana<br>
                <strong>Telefone Professor:</strong> ${disciplina.telefoneProfessor}<br>
                <strong>Email Professor:</strong> ${disciplina.emailProfessor}<br>
                <strong>Nome Professor:</strong> ${disciplina.nomeProfessor}<br>
                <strong>Bibliografia Recomendada:</strong> ${disciplina.bibliografiaRecomendada}<br><br>
            </li>`;
    });

    listaHtml += `</ul></div></body></html>`;
    res.send(listaHtml);
});

app.listen(porta, () => {
  console.log("Servidor está funcionando na porta " + porta);
});
