<?php
require_once __DIR__ . '/config/functions.php';

$pageTitle = 'Empresas';
$search = trim($_GET['busca'] ?? '');
$category = trim($_GET['categoria'] ?? '');
$params = [];
$where = ["nome <> 'Auto Limpeza Pro'"];

if ($search !== '') {
    $where[] = '(nome LIKE :busca_nome OR categoria LIKE :busca_categoria OR bairro LIKE :busca_bairro OR endereco LIKE :busca_endereco)';
    $likeSearch = '%' . $search . '%';
    $params[':busca_nome'] = $likeSearch;
    $params[':busca_categoria'] = $likeSearch;
    $params[':busca_bairro'] = $likeSearch;
    $params[':busca_endereco'] = $likeSearch;
}

if ($category !== '') {
    $where[] = 'categoria = :categoria';
    $params[':categoria'] = $category;
}

$premiumStmt = db()->prepare("SELECT * FROM empresas WHERE nome = 'Auto Limpeza Pro' AND is_destaque = 1 LIMIT 1");
$premiumStmt->execute();
$premium = $premiumStmt->fetch();

$sql = 'SELECT * FROM empresas WHERE ' . implode(' AND ', $where) . ' ORDER BY is_destaque DESC, nota DESC, nome ASC';
$stmt = db()->prepare($sql);
$stmt->execute($params);
$empresas = $stmt->fetchAll();
$categorias = categories();
$resultCount = count($empresas);
$resultLabel = $resultCount === 1 ? 'resultado encontrado' : 'resultados encontrados';

require __DIR__ . '/includes/header.php';
?>
<main>
    <section class="bg-gradient-to-br from-brand via-blue-700 to-slate-950 text-white">
        <div class="mx-auto max-w-7xl px-4 py-14 md:py-20">
            <span class="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em]">Sao Jose da Lapa</span>
            <h1 class="mt-5 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">Guia Comercial Completo de SJL</h1>
            <p class="mt-5 max-w-2xl text-lg text-blue-100">Encontre empresas, servicos, ofertas e noticias locais em um portal moderno feito para a comunidade.</p>
            <form class="mt-8 grid gap-3 rounded-3xl bg-white p-3 shadow-2xl md:grid-cols-[1fr_220px_auto]" method="get">
                <input name="busca" value="<?= h($search) ?>" class="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-brand" placeholder="Buscar por empresa, bairro ou servico">
                <select name="categoria" class="rounded-2xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-brand">
                    <option value="">Todas categorias</option>
                    <?php foreach ($categorias as $item): ?>
                        <option value="<?= h($item['categoria']) ?>" <?= $category === $item['categoria'] ? 'selected' : '' ?>><?= h($item['categoria']) ?></option>
                    <?php endforeach; ?>
                </select>
                <button class="rounded-2xl bg-accent px-6 py-3 font-black text-white">Filtrar</button>
            </form>
        </div>
    </section>

    <?php if ($premium): ?>
        <section class="mx-auto -mt-8 max-w-7xl px-4">
            <div class="relative overflow-hidden rounded-[2rem] border-4 border-amber-300 bg-white p-6 shadow-2xl">
                <div class="absolute right-5 top-5 rounded-full bg-amber-300 px-4 py-2 text-xs font-black uppercase tracking-widest text-amber-950">Parceiro Master</div>
                <div class="grid gap-6 md:grid-cols-[220px_1fr_auto] md:items-center">
                    <div class="flex h-40 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-900 to-brand text-5xl font-black text-white">
                        ALP
                    </div>
                    <div>
                        <p class="text-sm font-black uppercase tracking-[0.25em] text-amber-600">Destaque Premium</p>
                        <h2 class="mt-2 text-3xl font-black text-slate-950"><?= h($premium['nome']) ?></h2>
                        <p class="mt-3 text-slate-600">Servico premium de limpeza automotiva em SJL, com atendimento rapido e qualidade para carros, motos e frotas.</p>
                        <div class="mt-4 flex flex-wrap gap-2 text-sm font-bold">
                            <span class="rounded-full bg-blue-50 px-3 py-1 text-brand"><?= h($premium['categoria']) ?></span>
                            <span class="rounded-full bg-slate-100 px-3 py-1 text-slate-700"><?= h($premium['bairro']) ?></span>
                            <span class="rounded-full bg-amber-100 px-3 py-1 text-amber-700">Nota <?= h((string) $premium['nota']) ?></span>
                        </div>
                    </div>
                    <a href="click.php?id=<?= (int) $premium['id'] ?>" class="rounded-2xl bg-green-600 px-6 py-4 text-center font-black text-white shadow-lg hover:bg-green-700">Chamar no WhatsApp</a>
                </div>
            </div>
        </section>
    <?php endif; ?>

    <section class="mx-auto max-w-7xl px-4 py-12">
        <div class="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <div>
                <h2 class="text-2xl font-black">Empresas cadastradas</h2>
                <p class="text-sm text-slate-600"><?= $resultCount ?> <?= h($resultLabel) ?></p>
            </div>
            <a href="blog.php" class="font-bold text-brand hover:underline">Ver novidades no Blog</a>
        </div>

        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <?php foreach ($empresas as $empresa): ?>
                <article class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div class="flex h-36 items-center justify-center bg-gradient-to-br from-slate-200 to-blue-100 text-3xl font-black text-brand">
                        <?= h(substr($empresa['nome'], 0, 2)) ?>
                    </div>
                    <div class="p-5">
                        <div class="flex items-start justify-between gap-3">
                            <div>
                                <h3 class="text-lg font-black"><?= h($empresa['nome']) ?></h3>
                                <p class="mt-1 text-sm text-slate-600"><?= h($empresa['endereco']) ?></p>
                            </div>
                            <span class="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-700"><?= h((string) $empresa['nota']) ?></span>
                        </div>
                        <div class="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                            <span class="rounded-full bg-blue-50 px-3 py-1 text-brand"><?= h($empresa['categoria']) ?></span>
                            <span class="rounded-full bg-slate-100 px-3 py-1 text-slate-600"><?= h($empresa['bairro']) ?></span>
                        </div>
                        <a href="click.php?id=<?= (int) $empresa['id'] ?>" class="mt-5 block rounded-2xl bg-green-600 px-4 py-3 text-center text-sm font-black text-white hover:bg-green-700">WhatsApp</a>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </section>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
