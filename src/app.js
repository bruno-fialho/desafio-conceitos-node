<<<<<<< HEAD
// Importa express, cors?, e uuid (universal unique id)
const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

// Declara express
const app = express();

// Permite que o express receba JSON
app.use(express.json());

// Usa o cors - Conecta o front-end se conecte com o back-end
app.use(cors());

// Declara array vazio (enquanto não trabalhar com banco de dado)
const repositories = [];

// List
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

// Create
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

// Update
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

// Delete
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

// Increase Likes
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
=======
// Import express, cors?, uuid (new version)
const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// Declare express
const app = express();

// Allow json to express
app.use(express.json());

// Use cores - Connect front-end with back-end
app.use(cors());

// Declare empty array (provisory)
const repositories = [];

// List repositories
app.get("/repositories", (request, response) => {
  // Get title from query
  const { title } = request.query;

  // Filter title from query (if title exists)
  const results = title
    ? repositories.filter(repository => repository.title.includes(title))
    : repositories;
  
  // Return all repositories
  return response.json(results);
});

// Create repository
app.post("/repositories", (request, response) => {
  // Get info in the body
  const { title, url, techs } = request.body;

  // Create new repository
  const repository = { id: uuid(), title, url, techs, likes: 0 };

  // Add new repository to repositories array
  repositories.push(repository);

  // Retorn only new repository
  return response.json(repository);
});

// Update repository
app.put("/repositories/:id", (request, response) => {
  // Get id from params
  const { id } = request.params;

  // Get info in the body
  const { title, url, techs } = request.body;

  // Search index of given id on repositories array
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // Check if id was found
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  // Create new repository with Spread Syntax
  const repository = {
    ...repositories[repositoryIndex],
    title,
    url,
    techs,
  };

  // Replace repository
  repositories[repositoryIndex] = repository;

  // Retorn new repository
  return response.json(repository);
});

// Delete repository
app.delete("/repositories/:id", (request, response) => {
  // Get id from params
  const { id } = request.params;
  
  // Search index of given id on repositories array
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // Check if id was found
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  // Delete repository
  repositories.splice(repositoryIndex, 1);

  // Retorn success
  return response.status(204).send();
});

// Increase Likes
app.post("/repositories/:id/like", (request, response) => {
  // Get id from params
  const { id } = request.params;
  
  // Search repository
  const repository = repositories.find(
    (repository) => repository.id === id
  );

  // Check if repository was found
  if (!repository) { 
  return response.status(400).json({ error: "Repository not found" });
  }

  // Add one like to repository
  repository.likes += 1; 

  // Retorn new repository
  return response.json(repository)
});

module.exports = app;
>>>>>>> 10431ebe159832ceca81cc04ffc4fde7de80caa4
