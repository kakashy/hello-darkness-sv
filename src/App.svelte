<script>
	export let name;

	import Nav from './components/nav.svelte'
</script>

<main>
	<Nav/>
	<h1>Hello {name}!</h1>
	<p>My old friend</p>
</main>

<style>
	main {
		text-align: center;
		max-width: 240px;
		margin: 0;
		background-color: #0D0F12;
		color: #fffcc4;
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