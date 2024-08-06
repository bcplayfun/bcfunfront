<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let size: 'normal' | 'small' = 'normal';
	export let type: 'primary' | 'secondary' = 'primary';
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('click');
	}
</script>

<button
	on:click={onClick}
	class="{size} {type}"
	{disabled}
>
	<slot />
</button>

<style lang="scss">
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 41px;
		min-height: 41px;
		border-radius: 50%;
		background-color: #2f2f37;
		transition: all 0.5s;
		&:hover {
			background-color: #42424d;
		}
		&:active {
			background-color: #42424d;
		}
		&:disabled {
			background-color: #1c1c21;
		}

		&.small {
			min-width: 36px;
			min-height: 36px;
		}

		&.secondary {
			background-color: transparent;
			color: white;
			border: 1px solid #9c9cab;
			&:hover {
				background-color: #dedee3;
				:global(svg path) {
					fill: black !important;
					stroke: black !important;
				}
			}
			&:hover {
				background-color: #dedee3;
			}
			&:disabled {
				background-color: #bdbdc733;
				color: #42424c;
			}
		}
	}
</style>
