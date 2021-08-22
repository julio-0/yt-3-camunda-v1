const { Client, logger } = require('camunda-external-task-client-js');

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger, asyncResponseTimeout: 20000 };
const client = new Client(config);

const transcription = require('./src/transcription');
const synthesize = require('./src/synthesize');

client.subscribe('yt03_speech_to_text', async function({ task, taskService }){
    await taskService.extendLock(task, 300000);
    console.log('iniciando ', task.activityId);

    await transcription();

    await taskService.complete(task);

});
client.subscribe('yt03_text_to_speech', async function({ task, taskService }){
    await taskService.extendLock(task, 300000);
    console.log('iniciando ', task.activityId);

    await synthesize();

    await taskService.complete(task);
});
    
