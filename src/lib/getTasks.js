
import {
    takeEvery,
    // all,
    // take,
    // put,
    // call,
    // select
} from 'redux-saga/effects';

const getTasks = (modal)=>{
    const tasks = []
    for (const task in modal.effects) {
        if (modal.effects.hasOwnProperty(task)) {
            tasks.push(takeEvery(`${modal.namespace}/${task}`,modal.effects[task]))
        }
    }
    return tasks
}

export default getTasks;