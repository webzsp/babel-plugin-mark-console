/**
 * @author zsp
 * @date 2021/1/23 16:36
 * @description
 */
const _path=require('path');
function markConsoleByFileName({types:t},state) {
    return {
        visitor: {
            Identifier(path) {
                if(path.node.name!=='console'){
                    return
                }
                let callExpress=  path.findParent((path) => {
                    return path.isCallExpression()
                });
                if(!callExpress){
                    return;
                }
                callExpress.node.arguments.unshift(t.stringLiteral(_path.basename(this.file.opts.filename)+':'));
            },
        },
    };
}
module.exports=markConsoleByFileName;
