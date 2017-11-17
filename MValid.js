/**
 * @desc: 表单验证插件
 * @author: 牧尘
 * @qq: 403219353
 */
$.fn.MValid = function(options) {

    var MValid = this;
    var data_array = new Array();

    /**
     * 表单
     */
    this.form = function (_form,_options) {
        //提交表单事件
        var form = _form;
        var options = _options;
        this.on('submit',function (event) {
            var form_list = form.serializeArray();
            MValid.main(form,form_list,options);
            event.preventDefault();
        });
    };

    /**
     * 按钮
     */
    this.button = function (_options) {
        //点击事件
        var options = _options;
        this.on('click',function (event) {
            var form = $(options.form);
            var form_list = form.serializeArray();
            MValid.main(form,form_list,options);
        });
    };

    /**
     * 判断流程处理 默认表单
     */
    switch (options.type){
        case 'form':
            var $form=$(this);
            this.form($form,options);
            break;
        case 'button':
            this.button(options);
            break;
        default:
            var $form=$(this);
            this.form($form,options);
            break;
    }


    /**
     * 主流程处理
     */
    this.main = function (form,form_list,options) {
        for(var i = 0 ;i< form_list.length;i++){
            var filed_name = form_list[i].name;
            if(Util.is_undefined(filed_name) === false && Util.is_undefined(options.desc) === false){
                var filed = form.find("[name="+filed_name+"]");
                var data_required = filed.attr("data-required");
                var data_desc = filed.attr("data-desc");
                if(Util.is_undefined(filed) === false && Util.is_undefined(data_desc) === false && Util.is_undefined(data_required) === false && Boolean(data_required)){
                    var val = filed.val();
                    var obj = new Object();

                    /**
                     * 判断是否配置该值
                     */
                    if(Util.is_undefined(options.desc[data_desc])){
                        continue;
                    }

                    /**
                     * 验证是否为空
                     */
                    if(Util.is_empty(val) && Util.is_undefined(options.desc[data_desc]['required']) === false){
                        var required =  options.desc[data_desc]['required'];
                        Toast.show(required);
                        return false;
                    }

                    //存储输入的数据
                    obj.name = data_desc;
                    obj.value = val;
                    data_array[data_desc] = obj;

                    /**
                     * 验证正则
                     */
                    if(Util.is_undefined(options.desc[data_desc]['pattern']) === false){

                        var pattern = options.desc[data_desc]['pattern'];


                        if( (Util.is_undefined(pattern['type']) === false && Util.is_undefined(pattern['rule']) === false)
                            || (Util.is_undefined(pattern['rule']) === false)
                        ){
                            pattern_rule = pattern['rule'];
                        }else if(Util.is_undefined(pattern['type']) === false){
                            var ret = Util.pattern(pattern['type']);
                            pattern_rule = ret.rule;
                        }

                        if( Util.is_undefined(pattern['desc']['required']) === false){
                            var rule = val.match(pattern_rule);

                            if(Util.is_null(rule)){
                                Toast.show(pattern['desc']['required']);
                                return false;
                            }
                        }
                    }

                    /**
                     * 验证两个值是否相等
                     */
                    if(Util.is_undefined(options.desc[data_desc]['compare']) === false){
                        var compare = options.desc[data_desc]['compare'];
                        if(Util.is_undefined(compare['field_desc']) === false &&  Util.is_undefined(data_array[compare['field_desc']]) === false){
                            var field_desc = compare['field_desc'];
                            if(Util.is_undefined(compare['required']) === false && data_array[field_desc].value != data_array[data_desc].value){
                                Toast.show(compare['required']);
                                return false;
                            }
                        }
                    }

                }
            }
        }

        //成功处理 MValid JQUERY 对象  MValid[0] JS原生对象
        options.success(MValid,MValid[0],data_array);
    };


    this.errormsg = function (code) {
        var errormsg = new Array();
        var options = new Object();
        errormsg[-1000] = '参数不全';
        options.code = code;
        options.message = errormsg[code];
        return options;
    };


}

/**
 * 工具包
 * @type {{is_empty, is_undefined, is_null}}
 */
var Util=(function () {

    /**
     * 是否是空值
     * @param str
     * @returns {boolean}
     */
    function is_empty(val) {
        if( val.length == 0 ) return true;
        return false;
    }

    /**
     * 是否是undefined
     * @param val
     * @returns {boolean}
     */
    function is_undefined(val) {
        if (typeof(val) == "undefined") return true;
        return false;
    }

    /**
     * 是否是null
     * @param val
     * @returns {boolean}
     */
    function is_null(val) {
        if (!val && typeof(val)!="undefined" && val!=0) return true;
        return false;
    }

    /**
     * 获取内置正则
     * @param name
     */
    function pattern(name) {
        var pattern_arr = new Array();
        var pattern_obj = new Object();
        pattern_arr['mobile'] = /^0?1[3|4|5|8][0-9]\d{8}$/; //验证手机
        pattern_obj.name = name;
        pattern_obj.rule = pattern_arr[name];
        return pattern_obj;
    }

    return {
        is_empty : is_empty,
        is_undefined : is_undefined,
        is_null : is_null,
        pattern:pattern,
    }
})();

/**
 * 消息提示
 * @type {{show}}
 */
var Toast=(function(){
    var flag = null;
    function show(text){
        if(!flag){
            var $container=$('<div class="MValid_Toast">'+text+'</div>');
            $container.appendTo($("body"));
            flag = true;
            setTimeout(function(){
                $container.remove();
                flag = false;
            },1000)
        }
    }
    return {
        show:show
    }
})();