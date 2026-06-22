<?php
require_once __DIR__ . '/config/functions.php';

$id = (int) ($_GET['id'] ?? 0);

$stmt = db()->prepare('SELECT id, nome, whatsapp FROM empresas WHERE id = :id LIMIT 1');
$stmt->execute([':id' => $id]);
$empresa = $stmt->fetch();

if (!$empresa) {
    redirect('index.php');
}

$insert = db()->prepare('INSERT INTO cliques (empresa_id, tipo) VALUES (:empresa_id, :tipo)');
$insert->execute([':empresa_id' => $empresa['id'], ':tipo' => 'whatsapp']);

redirect(whatsapp_url($empresa['whatsapp'], 'Ola! Vi sua empresa no Guia Comercial de SJL: ' . $empresa['nome']));
