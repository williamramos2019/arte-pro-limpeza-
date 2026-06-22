<?php
require_once __DIR__ . '/../config/functions.php';

if (!empty($_SESSION['admin_id'])) {
    redirect('index.php');
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();

    $login = trim($_POST['login'] ?? '');
    $senha = $_POST['senha'] ?? '';

    $stmt = db()->prepare('SELECT * FROM usuarios WHERE login = :login LIMIT 1');
    $stmt->execute([':login' => $login]);
    $user = $stmt->fetch();

    if ($user && password_verify($senha, $user['senha_hash'])) {
        session_regenerate_id(true);
        $_SESSION['admin_id'] = $user['id'];
        $_SESSION['admin_login'] = $user['login'];
        redirect('index.php');
    }

    $error = 'Login ou senha invalidos.';
}
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login Admin - Guia SJL</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="grid min-h-screen place-items-center bg-gradient-to-br from-slate-950 to-blue-800 px-4">
    <form method="post" class="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        <input type="hidden" name="csrf_token" value="<?= h(csrf_token()) ?>">
        <h1 class="text-3xl font-black">Painel Administrativo</h1>
        <p class="mt-2 text-sm text-slate-600">Acesse com o usuario seed: admin / admin123.</p>
        <?php if ($error): ?>
            <div class="mt-5 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700"><?= h($error) ?></div>
        <?php endif; ?>
        <label class="mt-6 grid gap-2 text-sm font-bold">
            Login
            <input name="login" required class="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600">
        </label>
        <label class="mt-4 grid gap-2 text-sm font-bold">
            Senha
            <input type="password" name="senha" required class="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600">
        </label>
        <button class="mt-6 w-full rounded-2xl bg-blue-700 px-4 py-3 font-black text-white hover:bg-blue-800">Entrar</button>
    </form>
</body>
</html>
