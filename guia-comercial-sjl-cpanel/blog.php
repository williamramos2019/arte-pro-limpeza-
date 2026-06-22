<?php
require_once __DIR__ . '/config/functions.php';

$pageTitle = 'Blog';
$stmt = db()->query('SELECT id, titulo, slug, conteudo, imagem, data_publicacao FROM postagens ORDER BY data_publicacao DESC');
$posts = $stmt->fetchAll();

require __DIR__ . '/includes/header.php';
?>
<main class="mx-auto max-w-7xl px-4 py-12">
    <div class="rounded-[2rem] bg-gradient-to-br from-slate-950 to-brand p-8 text-white">
        <p class="text-sm font-black uppercase tracking-[0.25em] text-blue-100">Blog SJL</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight">Noticias, dicas e oportunidades locais</h1>
        <p class="mt-3 max-w-2xl text-blue-100">Conteudos para moradores, empresas e visitantes de Sao Jose da Lapa.</p>
    </div>

    <div class="mt-10 grid gap-6 md:grid-cols-3">
        <?php foreach ($posts as $post): ?>
            <article class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div class="mb-4 flex h-36 items-center justify-center rounded-2xl bg-slate-100 text-3xl font-black text-brand">
                    BLOG
                </div>
                <p class="text-xs font-bold uppercase tracking-widest text-slate-500"><?= date('d/m/Y', strtotime($post['data_publicacao'])) ?></p>
                <h2 class="mt-2 text-xl font-black"><?= h($post['titulo']) ?></h2>
                <p class="mt-3 line-clamp-3 text-sm leading-6 text-slate-600"><?= h(strip_tags($post['conteudo'])) ?></p>
                <a href="post.php?slug=<?= urlencode($post['slug']) ?>" class="mt-5 inline-flex rounded-2xl bg-brand px-4 py-3 text-sm font-black text-white">Ler artigo</a>
            </article>
        <?php endforeach; ?>
    </div>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
