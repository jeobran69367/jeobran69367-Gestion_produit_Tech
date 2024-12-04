import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Produits = () => {
  // États pour gérer les produits, le chargement et les erreurs
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilisation de useEffect pour effectuer la requête API
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/produits') // URL de votre API Symfony
      .then((response) => {
        console.log('Données reçues :', response.data); // Vérifiez les données ici
        setProduits(response.data); // Stockez les données dans l'état
        setLoading(false); // Arrêtez le chargement
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des produits:', err);
        setError('Erreur lors de la récupération des produits.');
        setLoading(false); // Arrêtez le chargement même en cas d'erreur
      });
  }, []); // Le tableau vide [] signifie que cette fonction s'exécutera une seule fois au montage

  // Gestion des différents états (chargement, erreur, affichage des produits)
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  // Affichage de la liste des produits dans un tableau
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
            produit && ( // Vérification que le produit est bien défini
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
