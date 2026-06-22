# Guia Comercial Completo de SJL

Sistema PHP + MySQL pronto para hospedagem cPanel, com Tailwind CSS via CDN.

## Instalar no cPanel

1. Crie um banco MySQL e um usuario no cPanel.
2. Importe `database.sql` pelo phpMyAdmin.
3. Edite `config/db.php` com host, banco, usuario e senha.
4. Compacte o conteudo desta pasta e envie para `public_html`.
5. Acesse `/admin/login.php`.

## Acesso inicial

- Login: `admin`
- Senha: `admin123`

Altere a senha no banco ou crie um novo hash com `password_hash()` em PHP depois do primeiro deploy.
