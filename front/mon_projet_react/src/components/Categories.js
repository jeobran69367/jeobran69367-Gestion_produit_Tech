import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setLoading, setError } from '../redux/slice';
import api from '../axios';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.api.categories);
  const loading = useSelector((state) => state.api.loading);
  const error = useSelector((state) => state.api.error);

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(setLoading(true));
      try {
        const response = await api.get('categories');
        dispatch(setCategories(response.data['hydra:member']));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCategories();
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {categories.map((categorie) => (
          <li key={categorie.id}>{categorie.nom}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
