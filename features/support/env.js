//let { setDefaultTimeout } = require('cucumber');
const { BeforeAll, AfterAll, setDefaultTimeout } = require('cucumber');
const cuketest = require('cuketest');

setDefaultTimeout(30 * 1000); //set step timeout to be 30 seconds

//脚本启动前最小化cukeTest窗口，并在运行完成时恢复cukeTest窗口
BeforeAll(async function() {
    await cuketest.minimize();
})

AfterAll(async function() {
    //await cuketest.maximize();
})