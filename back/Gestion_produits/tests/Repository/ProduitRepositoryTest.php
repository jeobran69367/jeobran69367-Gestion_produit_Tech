<?php

namespace App\Tests\Repository;

use App\Entity\Produit;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class ProduitRepositoryTest extends KernelTestCase
{
    public function testFindAll()
    {
        self::bootKernel();
        $container = self::getContainer();
        $repository = $container->get('doctrine')->getRepository(Produit::class);

        $produit = new Produit();
        $produit->setNom('Produit Test');
        $produit->setDescription('Description du produit');
        $produit->setPrix(100.0);

        $em = $container->get('doctrine')->getManager();
        $em->persist($produit);
        $em->flush();

        $produits = $repository->findAll();
        $this->assertGreaterThan(0, count($produits)); // Vérifie qu'il y a au moins un produit
    }
}
