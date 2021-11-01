# Migrating Motherhood Reclaimed to Heroku Dyno Hosting

-   Create a heroku account for openSGF.
-   Link the heroku account to the openSGF github account for automatic deploys on push to main.
-   Clone the Motherhood Reclaimed repo locally to my fresh install of MacOS.
-   I am currenty running PHP7.4, MySQL 8.0.27, Node 14.18.1, NPM 6.14.15,and Composer 2.1.10
-   I run `composer install` without issue.
-   I run `npm install` without issue.
-   I copy .env.example to .env.
-   I run `php craft setup` and punch in the site and database information.
-   I run `php craft migrate/all` and `php craft project-config/apply` with no issue or changes, where it is fresh from github.
-   I run `npm run watch` in one terminal tab.
-   I run `php craft serve 0.0.0.0:8000` in another.
-   I am now seeing a version of the motherhood reclaimed website served locally. It has no content in it.
-   I punch in a ton of dummy content into the CMS admin portal, and it seems to be served perfectly.

-   I now wish to edit ./config/db.php to link it to mySQL locally and JawsDB remotely eventually.
-   Per my previous experimenting, I want to add to it the following:

    ```preg_match('|mysql://([a-z0-9]*):([a-z0-9]*)@([^:]*):([0-9]*)/(.*)|i', getenv('DATABASE_URL'), $matches);

        $user = $matches[1];
        $password = $matches[2];
        $server = $matches[3];
        $port = $matches[4];
        $database = $matches[5];

        return [
        'driver' => "mysql",
        'server' => $server,
        'user' => $user,
        'password' => $password,
        'database' => $database,
        'schema' => getenv('DB_SCHEMA'),
        'tablePrefix' => getenv('DB_TABLE_PREFIX'),
        'port' => $port
        ];
    ```

-   I can see a version of this already exists there though, likely added for the previous FortRabbit hosting.
-   I overwrite what needs to be overwritten and leave the rest:

    ```
    preg_match('|mysql://([a-z0-9]*):([a-z0-9]*)@([^:]*):([0-9]*)/(.*)|i', getenv('DATABASE_URL'), $matches);

    $user = $matches[1];
    $password = $matches[2];
    $server = $matches[3];
    $port = $matches[4];
    $database = $matches[5];

    return [
        'dsn' => App::env('DB_DSN') ?: null,
        'driver' => "mysql",
        'server' => $server,
        'port' => $port,
        'database' => $database,
        'user' => $user,
        'password' => $password,
        'schema' => getenv('DB_SCHEMA'),
        'tablePrefix' => getenv('DB_TABLE_PREFIX'),
        'charset' => 'utf8',
        'collation' => 'utf8_unicode_ci',
    ];
    ```

-   I add the following to the end of my .env file: `DATABASE_URL="mysql://root:@localhost:3306/herokuDB"`
-   This is to allow my code in db.php to function locally as well.
-   I create a Procfile in my project root and add to it `web: vendor/bin/heroku-php-apache2 web`
-   I add the following buildpacks in the heroku.com settings: NodeJS, PHP
-   I add the following variables to the config variables settings in heroku.com.
    ```
    ENVIRONMENT="dev"
    SECURITY_KEY="${craftSecurityKey}"
    DB_SCHEMA="public"
    ```
-   I add `"ext-imagick": "*",` to my composer-json required section in anticipation of that craft requirement.

-   I run `heroku create`
-   I run `heroku git:remote -a motherhood-reclaimed`
-   My personal github account does not seem to have the permission to do what it needs to do to the repo.
-   This only affects the method I previously used to push the data up to JawsDB
-   The Heroku CLI is therefore unnecessary, and I will need to push the data up another way.

-   I run `mysqldump -h 127.0.0.1 -u root -p herokuDB > backup.sql` without issue.
-   I think the next step is to find JawsDB's instructions for uploading the database
-   I download Sequel Pro to connect to the remote JawsDB database. I was not able to connect.
-   I run `mysql -h NEWHOST -u NEWUSER -pNEWPASS NEWDATABASE < backup.sql` with my JawsDB credentials.
-   It completes quietly, so I assume it was a success. I'll retry sequel pro to verify the upload.
-   Sequel Pro crashes for the second try on attempt. I'll try VSCode
-   I successfully connected to this database with VSCode. I do not see the local database I tried to upload though.
-   I will continue hoping that craft can work with the database that is there for now.
-   I assume this step will be revisited once the client data is ready to be uploaded.

-   I push my changes in Procfile, composer.json, and config/db.php up to main to attempt the first build.
-   Heroku is now presenting me with a craft error code page.

-   I edit config/db.php to change `DATABASE_URL` to `JAWSDB_URL`
-   I add the following to the script section of my composer.json
    ```
    "post-install-cmd": [
    "npm install",
    "npm mix"
    ]
    ```
-   I push these changes up to github.
-   The Heroku build fails.
-   This is because I do not have php imagick locally, so I could not update the composer.lock
-   I install php imagick locally and run `composer update` without issue.
-   I push this change up to github.
-   The heroku build makes it through the Node initialization and the PHP initialization, but fails in the post-load composer scripts.
-   I change the scripts in question to:
    ```
    "post-install-cmd": [
      "npm install",
      "npm run mix --production"
      ]
    ```
-   I push this change up.
-   This script does not success either. I get the error code "missing script: mix". Running this command locally would have told me this.
-   I update the script in question to `npm run production`.
-   The motherhood reclaimed site is now successfully served by Heroku.

TODO:

-   Set up an S3 Bucket to store assets.
-   Upload client data to JawsDB.
-   Link motherhoodreclaimed.org to Heroku

-   Info for the AWS S3 Bucket, needed for craft to interact with S3.
-   I now have the client data to import.

-   I add the S3 Craft Pluging from Pixel and Tonic to craft.
-   I created a test S3 Bucket and linked it to craft but it fails to communicate.
-   I will wait to get the MoRec S3 Base Url from Levi to continue on this.

-   I updated the .env variables to point at AWS
