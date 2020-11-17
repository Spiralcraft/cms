import App from './Applet.svelte';

const app = new App({
	target: document.querySelector(".cms-admin-applet-container"),
	props: {
		name: 'world'
	}
});

export default app;