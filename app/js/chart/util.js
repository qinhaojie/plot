var util = {

    /**
     * 2点之间的距离
     * @param x0
     * @param y0
     * @param x1
     * @param y1
     * @returns {number}
     */
    distance: function ([x0,y0], [x1,y1]) {
        return Math.sqrt(
            Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2)
        )
    },

    /**
     * 近似到几位小数
     * @param number
     * @param approximate
     * @returns {number}
     */
    approximate: function (number, approximate) {
        approximate = approximate ? approximate : 2;
        var x = Math.pow(10, approximate)
        return Math.ceil(number * x) / x
    },
    
    uniqueId :(function () {
       let i = new Date().getTime(); 
       return function () {
           return i++;
       }
    }())

}

export default util;