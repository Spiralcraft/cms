import App from './Applet.svelte';

const app = new App({
	target: document.querySelector(".activity-container"),
	props: {
		name: 'world'
	}
});

export default app;