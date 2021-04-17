<script>
	export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>My old friend</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-color: #0D0F12;
		color: #fff100;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media screen and (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>