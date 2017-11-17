# MValid
依赖框架
jquery

JQUERY 验证表单扩展插件

用法

```html
<form class="reglis" id="reg_form">
    <div>
        <label>手机号</label><input type="tel" name="mobile" id="mobile" data-required="mobile" data-desc="mobile"  maxlength="11" placeholder="请输入手机号">
    </div>
    <div>
        <label>验证码</label><input class="srky" type="number" name="code" id="code"   data-required="code" data-desc="code"  placeholder="请输入验证码">
        <input id="sendmsg" type="button" class="obtain" value="获取验证码" />
    </div>
    <button class="nexts">下一步</button>
</form>
```


<pre>
<code>

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
 });


2.按钮用法
$("#sendmsg").MValid({
        type:'button', //类型 form 表单 button 按钮 ，只支持两种类型
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
 });

</code>
</pre>
