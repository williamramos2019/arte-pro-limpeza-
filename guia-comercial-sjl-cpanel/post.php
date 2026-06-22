<?php
require_once __DIR__ . '/config/functions.php';

$slug = trim($_GET['slug'] ?? '');
$stmt = db()->prepare('SELECT * FROM postagens WHERE slug = :slug LIMIT 1');
$stmt->execute([':slug' => $slug]);
$post = $stmt->fetch();

if (!$post) {
    http_response_code(404);
    $pageTitle = 'Post nao encontrado';
    require __DIR__ . '/includes/header.php';
    echo '<main class="mx-auto max-w-3xl px-4 py-16"><h1 class="text-3xl font-black">Post nao encontrado</h1><a class="mt-6 inline-flex rounded-2xl bg-brand px-5 py-3 font-bold text-white" href="blog.php">Voltar ao blog</a></main>';
    require __DIR__ . '/includes/footer.php';
    exit;
}

$pageTitle = $post['titulo'];
require __DIR__ . '/includes/header.php';
?>
<main class="mx-auto max-w-4xl px-4 py-12">
    <article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-10">
        <p class="text-xs font-black uppercase tracking-[0.25em] text-brand"><?= date('d/m/Y', strtotime($post['data_publicacao'])) ?></p>
        <h1 class="mt-4 text-4xl font-black tracking-tight text-slate-950"><?= h($post['titulo']) ?></h1>
        <div class="prose prose-slate mt-8 max-w-none leading-7 text-slate-700">
            <?= $post['conteudo'] ?>
        </div>
    </article>
</main>
<?php require __DIR__ . '/includes/footer.php'; ?>
