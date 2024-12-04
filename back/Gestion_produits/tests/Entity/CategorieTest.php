<?php

namespace App\Tests\Entity;

use App\Entity\Categorie;
use PHPUnit\Framework\TestCase;

class CategorieTest extends TestCase
{
    public function testCategorieSettersAndGetters()
    {
        $categorie = new Categorie();

        $categorie->setNom('Test Catégorie');

        $this->assertEquals('Test Catégorie', $categorie->getNom());
    }
}
