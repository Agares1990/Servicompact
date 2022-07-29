<?php
function domain_exists($mail, $record = 'MX'){
    list($user, $domain) = explode('@', $mail);
    return checkdnsrr($domain, $record);
}
?>
