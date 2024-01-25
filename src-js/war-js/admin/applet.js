import App from './Applet.svelte';

const container = document.querySelector(".cms-admin-applet-container");

const specifiedView = container.getAttribute("data-view");
const viewPropsAttr = container.getAttribute("data-view-props");
const actualView = specifiedView?specifiedView:"comment-moderation";

console.log("view: "+actualView);

const app = new App({
	target: document.querySelector(".cms-admin-applet-container"),
	props: {
		name: 'world',
		view: actualView,
		viewProps: viewPropsAttr?JSON.parse(viewPropsAttr):{}
	}
});

export default app;