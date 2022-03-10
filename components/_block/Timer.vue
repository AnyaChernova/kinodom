<template>
	<div class="_Timer d-inline">
		<template v-if="currentTime">
			<span v-if="days">{{ days }}:</span><span v-if="hours">{{ hours | formatTime }}:</span><span>{{ minutes |formatTime }}:{{ seconds |formatTime }}</span>
		</template>
	</div>
</template>

<script>
export default {
	name: "Timer",
	props: {
		deadline: {
			type: String,
			required: true,
		},
		speed: {
			type: Number,
			default: 1000,
		},
	},
	components: {},
	data() {
		return {
			currentTime: Date.parse(this.deadline) - Date.parse(new Date())
		}
	},
	computed: {
		seconds() {
			return Math.floor((this.currentTime / 1000) % 60);
		},
		minutes() {
			return Math.floor((this.currentTime / 1000 / 60) % 60);
		},
		hours() {
			return Math.floor((this.currentTime / (1000 * 60 * 60)) % 24);
		},
		days() {
			return Math.floor(this.currentTime / (1000 * 60 * 60 * 24));
		}
	},
	methods: {
		countdown() {
			this.currentTime = Date.parse(this.deadline) - Date.parse(new Date());
			if (this.currentTime > 0) {
				setTimeout(this.countdown, this.speed);
			} else {
				this.currentTime = null;
			}
		}
	},
	directives: {},
	filters: {
		formatTime(value) {
			if (value < 10) {
				return "0" + value;
			}
			return value;
		}
	},
	watch: {},
	mounted() {
		setTimeout(this.countdown, 1000);
	}
}
</script>


