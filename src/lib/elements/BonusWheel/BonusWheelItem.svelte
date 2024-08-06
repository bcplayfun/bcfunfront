<!-- <script lang="ts">
	import Button from '$lib/elements/Button';
	import api from '$lib/api';
	import { openModal } from '$lib/elements/Modal';
	import { onMount } from 'svelte';
	import Info from './Info.svelte';
	import BonusWheel from './BonusWheel.svelte';
	import Countdown from './Countdown.svelte';

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import duration from 'dayjs/plugin/duration.js';
	import vector from '../assets/vector.svg';

	dayjs.extend(utc);
	dayjs.extend(duration);

	let loading: boolean = false;
	let intervalTime: number = 60000;
	let tries: number = 0;
	type BonusWheelCountdown = {
		weekday: number;
		endDate: string;
	};
	let bonusWheelCountdown: BonusWheelCountdown;
	generateTime();
	onMount(async () => {
		getTries();
		setInterval(() => {
			generateTime();
		}, intervalTime);
	});
	async function getTries() {
		const { result, error } = await api.wheel.getSpins();
		if (!error) {
			tries = result;
		}
	}
	function generateTime() {
		let time = dayjs().utc();
		let date = time.get('date');
		let day = time.get('day');
		let daysToFri = 5 - (day < 5 ? day : day - 7);
		let friday = dayjs().set('date', date + daysToFri);
		let endOfFriday = friday
			.set('hour', 23)
			.set('minute', 59)
			.set('second', 59)
			.set('millisecond', 999)
			.format('YYYY-MM-DD HH:mm:ss');
		bonusWheelCountdown = {
			weekday: day,
			endDate: endOfFriday,
		};
	}
	function openWheel() {
		openModal(BonusWheel, 'Bonus Wheel', {
			tries: tries,
			cb: async () => {
				loading = true;
				getTries();
				loading = false;
			},
		});
	}
	function openInfo() {
		openModal(
			Info,
			'More Information',
			{},
			{
				type: 'new',
			},
		);
	}
</script>

<li class="ticket mb-4">
	<div class="header">
		<h2 class="title">Wheel of Fortune!</h2>
	</div>

	<div class="expiry-date">
		{#if bonusWheelCountdown?.weekday == 0 || bonusWheelCountdown?.weekday == 6}
			<div>Expire Date: Sunday 23:59</div>
		{:else}
			<Countdown
				from={bonusWheelCountdown?.endDate}
				dateFormat="YYYY-MM-DD HH:mm:ss"
				zone="utc"
				let:remaining
			>
				{#if !remaining.done}
					<div class="timer-wrap">
						<div class="timer">
							{#if !remaining.done}
								<span>
									{remaining.days == 7 ? 0 : remaining.days} Days :&nbsp;
								</span>
								<span>{remaining.hours} Hours :&nbsp;</span>
								<span>{remaining.minutes} Minutes</span>
							{/if}
						</div>
					</div>
				{/if}
			</Countdown>
		{/if}
	</div>

	<div class="description">
		Get an exclusive Bonus Wheel Spins for every $15 that you deposit and wager on weekends only
	</div>
	<div class="info">
		<div>
			<div class="bullet" />
			<div>
				<div class="text-xs">Min. Deposit</div>
				<div class="text-normal">$15</div>
			</div>
		</div>
		<div>
			<div class="bullet" />
			<div>
				<div class="text-xs">Wagering</div>
				<div class="text-normal">1x</div>
			</div>
		</div>

		{#if bonusWheelCountdown?.weekday == 0 || bonusWheelCountdown?.weekday == 6}
			<div>
				<div class="bullet" />
				<div>
					<div class="text-xs">Ticket Count</div>
					<div class="text-normal">{tries}</div>
				</div>
			</div>
		{/if}
	</div>

	<div class="bottom">
		{#if bonusWheelCountdown?.weekday == 0 || bonusWheelCountdown?.weekday == 6}
			<Button
				{loading}
				on:click={openWheel}>Spin the wheel</Button
			>
		{:else}
			<Button
				{loading}
				disabled={true}>Activate</Button
			>
		{/if}
		<div
			class="terms"
			on:click={openInfo}
			on:keydown={openInfo}
		>
			<div>Terms & Conditions</div>

			<img
				src={vector}
				alt="arrow"
			/>
		</div>
	</div>
</li>

<style lang="scss">
	.ticket {
		background-color: #1b1b1f;
		margin: 24px 0 0 0;
		padding: 15px 20px;
		border-radius: 15px;
		position: relative;

		.expiry-date {
			position: absolute;
			top: 0;
			right: 0;
			background-color: #e9e9e9;
			border-top-right-radius: 15px;
			border-bottom-left-radius: 15px;
			padding: 5px 14px;
			font-size: 14px;
			font-weight: 500;
			color: #161619;
		}

		@media (max-width: 992px) {
			margin: 15px auto;
			padding: 15px;
			&:first-child {
				margin: 10 0 30px;
			}
		}
	}
	.header {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		.title {
			color: #fdcf39;
			font-size: 20px;
			font-weight: 700;
			font-family: 'Inter';
			@media (max-width: 500px) {
				margin-top: 20px;
			}
		}
	}
	.description {
		color: rgba(255, 255, 255, 0.87);
		letter-spacing: 0.5px;
		font-size: 15px;
	}

	.info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 70%;

		@media (max-width: 600px) {
			width: 100%;
		}

		& > div {
			display: flex;
			gap: 10px;
		}

		.bullet {
			background-color: #fdcf39;
			width: 6px;
			height: 6px;
			border-radius: 50%;
			margin-top: 8px;
		}
		.text-xs {
			color: #b2b2bd;
			opacity: 0.7;
			font-size: 14px;
		}
	}
	.terms {
		font-family: 'Inter';
		font-weight: 700;
		color: #dedee3;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
		@media (max-width: 700px) {
			justify-content: flex-start;
			gap: 15px;
		}
		.terms {
			cursor: pointer;
		}
	}
</style> -->
