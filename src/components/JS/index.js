import Vue from "vue"
import msgAlert from './msgAlert'

export let msgBox = (function(){
  let defaults ={//默认值
    title:'',
    content:'',
    cancel:'',
    ok:'',
    handleCancel:null,
    handleOk:null
  };

  let myComponent = Vue.extend(msgAlert);

  return (opts) =>{
    for (let attr in opts) {//配置参数
      defaults[attr] = opts[attr]
    }


    let vm = new myComponent({
      el: document.createElement('div'),
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok
      },
      methods: {
        //取消按钮
        handleCancel() {
          //defaults.handleCancel && defaults.handleCancel.bind(this);//this指向问题
          defaults.handleCancel && defaults.handleCancel.call(this);//直接触发
          document.body.removeChild(vm.$el);//删除弹窗
        },
        //切换城市按钮
        handleOk() {
          defaults.handleOk && defaults.handleOk.call(this);
          document.body.removeChild(vm.$el);//删除弹窗
        }
      },

  });
    document.body.appendChild(vm.$el)
  }

})();
