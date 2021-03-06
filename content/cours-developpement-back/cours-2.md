---
part: 1
id: 2
title: Cours 2

---
### Les méthodes magiques (suite)

Pour vérifier si une méthode ou une méthode statique existe :

    Class MaClasse
    {
        public $public = 'Public';
        private $prive = 'Privé';
     
        // Cette méthode magique est appelé lorsqu'une méthode inexistante ou a laquelle on n'a pas accès est appelée
        public function __call($methode, $arguments)
        {
            var_dump($arguments);
            echo 'La méthode "' . $methode . '" n\'existe pas ou n\'est pas accessible. Les arguments étaient : ' . implode(' - ', $arguments);
        }
     
        // Cette méthode magique est appelé lorsqu'une méthode statique inexistante ou a laquelle on n'a pas accès est appelée
        static public function __callStatic($methode, $arguments)
        {
            echo 'La méthode "' . $methode . '" n\'existe pas ou n\'est pas accessible. Les arguments étaient : ' . implode(' - ', $arguments);
        }
    }
     
    $obj = new MaClasse();
    $obj->BlaBla("arg1", 23); // Affiche "La méthode "BlaBla" n'existe pas ou n'est pas accessible. Les arguments étaient : arg1 - 23"
    MaClasse::StaticBlaBla(1,2,'Test'); // Affiche "La méthode "StaticBlaBla" n'existe pas ou n'est pas accessible. Les arguments étaient : 1 - 2 - Test"

Méthode magique couramment utilisée __toString :

    class User
    {
        private string $firstname;
        private string $lastname;
     
        public function __toString(): string
        {
            return $this->getFirstname().' '.$this->getLastname();
        }
     
        public function getFirstname(): string
        {
            return ucfirst(strtolower($this->firstname));
        }
     
        public function setFirstname(string $firstname): void
        {
            $this->firstname = $firstname;
        }
     
        public function getLastname(): string
        {
            return strtoupper($this->lastname);
        }
     
        public function setLastname(string $lastname): void
        {
            $this->lastname = $lastname;
        }
    }
     
    $user = new User();
    $user->setFirstname('lilian');
    $user->setLastname('di rosa');
     
    // Sans méthode magique toString
    echo $user->getFirstname().' '.$user->getLastname(); // Affiche "Lilian DI ROSA"
     
    // Avec toString
    echo $user; // Affiche "Lilian DI ROSA"

Les deux méthodes magiques sont les plus importantes pour __toString et __construct

### Autoload

    <?php
    
    function loadClass($className)
    {
        require $className . '.php';
    }
    
    spl_autoload_register('loadClass');
    
    $obj = new MaClasse;

Ceci charge les classes. Et c'est optimisé car on ne charge pas une classe tant qu'elle n'est pas instanciée.

## L'héritage

Présentation du problème : on veut créer une classe par type de poste au foot. On veut donc leur donne un nom, un page, un poids... Mais aussi des caractéristiques propres à chaque poste. L'attaquant a une précision de tir, le défenseur a une caractéristiques au niveau de positionnement... En gros, ils ont des caractéristiques communes, mais aussi des différentes. C'est là que l'héritage intervient.

**Une classe fille ne peut pas avoir plusieurs classes mère, mais une classe mère peut avoir plusieurs classes filles.**

    <?php
     
    Class Mere
    {
        public string $public = 'Public';
        private string $prive = 'Privé';
     
        public function methode($arg)
        {
            echo $arg;
        }
    }
     
     
    Class Fille extends Mere
    {
        public string $fille;
     
        public function methodeFille()
        {
            echo $this->fille;
        }
    }
     
    $fille = new Fille();
     
    $fille->public = 'Public';
    echo $fille->public; // Affiche "Public"
    $fille->methode('Test de la méthode mere'); // Affiche "Test de la méthode mere"
     
    $fille->fille = 'Fille';
    $fille->methodeFille(); // Affiche "Fille"
     
    echo $fille->prive; // Erreur

### Surcharge de méthode

    <?php
     
    // Classe mère
    Class A
    {
        public int $attribut = 1;
     
        public function levelUp(): void
        {
            $this->attribut++;
        }
    }
     
    // Classe Fille
    Class B extends A
    {
        public int $test = 1;
     
        public function levelUp()
        {
            // Utilisation du mot clé parent. Ce mot clé permet d'appeler et d'éxécuter la méthode de la classe mère, ici la classe A
            parent::levelUp();
            $this->test++;
        }
    }
     
    $obj = new B();
    echo $obj->attribut; // Affiche "1"
    echo $obj->test; // Affiche "1"
     
    $obj->levelUp();
    echo $obj->attribut; // Affiche "2"
    echo $obj->test; // Affiche "2"

**Quand on réécrit une méthode dans notre classe enfant, elle doit être au minimum aussi permissive !**

### Visibilité protected

    Class Mere
    {
        public string $public = 'Public';
        protected string $protected = 'Protégé';
        private string $private = 'Privé';
     
        public function fonctionPublique()
        {
    	echo 'Fonction publique';
        }
     
        protected function fonctionProtegee()
        {
            echo 'Fonction protégée';
        }
     
        private function fonctionPrivee()
        {
            echo 'Fonction privée';
        }
    }
     
    Class Fille extends Mere
    {
        public function test()
        {
            echo $this->public; // Affiche "Public"
            echo $this->protected; // Affiche "Protégé"
            echo $this->private; // Une notice est lancée par PHP
     
            parent::fonctionPublique(); // Affiche "Fonction publique"
            parent::fonctionProtegee(); // Affiche "Fonction protégée"
            parent::fonctionPrivee(); // Erreur fatale !
        }
    }
     
    $fille = new Fille();
    $fille->test();
    echo $fille->public;
    $fille->fonctionPublique();
    echo $fille->protected; // Erreur fatale !
    $fille->fonctionProtegee(); // Erreur fatale !
    echo $fille->private; // Une notice est lancée par PHP
    $fille->fonctionPrivee(); // Erreur fatale !

### Abstraction

**Une classe abstraite ne peut pas être héritée.**

    <?php
     
    abstract class ClasseAbstraite
    {
     
    }
     
    class Fille extends ClasseAbstraite
    {
     
    }
     
    $fille = new Fille(); // Ok
    $abstraite = new ClasseAbstraite(); // Erreur fatale !
     
    abstract class Mere
    {
        abstract public function methode($arg);
    }
     
    class Fille2 extends Mere
    {
        public function methode($arg)
        {
            // instruction
        }
    }

Pour déclarer une méthode abstraite il faut la classe le soit. 