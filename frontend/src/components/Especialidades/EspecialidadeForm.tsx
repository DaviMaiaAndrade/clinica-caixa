import React, { useState, useEffect } from 'react';
import { Especialidade } from '../../types';

interface EspecialidadeFormProps {
  especialidade?: Especialidade | null;
  onSubmit: (data: { nome: string; ativo: boolean }) => void;
  onCancel: () => void;
}

export default function EspecialidadeForm({ 
  especialidade, 
  onSubmit, 
  onCancel 
}: EspecialidadeFormProps) {
  const [nome, setNome] = useState('');
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    if (especialidade) {
      setNome(especialidade.nome);
      setAtivo(especialidade.ativo);
    } else {
      setNome('');
      setAtivo(true);
    }
  }, [especialidade]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, ativo });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome da Especialidade
        </label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 border"
          placeholder="Ex: Cardiologia"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="ativo"
          checked={ativo}
          onChange={(e) => setAtivo(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900">
          Especialidade ativa
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {especialidade ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
}