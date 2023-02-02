<script lang="ts">
	// TODO: Focus trap
	// TODO: Animations
	// TODO: Change colors
	// TODO: Add size options
	// TODO: Close button in svelte component
	// TODO: Custom title and content <slot/>
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	import Button from '$lib/components/Button/Button.svelte';

	export let isOpen: boolean;

	const dispatch = createEventDispatcher();
	const modalBackdropId = 'modalBackdrop';
	const modalContainerId = 'modalContainer';
	let modalBackdrop = `<div id=${modalBackdropId} class='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>`;

	$: if (isOpen) {
		openModal();
	} else {
		closeModal();
	}

	onDestroy(() => {
		if (isOpen) {
			removeBackdrop();
		}
	});

	function dispatchConfirm() {
		dispatch('confirm');
	}

	function dispatchClose() {
		dispatch('close');
	}

	function closeOnEscape(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			dispatchClose();
		}
	}

	function closeOnOutsideClick(e: MouseEvent | TouchEvent) {
		let target = e.target as HTMLElement;

		if (target.id === modalContainerId) {
			dispatchClose();
		}
	}

	function closeModal() {
		if (!browser) return;

		removeBackdrop();
		document.removeEventListener('keydown', closeOnEscape);
		document.removeEventListener('click', closeOnOutsideClick);
	}

	function openModal() {
		document.body.insertAdjacentHTML('beforeend', modalBackdrop);
		document.addEventListener('keydown', closeOnEscape);
		document.addEventListener('click', closeOnOutsideClick);
	}

	function removeBackdrop() {
		document.getElementById(modalBackdropId)?.remove();
	}
</script>

<!-- Main modal -->
<div
	id={modalContainerId}
	tabindex="-1"
	aria-hidden={isOpen}
	aria-modal="true"
	role="dialog"
	class="fixed top-0 left-0 right-0 z-50 {isOpen ||
		'hidden'} flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain p-4 md:inset-0"
>
	<div class="relative w-full max-w-2xl md:h-auto">
		<!-- Modal content -->
		<div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
			<!-- Modal header -->
			<div class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white">Terms of Service</h3>
				<button
					type="button"
					class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 
           hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
					on:click={dispatchClose}
				>
					<svg
						aria-hidden="true"
						class="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
					<span class="sr-only">Close modal</span>
				</button>
			</div>
			<!-- Modal body -->
			<div class="space-y-6 p-6">
				<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
					With less than a month to go before the European Union enacts new consumer privacy laws
					for its citizens, companies around the world are updating their terms of service
					agreements to comply.
				</p>
				<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
					The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May
					25 and is meant to ensure a common set of data rights in the European Union. It requires
					organizations to notify users as soon as possible of high-risk data breaches that could
					personally affect them.
				</p>
			</div>
			<!-- Modal footer -->
			<div
				class="flex flex-row-reverse items-center gap-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600"
			>
				<Button type="button" variation="Primary" on:click={dispatchConfirm}>I accept</Button>
				<Button type="button" variation="Secondary" on:click={dispatchClose}>Decline</Button>
			</div>
		</div>
	</div>
</div>
