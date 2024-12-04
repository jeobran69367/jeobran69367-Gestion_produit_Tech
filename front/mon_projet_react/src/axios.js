import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Produits = () => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://127.0.0.1:8000/api/produits')
      .then((response) => {
        setProduits(response.data); // Assurez-vous que la réponse est bien un tableau.
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des produits:', err);
        setError('Erreur lors de la récupération des produits.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Liste des Produits</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit, index) => (
            produit && (
              <tr key={index}>
                <td>{produit.nom || 'Nom non disponible'}</td>
                <td>{produit.description || 'Description non disponible'}</td>
                <td>{produit.prix || 'Prix non disponible'}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Produits;
