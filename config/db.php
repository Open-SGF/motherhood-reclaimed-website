<?php
/**
 * Database Configuration
 *
 * All of your system's database connection settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/DbConfig.php.
 *
 * @see craft\config\DbConfig
 */

use craft\helpers\App;

preg_match('|mysql://([a-z0-9]*):([a-z0-9]*)@([^:]*):([0-9]*)/(.*)|i', getenv('DATABASE_URL'), $matches);

$user = $matches[1];
$password = $matches[2];
$server = $matches[3];
$port = $matches[4];
$database = $matches[5];

return [
    'dsn' => App::env('DB_DSN') ?: null,
    'driver' => App::env('DB_DRIVER'),
    'server' => App::env('DB_SERVER'),
    'port' => App::env('DB_PORT'),
    'database' => App::env('DB_DATABASE'),
    'user' => App::env('DB_USER'),
    'password' => App::env('DB_PASSWORD'),
    'schema' => App::env('DB_SCHEMA'),
    'tablePrefix' => App::env('DB_TABLE_PREFIX'),
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',
];
