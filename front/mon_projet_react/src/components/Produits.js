import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProduits, setCategories, setLoading, setError } from '../redux/slice';
import api from '../axios';

const Produits = () => {
  const dispatch = useDispatch();
  const produits = useSelector((state) => state.api.produits) || [];
  const categories = useSelector((state) => state.api.categories) || [];
  const loading = useSelector((state) => state.api.loading);
  const error = useSelector((state) => state.api.error);

  const [newProduit, setNewProduit] = useState({
    nom: '',
    description: '',
    prix: '',
    categorie: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  // Récupération des produits et des catégories
  useEffect(() => {
    const fetchProduits = async () => {
      dispatch(setLoading(true));
      try {
        const response = await api.get('produits');
        dispatch(setProduits(response.data['hydra:member'] || []));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    const fetchCategories = async () => {
      dispatch(setLoading(true));
      try {
        const response = await api.get('categories');
        dispatch(setCategories(response.data['hydra:member'] || []));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProduits();
    fetchCategories();
  }, [dispatch]);

  // Ajout d'un produit
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await api.post('produits', {
        ...newProduit,
        prix: parseFloat(newProduit.prix),
        categorie: `/api/categories/${newProduit.categorie}`,
      });
      dispatch(setProduits([response.data, ...produits]));
      setNewProduit({ nom: '', description: '', prix: '', categorie: '' });
      setMessage('Produit ajouté avec succès !');
    } catch (err) {
      if (err.response?.data?.violations) {
        const violations = err.response.data.violations.map((v) => v.message).join(', ');
        dispatch(setError(`Erreur lors de la création du produit : ${violations}`));
      } else {
        dispatch(setError(err.response?.data?.detail || 'Erreur inconnue'));
      }
      console.error('Erreur lors de la création du produit :', err.response?.data);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Modification d'un produit
  const handleEdit = (produit) => {
    setNewProduit({
      id: produit.id,
      nom: produit.nom,
      description: produit.description,
      prix: produit.prix,
      categorie: produit.categorie?.id || '',
    });
    setIsEditing(true);
  };

  // Mise à jour d'un produit
  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await api.put(`produits/${newProduit.id}`, {
        ...newProduit,
        prix: parseFloat(newProduit.prix),
        categorie: `/api/categories/${newProduit.categorie}`,
      });
      const updatedProduits = produits.map((produit) =>
        produit.id === response.data.id ? response.data : produit
      );
      dispatch(setProduits(updatedProduits));
      setNewProduit({ nom: '', description: '', prix: '', categorie: '' });
      setIsEditing(false);
      setMessage('Produit mis à jour avec succès !');
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Suppression d'un produit
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');
    if (!confirmDelete) return;

    dispatch(setLoading(true));
    try {
      await api.delete(`produits/${id}`);
      dispatch(setProduits(produits.filter((produit) => produit.id !== id)));
      setMessage('Produit supprimé avec succès !');
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Modifier le Produit' : 'Gestion de produit'}</h2>
      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}

      <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={newProduit.nom}
          onChange={(e) => setNewProduit({ ...newProduit, nom: e.target.value })}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduit.description}
          onChange={(e) => setNewProduit({ ...newProduit, description: e.target.value })}
          className="input"
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={newProduit.prix}
          onChange={(e) => setNewProduit({ ...newProduit, prix: e.target.value })}
          className="input"
          required
        />
        <select
          value={newProduit.categorie}
          onChange={(e) => setNewProduit({ ...newProduit, categorie: e.target.value })}
          className="select"
          required
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.nom}
            </option>
          ))}
        </select>
        <button type="submit" className="btn">
          {isEditing ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Liste des Produits</h2>
      {loading && <p>Chargement...</p>}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit) => (
            <tr key={produit.id}>
              <td>{produit.nom}</td>
              <td>{produit.description}</td>
              <td>{produit.prix}</td>
              <td>{produit.categorie?.nom || 'Catégorie indisponible'}</td>
              <td>
                <button onClick={() => handleEdit(produit)} className="btn btn-warning">
                  Modifier
                </button>
                <button onClick={() => handleDelete(produit.id)} className="btn btn-danger">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Produits;
