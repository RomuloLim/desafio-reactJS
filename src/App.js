import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

// useEffect => carregar dados
// useState => salvar dados
function App() {

  // CARREGANDO DADOS DA API
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'App-show-de-bola-rs',
      url: 'https://github.com/romuloLim/App-show-de-bola-rs',
      techs: ['Node', 'ReactJS', 'React Native']
    })

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => (
                  <li key={repository.title}>
                  { repository.title }
        
                  <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                  </button>
                </li>
        )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
