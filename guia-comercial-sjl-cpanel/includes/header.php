<?php
$config = app_config();
$siteTitle = $config['titulo_site'] ?? 'Guia Comercial SJL';
$pageTitle = isset($pageTitle) ? $pageTitle . ' - ' . $siteTitle : $siteTitle;
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= h($pageTitle) ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: '#1d4ed8',
                        accent: '#f97316',
                        ink: '#0f172a'
                    }
                }
            }
        };
    </script>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
<header class="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <a href="index.php" class="flex items-center gap-3">
            <?php if (!empty($config['logo'])): ?>
                <img src="<?= h($config['logo']) ?>" alt="<?= h($siteTitle) ?>" class="h-12 w-12 rounded-2xl object-cover">
            <?php else: ?>
                <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-xl font-black text-white">SJL</span>
            <?php endif; ?>
            <span>
                <span class="block text-lg font-black tracking-tight"><?= h($siteTitle) ?></span>
                <span class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Guia Comercial</span>
            </span>
        </a>
        <nav class="hidden items-center gap-5 text-sm font-bold text-slate-600 md:flex">
            <a href="index.php" class="hover:text-brand">Empresas</a>
            <a href="blog.php" class="hover:text-brand">Blog</a>
            <a href="admin/login.php" class="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-brand">Painel</a>
        </nav>
    </div>
</header>
