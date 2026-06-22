<?php

declare(strict_types=1);

require_once __DIR__ . '/db.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function h(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function redirect(string $path): void
{
    header('Location: ' . $path);
    exit;
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_token'];
}

function verify_csrf(): void
{
    $token = $_POST['csrf_token'] ?? '';
    if (!hash_equals($_SESSION['csrf_token'] ?? '', $token)) {
        http_response_code(403);
        exit('Token de seguranca invalido.');
    }
}

function require_admin(): void
{
    if (empty($_SESSION['admin_id'])) {
        redirect('login.php');
    }
}

function app_config(): array
{
    $stmt = db()->query('SELECT * FROM configuracoes WHERE id = 1 LIMIT 1');
    $config = $stmt->fetch();

    return $config ?: [
        'titulo_site' => 'Guia Comercial SJL',
        'logo' => '',
        'telefone_contato' => '',
        'email' => '',
        'redes_sociais' => '{}',
        'texto_rodape' => '',
    ];
}

function categories(): array
{
    $stmt = db()->query('SELECT DISTINCT categoria FROM empresas ORDER BY categoria ASC');
    return $stmt->fetchAll();
}

function slugify(string $text): string
{
    $text = iconv('UTF-8', 'ASCII//TRANSLIT', $text);
    $text = preg_replace('/[^a-zA-Z0-9]+/', '-', (string) $text);
    $text = trim((string) $text, '-');
    $text = strtolower($text);

    return $text !== '' ? $text : 'postagem-' . time();
}

function upload_file(string $field, string $current = ''): string
{
    if (empty($_FILES[$field]['name']) || ($_FILES[$field]['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        return $current;
    }

    $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
    $tmpName = $_FILES[$field]['tmp_name'];
    $mime = mime_content_type($tmpName);

    if (!isset($allowed[$mime])) {
        return $current;
    }

    $fileName = uniqid('img_', true) . '.' . $allowed[$mime];
    $destination = __DIR__ . '/../uploads/' . $fileName;

    if (move_uploaded_file($tmpName, $destination)) {
        return 'uploads/' . $fileName;
    }

    return $current;
}

function whatsapp_url(?string $number, string $message = ''): string
{
    $clean = preg_replace('/\D+/', '', (string) $number);
    return 'https://wa.me/' . $clean . ($message !== '' ? '?text=' . urlencode($message) : '');
}
