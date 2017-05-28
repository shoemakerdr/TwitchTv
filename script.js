// Cloud9 IDE get rid of 'fetch' warning -->
/*global fetch*/


(function () {

	"use strict";
	// DOMContentLoaded event listener
	document.addEventListener('DOMContentLoaded', () => {

		const url = 'https://wind-bow.glitch.me/twitch-api/';
		const users = 'users';
		const streams = 'streams';
		const channels = ['esl_sc2', 'ogamingsc2', 'cretetion', 'freecodecamp',
		                  'storbeck', 'habathcx', 'robotcaleb', 'noobs2ninjas',
						  'misterrogers'];
		let channelStates = {
			esl_sc2: {},
			ogamingsc2: {},
			cretetion: {},
			freecodecamp: {},
			storbeck: {},
			habathcx: {},
			robotcaleb: {},
			noobs2ninjas: {},
			misterrogers: {}
		};

		const list = document.getElementsByTagName('ul')[0];
		let allChannels = [];
		let liveChannels;
		let offlineChannels;


		// abstracted function that takes the route of API call and array of
		// channel names and returns a collection of promises through
		// Promise.all()
		function fetchAndSetState(route, array) {
				Promise.all(array.map(channel =>
					fetch(`${url}${route}/${channel}`)
					.then(res => res.json())
					.then(res => {
						channelStates[channel][route] = res;
					})
					.catch(err =>
						console.log(`Error in fetching ${channel}: ${err}`))
				))
				.then(readyToRender);
		}

		function readyToRender() {
			console.log(channelStates);
			if (channelsReady(channelStates)) {
				setChannelNodes(channelStates);
				render(allChannels);
			}
		}

		function channelsReady(stateObject) {
			for (let channel in stateObject) {
				if (!stateObject[channel].users || !stateObject[channel].streams) {
					console.log(`channel ${channel} is not ready`);
					return false;
				}
			}
			return true;
		}

		// fetch user info for all channels
		fetchAndSetState(users, channels);

		// fetch stream info for all channels
		fetchAndSetState(streams, channels);


		// rendering functions

		// main render-- clears ul node and appends an array of nodes
		function render(nodes) {
			list.innerHTML = '';
			nodes.forEach(node => {
				list.appendChild(node);
			});
		}

		function setChannelNodes(collection) {
			// set allChannels
			for (let channel in collection) {
				allChannels.push(createChannelNode(collection[channel]));
			};

			liveChannels = allChannels.filter(channel => {
				return channel.className === 'live';
			});

			offlineChannels = allChannels.filter(channel => {
				return channel.className === 'offline';
			});
		}

        // create channel node for each channel
        function createChannelNode(channel) {
			console.log(channel.users.display_name);
            // define elements that will be made in this render function
            const section = document.createElement('li');
            // pull properties out of obj and use them to render
            section.id = channel.users.display_name.toLowerCase();
            if (channel.users.error) {
				section.innerHTML = channel.users.message;
				return section;
            }
            const nameBlock = document.createElement('div');
            const name = document.createElement('h2');
            const img = document.createElement('img');
            section.className = 'offline';
            img.src = channel.users.logo;
            name.innerHTML = channel.users.display_name;
            nameBlock.appendChild(name);


            if (channel.streams.stream !== null) {
				section.className = 'live';
				const status = document.createElement('p');
				status.innerHTML = channel.streams.stream.channel.status;
				nameBlock.appendChild(status);
            }
            section.appendChild(img);
            section.appendChild(nameBlock);

            return section;
        }




		// bind events function(s)

		list.addEventListener('click', event => {
			window.open(`https://www.twitch.tv/${event.target.id}`, '_blank');
		});


	});
})();
