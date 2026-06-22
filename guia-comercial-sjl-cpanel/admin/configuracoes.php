<?php
require_once __DIR__ . '/auth.php';

$adminTitle = 'Configuracoes';
$message = '';
$config = app_config();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verify_csrf();

    $logo = upload_file('logo', $config['logo'] ?? '');
    $stmt = db()->prepare('UPDATE configuracoes SET titulo_site = :titulo_site, logo = :logo, telefone_contato = :telefone_contato, email = :email, redes_sociais = :redes_sociais, texto_rodape = :texto_rodape WHERE id = 1');
    $stmt->execute([
        ':titulo_site' => trim($_POST['titulo_site'] ?? ''),
        ':logo' => $logo,
        ':telefone_contato' => trim($_POST['telefone_contato'] ?? ''),
        ':email' => trim($_POST['email'] ?? ''),
        ':redes_sociais' => trim($_POST['redes_sociais'] ?? ''),
        ':texto_rodape' => trim($_POST['texto_rodape'] ?? ''),
    ]);

    $message = 'Configuracoes atualizadas com sucesso.';
    $config = app_config();
}

require __DIR__ . '/header.php';
?>
<?php if ($message): ?>
    <div class="mb-5 rounded-2xl bg-green-50 p-4 font-bold text-green-700"><?= h($message) ?></div>
<?php endif; ?>

<form method="post" enctype="multipart/form-data" class="grid gap-5 rounded-3xl bg-white p-6 shadow-sm">
    <input type="hidden" name="csrf_token" value="<?= h(csrf_token()) ?>">
    <label class="grid gap-2 text-sm font-bold">
        Titulo do site
        <input name="titulo_site" value="<?= h($config['titulo_site'] ?? '') ?>" class="rounded-2xl border border-slate-300 px-4 py-3">
    </label>
    <label class="grid gap-2 text-sm font-bold">
        Logo
        <input type="file" name="logo" accept="image/*" class="rounded-2xl border border-slate-300 px-4 py-3">
        <?php if (!empty($config['logo'])): ?>
            <span class="text-xs text-slate-500">Atual: <?= h($config['logo']) ?></span>
        <?php endif; ?>
    </label>
    <div class="grid gap-5 md:grid-cols-2">
        <label class="grid gap-2 text-sm font-bold">
            Telefone contato
            <input name="telefone_contato" value="<?= h($config['telefone_contato'] ?? '') ?>" class="rounded-2xl border border-slate-300 px-4 py-3">
        </label>
        <label class="grid gap-2 text-sm font-bold">
            Email
            <input name="email" value="<?= h($config['email'] ?? '') ?>" class="rounded-2xl border border-slate-300 px-4 py-3">
        </label>
    </div>
    <label class="grid gap-2 text-sm font-bold">
        Redes sociais (JSON ou texto)
        <textarea name="redes_sociais" rows="4" class="rounded-2xl border border-slate-300 px-4 py-3"><?= h($config['redes_sociais'] ?? '') ?></textarea>
    </label>
    <label class="grid gap-2 text-sm font-bold">
        Texto do rodape
        <textarea name="texto_rodape" rows="4" class="rounded-2xl border border-slate-300 px-4 py-3"><?= h($config['texto_rodape'] ?? '') ?></textarea>
    </label>
    <button class="rounded-2xl bg-blue-700 px-5 py-3 font-black text-white">Salvar configuracoes</button>
</form>
<?php require __DIR__ . '/footer.php'; ?>
