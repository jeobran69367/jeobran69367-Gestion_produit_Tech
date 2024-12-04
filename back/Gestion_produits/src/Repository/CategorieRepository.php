<?php

namespace App\Repository;

use App\Entity\Categorie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Categorie>
 */
class CategorieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Categorie::class);
    }

    /**
     * Récupérer toutes les catégories
     * 
     * @return Categorie[] Retourne un tableau de catégories
     */
    public function findAllCategories(): array
    {
        return $this->findBy([]);
    }

    /**
     * Récupérer une catégorie par son ID
     * 
     * @param int $id
     * @return Categorie|null Retourne une catégorie ou null si introuvable
     */
    public function findCategorieById(int $id): ?Categorie
    {
        return $this->find($id);
    }

    /**
     * Sauvegarder une catégorie dans la base de données
     * 
     * @param Categorie $categorie
     */
    public function saveCategorie(Categorie $categorie): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->persist($categorie);
        $entityManager->flush();
    }

    /**
     * Supprimer une catégorie
     * 
     * @param Categorie $categorie
     */
    public function deleteCategorie(Categorie $categorie): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->remove($categorie);
        $entityManager->flush();
    }
}
