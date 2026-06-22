<?php
require_once __DIR__ . '/../config/functions.php';

$_SESSION = [];
session_destroy();
redirect('login.php');
