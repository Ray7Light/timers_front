<script lang="ts">
	// TODO: Animations
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { focusTrap } from 'svelte-focus-trap';

	import Button from '$lib/components/Button/Button.svelte';
	import CloseBtn from '$lib/components/CloseBtn/CloseBtn.svelte';

	enum Size {
		Small = 'Small',
		Medium = 'Medium',
		Default = 'Default',
		Large = 'Large'
	}
	type SizeType = keyof typeof Size;

	export let isOpen: boolean;
	export let title: string = '';
	export let size: SizeType = Size.Default;

	const dispatch = createEventDispatcher();
	const modalBackdropId = 'modalBackdrop';
	const modalContainerId = 'modalContainer';
	let modalBackdrop = `<div id=${modalBackdropId} class='bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'></div>`;
	let maxWidth: string = '';

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

	switch (size) {
		case Size.Small:
			maxWidth = 'max-w-md';
			break;
		case Size.Medium:
			maxWidth = 'max-w-lg';
			break;
		case Size.Default:
			maxWidth = 'max-w-xl';
			break;
		case Size.Large:
			maxWidth = 'max-w-2xl';
			break;
		default:
			maxWidth = 'max-w-xl';
	}

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

<div
	use:focusTrap
	id={modalContainerId}
	tabindex="-1"
	aria-hidden={isOpen}
	aria-modal="true"
	role="dialog"
	class="fixed top-0 left-0 right-0 z-50 {isOpen ||
		'hidden'} flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden overscroll-contain p-4 md:inset-0"
>
	<div class="relative w-full {maxWidth} md:h-auto">
		<div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
			<div class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
				<h3 class="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
				<CloseBtn title="Close modal" on:click={dispatchClose} />
			</div>
			<div class="p-6">
				<slot />
			</div>
			<div
				class="flex flex-row-reverse items-center gap-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600"
			>
				<Button type="button" variation="Primary" on:click={dispatchConfirm}>I accept</Button>
				<Button type="button" variation="Secondary" on:click={dispatchClose}>Decline</Button>
			</div>
		</div>
	</div>
</div>
