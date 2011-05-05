var zorklike = {};

zorklike.location = new StartLocation();

zorklike.init = function() {
	$('#shell').terminal(zorklike.terminal.main, zorklike.configuration);
};

zorklike.terminal = {
	main: function(input, terminal) {
		var command = $.trim(input);
	
		if (command !== '') {
			var argv = command.split(' ');
	
			if (argv[0] in zorklike.commands) {
				// call command
				var zorklikeCommand = zorklike.commands[argv[0]];
				zorklikeCommand(argv.slice(1), terminal);
			} else {
				terminal.echo("I don't know how to do that.");
			}
		}

		// blank line trailer
		zorklike.terminal.write('\n', terminal);

		zorklike.terminal.scroll();
	},

	write: function(string, terminal) {
		// write a string to the terminal, breaking long strings on word boundaries.

		if (string.length <= terminal.cols()) {
			terminal.echo(string);
		} else {
			var words = string.split(' ');

			var shortString = "";
			for (var i=0; i < words.length; i++) {
				var currentWord = words[i];
				if (shortString.length + 1 + currentWord.length > terminal.cols()) {
					// we can't add any more to this line without overflowing.

					// check for stupidly long words, and break them with hyphenation
					if (currentWord.length > terminal.cols()) {
						var charsRemaining = terminal.cols() - shortString.length;

						if (shortString === '') {
							shortString = currentWord.substring(0, charsRemaining - 1) + '-';

							// save remaining characters of this long word
							words[i] = currentWord.substring(charsRemaining - 1);
						} else {
							shortString += ' ' + currentWord.substring(0, charsRemaining - 2) + '-';
							// save remaining characters of this long word
							words[i] = currentWord.substring(charsRemaining - 2);

						}

					}

					// write the truncated string, then recurse on the remainder
					terminal.echo(shortString);
					return zorklike.terminal.write(words.slice(i).join(' '), terminal);
				} else {
					if (shortString === '') {
						shortString = words[i];
					} else {
						shortString += ' ' + words[i];
					}
				}
			}
		}
	},

	scroll: function() {
		var bottom = $('#shell').offset().top + $('#shell').height();
		window.scrollBy(0, bottom);
	}
};

zorklike.commands = {
	help: function(args, terminal) {
		if (args.length === 0) {
			zorklike.terminal.write("Available commands are: help, look, go. Type 'help <command>' for specific information.",
						terminal);
		} else {
			if (args[0] === 'look') {
				zorklike.terminal.write("look <direction or item>: describes direction or visible item. Common directions are up, down, forward and backward.",
							terminal);
			} else if (args[0] === 'go') {
				zorklike.terminal.write("go <location>: moves to specified location.",
							terminal);
			} else if (args[0] === 'help') {
				zorklike.terminal.write("help <command>: gives a description of that command.",
							terminal);
			} else {
				zorklike.terminal.write("No help for that command.",
							terminal);
			}
		}
	},

	look: function(args, terminal) {
		if (args.length === 0) {
			zorklike.terminal.write("Which direction you want to look in?",
									terminal);
		} else {
			var direction = args[0];
			zorklike.terminal.write(
				zorklike.location.look(direction),
				terminal);
		}
	},

	go: function(args, terminal) {
		if (args.length === 0) {
			zorklike.terminal.write("You need to pick a direction to go in.",
									terminal);
		} else {
			var direction = args[0];

			try {
				zorklike.location = zorklike.location.go(direction);
				zorklike.terminal.write(
					zorklike.location.description,
					terminal);

			} catch (reasonWhyNot) {
				zorklike.terminal.write(reasonWhyNot, terminal);
			}
		}
	}
};

zorklike.configuration = {greetings: zorklike.location.description +
			  "\n\nAvailable commands are: help, look, go.\n",
			  exit: false};

$(function() {
	zorklike.init();
});