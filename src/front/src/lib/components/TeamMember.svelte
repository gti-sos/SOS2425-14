<script>
	export let name;
	export let gitUser;
	export let avatar;
</script>

<li class="member" on:click={() => window.open(`https://github.com/${gitUser}`, '_blank')}>
	<img src={avatar} alt={`Avatar de ${gitUser}`} />
	<h4>{name}</h4>
	<i>{gitUser}</i>
</li>
