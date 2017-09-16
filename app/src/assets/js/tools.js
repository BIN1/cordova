/*常用工具列表*/
export default {
    // 去除字符串空格
    _trim(str) {
        return (str.replace(/\s/g, ''));
    },
    // 去除数组空格
    remove_array_space(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (typeof(arr[i]) == "undefined" || arr[i] == "") {
                arr.splice(i, 1);
                i = i - 1;
            }
        }
        return arr;
    },
    /**
     * @param _formattingMoney 金额格式化
     */
    _formattingMoney(num) {
        num = Number(num).toFixed(2);
        var result = [], counter = 0;
        let initNum = num.toString().split('.')[0];
        let fixedNum = num.toString().split('.')[1];
        for (let i = initNum.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(initNum[i]);
            if (!(counter % 3) && i != 0) {
                result.unshift(',');
            }
        }
        result = result.join('');
        return result + '.' + fixedNum;
    }
}