// Set up canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set up Matter.js
var engine = Matter.Engine.create();
var world = Matter.Composite;
var runner = Matter.Runner.create();

class PhysicsSprite { // sprite with physics body
	constructor(x, y, width, height, spriteID, update=null, render=null) {
		this.loaded = false
		// Set up Matter.js
		this.spriteSheet = document.getElementById(`${spriteID}`);
		this.spriteSheet.width = width;
		this.spriteSheet.height = height;
		this.x = x
		this.y = y
		if (update)
			this.update = (deltaTime)=>{update}
		else{
			this.update = (deltaTime)=>{}
		}
		if (render)
			this.render =()=>{render}
		else{
			this.render =()=>{
				ctx.drawImage(this.spriteSheet, this.x, this.y)
			}
		}
		this.body = Matter.Bodies.rectangle(x, y, this.spriteSheet.width, this.spriteSheet.height);
		world.add(engine.world, this.body);
		this.spriteSheet.onload = function() {
			this.loaded = true;
		}
	}
}

let sprites = { // object to manage sprites
	sprites: {},
	add: function(name, x, y, width, height, path, update, render){
		var sprite = new PhysicsSprite(x, y, width, height, path, update, render);
		this.sprites[name] = sprite;
		return this.sprites[name]
	},
	get: function(name){
		return this.sprites[name]
	},
	remove: function(name){
		delete this.sprites[name];
	},
	update: function(deltaTime){
		Object.values(this.sprites).forEach(function(sprite){
			sprite.update(deltaTime);
		});
	},
	render: function(){
		Object.values(this.sprites).forEach(function(sprite){
			sprite.render();
		});
	},
	freeze: function(){
		console.log(this.sprites);
	}
}

let sounds = { 
	sounds: {},
	add: function(name, path, preload="auto"){
		this.sounds[name] = new Audio();
		this.sounds[name].src = path;
		this.sounds[name].preload = preload;
	},
	
	remove: function(name){
		delete this.sounds[name];
	},
	play: function(name){
		// Play sound effects
		this.sounds[name].play();
	}
}

let global_funcs = {
	funcs: {},
	add: function(name, func){
		
		this.funcs[name] = func;
	},
	update: function(deltaTime){
		Object.values(this.funcs).forEach(function(func){
			console.log(func)
			func(deltaTime)
		})
	},
	freeze: function(){
		console.log(this.funcs)
	}
}

// Game loop
var lastTime = 0;
function gameLoop(timestamp) {
	var deltaTime = timestamp - lastTime;
	lastTime = timestamp;

	// Update game state
	update(deltaTime);

	// Render game
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	render();

	// Request next frame
	requestAnimationFrame(gameLoop);
}

// Update game state
function update(deltaTime) {
	// Update Matter.js engine
	Matter.Engine.update(engine, deltaTime);
	global_funcs.update(deltaTime);
	sprites.update(deltaTime);
}

// Render game
function render() {
	// TODO: Render game
	sprites.render()
}

function boot(){
	// Start game loop
	let player = sprites.add("smiley", canvas.width*.5, canvas.height*.5, 10, 10, "smiley");
	console.log(player)
	requestAnimationFrame(gameLoop);
}