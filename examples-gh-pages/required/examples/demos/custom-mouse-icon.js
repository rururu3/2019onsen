var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

//Css style for icons
var defaultIcon = "url('required/assets/bunny.png'),auto";
var hoverIcon = "url('required/assets/bunny_saturated.png'),auto";

//Add custom cursor styles
app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon;

// create a background...
var background = PIXI.Sprite.fromImage('required/assets/button_test_BG.jpg');
background.width = app.screen.width;
background.height = app.screen.height;
// add background to stage...
app.stage.addChild(background);

// create some textures from an image path
var textureButton = PIXI.Texture.fromImage('required/assets/button.png');
var textureButtonDown = PIXI.Texture.fromImage('required/assets/buttonDown.png');
var textureButtonOver = PIXI.Texture.fromImage('required/assets/buttonOver.png');

var buttons = [];

var buttonPositions = [
    175, 75,
    655, 75,
    410, 325,
    150, 465,
    685, 445
];

for (var i = 0; i < 5; i++) {

    var button = new PIXI.Sprite(textureButton);
    button.cursor = "hover";

    button.anchor.set(0.5);
    button.x = buttonPositions[i*2];
    button.y = buttonPositions[i*2 + 1];

    // make the button interactive...
    button.interactive = true;

    button
        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        // button events.
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);

        // Use mouse-only events
        // .on('mousedown', onButtonDown)
        // .on('mouseup', onButtonUp)
        // .on('mouseupoutside', onButtonUp)
        // .on('mouseover', onButtonOver)
        // .on('mouseout', onButtonOut)

        // Use touch-only events
        // .on('touchstart', onButtonDown)
        // .on('touchend', onButtonUp)
        // .on('touchendoutside', onButtonUp)

    // add it to the stage
    app.stage.addChild(button);

    // add button to array
    buttons.push(button);
}

// set some silly values...
buttons[0].scale.set(1.2);
buttons[2].rotation = Math.PI / 10;
buttons[3].scale.set(0.8);
buttons[4].scale.set(0.8,1.2);
buttons[4].rotation = Math.PI;

function onButtonDown() {
    this.isdown = true;
    this.texture = textureButtonDown;
    this.alpha = 1;
}

function onButtonUp() {
    this.isdown = false;
    if (this.isOver) {
        this.texture = textureButtonOver;
    }
    else {
        this.texture = textureButton;
    }
}

function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
    this.texture = textureButtonOver;
}

function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = textureButton;
}
