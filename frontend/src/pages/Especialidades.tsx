import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import EspecialidadesList from '../components/Especialidades/EspecialidadesList';
import EspecialidadeForm from '../components/Especialidades/EspecialidadeForm';
import { Especialidade } from '../types';
import api from '../services/api';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function Especialidades() {
  const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEspecialidade, setEditingEspecialidade] = useState<Especialidade | null>(null);

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const fetchEspecialidades = async () => {
    try {
      setLoading(true);
      const response = await api.get('/especialidades');
      setEspecialidades(response.data);
    } catch (error) {
      console.error('Erro ao buscar especialidades:', error);
      alert('Erro ao carregar especialidades. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: { nome: string; ativo: boolean }) => {
    try {
        await api.post('/especialidades', data);
        alert('Especialidade criada com sucesso!');
        setShowForm(false);
        fetchEspecialidades();
    } catch (error: any) {
        console.error('Erro ao criar especialidade:', error);
        
        // Mensagem específica se for erro de duplicata
        if (error.response?.data?.message) {
        alert(error.response.data.message);
        } else {
        alert('Erro ao criar especialidade');
        }
    }
};

  const handleUpdate = async (data: { nome: string; ativo: boolean }) => {
    if (!editingEspecialidade) return;

    try {
      await api.patch(`/especialidades/${editingEspecialidade.id}`, data);
      alert('Especialidade atualizada com sucesso!');
      setShowForm(false);
      setEditingEspecialidade(null);
      fetchEspecialidades();
    } catch (error) {
      console.error('Erro ao atualizar especialidade:', error);
      alert('Erro ao atualizar especialidade');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta especialidade?')) {
      return;
    }

    try {
      await api.delete(`/especialidades/${id}`);
      alert('Especialidade excluída com sucesso!');
      fetchEspecialidades();
    } catch (error) {
      console.error('Erro ao excluir especialidade:', error);
      alert('Erro ao excluir especialidade');
    }
  };

  const handleEdit = (especialidade: Especialidade) => {
    setEditingEspecialidade(especialidade);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEspecialidade(null);
  };

  return (
    <div>
      <Header 
        title="Especialidades" 
        subtitle="Gerencie as especialidades médicas disponíveis"
      />
      
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Nova Especialidade
          </button>
        </div>

        {showForm && (
          <div className="mb-6 bg-white shadow sm:rounded-lg p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              {editingEspecialidade ? 'Editar Especialidade' : 'Nova Especialidade'}
            </h3>
            <EspecialidadeForm
              especialidade={editingEspecialidade}
              onSubmit={editingEspecialidade ? handleUpdate : handleCreate}
              onCancel={handleCancel}
            />
          </div>
        )}

        <div className="bg-white shadow sm:rounded-lg">
          <EspecialidadesList
            especialidades={especialidades}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}