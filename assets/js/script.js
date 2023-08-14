const resources = {
    materials: 0,
    weapons: 0,
    food: 0,
    medicalSupplies: 0
};
const locations = [
    {
        name: "School",
        description: "Within the abandoned school's weathered walls, whispers of forgotten dreams linger amid the haunting emptiness.",
        clueDescription: "There's a room that seems unreachable, it could be accessed with the right materials.",
        clueCost: {materials:10},
        clueGainedMessage: "You find a glyph carved into a dusty chalkboard.",
        clueId: 1
    },
    {
        name: "Hospital",
        description: "The hospital's once sterile corridors now echo with eerie silence, punctuated by the occasional shuffle of undead footsteps.",
        clueDescription: "You find a shrine with a small statue depicting some strange being, it has an offering plate placed firmly in front of it",
        clueCost: {food:10},
        clueGainedMessage: "As you blink the offering vanishes and a glyph appears on the statue",
        clueId: 2
    },
    {
        name: "Office",
        description: "The office stands frozen in time, a scene of abandoned tasks and interrupted lives.",
        clueDescription: "You see a supply cupboard that looks like it might contain useful resources, it's being guarded by a horde of undead.",
        clueCost: {weapons:10},
        clueGainedMessage: "You battle off the undead, inside the cupboard is nothing but copy-paper with a strange glyph printed on every page",
        clueId: 3
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

        ],
        requirements: {}
    }
];


