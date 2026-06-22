<?php
$adminTitle = $adminTitle ?? 'Painel Administrativo';
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= h($adminTitle) ?> - Admin SJL</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 text-slate-900">
<div class="min-h-screen md:flex">
    <aside class="bg-slate-950 p-5 text-white md:w-72">
        <h1 class="text-xl font-black">Admin Guia SJL</h1>
        <nav class="mt-8 grid gap-2 text-sm font-bold">
            <a class="rounded-2xl px-4 py-3 hover:bg-white/10" href="index.php">Dashboard</a>
            <a class="rounded-2xl px-4 py-3 hover:bg-white/10" href="configuracoes.php">Configuracoes</a>
            <a class="rounded-2xl px-4 py-3 hover:bg-white/10" href="empresas.php">Empresas</a>
            <a class="rounded-2xl px-4 py-3 hover:bg-white/10" href="blog.php">Blog</a>
            <a class="rounded-2xl px-4 py-3 hover:bg-white/10" href="../index.php" target="_blank">Ver site</a>
            <a class="rounded-2xl bg-red-600 px-4 py-3 hover:bg-red-700" href="logout.php">Sair</a>
        </nav>
    </aside>
    <main class="flex-1 p-4 md:p-8">
        <div class="mb-6">
            <p class="text-sm font-bold uppercase tracking-widest text-slate-500">Painel de Controle</p>
            <h2 class="text-3xl font-black"><?= h($adminTitle) ?></h2>
        </div>
