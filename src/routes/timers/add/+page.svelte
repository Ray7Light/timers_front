<script lang="ts">
	// TODO: Add redirect to /timers after adding a timer
	// TODO: Add confirm message
	import { enhance } from '$app/forms';

	import Button from '$lib/components/Button/Button.svelte';
	import Input from '$lib/components/Input/Input.svelte';

	// TODO: Figure out how to type this
	export let form: any;
</script>

<div class="container mx-auto mt-5 p-5 sm:w-1/2 xl:w-1/3">
	<div class="mb-2 text-center text-2xl">Add timer</div>
	<form method="POST" action="?/addTimer" novalidate use:enhance>
		<Input
			label="Name"
			name="name"
			required
			value={form?.name ?? ''}
			errorMessage={form?.errors?.name}
		/>
		<Input
			label="Duration"
			name="duration"
			type="number"
			required
			value={form?.duration ?? ''}
			errorMessage={form?.errors?.duration}
		/>
		<Button type="submit" variation="Primary">Add</Button>
	</form>
</div>
