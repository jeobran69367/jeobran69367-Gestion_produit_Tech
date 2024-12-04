<?php

namespace App\Repository;

use App\Entity\Produit;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\QueryBuilder;

/**
 * @extends ServiceEntityRepository<Produit>
 */
class ProduitRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Produit::class);
    }

    /**
     * Récupérer tous les produits
     * 
     * @return Produit[] Retourne un tableau de produits
     */
    public function findAllProduits(): array
    {
        return $this->findBy([]);
    }

    /**
     * Récupérer un produit par son ID
     * 
     * @param int $id
     * @return Produit|null Retourne un produit ou null si introuvable
     */
    public function findProduitById(int $id): ?Produit
    {
        return $this->find($id);
    }

    /**
     * Récupérer les produits par catégorie
     * 
     * @param int $categorieId
     * @return Produit[] Retourne un tableau de produits
     */
    public function findProduitsByCategorie(int $categorieId): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.categorie = :categorieId')
            ->setParameter('categorieId', $categorieId)
            ->getQuery()
            ->getResult();
    }

    /**
     * Sauvegarder un produit dans la base de données
     * 
     * @param Produit $produit
     */
    public function saveProduit(Produit $produit): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->persist($produit);
        $entityManager->flush();
    }

    /**
     * Supprimer un produit
     * 
     * @param Produit $produit
     */
    public function deleteProduit(Produit $produit): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->remove($produit);
        $entityManager->flush();
    }
}
