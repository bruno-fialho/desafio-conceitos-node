// Importa express, cors?, e uuid (universal unique id)
const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

// Declara express
const app = express();

// Permite que o express receba JSON
app.use(express.json());

// Usa o cors
app.use(cors());

// Declara array vazio (enquanto não trabalhar com banco de dado)
const repositories = [];

app.get("/repositories", (request, response) => {
  // Busca title no query
  const { title } = request.query;

  // Filtra ou não title do query
  const results = title
    ? repositories.filter(repository => repository.title.includes(title))
    : repositories;
  
  // Retorna todos os repositórios
  return response.json(results);
});

app.post("/repositories", (request, response) => {
  // Utiliza informações do body
  const { title, url, techs } = request.body;

  // Cria novo repositório
  const repository = { id: uuid(), title, url, techs, likes: 0 };

  // Add novo repositório
  repositories.push(repository);

  // Retorna novo repositório
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // Utiliza id dado nos params
  const { id } = request.params;

  // Utiliza informações do body
  const { title, url, techs } = request.body;

  // Busca index do repositório
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // Testa busca do index
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  // Cria novo repositório usando Sintaxe de Espelhamento para recuperar o número de likes
  const repository = {
    ...repositories[repositoryIndex],
    title,
    url,
    techs,
  };

  // Substitui repositório
  repositories[repositoryIndex] = repository;

  // Retorna novo repositório
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // Utiliza id dado nos params
  const { id } = request.params;
  
  // Busca index do repositório
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // Testa busca do index
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  // Deleta o repositório
  repositories.splice(repositoryIndex, 1);

  // Retorna sucesso
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // Utiliza id dado nos params
  const { id } = request.params;
  
  // Busca o repositório
  const repository = repositories.find(
    (repository) => repository.id === id
  );

  // Caso não encontre
  if (!repository) { 
  return response.status(400).json({ error: "Repository not found" });
  }

  // Altera o valor de likes somando mais 1
  repository.likes += 1; 

  return response.json(repository)
});

module.exports = app;
