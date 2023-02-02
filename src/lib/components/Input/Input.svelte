<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		label: string;
		errorMessage?: string;
	}

	export let label: string = '';
	export let errorMessage: string = '';

	const dispatch = createEventDispatcher();
</script>

<div class="relative">
	<label for={$$props.name} class="block text-sm font-medium text-gray-700">
		{label}
		{#if $$props.required}
			<span class="text-red-500">*</span>
		{/if}
	</label>
	<input
		{...$$props}
		on:change={() => dispatch('change')}
		class="
      {$$props.class || ''}
			{errorMessage ? 'border-red-500 focus:border-red-500' : ''} 
      form-input mt-1 block w-full rounded-md border border-gray-300 px-3 
      py-2 leading-5 shadow-sm transition duration-150 ease-in-out focus:border-sky-500 focus:shadow-md
			focus:outline-none sm:text-sm sm:leading-5
    "
	/>
	{#if errorMessage}
		<p class="mt-1 mb-1 text-sm text-red-500">{errorMessage}</p>
	{:else}
		<div class="mb-7" />
	{/if}
</div>
