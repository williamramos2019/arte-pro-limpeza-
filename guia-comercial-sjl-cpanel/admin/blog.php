<?php
require_once __DIR__ . '/auth.php';

$adminTitle = 'Blog';
$action = $_GET['action'] ?? 'listar';
$id = (int) ($_GET['id'] ?? 0);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $postAction = $_POST['action'] ?? '';

    if ($postAction === 'delete') {
        $stmt = db()->prepare('DELETE FROM postagens WHERE id = :id');
        $stmt->execute([':id' => (int) $_POST['id']]);
        redirect('blog.php');
    }

    $titulo = trim($_POST['titulo'] ?? '');
    $slug = trim($_POST['slug'] ?? '');
    $slug = $slug !== '' ? slugify($slug) : slugify($titulo);
    $image = upload_file('imagem', $_POST['imagem_atual'] ?? '');
    $data = [
        ':titulo' => $titulo,
        ':slug' => $slug,
        ':conteudo' => trim($_POST['conteudo'] ?? ''),
        ':imagem' => $image,
        ':data_publicacao' => trim($_POST['data_publicacao'] ?? date('Y-m-d H:i:s')),
    ];

    if ($postAction === 'create') {
        $stmt = db()->prepare('INSERT INTO postagens (titulo, slug, conteudo, imagem, data_publicacao) VALUES (:titulo, :slug, :conteudo, :imagem, :data_publicacao)');
        $stmt->execute($data);
    }

    if ($postAction === 'update') {
        $data[':id'] = (int) $_POST['id'];
        $stmt = db()->prepare('UPDATE postagens SET titulo = :titulo, slug = :slug, conteudo = :conteudo, imagem = :imagem, data_publicacao = :data_publicacao WHERE id = :id');
        $stmt->execute($data);
    }

    redirect('blog.php');
}

$post = [
    'id' => 0,
    'titulo' => '',
    'slug' => '',
    'conteudo' => '',
    'imagem' => '',
    'data_publicacao' => date('Y-m-d H:i:s'),
];

if ($action === 'editar' && $id > 0) {
    $stmt = db()->prepare('SELECT * FROM postagens WHERE id = :id LIMIT 1');
    $stmt->execute([':id' => $id]);
    $post = $stmt->fetch() ?: $post;
}

$showForm = in_array($action, ['novo', 'editar'], true);

if (!$showForm) {
    $stmt = db()->query('SELECT * FROM postagens ORDER BY data_publicacao DESC');
    $posts = $stmt->fetchAll();
}

require __DIR__ . '/header.php';
?>
<?php if ($showForm): ?>
    <form method="post" enctype="multipart/form-data" class="grid gap-5 rounded-3xl bg-white p-6 shadow-sm">
        <input type="hidden" name="csrf_token" value="<?= h(csrf_token()) ?>">
        <input type="hidden" name="action" value="<?= $action === 'novo' ? 'create' : 'update' ?>">
        <input type="hidden" name="id" value="<?= (int) $post['id'] ?>">
        <input type="hidden" name="imagem_atual" value="<?= h($post['imagem']) ?>">
        <label class="grid gap-2 text-sm font-bold">
            Titulo
            <input required name="titulo" value="<?= h($post['titulo']) ?>" class="rounded-2xl border border-slate-300 px-4 py-3">
        </label>
        <label class="grid gap-2 text-sm font-bold">
            Slug
            <input name="slug" value="<?= h($post['slug']) ?>" class="rounded-2xl border border-slate-300 px-4 py-3" placeholder="gerado automaticamente se ficar vazio">
        </label>
        <label class="grid gap-2 text-sm font-bold">
            Conteudo HTML
            <textarea required name="conteudo" rows="10" class="rounded-2xl border border-slate-300 px-4 py-3"><?= h($post['conteudo']) ?></textarea>
        </label>
        <div class="grid gap-5 md:grid-cols-2">
            <label class="grid gap-2 text-sm font-bold">
                Imagem
                <input type="file" name="imagem" accept="image/*" class="rounded-2xl border border-slate-300 px-4 py-3">
            </label>
            <label class="grid gap-2 text-sm font-bold">
                Data publicacao
                <input name="data_publicacao" value="<?= h($post['data_publicacao']) ?>" class="rounded-2xl border border-slate-300 px-4 py-3">
            </label>
        </div>
        <div class="flex flex-wrap gap-3">
            <button class="rounded-2xl bg-blue-700 px-5 py-3 font-black text-white">Salvar postagem</button>
            <a href="blog.php" class="rounded-2xl bg-slate-200 px-5 py-3 font-bold text-slate-800">Cancelar</a>
        </div>
    </form>
<?php else: ?>
    <div class="mb-5">
        <a href="blog.php?action=novo" class="rounded-2xl bg-blue-700 px-5 py-3 font-black text-white">Nova postagem</a>
    </div>
    <div class="grid gap-4">
        <?php foreach ($posts as $item): ?>
            <article class="rounded-3xl bg-white p-5 shadow-sm">
                <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h3 class="text-lg font-black"><?= h($item['titulo']) ?></h3>
                        <p class="text-sm text-slate-500"><?= h($item['slug']) ?> - <?= date('d/m/Y H:i', strtotime($item['data_publicacao'])) ?></p>
                    </div>
                    <div class="flex gap-2">
                        <a href="blog.php?action=editar&id=<?= (int) $item['id'] ?>" class="rounded-xl bg-slate-200 px-3 py-2 font-bold">Editar</a>
                        <form method="post" onsubmit="return confirm('Excluir esta postagem?')">
                            <input type="hidden" name="csrf_token" value="<?= h(csrf_token()) ?>">
                            <input type="hidden" name="action" value="delete">
                            <input type="hidden" name="id" value="<?= (int) $item['id'] ?>">
                            <button class="rounded-xl bg-red-600 px-3 py-2 font-bold text-white">Excluir</button>
                        </form>
                    </div>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
<?php endif; ?>
<?php require __DIR__ . '/footer.php'; ?>
