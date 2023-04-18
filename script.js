let player = null

function player_update(deltaTime){ // update function for player
	onkeydown = (event)=> { // read input
		if (event.isComposing || event.which === 38) {
			player.move_up()
		  }
		if (event.isComposing || event.which === 40) {
			player.move_down()
		  }
		if (event.isComposing || event.which === 37) {
			player.move_left()
		}
		if (event.isComposing || event.which === 39) {
			player.move_right()
		}
		if (event.isComposing || event.which === 90) {
			console.log("z");
		}
		if (event.isComposing || event.which === 88) {
			console.log("x");
		}
	}
}

function add_enemy(deltaTime){ // adds an enemy
	let enemy = sprites.add(`${Math.random()*999999+111111}`, Math.random()*canvas.width, 0, 10, 10, "frowny")
	enemy.update = function(){
		this.y += 10
		if (this.y >= canvas.height)
			sprites.remove(this.name)
	}
}

document.body.onload = function(){
	boot();
	player = sprites.get("smiley");
	player.update =(deltaTime)=>{player_update(deltaTime)} // add update function to player object
	player.spd = 9 // player movement speed
	player.move_left = function(){ // movement functions for player sprite
		console.log("left");
		this.x -= this.spd
	}
	player.move_right = function(){
		console.log("right");
		this.x += this.spd
	}
	player.move_up = function(){
		console.log("up");
		this.y -= this.spd
	}
	player.move_down = function(){
		console.log("down");
		this.y += this.spd
	}
	setInterval(add_enemy, Math.random()*5000)	// randomly spawn enemies
}