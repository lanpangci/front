//上传控件选择，避免使用太多if else 违反开闭原则
//将上传控件都抽离成函数，遍历这些函数，返回true的时候，终止遍历  

const get1Obj = () => {
    try {
        return new ActiveXObject()
    }catch(e) {
        return false
    }
}
const get2Obj = () => {
    try {
        return new ActiveXObject()
    }catch(e) {
        return false
    }
}
const get3Obj = () => {
    try {
        return new ActiveXObject()
    }catch(e) {
        return false
    }
}

if(get1Obj()) {
    return get1Obj()
}else if(get2Obj()) {
    return get2Obj()
}else if(get3Obj()) {
    return get3Obj()
}

const iteratorUploadObj = function() {
    for(let i = 0, fn; fn = arguments[i]; ) {
        const uploadObj = fn()
        if(uploadObj) {
            return uploadObj
        }
    }
}