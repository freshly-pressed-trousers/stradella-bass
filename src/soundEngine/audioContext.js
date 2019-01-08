// we need to lazily initialise our signal paths due to autoplay policies in place for browsers
// read more: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices#Autoplay_policy
let audioContext;

document.addEventListener("click", () => {
	if (!audioContext) {
		audioContext = new AudioContext();
	}
});

export default () => audioContext;
