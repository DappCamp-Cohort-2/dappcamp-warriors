import sharp from 'sharp'
import scalePixelArt from "scale-pixel-art"
import { promises as fs } from 'fs'

import { hats, characters } from './data.js'

const baseDir = './assets'

const getHatImagePath = (file) => `${baseDir}/hats/small/${file}.png`
const getCharacterImagePath = (file) => `${baseDir}/characters/${file}.png`
const getWeaponImagePath = (base, index) => `${baseDir}/weapons/${base}/weapon (${index + 1}).png`

const getImage = async (path, scale = 8) => {
    const buffer = await fs.readFile(path)
    return await scalePixelArt(buffer, scale)
}

const getHatImage = async (path) => {
    return sharp(await getImage(getHatImagePath(path), 8)).flop().toBuffer()
}

const getWeaponImage = async (base, index) => {
    return sharp(await getImage(getWeaponImagePath(base, index), 5), { backgrounsd: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .rotate(-45, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer()
}

const generateImage = async (character, hat, hatYAdjust, weapon, index) => {
    sharp(character)
        .composite([
            { input: hat, left: 15, top: -10 + hatYAdjust, width: 10, height: 10 },
            { input: weapon, left: 150, top: 35 }
        ])
        .png()
        .extend({
            bottom: 100,
            right: 100,
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toFile(`./images/${index}.png`)
}

const generateImages = async () => {
    let total = 0;
    const start = new Date().getTime();

    for (let characterIndex = 0; characterIndex < characters.length; characterIndex++) {
        const charDetails = characters[characterIndex];
        const character = await getImage(getCharacterImagePath(charDetails.file), 8)

        for (let hatIndex = 0; hatIndex < hats.length; hatIndex++) {
            const hatDetails = hats[hatIndex];
            const hat = await getHatImage(hatDetails.file)

            for (let weaponIndex = 0; weaponIndex < charDetails.weapons.length; weaponIndex++) {
                const weapon = await getWeaponImage(charDetails.weaponsBase, weaponIndex)

                await generateImage(character, hat, hatDetails.yAdjust || 0, weapon, total)
                total++
                console.log("Finished with", total)
            }
        }
    }

    const end = new Date().getTime();
    const time = end - start;
    console.log({ total })
    console.log('Execution time: ' + time)
}

const generateMetadataFiles = async (ipfsBaseURL) => {
    let total = 0;
    const start = new Date().getTime();

    for (let characterIndex = 0; characterIndex < characters.length; characterIndex++) {
        const charDetails = characters[characterIndex];

        for (let hatIndex = 0; hatIndex < hats.length; hatIndex++) {
            const hatDetails = hats[hatIndex];

            for (let weaponIndex = 0; weaponIndex < charDetails.weapons.length; weaponIndex++) {
                const metadata = JSON.stringify({
                    attributes: {
                        character: charDetails.type,
                        hat: hatDetails.name,
                        weapon: `${charDetails.weaponType} ${weaponIndex + 1}`
                    },
                    image: ipfsBaseURL + `/${total}.png`,
                })
                await fs.writeFile(`./metadatas/${total}.json`, metadata)
                total++
                console.log("Finished with", total)
            }
        }
    }

    const end = new Date().getTime();
    const time = end - start;
    console.log({ total })
    console.log('Execution time: ' + time)
}

const runCommand = async () => {
    const args = process.argv.slice(2)
    const command = args[0]

    if (command === 'images') {
        await generateImages()
    } else if (command === 'metadatas') {
        if (!args[1]) {
            throw new Error("Missing IPFS base URL")
        }
        await generateMetadataFiles(args[1])
    } else {
        throw new Error("Invalid command")
    }
}

runCommand()