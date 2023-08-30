const resources = {
    materials: 0,
    weapons: 0,
    food: 0,
    medicalSupplies: 0
};

const resourceIcons = {
    materials: "<i class='fa-solid fa-hammer'></i>",
    weapons: "<i class='fa-solid fa-gun'></i>",
    food: "<i class='fa-solid fa-utensils'></i>",
    medicalSupplies: "<i class='fa-solid fa-pump-medical'></i>"
};

const locations = [
    {
        name: "School",
        description: "Within the abandoned school's weathered walls, whispers of forgotten dreams linger amid the haunting emptiness.",
        clueDescription: "There's a room that seems unreachable, it could be accessed with the right materials.",
        clueFoundMessage: "All that's left are dusty chalkboards and empty halls.",
        clueCost: {materials:10},
        clueGainedMessage: "You find a glyph carved into a dusty chalkboard.",
        clueId: 1
    },
    {
        name: "Hospital",
        description: "The hospital's once sterile corridors now echo with eerie silence, punctuated by the occasional shuffle of undead footsteps.",
        clueDescription: "You find a shrine with a small statue depicting some strange being, it has an offering plate placed firmly in front of it",
        clueFoundMessage: "You find a shrine with a small statue, nothing seems interesting about it.",
        clueCost: {food:10},
        clueGainedMessage: "As you blink the offering vanishes and a glyph appears on the statue",
        clueId: 2
    },
    {
        name: "Office",
        description: "The office stands frozen in time, a scene of abandoned tasks and interrupted lives.",
        clueDescription: "You see a supply cupboard that looks like it might contain useful resources, it's being guarded by a horde of undead.",
        clueFoundMessage: "There's a small cupboard containing nothing but copy-paper.",
        clueCost: {weapons:10},
        clueGainedMessage: "You battle off the undead, inside the cupboard is nothing but copy-paper with a strange glyph printed on every page",
        clueId: 3
    },
    {
        name: "Grocery Store",
        description: "The grocery store is dimly lit and the shelves lay barren, ransacked by frantic panic.",
        clueDescription: "You find an emergency locked supply crate in one of the back rooms, you could probably unlock it.",
        clueFoundMessage: "The store is seemingly filled with nothing but empty boxes and supply crates.",
        clueCost: {materials:10},
        clueGainedMessage: "You manage to open the crate, the crate is empty however there's an unusual glyph engraved inside the crate.",
        clueId: 4
    },
    {
        name: "Shopping Mall",
        description: "One of the most dangerous places to be, the shopping mall is infested with the undead.",
        clueDescription: "In the mall you notice a sign, it says place medicine in the box to recieve a great reward.",
        clueFoundMessage: "The mall is too big to be this empty.",
        clueCost: {medicalSupplies:10},
        clueGainedMessage: "The box closes almost automatically, a compartment pops out of the box containing a note with a glyph drawn on it.",
        clueId: 5
    },
    {
        name: "Church",
        description: "What was once a place of worship and sanctuary is now nothing more than a home for the undead.",
        clueDescription: "There is an undead going berserk at a door, there must be someone on the other side.",
        clueFoundMessage: "The large church is empty and void of life.",
        clueCost: {weapons:10},
        clueGainedMessage: "You swiftly defeat the undead and open the door, the room is empty and a glyph is engraved hundreds of times on every wall.",
        clueId: 6
    },
    {
        name: "Police Station",
        description: "The Police Station is messy, a sign of a desperate struggle against the undead.",
        clueDescription: "There is an undead trapped in a cell it looks hungry.",
        clueFoundMessage: "The cells are empty, not even undead remain.",
        clueCost: {food:10},
        clueGainedMessage: "The undead eats the meat scraps you throw then vomits, the vomit on the floor strangely resembles a glyph.",
        clueId: 7
    },
    {
        name: "Factory",
        description: "The factory is cold and dark the smell of smoke has long left these buildings.",
        clueDescription: "You find an old terminal, it's screen says 'repair the holes and the reward is yours'.",
        clueFoundMessage: "The machines in the factory look like they could come to life at any moment.",
        clueCost: {medicalSupplies:10},
        clueGainedMessage: "You tape over the holes using some bandage, the terminal powers on revealing a glyph on it's screen.",
        clueId: 8
    }
];
const events = [
    {
        name: "A crying voice",
        description: "You hear a cry from a distant room within the <location>",
        choices: [
            {
                name: "Investigate",
                description: "You find the room empty, but find a pantry of tinned goods. Creepy.",
                resources: {food:4},
            },
            {
                name: "Ignore",
                description: "You ignore the cries and quickly leave",
                resources: {}
            }

        ]
    },
    {
        name: "A strange wanderer",
        description: "A strange cloaked individual approaches you in the <location>",
        choices: [
            {
                name: "Speak",
                description: "The stranger hands you an array of gifts, then swifly leaves",
                resources: {weapons:2, materials:4},
            },
            {
                name: "Ignore",
                description: "You ignore the stranger and they walk right past",
                resources: {}
            }

        ],
        requirements: {}
    },
    {
        name: "The first aid station",
        description: "You notice a first aid kit on a wall in the <location>",
        choices: [
            {
                name: "Open",
                description: "The first aid kit contained many helpful supplies",
                resources: {medicalSupplies: 5},
            },
            {
                name: "Ignore",
                description: "You ignore the first aid kit and continue on your way",
                resources: {}
            }

        ],
        requirements: {}
    }
];

