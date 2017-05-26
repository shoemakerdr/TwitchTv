
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

		// rendering functions

        // create channel section for each channel
        function createChannelSection(channelData) {
            // define elements that will be made in this render function
            // pull properties out of obj and use them to render

        }

        // append channel sections together

        // append channel sections to "ul" node in DOM



		// bind events function(s)

	});
})();
