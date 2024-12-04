<?php

namespace App\Tests\Entity;

use App\Entity\Produit;
use PHPUnit\Framework\TestCase;

class ProduitTest extends TestCase
{
    public function testProduitGettersAndSetters(): void
    {
        $produit = new Produit();
        $produit->setNom('Test Produit')
                ->setDescription('Ceci est un produit de test')
                ->setPrix(99.99);

        $this->assertSame('Test Produit', $produit->getNom());
        $this->assertSame('Ceci est un produit de test', $produit->getDescription());
        $this->assertSame(99.99, $produit->getPrix());
    }
}