document.getElementById("player-name-submit").addEventListener("click", setName);
document.getElementById("game-start-controls").addEventListener("click", startDay);
document.getElementById("player-name-input").value = "";
let day = 1;
let activeLocations = [];
let activeLocation = undefined;
let activeLocationResources = [];
let activeLocationResource = undefined;
let eventHappenedToday = false;
let cluesFound = [];
let currentEndDialogue = 0;

function setName() {
    let playerName = document.getElementById("player-name-input").value;
    if (playerName === undefined || playerName.length == 0) {
        playerName = "Player";
    }
    setElementTextById("player-name", playerName);
    hideElement("player-name-controls");
    showElement("game-start-controls");
}

function hideElement(elementId) {
    document.getElementById(elementId).style.display = "none";
}

function showElement(elementId, displayType = "block") {
    document.getElementById(elementId).style.display = displayType;
}

function startDay() {

    let pool = getCopyOfLocations();
    let locationElements = document.getElementsByClassName("locations");
    for (let locationElement of locationElements) {
        let location = getRandomLocation(pool);
        pool.splice(pool.indexOf(location), 1);
        activeLocations.push(location);
        let randomResource = getRandomResource();
        activeLocationResources.push(randomResource);
        locationElement.innerHTML = location.name + " " + resourceIcons[randomResource];
    }
    hideElement("game-start-controls");
    showElement("location-controls");
    setElementTextById("active-content", "Choose where you'd like to explore.");
}

function getCopyOfLocations() {
    let pool = [];
    for (let location of locations) {
        pool.push(location);
    }
    return pool;
}

function setElementTextById(elementId, text) {
    document.getElementById(elementId).textContent = text;
}
function setElementText(element, text) {
    element.textContent = text;
}

function getRandomLocation(pool) {
    let randomIndex = (Math.floor(Math.random() * pool.length));
    return pool[randomIndex];
}

function getRandomResource() {
    let randomResource = (Math.floor(Math.random() * Object.keys(resources).length));
    return Object.keys(resources)[randomResource];
}

document.addEventListener("DOMContentLoaded", function () {
    let locationElements = document.getElementsByClassName("locations");

    for (let i = 0; i < locationElements.length; i++) {
        locationElements[i].addEventListener("click", function () {
            activeLocation = activeLocations[i];
            activeLocationResource = activeLocationResources[i];
            travelTo(activeLocation);
        });
    }
    document.getElementById("inspect").addEventListener("click", inspectLocation);
    document.getElementById("loot").addEventListener("click", lootLocation);
    document.getElementById("leave").addEventListener("click", leaveLocation);
    document.getElementById("leave-clue").addEventListener("click", leaveInspect);
    document.getElementById("gain-clue").addEventListener("click", gainClue);
    document.getElementById("leave-area").addEventListener("click", leaveLocation);
});

function travelTo(activeLocation) {
    hideElement("location-controls");
    showElement("visited-location-controls");
    setElementTextById("active-content", activeLocation.description);
    var lootButton = document.getElementById("loot");
    lootButton.innerHTML = "Loot" + " " + resourceIcons[activeLocationResource];
}

