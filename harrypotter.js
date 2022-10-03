

function randint(min, max){  //permet de déplacer notre agent
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onAgentUpdate(agent) {

	let harry = document.getElementById('harry');

	if (agent.d == 0 ) {
		agent.fire(false);
	}
	else {
		agent.fire(true);
	}

	if (agent.dir === 0){
		harry.style.transform = "rotate(90deg)"; 
	}
	else if (agent.dir === 2){
		harry.style.transform = "rotate(-90deg)";
	}
	else if (agent.dir === 3){
		harry.style.transform = "rotate(180deg)";
	}
	else if (agent.dir === 1){
		harry.style.transform = "rotate(0deg)";
	}
	



	let dx = randint(-1,1);
	let dy = randint(-1,1);
	agent.move(dx,dy);
		console.log (`moving harry potter ${dx} ${dy}`);
	agent.lookTo(randint(0,3));
	
}

function onLoaded() {
	let href = window.location.href;
	let url = new URL(href);
	let agentId = url.searchParams.get('agentid');
	let readOnly = url.searchParams.get('readonly');
	if ( agentId === null ){
		console.log("agentid manquant");
		return;
	}
	if ( readOnly === null ) {
		console.log("readonly manquant");
		return; 
	}

	if ( readOnly === "1" )
		readOnly = true;
	else
		readOnly = false;

	console.log("Création de l'agent");
	let monAgent = new Agent(agentId, "demo", "demo", 
	"iframebattlefx", 8080, "mqtt.jusdeliens.com", 2, readOnly); //instancier mon agent
	monAgent.connect(); //connecter l'agent à l'arène mais on ne lui a rien ordonné
	monAgent.executeOnUpdate(onAgentUpdate); 


}


	document.addEventListener("DOMContentLoaded", onLoaded);


const STEP_SIZE = 50;

addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      move("UP");
      break;
    case "ArrowDown":
      move("DOWN");
      break;
    case "ArrowLeft":
      move("LEFT");
      break;
    case "ArrowRight":
      move("RIGHT");
      break;
    default:
      console.log("No action defined for key " + event.key);
  }
});

function move(direction) {
  if (isJoystickEnabled()) {
    var harry = getHarry();
    var positions = harry.getBoundingClientRect();
    switch (direction) {
      case "UP":
        harry.style.top = positions.top - STEP_SIZE + "px";
        // harry.style.transform = "rotate(0deg)";
        break;
      case "DOWN":
        harry.style.top = positions.top + STEP_SIZE + "px";
        // harry.style.transform = "rotate(180deg)";
        break;
      case "LEFT":
        harry.style.left = positions.left - STEP_SIZE + "px";
        // harry.style.transform = "rotate(-90deg)";
        break;
      case "RIGHT":
        harry.style.left = positions.left + STEP_SIZE + "px";
        // harry.style.transform = "rotate(90deg)";
        break;
      default:
        console.log("Direction " + direction + " doest not exist");
    }
  }
}

function getHarry() {
  return document.getElementById("harry");
}

function isJoystickEnabled() {
  return document.getElementById("joystick-status").checked;
}


