export const weapons = {
    axes: {
        length: 44
    },
    daggers: {
        length: 13
    },
    maces: {
        length: 36
    },
    spears: {
        length: 21
    },
    staffs: {
        length: 58
    },
    swords: {
        length: 144
    }
}

export const hats = [
    {
        "name": "Cowboy",
        "file": "hat24"
    },
    {
        "name": "Feather",
        "file": "hat22"
    },
    {
        "name": "Luck",
        "file": "hat18",
        "yAdjust": -15
    },
    {
        "name": "Magician",
        "file": "hat19",
        "yAdjust": -20
    },
    {
        "name": "Pineapple",
        "file": "hat6",
        "yAdjust": 32
    },
    {
        "name": "Pirate",
        "file": "hat13"
    },
    {
        "name": "Sheriff",
        "file": "hat23"
    }
]

export const characters = [
    {
        type: "Butcher",
        file: "Butcher",
        hats: hats,
        weapons: weapons.axes,
        weaponsBase: 'axes',
        weaponType: 'Axe'
    },
    {
        type: "Butcher",
        file: "Butcher",
        hats: hats,
        weapons: weapons.maces,
        weaponsBase: 'maces',
        weaponType: 'Mace'
    },
    {
        type: "Knight",
        file: "Herald",
        hats: hats,
        weapons: weapons.swords,
        weaponsBase: 'swords',
        weaponType: 'Sword'
    },
    {
        type: "Mage",
        file: "Mage",
        hats: hats,
        weapons: weapons.staffs,
        weaponsBase: 'staffs',
        weaponType: 'Staff'
    },
    {
        type: "Thief",
        file: "Thief",
        hats: hats,
        weapons: weapons.daggers,
        weaponsBase: 'daggers',
        weaponType: 'Dagger'
    },
    {
        type: "Thief",
        file: "Thief",
        hats: hats,
        weapons: weapons.spears,
        weaponsBase: 'spears',
        weaponType: 'Spear'
    }
]