function inspectLocation() {
    if (cluesFound.includes(activeLocation.clueId)) {
        hideElement("gain-clue");
        setElementTextById("active-content", activeLocation.clueFoundMessage);
    } else {
        let resource = Object.keys(activeLocation.clueCost)[0];
        document.getElementById("clue-cost").innerHTML = activeLocation.clueCost[resource] + resourceIcons[resource];
        showElement("gain-clue", "inline");
        setElementTextById("active-content", activeLocation.clueDescription);
    }
    hideElement("visited-location-controls");
    showElement("inspect-clue-controls");


}

function lootLocation() {
    hideElement("visited-location-controls");
    showElement("area-leave-controls");
    let amountGained = Math.floor(Math.random() * 9) + 1;
    document.getElementById("active-content").innerHTML = "You found " + amountGained + " " + resourceIcons[activeLocationResource];
    resources[activeLocationResource] += amountGained;
    updateResources();
}

function updateResources() {
    setElementTextById("food", resources.food);
    setElementTextById("medical-supplies", resources.medicalSupplies);
    setElementTextById("weapons", resources.weapons);
    setElementTextById("materials", resources.materials);
}

function leaveLocation() {
    hideElement("visited-location-controls");
    hideElement("area-leave-controls");
    let eventChance = 0.3;
    let eventOccurs = Math.random() < eventChance;
    if (eventOccurs && !eventHappenedToday) {
        startEvent();
    } else {
        endDay();
    }
}

function leaveInspect() {
    hideElement("inspect-clue-controls");
    showElement("visited-location-controls");
    setElementTextById("active-content", activeLocation.description);
}

function gainClue() {
    if (hasResources(activeLocation.clueCost) && !cluesFound.includes(activeLocation.clueId)) {
        setElementTextById("active-content", activeLocation.clueGainedMessage);
        cluesFound.push(activeLocation.clueId);
        showElement("glyph-" + activeLocation.clueId, "inline");
        hideElement("gain-clue");
        takeResources(activeLocation.clueCost);
        setElementTextById("clues", cluesFound.length);
    } else {
        setElementTextById("active-content", "You don't have enough resources.");
    }
}

function hasResources(requiredResources) {
    for (let resource of Object.keys(requiredResources)) {
        if (resources[resource] < requiredResources[resource]) {
            return false;
        }
    }
    return true;
}

function endDay() {
    day++;
    document.getElementById("current-day").textContent = day;
    activeLocations = [];
    activeLocation = undefined;
    activeLocationResources = [];
    activeLocationResource = undefined;
    eventHappenedToday = false;
    if (cluesFound.length == 8) {
        startEnd();
    } else {
        startDay();
    }
}

function startEvent() {
    eventHappenedToday = true;
    showElement("events-controls");
    let event = getRandomEvent();
    let buttons = document.getElementById("events-controls").getElementsByTagName("button");
    buttons[0].innerHTML = event.choices[0].name;
    buttons[1].innerHTML = event.choices[1].name;
    buttons[0].onclick = function () { eventchoice(event.choices[0]) };
    buttons[1].onclick = function () { eventchoice(event.choices[1]) };
    setElementTextById("active-content", event.description.replace("<location>", activeLocation.name));
}

function eventchoice(choice) {
    setElementTextById("active-content", choice.description);
    for (let resource of Object.keys(choice.resources)) {
        resources[resource] += choice.resources[resource];
        document.getElementById("active-content").innerHTML += "<br>You found " + choice.resources[resource] + " " + resourceIcons[resource];

    }
    updateResources();
    hideElement("events-controls");
    showElement("area-leave-controls");
}

function giveResources(resourceChanges) {
    for (let resource of Object.keys(resourceChanges)) {
        resources[resource] += resourceChanges[resource];
    }
    updateResources();
}

function takeResources(resourceChanges) {
    for (let resource of Object.keys(resourceChanges)) {
        resources[resource] -= resourceChanges[resource];
    }
    updateResources();
}

function getRandomEvent() {
    let eventPool = [];
    for (let event of events) {
        if (eventRequirementMet(event)) {
            eventPool.push(event);
        }
    }
    let randomNumber = Math.floor(Math.random() * eventPool.length);
    return eventPool[randomNumber];
}

function eventRequirementMet(event) {
    return hasResources(event.requirements);

}

function hasResources(requiredResources) {
    for (let resource of Object.keys(requiredResources)) {
        if (resources[resource] < requiredResources[resource]) {
            return false;
        }
    }
    return true;
}