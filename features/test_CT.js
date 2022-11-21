const { RunSettings } = require('leanpro.common');
const { Util } = require('leanpro.common');
const { AppModel } = require("leanpro.win");
let notemodel = AppModel.loadModel("E:\\ct\\AutoPaics\\features\\step_definitions\\model_notepad.tmodel");
let Paicsmodel = AppModel.loadModel("E:\\ct\\AutoPaics\\features\\step_definitions\\model_Paics.tmodel");
let ctmodel = AppModel.loadModel("E:\\ct\\AutoPaics\\features\\step_definitions\\model_CT.tmodel");
const { Keyboard, Mouse } = require('leanpro.common');

//执行CT脚本
async function ctrun() {
    //输出栏中出现运行结果包含下面内容
    let outputMessageBox = await window.$(selectors["输出栏"]);
    let outputMessage = await outputMessageBox.innerText();
    let result = assert.equal(outputMessage.indexOf(docString) > 0, true, "许可证");
    await Util.delay(1000);//等待1s
    if(result){
        let pattern_start = await ctmodel.getPattern("pattern_start").locate();//定位运行按钮是否存在
        pattern_start.click();//点击运行按钮
        await Util.delay(1000);//等待1s
    }
}

//编辑文件（替换数据）
async function noterun(video_path_text1, video_path_text2) {

    await notemodel.getPane("任务栏").click();//点击任务栏
    await notemodel.getToolBar("运行中的应用程序").click();
    await notemodel.getButton("记事本_-_1_个运行窗口").click();//点击任务栏的记事本程序

    await notemodel.getMenuItem("编辑(E)1").click();
    await notemodel.getMenuItem("替换(R)...").click();
    await notemodel.getEdit("查找内容(N):").set(video_path_text1);
    await notemodel.getEdit("替换为(P):").set(video_path_text2);
    await notemodel.getButton("全部替换(A)").click();
    await notemodel.getButton("关闭").click();

    await notemodel.getMenu("文件(F)").click();
    await notemodel.getMenuItem("保存(S)").click();

    console.log("---noterun---", video_path_text1, video_path_text2);

};

//客户端点击B和关闭按钮
async function paicsrun(video_path_text2, video_length) {

    // await Paicsmodel.getPane("任务栏").click();//点击任务栏
    // await Paicsmodel.getToolBar("运行中的应用程序").click();
    // await Paicsmodel.getButton("LPMPAICSClient.exe_-_1_个运行窗口").click();//点击任务栏的LPMPAICSClient程序
    // await Paicsmodel.getPattern("pattern_B").click();//点击B按钮进行实时分析

    // await Util.delay(video_length); //强制性等待视频的时长
    // target = await Paicsmodel.getPattern("pattern_close"); //定义关闭按钮变量为target
    // while (1) {
    //     try {
    //         await target.exists(); //判断关闭按钮是否存在
    //         console.log('---pattern_close exist---')
    //         await target.click();//点击关闭按钮
    //         break;
    //     } catch (err) {
    //         await Util.delay(2000);//继续强制性等待2s
    //     }
    // }
    // await Util.delay(1000); //强制性等待1s

    // //Windows徽标键: 作为Windows键盘特有的一个控制键，与Mac的cmd键一样，都可以使用"command"的按键名来使用
    // Keyboard.keyDown('command');
    // Keyboard.keyUp('command');
    // await Util.delay(3000); //强制性等待1s

    console.log("---paicsrun---", video_path_text2, video_length);
};

async function run() {
    //读取数据
    let filename = await Util.loadCsvFile('../video.csv');
    let filename_length = filename.length;
    console.log(filename_length);//输出文件时长
    //console.log(filename);//输出文件名

    let i = 0;//视频文件索引
    let video_path_text1 = filename[i].video_name;//查找数据框的数据
    let video_path_text2 = filename[i + 1].video_name;//替换数据库的数据
    let video_length = filename[i].video_length;//视频的时长

    await paicsrun(video_path_text1, video_length);//i=0时，客户端执行实时检查操作，无需替换，i>0,先替换再执行

    while (video_path_text2) {
        try {
            i++;
            video_path_text1 = filename[i - 1].video_name;
            video_path_text2 = filename[i].video_name;
            video_length = filename[i].video_length;
            await noterun(video_path_text1, video_path_text2);//记事本执行文件名替换操作
            //await paicsrun(video_path_text2, video_length);//客户端执行实时检查操作
            await ctrun();//ct检查是否超出免费用量，如果超出点击开始执行脚本按钮
        } catch (err) {
            console.log('---', err, '---');
            break;
        }
    }
};

run();