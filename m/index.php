<?
$vid = "WAWES feat GUYON WATON - DUMES (Official Video) [RSWPTbP2uik].mp3";
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <iframe src="<? echo $vid; ?>" frameborder="0"></iframe>
    <pre><? echo shell_exec("exiftool \"$vid\""); ?></pre>
</body>
</html>