<?php

declare(strict_types=1);

// Edite estes dados depois de criar o banco e o usuario no cPanel.
define('DB_HOST', 'localhost');
define('DB_NAME', 'guia_sjl');
define('DB_USER', 'ubuntu');
define('DB_PASS', 'ubuntu');
define('DB_CHARSET', 'utf8mb4');

function db(): PDO
{
    static $pdo = null;

    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (PDOException $exception) {
        http_response_code(500);
        exit('Erro ao conectar ao banco de dados. Confira config/db.php.');
    }

    return $pdo;
}
