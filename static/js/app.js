var APP = APP || {};

(function () {

	APP.game = {
		title:'Game',
		items: [
		    { team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
		    { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
		    { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
		    { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
		    { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
		]
	};


	APP.ranking = {
		title:'Ranking',
		items: [
		    { team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
		    { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
		    { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
		    { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
		    { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
		]
	};


	APP.schedule = {
		title:'Schedule',
		items: [
		    { date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
		    { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
		    { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
		    { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
		    { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
		    { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
		    { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
		    { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
		    { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
		    { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}
		]
	};
	


	// Controller Init
	APP.controller = {
		init: function () {
			// Initialize router
			APP.router.init();
		}
	};

		APP.post = {
	                gameScore: function () {
	                	var url = "https://api.leaguevine.com/v1/game_scores/";

	                	var data = JSON.stringify({
	                		game_id      : document.getElementById('game_id').value,
	                		team_2_score : document.getElementById('team_2_score').value,
	                		team_1_score : document.getElementById('team_1_score').value,
	                		is_final : 'True'
	                	});

	                	console.log("____________________");
	                	console.log(data);

	                	var headers = {
	                	'Content-type' : 'application/json',
	                	'Authorization' : 'bearer 3583789567'
	                	}

	                	promise.post(url, data, headers).then(function(error, text, xhr) {
						    if (error) {
						        alert('Error ' + xhr.status);
						        return;
						    }
						    alert('The page contains ' + text.length + ' character(s).');
						});
                			
	               	}
	}

		// Router
	 	APP.router = {
	                init: function () {
                         routie({
                         '/game': function() {
                                 APP.page.renderGame();
                                },
                         '/ranking': function() {
                                 APP.page.renderRanking();
                         },

                         '/schedule': function() {
                                 APP.page.renderSchedule();
                         },

                         '/updateScore/:id': function(id) {
							console.log("Update score: " + id);
					    	APP.page.updateScore(id);
                         },

                         '*': function() {
                                 APP.page.game();
                         }
                        });
                },

			
	                change: function () {
	            var route = window.location.hash.slice(2),
	                sections = qwery('section[data-route]'),
	                section = qwery('[data-route=' + route + ']')[0];

	            // Show active section, hide all other
	            if (section) {
	                    for (var i=0; i < sections.length; i++){
	                            sections[i].classList.remove('active');
	                    }
	                    section.classList.add('active');
	            }

	            // Default route
	            if (!route) {
	                    sections[0].classList.add('active');
	            }

	                }
        	};

 			APP.page = {
                game: function () {
                        Transparency.render(qwery('[data-route=game]')[0], APP.game);
                        APP.router.change();
                },

                ranking: function () {
                        Transparency.render(qwery('[data-route=ranking]')[0], APP.ranking);
                        APP.router.change();
                },

                schedule: function () {
                        Transparency.render(qwery('[data-route=schedule]')[0], APP.schedule);
                        APP.router.change();
                },

                renderForm: function () {
                        Transparency.render(qwery('[data-route=form]')[0], APP.schedule);
                        APP.router.change();
                },

                renderRanking: function() { 
                	promise.get('https://api.leaguevine.com/v1/pools/?tournament_id=19389').then(function(error, text, xhr) {
		                var json = JSON.parse(text);
		                var pool = json.objects[3];
		                console.log(pool);

                if (error) { 
                	alert('Error ' + xhr.status);
                	return; }

				Transparency.render(qwery('[data-route=ranking]')[0], pool); 
				APP.router.change();
				});
       			},

       			renderGame: function() { 
                	promise.get('https://api.leaguevine.com/v1/games/?tournament_id=19389&pool_id=19219&limit=200').then(function(error, text, xhr) {
		                var json = JSON.parse(text);
		                var pool = json.objects;
		                console.log();

                if (error) { 
                	alert('Error ' + xhr.status);
                	return; }

				Transparency.render(qwery('[data-route=game]')[0], pool); 
				APP.router.change();
				});
       			},

       			renderSchedule: function() { 
                	promise.get('https://api.leaguevine.com/v1/pools/?tournament_id=19389').then(function(error, text, xhr) {
		                var json = JSON.parse(text);
		                var pool = json.objects[3];
		                

                if (error) { 
                	alert('Error ' + xhr.status);
                	return; }

				Transparency.render(qwery('[data-route=schedule]')[0], pool); 
				APP.router.change();
				});
       			},

       			updateScore: function (id) {
		
					promise.get('https://api.leaguevine.com/v1/games/'+id+'/').then(function(error, text, xhr) {
						if (error) {
						alert('Error ');
						return;
						}
				
					var data = JSON.parse(text);
					console.log("RETRIEVED ONE GAME!!");
					console.log(JSON.parse(text));
					Transparency.render(qwery('[data-route=updateScore')[0], data);
				})
			/*Transparency.render(qwery('[data-route=updateScore')[0], data);
				APP.router.change();
		
			});
			alert("dsf");*/
			
	    }
       	}


	// DOM ready
	domready(function () {
		// Kickstart application
		APP.controller.init();
	});
	
})();