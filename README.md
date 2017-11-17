# MValid
依赖框架
jquery

JQUERY 验证表单扩展插件

用法

1.表单用法

$("#reg_form").MValid({
        type:'form', //类型 form 表单 button 按钮 ，只支持两种类型
        desc:{
            mobile:{
                required:'请输入手机号',
                pattern:{
                    type:'mobile',   //同时配置type和rule，默认会选择自定义rule规则
                    /*rule: /^0?1[3|4|5|8][0-9]\d{8}$/,*/
                    desc:{
                        required : '手机号码格式不正确',
                    }
                }
            }
        },
        success:function (event,obj,options) {
            //回调 event 元素jquery对象 , obj 元素原生对象 ,options 参数
        }
}

2.按钮用法
$("#sendmsg").MValid({
        type:'form', //类型 form 表单 button 按钮 ，只支持两种类型
        form:'#reg_form',//验证表单名字 ，如果 type 类型是form ，则不用配置
        desc:{
            mobile:{
                required:'请输入手机号',
                pattern:{
                    type:'mobile',   //同时配置type和rule，默认会选择自定义rule规则
                    /*rule: /^0?1[3|4|5|8][0-9]\d{8}$/,*/
                    desc:{
                        required : '手机号码格式不正确',
                    }
                }
            }
        },
        success:function (event,obj,options) {
             //回调 event 元素jquery对象 , obj 元素原生对象 ,options 参数
        }
}
