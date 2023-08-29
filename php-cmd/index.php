<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shell</title>
    <style>
        body {
            margin: 0;
            padding: 0;
        }
        .buttons {
            width: 100%;
            font-size: 10px;
            display: flex;
        }
        .outer-box {
            margin: 2rem;
        }
        .inner-box {
            width: 100%;
            background-color: black;
            color: white;
        }
        #output {
            background-color: black;
            color: white;
        }
    </style>
</head>
<body>
    <form action="/" method="POST" style="margin: 2rem;" id="shell-data">
        <div class="buttons">
            <input type="button" name="prompt" id="prompt" value="#" style="width: 5%;" readonly>
            <input type="text" name="command" id="command" style="width: 80%;" placeholder="yum --help">
            <input type="submit" name="go" value="go" style="width: 15%;">
        </div>
    </form>
    <div class="outer-box">
        <div class="inner-box">
            <textarea name="output" id="output" style="width: 100%;height: 80%;padding: 1em" readonly>...</textarea>
        </div>
    </div>

    <script>
        const shellData = document.getElementById("shell-data");
        const go = shellData.go;
        const command = shellData.command;
        const output = document.getElementById("output");

        shellData.onsubmit = function (e) {
            e.preventDefault();
        }

        const formData = new FormData();

        go.onclick = function () {
            formData.append("command", command.value);
            output.value = "Load info ...";
            fetch("/cmd.php", {
                method: "post",
                body: formData
            }).then(async res => {
                const data = await res.text();

                output.value = data;
            }).catch(e => {
                output.value = e;
            });
            formData.delete("command");
        }
    </script>
</body>
</html>