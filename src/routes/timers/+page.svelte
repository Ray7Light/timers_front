<script lang="ts">
	// TODO: Add deleted timer name to delete confirm modal 
	import type { ActionResult } from '@sveltejs/kit';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';

	import Button from '$lib/components/Button/Button.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';

	export let data: PageData;

	let deleteConfirmOpen = false;
	let removeEvent: SubmitEvent | null = null;

	async function deleteTimer() {
		if (!removeEvent) {
			return;
		}

		const form = removeEvent.target as HTMLFormElement;
		const data = new FormData(form);

		const response = await fetch(form.action, {
			method: form.method,
			body: data
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<Modal
	isOpen={deleteConfirmOpen}
	title="Delete?"
	size="Small"
	on:confirm={() => {
		deleteConfirmOpen = false;
		deleteTimer();
	}}
	on:close={() => {
		deleteConfirmOpen = false;
		removeEvent = null;
	}}
>
	<div>Are you sure, you want to delete this timer?</div>
</Modal>

<h1 class="text-3xl font-bold underline">Timers</h1>
<a href="/timers/add">Add</a>

{#if data.timers.length}
	<ul>
		{#each data.timers as timer}
			<li>
				<form
					method="POST"
					action="?/deleteTimer"
					on:submit|preventDefault={(event) => {
						deleteConfirmOpen = true;
						removeEvent = event;
					}}
				>
					<input type="hidden" name="id" value={timer.id} />
					<a href="/timers/{timer.id}">{timer.name}</a>
					<Button variation="Secondary">Delete</Button>
				</form>
			</li>
		{/each}
	</ul>
{:else}
	<p>No timers</p>
{/if}
