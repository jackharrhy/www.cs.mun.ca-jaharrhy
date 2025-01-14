<link rel="stylesheet" href="term.css">

<?php
$ldap_server = "ldap://lyman.cs.mun.ca";
$ldap_dn = "ou=CSMath,dc=mun,dc=ca";
$ldap_user = "jaharrhy";

$ldap_connection = ldap_connect($ldap_server);

if (!$ldap_connection) {
    die("Could not connect to LDAP server.");
}

ldap_set_option($ldap_connection, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ldap_connection, LDAP_OPT_REFERRALS, 0);

if (!ldap_start_tls($ldap_connection)) {
    die("Failed to start TLS: " . ldap_error($ldap_connection));
}

$bind = ldap_bind($ldap_connection);

if (!$bind) {
    die("LDAP anonymous bind failed: " . ldap_error($ldap_connection));
}

$search_filter = "(uid=$ldap_user)";

$result = ldap_search($ldap_connection, $ldap_dn, $search_filter);

if (!$result) {
    die("LDAP search failed: " . ldap_error($ldap_connection));
}

// Fetch and display user info
$entries = ldap_get_entries($ldap_connection, $result);
if ($entries["count"] > 0) {
    $jack = $entries[0];

    $uid = $jack["uid"][0];
    $homedir = $jack["homedirectory"][0];
    $shell = $jack["loginshell"][0];

    echo "<pre>";
    echo "uid: $uid\n";
    echo "homedir: $homedir\n";
    echo "shell: $shell\n";
    echo "</pre>";
} else {
    echo "User '$ldap_user' not found.";
}

ldap_unbind($ldap_connection);
?>
