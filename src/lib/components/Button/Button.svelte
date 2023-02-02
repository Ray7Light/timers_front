<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { HTMLButtonAttributes } from 'svelte/elements';

	enum Variation {
		Primary = 'Primary',
		Secondary = 'Secondary',
		Default = 'Default'
	}
	type VariationType = keyof typeof Variation;
	interface $$Props extends HTMLButtonAttributes {
		disabled?: boolean;
		variation?: VariationType;
	}

	const dispatch = createEventDispatcher();

	export let variation: VariationType = Variation.Default;
	let backgroundColor: string = '';

	switch (variation) {
		case Variation.Primary:
			backgroundColor = 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700';
			break;
		case Variation.Secondary:
			backgroundColor = 'bg-red-500 hover:bg-red-600 active:bg-red-700';
			break;
		default:
			backgroundColor = 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700';
			break;
	}
</script>

<button
	{...$$props}
	on:click={() => dispatch('click')}
	class="
    {backgroundColor}  
		transition-color rounded-md py-2 px-4 font-bold text-white
    outline-1 outline-offset-[-5px] outline-white duration-200 active:scale-95
		disabled:cursor-not-allowed disabled:opacity-50
  "
>
	<slot />
</button>
