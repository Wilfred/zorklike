function Location() {
	this.visible = {};
	this.description = "";
}

Location.prototype.look = function(thing) {
	if (thing in this.visible) {
		return this.visible[thing];
	} else {
		return "You can't see anything there.";
	}
};

Location.prototype.go = function(direction) {
	throw "You can't go in that direction here.";
};

function StartLocation() {
	this.visible = {up: 'You see the top of text interface, with three tempting links above it.',
			down: 'You can only see the bottom of the ' + getBrowserName() + ' window.',
			forward: 'In front of you, you see some handcrafted HTML with a curious text interface. Looking more closely, you spot a trapdoor beyond.'};

	// we have to manually add line breaks as this is shown on first load
	this.description = "You find yourself on a curiously designed website with what looks like\nan interface influenced by text adventure games.";
}

StartLocation.prototype = new Location;

StartLocation.prototype.go = function(direction) {
	if (direction === "up") {
		throw "Nothing above you to go to.";
	} else if (direction === "down") {
		throw "The ground looks pretty solid, you can't go down here.";
	} else if (direction === "forward") {
		return new Meadow();
	} else {
		return Location.prototype.go(direction);
	}
};

function Meadow() {
	// set noticeboard message from twitter
	var self = this;
	$.getJSON('http://twitter.com/status/user_timeline/dontYetKnow.json?count=1&callback=?',
		  function(data, result) {
			  self.visible.noticeboard = 'The noticeboard reads "' + data[0].text + '"';
		  });

	this.visible = {up: 'The sky looks blue, with a threat of cloud computing later.',
			down: 'You are standing in some overgrown grass.',
			forward: 'You see a hillside not too far away, though the ground looks somewhat rocky.',
			backward: 'A trapdoor is set into the group behind you.',
			noticeboard: 'The noticeboard looks blank today.'};

	this.description = "You step through the trapdoor, and blink as your eyes adjust to the bright sunlight. You are standing in a meadow, with a bird cawing in the distance. A noticeboard is here.";
}

Meadow.prototype = new Location();

Meadow.prototype.go = function(direction) {
	if (direction === "forward") {
		return new Hillside();
	} else if (direction === "backward") {
		return new StartLocation();
	} else {
		return Location.prototype.go(direction);
	}
};

function Hillside() {
	this.visible = {up: 'The sky is still blue, to be honest.',
			down: 'You are standing on rocky ground, on a slight incline..',
			forward: 'The hillside stretches as far as you can see.',
			backward: 'Looking back, you see the meadow you came from.'};

	this.description = "You stride onwards to the hillside, slowing down as the path gets steepier and rockier. The whole area has an unfinished feel to it, somehow.";
}

Hillside.prototype = new Location();

Hillside.prototype.go = function(direction) {
	if (direction === "backward") {
		return new Meadow();
	} else {
		return Location.prototype.go(direction);
	}
};

function getBrowserName() {
	// based on http://www.javascripter.net/faq/browsern.htm
	var userAgent = navigator.userAgent;
	var browserName = navigator.appName;

	// In MSIE, the true version is after "MSIE" in userAgent
	if (userAgent.indexOf("MSIE") != -1) {
		browserName = "Microsoft Internet Explorer";
	}
	// In Opera, the true version is after "Opera" 
	else if (userAgent.indexOf("Opera") != -1) {
		browserName = "Opera";
	}
	// In Chrome, the true version is after "Chrome" 
	else if (userAgent.indexOf("Chrome") != -1) {
		browserName = "Chrome";
	}
	// In Safari, the true version is after "Safari" 
	else if (userAgent.indexOf("Safari")!=-1) {
		browserName = "Safari";
	}
	// In Firefox, the true version is after "Firefox" 
	else if (userAgent.indexOf("Firefox") != -1) {
		browserName = "Firefox";
	}
	// In most other browsers, "name/version" is at the end of userAgent 
	else if (userAgent.lastIndexOf(' ') + 1 < userAgent.lastIndexOf('/')) {
		var nameOffset = userAgent.lastIndexOf(' ') + 1;
		var verOffset = userAgent.lastIndexOf('/');
		browserName = userAgent.substring(nameOffset, verOffset);

		if (browserName.toLowerCase() == browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	}

	return browserName;
}
