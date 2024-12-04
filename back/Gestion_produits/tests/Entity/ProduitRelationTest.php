<?php

namespace App\Tests\Entity;

use App\Entity\Produit;
use App\Entity\Categorie;
use PHPUnit\Framework\TestCase;

class ProduitRelationTest extends TestCase
{
    public function testProduitWithCategorie()
    {
        $categorie = new Categorie();
        $categorie->setNom('Catégorie Test');

        $produit = new Produit();
        $produit->setNom('Produit avec Catégorie');
        $produit->setCategorie($categorie);

        $this->assertEquals($categorie, $produit->getCategorie());
        $this->assertEquals('Catégorie Test', $produit->getCategorie()->getNom());
    }
}
