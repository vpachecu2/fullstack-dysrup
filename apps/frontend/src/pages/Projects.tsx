import { useEffect, useState } from 'react';
import { api } from '../api/axios';

export function Projects() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    api.get('/projects').then((res) => setProjects(res.data));
  }, []);

  return (
    <div>
      <h1>Projetos</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
