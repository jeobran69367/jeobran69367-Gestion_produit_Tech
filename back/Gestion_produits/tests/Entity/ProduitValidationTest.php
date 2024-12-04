<?php

namespace App\Tests\Entity;

use App\Entity\Produit;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class ProduitValidationTest extends KernelTestCase
{
    public function testValidationProduitNom()
    {
        self::bootKernel();
        $validator = self::getContainer()->get('validator');

        $produit = new Produit();
        $produit->setNom('');
        $produit->setDescription('Description valide');
        $produit->setPrix(50.0);

        $violations = $validator->validate($produit);
        $this->assertCount(1, $violations); // Le nom est obligatoire
    }

    public function testValidationProduitPrix()
    {
        self::bootKernel();
        $validator = self::getContainer()->get('validator');

        $produit = new Produit();
        $produit->setNom('Produit valide');
        $produit->setDescription('Description valide');
        $produit->setPrix(-10.0); // Prix négatif

        $violations = $validator->validate($produit);
        $this->assertCount(1, $violations); // Prix doit être positif
    }
}
