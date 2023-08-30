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
