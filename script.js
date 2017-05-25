
(function () {
	// DOMContentLoaded event listener
	document.addEventListener("DOMContentLoaded", () => {
		// define elements
		const channels = ["esl_sc2", "ogamingsc2", "cretetion", "freecodecamp",
		                  "storbeck", "habathcx", "robotcaleb", "noobs2ninjas",
						  "misterrogers"];

		// fetch function using Promise.all()
		let channelProps = Promise.all(channels.map(channel =>
			fetch(`https://wind-bow.glitch.me/twitch-api/streams/${channel}`)
			.then(res => res.json())
			.catch(err => console.log(err))
		)).then(res => console.log(res));

		// render function

		// bind events function(s)
	});
})();
