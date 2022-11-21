const { Given, When, Then } = require('cucumber')
const { RunSettings } = require('leanpro.common');
const { Util } = require('leanpro.common');
const { AppModel } = require("leanpro.win");
let notemodel = AppModel.loadModel("I:\\bd\\ct\\AutoPaics\\features\\step_definitions\\model_notepad.tmodel");
let Paicsmodel = AppModel.loadModel("I:\\bd\\ct\\AutoPaics\\features\\step_definitions\\model_Paics.tmodel");
const { Keyboard, Mouse } = require('leanpro.common');



Then("点击{string}", async function (arg1) {

    return 'pending';
});