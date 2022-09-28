console.log("hello world")
let backgrounds = [{name:"Tapete Weis", file:"assets/background-white-.jpg", image:undefined},
                   {name:"Tapete Grau", file:"assets/background-grey-.jpg", image:undefined},
                   {name:"Kastanie", file:"assets/background-chestnut-.jpg", image:undefined},
                   {name:"Eiche", file:"assets/background-oak-.jpg", image:undefined},
                   {name:"Mahagoni", file:"assets/background-mahagoni-.webp", image:undefined},
                   {name:"Kiefer", file:"assets/background-pine-.jpeg", image:undefined}]
let bases = [{name:"AP mit Montageplatte", file:"assets/AP-Base-wMountingplate-.png", image:undefined},
             {name:"AP ohne Montageplatte", file:"assets/AP-Base-woMountingplate-.png", image:undefined},
             {name:"UP", file:"assets/UP-Base-.png"}]
let covers = [{name:"Standard Weis", file_ap:"assets/AP-Cover-ABS-white-.png", file_up:"assets/UP-Cover-ABS-white-.png", image_ap:undefined, image_up:undefined},
              {name:"Inventife Blau", file_ap:"assets/AP-Cover-Plastic-blue-.png", file_up:"assets/UP-Cover-Plastic-blue-.png", image_ap:undefined, image_up:undefined},
              {name:"Bronze", file_ap:"assets/AP-Cover-Bronze-polished-.png", file_up:"assets/UP-Cover-Bronze-polished-.png", image_ap:undefined, image_up:undefined},
              {name:"Stahl", file_ap:"assets/AP-Cover-Steel-satined-.png", file_up:"assets/UP-Cover-Steel-satined-.png", image_ap:undefined, image_up:undefined},
              {name:"Titan", file_ap:"assets/AP-Cover-Titan-satined-.png", file_up:"assets/UP-Cover-Titan-satined-.png", image_ap:undefined, image_up:undefined},
              {name:"Kastanie", file_ap:"assets/AP-Cover-Wood-Chestnut-.png", file_up:"assets/UP-Cover-Wood-Chestnut-.png", image_ap:undefined, image_up:undefined},
              {name:"Eiche", file_ap:"assets/AP-Cover-Wood-Oak-.png", file_up:"assets/UP-Cover-Wood-Oak-.png", image_ap:undefined, image_up:undefined},
              {name:"Mahagoni", file_ap:"assets/AP-Cover-Wood-Mahagoni-.png", file_up:"assets/UP-Cover-Wood-Mahagoni-.png", image_ap:undefined, image_up:undefined},
              {name:"Kiefer", file_ap:"assets/AP-Cover-Wood-Pine-.png", file_up:"assets/UP-Cover-Wood-Pine-.png", image_ap:undefined, image_up:undefined}]

let background_type_displayed
let sensor_type_displayed
let cover_material_displayed
let cover_material_animated

let console_enabled = false

let sensor_type
let prevType

let cover_material
let prevMaterial

let animation_counter = 0

function preload() {
    for (let i = 0; i < backgrounds.length; i++) {
        backgrounds[i].image = loadImage(backgrounds[i].file)
    }

    for (let i = 0; i < bases.length; i++) {
        bases[i].image = loadImage(bases[i].file)
    }

    for (let i = 0; i < covers.length; i++) {
        covers[i].image_ap = loadImage(covers[i].file_ap)
        covers[i].image_up = loadImage(covers[i].file_up)
    }

    background_type_displayed = 0
    sensor_type_displayed = 0
    cover_material_displayed = 0
}

function setup() {
    createCanvas(16*50, 9*50)
    frameRate(30)
    //image(base, 0, 0, 100, 100)
    let background_label = createP("Decken Typ:")
    background_type = createRadio("background_type")
    for (let i = 0; i < backgrounds.length; i++) {
        background_type.option(backgrounds[i].name)
    }
    background_type.selected(backgrounds[0].name)
    prevBackground = backgrounds[0].name
    background_type.mouseClicked(changeBackgroundType)

    let sensor_type_label = createP("Sensor Typ:")
    sensor_type = createRadio("sensor_type")
    for (let i = 0; i < bases.length; i++) {
        sensor_type.option(bases[i].name)
    }
    sensor_type.selected(bases[0].name)
    prevType = bases[0].name
    sensor_type.mouseClicked(changeSensorType)

    let cover_material_label = createP("Material der Blende:")
    cover_material = createRadio("cover_material")
    for (let i = 0; i < covers.length; i++) {
        cover_material.option(covers[i].name)
    }
    cover_material.selected(covers[0].name)
    prevMaterial = covers[0].name
    cover_material.mouseClicked(changeCoverMaterial)
}

function draw() {
    background(0)

    image(backgrounds[background_type_displayed].image, 0, 0, 16*50, 9*50)
    image(bases[sensor_type_displayed].image, 0, 0, 16*50, 9*50)

    if (sensor_type_displayed == 2) { // up
        if (animation_counter == 0) {
            image(covers[cover_material_displayed].image_up, 0, 0, 16*50, 9*50)
        } else {
            image(covers[cover_material_displayed].image_up, animation_counter, 0, 16*50, 9*50)
            image(covers[cover_material_animated].image_up, animation_counter - 16*50, 0, 16*50, 9*50)
        }
    } else {
        if (animation_counter == 0) {
            image(covers[cover_material_displayed].image_ap, 0, 0, 16*50, 9*50)
        } else {
            image(covers[cover_material_displayed].image_ap, animation_counter, 0, 16*50, 9*50)
            image(covers[cover_material_animated].image_ap, animation_counter - 16*50, 0, 16*50, 9*50)
        }
    }

    if (animation_counter > 0) {
        animation_counter = animation_counter - 50
    } else {
        animation_counter = 0
    }
}

function changeBackgroundType() {
    newBackgound = background_type.selected().value

    if (newBackgound != prevBackground) {
        logToConsole(newBackgound)

        for (let i = 0; i < backgrounds.length; i++) {
            if (backgrounds[i].name == newBackgound) {
                background_type_displayed = i
            }
        }
    }

    prevBackground = newBackgound
}

function changeSensorType() {
    newType = sensor_type.selected().value

    if (newType != prevType) {
        logToConsole(newType)

        for (let i = 0; i < bases.length; i++) {
            if (bases[i].name == newType) {
                sensor_type_displayed = i
            }
        }
    }

    prevType = newType
}

function changeCoverMaterial() {
    newMaterial = cover_material.selected().value

    if (newMaterial != prevMaterial) {
        logToConsole(newMaterial)

        for (let i = 0; i < covers.length; i++) {
            if (covers[i].name == newMaterial) {
                cover_material_animated = cover_material_displayed
                cover_material_displayed = i
                animation_counter = 16*50
            }
        }
    }

    prevMaterial = newMaterial
}

function logToConsole(stuff) {
    if (console_enabled) {
        console.log(stuff)
    }
}