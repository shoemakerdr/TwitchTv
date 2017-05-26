// Cloud9 IDE get rid of 'fetch' warning --> 
/*global fetch*/ 


(function () {
	
	"use strict";
	// DOMContentLoaded event listener
	document.addEventListener('DOMContentLoaded', () => {
		
		const url = 'https://wind-bow.glitch.me/twitch-api/';
		const usersRoute = 'users/';
		const streamsRoute = 'streams/';
		const channels = ['esl_sc2', 'ogamingsc2', 'cretetion', 'freecodecamp',
		                  'storbeck', 'habathcx', 'robotcaleb', 'noobs2ninjas',
						  'misterrogers'];
		let channelStates = {};
		
		const list = document.getElementsByTagName('ul')[0];
		let allChannels;
		let liveChannels;
		let offlineChannels;
		
		
		// abstracted function that takes the route of API call and array of 
		// channel names and returns a collection of promises through 
		// Promise.all()
		function promiseArray(route, array) {
			return (
				Promise.all(array.map(channel =>
					fetch(`${url}${route}${channel}`)
					.then(res => res.json())
					.catch(err => 
						console.log(`Error in fetching ${channel}: ${err}`))
				))
				.then(res => console.log(res))
			);
		}

		// fetch user info for all channels
		const users = promiseArray(usersRoute, channels);
		
		// fetch stream info for all channels
		const streams = promiseArray(streamsRoute, channels);
		
		// Calls render function when both users and streams arrays have 
		// resolved their promises
		Promise.all([users, streams])
			.then(() => {
				setChannelStates(channels);
				setChannelNodes(channelStates);
				render(allChannels);
			})
			.catch(err => console.log(`Error in getting channels: ${err}`));

		// sets channelStates object with props for each channel
		function setChannelStates(array) {
			array.forEach((channel, i) => {
				
				channelStates[channel] = {
					error: users[i].error || null,
					message: users[i].message || null,
					name: users[i].display_name || null,
					logo: users[i].logo || null,
					stream: streams[i].channel.status || null
				};
				
			});
		}
		
		// rendering functions
		
		// main render-- clears ul node and appends an array of nodes
		function render(nodes) {
			list.innerHTML = '';
			nodes.forEach(node => {
				list.appendChild(node);	
			});
		}
		
		function setChannelNodes(channels) {
			allChannels = channels.map(channel => {
				return createChannelNode(channel);
			});
			
			liveChannels = allChannels.filter(channel => {
				return channel.className === 'live';
			});
			
			offlineChannels = allChannels.filter(channel => {
				return channel.className === 'offline';
			});
		}
		
        // create channel node for each channel
        function createChannelNode(channel) {
            // define elements that will be made in this render function
            const section = document.createElement('li');
            // pull properties out of obj and use them to render
            section.id = channel.name.toLowerCase();
            if (channel.error) {
				section.innerHTML = channel.message;
				return section;
            }
            const nameBlock = document.createElement('div');
            const name = document.createElement('h2');
            const img = document.createElement('img');
            section.className = 'offline';
            img.src = channel.logo;
            name.innerHTML = channel.name;
            nameBlock.appendChild(name);
            
            
            if (channel.stream) {
				section.className = 'live';
				const status = document.createElement('p');
				status.innerHTML = channel.status;
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