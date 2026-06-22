<?php
require_once __DIR__ . '/auth.php';

$adminTitle = 'Dashboard';
$totalEmpresas = (int) db()->query('SELECT COUNT(*) FROM empresas')->fetchColumn();
$totalPosts = (int) db()->query('SELECT COUNT(*) FROM postagens')->fetchColumn();
$totalCliques = (int) db()->query('SELECT COUNT(*) FROM cliques')->fetchColumn();
$cliquesHoje = (int) db()->query("SELECT COUNT(*) FROM cliques WHERE DATE(data_click) = CURDATE()")->fetchColumn();

require __DIR__ . '/header.php';
?>
<div class="grid gap-5 md:grid-cols-4">
    <div class="rounded-3xl bg-white p-6 shadow-sm">
        <p class="text-sm font-bold text-slate-500">Empresas</p>
        <strong class="mt-2 block text-4xl font-black"><?= $totalEmpresas ?></strong>
    </div>
    <div class="rounded-3xl bg-white p-6 shadow-sm">
        <p class="text-sm font-bold text-slate-500">Postagens</p>
        <strong class="mt-2 block text-4xl font-black"><?= $totalPosts ?></strong>
    </div>
    <div class="rounded-3xl bg-white p-6 shadow-sm">
        <p class="text-sm font-bold text-slate-500">Cliques totais</p>
        <strong class="mt-2 block text-4xl font-black"><?= $totalCliques ?></strong>
    </div>
    <div class="rounded-3xl bg-white p-6 shadow-sm">
        <p class="text-sm font-bold text-slate-500">Cliques hoje</p>
        <strong class="mt-2 block text-4xl font-black"><?= $cliquesHoje ?></strong>
    </div>
</div>

<section class="mt-8 rounded-3xl bg-white p-6 shadow-sm">
    <h3 class="text-xl font-black">Atalhos</h3>
    <div class="mt-5 flex flex-wrap gap-3">
        <a href="empresas.php?action=novo" class="rounded-2xl bg-blue-700 px-5 py-3 font-bold text-white">Nova empresa</a>
        <a href="blog.php?action=novo" class="rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white">Nova postagem</a>
        <a href="configuracoes.php" class="rounded-2xl bg-slate-200 px-5 py-3 font-bold text-slate-800">Editar configuracoes</a>
    </div>
</section>
<?php require __DIR__ . '/footer.php'; ?>
