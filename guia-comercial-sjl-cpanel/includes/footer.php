<?php $config = app_config(); ?>
<footer class="mt-16 border-t border-slate-200 bg-white">
    <div class="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
            <h2 class="text-lg font-black"><?= h($config['titulo_site'] ?? 'Guia Comercial SJL') ?></h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">
                <?= h($config['texto_rodape'] ?? 'Encontre empresas, servicos e oportunidades em Sao Jose da Lapa.') ?>
            </p>
        </div>
        <div class="text-sm text-slate-600">
            <h3 class="font-bold text-slate-900">Contato</h3>
            <p class="mt-2"><?= h($config['telefone_contato'] ?? '') ?></p>
            <p><?= h($config['email'] ?? '') ?></p>
        </div>
        <div class="text-sm text-slate-600">
            <h3 class="font-bold text-slate-900">Links rapidos</h3>
            <div class="mt-2 flex flex-col gap-1">
                <a class="hover:text-brand" href="index.php">Guia de empresas</a>
                <a class="hover:text-brand" href="blog.php">Blog local</a>
                <a class="hover:text-brand" href="admin/login.php">Acesso administrativo</a>
            </div>
        </div>
    </div>
    <div class="border-t border-slate-100 px-4 py-4 text-center text-xs font-semibold text-slate-500">
        &copy; <?= date('Y') ?> Guia Comercial de Sao Jose da Lapa. Todos os direitos reservados.
    </div>
</footer>
</body>
</html>
