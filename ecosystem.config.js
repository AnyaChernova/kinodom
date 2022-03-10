module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [
		// First application
		{
			name: 'KINODOM:STAGE',
			script: 'npm',
			args: 'start',
			watch: false,
			ignore_watch: ["./assets"],
			// instances : "max",
			// exec_mode : "cluster",

			max_memory_restart: "750M",
			env: {}
		},
		{
			name: 'KINODOM:PROD',
			script: 'npm',
			args: 'start',
			watch: false,
			ignore_watch: ["./assets"],
			// instances : "max",
			// exec_mode : "cluster",

			max_memory_restart: "750M",
			env: {}
		}
	]
};
