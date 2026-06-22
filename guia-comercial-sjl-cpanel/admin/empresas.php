<?php
require_once __DIR__ . '/auth.php';

$adminTitle = 'Empresas';
$action = $_GET['action'] ?? 'listar';
$id = (int) ($_GET['id'] ?? 0);
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();
    $postAction = $_POST['action'] ?? '';

    if ($postAction === 'delete') {
        $stmt = db()->prepare('DELETE FROM empresas WHERE id = :id');
        $stmt->execute([':id' => (int) $_POST['id']]);
        redirect('empresas.php');
    }

    $currentImage = $_POST['imagem_atual'] ?? '';
    $image = upload_file('imagem_capa', $currentImage);
    $data = [
        ':nome' => trim($_POST['nome'] ?? ''),
        ':categoria' => trim($_POST['categoria'] ?? ''),
        ':whatsapp' => trim($_POST['whatsapp'] ?? ''),
        ':endereco' => trim($_POST['endereco'] ?? ''),
        ':bairro' => trim($_POST['bairro'] ?? ''),
        ':nota' => (float) ($_POST['nota'] ?? 5),
        ':imagem_capa' => $image,
        ':is_destaque' => isset($_POST['is_destaque']) ? 1 : 0,
    ];

    if ($postAction === 'create') {
        $stmt = db()->prepare('INSERT INTO empresas (nome, categoria, whatsapp, endereco, bairro, nota, imagem_capa, is_destaque) VALUES (:nome, :categoria, :whatsapp, :endereco, :bairro, :nota, :imagem_capa, :is_destaque)');
        $stmt->execute($data);
    }

    if ($postAction === 'update') {
        $data[':id'] = (int) $_POST['id'];
        $stmt = db()->prepare('UPDATE empresas SET nome = :nome, categoria = :categoria, whatsapp = :whatsapp, endereco = :endereco, bairro = :bairro, nota = :nota, imagem_capa = :imagem_capa, is_destaque = :is_destaque WHERE id = :id');
        $stmt->execute($data);
    }

    redirect('empresas.php');
}

$empresa = [
    'id' => 0,
    'nome' => '',
    'categoria' => '',
    'whatsapp' => '',
    'endereco' => '',
    'bairro' => '',
    'nota' => '5.0',
    'imagem_capa' => '',
    'is_destaque' => 0,
];

if ($action === 'editar' && $id > 0) {
    $stmt = db()->prepare('SELECT * FROM empresas WHERE id = :id LIMIT 1');
    $stmt->execute([':id' => $id]);
    $empresa = $stmt->fetch() ?: $empresa;
}

$showForm = in_array($action, ['novo', 'editar'], true);

if (!$showForm) {
    $stmt = db()->query('SELECT * FROM empresas ORDER BY is_destaque DESC, nome ASC');
    $empresas = $stmt->fetchAll();
}

require __DIR__ . '/header.php';
?>
<?php if ($showForm): ?>
    <form method="post" enctype="multipart/form-data" class="grid gap-5 rounded-3xl bg-white p-6 shadow-sm">
        <input type="hidden" name="csrf_token" value="<?= h(csrf_token()) ?>">
        <input type="hidden" name="action" value="<?= $action === 'novo' ? 'create' : 'update' ?>">
        <input type="hidden" name="id" value="<?= (int) $empresa['id'] ?>">
        <input type="hidden" name="imagem_atual" value="<?= h($empresa['imagem_capa']) ?>">
        <div class="grid gap-5 md:grid-cols-2">
            <label class="grid gap-2 text-sm font-bold">
                Nome
                <input required name="nome" value="<?= h($empresa['nome']) ?>" class="rounded-2xl border border-slate-300 px-4 py-3">
            </label>
            <label class="grid gap-2 text-sm font-bold">
                Categoria
                <input required name="categoria" value="<?= h($empresa['categoria']) ?>" class="rounded-2xl border border-slate-300 px-4 py-3">
            </label>
            <label class="grid gap-2 text-sm font-bold">
                WhatsApp
                <input name="whatsapp" value="<?= h($empresa['whatsapp']) ?>" class="rounded-2xl border border-slate-300 px-4 py-3">
            </label>
            <label class="grid gap-2 text-sm font-bold">
                Bairro
                <input name="bairro" value="<?= h($empresa['bairro']) ?>" class="rounded-2xl border border-slate-300 px-4 py-3">
            </label>
            <label class="grid gap-2 text-sm font-bold md:col-span-2">
                Endereco
                <input name="endereco" value="<?= h($empresa['endereco']) ?>" class="rounded-2xl border border-slate-300 px-4 py-3">
            </label>
            <label class="grid gap-2 text-sm font-bold">
                Nota
                <input type="number" min="0" max="5" step="0.1" name="nota" value="<?= h((string) $empresa['nota']) ?>" class="rounded-2xl border border-slate-300 px-4 py-3">
            </label>
            <label class="grid gap-2 text-sm font-bold">
                Imagem de capa
                <input type="file" name="imagem_capa" accept="image/*" class="rounded-2xl border border-slate-300 px-4 py-3">
            </label>
        </div>
        <label class="flex items-center gap-3 rounded-2xl bg-amber-50 p-4 text-sm font-black text-amber-800">
            <input type="checkbox" name="is_destaque" value="1" <?= (int) $empresa['is_destaque'] === 1 ? 'checked' : '' ?>>
            Marcar como destaque
        </label>
        <div class="flex flex-wrap gap-3">
            <button class="rounded-2xl bg-blue-700 px-5 py-3 font-black text-white">Salvar empresa</button>
            <a href="empresas.php" class="rounded-2xl bg-slate-200 px-5 py-3 font-bold text-slate-800">Cancelar</a>
        </div>
    </form>
<?php else: ?>
    <div class="mb-5">
        <a href="empresas.php?action=novo" class="rounded-2xl bg-blue-700 px-5 py-3 font-black text-white">Nova empresa</a>
    </div>
    <div class="overflow-x-auto rounded-3xl bg-white shadow-sm">
        <table class="w-full min-w-[900px] text-left text-sm">
            <thead class="bg-slate-950 text-white">
                <tr>
                    <th class="p-4">Empresa</th>
                    <th class="p-4">Categoria</th>
                    <th class="p-4">Bairro</th>
                    <th class="p-4">Nota</th>
                    <th class="p-4">Destaque</th>
                    <th class="p-4">Acoes</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($empresas as $item): ?>
                    <tr class="border-b border-slate-100">
                        <td class="p-4 font-bold"><?= h($item['nome']) ?></td>
                        <td class="p-4"><?= h($item['categoria']) ?></td>
                        <td class="p-4"><?= h($item['bairro']) ?></td>
                        <td class="p-4"><?= h((string) $item['nota']) ?></td>
                        <td class="p-4"><?= (int) $item['is_destaque'] === 1 ? 'Sim' : 'Nao' ?></td>
                        <td class="p-4">
                            <div class="flex gap-2">
                                <a href="empresas.php?action=editar&id=<?= (int) $item['id'] ?>" class="rounded-xl bg-slate-200 px-3 py-2 font-bold">Editar</a>
                                <form method="post" onsubmit="return confirm('Excluir esta empresa?')">
                                    <input type="hidden" name="csrf_token" value="<?= h(csrf_token()) ?>">
                                    <input type="hidden" name="action" value="delete">
                                    <input type="hidden" name="id" value="<?= (int) $item['id'] ?>">
                                    <button class="rounded-xl bg-red-600 px-3 py-2 font-bold text-white">Excluir</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
<?php endif; ?>
<?php require __DIR__ . '/footer.php'; ?>
