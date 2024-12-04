import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setLoading, setError } from '../redux/slice';
import api from '../axios';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.api.categories) || []; // Ajout de || [] pour éviter les erreurs si categories est undefined
  const loading = useSelector((state) => state.api.loading);
  const error = useSelector((state) => state.api.error);

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(setLoading(true));
      try {
        const response = await api.get('categories');
        dispatch(setCategories(response.data['hydra:member'] || [])); // Ajout de || [] pour gérer les cas où hydra:member est manquant
      } catch (err) {
        dispatch(setError(err.response?.data?.detail || 'Une erreur est survenue lors du chargement des catégories.'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCategories();
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Liste des Catégories</h2>
      {loading && <p>Chargement des catégories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && categories.length === 0 && (
        <p className="text-gray-500">Aucune catégorie trouvée.</p>
      )}
      <ul className="list-disc list-inside bg-white shadow p-4 rounded">
        {categories.map((categorie) => (
          <li key={categorie.id} className="text-blue-600 mb-2">
            {categorie.nom || 'Nom indisponible'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
