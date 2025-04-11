<!-- src/lib/components/MembersContainer.svelte -->
<script>
	import TeamMember from './TeamMember.svelte';
	import members from '$lib/data/members.json';
</script>

<div class="article variant" id="team">
    <h3 style="text-align: center;">Team Members</h3>
    <ul class="members">
        {#each members as member}
            <TeamMember name={member.name} gitUser={member.gitUser} avatar={member.avatar} />
        {/each}
    </ul>
</div>

