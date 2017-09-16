/*常用正则列表*/
export default {
    //手机号码规则验证
    _regPhone(tel) {
        let reg = /^1\d{10}$/;
        if (!reg.test(tel)) {
            return false
        } else {
            return true;
        }
    },
    // 验证固话
    _regFixedTelephone(tel){
        let reg =/^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
        if(reg.test(tel)){
            return true;
        }else{
            return false;
        }
    },
    // 密码验证规则
    _regPassword(string) {
        let reg = /^[a-zA-Z0-9_]{6,16}$/;
        if (!reg.test(string)) {
            return false
        } else {
            return true;
        }
    },
    // 验证四位数字
    _regFourNumber(string){
        let reg = /^[0-9]{4}$/;
        if (!reg.test(string)) {
            return false
        } else {
            return true;
        }
    },
    // 验证6位数字
    _regSixNumber(string){
        let reg = /^[0-9]{6}$/;
        if (!reg.test(string)) {
            return false
        } else {
            return true;
        }
    },
    //验证身份证号码
    _regIcode(icode){
        let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if(!reg.test(icode)){
            return false;
        }else{
            // 18位身份证需要验证最后一位校验码
            if(icode.length==18){
                icode=icode.split('');
                // 加权因子
                let factor=[7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                // 校验码
                let parity=[1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
                let sun=0,ai=0,wi=0;
                for(let i=0;i<17;i++){
                    ai=icode[i];
                    wi=factor[i];
                    sun+=ai*wi;
                }
                let last=parity[sun%11];
                if(parity[sun%11]!=icode[17]){
                    return false;
                }
            }
            return true;
        }
    }
}