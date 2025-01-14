<link rel="stylesheet" href="term.css">

<?php
$files = glob("*.php");
echo "<pre>\n";
foreach($files as $file) {
    if ($file !== "index.php") {
        echo "<a href=\"$file\">$file</a>\n";
    }
}
echo "</pre>";
?>
