// ==UserScript==
// @name         学习通AI学习助手
// @namespace    https://github.com/March-OwO
// @version      1.2.5
// @author       March
// @description  学习通AI助手，使用AI大语言模型(默认DeepSeek)答题，任务点自动跳转，视频文档全自动。
// @match        *://*.chaoxing.com/*
// @match        *://*.edu.cn/*
// @match        *://*.nbdlib.cn/*
// @match        *://*.hnsyu.net/*
// @match        *://*.gdhkmooc.com/*
// @require      https://cdn.staticfile.org/vue/3.3.4/vue.global.prod.js
// @require      https://cdn.staticfile.org/vue-demi/0.14.0/index.iife.min.js
// @require      https://cdn.staticfile.org/element-plus-icons-vue/2.1.0/global.iife.min.js
// @require      data:application/javascript,window.Vue%3DVue%3B
// @require      https://cdn.staticfile.org/pinia/2.1.6/pinia.iife.prod.js
// @require      https://cdn.staticfile.org/element-plus/2.3.12/index.full.min.js
// @require      https://cdn.staticfile.org/blueimp-md5/2.19.0/js/md5.min.js
// @require      https://cdn.staticfile.org/jquery/3.7.1/jquery.min.js
// @resource     element-plus  https://cdn.staticfile.org/element-plus/2.3.12/index.css
// @resource     ttf           https://www.forestpolice.org/ttf/2.0/table.json
// @connect      api.deepseek.com
// @connect      api.siliconflow.cn
// @connect      openrouter.ai
// @connect      aihubmix.com
// @connect      api.xiaomimimo.com
// @connect      open.bigmodel.cn
// @connect      api.moonshot.cn
// @connect      dashscope.aliyuncs.com
// @connect      api.hunyuan.cloud.tencent.com
// @connect      spark-api-open.xf-yun.com
// @connect      ark.cn-beijing.volces.com
// @connect      qianfan.baidubce.com
// @connect      api.minimaxi.com
// @connect      api.stepfun.com
// @connect      api.baichuan-ai.com
// @connect      api.lingyiwanwu.com
// @connect      api.longcat.chat
// @connect      api.openai.com
// @connect      api.x.ai
// @connect      generativelanguage.googleapis.com
// @connect      localhost
// @connect      127.0.0.1
// @connect      *
//                ↑ 通配：允许调用上面未列出的任意域名（如自建/中转站 API）。
//                  为什么需要它：@connect 属于「安装期元数据」，脚本在运行时无权修改；
//                  所以「在配置页填个域名就自动加白名单」在技术上做不到。
//                  加了 * 之后：配置页「API地址」填任何域名都能用；首次访问新域名时
//                  篡改猴会弹确认框，点「始终允许所有域」即永久放行（或到 篡改猴→本脚本→
//                  设置→用户域白名单 手动填 * 或该域名）。
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const i=document.createElement("style");i.textContent=t,document.head.append(i)})(" .dialog-footer button[data-v-6ed29f7f]:first-child{margin-right:10px}#csbutton[data-v-6ed29f7f]{position:fixed;bottom:20px;right:20px;z-index:99999;width:44px;height:44px;background:rgba(64,158,255,0.25)!important;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(64,158,255,0.4)!important;border-radius:50%!important;color:#fff!important;box-shadow:0 4px 16px rgba(64,158,255,0.2);transition:all .3s;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;overflow:hidden}#csbutton[data-v-6ed29f7f]:hover{background:rgba(64,158,255,0.4)!important;box-shadow:0 6px 22px rgba(64,158,255,0.35);transform:scale(1.06)}#csbutton[data-v-6ed29f7f] svg,#csbutton[data-v-6ed29f7f] i,#csbutton[data-v-6ed29f7f] span{display:none!important}#csbutton[data-v-6ed29f7f]::after{content:'AI';font-weight:700;font-size:16px;font-family:-apple-system,sans-serif;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}#zeokdjg[data-v-c3c6b09f]{position:fixed;left:10px;bottom:50vh;z-index:9999}.question_btn[data-v-c3c6b09f]{width:40px;height:40px;border-radius:5px;margin:5px}.question_div[data-v-c3c6b09f]{height:200px}.question_ti[data-v-c3c6b09f]{margin:10px 0 20px}.cx_log[data-v-c3c6b09f]{margin:2px 0}.status_log[data-v-c3c6b09f]{margin-top:10px}.dialog-footer button[data-v-c3c6b09f]:first-child{margin-right:10px}#csbutton[data-v-c3c6b09f]{position:fixed;bottom:20px;right:20px;z-index:99999;width:44px;height:44px;background:rgba(64,158,255,0.25)!important;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(64,158,255,0.4)!important;border-radius:50%!important;color:#fff!important;box-shadow:0 4px 16px rgba(64,158,255,0.2);transition:all .3s;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;overflow:hidden}#csbutton[data-v-c3c6b09f]:hover{background:rgba(64,158,255,0.4)!important;box-shadow:0 6px 22px rgba(64,158,255,0.35);transform:scale(1.06)}#csbutton[data-v-c3c6b09f] svg,#csbutton[data-v-c3c6b09f] i,#csbutton[data-v-c3c6b09f] span{display:none!important}#csbutton[data-v-c3c6b09f]::after{content:'AI';font-weight:700;font-size:16px;font-family:-apple-system,sans-serif;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.el-empty__image{display:none}.el-empty::before{content:'';display:block;width:32px;height:32px;margin:0 auto 8px;border:2px solid rgba(64,158,255,0.3);border-top-color:rgba(64,158,255,0.6);border-radius:50%;animation:cx-spin 1.5s linear infinite}@keyframes cx-spin{to{transform:rotate(360deg)}}.demo-tabs .el-tabs__nav-wrap::after{display:none}.demo-tabs .el-tabs__nav{display:flex!important;justify-content:space-evenly}.demo-tabs .el-tabs__item{flex:1;text-align:center;padding:0 8px!important}.el-button--primary{--el-button-hover-bg-color:var(--el-color-primary)!important;--el-button-hover-border-color:var(--el-color-primary)!important;--el-button-hover-text-color:#fff!important}.el-button.el-button--primary:hover,.el-button.el-button--primary:focus,.el-button.el-button--primary:active{background-color:var(--el-color-primary)!important;border-color:var(--el-color-primary)!important;color:#fff!important;box-shadow:none!important;transition:none!important}.el-dialog,#zeokdjg{user-select:none;-webkit-user-select:none} ");

(async function (vue, pinia$1, ElementPlus, md5, $$1) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  ((e) => {
    const t = GM_getResourceText(e);
    GM_addStyle(t);
  })("element-plus");
  var _GM_getResourceText = (() => "undefined" != typeof GM_getResourceText ? GM_getResourceText : void 0)(), _GM_getValue = (() => "undefined" != typeof GM_getValue ? GM_getValue : void 0)(), _GM_info = (() => "undefined" != typeof GM_info ? GM_info : void 0)(), _GM_setValue = (() => "undefined" != typeof GM_setValue ? GM_setValue : void 0)(), _GM_xmlhttpRequest = (() => "undefined" != typeof GM_xmlhttpRequest ? GM_xmlhttpRequest : void 0)(), _unsafeWindow = (() => "undefined" != typeof unsafeWindow ? unsafeWindow : void 0)();
  const getConfig = () => {
    const config = _GM_getValue("config");
    return config || defaultConfig$1;
  }, defaultConfig$1 = { debugger: false, autoAnswer: true, autoVideo: true, autoJump: true, autoSubmit: true, thtoken: "", aiApiUrl: "", aiModel: "", interval: 5, answerInterval: 5, autoExam: true }, userConfig = [{ name: "base", label: "接口配置", config: [ { name: "thtoken", label: "API Key", type: "input", value: defaultConfig$1.thtoken, desc: "保存在本地，不会泄露" }, { name: "aiApiUrl", label: "API地址", type: "input", value: defaultConfig$1.aiApiUrl, desc: "留空默认 DeepSeek；支持任意厂商/自建/中转站域名——本脚本已声明 @connect *，首次请求新域名时请在篡改猴弹框点『始终允许所有域』即可永久放行" }, { name: "aiModel", label: "模型名称", type: "input", value: defaultConfig$1.aiModel, desc: "留空默认 deepseek-v4-flash" }] }, { name: "chapter", label: "章节配置", config: [{ name: "autoAnswer", label: "自动答题", type: "switch", value: defaultConfig$1.autoAnswer, desc: "开启后，会自动答题" }, { name: "autoVideo", label: "自动视频", type: "switch", value: defaultConfig$1.autoVideo, desc: "开启后，会自动观看视频" }, { name: "autoJump", label: "自动切换", type: "switch", value: defaultConfig$1.autoVideo, desc: "开启后，会自动切换章节" }, { name: "autoSubmit", label: "自动提交", type: "switch", value: defaultConfig$1.autoSubmit, desc: "开启后，会自动提交答案" }] }, { name: "exam", label: "考试配置", config: [{ name: "autoExam", label: "考试自动切换", type: "switch", value: defaultConfig$1.autoExam, desc: "开启后，考试会自动切换" }] }], useformStore = pinia$1.defineStore({ id: "formstore", state: () => ({ forminput: getConfig(), dialogV: false, activeName: "base" }), actions: { saveConfig(forminput) {
    _GM_setValue("config", forminput);
  } } });
  var export_helper_default = (sfc, props) => {
    let target = sfc.__vccOpts || sfc;
    for (let [key, val] of props)
      target[key] = val;
    return target;
  }, aim_vue_vue_type_script_lang_default = { name: "Aim" }, _hoisted_12$1 = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" }, _hoisted_42 = [vue.createElementVNode("path", { fill: "currentColor", d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z" }, null, -1), vue.createElementVNode("path", { fill: "currentColor", d: "M512 96a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V128a32 32 0 0 1 32-32zm0 576a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V704a32 32 0 0 1 32-32zM96 512a32 32 0 0 1 32-32h192a32 32 0 0 1 0 64H128a32 32 0 0 1-32-32zm576 0a32 32 0 0 1 32-32h192a32 32 0 1 1 0 64H704a32 32 0 0 1-32-32z" }, null, -1)];
  var aim_default = export_helper_default(aim_vue_vue_type_script_lang_default, [["render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_12$1, _hoisted_42);
  }], ["__file", "aim.vue"]]), setting_vue_vue_type_script_lang_default = { name: "Setting" }, _hoisted_1231 = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024" }, _hoisted_3230 = [vue.createElementVNode("path", { fill: "currentColor", d: "M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z" }, null, -1)];
  var setting_default = export_helper_default(setting_vue_vue_type_script_lang_default, [["render", function(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1231, _hoisted_3230);
  }], ["__file", "setting.vue"]]);
  const _sfc_main$1 = vue.defineComponent({ components: {}, setup() {
    const formstoreObj = useformStore(), { forminput, dialogV, activeName } = pinia$1.storeToRefs(formstoreObj), ruleFormRef = vue.ref(), rules = vue.reactive({ interval: [{ required: true, message: "间隔时间不能为空" }, { type: "number", message: "间隔时间必须为数字" }, { validator: (rule, value) => value >= 1 ? Promise.resolve() : Promise.reject("间隔时间必须大于等于1") }], answerInterval: [{ required: true, message: "答题间隔不能为空" }, { type: "number", message: "答题间隔必须为数字" }, { validator: (rule, value) => value >= 1 ? Promise.resolve() : Promise.reject("答题间隔必须大于等于1") }], token: [{ validator: (rule, value) => {
      if (value) {
        return /^[a-zA-Z0-9]{6,}$/.test(value) ? Promise.resolve() : Promise.reject("token格式错误");
      }
      return Promise.resolve();
    } }] });
    return { dialogV, activeName, ruleFormRef, forminput, rules, submitForm: async (formEl) => {
      formEl && await formEl.validate((valid, fields) => {
        valid && (formstoreObj.saveConfig(forminput.value), ElementPlus.ElNotification({ title: "Success", message: "配置保存成功,请自行刷新页面", type: "success" }), dialogV.value = false);
      });
    }, userConfig, Setting: setting_default };
  } }), _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props)
      target[key] = val;
    return target;
  }, _hoisted_1$1 = { class: "dialog-footer" };
  const App = _export_sfc(_sfc_main$1, [["render", function(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_el_button = vue.resolveComponent("el-button"), _component_el_switch = vue.resolveComponent("el-switch"), _component_el_input = vue.resolveComponent("el-input"), _component_el_input_number = vue.resolveComponent("el-input-number"), _component_el_option = vue.resolveComponent("el-option"), _component_el_select = vue.resolveComponent("el-select"), _component_el_checkbox = vue.resolveComponent("el-checkbox"), _component_el_checkbox_group = vue.resolveComponent("el-checkbox-group"), _component_el_tooltip = vue.resolveComponent("el-tooltip"), _component_el_form_item = vue.resolveComponent("el-form-item"), _component_el_tab_pane = vue.resolveComponent("el-tab-pane"), _component_el_tabs = vue.resolveComponent("el-tabs"), _component_el_form = vue.resolveComponent("el-form"), _component_el_dialog = vue.resolveComponent("el-dialog");
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [vue.createVNode(_component_el_button, { type: "danger", id: "csbutton", icon: _ctx.Setting, circle: "", onClick: _cache[0] || (_cache[0] = ($event) => { const s = _unsafeWindow._askStore; if (s) s.dialogVisible = !s.dialogVisible; else _ctx.dialogV = !_ctx.dialogV; }) }, null, 8, ["icon"]), vue.createVNode(_component_el_dialog, { modelValue: _ctx.dialogV, "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.dialogV = $event), title: "学习通AI学习助手", width: "30%", modal: false, center: "", draggable: "" }, { footer: vue.withCtx(() => [vue.createElementVNode("span", _hoisted_1$1, [vue.createVNode(_component_el_button, { onClick: _cache[2] || (_cache[2] = ($event) => _ctx.dialogV = false) }, { default: vue.withCtx(() => [vue.createTextVNode("取消")]), _: 1 }), vue.createVNode(_component_el_button, { type: "primary", onClick: _cache[3] || (_cache[3] = ($event) => _ctx.submitForm(_ctx.ruleFormRef)) }, { default: vue.withCtx(() => [vue.createTextVNode("保存")]), _: 1 })])]), default: vue.withCtx(() => [vue.createVNode(_component_el_form, { ref: "ruleFormRef", rules: _ctx.rules, model: _ctx.forminput, class: "demo-ruleForm" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_tabs, { class: "demo-tabs", modelValue: _ctx.activeName, "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.activeName = $event) }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.userConfig, (item) => (vue.openBlock(), vue.createBlock(_component_el_tab_pane, { key: item.name, label: item.label, name: item.name }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.config, (item1) => (vue.openBlock(), vue.createBlock(_component_el_form_item, { label: item1.label, prop: item1.name }, { default: vue.withCtx(() => [vue.createVNode(_component_el_tooltip, { class: "box-item", effect: "dark", content: item1.desc || "", placement: "top" }, { default: vue.withCtx(() => ["switch" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_switch, { key: 0, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, null, 8, ["modelValue", "onUpdate:modelValue"])) : "input" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_input, { key: 1, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, null, 8, ["modelValue", "onUpdate:modelValue"])) : "number" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_input_number, { key: 2, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, null, 8, ["modelValue", "onUpdate:modelValue"])) : "select" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_select, { key: 3, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event, placeholder: "请选择" }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item1.options, (item2) => (vue.openBlock(), vue.createBlock(_component_el_option, { key: item2.value, label: item2.label, value: item2.value }, null, 8, ["label", "value"]))), 128))]), _: 2 }, 1032, ["modelValue", "onUpdate:modelValue"])) : "checkbox" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_checkbox_group, { key: 4, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item1.options, (item2) => (vue.openBlock(), vue.createBlock(_component_el_checkbox, { key: item2.value, label: item2.value, name: item2.value }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(item2.label), 1)]), _: 2 }, 1032, ["label", "name"]))), 128))]), _: 2 }, 1032, ["modelValue", "onUpdate:modelValue"])) : vue.createCommentVNode("", true)]), _: 2 }, 1032, ["content"])]), _: 2 }, 1032, ["label", "prop"]))), 256))]), _: 2 }, 1032, ["label", "name"]))), 128))]), _: 1 }, 8, ["modelValue"])]), _: 1 }, 8, ["rules", "model"])]), _: 1 }, 8, ["modelValue"])], 64);
  }], ["__scopeId", "data-v-6ed29f7f"]]);
  let defaultConfig = getConfig();
  class ServerApi {
    constructor(window2 = _unsafeWindow) {
      this.windowz = window2 || _unsafeWindow;
    }
    // ===== AI 答案获取 =====
    async getAnswer(questionData) { return this.getAIAnswer(questionData); }

    async getAIAnswer(questionData) {
      defaultConfig = getConfig(); // 每次都重新读取最新配置（用户可能已更新 API Key）
      const apiKey = defaultConfig.thtoken || "";
      // 支持多提供商：默认 DeepSeek V4 Flash，也可通过配置指定其他兼容端点
      const apiUrl = defaultConfig.aiApiUrl || "https://api.deepseek.com/v1/chat/completions";
      const model = defaultConfig.aiModel || "deepseek-v4-flash";
      const q = (questionData.question || "").toString().trim();
      const type = parseInt(questionData.type);
      const options = questionData.options || [];
      const optionsText = options.length > 0
        ? options.map((o, i) => String.fromCharCode(65 + i) + ". " + o).join("\n")
        : "";
      console.log("[AI答题] 第", (window._aiQIdx||0)+1, "题, 类型:", type, "题目:", q.substring(0, 80));

      // 根据题型构造不同的 system prompt
      let sysPrompt = "";
      let userPrompt = q;
      switch (type) {
        case 0:
          sysPrompt = "你是超星学习通答题助手。请仔细阅读题目和选项，选出唯一正确答案。只输出选项字母（如 A），不要输出任何解释、标点或多余文字。";
          userPrompt = optionsText ? `${q}\n\n选项：\n${optionsText}\n\n请输出正确答案的字母。` : q;
          break;
        case 1:
          sysPrompt = "你是超星学习通答题助手。请仔细阅读题目和选项，选出所有正确答案。只输出选项字母（如 ABD 或 ABCD），不要输出任何解释、标点或多余文字。";
          userPrompt = optionsText ? `${q}\n\n选项：\n${optionsText}\n\n请输出所有正确答案的字母。` : q;
          break;
        case 2:
          sysPrompt = "你是超星学习通答题助手。请根据题目填写空白处。如果有多个空，答案之间用 # 分隔。只输出答案内容，不要任何解释。";
          userPrompt = `${q}\n\n请输出填空答案，多个空用 # 分隔。`;
          break;
        case 3:
          sysPrompt = "你是超星学习通答题助手。请判断题目说法是否正确。只输出一个字：「正确」或「错误」，不要任何解释。";
          userPrompt = `${q}\n\n请判断对错。`;
          break;
        case 4: case 5: case 6: case 7:
          sysPrompt = "你是超星学习通答题助手。简洁准确地回答问题，控制在200字以内。禁止使用Markdown格式（不要用**加粗**、- 列表、* 斜体等标记），直接输出纯文本答案要点。";
          userPrompt = `${q}\n\n请简要回答，不要使用任何格式标记。`;
          break;
        default:
          sysPrompt = "你是超星学习通答题助手。请简洁准确地回答题目。只输出答案，不要多余解释。";
      }

      if (!q) return { form: "AI", answer: "", num: "", usenum: "" };
      if (!apiKey) { console.warn("[AI答题] API Key 为空"); return { form: "AI", answer: "", num: "", usenum: "" }; }

      // 重试循环：最多 3 次，指数退避 2/4/6 秒，429 额外等待 10 秒
      const MAX_RETRIES = 3;
      let lastError = null;
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const result = await this._callAI(apiUrl, apiKey, model, sysPrompt, userPrompt, type, options);
          if (result.retry === true) {
            // 429 或超时，需要重试
            const waitSec = result.is429 ? 10 + attempt * 3 : attempt * 2;
            console.warn("[AI答题] 第" + attempt + "次尝试失败" + (result.is429 ? "(429限流)" : "(超时)") + "，" + waitSec + "秒后重试...");
            await new Promise(r => setTimeout(r, waitSec * 1000));
            lastError = result.reason;
            continue;
          }
          // 成功
          return result;
        } catch (e) {
          console.warn("[AI答题] 第" + attempt + "次尝试异常:", e);
          lastError = e;
          if (attempt < MAX_RETRIES) await new Promise(r => setTimeout(r, attempt * 2000));
        }
      }
      console.error("[AI答题] " + MAX_RETRIES + "次重试全部失败:", lastError);
      return { form: "AI", answer: "", num: "", usenum: "" };
    }

    // 内部方法：发起单次 AI API 调用
    _callAI(apiUrl, apiKey, model, sysPrompt, userPrompt, type, options) {
      return new Promise((resolve) => {
        _GM_xmlhttpRequest({
          method: "POST",
          url: apiUrl,
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
          data: JSON.stringify({ model, stream: false, messages: [{ role: "system", content: sysPrompt }, { role: "user", content: userPrompt }], temperature: 0.1, max_tokens: 500 }),
          timeout: 20000, // 降低到20秒，更快触发重试
          onload: (res) => {
            console.log("[AI答题] HTTP", res.status, "长度", (res.responseText||"").length);
            if (res.status === 429 || res.status >= 500) {
              resolve({ retry: true, is429: true, reason: "HTTP " + res.status + " 服务器过载" });
              return;
            }
            if (res.status !== 200) {
              console.error("[AI答题] 错误响应:", res.status, (res.responseText||"").substring(0, 200));
              // 非429错误直接放弃（如401密钥错误等）
              if (res.status === 401 || res.status === 403) {
                resolve({ form: "AI", answer: "", num: "", usenum: "" });
                return;
              }
              resolve({ retry: true, is429: false, reason: "HTTP " + res.status });
              return;
            }
            try {
              const j = JSON.parse(res.responseText);
              let ans = (j.choices && j.choices[0].message.content || "").trim();
              // 去除推理模型（DeepSeek-R1 / 思考模式等）残留的思维链标签及其内容，
              // 否则思维链里的英文字母(A/B/C/D)会被误当作选项，导致答案错误或为空
              ans = ans.replace(/[\s\S]*?<\/think>/gi, "").replace(/<\/?(?:think|thinking|reasoning)>/gi, "").trim();
              console.log("[AI答题] 原始返回:", ans);
              // 选择题：字母 → 选项文本映射（matchAnswer 做文本精确匹配）
              if (type === 0) {
                ans = (ans.match(/[A-Da-d]/) || [])[0] || ans;
                ans = ans.toUpperCase();
                const idx = ans.charCodeAt(0) - 65;
                if (idx >= 0 && idx < options.length) {
                  console.log("[AI答题] 单选 " + ans + " → 选项文本:", options[idx]);
                  ans = options[idx];
                }
              } else if (type === 1) {
                const letters = (ans.match(/[A-Da-d]+/g) || []).join("").toUpperCase();
                const uniq = [...new Set(letters.split(""))].filter(c => c >= "A" && c <= "D").sort().join("");
                if (uniq) {
                  const texts = uniq.split("").map(c => { const idx = c.charCodeAt(0) - 65; return (idx >= 0 && idx < options.length) ? options[idx] : c; });
                  console.log("[AI答题] 多选 " + uniq + " → 选项文本:", texts.join(", "));
                  ans = texts;
                } else {
                  // 兼容部分模型直接返回选项文本的情况：按分隔符切分后交给文本精确匹配
                  const parts = ans.split(/[，,、;；\n]|\s{2,}/).map(s => s.replace(/^[A-Da-d][\.、\)．]\s*/, "").trim()).filter(Boolean);
                  console.log("[AI答题] 多选(文本返回) →", parts.join(", "));
                  ans = parts.length ? parts : [ans];
                }
              } else if (type === 3) {
                if (ans.includes("正确")||ans.includes("对")||ans.includes("True")||ans.includes("true")||ans.includes("√")||ans.includes("T")) ans = "正确";
                else ans = "错误";
              }
              if (type === 2 && ans.includes("#")) ans = ans.split("#");
              const usage = j.usage || {};
              const promptTokens = usage.prompt_tokens || 0;
              const completionTokens = usage.completion_tokens || 0;
              const totalTokens = usage.total_tokens || (promptTokens + completionTokens);
              console.log("[AI答题] Token消耗: 输入", promptTokens, "输出", completionTokens, "合计", totalTokens);
              resolve({ form: "AI", answer: ans, num: promptTokens, usenum: completionTokens, totalTokens: totalTokens });
            } catch (e) { resolve({ form: "AI", answer: "", num: "", usenum: "" }); }
          },
          onerror: () => { resolve({ retry: true, is429: false, reason: "网络错误" }); },
          ontimeout: () => { resolve({ retry: true, is429: false, reason: "超时" }); }
        });
      });
    }
  }
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
  }
  var Typr = { parse: function(buff) {
    var bin = Typr._bin, data = new Uint8Array(buff), offset = 0;
    bin.readFixed(data, offset), offset += 4;
    var numTables = bin.readUshort(data, offset);
    offset += 2, bin.readUshort(data, offset), offset += 2, bin.readUshort(data, offset), offset += 2, bin.readUshort(data, offset), offset += 2;
    for (var tags = ["cmap", "head", "hhea", "maxp", "hmtx", "name", "OS/2", "post", "loca", "glyf", "kern", "CFF ", "GPOS", "GSUB", "SVG "], obj = { _data: data }, tabs = {}, i = 0; i < numTables; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4, bin.readUint(data, offset), offset += 4;
      var toffset = bin.readUint(data, offset);
      offset += 4;
      var length = bin.readUint(data, offset);
      offset += 4, tabs[tag] = { offset: toffset, length };
    }
    for (i = 0; i < tags.length; i++) {
      var t = tags[i];
      tabs[t] && (obj[t.trim()] = Typr[t.trim()].parse(data, tabs[t].offset, tabs[t].length, obj));
    }
    return obj;
  }, _tabOffset: function(data, tab) {
    for (var bin = Typr._bin, numTables = bin.readUshort(data, 4), offset = 12, i = 0; i < numTables; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4, bin.readUint(data, offset), offset += 4;
      var toffset = bin.readUint(data, offset);
      if (offset += 4, bin.readUint(data, offset), offset += 4, tag == tab)
        return toffset;
    }
    return 0;
  } };
  Typr._bin = { readFixed: function(data, o) {
    return (data[o] << 8 | data[o + 1]) + (data[o + 2] << 8 | data[o + 3]) / 65540;
  }, readF2dot14: function(data, o) {
    return Typr._bin.readShort(data, o) / 16384;
  }, readInt: function(buff, p) {
    var a = Typr._bin.t.uint8;
    return a[0] = buff[p + 3], a[1] = buff[p + 2], a[2] = buff[p + 1], a[3] = buff[p], Typr._bin.t.int32[0];
  }, readInt8: function(buff, p) {
    return Typr._bin.t.uint8[0] = buff[p], Typr._bin.t.int8[0];
  }, readShort: function(buff, p) {
    var a = Typr._bin.t.uint8;
    return a[1] = buff[p], a[0] = buff[p + 1], Typr._bin.t.int16[0];
  }, readUshort: function(buff, p) {
    return buff[p] << 8 | buff[p + 1];
  }, readUshorts: function(buff, p, len) {
    for (var arr = [], i = 0; i < len; i++)
      arr.push(Typr._bin.readUshort(buff, p + 2 * i));
    return arr;
  }, readUint: function(buff, p) {
    var a = Typr._bin.t.uint8;
    return a[3] = buff[p], a[2] = buff[p + 1], a[1] = buff[p + 2], a[0] = buff[p + 3], Typr._bin.t.uint32[0];
  }, readUint64: function(buff, p) {
    return 4294967296 * Typr._bin.readUint(buff, p) + Typr._bin.readUint(buff, p + 4);
  }, readASCII: function(buff, p, l) {
    for (var s = "", i = 0; i < l; i++)
      s += String.fromCharCode(buff[p + i]);
    return s;
  }, readUnicode: function(buff, p, l) {
    for (var s = "", i = 0; i < l; i++) {
      var c = buff[p++] << 8 | buff[p++];
      s += String.fromCharCode(c);
    }
    return s;
  }, _tdec: window.TextDecoder ? new window.TextDecoder() : null, readUTF8: function(buff, p, l) {
    var tdec = Typr._bin._tdec;
    return tdec && 0 == p && l == buff.length ? tdec.decode(buff) : Typr._bin.readASCII(buff, p, l);
  }, readBytes: function(buff, p, l) {
    for (var arr = [], i = 0; i < l; i++)
      arr.push(buff[p + i]);
    return arr;
  }, readASCIIArray: function(buff, p, l) {
    for (var s = [], i = 0; i < l; i++)
      s.push(String.fromCharCode(buff[p + i]));
    return s;
  } }, Typr._bin.t = { buff: new ArrayBuffer(8) }, Typr._bin.t.int8 = new Int8Array(Typr._bin.t.buff), Typr._bin.t.uint8 = new Uint8Array(Typr._bin.t.buff), Typr._bin.t.int16 = new Int16Array(Typr._bin.t.buff), Typr._bin.t.uint16 = new Uint16Array(Typr._bin.t.buff), Typr._bin.t.int32 = new Int32Array(Typr._bin.t.buff), Typr._bin.t.uint32 = new Uint32Array(Typr._bin.t.buff), Typr._lctf = {}, Typr._lctf.parse = function(data, offset, length, font, subt) {
    var bin = Typr._bin, obj = {}, offset0 = offset;
    bin.readFixed(data, offset), offset += 4;
    var offScriptList = bin.readUshort(data, offset);
    offset += 2;
    var offFeatureList = bin.readUshort(data, offset);
    offset += 2;
    var offLookupList = bin.readUshort(data, offset);
    return offset += 2, obj.scriptList = Typr._lctf.readScriptList(data, offset0 + offScriptList), obj.featureList = Typr._lctf.readFeatureList(data, offset0 + offFeatureList), obj.lookupList = Typr._lctf.readLookupList(data, offset0 + offLookupList, subt), obj;
  }, Typr._lctf.readLookupList = function(data, offset, subt) {
    var bin = Typr._bin, offset0 = offset, obj = [], count = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < count; i++) {
      var noff = bin.readUshort(data, offset);
      offset += 2;
      var lut = Typr._lctf.readLookupTable(data, offset0 + noff, subt);
      obj.push(lut);
    }
    return obj;
  }, Typr._lctf.readLookupTable = function(data, offset, subt) {
    var bin = Typr._bin, offset0 = offset, obj = { tabs: [] };
    obj.ltype = bin.readUshort(data, offset), offset += 2, obj.flag = bin.readUshort(data, offset), offset += 2;
    var cnt = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < cnt; i++) {
      var noff = bin.readUshort(data, offset);
      offset += 2;
      var tab = subt(data, obj.ltype, offset0 + noff);
      obj.tabs.push(tab);
    }
    return obj;
  }, Typr._lctf.numOfOnes = function(n) {
    for (var num = 0, i = 0; i < 32; i++)
      0 != (n >>> i & 1) && num++;
    return num;
  }, Typr._lctf.readClassDef = function(data, offset) {
    var bin = Typr._bin, obj = [], format = bin.readUshort(data, offset);
    if (offset += 2, 1 == format) {
      var startGlyph = bin.readUshort(data, offset);
      offset += 2;
      var glyphCount = bin.readUshort(data, offset);
      offset += 2;
      for (var i = 0; i < glyphCount; i++)
        obj.push(startGlyph + i), obj.push(startGlyph + i), obj.push(bin.readUshort(data, offset)), offset += 2;
    }
    if (2 == format) {
      var count = bin.readUshort(data, offset);
      offset += 2;
      for (i = 0; i < count; i++)
        obj.push(bin.readUshort(data, offset)), offset += 2, obj.push(bin.readUshort(data, offset)), offset += 2, obj.push(bin.readUshort(data, offset)), offset += 2;
    }
    return obj;
  }, Typr._lctf.getInterval = function(tab, val) {
    for (var i = 0; i < tab.length; i += 3) {
      var start = tab[i], end = tab[i + 1];
      if (tab[i + 2], start <= val && val <= end)
        return i;
    }
    return -1;
  }, Typr._lctf.readValueRecord = function(data, offset, valFmt) {
    var bin = Typr._bin, arr = [];
    return arr.push(1 & valFmt ? bin.readShort(data, offset) : 0), offset += 1 & valFmt ? 2 : 0, arr.push(2 & valFmt ? bin.readShort(data, offset) : 0), offset += 2 & valFmt ? 2 : 0, arr.push(4 & valFmt ? bin.readShort(data, offset) : 0), offset += 4 & valFmt ? 2 : 0, arr.push(8 & valFmt ? bin.readShort(data, offset) : 0), offset += 8 & valFmt ? 2 : 0, arr;
  }, Typr._lctf.readCoverage = function(data, offset) {
    var bin = Typr._bin, cvg = {};
    cvg.fmt = bin.readUshort(data, offset), offset += 2;
    var count = bin.readUshort(data, offset);
    return offset += 2, 1 == cvg.fmt && (cvg.tab = bin.readUshorts(data, offset, count)), 2 == cvg.fmt && (cvg.tab = bin.readUshorts(data, offset, 3 * count)), cvg;
  }, Typr._lctf.coverageIndex = function(cvg, val) {
    var tab = cvg.tab;
    if (1 == cvg.fmt)
      return tab.indexOf(val);
    if (2 == cvg.fmt) {
      var ind = Typr._lctf.getInterval(tab, val);
      if (-1 != ind)
        return tab[ind + 2] + (val - tab[ind]);
    }
    return -1;
  }, Typr._lctf.readFeatureList = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, obj = [], count = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < count; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      var noff = bin.readUshort(data, offset);
      offset += 2, obj.push({ tag: tag.trim(), tab: Typr._lctf.readFeatureTable(data, offset0 + noff) });
    }
    return obj;
  }, Typr._lctf.readFeatureTable = function(data, offset) {
    var bin = Typr._bin;
    bin.readUshort(data, offset), offset += 2;
    var lookupCount = bin.readUshort(data, offset);
    offset += 2;
    for (var indices = [], i = 0; i < lookupCount; i++)
      indices.push(bin.readUshort(data, offset + 2 * i));
    return indices;
  }, Typr._lctf.readScriptList = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, obj = {}, count = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < count; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      var noff = bin.readUshort(data, offset);
      offset += 2, obj[tag.trim()] = Typr._lctf.readScriptTable(data, offset0 + noff);
    }
    return obj;
  }, Typr._lctf.readScriptTable = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, obj = {}, defLangSysOff = bin.readUshort(data, offset);
    offset += 2, obj.default = Typr._lctf.readLangSysTable(data, offset0 + defLangSysOff);
    var langSysCount = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < langSysCount; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      var langSysOff = bin.readUshort(data, offset);
      offset += 2, obj[tag.trim()] = Typr._lctf.readLangSysTable(data, offset0 + langSysOff);
    }
    return obj;
  }, Typr._lctf.readLangSysTable = function(data, offset) {
    var bin = Typr._bin, obj = {};
    bin.readUshort(data, offset), offset += 2, obj.reqFeature = bin.readUshort(data, offset), offset += 2;
    var featureCount = bin.readUshort(data, offset);
    return offset += 2, obj.features = bin.readUshorts(data, offset, featureCount), obj;
  }, Typr.CFF = {}, Typr.CFF.parse = function(data, offset, length) {
    var bin = Typr._bin;
    (data = new Uint8Array(data.buffer, offset, length))[offset = 0], data[++offset], data[++offset], data[++offset], offset++;
    var ninds = [];
    offset = Typr.CFF.readIndex(data, offset, ninds);
    for (var names = [], i = 0; i < ninds.length - 1; i++)
      names.push(bin.readASCII(data, offset + ninds[i], ninds[i + 1] - ninds[i]));
    offset += ninds[ninds.length - 1];
    var tdinds = [];
    offset = Typr.CFF.readIndex(data, offset, tdinds);
    var topDicts = [];
    for (i = 0; i < tdinds.length - 1; i++)
      topDicts.push(Typr.CFF.readDict(data, offset + tdinds[i], offset + tdinds[i + 1]));
    offset += tdinds[tdinds.length - 1];
    var topdict = topDicts[0], sinds = [];
    offset = Typr.CFF.readIndex(data, offset, sinds);
    var strings = [];
    for (i = 0; i < sinds.length - 1; i++)
      strings.push(bin.readASCII(data, offset + sinds[i], sinds[i + 1] - sinds[i]));
    if (offset += sinds[sinds.length - 1], Typr.CFF.readSubrs(data, offset, topdict), topdict.CharStrings) {
      offset = topdict.CharStrings;
      sinds = [];
      offset = Typr.CFF.readIndex(data, offset, sinds);
      var cstr = [];
      for (i = 0; i < sinds.length - 1; i++)
        cstr.push(bin.readBytes(data, offset + sinds[i], sinds[i + 1] - sinds[i]));
      topdict.CharStrings = cstr;
    }
    topdict.Encoding && (topdict.Encoding = Typr.CFF.readEncoding(data, topdict.Encoding, topdict.CharStrings.length)), topdict.charset && (topdict.charset = Typr.CFF.readCharset(data, topdict.charset, topdict.CharStrings.length)), topdict.Private && (offset = topdict.Private[1], topdict.Private = Typr.CFF.readDict(data, offset, offset + topdict.Private[0]), topdict.Private.Subrs && Typr.CFF.readSubrs(data, offset + topdict.Private.Subrs, topdict.Private));
    var obj = {};
    for (var p in topdict)
      -1 != ["FamilyName", "FullName", "Notice", "version", "Copyright"].indexOf(p) ? obj[p] = strings[topdict[p] - 426 + 35] : obj[p] = topdict[p];
    return obj;
  }, Typr.CFF.readSubrs = function(data, offset, obj) {
    var bin = Typr._bin, gsubinds = [];
    offset = Typr.CFF.readIndex(data, offset, gsubinds);
    var bias, nSubrs = gsubinds.length;
    bias = nSubrs < 1240 ? 107 : nSubrs < 33900 ? 1131 : 32768, obj.Bias = bias, obj.Subrs = [];
    for (var i = 0; i < gsubinds.length - 1; i++)
      obj.Subrs.push(bin.readBytes(data, offset + gsubinds[i], gsubinds[i + 1] - gsubinds[i]));
  }, Typr.CFF.tableSE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 0, 111, 112, 113, 114, 0, 115, 116, 117, 118, 119, 120, 121, 122, 0, 123, 0, 124, 125, 126, 127, 128, 129, 130, 131, 0, 132, 133, 0, 134, 135, 136, 137, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 138, 0, 139, 0, 0, 0, 0, 140, 141, 142, 143, 0, 0, 0, 0, 0, 144, 0, 0, 0, 145, 0, 0, 146, 147, 148, 149, 0, 0, 0, 0], Typr.CFF.glyphByUnicode = function(cff, code) {
    for (var i = 0; i < cff.charset.length; i++)
      if (cff.charset[i] == code)
        return i;
    return -1;
  }, Typr.CFF.glyphBySE = function(cff, charcode) {
    return charcode < 0 || charcode > 255 ? -1 : Typr.CFF.glyphByUnicode(cff, Typr.CFF.tableSE[charcode]);
  }, Typr.CFF.readEncoding = function(data, offset, num) {
    Typr._bin;
    var array = [".notdef"], format = data[offset];
    if (offset++, 0 != format)
      throw "error: unknown encoding format: " + format;
    var nCodes = data[offset];
    offset++;
    for (var i = 0; i < nCodes; i++)
      array.push(data[offset + i]);
    return array;
  }, Typr.CFF.readCharset = function(data, offset, num) {
    var bin = Typr._bin, charset = [".notdef"], format = data[offset];
    if (offset++, 0 == format)
      for (var i = 0; i < num; i++) {
        var first = bin.readUshort(data, offset);
        offset += 2, charset.push(first);
      }
    else {
      if (1 != format && 2 != format)
        throw "error: format: " + format;
      for (; charset.length < num; ) {
        first = bin.readUshort(data, offset);
        offset += 2;
        var nLeft = 0;
        1 == format ? (nLeft = data[offset], offset++) : (nLeft = bin.readUshort(data, offset), offset += 2);
        for (i = 0; i <= nLeft; i++)
          charset.push(first), first++;
      }
    }
    return charset;
  }, Typr.CFF.readIndex = function(data, offset, inds) {
    var bin = Typr._bin, count = bin.readUshort(data, offset), offsize = data[offset += 2];
    if (offset++, 1 == offsize)
      for (var i = 0; i < count + 1; i++)
        inds.push(data[offset + i]);
    else if (2 == offsize)
      for (i = 0; i < count + 1; i++)
        inds.push(bin.readUshort(data, offset + 2 * i));
    else if (3 == offsize)
      for (i = 0; i < count + 1; i++)
        inds.push(16777215 & bin.readUint(data, offset + 3 * i - 1));
    else if (0 != count)
      throw "unsupported offset size: " + offsize + ", count: " + count;
    return (offset += (count + 1) * offsize) - 1;
  }, Typr.CFF.getCharString = function(data, offset, o) {
    var bin = Typr._bin, b0 = data[offset], b1 = data[offset + 1];
    data[offset + 2], data[offset + 3], data[offset + 4];
    var vs = 1, op = null, val = null;
    b0 <= 20 && (op = b0, vs = 1), 12 == b0 && (op = 100 * b0 + b1, vs = 2), 21 <= b0 && b0 <= 27 && (op = b0, vs = 1), 28 == b0 && (val = bin.readShort(data, offset + 1), vs = 3), 29 <= b0 && b0 <= 31 && (op = b0, vs = 1), 32 <= b0 && b0 <= 246 && (val = b0 - 139, vs = 1), 247 <= b0 && b0 <= 250 && (val = 256 * (b0 - 247) + b1 + 108, vs = 2), 251 <= b0 && b0 <= 254 && (val = 256 * -(b0 - 251) - b1 - 108, vs = 2), 255 == b0 && (val = bin.readInt(data, offset + 1) / 65535, vs = 5), o.val = null != val ? val : "o" + op, o.size = vs;
  }, Typr.CFF.readCharString = function(data, offset, length) {
    for (var end = offset + length, bin = Typr._bin, arr = []; offset < end; ) {
      var b0 = data[offset], b1 = data[offset + 1];
      data[offset + 2], data[offset + 3], data[offset + 4];
      var vs = 1, op = null, val = null;
      b0 <= 20 && (op = b0, vs = 1), 12 == b0 && (op = 100 * b0 + b1, vs = 2), 19 != b0 && 20 != b0 || (op = b0, vs = 2), 21 <= b0 && b0 <= 27 && (op = b0, vs = 1), 28 == b0 && (val = bin.readShort(data, offset + 1), vs = 3), 29 <= b0 && b0 <= 31 && (op = b0, vs = 1), 32 <= b0 && b0 <= 246 && (val = b0 - 139, vs = 1), 247 <= b0 && b0 <= 250 && (val = 256 * (b0 - 247) + b1 + 108, vs = 2), 251 <= b0 && b0 <= 254 && (val = 256 * -(b0 - 251) - b1 - 108, vs = 2), 255 == b0 && (val = bin.readInt(data, offset + 1) / 65535, vs = 5), arr.push(null != val ? val : "o" + op), offset += vs;
    }
    return arr;
  }, Typr.CFF.readDict = function(data, offset, end) {
    for (var bin = Typr._bin, dict = {}, carr = []; offset < end; ) {
      var b0 = data[offset], b1 = data[offset + 1];
      data[offset + 2], data[offset + 3], data[offset + 4];
      var vs = 1, key = null, val = null;
      if (28 == b0 && (val = bin.readShort(data, offset + 1), vs = 3), 29 == b0 && (val = bin.readInt(data, offset + 1), vs = 5), 32 <= b0 && b0 <= 246 && (val = b0 - 139, vs = 1), 247 <= b0 && b0 <= 250 && (val = 256 * (b0 - 247) + b1 + 108, vs = 2), 251 <= b0 && b0 <= 254 && (val = 256 * -(b0 - 251) - b1 - 108, vs = 2), 255 == b0)
        throw val = bin.readInt(data, offset + 1) / 65535, vs = 5, "unknown number";
      if (30 == b0) {
        var nibs = [];
        for (vs = 1; ; ) {
          var b = data[offset + vs];
          vs++;
          var nib0 = b >> 4, nib1 = 15 & b;
          if (15 != nib0 && nibs.push(nib0), 15 != nib1 && nibs.push(nib1), 15 == nib1)
            break;
        }
        for (var s = "", chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "e", "e-", "reserved", "-", "endOfNumber"], i = 0; i < nibs.length; i++)
          s += chars[nibs[i]];
        val = parseFloat(s);
      }
      if (b0 <= 21) {
        if (key = ["version", "Notice", "FullName", "FamilyName", "Weight", "FontBBox", "BlueValues", "OtherBlues", "FamilyBlues", "FamilyOtherBlues", "StdHW", "StdVW", "escape", "UniqueID", "XUID", "charset", "Encoding", "CharStrings", "Private", "Subrs", "defaultWidthX", "nominalWidthX"][b0], vs = 1, 12 == b0)
          key = ["Copyright", "isFixedPitch", "ItalicAngle", "UnderlinePosition", "UnderlineThickness", "PaintType", "CharstringType", "FontMatrix", "StrokeWidth", "BlueScale", "BlueShift", "BlueFuzz", "StemSnapH", "StemSnapV", "ForceBold", 0, 0, "LanguageGroup", "ExpansionFactor", "initialRandomSeed", "SyntheticBase", "PostScript", "BaseFontName", "BaseFontBlend", 0, 0, 0, 0, 0, 0, "ROS", "CIDFontVersion", "CIDFontRevision", "CIDFontType", "CIDCount", "UIDBase", "FDArray", "FDSelect", "FontName"][b1], vs = 2;
      }
      null != key ? (dict[key] = 1 == carr.length ? carr[0] : carr, carr = []) : carr.push(val), offset += vs;
    }
    return dict;
  }, Typr.cmap = {}, Typr.cmap.parse = function(data, offset, length) {
    data = new Uint8Array(data.buffer, offset, length), offset = 0;
    var bin = Typr._bin, obj = {};
    bin.readUshort(data, offset), offset += 2;
    var numTables = bin.readUshort(data, offset);
    offset += 2;
    var offs = [];
    obj.tables = [];
    for (var i = 0; i < numTables; i++) {
      var platformID = bin.readUshort(data, offset);
      offset += 2;
      var encodingID = bin.readUshort(data, offset);
      offset += 2;
      var noffset = bin.readUint(data, offset);
      offset += 4;
      var id = "p" + platformID + "e" + encodingID, tind = offs.indexOf(noffset);
      if (-1 == tind) {
        var subt;
        tind = obj.tables.length, offs.push(noffset);
        var format = bin.readUshort(data, noffset);
        0 == format ? subt = Typr.cmap.parse0(data, noffset) : 4 == format ? subt = Typr.cmap.parse4(data, noffset) : 6 == format ? subt = Typr.cmap.parse6(data, noffset) : 12 == format ? subt = Typr.cmap.parse12(data, noffset) : console.log("unknown format: " + format, platformID, encodingID, noffset), obj.tables.push(subt);
      }
      if (null != obj[id])
        throw "multiple tables for one platform+encoding";
      obj[id] = tind;
    }
    return obj;
  }, Typr.cmap.parse0 = function(data, offset) {
    var bin = Typr._bin, obj = {};
    obj.format = bin.readUshort(data, offset), offset += 2;
    var len = bin.readUshort(data, offset);
    offset += 2, bin.readUshort(data, offset), offset += 2, obj.map = [];
    for (var i = 0; i < len - 6; i++)
      obj.map.push(data[offset + i]);
    return obj;
  }, Typr.cmap.parse4 = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, obj = {};
    obj.format = bin.readUshort(data, offset), offset += 2;
    var length = bin.readUshort(data, offset);
    offset += 2, bin.readUshort(data, offset), offset += 2;
    var segCountX2 = bin.readUshort(data, offset);
    offset += 2;
    var segCount = segCountX2 / 2;
    obj.searchRange = bin.readUshort(data, offset), offset += 2, obj.entrySelector = bin.readUshort(data, offset), offset += 2, obj.rangeShift = bin.readUshort(data, offset), offset += 2, obj.endCount = bin.readUshorts(data, offset, segCount), offset += 2 * segCount, offset += 2, obj.startCount = bin.readUshorts(data, offset, segCount), offset += 2 * segCount, obj.idDelta = [];
    for (var i = 0; i < segCount; i++)
      obj.idDelta.push(bin.readShort(data, offset)), offset += 2;
    for (obj.idRangeOffset = bin.readUshorts(data, offset, segCount), offset += 2 * segCount, obj.glyphIdArray = []; offset < offset0 + length; )
      obj.glyphIdArray.push(bin.readUshort(data, offset)), offset += 2;
    return obj;
  }, Typr.cmap.parse6 = function(data, offset) {
    var bin = Typr._bin, obj = {};
    obj.format = bin.readUshort(data, offset), offset += 2, bin.readUshort(data, offset), offset += 2, bin.readUshort(data, offset), offset += 2, obj.firstCode = bin.readUshort(data, offset), offset += 2;
    var entryCount = bin.readUshort(data, offset);
    offset += 2, obj.glyphIdArray = [];
    for (var i = 0; i < entryCount; i++)
      obj.glyphIdArray.push(bin.readUshort(data, offset)), offset += 2;
    return obj;
  }, Typr.cmap.parse12 = function(data, offset) {
    var bin = Typr._bin, obj = {};
    obj.format = bin.readUshort(data, offset), offset += 2, offset += 2, bin.readUint(data, offset), offset += 4, bin.readUint(data, offset), offset += 4;
    var nGroups = bin.readUint(data, offset);
    offset += 4, obj.groups = [];
    for (var i = 0; i < nGroups; i++) {
      var off = offset + 12 * i, startCharCode = bin.readUint(data, off + 0), endCharCode = bin.readUint(data, off + 4), startGlyphID = bin.readUint(data, off + 8);
      obj.groups.push([startCharCode, endCharCode, startGlyphID]);
    }
    return obj;
  }, Typr.glyf = {}, Typr.glyf.parse = function(data, offset, length, font) {
    for (var obj = [], g = 0; g < font.maxp.numGlyphs; g++)
      obj.push(null);
    return obj;
  }, Typr.glyf._parseGlyf = function(font, g) {
    var bin = Typr._bin, data = font._data, offset = Typr._tabOffset(data, "glyf") + font.loca[g];
    if (font.loca[g] == font.loca[g + 1])
      return null;
    var gl = {};
    if (gl.noc = bin.readShort(data, offset), offset += 2, gl.xMin = bin.readShort(data, offset), offset += 2, gl.yMin = bin.readShort(data, offset), offset += 2, gl.xMax = bin.readShort(data, offset), offset += 2, gl.yMax = bin.readShort(data, offset), offset += 2, gl.xMin >= gl.xMax || gl.yMin >= gl.yMax)
      return null;
    if (gl.noc > 0) {
      gl.endPts = [];
      for (var i = 0; i < gl.noc; i++)
        gl.endPts.push(bin.readUshort(data, offset)), offset += 2;
      var instructionLength = bin.readUshort(data, offset);
      if (offset += 2, data.length - offset < instructionLength)
        return null;
      gl.instructions = bin.readBytes(data, offset, instructionLength), offset += instructionLength;
      var crdnum = gl.endPts[gl.noc - 1] + 1;
      gl.flags = [];
      for (i = 0; i < crdnum; i++) {
        var flag = data[offset];
        if (offset++, gl.flags.push(flag), 0 != (8 & flag)) {
          var rep = data[offset];
          offset++;
          for (var j = 0; j < rep; j++)
            gl.flags.push(flag), i++;
        }
      }
      gl.xs = [];
      for (i = 0; i < crdnum; i++) {
        var i8 = 0 != (2 & gl.flags[i]), same = 0 != (16 & gl.flags[i]);
        i8 ? (gl.xs.push(same ? data[offset] : -data[offset]), offset++) : same ? gl.xs.push(0) : (gl.xs.push(bin.readShort(data, offset)), offset += 2);
      }
      gl.ys = [];
      for (i = 0; i < crdnum; i++) {
        i8 = 0 != (4 & gl.flags[i]), same = 0 != (32 & gl.flags[i]);
        i8 ? (gl.ys.push(same ? data[offset] : -data[offset]), offset++) : same ? gl.ys.push(0) : (gl.ys.push(bin.readShort(data, offset)), offset += 2);
      }
      var x = 0, y = 0;
      for (i = 0; i < crdnum; i++)
        x += gl.xs[i], y += gl.ys[i], gl.xs[i] = x, gl.ys[i] = y;
    } else {
      var flags;
      gl.parts = [];
      do {
        flags = bin.readUshort(data, offset), offset += 2;
        var part = { m: { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }, p1: -1, p2: -1 };
        if (gl.parts.push(part), part.glyphIndex = bin.readUshort(data, offset), offset += 2, 1 & flags) {
          var arg1 = bin.readShort(data, offset);
          offset += 2;
          var arg2 = bin.readShort(data, offset);
          offset += 2;
        } else {
          arg1 = bin.readInt8(data, offset);
          offset++;
          arg2 = bin.readInt8(data, offset);
          offset++;
        }
        2 & flags ? (part.m.tx = arg1, part.m.ty = arg2) : (part.p1 = arg1, part.p2 = arg2), 8 & flags ? (part.m.a = part.m.d = bin.readF2dot14(data, offset), offset += 2) : 64 & flags ? (part.m.a = bin.readF2dot14(data, offset), offset += 2, part.m.d = bin.readF2dot14(data, offset), offset += 2) : 128 & flags && (part.m.a = bin.readF2dot14(data, offset), offset += 2, part.m.b = bin.readF2dot14(data, offset), offset += 2, part.m.c = bin.readF2dot14(data, offset), offset += 2, part.m.d = bin.readF2dot14(data, offset), offset += 2);
      } while (32 & flags);
      if (256 & flags) {
        var numInstr = bin.readUshort(data, offset);
        offset += 2, gl.instr = [];
        for (i = 0; i < numInstr; i++)
          gl.instr.push(data[offset]), offset++;
      }
    }
    return gl;
  }, Typr.GPOS = {}, Typr.GPOS.parse = function(data, offset, length, font) {
    return Typr._lctf.parse(data, offset, length, font, Typr.GPOS.subt);
  }, Typr.GPOS.subt = function(data, ltype, offset) {
    if (2 != ltype)
      return null;
    var bin = Typr._bin, offset0 = offset, tab = {};
    tab.format = bin.readUshort(data, offset), offset += 2;
    var covOff = bin.readUshort(data, offset);
    offset += 2, tab.coverage = Typr._lctf.readCoverage(data, covOff + offset0), tab.valFmt1 = bin.readUshort(data, offset), offset += 2, tab.valFmt2 = bin.readUshort(data, offset), offset += 2;
    var ones1 = Typr._lctf.numOfOnes(tab.valFmt1), ones2 = Typr._lctf.numOfOnes(tab.valFmt2);
    if (1 == tab.format) {
      tab.pairsets = [];
      var count = bin.readUshort(data, offset);
      offset += 2;
      for (var i = 0; i < count; i++) {
        var psoff = bin.readUshort(data, offset);
        offset += 2, psoff += offset0;
        var pvcount = bin.readUshort(data, psoff);
        psoff += 2;
        for (var arr = [], j = 0; j < pvcount; j++) {
          var gid2 = bin.readUshort(data, psoff);
          psoff += 2, 0 != tab.valFmt1 && (value1 = Typr._lctf.readValueRecord(data, psoff, tab.valFmt1), psoff += 2 * ones1), 0 != tab.valFmt2 && (value2 = Typr._lctf.readValueRecord(data, psoff, tab.valFmt2), psoff += 2 * ones2), arr.push({ gid2, val1: value1, val2: value2 });
        }
        tab.pairsets.push(arr);
      }
    }
    if (2 == tab.format) {
      var classDef1 = bin.readUshort(data, offset);
      offset += 2;
      var classDef2 = bin.readUshort(data, offset);
      offset += 2;
      var class1Count = bin.readUshort(data, offset);
      offset += 2;
      var class2Count = bin.readUshort(data, offset);
      offset += 2, tab.classDef1 = Typr._lctf.readClassDef(data, offset0 + classDef1), tab.classDef2 = Typr._lctf.readClassDef(data, offset0 + classDef2), tab.matrix = [];
      for (i = 0; i < class1Count; i++) {
        var row = [];
        for (j = 0; j < class2Count; j++) {
          var value1 = null, value2 = null;
          0 != tab.valFmt1 && (value1 = Typr._lctf.readValueRecord(data, offset, tab.valFmt1), offset += 2 * ones1), 0 != tab.valFmt2 && (value2 = Typr._lctf.readValueRecord(data, offset, tab.valFmt2), offset += 2 * ones2), row.push({ val1: value1, val2: value2 });
        }
        tab.matrix.push(row);
      }
    }
    return tab;
  }, Typr.GSUB = {}, Typr.GSUB.parse = function(data, offset, length, font) {
    return Typr._lctf.parse(data, offset, length, font, Typr.GSUB.subt);
  }, Typr.GSUB.subt = function(data, ltype, offset) {
    var bin = Typr._bin, offset0 = offset, tab = {};
    if (1 != ltype && 4 != ltype && 5 != ltype)
      return null;
    tab.fmt = bin.readUshort(data, offset), offset += 2;
    var covOff = bin.readUshort(data, offset);
    if (offset += 2, tab.coverage = Typr._lctf.readCoverage(data, covOff + offset0), 1 == ltype) {
      if (1 == tab.fmt)
        tab.delta = bin.readShort(data, offset), offset += 2;
      else if (2 == tab.fmt) {
        var cnt = bin.readUshort(data, offset);
        offset += 2, tab.newg = bin.readUshorts(data, offset, cnt), offset += 2 * tab.newg.length;
      }
    } else if (4 == ltype) {
      tab.vals = [];
      cnt = bin.readUshort(data, offset);
      offset += 2;
      for (var i = 0; i < cnt; i++) {
        var loff = bin.readUshort(data, offset);
        offset += 2, tab.vals.push(Typr.GSUB.readLigatureSet(data, offset0 + loff));
      }
    } else if (5 == ltype)
      if (2 == tab.fmt) {
        var cDefOffset = bin.readUshort(data, offset);
        offset += 2, tab.cDef = Typr._lctf.readClassDef(data, offset0 + cDefOffset), tab.scset = [];
        var subClassSetCount = bin.readUshort(data, offset);
        offset += 2;
        for (i = 0; i < subClassSetCount; i++) {
          var scsOff = bin.readUshort(data, offset);
          offset += 2, tab.scset.push(0 == scsOff ? null : Typr.GSUB.readSubClassSet(data, offset0 + scsOff));
        }
      } else
        console.log("unknown table format", tab.fmt);
    return tab;
  }, Typr.GSUB.readSubClassSet = function(data, offset) {
    var rUs = Typr._bin.readUshort, offset0 = offset, lset = [], cnt = rUs(data, offset);
    offset += 2;
    for (var i = 0; i < cnt; i++) {
      var loff = rUs(data, offset);
      offset += 2, lset.push(Typr.GSUB.readSubClassRule(data, offset0 + loff));
    }
    return lset;
  }, Typr.GSUB.readSubClassRule = function(data, offset) {
    var rUs = Typr._bin.readUshort, rule = {}, gcount = rUs(data, offset), scount = rUs(data, offset += 2);
    offset += 2, rule.input = [];
    for (var i = 0; i < gcount - 1; i++)
      rule.input.push(rUs(data, offset)), offset += 2;
    return rule.substLookupRecords = Typr.GSUB.readSubstLookupRecords(data, offset, scount), rule;
  }, Typr.GSUB.readSubstLookupRecords = function(data, offset, cnt) {
    for (var rUs = Typr._bin.readUshort, out = [], i = 0; i < cnt; i++)
      out.push(rUs(data, offset), rUs(data, offset + 2)), offset += 4;
    return out;
  }, Typr.GSUB.readChainSubClassSet = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, lset = [], cnt = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < cnt; i++) {
      var loff = bin.readUshort(data, offset);
      offset += 2, lset.push(Typr.GSUB.readChainSubClassRule(data, offset0 + loff));
    }
    return lset;
  }, Typr.GSUB.readChainSubClassRule = function(data, offset) {
    for (var bin = Typr._bin, rule = {}, pps = ["backtrack", "input", "lookahead"], pi = 0; pi < pps.length; pi++) {
      var cnt = bin.readUshort(data, offset);
      offset += 2, 1 == pi && cnt--, rule[pps[pi]] = bin.readUshorts(data, offset, cnt), offset += 2 * rule[pps[pi]].length;
    }
    cnt = bin.readUshort(data, offset);
    return offset += 2, rule.subst = bin.readUshorts(data, offset, 2 * cnt), offset += 2 * rule.subst.length, rule;
  }, Typr.GSUB.readLigatureSet = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, lset = [], lcnt = bin.readUshort(data, offset);
    offset += 2;
    for (var j = 0; j < lcnt; j++) {
      var loff = bin.readUshort(data, offset);
      offset += 2, lset.push(Typr.GSUB.readLigature(data, offset0 + loff));
    }
    return lset;
  }, Typr.GSUB.readLigature = function(data, offset) {
    var bin = Typr._bin, lig = { chain: [] };
    lig.nglyph = bin.readUshort(data, offset), offset += 2;
    var ccnt = bin.readUshort(data, offset);
    offset += 2;
    for (var k = 0; k < ccnt - 1; k++)
      lig.chain.push(bin.readUshort(data, offset)), offset += 2;
    return lig;
  }, Typr.head = {}, Typr.head.parse = function(data, offset, length) {
    var bin = Typr._bin, obj = {};
    return bin.readFixed(data, offset), offset += 4, obj.fontRevision = bin.readFixed(data, offset), offset += 4, bin.readUint(data, offset), offset += 4, bin.readUint(data, offset), offset += 4, obj.flags = bin.readUshort(data, offset), offset += 2, obj.unitsPerEm = bin.readUshort(data, offset), offset += 2, obj.created = bin.readUint64(data, offset), offset += 8, obj.modified = bin.readUint64(data, offset), offset += 8, obj.xMin = bin.readShort(data, offset), offset += 2, obj.yMin = bin.readShort(data, offset), offset += 2, obj.xMax = bin.readShort(data, offset), offset += 2, obj.yMax = bin.readShort(data, offset), offset += 2, obj.macStyle = bin.readUshort(data, offset), offset += 2, obj.lowestRecPPEM = bin.readUshort(data, offset), offset += 2, obj.fontDirectionHint = bin.readShort(data, offset), offset += 2, obj.indexToLocFormat = bin.readShort(data, offset), offset += 2, obj.glyphDataFormat = bin.readShort(data, offset), offset += 2, obj;
  }, Typr.hhea = {}, Typr.hhea.parse = function(data, offset, length) {
    var bin = Typr._bin, obj = {};
    return bin.readFixed(data, offset), offset += 4, obj.ascender = bin.readShort(data, offset), offset += 2, obj.descender = bin.readShort(data, offset), offset += 2, obj.lineGap = bin.readShort(data, offset), offset += 2, obj.advanceWidthMax = bin.readUshort(data, offset), offset += 2, obj.minLeftSideBearing = bin.readShort(data, offset), offset += 2, obj.minRightSideBearing = bin.readShort(data, offset), offset += 2, obj.xMaxExtent = bin.readShort(data, offset), offset += 2, obj.caretSlopeRise = bin.readShort(data, offset), offset += 2, obj.caretSlopeRun = bin.readShort(data, offset), offset += 2, obj.caretOffset = bin.readShort(data, offset), offset += 2, offset += 8, obj.metricDataFormat = bin.readShort(data, offset), offset += 2, obj.numberOfHMetrics = bin.readUshort(data, offset), offset += 2, obj;
  }, Typr.hmtx = {}, Typr.hmtx.parse = function(data, offset, length, font) {
    for (var bin = Typr._bin, obj = { aWidth: [], lsBearing: [] }, aw = 0, lsb = 0, i = 0; i < font.maxp.numGlyphs; i++)
      i < font.hhea.numberOfHMetrics && (aw = bin.readUshort(data, offset), offset += 2, lsb = bin.readShort(data, offset), offset += 2), obj.aWidth.push(aw), obj.lsBearing.push(lsb);
    return obj;
  }, Typr.kern = {}, Typr.kern.parse = function(data, offset, length, font) {
    var bin = Typr._bin, version = bin.readUshort(data, offset);
    if (offset += 2, 1 == version)
      return Typr.kern.parseV1(data, offset - 2, length, font);
    var nTables = bin.readUshort(data, offset);
    offset += 2;
    for (var map = { glyph1: [], rval: [] }, i = 0; i < nTables; i++) {
      offset += 2;
      length = bin.readUshort(data, offset);
      offset += 2;
      var coverage = bin.readUshort(data, offset);
      offset += 2;
      var format = coverage >>> 8;
      if (0 != (format &= 15))
        throw "unknown kern table format: " + format;
      offset = Typr.kern.readFormat0(data, offset, map);
    }
    return map;
  }, Typr.kern.parseV1 = function(data, offset, length, font) {
    var bin = Typr._bin;
    bin.readFixed(data, offset), offset += 4;
    var nTables = bin.readUint(data, offset);
    offset += 4;
    for (var map = { glyph1: [], rval: [] }, i = 0; i < nTables; i++) {
      bin.readUint(data, offset), offset += 4;
      var coverage = bin.readUshort(data, offset);
      offset += 2, bin.readUshort(data, offset), offset += 2;
      var format = coverage >>> 8;
      if (0 != (format &= 15))
        throw "unknown kern table format: " + format;
      offset = Typr.kern.readFormat0(data, offset, map);
    }
    return map;
  }, Typr.kern.readFormat0 = function(data, offset, map) {
    var bin = Typr._bin, pleft = -1, nPairs = bin.readUshort(data, offset);
    offset += 2, bin.readUshort(data, offset), offset += 2, bin.readUshort(data, offset), offset += 2, bin.readUshort(data, offset), offset += 2;
    for (var j = 0; j < nPairs; j++) {
      var left = bin.readUshort(data, offset);
      offset += 2;
      var right = bin.readUshort(data, offset);
      offset += 2;
      var value = bin.readShort(data, offset);
      offset += 2, left != pleft && (map.glyph1.push(left), map.rval.push({ glyph2: [], vals: [] }));
      var rval = map.rval[map.rval.length - 1];
      rval.glyph2.push(right), rval.vals.push(value), pleft = left;
    }
    return offset;
  }, Typr.loca = {}, Typr.loca.parse = function(data, offset, length, font) {
    var bin = Typr._bin, obj = [], ver = font.head.indexToLocFormat, len = font.maxp.numGlyphs + 1;
    if (0 == ver)
      for (var i = 0; i < len; i++)
        obj.push(bin.readUshort(data, offset + (i << 1)) << 1);
    if (1 == ver)
      for (i = 0; i < len; i++)
        obj.push(bin.readUint(data, offset + (i << 2)));
    return obj;
  }, Typr.maxp = {}, Typr.maxp.parse = function(data, offset, length) {
    var bin = Typr._bin, obj = {}, ver = bin.readUint(data, offset);
    return offset += 4, obj.numGlyphs = bin.readUshort(data, offset), offset += 2, 65536 == ver && (obj.maxPoints = bin.readUshort(data, offset), offset += 2, obj.maxContours = bin.readUshort(data, offset), offset += 2, obj.maxCompositePoints = bin.readUshort(data, offset), offset += 2, obj.maxCompositeContours = bin.readUshort(data, offset), offset += 2, obj.maxZones = bin.readUshort(data, offset), offset += 2, obj.maxTwilightPoints = bin.readUshort(data, offset), offset += 2, obj.maxStorage = bin.readUshort(data, offset), offset += 2, obj.maxFunctionDefs = bin.readUshort(data, offset), offset += 2, obj.maxInstructionDefs = bin.readUshort(data, offset), offset += 2, obj.maxStackElements = bin.readUshort(data, offset), offset += 2, obj.maxSizeOfInstructions = bin.readUshort(data, offset), offset += 2, obj.maxComponentElements = bin.readUshort(data, offset), offset += 2, obj.maxComponentDepth = bin.readUshort(data, offset), offset += 2), obj;
  }, Typr.name = {}, Typr.name.parse = function(data, offset, length) {
    var bin = Typr._bin, obj = {};
    bin.readUshort(data, offset), offset += 2;
    var count = bin.readUshort(data, offset);
    offset += 2, bin.readUshort(data, offset);
    for (var tname, offset0 = offset += 2, i = 0; i < count; i++) {
      var platformID = bin.readUshort(data, offset);
      offset += 2;
      var encodingID = bin.readUshort(data, offset);
      offset += 2;
      var languageID = bin.readUshort(data, offset);
      offset += 2;
      var nameID = bin.readUshort(data, offset);
      offset += 2;
      length = bin.readUshort(data, offset);
      offset += 2;
      var noffset = bin.readUshort(data, offset);
      offset += 2;
      var plat = "p" + platformID;
      null == obj[plat] && (obj[plat] = {});
      var str, cname = ["copyright", "fontFamily", "fontSubfamily", "ID", "fullName", "version", "postScriptName", "trademark", "manufacturer", "designer", "description", "urlVendor", "urlDesigner", "licence", "licenceURL", "---", "typoFamilyName", "typoSubfamilyName", "compatibleFull", "sampleText", "postScriptCID", "wwsFamilyName", "wwsSubfamilyName", "lightPalette", "darkPalette"][nameID], soff = offset0 + 12 * count + noffset;
      if (0 == platformID)
        str = bin.readUnicode(data, soff, length / 2);
      else if (3 == platformID && 0 == encodingID)
        str = bin.readUnicode(data, soff, length / 2);
      else if (0 == encodingID)
        str = bin.readASCII(data, soff, length);
      else if (1 == encodingID)
        str = bin.readUnicode(data, soff, length / 2);
      else if (3 == encodingID)
        str = bin.readUnicode(data, soff, length / 2);
      else {
        if (1 != platformID)
          throw "unknown encoding " + encodingID + ", platformID: " + platformID;
        str = bin.readASCII(data, soff, length), console.log("reading unknown MAC encoding " + encodingID + " as ASCII");
      }
      obj[plat][cname] = str, obj[plat]._lang = languageID;
    }
    for (var p in obj)
      if (null != obj[p].postScriptName && 1033 == obj[p]._lang)
        return obj[p];
    for (var p in obj)
      if (null != obj[p].postScriptName && 3084 == obj[p]._lang)
        return obj[p];
    for (var p in obj)
      if (null != obj[p].postScriptName)
        return obj[p];
    for (var p in obj) {
      tname = p;
      break;
    }
    return console.log("returning name table with languageID " + obj[tname]._lang), obj[tname];
  }, Typr["OS/2"] = {}, Typr["OS/2"].parse = function(data, offset, length) {
    var ver = Typr._bin.readUshort(data, offset);
    offset += 2;
    var obj = {};
    if (0 == ver)
      Typr["OS/2"].version0(data, offset, obj);
    else if (1 == ver)
      Typr["OS/2"].version1(data, offset, obj);
    else if (2 == ver || 3 == ver || 4 == ver)
      Typr["OS/2"].version2(data, offset, obj);
    else {
      if (5 != ver)
        throw "unknown OS/2 table version: " + ver;
      Typr["OS/2"].version5(data, offset, obj);
    }
    return obj;
  }, Typr["OS/2"].version0 = function(data, offset, obj) {
    var bin = Typr._bin;
    return obj.xAvgCharWidth = bin.readShort(data, offset), offset += 2, obj.usWeightClass = bin.readUshort(data, offset), offset += 2, obj.usWidthClass = bin.readUshort(data, offset), offset += 2, obj.fsType = bin.readUshort(data, offset), offset += 2, obj.ySubscriptXSize = bin.readShort(data, offset), offset += 2, obj.ySubscriptYSize = bin.readShort(data, offset), offset += 2, obj.ySubscriptXOffset = bin.readShort(data, offset), offset += 2, obj.ySubscriptYOffset = bin.readShort(data, offset), offset += 2, obj.ySuperscriptXSize = bin.readShort(data, offset), offset += 2, obj.ySuperscriptYSize = bin.readShort(data, offset), offset += 2, obj.ySuperscriptXOffset = bin.readShort(data, offset), offset += 2, obj.ySuperscriptYOffset = bin.readShort(data, offset), offset += 2, obj.yStrikeoutSize = bin.readShort(data, offset), offset += 2, obj.yStrikeoutPosition = bin.readShort(data, offset), offset += 2, obj.sFamilyClass = bin.readShort(data, offset), offset += 2, obj.panose = bin.readBytes(data, offset, 10), offset += 10, obj.ulUnicodeRange1 = bin.readUint(data, offset), offset += 4, obj.ulUnicodeRange2 = bin.readUint(data, offset), offset += 4, obj.ulUnicodeRange3 = bin.readUint(data, offset), offset += 4, obj.ulUnicodeRange4 = bin.readUint(data, offset), offset += 4, obj.achVendID = [bin.readInt8(data, offset), bin.readInt8(data, offset + 1), bin.readInt8(data, offset + 2), bin.readInt8(data, offset + 3)], offset += 4, obj.fsSelection = bin.readUshort(data, offset), offset += 2, obj.usFirstCharIndex = bin.readUshort(data, offset), offset += 2, obj.usLastCharIndex = bin.readUshort(data, offset), offset += 2, obj.sTypoAscender = bin.readShort(data, offset), offset += 2, obj.sTypoDescender = bin.readShort(data, offset), offset += 2, obj.sTypoLineGap = bin.readShort(data, offset), offset += 2, obj.usWinAscent = bin.readUshort(data, offset), offset += 2, obj.usWinDescent = bin.readUshort(data, offset), offset += 2;
  }, Typr["OS/2"].version1 = function(data, offset, obj) {
    var bin = Typr._bin;
    return offset = Typr["OS/2"].version0(data, offset, obj), obj.ulCodePageRange1 = bin.readUint(data, offset), offset += 4, obj.ulCodePageRange2 = bin.readUint(data, offset), offset += 4;
  }, Typr["OS/2"].version2 = function(data, offset, obj) {
    var bin = Typr._bin;
    return offset = Typr["OS/2"].version1(data, offset, obj), obj.sxHeight = bin.readShort(data, offset), offset += 2, obj.sCapHeight = bin.readShort(data, offset), offset += 2, obj.usDefault = bin.readUshort(data, offset), offset += 2, obj.usBreak = bin.readUshort(data, offset), offset += 2, obj.usMaxContext = bin.readUshort(data, offset), offset += 2;
  }, Typr["OS/2"].version5 = function(data, offset, obj) {
    var bin = Typr._bin;
    return offset = Typr["OS/2"].version2(data, offset, obj), obj.usLowerOpticalPointSize = bin.readUshort(data, offset), offset += 2, obj.usUpperOpticalPointSize = bin.readUshort(data, offset), offset += 2;
  }, Typr.post = {}, Typr.post.parse = function(data, offset, length) {
    var bin = Typr._bin, obj = {};
    return obj.version = bin.readFixed(data, offset), offset += 4, obj.italicAngle = bin.readFixed(data, offset), offset += 4, obj.underlinePosition = bin.readShort(data, offset), offset += 2, obj.underlineThickness = bin.readShort(data, offset), offset += 2, obj;
  }, Typr.SVG = {}, Typr.SVG.parse = function(data, offset, length) {
    var bin = Typr._bin, obj = { entries: [] }, offset0 = offset;
    bin.readUshort(data, offset), offset += 2;
    var svgDocIndexOffset = bin.readUint(data, offset);
    offset += 4, bin.readUint(data, offset), offset += 4, offset = svgDocIndexOffset + offset0;
    var numEntries = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < numEntries; i++) {
      var startGlyphID = bin.readUshort(data, offset);
      offset += 2;
      var endGlyphID = bin.readUshort(data, offset);
      offset += 2;
      var svgDocOffset = bin.readUint(data, offset);
      offset += 4;
      var svgDocLength = bin.readUint(data, offset);
      offset += 4;
      for (var sbuf = new Uint8Array(data.buffer, offset0 + svgDocOffset + svgDocIndexOffset, svgDocLength), svg = bin.readUTF8(sbuf, 0, sbuf.length), f = startGlyphID; f <= endGlyphID; f++)
        obj.entries[f] = svg;
    }
    return obj;
  }, Typr.SVG.toPath = function(str) {
    var pth = { cmds: [], crds: [] };
    if (null == str)
      return pth;
    for (var svg = new DOMParser().parseFromString(str, "image/svg+xml").firstChild; "svg" != svg.tagName; )
      svg = svg.nextSibling;
    var vb = svg.getAttribute("viewBox");
    vb = vb ? vb.trim().split(" ").map(parseFloat) : [0, 0, 1e3, 1e3], Typr.SVG._toPath(svg.children, pth);
    for (var i = 0; i < pth.crds.length; i += 2) {
      var x = pth.crds[i], y = pth.crds[i + 1];
      x -= vb[0], y = -(y -= vb[1]), pth.crds[i] = x, pth.crds[i + 1] = y;
    }
    return pth;
  }, Typr.SVG._toPath = function(nds, pth, fill) {
    for (var ni = 0; ni < nds.length; ni++) {
      var nd = nds[ni], tn = nd.tagName, cfl = nd.getAttribute("fill");
      if (null == cfl && (cfl = fill), "g" == tn)
        Typr.SVG._toPath(nd.children, pth, cfl);
      else if ("path" == tn) {
        pth.cmds.push(cfl || "#000000");
        var d = nd.getAttribute("d"), toks = Typr.SVG._tokens(d);
        Typr.SVG._toksToPath(toks, pth), pth.cmds.push("X");
      } else
        "defs" == tn || console.log(tn, nd);
    }
  }, Typr.SVG._tokens = function(d) {
    for (var ts = [], off = 0, rn = false, cn = ""; off < d.length; ) {
      var cc = d.charCodeAt(off), ch = d.charAt(off);
      off++;
      var isNum = 48 <= cc && cc <= 57 || "." == ch || "-" == ch;
      rn ? "-" == ch ? (ts.push(parseFloat(cn)), cn = ch) : isNum ? cn += ch : (ts.push(parseFloat(cn)), "," != ch && " " != ch && ts.push(ch), rn = false) : isNum ? (cn = ch, rn = true) : "," != ch && " " != ch && ts.push(ch);
    }
    return rn && ts.push(parseFloat(cn)), ts;
  }, Typr.SVG._toksToPath = function(ts, pth) {
    for (var i = 0, x = 0, y = 0, ox = 0, oy = 0, pc = { M: 2, L: 2, H: 1, V: 1, S: 4, C: 6 }, cmds = pth.cmds, crds = pth.crds; i < ts.length; ) {
      var cmd = ts[i];
      if (i++, "z" == cmd)
        cmds.push("Z"), x = ox, y = oy;
      else
        for (var cmu = cmd.toUpperCase(), ps = pc[cmu], reps = Typr.SVG._reps(ts, i, ps), j = 0; j < reps; j++) {
          var xi = 0, yi = 0;
          if (cmd != cmu && (xi = x, yi = y), "M" == cmu)
            x = xi + ts[i++], y = yi + ts[i++], cmds.push("M"), crds.push(x, y), ox = x, oy = y;
          else if ("L" == cmu)
            x = xi + ts[i++], y = yi + ts[i++], cmds.push("L"), crds.push(x, y);
          else if ("H" == cmu)
            x = xi + ts[i++], cmds.push("L"), crds.push(x, y);
          else if ("V" == cmu)
            y = yi + ts[i++], cmds.push("L"), crds.push(x, y);
          else if ("C" == cmu) {
            var x1 = xi + ts[i++], y1 = yi + ts[i++], x2 = xi + ts[i++], y2 = yi + ts[i++], x3 = xi + ts[i++], y3 = yi + ts[i++];
            cmds.push("C"), crds.push(x1, y1, x2, y2, x3, y3), x = x3, y = y3;
          } else if ("S" == cmu) {
            var co = Math.max(crds.length - 4, 0);
            x1 = x + x - crds[co], y1 = y + y - crds[co + 1], x2 = xi + ts[i++], y2 = yi + ts[i++], x3 = xi + ts[i++], y3 = yi + ts[i++];
            cmds.push("C"), crds.push(x1, y1, x2, y2, x3, y3), x = x3, y = y3;
          } else
            console.log("Unknown SVG command " + cmd);
        }
    }
  }, Typr.SVG._reps = function(ts, off, ps) {
    for (var i = off; i < ts.length && "string" != typeof ts[i]; )
      i += ps;
    return (i - off) / ps;
  }, null == Typr && (Typr = {}), null == Typr.U && (Typr.U = {}), Typr.U.codeToGlyph = function(font, code) {
    var cmap = font.cmap, tind = -1;
    if (null != cmap.p0e4 ? tind = cmap.p0e4 : null != cmap.p3e1 ? tind = cmap.p3e1 : null != cmap.p1e0 && (tind = cmap.p1e0), -1 == tind)
      throw "no familiar platform and encoding!";
    var tab = cmap.tables[tind];
    if (0 == tab.format)
      return code >= tab.map.length ? 0 : tab.map[code];
    if (4 == tab.format) {
      for (var sind = -1, i = 0; i < tab.endCount.length; i++)
        if (code <= tab.endCount[i]) {
          sind = i;
          break;
        }
      if (-1 == sind)
        return 0;
      if (tab.startCount[sind] > code)
        return 0;
      return 65535 & (0 != tab.idRangeOffset[sind] ? tab.glyphIdArray[code - tab.startCount[sind] + (tab.idRangeOffset[sind] >> 1) - (tab.idRangeOffset.length - sind)] : code + tab.idDelta[sind]);
    }
    if (12 == tab.format) {
      if (code > tab.groups[tab.groups.length - 1][1])
        return 0;
      for (i = 0; i < tab.groups.length; i++) {
        var grp = tab.groups[i];
        if (grp[0] <= code && code <= grp[1])
          return grp[2] + (code - grp[0]);
      }
      return 0;
    }
    throw "unknown cmap table format " + tab.format;
  }, Typr.U.glyphToPath = function(font, gid) {
    var path = { cmds: [], crds: [] };
    if (font.SVG && font.SVG.entries[gid]) {
      var p = font.SVG.entries[gid];
      return null == p ? path : ("string" == typeof p && (p = Typr.SVG.toPath(p), font.SVG.entries[gid] = p), p);
    }
    if (font.CFF) {
      var state = { x: 0, y: 0, stack: [], nStems: 0, haveWidth: false, width: font.CFF.Private ? font.CFF.Private.defaultWidthX : 0, open: false };
      Typr.U._drawCFF(font.CFF.CharStrings[gid], state, font.CFF, path);
    } else
      font.glyf && Typr.U._drawGlyf(gid, font, path);
    return path;
  }, Typr.U._drawGlyf = function(gid, font, path) {
    var gl = font.glyf[gid];
    null == gl && (gl = font.glyf[gid] = Typr.glyf._parseGlyf(font, gid)), null != gl && (gl.noc > -1 ? Typr.U._simpleGlyph(gl, path) : Typr.U._compoGlyph(gl, font, path));
  }, Typr.U._simpleGlyph = function(gl, p) {
    for (var c = 0; c < gl.noc; c++) {
      for (var i0 = 0 == c ? 0 : gl.endPts[c - 1] + 1, il = gl.endPts[c], i = i0; i <= il; i++) {
        var pr = i == i0 ? il : i - 1, nx = i == il ? i0 : i + 1, onCurve = 1 & gl.flags[i], prOnCurve = 1 & gl.flags[pr], nxOnCurve = 1 & gl.flags[nx], x = gl.xs[i], y = gl.ys[i];
        if (i == i0)
          if (onCurve) {
            if (!prOnCurve) {
              Typr.U.P.moveTo(p, x, y);
              continue;
            }
            Typr.U.P.moveTo(p, gl.xs[pr], gl.ys[pr]);
          } else
            prOnCurve ? Typr.U.P.moveTo(p, gl.xs[pr], gl.ys[pr]) : Typr.U.P.moveTo(p, (gl.xs[pr] + x) / 2, (gl.ys[pr] + y) / 2);
        onCurve ? prOnCurve && Typr.U.P.lineTo(p, x, y) : nxOnCurve ? Typr.U.P.qcurveTo(p, x, y, gl.xs[nx], gl.ys[nx]) : Typr.U.P.qcurveTo(p, x, y, (x + gl.xs[nx]) / 2, (y + gl.ys[nx]) / 2);
      }
      Typr.U.P.closePath(p);
    }
  }, Typr.U._compoGlyph = function(gl, font, p) {
    for (var j = 0; j < gl.parts.length; j++) {
      var path = { cmds: [], crds: [] }, prt = gl.parts[j];
      Typr.U._drawGlyf(prt.glyphIndex, font, path);
      for (var m = prt.m, i = 0; i < path.crds.length; i += 2) {
        var x = path.crds[i], y = path.crds[i + 1];
        p.crds.push(x * m.a + y * m.b + m.tx), p.crds.push(x * m.c + y * m.d + m.ty);
      }
      for (i = 0; i < path.cmds.length; i++)
        p.cmds.push(path.cmds[i]);
    }
  }, Typr.U._getGlyphClass = function(g, cd) {
    var intr = Typr._lctf.getInterval(cd, g);
    return -1 == intr ? 0 : cd[intr + 2];
  }, Typr.U.getPairAdjustment = function(font, g1, g2) {
    if (font.GPOS) {
      for (var ltab = null, i = 0; i < font.GPOS.featureList.length; i++) {
        var fl = font.GPOS.featureList[i];
        if ("kern" == fl.tag)
          for (var j = 0; j < fl.tab.length; j++)
            2 == font.GPOS.lookupList[fl.tab[j]].ltype && (ltab = font.GPOS.lookupList[fl.tab[j]]);
      }
      if (ltab)
        for (i = 0; i < ltab.tabs.length; i++) {
          var tab = ltab.tabs[i], ind = Typr._lctf.coverageIndex(tab.coverage, g1);
          if (-1 != ind) {
            if (1 == tab.format) {
              var right = tab.pairsets[ind];
              for (j = 0; j < right.length; j++)
                right[j].gid2 == g2 && (adj = right[j]);
              if (null == adj)
                continue;
            } else if (2 == tab.format)
              var c1 = Typr.U._getGlyphClass(g1, tab.classDef1), c2 = Typr.U._getGlyphClass(g2, tab.classDef2), adj = tab.matrix[c1][c2];
            return adj.val1[2];
          }
        }
    }
    if (font.kern) {
      var ind1 = font.kern.glyph1.indexOf(g1);
      if (-1 != ind1) {
        var ind2 = font.kern.rval[ind1].glyph2.indexOf(g2);
        if (-1 != ind2)
          return font.kern.rval[ind1].vals[ind2];
      }
    }
    return 0;
  }, Typr.U.stringToGlyphs = function(font, str) {
    for (var gls = [], i = 0; i < str.length; i++) {
      var cc = str.codePointAt(i);
      cc > 65535 && i++, gls.push(Typr.U.codeToGlyph(font, cc));
    }
    var gsub = font.GSUB;
    if (null == gsub)
      return gls;
    for (var llist = gsub.lookupList, flist = gsub.featureList, wsep = '\n	" ,.:;!?()  ،', R = "آأؤإاةدذرزوٱٲٳٵٶٷڈډڊڋڌڍڎڏڐڑڒړڔڕږڗژڙۀۃۄۅۆۇۈۉۊۋۍۏےۓەۮۯܐܕܖܗܘܙܞܨܪܬܯݍݙݚݛݫݬݱݳݴݸݹࡀࡆࡇࡉࡔࡧࡩࡪࢪࢫࢬࢮࢱࢲࢹૅેૉ૊૎૏ૐ૑૒૝ૡ૤૯஁ஃ஄அஉ஌எஏ஑னப஫஬", ci = 0; ci < gls.length; ci++) {
      var gl = gls[ci], slft = 0 == ci || -1 != wsep.indexOf(str[ci - 1]), srgt = ci == gls.length - 1 || -1 != wsep.indexOf(str[ci + 1]);
      slft || -1 == R.indexOf(str[ci - 1]) || (slft = true), srgt || -1 == R.indexOf(str[ci]) || (srgt = true), srgt || -1 == "ꡲ્૗".indexOf(str[ci + 1]) || (srgt = true), slft || -1 == "ꡲ્૗".indexOf(str[ci]) || (slft = true);
      var feat = null;
      feat = slft ? srgt ? "isol" : "init" : srgt ? "fina" : "medi";
      for (var fi = 0; fi < flist.length; fi++)
        if (flist[fi].tag == feat)
          for (var ti = 0; ti < flist[fi].tab.length; ti++) {
            1 == (tab = llist[flist[fi].tab[ti]]).ltype && Typr.U._applyType1(gls, ci, tab);
          }
    }
    var cligs = ["rlig", "liga", "mset"];
    for (ci = 0; ci < gls.length; ci++) {
      gl = gls[ci];
      var rlim = Math.min(3, gls.length - ci - 1);
      for (fi = 0; fi < flist.length; fi++) {
        var fl = flist[fi];
        if (-1 != cligs.indexOf(fl.tag)) {
          for (ti = 0; ti < fl.tab.length; ti++)
            for (var tab = llist[fl.tab[ti]], j = 0; j < tab.tabs.length; j++)
              if (null != tab.tabs[j]) {
                var ind = Typr._lctf.coverageIndex(tab.tabs[j].coverage, gl);
                if (-1 != ind) {
                  if (4 == tab.ltype)
                    for (var vals = tab.tabs[j].vals[ind], k = 0; k < vals.length; k++) {
                      var lig = vals[k], rl = lig.chain.length;
                      if (!(rl > rlim)) {
                        for (var good = true, l = 0; l < rl; l++)
                          lig.chain[l] != gls[ci + (1 + l)] && (good = false);
                        if (good) {
                          gls[ci] = lig.nglyph;
                          for (l = 0; l < rl; l++)
                            gls[ci + l + 1] = -1;
                        }
                      }
                    }
                  else if (5 == tab.ltype) {
                    var ltab = tab.tabs[j];
                    if (2 != ltab.fmt)
                      continue;
                    var cind = Typr._lctf.getInterval(ltab.cDef, gl), cls = ltab.cDef[cind + 2], scs = ltab.scset[cls];
                    for (i = 0; i < scs.length; i++) {
                      var sc = scs[i], inp = sc.input;
                      if (!(inp.length > rlim)) {
                        for (good = true, l = 0; l < inp.length; l++) {
                          var cind2 = Typr._lctf.getInterval(ltab.cDef, gls[ci + 1 + l]);
                          if (-1 == cind && ltab.cDef[cind2 + 2] != inp[l]) {
                            good = false;
                            break;
                          }
                        }
                        if (good) {
                          var lrs = sc.substLookupRecords;
                          for (k = 0; k < lrs.length; k += 2)
                            lrs[k], lrs[k + 1];
                        }
                      }
                    }
                  }
                }
              }
        }
      }
    }
    return gls;
  }, Typr.U._applyType1 = function(gls, ci, tab) {
    for (var gl = gls[ci], j = 0; j < tab.tabs.length; j++) {
      var ttab = tab.tabs[j], ind = Typr._lctf.coverageIndex(ttab.coverage, gl);
      -1 != ind && (1 == ttab.fmt ? gls[ci] = gls[ci] + ttab.delta : gls[ci] = ttab.newg[ind]);
    }
  }, Typr.U.glyphsToPath = function(font, gls, clr) {
    for (var tpath = { cmds: [], crds: [] }, x = 0, i = 0; i < gls.length; i++) {
      var gid = gls[i];
      if (-1 != gid) {
        for (var gid2 = i < gls.length - 1 && -1 != gls[i + 1] ? gls[i + 1] : 0, path = Typr.U.glyphToPath(font, gid), j = 0; j < path.crds.length; j += 2)
          tpath.crds.push(path.crds[j] + x), tpath.crds.push(path.crds[j + 1]);
        clr && tpath.cmds.push(clr);
        for (j = 0; j < path.cmds.length; j++)
          tpath.cmds.push(path.cmds[j]);
        clr && tpath.cmds.push("X"), x += font.hmtx.aWidth[gid], i < gls.length - 1 && (x += Typr.U.getPairAdjustment(font, gid, gid2));
      }
    }
    return tpath;
  }, Typr.U.pathToSVG = function(path, prec) {
    null == prec && (prec = 5);
    for (var out = [], co = 0, lmap = { M: 2, L: 2, Q: 4, C: 6 }, i = 0; i < path.cmds.length; i++) {
      var cmd = path.cmds[i], cn = co + (lmap[cmd] ? lmap[cmd] : 0);
      for (out.push(cmd); co < cn; ) {
        var c = path.crds[co++];
        out.push(parseFloat(c.toFixed(prec)) + (co == cn ? "" : " "));
      }
    }
    return out.join("");
  }, Typr.U.pathToContext = function(path, ctx) {
    for (var c = 0, crds = path.crds, j = 0; j < path.cmds.length; j++) {
      var cmd = path.cmds[j];
      "M" == cmd ? (ctx.moveTo(crds[c], crds[c + 1]), c += 2) : "L" == cmd ? (ctx.lineTo(crds[c], crds[c + 1]), c += 2) : "C" == cmd ? (ctx.bezierCurveTo(crds[c], crds[c + 1], crds[c + 2], crds[c + 3], crds[c + 4], crds[c + 5]), c += 6) : "Q" == cmd ? (ctx.quadraticCurveTo(crds[c], crds[c + 1], crds[c + 2], crds[c + 3]), c += 4) : "#" == cmd.charAt(0) ? (ctx.beginPath(), ctx.fillStyle = cmd) : "Z" == cmd ? ctx.closePath() : "X" == cmd && ctx.fill();
    }
  }, Typr.U.P = {}, Typr.U.P.moveTo = function(p, x, y) {
    p.cmds.push("M"), p.crds.push(x, y);
  }, Typr.U.P.lineTo = function(p, x, y) {
    p.cmds.push("L"), p.crds.push(x, y);
  }, Typr.U.P.curveTo = function(p, a, b, c, d, e, f) {
    p.cmds.push("C"), p.crds.push(a, b, c, d, e, f);
  }, Typr.U.P.qcurveTo = function(p, a, b, c, d) {
    p.cmds.push("Q"), p.crds.push(a, b, c, d);
  }, Typr.U.P.closePath = function(p) {
    p.cmds.push("Z");
  }, Typr.U._drawCFF = function(cmds, state, font, p) {
    for (var stack = state.stack, nStems = state.nStems, haveWidth = state.haveWidth, width = state.width, open = state.open, i = 0, x = state.x, y = state.y, c1x = 0, c1y = 0, c2x = 0, c2y = 0, c3x = 0, c3y = 0, c4x = 0, c4y = 0, jpx = 0, jpy = 0, o = { val: 0, size: 0 }; i < cmds.length; ) {
      Typr.CFF.getCharString(cmds, i, o);
      var v = o.val;
      if (i += o.size, "o1" == v || "o18" == v)
        stack.length % 2 != 0 && !haveWidth && (width = stack.shift() + font.Private.nominalWidthX), nStems += stack.length >> 1, stack.length = 0, haveWidth = true;
      else if ("o3" == v || "o23" == v) {
        stack.length % 2 != 0 && !haveWidth && (width = stack.shift() + font.Private.nominalWidthX), nStems += stack.length >> 1, stack.length = 0, haveWidth = true;
      } else if ("o4" == v)
        stack.length > 1 && !haveWidth && (width = stack.shift() + font.Private.nominalWidthX, haveWidth = true), open && Typr.U.P.closePath(p), y += stack.pop(), Typr.U.P.moveTo(p, x, y), open = true;
      else if ("o5" == v)
        for (; stack.length > 0; )
          x += stack.shift(), y += stack.shift(), Typr.U.P.lineTo(p, x, y);
      else if ("o6" == v || "o7" == v)
        for (var count = stack.length, isX = "o6" == v, j = 0; j < count; j++) {
          var sval = stack.shift();
          isX ? x += sval : y += sval, isX = !isX, Typr.U.P.lineTo(p, x, y);
        }
      else if ("o8" == v || "o24" == v) {
        count = stack.length;
        for (var index = 0; index + 6 <= count; )
          c1x = x + stack.shift(), c1y = y + stack.shift(), c2x = c1x + stack.shift(), c2y = c1y + stack.shift(), x = c2x + stack.shift(), y = c2y + stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y), index += 6;
        "o24" == v && (x += stack.shift(), y += stack.shift(), Typr.U.P.lineTo(p, x, y));
      } else {
        if ("o11" == v)
          break;
        if ("o1234" == v || "o1235" == v || "o1236" == v || "o1237" == v)
          "o1234" == v && (c1y = y, c2x = (c1x = x + stack.shift()) + stack.shift(), jpy = c2y = c1y + stack.shift(), c3y = c2y, c4y = y, x = (c4x = (c3x = (jpx = c2x + stack.shift()) + stack.shift()) + stack.shift()) + stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy), Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y)), "o1235" == v && (c1x = x + stack.shift(), c1y = y + stack.shift(), c2x = c1x + stack.shift(), c2y = c1y + stack.shift(), jpx = c2x + stack.shift(), jpy = c2y + stack.shift(), c3x = jpx + stack.shift(), c3y = jpy + stack.shift(), c4x = c3x + stack.shift(), c4y = c3y + stack.shift(), x = c4x + stack.shift(), y = c4y + stack.shift(), stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy), Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y)), "o1236" == v && (c1x = x + stack.shift(), c1y = y + stack.shift(), c2x = c1x + stack.shift(), jpy = c2y = c1y + stack.shift(), c3y = c2y, c4x = (c3x = (jpx = c2x + stack.shift()) + stack.shift()) + stack.shift(), c4y = c3y + stack.shift(), x = c4x + stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy), Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y)), "o1237" == v && (c1x = x + stack.shift(), c1y = y + stack.shift(), c2x = c1x + stack.shift(), c2y = c1y + stack.shift(), jpx = c2x + stack.shift(), jpy = c2y + stack.shift(), c3x = jpx + stack.shift(), c3y = jpy + stack.shift(), c4x = c3x + stack.shift(), c4y = c3y + stack.shift(), Math.abs(c4x - x) > Math.abs(c4y - y) ? x = c4x + stack.shift() : y = c4y + stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy), Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y));
        else if ("o14" == v) {
          if (stack.length > 0 && !haveWidth && (width = stack.shift() + font.nominalWidthX, haveWidth = true), 4 == stack.length) {
            var adx = stack.shift(), ady = stack.shift(), bchar = stack.shift(), achar = stack.shift(), bind = Typr.CFF.glyphBySE(font, bchar), aind = Typr.CFF.glyphBySE(font, achar);
            Typr.U._drawCFF(font.CharStrings[bind], state, font, p), state.x = adx, state.y = ady, Typr.U._drawCFF(font.CharStrings[aind], state, font, p);
          }
          open && (Typr.U.P.closePath(p), open = false);
        } else if ("o19" == v || "o20" == v) {
          stack.length % 2 != 0 && !haveWidth && (width = stack.shift() + font.Private.nominalWidthX), nStems += stack.length >> 1, stack.length = 0, haveWidth = true, i += nStems + 7 >> 3;
        } else if ("o21" == v)
          stack.length > 2 && !haveWidth && (width = stack.shift() + font.Private.nominalWidthX, haveWidth = true), y += stack.pop(), x += stack.pop(), open && Typr.U.P.closePath(p), Typr.U.P.moveTo(p, x, y), open = true;
        else if ("o22" == v)
          stack.length > 1 && !haveWidth && (width = stack.shift() + font.Private.nominalWidthX, haveWidth = true), x += stack.pop(), open && Typr.U.P.closePath(p), Typr.U.P.moveTo(p, x, y), open = true;
        else if ("o25" == v) {
          for (; stack.length > 6; )
            x += stack.shift(), y += stack.shift(), Typr.U.P.lineTo(p, x, y);
          c1x = x + stack.shift(), c1y = y + stack.shift(), c2x = c1x + stack.shift(), c2y = c1y + stack.shift(), x = c2x + stack.shift(), y = c2y + stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
        } else if ("o26" == v)
          for (stack.length % 2 && (x += stack.shift()); stack.length > 0; )
            c1x = x, c1y = y + stack.shift(), x = c2x = c1x + stack.shift(), y = (c2y = c1y + stack.shift()) + stack.shift(), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
        else if ("o27" == v)
          for (stack.length % 2 && (y += stack.shift()); stack.length > 0; )
            c1y = y, c2x = (c1x = x + stack.shift()) + stack.shift(), c2y = c1y + stack.shift(), x = c2x + stack.shift(), y = c2y, Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
        else if ("o10" == v || "o29" == v) {
          var obj = "o10" == v ? font.Private : font;
          if (0 == stack.length)
            console.log("error: empty stack");
          else {
            var ind = stack.pop(), subr = obj.Subrs[ind + obj.Bias];
            state.x = x, state.y = y, state.nStems = nStems, state.haveWidth = haveWidth, state.width = width, state.open = open, Typr.U._drawCFF(subr, state, font, p), x = state.x, y = state.y, nStems = state.nStems, haveWidth = state.haveWidth, width = state.width, open = state.open;
          }
        } else if ("o30" == v || "o31" == v) {
          var count1 = stack.length, alternate = (index = 0, "o31" == v);
          for (index += count1 - (count = -3 & count1); index < count; )
            alternate ? (c1y = y, c2x = (c1x = x + stack.shift()) + stack.shift(), y = (c2y = c1y + stack.shift()) + stack.shift(), count - index == 5 ? (x = c2x + stack.shift(), index++) : x = c2x, alternate = false) : (c1x = x, c1y = y + stack.shift(), c2x = c1x + stack.shift(), c2y = c1y + stack.shift(), x = c2x + stack.shift(), count - index == 5 ? (y = c2y + stack.shift(), index++) : y = c2y, alternate = true), Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y), index += 4;
        } else {
          if ("o" == (v + "").charAt(0))
            throw console.log("Unknown operation: " + v, cmds), v;
          stack.push(v);
        }
      }
    }
    state.x = x, state.y = y, state.nStems = nStems, state.haveWidth = haveWidth, state.width = width, state.open = open;
  };
  const Typr$1 = getDefaultExportFromCjs(Typr), questionType = { "单选题": "0", "多选题": "1", "填空题": "2", "判断题": "3", "简答题": "4", "名词解释": "5", "论述题": "6", "计算题": "7" }, log = (data, type = "info") => {
    var _a;
    const style = `color: ${{ info: "orange", success: "green", error: "red" }[type]}; font-weight: bold;`;
    if (Array.isArray(data) || "object" == typeof data ? console.log(`%c${JSON.stringify(data, null, 2)}`, style) : console.log(`%c${data}`, style), getConfig().debugger) {
      const caller = (((_a = new Error().stack) == null ? void 0 : _a.split("\n")) || [])[2].trim();
      console.log(`${caller}`);
    }
  }, sleep = (time) => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1e3 * time);
  }),
  // 注意：sleep(t) 的参数单位是「秒」(内部 1e3 * t)。
  // 提交流程里需要的是毫秒级等待，若误用 sleep(500) 会真的等 500 秒，故单独提供 sleepMs。
  sleepMs = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
  }), waitIframeLoaded = (iframe) => new Promise((resolve) => {
    if (!iframe) return void resolve();
    let done = false;
    const finish = () => {
      if (!done) {
        done = true, clearInterval(timer), clearTimeout(timeoutId), resolve();
      }
    };
    const timer = setInterval(() => {
      try {
        var _a;
        iframe.contentDocument && "complete" === ((_a = iframe.contentDocument) == null ? void 0 : _a.readyState) ? finish() : iframe.addEventListener("load", finish, { once: true });
      } catch (e) {
        finish();
      }
    }, 100);
    const timeoutId = setTimeout(finish, 15e3);
  }), waitElementLoaded = (iframeWindow, selector) => new Promise((resolve) => {
    if (!iframeWindow) return void resolve();
    let done = false;
    const finish = () => {
      if (!done) {
        done = true, clearInterval(timer), clearTimeout(timeoutId), resolve();
      }
    };
    const timer = setInterval(() => {
      try {
        iframeWindow.document && iframeWindow.document.querySelector(selector) && finish();
      } catch (e) {
        finish();
      }
    }, 100);
    const timeoutId = setTimeout(finish, 15e3);
  }), removeHtml = (html) => null == html ? "" : html.replace(/<((?!img|sub|sup|br)[^>]+)>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").replace(/<br\s*\/?>/g, "\n").replace(/<img.*?src="(.*?)".*?>/g, '<img src="$1"/>').trim(), cl = (str) => str.replace(/^【.*?】\s*/, "").replace(/\s*（\d+\.\d+分）$/, ""), getQuestion = (type, html) => {
    let questionHtml, questionText, questionTypeId, optionHtml, tokenHtml, workType, optionText, index;
    switch (type) {
      case "1":
        return workType = "zj", questionHtml = Array.from(html.querySelectorAll(".clearfix .fontLabel")), questionText = cl(removeHtml(questionHtml[0].innerHTML)), questionTypeId = html.querySelectorAll("input[name^=answertype]")[0].value, optionHtml = Array.from(html.querySelectorAll("ul")[0].querySelectorAll("li .after")), tokenHtml = html.innerHTML, optionText = [], optionHtml.forEach(function(item) {
          optionText.push(removeHtml(item.innerHTML));
        }), { question: questionText, options: optionText, type: questionTypeId, questionData: tokenHtml, workType };
      case "2":
        workType = "zy", questionHtml = Array.from(html.querySelectorAll(".mark_name")), index = questionHtml[0].innerHTML.indexOf("</span>"), questionText = cl(removeHtml(questionHtml[0].innerHTML.substring(index + 7))), questionHtml[0].getElementsByTagName("span")[0].innerHTML.replace("(", "").replace(")", "").split(",")[0], questionTypeId = html.querySelectorAll("input[name^=answertype]")[0].value, optionHtml = Array.from(html.querySelectorAll(".answer_p")), tokenHtml = html.innerHTML, optionText = [];
        for (let i = 0; i < optionHtml.length; i++)
          optionText.push(removeHtml(optionHtml[i].innerHTML));
        return { question: questionText, options: optionText, type: questionTypeId, questionData: tokenHtml, workType };
      case "3":
        workType = "ks", questionHtml = Array.from(document.getElementsByClassName("mark_name colorDeep")), index = questionHtml[0].innerHTML.indexOf("</span>"), questionText = cl(removeHtml(questionHtml[0].innerHTML.substring(index + 7))), questionHtml[0].getElementsByTagName("span")[0].innerHTML.replace("(", "").replace(")", "").split(",")[0], questionTypeId = document.querySelectorAll("input[name^=type]")[1].value, optionHtml = Array.from(document.getElementsByClassName("answer_p")), tokenHtml = document.getElementsByClassName("mark_table")[0].innerHTML, optionText = [];
        for (let i = 0; i < optionHtml.length; i++)
          optionText.push(removeHtml(optionHtml[i].innerHTML));
        return { question: questionText, options: optionText, type: questionTypeId, questionData: tokenHtml, workType };
    }
  }, decode = (iframeWindow) => {
    var _a;
    const styleElements = iframeWindow.document.querySelectorAll("style");
    let tipElement = null;
    if (styleElements.forEach((styleElement) => {
      var _a2;
      -1 !== ((_a2 = styleElement.textContent) == null ? void 0 : _a2.indexOf("font-cxsecret")) && (tipElement = styleElement);
    }), !tipElement)
      return;
    const fontMatch = (_a = tipElement.textContent) == null ? void 0 : _a.match(/base64,([\w\W]+?)'/);
    if (!fontMatch)
      return;
    const fontData = ((base64) => {
      const decodedData = atob(base64), array = new Uint8Array(decodedData.length);
      for (let i = 0; i < decodedData.length; i++)
        array[i] = decodedData.charCodeAt(i);
      return array;
    })(fontMatch[1]), font = Typr$1.parse(fontData), table = JSON.parse(_GM_getResourceText("ttf"));
    let text = {};
    for (let i = 19968; i < 40870; i++) {
      let t = Typr$1.U.codeToGlyph(font, i);
      t && (t = Typr$1.U.glyphToPath(font, t), t = md5(JSON.stringify(t)).slice(24), text[i] = table[t]);
    }
    iframeWindow.document.querySelectorAll(".font-cxsecret").forEach((fontElement) => {
      let html = fontElement.innerHTML;
      Object.keys(text).forEach((key) => {
        const regex = new RegExp(String.fromCharCode(key), "g");
        html = html.replace(regex, String.fromCharCode(text[key]));
      }), fontElement.innerHTML = html, fontElement.classList.remove("font-cxsecret");
    });
  }, getAnswers = (questionData, windowz = _unsafeWindow) => {
    let server = new ServerApi(windowz);
    // AI 模式：调用大模型获取答案
    return Promise.all([server.getAnswer(questionData)]);
  }, fillAnswer = (answer, questionData, html, iframeWindow) => {
    answer = answer.filter((item) => item.answer.length > 0), console.log(answer);
    for (let i = 0; i < answer.length; i++) {
      if ("string" == typeof answer[i].answer) {
        if (-1 !== answer[i].answer.indexOf("付费题库") || -1 !== answer[i].answer.indexOf("暂无答案") || "略" == answer[i].answer)
          continue;
        answer[i].answer = [answer[i].answer];
      }
      let tmp = setAnswer(answer[i].answer, questionData, html, iframeWindow);
      if (tmp)
        return tmp;
    }
    return false;
  }, setAnswer = (answer, questionData, html, iframeWindow) => {
    switch (questionData.type) {
      case "0":
      case "1": {
        const matchArr = matchAnswer(answer, questionData.options);
        if (matchArr.length === 0) return false;
        clearCurrent(html, iframeWindow);
        const $root = $$1(html);
        // 选项 li 只取“像选项”的那些（含 .after / 表单控件 / .answerBg），
        // 避免题干中无关的 li 混入导致下标错位、点错或漏点选项
        let $lis = $root.find("ul:eq(0) li").filter(function() {
          return $$1(this).find(".after, :radio, :checkbox, .answerBg").length > 0;
        });
        if ($lis.length === 0) $lis = $root.find("li").filter(function() {
          return $$1(this).find(".after, :radio, :checkbox, .answerBg").length > 0;
        });
        const $answerBg = $root.find(".answerBg");
        for (let i = 0; i < matchArr.length; i++) {
          const idx = matchArr[i];
          let $li = $lis.eq(idx);
          // 优先按选项文本精确定位（最稳），文本匹配失败时退回下标定位
          const wantText = removeHtml(questionData.options[idx] || "");
          if (wantText) {
            const $byText = $lis.filter(function() {
              const $a = $$1(this).find(".after");
              return removeHtml($a.length ? $a.first().html() : this.innerHTML) === wantText;
            });
            if ($byText.length) $li = $byText.first();
          }
          const $input = $li.find(":radio, :checkbox").first();
          if ($input.length) {
            // 已选中的直接跳过：多选题重复点击会反选，反而造成“未做完”
            if ($input.prop("checked")) continue;
            const $label = $li.find("label").first();
            if ($label.length) $label.click();
            if (!$input.prop("checked") && $li.length) $li.click();
            // 最后兜底：直接置为选中并触发 change，保证页面“未做完”校验能通过
            if (!$input.prop("checked")) $input.prop("checked", true).trigger("change");
          } else if ($answerBg.eq(idx).length) {
            if ($answerBg.eq(idx).find(".check_answer, .check_answer_dx").length) continue;
            $answerBg.eq(idx).click();
          } else if ($li.length) {
            // ★★ 已选中的不重复点 ★★
            //   学习通的选项 li 是“点击即切换”（addChoice/addMultipleChoice 里都是 hasClass 判断后 add/remove），
            //   对同一项点第二次会把答案反选成空 → 隐藏域 #answer<qid> 变空 → 提交时弹“您还有未做完的X，确认提交吗？”。
            //   fillAnswer 在“第一条 AI 结果返回 false 时会用下一条再试”，很容易触发这次重复点击。
            if ($li.find(".check_answer, .check_answer_dx").length) continue;
            $li.click();
          }
        }
        // ★★ 确定性写答案模型（本轮核心）★★
        //   上面的点击是「尽力而为」：新模板（选项是 <span class="num_option choice<qid>">，没有 radio/.answerBg）
        //   里它根本不写模型，导致答案落不进 #answer<qid>、提交时被弹「您还有未做完的」。这里直接写死模型。
        let _wrote = null;
        try { _wrote = writeChoiceModel(html, matchArr, iframeWindow.document, "1" == questionData.type); } catch (e) { console.log("[答案模型] 直写失败:", e); }
        if (_wrote) return answer;
        // ★ 新模板判定：题内含 .choice<qid> 选项 span ⇒ 一定是新模板。
        //   新模板里页面没有 radio/.answerBg 可点，旧式 (hasInputs ? anyChecked : true) 会因 hasInputs=false 恒返回真，
        //   把「答案根本没写进模型」谎报成「已填入」→ 上层既看不到失败、也不标红，最后提交时才炸。
        //   这里必须如实返回 false，交由提交前的 choiceState/refillChoices 兜底补写。
        let _newTpl = false, _inpNow = null;
        try {
          _inpNow = answerInputOf(html, iframeWindow.document);
          if (_inpNow) _newTpl = !!iframeWindow.document.querySelectorAll(".choice" + String(_inpNow.id).slice(6)).length;
        } catch (e) {}
        if (_newTpl) {
          // 直写失败，但页面自身的点击路径可能已经把答案写进模型 → 以模型实际内容为准，避免误报失败
          try { if (_inpNow && String(_inpNow.value || "").replace(/\s+/g, "")) return answer; } catch (e) {}
          console.log("[答案模型] 新模板直写未成功，如实返回 false（等待提交前补写兜底）");
          return false;
        }
        // 兜底（老模板 / 结构异常）：沿用原来的 DOM 判定
        const hasInputs = $root.find("ul:eq(0) :radio, :checkbox").length > 0;
        const anyChecked = $root.find("ul:eq(0) :radio, :checkbox").filter(":checked").length > 0
          || $root.find(".check_answer, .check_answer_dx").length > 0;
        return (hasInputs ? anyChecked : true) ? answer : false;
      }
      case "3": {
        clearCurrent(html, iframeWindow);
        const _ans3 = answer instanceof Array ? answer[0] : answer;
        const _idxs3 = targetIndices("3", _ans3, questionData.options);
        try {
          $$1(html).find("ul:eq(0) li :radio,:checkbox,textarea").each(function() {
            "true" == $$1(this).val() ? _ans3.match(/(^|,)(True|true|正确|是|对|√|T|ri)(,|$)/) && $$1(this).click() : _ans3.match(/(^|,)(False|false|错误|否|错|×|F|wr)(,|$)/) && $$1(this).click();
          }), $$1(html).find(".answerBg").each(function() {
            "true" == $$1(this).find(".num_option").attr("data") ? _ans3.match(/(^|,)(True|true|正确|是|对|√|T|ri)(,|$)/) && $$1(this).click() : _ans3.match(/(^|,)(False|false|错误|否|错|×|F|wr)(,|$)/) && $$1(this).click();
          });
        } catch (e) {}
        // ★ 确定性写模型：判断题同样只读 #answer<qid>.value，必须直接写
        let _wrote3 = null;
        try { _wrote3 = writeChoiceModel(html, _idxs3, iframeWindow.document, false); } catch (e) { console.log("[答案模型] 判断题直写失败:", e); }
        if (_wrote3) return _ans3;
        // 新模板（题内有 .choice<qid>）下直写失败即真失败，绝不能用 hasInputs 兜底谎报成功（同 case 0/1）
        let _newTpl3 = false, _inpNow3 = null;
        try {
          _inpNow3 = answerInputOf(html, iframeWindow.document);
          if (_inpNow3) _newTpl3 = !!iframeWindow.document.querySelectorAll(".choice" + String(_inpNow3.id).slice(6)).length;
        } catch (e) {}
        if (_newTpl3) {
          try { if (_inpNow3 && String(_inpNow3.value || "").replace(/\s+/g, "")) return _ans3; } catch (e) {}
          console.log("[答案模型] 判断题新模板直写未成功，如实返回 false");
          return false;
        }
        return !!($$1(html).find("ul:eq(0) li :radio,:checkbox,textarea").is(":checked") || $$1(html).find(".check_answer").length > 0 || $$1(html).find(".check_answer_dx").length > 0) && _ans3;
      }
      case "2":
      case "9":
      case "4":
      case "5":
      case "6":
      case "7":
        const tas = $$1(html).find("textarea");
        if (tas.length === 0) return false;
        clearCurrent(html, iframeWindow);
        tas.each(function(index) {
          if (index < answer.length) {
            iframeWindow.UE.getEditor($$1(this).attr("name")).ready(function() {
              this.setContent((answer[index] || "").replace(/第.空:/g, ""));
            });
          }
        });
        return answer;
      default:
        return false;
    }
  }, matchAnswer = (answer, options) => {
    answer = ((answer2) => {
      if (answer2 instanceof Array) {
        answer2 = answer2.filter(function(item) {
          return null !== item;
        });
        for (let i2 = 0; i2 < answer2.length; i2++)
          answer2[i2] = removeHtml(answer2[i2]);
      } else
        "string" == typeof answer2 && (answer2 = cl(answer2));
      return answer2;
    })(answer);
    for (var matchArr = [], i = 0; i < answer.length; i++)
      for (var j = 0; j < options.length; j++)
        answer[i] == options[j] && matchArr.push(j);
    return matchArr;
  }, clearCurrent = (item, iframeWindow) => {
    $$1(item).find(".answerBg, .textDIV, .eidtDiv").each(function() {
      ($$1(this).find(".check_answer").length || $$1(this).find(".check_answer_dx").length) && $$1(this).click();
    }), $$1(item).find("textarea").each(function() {
      iframeWindow.UE.getEditor($$1(this).attr("name")).ready(function() {
        this.setContent("");
      });
    }),
    // ★ 新模板适配 ★ 现在选项是 <span class="num_option choice<qid>" data="A">，外层没有 .answerBg/.textDIV/.eidtDiv，
    //   上面的选择器一个都命中不到 → clearCurrent 在新模板上等于空操作，残留的旧选中会让「单选互斥 / 未做完」判定出错。
    //   这里直接摘掉选中类，并把对应的隐藏答案域一并清空，保证每次填充都从干净状态开始。
    $$1(item).find(".num_option.check_answer, .num_option.check_answer_dx, .num_option_dx.check_answer, .num_option_dx.check_answer_dx").removeClass("check_answer check_answer_dx"),
    $$1(item).find('input[type="hidden"][id^="answer"]').each(function() {
      /^answer\d+$/.test(this.id || "") && (this.value = "", this.setAttribute("value", ""));
    }),
    $$1(item).find(":radio, :checkbox").prop("checked", false), $$1(item).find("textarea").each(function() {
      iframeWindow.UE.getEditor($$1(this).attr("name")).ready(function() {
        this.setContent("");
      });
    });
  },
  // ★★ 定位题目对应的隐藏答案域 input#answer<qid> ★★
  //   这是页面「提交」与「未做完」校验唯一读的对象（confirmSubmitWork → $("#form1").serialize()；toadd → $("#answer"+id).val()）。
  //   注意 input[id^="answer"] 会同时命中 answertype<qid>，必须用 /^answer\d+$/ 精确排除。
  //   真机结构：<div class="singleQuesId" data="qid"><div class="TiMu">…<ul>…</ul><input type="hidden" id="answer<qid>"></div></div>
  answerInputOf = (timu, doc) => {
    if (!timu) return null;
    // 两轮扫描：先严格 /^answer\d+$/（标准形态），再放宽 /^answer\w+$/（兼容个别模板给 #answer 加后缀的变体）。
    // 两轮都必须排除 answertype<qid>——它的 id 同样以 "answer" 开头，混进来会让写入落到错误的对象上。
    const scan = (scope) => {
      let ns = [];
      try { ns = scope.querySelectorAll('input[id^="answer"]'); } catch (e) { return null; }
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < ns.length; i++) {
          const id = (ns[i] && ns[i].id) || "";
          if (/^answertype/i.test(id)) continue;
          if (pass === 0 ? /^answer\d+$/.test(id) : /^answer\w+$/.test(id)) return ns[i];
        }
      }
      return null;
    };
    const direct = scan(timu);
    if (direct) return direct;
    try {
      let n = timu;
      while (n && n !== doc) {
        if (n.classList && n.classList.contains("singleQuesId")) return scan(n);
        n = n.parentElement;
      }
    } catch (e) {}
    return null;
  },
  // 由「AI 给出的答案」算出目标选项下标（相对 questionData.options / 选项 DOM 顺序）
  //   选择类：按选项文本匹配；判断题再补一条「正确/错误」语义兜底（有些模板 data 是 true/false 而非 A/B）
  targetIndices = (type, answer, options) => {
    const arr = answer instanceof Array ? answer : [String(answer)];
    let idxs = [];
    try { idxs = matchAnswer(arr, options || []); } catch (e) {}
    if (!idxs.length && "3" === String(type) && (options || []).length === 2) {
      const isTrue = /(^|,)(True|true|正确|是|对|√|T|ri|A)(,|$)/.test(String(arr[0]));
      idxs = [isTrue ? 0 : 1];
    }
    return idxs;
  },
  // ★★★ 确定性写答案模型（本轮核心修复）★★★
  //   学习通的提交链（serialize）与「未做完」校验（toadd）都只读 #answer<qid>.value；
  //   而新模板的选项是 <span class="num_option choice<qid>" data="A">，页面上没有 radio / .answerBg，
  //   旧实现「点 li 让页面自己写模型」在新模板上整条失效（既不写 value，也无从判断）。
  //   所以这里直接：① 按 DOM 顺序给选项 span 打/清选中类；② 直接写 input.value = 字母串。
  //   无论模板怎么变、li.click() 有没有生效，模型都一定写进去。
  //   返回写入的字母串；找不到新模板结构（无 .choice<qid> span）时返回 null —— 此时**绝不触碰** input.value，
  //   以免把旧模板（yatori/H5）里已经由点击写好、但结构不同的答案抹掉。
  writeChoiceModel = (timu, indices, doc, multi) => {
    const d = doc || (timu && timu.ownerDocument);
    const inp = answerInputOf(timu, d);
    if (!inp) { console.log("[答案模型] 直写放弃：题内未定位到 #answer<qid>"); return null; }
    const qid = String(inp.id).slice(6);
    // 选项 span 逐级兜底定位。页面自身约定是 .choice<qid>（addChoice/addMultipleChoice 正是按它聚合 data 写 #answer），
    // 但不同模板可能把类挂在 .num_option / .num_option_dx 上，所以一级不行就降级，尽量别放弃。
    let spans = [];
    const take = (fn) => { if (spans.length) return; try { const r = fn(); if (r && r.length) spans = r; } catch (e) {} };
    take(() => d.querySelectorAll(".choice" + qid));
    take(() => timu.querySelectorAll(".num_option, .num_option_dx"));
    take(() => timu.querySelectorAll("span[data]"));
    // 一个都找不到 ⇒ 不是新模板 → 绝不触碰 input.value，交给原来的点击逻辑（保护 yatori/H5 老模板已写好的答案）
    if (!spans.length) { console.log("[答案模型] 直写放弃：qid=" + qid + " 未找到任何选项元素"); return null; }
    const want = {};
    (indices || []).forEach(function (i) { want[i] = true; });
    const singleCls = "check_answer", multiCls = "check_answer_dx";
    let value = "";
    for (let s = 0; s < spans.length; s++) {
      const sp = spans[s];
      // 下标只认「题目内选项顺序」：spans 按 DOM 顺序返回，与 questionData.options 一致
      const on = !!want[s];
      try {
        sp.classList.remove(singleCls); sp.classList.remove(multiCls);   // 先清后设：单选必须互斥
        if (on) sp.classList.add(multi ? multiCls : singleCls);
        const li = sp.closest ? sp.closest("li") : null;
        if (li) { li.setAttribute("aria-checked", on ? "true" : "false"); li.setAttribute("aria-pressed", on ? "true" : "false"); }
      } catch (e) {}
      if (on) value += (sp.getAttribute("data") || String.fromCharCode(65 + s));
    }
    if (!value) { console.log("[答案模型] 直写放弃：qid=" + qid + " 目标下标算不出值（indices=" + JSON.stringify(indices) + " spans=" + spans.length + "）"); return null; }
    try { inp.value = value; inp.setAttribute("value", value); } catch (e) { return null; }
    // 回读校验：写入必须真的落到模型上，否则一律视为失败（宁可由上层重试/拒绝，也不谎报「已填入」）
    if (String(inp.value == null ? "" : inp.value) !== value) { console.log("[答案模型] 直写回读不一致：期望 " + value + " 实得 " + inp.value); return null; }
    return value;
  },
  // ★★ 根因修复的关键一环：把 askStore 里存的「AI 结果对象数组」拍平成纯答案字符串数组 ★★
  //   askStore 存的是 fillAnswer 的返回值 = [{form, answer:[…], num, usenum, …}]，并不是答案字符串。
  //   旧 refillChoices 直接把它整包交给 matchAnswer → removeHtml(对象) 得 "[object Object]" → 恒不匹配 → 补写永远失败。
  //   这里统一归一化：对象取 .answer，数组递归，最终只留非空字符串。
  flattenAnswers = (raw) => {
    const out = [];
    const walk = (v) => {
      if (v == null) return;
      if (Array.isArray(v)) { v.forEach(walk); return; }
      if (typeof v === "object") { if ("answer" in v) walk(v.answer); return; }
      const s = String(v).trim();
      if (s) out.push(s);
    };
    walk(raw);
    return out;
  }, useAskStore = pinia$1.defineStore({ id: "ask", state: () => ({ dialogVisible: true, count: 0, submitFailed: false, questionList: [], task: { name: "执行任务中", work: { questionList: [], inx: 0 }, video: [], log: [], status: "" } }), actions: { reset() {
    this.task.name = "执行任务中", this.task.work = { questionList: [], inx: 0 }, this.task.video = [], this.task.status = "", this.count = 0, this.submitFailed = false;
  }, select(index) {
    this.task.work.questionList[index].selected = true, this.task.work.inx = index;
    try {
      this.task.work.questionList[index].dom.scrollIntoView({ block: "center" });
    } catch (e) {
      log(e, "error");
    }
  }, get(index) {
    return this.task.work.questionList[index];
  }, insert(question) {
    this.task.work.questionList.push(question);
  }, update(index, question) {
    this.task.work.questionList[index] = question;
  }, log(msg, level = "info") {
    this.task.log.length > 20 && this.task.log.shift(), this.task.log.push({ time: (/* @__PURE__ */ new Date()).toLocaleTimeString(), msg, type: level });
    // 面板日志以前只进 UI，F12 控制台看不到 → 排查「为什么没提交/为什么判失败」只能靠猜。
    // 这里同步打一份到控制台，前缀 [日志]，错误级别再加 [错误]。
    try { console.log("[日志]" + ("error" === level ? "[错误]" : "success" === level ? "[成功]" : "") + " " + msg); } catch (e) {}
  }, msg(msg) {
    this.task.status = msg;
  } } }), _sfc_main = vue.defineComponent({ setup() {
    const askstore = useAskStore(), { dialogVisible, count, questionList, task } = pinia$1.storeToRefs(askstore), askActiveName = vue.ref("first"), askActiveNames = vue.ref(["1"]), msg = vue.ref("<h3>本脚本仅用于学习交流，请24h内删除。</h3><br><p style='color:red;'>禁止用于各种非法用途，否则后果自负！</p><br><p>答案由AI大语言模型生成，准确率不保证 100%，请自行判断、评估是否使用。</p><br><p style='font-size:13px;color:#888;'>PS：觉得脚本不错的话，还请给作者点点关注，期待给大家带来更多好用的产品！<br><a href='https://v.douyin.com/f0YirlQE0sI/' target='_blank' style='color:#409eff;text-decoration:none;'>关注作者</a></p>"), formstoreObj = useformStore(), { forminput, dialogV, activeName } = pinia$1.storeToRefs(formstoreObj), ruleFormRef = vue.ref(), rules = vue.reactive({ interval: [{ required: true, message: "间隔时间不能为空" }, { type: "number", message: "间隔时间必须为数字" }, { validator: (rule, value) => value >= 1 ? Promise.resolve() : Promise.reject("间隔时间必须大于等于1") }], answerInterval: [{ required: true, message: "答题间隔不能为空" }, { type: "number", message: "答题间隔必须为数字" }, { validator: (rule, value) => value >= 1 ? Promise.resolve() : Promise.reject("答题间隔必须大于等于1") }], token: [{ validator: (rule, value) => {
      if (value) {
        return /^[a-zA-Z0-9]{6,}$/.test(value) ? Promise.resolve() : Promise.reject("token格式错误");
      }
      return Promise.resolve();
    } }] });
    return { count, dialogVisible, questionList, askActiveName, askActiveNames, task, msg, Aim: aim_default, handleClick: (e) => {
      askstore.select(e);
    }, dialogV, activeName, ruleFormRef, forminput, rules, submitForm: async (formEl) => {
      formEl && await formEl.validate((valid, fields) => {
        valid && (formstoreObj.saveConfig(forminput.value), ElementPlus.ElNotification({ title: "Success", message: "配置保存成功,请自行刷新页面", type: "success" }), dialogV.value = false);
      });
    }, userConfig, Setting: setting_default };
  } }), _hoisted_1 = { class: "dialog-footer" }, _hoisted_2 = { key: 0 }, _hoisted_3 = { class: "question_div" }, _hoisted_4 = { class: "question_ti" }, _hoisted_5 = { key: 0 }, _hoisted_6 = { key: 1 }, _hoisted_7 = { key: 2 }, _hoisted_8 = ["innerHTML"], _hoisted_9 = { key: 0, style: { "margin-top": "20px" } }, _hoisted_10 = { key: 1 }, _hoisted_11 = { key: 2 }, _hoisted_12 = { height: "100px" }, _hoisted_13 = ["innerHTML"];
  const Ask = _export_sfc(_sfc_main, [["render", function(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_el_button = vue.resolveComponent("el-button"), _component_el_switch = vue.resolveComponent("el-switch"), _component_el_input = vue.resolveComponent("el-input"), _component_el_input_number = vue.resolveComponent("el-input-number"), _component_el_option = vue.resolveComponent("el-option"), _component_el_select = vue.resolveComponent("el-select"), _component_el_checkbox = vue.resolveComponent("el-checkbox"), _component_el_checkbox_group = vue.resolveComponent("el-checkbox-group"), _component_el_tooltip = vue.resolveComponent("el-tooltip"), _component_el_form_item = vue.resolveComponent("el-form-item"), _component_el_tab_pane = vue.resolveComponent("el-tab-pane"), _component_el_tabs = vue.resolveComponent("el-tabs"), _component_el_form = vue.resolveComponent("el-form"), _component_el_dialog = vue.resolveComponent("el-dialog"), _component_el_text = vue.resolveComponent("el-text"), _component_el_skeleton = vue.resolveComponent("el-skeleton"), _component_el_card = vue.resolveComponent("el-card"), _component_el_divider = vue.resolveComponent("el-divider"), _component_el_col = vue.resolveComponent("el-col"), _component_el_row = vue.resolveComponent("el-row"), _component_el_scrollbar = vue.resolveComponent("el-scrollbar"), _component_el_tag = vue.resolveComponent("el-tag"), _component_el_alert = vue.resolveComponent("el-alert"), _component_el_empty = vue.resolveComponent("el-empty");
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [vue.createVNode(_component_el_button, { type: "danger", id: "csbutton", icon: _ctx.Setting, circle: "", onClick: _cache[0] || (_cache[0] = ($event) => { const s = _unsafeWindow._askStore; if (s) s.dialogVisible = !s.dialogVisible; else _ctx.dialogV = !_ctx.dialogV; }) }, null, 8, ["icon"]), vue.createVNode(_component_el_dialog, { modelValue: _ctx.dialogV, "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.dialogV = $event), title: "学习通AI学习助手", width: "30%", modal: false, center: "", draggable: "" }, { footer: vue.withCtx(() => [vue.createElementVNode("span", _hoisted_1, [vue.createVNode(_component_el_button, { onClick: _cache[2] || (_cache[2] = ($event) => _ctx.dialogV = false) }, { default: vue.withCtx(() => [vue.createTextVNode("取消")]), _: 1 }), vue.createVNode(_component_el_button, { type: "primary", onClick: _cache[3] || (_cache[3] = ($event) => _ctx.submitForm(_ctx.ruleFormRef)) }, { default: vue.withCtx(() => [vue.createTextVNode("保存")]), _: 1 })])]), default: vue.withCtx(() => [vue.createVNode(_component_el_form, { ref: "ruleFormRef", rules: _ctx.rules, model: _ctx.forminput, class: "demo-ruleForm" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_tabs, { class: "demo-tabs", modelValue: _ctx.activeName, "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.activeName = $event) }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.userConfig, (item) => (vue.openBlock(), vue.createBlock(_component_el_tab_pane, { key: item.name, label: item.label, name: item.name }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.config, (item1) => (vue.openBlock(), vue.createBlock(_component_el_form_item, { label: item1.label, prop: item1.name }, { default: vue.withCtx(() => [vue.createVNode(_component_el_tooltip, { class: "box-item", effect: "dark", content: item1.desc || "", placement: "top" }, { default: vue.withCtx(() => ["switch" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_switch, { key: 0, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, null, 8, ["modelValue", "onUpdate:modelValue"])) : "input" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_input, { key: 1, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, null, 8, ["modelValue", "onUpdate:modelValue"])) : "number" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_input_number, { key: 2, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, null, 8, ["modelValue", "onUpdate:modelValue"])) : "select" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_select, { key: 3, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event, placeholder: "请选择" }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item1.options, (item2) => (vue.openBlock(), vue.createBlock(_component_el_option, { key: item2.value, label: item2.label, value: item2.value }, null, 8, ["label", "value"]))), 128))]), _: 2 }, 1032, ["modelValue", "onUpdate:modelValue"])) : "checkbox" === item1.type ? (vue.openBlock(), vue.createBlock(_component_el_checkbox_group, { key: 4, modelValue: _ctx.forminput[item1.name], "onUpdate:modelValue": ($event) => _ctx.forminput[item1.name] = $event }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item1.options, (item2) => (vue.openBlock(), vue.createBlock(_component_el_checkbox, { key: item2.value, label: item2.value, name: item2.value }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(item2.label), 1)]), _: 2 }, 1032, ["label", "name"]))), 128))]), _: 2 }, 1032, ["modelValue", "onUpdate:modelValue"])) : vue.createCommentVNode("", true)]), _: 2 }, 1032, ["content"])]), _: 2 }, 1032, ["label", "prop"]))), 256))]), _: 2 }, 1032, ["label", "name"]))), 128))]), _: 1 }, 8, ["modelValue"])]), _: 1 }, 8, ["rules", "model"])]), _: 1 }, 8, ["modelValue"]), (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "body" }, [vue.createVNode(_component_el_button, { id: "zeokdjg", type: "success", plain: "", round: "", icon: _ctx.Aim, onClick: _cache[5] || (_cache[5] = ($event) => _ctx.dialogVisible = !_ctx.dialogVisible) }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString("执行任务中" == _ctx.task.name ? "等待任务加载" : "正在完成:" + _ctx.task.name), 1)]), _: 1 }, 8, ["icon"]), vue.createVNode(_component_el_dialog, { modelValue: _ctx.dialogVisible, "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.dialogVisible = $event), width: "400px", title: "学习通AI学习助手", modal: false, "append-to-body": false, "lock-scroll": false, center: "", draggable: "" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_button, { style: { "margin-bottom": "20px" }, type: "primary", onClick: _cache[6] || (_cache[6] = ($event) => _ctx.dialogV = !_ctx.dialogV), plain: "" }, { default: vue.withCtx(() => [vue.createTextVNode("打开配置")]), _: 1 }), vue.createVNode(_component_el_text, { class: "mx-1", size: "large", type: "danger" }, { default: vue.withCtx(() => [vue.createTextVNode("")]), _: 1 }), vue.createVNode(_component_el_tabs, { modelValue: _ctx.askActiveName, "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.askActiveName = $event), class: "demo-tabs" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_tab_pane, { label: "运行框", name: "first" }, { default: vue.withCtx(() => [_ctx.task.work.questionList.length > 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [vue.createElementVNode("div", _hoisted_3, [vue.createVNode(_component_el_card, { shadow: "hover" }, { default: vue.withCtx(() => [vue.createElementVNode("h1", _hoisted_4, [vue.createVNode(_component_el_text, { size: "large", truncated: "" }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(_ctx.task.work.inx + 1 + "." + _ctx.task.work.questionList[_ctx.task.work.inx].question), 1)]), _: 1 })]), _ctx.task.work.questionList[_ctx.task.work.inx].answer ? (vue.openBlock(), vue.createElementBlock("p", _hoisted_6, [vue.createElementVNode("p", null, [vue.createElementVNode("pre", null, vue.toDisplayString(_ctx.task.work.questionList[_ctx.task.work.inx].answer), 1)])])) : (vue.openBlock(), vue.createElementBlock("p", _hoisted_5, [vue.createVNode(_component_el_skeleton, { rows: 3, animated: "" })]))]), _: 1 })]), "考试" != _ctx.task.name ? (vue.openBlock(), vue.createBlock(_component_el_divider, { key: 0 }, { default: vue.withCtx(() => [vue.createTextVNode(" 题号 ")]), _: 1 })) : vue.createCommentVNode("", true), "考试" != _ctx.task.name ? (vue.openBlock(), vue.createBlock(_component_el_scrollbar, { key: 1, height: "100px" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_row, null, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.task.work.questionList, (item, index) => (vue.openBlock(), vue.createBlock(_component_el_col, { span: 4, key: index }, { default: vue.withCtx(() => [vue.createVNode(_component_el_button, { type: item.status || "info", plain: "", class: "question_btn", onClick: ($event) => _ctx.handleClick(index) }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(index + 1), 1)]), _: 2 }, 1032, ["type", "onClick"])]), _: 2 }, 1024))), 128))]), _: 1 })]), _: 1 })) : vue.createCommentVNode("", true), _ctx.task.work.questionList[_ctx.task.work.inx].allAnswer ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [vue.createVNode(_component_el_divider, null, { default: vue.withCtx(() => [vue.createTextVNode(" 接口返回 ")]), _: 1 }), vue.createVNode(_component_el_tabs, { "tab-position": "left", class: "demo-tabs" }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.task.work.questionList[_ctx.task.work.inx].allAnswer, (item, index) => (vue.openBlock(), vue.createBlock(_component_el_tab_pane, { label: item.form }, { default: vue.withCtx(() => [vue.createElementVNode("div", null, [vue.createElementVNode("div", { innerHTML: (item.answer || "暂无答案") + "<br><p style = 'color:red;'></p>" }, null, 8, _hoisted_8), null != item.num ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9, [vue.createElementVNode("div", null, [vue.createVNode(_component_el_tag, { class: "ml-2", type: "success" }, { default: vue.withCtx(() => [vue.createTextVNode("输出Token:" + vue.toDisplayString(item.usenum), 1)]), _: 2 }, 1024)]), vue.createElementVNode("div", null, [vue.createVNode(_component_el_tag, { class: "ml-2", type: "info" }, { default: vue.withCtx(() => [vue.createTextVNode("输入Token:" + vue.toDisplayString(item.num), 1)]), _: 2 }, 1024)])])) : vue.createCommentVNode("", true)])]), _: 2 }, 1032, ["label"]))), 256))]), _: 1 })])) : vue.createCommentVNode("", true)])) : _ctx.task.video.status ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_10, [vue.createVNode(_component_el_alert, { title: "倍速有风险，挂科两行泪", type: "error", center: "", "show-icon": "" }), vue.createVNode(_component_el_text, { class: "mx-1", size: "large", type: "danger" }, { default: vue.withCtx(() => [vue.createTextVNode(" 正在完成视频任务 ")]), _: 1 })])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_11, [vue.createElementVNode("div", _hoisted_12, [vue.createVNode(_component_el_empty, { description: _ctx.task.name }, null, 8, ["description"])])]))]), _: 1 }), vue.createVNode(_component_el_tab_pane, { label: "运行日志", name: "second" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_scrollbar, { height: "200px" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_row, null, { default: vue.withCtx(() => [vue.createVNode(_component_el_col, { span: 24 }, { default: vue.withCtx(() => [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.task.log, (item, index) => (vue.openBlock(), vue.createElementBlock("p", { key: index, class: "cx_log" }, [vue.createVNode(_component_el_text, { size: "small", type: "info", class: "mx-1" }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(item.time), 1)]), _: 2 }, 1024), vue.createVNode(_component_el_text, { class: "mx-1", type: "info" == item.type ? "" : item.type }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(" " + item.msg), 1)]), _: 2 }, 1032, ["type"])]))), 128))]), _: 1 })]), _: 1 })]), _: 1 })]), _: 1 }), vue.createVNode(_component_el_tab_pane, { label: "声明", name: "msg" }, { default: vue.withCtx(() => [vue.createVNode(_component_el_card, { shadow: "hover" }, { default: vue.withCtx(() => [vue.createElementVNode("div", { innerHTML: _ctx.msg }, null, 8, _hoisted_13)]), _: 1 })]), _: 1 })]), _: 1 }, 8, ["modelValue"]), vue.createElementVNode("p", null, [_ctx.task.status ? (vue.openBlock(), vue.createBlock(_component_el_tag, { key: 0 }, { default: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(_ctx.task.status), 1)]), _: 1 })) : vue.createCommentVNode("", true)])]), _: 1 }, 8, ["modelValue"])]))], 64);
  }], ["__scopeId", "data-v-c3c6b09f"]]);
  class Cx {
    constructor() {
      __publicField(this, "app");
      __publicField(this, "askStore");
      __publicField(this, "ServerApi");
      __publicField(this, "defaultConfig");
      this.app = vue.createApp(Ask).use(ElementPlus).use(pinia$1.createPinia()), this.askStore = useAskStore(), _unsafeWindow._askStore = this.askStore, this.ServerApi = new ServerApi(), this.defaultConfig = getConfig(), this.app.mount((() => {
        try { var td = _unsafeWindow.top.document; } catch(e) { td = document; }
        const div = td.createElement("div");
        return div.id = "xxxxzx", td.getElementById(div.id) || td.body.append(div), div;
      })());
    }
    async audio(iframeWindow, ctx) {
      const aborted = ctx && "function" == typeof ctx.aborted ? ctx.aborted : function() { return false; };
      this.askStore.reset(), this.askStore.task.name = "视频音频";
      const audio = iframeWindow.document.getElementById("audio_html5_api");
      return audio.muted = true, audio.autoplay = true, audio.volume = 0, audio.play().then(function() {
        console.log("播放成功");
      }).catch(function(error) {
        "NotAllowedError" === error.name ? ElementPlus.ElMessageBox.alert("由于自动播放需要用户点击过浏览器，请确认即可", "温馨提示", { confirmButtonText: "确认", callback: () => {
          audio.play();
        } }) : console.error("视频播放失败，原因：", error);
      }), new Promise((resolve) => {
        const intervalId = setInterval(() => {
          if (aborted()) return clearInterval(intervalId), console.log("[中断] 音频任务已中止"), resolve();
          audio.ended ? (clearInterval(intervalId), log("监听到音频已完成", "success"), resolve()) : audio.paused && audio.play();
        }, 1e3);
        audio.addEventListener("ended", function() {
          log("监听到音频已完成1", "success"), audio.pause(), clearInterval(intervalId), resolve();
        });
      });
    }
    async video(iframeWindow, ctx) {
      const aborted = ctx && "function" == typeof ctx.aborted ? ctx.aborted : function() { return false; };
      this.askStore.reset(), this.askStore.task.name = "视频", this.askStore.task.video.status = 1;
      await waitElementLoaded(iframeWindow, "#video_html5_api"), console.log("视频加载完成");
      if (aborted()) return void console.log("[中断] 视频任务已中止（章节已切换）");
      const player = iframeWindow.videojs("video_html5_api"), playerButton = iframeWindow.document.querySelector(".vjs-big-play-button");
      player.muted(true), player.playbackRate(16), player.play(), await new Promise((resolve) => {
        const intervalId = setInterval(() => {
          if (aborted()) { clearInterval(intervalId); try { player.pause(); } catch (e) {} return void console.log("[中断] 视频任务已中止"), resolve(); }
          "isUnFinishJob" in iframeWindow && iframeWindow.isUnFinishJob() ? player.paused() && (playerButton == null ? void 0 : playerButton.click()) : (clearInterval(intervalId), resolve());
        }, 1e3), pauseBase = player.pause;
        player.pause = function() {
          player.currentTime() >= player.duration() && (console.log("视频播放完成"), player.pause = pauseBase, resolve());
        }, player.on("ended", () => {
          console.log("视频播放完成1"), player.pause = pauseBase, player.pause(), clearInterval(intervalId), resolve();
        });
      }), console.log("任务点完成");
    }
    work(iframeWindow, ctx) {
      return new Promise(async (resolve) => {
        // ctx.aborted() 为真表示用户已手动切章，本任务必须立刻让出，不能继续往已失效的 DOM 里填答案
        const aborted = ctx && "function" == typeof ctx.aborted ? ctx.aborted : function() { return false; };
        const stopIfAborted = (msg) => {
          if (!aborted()) return false;
          this.askStore.log(msg, "info");
          return true;
        };
        decode(iframeWindow);
        const Timu = iframeWindow.document.querySelectorAll(".TiMu");
        if (!Timu)
          return void resolve();
        let ques = [], succ = 0, aiAnswered = 0;
        for (let i = 0; i < Timu.length; i++) {
          let data = getQuestion("1", Timu[i]);
          console.log(data), ques.push(data);
        }
        this.askStore.reset(), this.askStore.count = ques.length, this.askStore.task.name = "章节测验";
        for (let i = 0; i < ques.length; i++) {
          if (stopIfAborted("检测到已手动切换章节，中止本章答题")) return void resolve();
          await sleep(this.defaultConfig.answerInterval), this.askStore.insert(ques[i]), this.askStore.task.work.inx = i;
          // 修复：原脚本只读 window._aiQIdx 从不写入，导致每道题的日志都打印「第 1 题」
          window._aiQIdx = i;
          let data = await getAnswers(ques[i], iframeWindow);
          if (stopIfAborted("检测到已手动切换章节，中止本章答题")) return void resolve();
          this.askStore.get(i).allAnswer = data;
          let aiHasAnswer = data.some(function(d) { var a = d.answer; return a && (typeof a === "string" ? a.length > 0 : a.length > 0); });
          aiHasAnswer && aiAnswered++;
          let tmp = fillAnswer(data, ques[i], Timu[i], iframeWindow);
          tmp ? (this.askStore.get(i).status = "primary", this.askStore.get(i).answer = tmp, succ++) : (this.askStore.get(i).status = "danger", this.askStore.get(i).answer = "暂无答案"), this.askStore.get(i).dom = Timu[i];
        }
        if (stopIfAborted("检测到已手动切换章节，跳过提交")) return void resolve();
        // ★★ 让答案真正写进“页面自己的答案模型”，并在提交前后反复校验 ★★
        // 学习通的校验/提交读的是隐藏域 #answer<qid>，由选项 li 的 onclick=addChoice/addMultipleChoice 写入。
        // 页面提交失败时会执行 location.reload()（见 realwork.html 的 confirmSubmitWork），
        // DOM 勾选与 #answer 隐藏域会被一起清空 → 若不重填就直接再提交，交上去的是**空白卷**。
        // 所以这里不只在填充后校验一次，而是把「状态查询 / 按存好的答案重填」做成可复用函数，交给提交环节反复调用。
        const isChoiceType = (t) => { t = String(t); return t === "0" || t === "1" || t === "3"; };   // 单选/多选/判断：#answer 由点选即时写入
        const qidOfTimu = (timu, doc) => {
          if (!timu) return null;
          // ① 最稳：题内容器里的隐藏答案域 input#answer<qid> —— 它才是页面提交/校验真正读的对象，
          //    用它反推 qid 可以彻底摆脱「判断题 li 上没有 qid / 结构变体」导致的“无法定位”
          try { const inp = answerInputOf(timu, doc || iframeWindow.document); if (inp) { const q = String(inp.id).slice(6); if (q) return q; } } catch (e) {}
          // ② 选项 li 上的 qid（li[qid="..." onclick="addChoice(this)"）
          try { const el = timu.querySelector("[qid]"); if (el) { const q = el.getAttribute("qid"); if (q) return q; } } catch (e) {}
          // ③ 外层 .singleQuesId 的 data 属性
          try {
            let n = timu;
            while (n && n !== doc) { if (n.classList && n.classList.contains("singleQuesId")) return n.getAttribute("data"); n = n.parentElement; }
          } catch (e) {}
          return null;
        };
        // 选择题答案模型状态。每次都重新取 DOM —— 页面重载后旧节点会失效，缓存住的 NodeList 会给出错误结论。
        const choiceState = () => {
          const doc = iframeWindow.document;
          let Ti = [];
          try { Ti = doc.querySelectorAll(".TiMu"); } catch (e) {}
          const missing = [];
          let total = 0, unknown = 0;
          for (let i = 0; i < ques.length; i++) {
            if (!isChoiceType(ques[i].type)) continue;
            const qid = qidOfTimu(Ti[i], doc);
            if (!qid) { unknown++; continue; }                       // 定位不到就当“无法判定”，不误报
            let inp = null;
            try { inp = doc.getElementById("answer" + qid); } catch (e) {}
            if (!inp) { unknown++; continue; }
            total++;
            if (!String(inp.value || "").replace(/\s+/g, "")) missing.push(i);
          }
          return { total: total, unknown: unknown, missing: missing };
        };
        // 把缺失的选择题按我们已存的答案重新点选回去（已选中的一律跳过，绝不反选）
        const refillChoices = () => {
          const doc = iframeWindow.document;
          let Ti = [];
          try { Ti = doc.querySelectorAll(".TiMu"); } catch (e) {}
          const st = choiceState();
          for (let n = 0; n < st.missing.length; n++) {
            const idx = st.missing[n], timu = Ti[idx];
            if (!timu) continue;
            // ★★ 根因修复（本轮核心，勿再退回）★★
            //   askStore 里存的是 fillAnswer 的返回值 —— 那是 **AI 结果对象数组** [{form, answer:[…], …}]，
            //   并不是答案字符串。旧实现把它整包丢给 targetIndices → removeHtml(对象) 得 "[object Object]"
            //   → matchAnswer 恒空 → idxs 恒空 → continue ⇒ **补写永远不可能成功**。
            //   于是「只要有一题没写进 #answer<qid>，就必然一路走到『拒绝提交空白答案』」——这就是用户症状的直接根因。
            //   这里改为：优先取 allAnswer（AI 原始结果，无论 fill 成功与否都存了），并**递归拍平**成纯答案字符串数组。
            const rec = this.askStore.get(idx) || {};
            const raw = rec.allAnswer != null ? rec.allAnswer : rec.answer;
            const arr = flattenAnswers(raw);
            if (!arr.length) continue;
            const multi = "1" === String(ques[idx].type);
            const idxs = targetIndices(ques[idx].type, arr, ques[idx].options || []);
            if (!idxs.length) continue;
            // ★ 确定性写模型（本轮核心）：不再依赖 li.click() —— 新模板里它根本不写 #answer<qid>。
            //   这一步就是「页面刷新清空答案后能不能补回来」的关键。
            let wrote = null;
            try { wrote = writeChoiceModel(timu, idxs, doc, multi); } catch (e) { console.log("[答案模型] 重填直写失败:", e); }
            if (wrote) { console.log("[答案模型] 补写第 " + (idx + 1) + " 题成功 → " + wrote + "（第 " + (n + 1) + " 个缺失）"); continue; }
            console.log("[答案模型] 补写第 " + (idx + 1) + " 题仍失败（idxs=" + JSON.stringify(idxs) + "），转点击兜底");
            // 兜底（老模板 / 结构异常）：按选项文本点击
            const qid = qidOfTimu(timu, doc);
            if (!qid) continue;
            let lis = [];
            try { const ns = doc.querySelectorAll("li[qid='" + qid + "']"); for (let q = 0; q < ns.length; q++) lis.push(ns[q]); } catch (e) {}
            for (let q = 0; q < lis.length; q++) {
              const li = lis[q];
              if (li.querySelector(".check_answer, .check_answer_dx")) continue;   // 已选中的不要点，多选会反选
              const after = li.querySelector(".after");
              const liTxt = removeHtml((after ? after.innerHTML : li.innerHTML) || "").trim();
              let letter = null;
              try { const sp = li.querySelector(".num_option, .num_option_dx"); letter = sp ? sp.getAttribute("data") : null; } catch (e) {}
              const want = arr.some(function(a) {
                const s = removeHtml(String(a)).trim();
                return s && (s === liTxt || (letter && s === letter));
              });
              if (want) { try { li.click(); } catch (e) {} }
            }
          }
        };
        try {
          const st0 = choiceState();
          if (st0.missing.length) {
            this.askStore.log("页面答案模型校验：有 " + st0.missing.length + " 题未写入页面（第 " + st0.missing.map(function(o) { return o + 1; }).join("、") + " 题），正在补写…", "info");
            refillChoices();
            const st1 = choiceState();
            if (st1.missing.length) this.askStore.log("补写后仍有 " + st1.missing.length + " 题为空（第 " + st1.missing.map(function(o) { return o + 1; }).join("、") + " 题），提交环节会再次补写；仍补不上则拒绝提交空白答案", "error");
            else this.askStore.log("页面答案模型已全部写入，提交不会触发“未做完”", "success");
          } else if (st0.total) {
            console.log("[答案模型] 全部 " + st0.total + " 道选择题已写入页面答案模型" + (st0.unknown ? "（另有 " + st0.unknown + " 题无法定位，未参与校验）" : ""));
          }
        } catch (e) { console.log("[答案模型] 校验异常:", e); }
        if (this.defaultConfig.autoSubmit) {
          // 诊断：哪几题没把答案真正填进页面（填入失败时学习通会弹“您还有未做完的X，确认提交吗？”）
          const unfilled = [];
          for (let i = 0; i < ques.length; i++) "danger" === this.askStore.get(i).status && unfilled.push(i + 1);
          unfilled.length && this.askStore.log("第 " + unfilled.join("、") + " 题未能自动填入答案，提交时可能触发“未做完”确认框", "error");
          if (aiAnswered / ques.length < 0.5 && ques.length > 2) {
            this.askStore.log("AI答案覆盖率过低(" + aiAnswered + "/" + ques.length + ")，可能API异常，暂存不提交", "error"), this.askStore.submitFailed = true;
            try {
              const origAlert0 = iframeWindow.alert;
              iframeWindow.alert = function(e) { console.log("alert 方法被阻止", e); };
              iframeWindow.noSubmit();
              setTimeout(function() { try { iframeWindow.alert = origAlert0; } catch (e) {} }, 5e3);
            } catch (e) {}
          } else {
            // 把「答案模型状态查询 / 重填」一并交给提交环节：页面刷新会清空答案，提交前必须能自查自补
            const submitted = await this._submitWork(iframeWindow, Object.assign({}, ctx, { choiceState: choiceState, refillChoices: refillChoices }));
            if ("aborted" === submitted) return void resolve();
            if (true === submitted) {
              this.askStore.log("章节测验已完成", "success");
            } else if ("unconfirmed" === submitted) {
              this.askStore.submitFailed = true, this.askStore.log("未能确认提交结果，已停止自动跳章，请手动确认本章提交状态", "error");
            } else {
              this.askStore.submitFailed = true, this.askStore.log("章节测验提交失败，已停止自动跳章，请手动检查并提交", "error");
            }
          }
          this.askStore.task.status = this.askStore.submitFailed ? "提交失败，请手动提交" : "章节测验已完成" + (aiAnswered < ques.length ? ",AI覆盖:" + aiAnswered + "/" + ques.length + " 填入:" + succ : "，全部答出"), resolve();
        } else {
          // ★ 关闭「自动提交」→ 调页面原生 noSubmit() 做「临时保存(暂存)」：答案入库，之后可手动提交。
          //   （保留 resolve()：原实现此处没有 resolve()，会让 runningTask 永久为真、轮询死锁）
          const saved = await this._tempSaveWork(iframeWindow, ctx);
          if ("aborted" === saved) return void resolve();
          this.askStore.task.status = "已暂存(未提交)，AI覆盖:" + aiAnswered + "/" + ques.length + (aiAnswered < ques.length ? " 填入:" + succ : "");
          this.askStore.log(saved
            ? "已完成答题；未开启自动提交，已调用页面「临时保存」暂存答案（请稍后手动提交）"
            : "已完成答题；未开启自动提交，但本页没有暂存入口，答案仅保留在当前页面，请手动提交",
            saved ? "success" : "error");
          resolve();
        }
      });
    }
    // ★ 临时保存(暂存)：把答案存进服务器但不提交，供之后手动提交。
    // 页面原生实现（realwork.html 实测）：noSubmit() → saveWork()
    //   → POST /work/addStudentWorkNew?...&saveStatus=1&tempsave=1 （$("#form1").serialize()）
    //   → 成功 toast「保存成功！」并 location.reload()（答案已入库，重载后仍在）
    //   注意：noSubmit() 内有 `if(tempSave) return;` 防重，且结束后会把 tempSave 复位。
    // 返回 true=已触发暂存 / false=未找到暂存入口 / "aborted"=期间用户手动切章
    async _tempSaveWork(iframeWindow, ctx) {
      const aborted = ctx && "function" == typeof ctx.aborted ? ctx.aborted : function() { return false; };
      const w = iframeWindow;
      if (!w) return false;
      let fn = null;
      try { fn = w.noSubmit; } catch (e) {}
      let btn = null;                        // 兜底：部分模板把暂存做成真实按钮
      try { btn = w.document && w.document.querySelector("#tempsave, .btnSave, [onclick*='noSubmit']"); } catch (e) {}
      const hasFn = "function" === typeof fn;
      if (!hasFn && !btn) { console.log("[暂存] 本页未提供 noSubmit()/暂存按钮，答案仅保留在当前页面"); return false; }
      if (aborted()) return "aborted";
      // 暂存成功页可能会弹出原生 alert（「保存成功！」）而阻塞脚本 → 临时静音，稍后还原
      const origAlert = w.alert;
      try { w.alert = function(m) { console.log("[暂存] 页面 alert 已静音:", m); }; } catch (e) {}
      try {
        if (hasFn) fn.call(w);
        else btn.click();
      } catch (e) {
        console.log("[暂存] 触发异常:", e);
        try { w.alert = origAlert; } catch (_) {}
        return false;
      }
      // saveWork() 是 ajax，页面上「正在暂存...」→ 成功后 1s 才 reload，这里等它走完
      await sleepMs(1200);
      try { w.alert = origAlert; } catch (e) {}
      console.log("[暂存] 已请求页面临时保存（noSubmit/saveWork）");
      return true;
    }
    // 提交章节测验：接管页面弹窗 + 真实点击弹层确认 + 等到提交结果，返回是否提交成功
    async _submitWork(iframeWindow, ctx) {
      // 返回 true=提交成功 / false=提交失败或需人工 / "aborted"=提交过程中用户手动切章
      const aborted = ctx && "function" == typeof ctx.aborted ? ctx.aborted : function() { return false; };
      const captured = [];
      // ★★ 根因修复（核心）★★
      // 学习通这道「确认提交 / 您还有未做完的X，确认提交吗？」的弹层，是题目页调用 **top.workPop(...)**
      // 弹出的（realwork.html 里 toadd() 结尾就是 `if (top && top.workPop) top.workPop(showTips,...)`），
      // 也就是说 #workpop 这个 DOM 挂在【最顶层窗口】上，而不是题目页里。
      // 而题目页的嵌套往往有 4 层以上：
      //   studentstudy(top) → #iframe(knowledge/cards) → ananas/modules/work/index.html → api/work → 题目页
      // 旧实现只从题目页往上数 3 层，正好**差一层够不到顶层** → 弹层永远找不到 → 没人点「提交」
      // → 提交链停死（页面的 performSubmit 压根没被调用），而脚本还因为读不到失败/成功字样谎报“已提交”。
      // 这里改成：先上溯到最顶层，再自上而下把该顶层下所有同源 iframe 全部收进来。
      const getTopWin = () => {
        let w = iframeWindow;
        try { for (let i = 0; i < 12 && w && w.parent && w.parent !== w; i++) w = w.parent; } catch (e) {}
        return w || iframeWindow;
      };
      const collectWins = () => {
        const wins = [], seen = [];
        const walk = (w, depth) => {
          if (!w || depth > 6 || wins.length > 80 || seen.indexOf(w) >= 0) return;
          seen.push(w); wins.push(w);
          let d = null;
          try { d = w.document; } catch (e) { return; }
          if (!d) return;
          let frames = [];
          try { frames = d.querySelectorAll("iframe, frame"); } catch (e) {}
          for (let i = 0; i < frames.length; i++) {
            let cw = null;
            try { cw = frames[i].contentWindow; } catch (e) {}
            if (cw && cw !== w) walk(cw, depth + 1);
          }
        };
        walk(getTopWin(), 0);
        return wins;
      };
      const getWins = collectWins;
      // 弹层可能落在任意一层（顶层 / 作业模块页 / 题目页），统一收集后逐个查找
      const getDocs = () => {
        const out = [];
        collectWins().forEach(function(w) { try { if (w.document) out.push(w.document); } catch (e) {} });
        return out;
      };
      const readFrameHref = () => { try { return iframeWindow.location.href; } catch (e) { return ""; } };
      const textOf = (el) => {
        if (!el) return "";
        try {
          let t = el.innerText || el.textContent || "";
          if (el.getAttribute) t += " " + (el.getAttribute("aria-label") || "");
          return String(t).replace(/\s+/g, " ").trim();
        } catch (e) { return ""; }
      };
      // 提交期间接管**所有可达窗口**的原生弹窗：
      //  - confirm 一律返回 true（=“确定”）。H5 模板的“您还有未做完的X，确认提交吗？”走的就是它，
      //    绝不能被当成“取消”，否则等于用户手动点了取消、提交被放弃
      //  - alert 只记录文本（如“作业提交失败”），既不阻塞脚本，也便于判定提交结果
      const origPopups = [];
      getWins().forEach(function(w) {
        try {
          const oc = w.confirm, oa = w.alert;
          origPopups.push({ w: w, confirm: oc, alert: oa });
          w.confirm = function(m) { captured.push(String(m == null ? "" : m)); console.log("[提交] confirm:", m, "→ 自动确定"); return true; };
          w.alert = function(m) { captured.push(String(m == null ? "" : m)); console.log("[提交] alert:", m); };
        } catch (e) { console.log("[提交] 接管弹窗失败:", e); }
      });
      const restorePopups = () => {
        origPopups.forEach(function(o) {
          try { if ("function" === typeof o.confirm) o.w.confirm = o.confirm; } catch (e) {}
          try { if ("function" === typeof o.alert) o.w.alert = o.alert; } catch (e) {}
        });
      };

      // ⚠ 页面里有一批「toadd() 校验失败 → alert/toast 后直接 return」的静默断链文案：
      //   它们不会走提交、也不会留弹层，脚本等满 20s 只能落到 unconfirmed。把文案点名才能在日志里说清原因。
      //   注意用长句（避免与页面静态说明文字误撞，例如「最多选2项」这类提示就不加进来）。
      const failRe = /(提交失败|作业提交失败|提交出错|提交异常|请重试|未成功|服务器繁忙|系统繁忙|网络异常|操作失败|保存失败|账号发生异常|请刷新页面后重试|答案超过教师限制字数|答案字数未达到教师设置的最少字数要求|只能录入不能粘贴)/;
      const okRe = /(提交成功|已提交|提交完成|作答已提交|保存成功|重新作答|查看答案)/;              // 用于原生弹窗文本
      const okPageRe = /(提交成功|答案已保存|已提交成功|提交完成)/;                                   // 用于页面文本（必须收紧：页面里到处是“已完成”“重新作答”等静态文案）
      const unfinishedRe = /(未做完|未完成|还有\s*\d*\s*题)/;                                        // “还有未做完的题”类确认框
      const confirmRe = /(确认提交|未做完|提交吗|是否提交|确定提交)/;                                 // 任意模板的“确认层”文案特征
      const okBtnRe = /^(提交|确定|确认|是|继续|好的|好|OK|Ok|ok|立即提交)$/;                          // 确认按钮文案
      const cancelRe = /(取消|关闭|返回|暂不|放弃|重做)/;                                            // 绝不点这些
      // 页面文本扫描只覆盖题目页、且 600ms 缓存一次（旧实现每 200ms 拼接所有帧的 innerText，
      // 会把整个课程树都算一遍，把检查循环拖到几乎不转）
      let _lastTextScan = 0, _lastText = "";
      const readText = () => {
        const now = Date.now();
        if (now - _lastTextScan < 600) return _lastText;
        _lastTextScan = now;
        let s = "";
        try { s = (iframeWindow.document.body && iframeWindow.document.body.innerText) || ""; } catch (e) {}
        _lastText = s;
        return s;
      };
      const isVisible = (el) => {
        try {
          if (!el) return false;
          const st = el.style || {};
          if ("none" === st.display || "hidden" === st.visibility) return false;
          const win = (el.ownerDocument && el.ownerDocument.defaultView) || iframeWindow;
          const cs = win.getComputedStyle ? win.getComputedStyle(el) : null;
          if (cs && ("none" === cs.display || "hidden" === cs.visibility || "0" === cs.opacity)) return false;
          return !!(el.offsetWidth || el.offsetHeight || (el.getClientRects && el.getClientRects().length));
        } catch (e) { return false; }
      };
      // 页面自定义弹层（都是 DOM，不是 window.confirm，必须真实点击确认按钮才会继续）
      //   PC 章节测验/作业（当前模板）：#workpop + #popok —— “您还有未做完的多选题，确认提交吗？”正是这一层，
      //     由题目页调用 top.workPop() 弹出，DOM 在顶层窗口；#popok 的文案是「提交」（ok.html(okTent)）
      //   同一模板的另一套确认框：#confirmSubWin（.AlertCon02）里的 a.bluebtn，文案「确认提交？」，onclick=submitCheckTimes()
      //   H5 模板：#cxAlertBox1 + #okBtn；轻提示：#worktoast + #toastok、#hintPop + #hintOk
      const POPUPS = [
        { box: "#workpop", ok: "#popok", label: "workpop" },
        { box: "#confirmSubWin", ok: ".bluebtn", label: "confirmSubWin" },
        { box: "#worktoast", ok: "#toastok", label: "worktoast" },
        { box: "#hintPop", ok: "#hintOk", label: "hintPop" },
        { box: "#cxAlertBox1", ok: "#okBtn", label: "cxAlertBox" },
        { box: ".cx_alert-box", ok: ".cx_alert-blue", label: "cx_alert-box" }
      ];
      // 需要人工介入、脚本无法自动完成的弹层（如提交次数过多触发的验证码）
      const MANUAL = [{ box: ".verify-box", label: "提交验证码" }, { box: "#verifyCodeWin", label: "提交验证码" }];
      // 未知弹层兜底：扫描一切“长得像弹窗”的可见容器，只要文案像“确认提交/未做完”就点它的确定按钮
      const POP_SEL = ".maskDiv, .AlertCon02, [id*=pop], [class*=pop], [id*=Pop], [class*=Pop], [id*=alert], [class*=alert], [id*=Alert], [class*=Alert], [id*=dialog], [class*=dialog], [class*=Dialog], [role=dialog], [role=alertdialog]";
      // 在一个弹层内部挑「确定」按钮：只看文案，绝不点 取消/关闭
      const pickOkBtn = (box) => {
        const list = [];
        try {
          const ns = box.querySelectorAll("a, button, input[type=button], input[type=submit], .bluebtn, .jb_btn, [onclick]");
          for (let i = 0; i < ns.length && i < 60; i++) list.push(ns[i]);
        } catch (e) {}
        for (let i = 0; i < list.length; i++) {
          const t = textOf(list[i]);
          if (!t || cancelRe.test(t)) continue;
          if (okBtnRe.test(t) && isVisible(list[i])) return list[i];
        }
        return null;
      };
      // 同一弹层文案每轮最多点 2 次（首次 + 一次重试），避免弹层卡死时反复触发提交
      // 在弹层内部挑「取消/关闭」按钮（专供「未达到及格线，请重做」——
      //   那个框的【确定】=重做、【取消】=正常继续，点错就把页面打回重做循环）
      const pickCancelBtn = (box) => {
        try { const p = box.querySelector("#popno"); if (p && isVisible(p)) return p; } catch (e) {}
        const list = [];
        try { const ns = box.querySelectorAll("a, button, input[type=button], [onclick]"); for (let i = 0; i < ns.length && i < 60; i++) list.push(ns[i]); } catch (e) {}
        for (let i = 0; i < list.length; i++) { const t = textOf(list[i]); if (t && /^(取消|关闭|暂不|返回)$/.test(t) && isVisible(list[i])) return list[i]; }
        return null;
      };
      const GANLINE = /(未达到及格线|不及格|低于及格)/;
      let clickCounts = {}, popupHits = 0;
      const firePopup = (label, txt, btn, btnName) => {
        btnName = btnName || "确定";
        const sig = label + "|" + txt;
        const cnt = clickCounts[sig] || 0;
        const shouldClick = cnt < 2;
        if (shouldClick) { clickCounts[sig] = cnt + 1; popupHits++; }
        if (shouldClick) {
          console.log("[提交] 检测到页面弹层(" + label + "):", txt || "(无文案)",
            unfinishedRe.test(txt) ? "【未做完确认框】" : "", btn ? "→ 已自动点击“" + btnName + "”" : "(未找到" + btnName + "按钮)");
        }
        if (shouldClick && btn) { try { btn.click(); } catch (e) { console.log("[提交] 点击" + btnName + "失败:", e); } return { manual: false, label, text: txt, clicked: true, btnName: btnName }; }
        return { manual: false, label, text: txt, clicked: false, btnName: btnName };
      };
      // 兜底诊断：把各帧可见的“像弹窗”的元素列出来（只在彻底找不到弹层时打印一次，便于下次取证）
      const dumpCandidates = () => {
        const out = [];
        const docs = getDocs();
        for (let i = 0; i < docs.length && out.length < 8; i++) {
          let ns = [];
          try { ns = docs[i].querySelectorAll(POP_SEL); } catch (e) { continue; }
          for (let q = 0; q < ns.length && out.length < 8; q++) {
            if (!isVisible(ns[q])) continue;
            const t = textOf(ns[q]).slice(0, 60);
            out.push("#" + i + " <" + (ns[q].tagName || "?").toLowerCase() + " id=" + (ns[q].id || "-") + " class=" + String(ns[q].className || "-").slice(0, 40) + "> " + t);
          }
        }
        return out.length ? out.join(" || ") : "(各帧均无可见弹层候选)";
      };
      // 返回 null（无弹层）或 { manual, label, text, clicked }
      let _popScanTick = 0;
      const popupCheck = () => {
        _popScanTick++;
        const doGeneric = 0 === _popScanTick % 3;   // 通用兜底每 ~600ms 才做一次全帧扫描
        const docs = getDocs();
        for (let i = 0; i < docs.length; i++) {
          const d = docs[i];
          // ① 需要人工的层（验证码）
          for (let k = 0; k < MANUAL.length; k++) {
            let box = null;
            try { box = d.querySelector(MANUAL[k].box); } catch (e) {}
            if (isVisible(box)) return { manual: true, label: MANUAL[k].label, text: "", clicked: false };
          }
          // ①.5 「未达到及格线，请重做」专用分支：确定=重做、取消=正常继续 →
          //     必须点【取消】。若交给下面的 POPUPS（#workpop→#popok）会被点成「确定」=重做，
          //     表现为「反复提交、反复失败」。另外这条其实意味着**提交已经成功**，只是分数不及格。
          {
            let box = null;
            try { box = d.querySelector("#workpop, .maskDiv, .AlertCon02"); } catch (e) {}
            if (isVisible(box) && GANLINE.test(textOf(box))) {
              const r = firePopup("及格线", textOf(box).slice(0, 120), pickCancelBtn(box), "取消");
              r.lowScore = true;
              return r;
            }
          }
          // ② 已知弹层 ID：按钮优先在弹层内部找（旧实现先在整篇文档里查 cfg.ok，
          //    像 .bluebtn 这种页面上有 7 个的元素会取错对象）
          for (let k = 0; k < POPUPS.length; k++) {
            const cfg = POPUPS[k];
            let box = null;
            try { box = d.querySelector(cfg.box); } catch (e) { continue; }
            if (!isVisible(box)) continue;
            let btn = null;
            try { btn = box.querySelector(cfg.ok); } catch (e) {}
            if (!isVisible(btn)) btn = pickOkBtn(box);
            if (!isVisible(btn)) { try { btn = d.querySelector(cfg.ok); } catch (e) {} }   // 最后兜底：整篇文档里找
            return firePopup(cfg.label, textOf(box).slice(0, 120), btn);
          }
          // ③ 通用兜底：任何可见的、文案像“确认提交/未做完”的弹层
          if (doGeneric) {
            let cands = [];
            try { const ns = d.querySelectorAll(POP_SEL); for (let q = 0; q < ns.length && q < 200; q++) cands.push(ns[q]); } catch (e) {}
            for (let q = 0; q < cands.length; q++) {
              const el = cands[q];
              if (!isVisible(el)) continue;
              const txt = textOf(el);
              if (txt.length > 300 || !confirmRe.test(txt)) continue;
              return firePopup("通用弹层", txt.slice(0, 120), pickOkBtn(el));
            }
          }
        }
        return null;
      };

      // ★★ 提交前的“答案还在不在”闸门 ★★
      //   页面提交失败会执行 location.reload()，把 DOM 勾选与 #answer 隐藏域一起清空；
      //   此时若继续点“提交”，交上去的是**空白卷**，而页面照样会跳转 → 会被误判成“提交成功”。
      //   所以每轮巡检弹层之前都先确认答案还在：不在就按已存答案重填；8 秒仍补不上就拒绝提交，
      //   宁可停下来让用户手动确认，也绝不交白卷。
      const hasChoiceCheck = ctx && "function" === typeof ctx.choiceState;
      let refillDeadline = 0;
      let refillTries = 0;
      // 页面是否还在加载/重载：加载中的 DOM 里答案本来就「还没回来」，
      // 此刻既不该触发提交（可能是白卷），也不该判定缺失——先等它稳定。
      const pageBusy = () => {
        try { const d = iframeWindow.document; return !!(d && "loading" === d.readyState); } catch (e) { return true; }
      };
      // 返回语义：true = 答案都在、可以提交；"wait" = 还缺答案，本轮先别提交、下一轮继续补；false = 补不上了，拒绝提交
      //   旧实现最后一行「有缺就 return false」= **第一次补写失败就直接判死**，20s 期限完全没用上；
      //   配合补写本身的 bug，等于「一题没写上 → 立刻拒绝提交」。现在改成「先给窗口、超时/无进展才判死」。
      const ensureAnswers = () => {
        if (!hasChoiceCheck) return true;
        let st = null;
        try { st = ctx.choiceState(); } catch (e) { return true; }
        if (!st || !st.total || !st.missing.length) { refillDeadline = 0; refillTries = 0; return true; }
        if (!refillDeadline) {
          refillDeadline = Date.now() + 15000;   // 补写窗口 15s（短于外层 20s，保证真补不上时能走到 reject 分支）
          refillTries = 0;
          console.log("[提交] 答案模型缺失 " + st.missing.map(function(i) { return i + 1; }).join("、") + " 题，尝试补写…");
        }
        try { ctx.refillChoices && ctx.refillChoices(); } catch (e) {}
        try { st = ctx.choiceState(); } catch (e) { return true; }
        if (!st || !st.total || !st.missing.length) {
          refillDeadline = 0; refillTries = 0;
          console.log("[提交] 补写成功，答案已回到页面模型");
          return true;
        }
        refillTries++;
        // 连续 6 次补写「毫无进展」⇒ 结构性失败（不是页面还在重载），立刻失败，不空等
        if (refillTries >= 6) {
          console.log("[提交] 连续 6 次补写无进展，仍有 " + st.missing.length + " 题为空 → 拒绝提交空白答案");
          return false;
        }
        if (Date.now() > refillDeadline) {
          console.log("[提交] 补写超时(15s)，仍有 " + st.missing.length + " 题为空 → 拒绝提交空白答案");
          return false;
        }
        return "wait";
      };

      let ok = false, needManual = "", wasAborted = false, lastPopupText = "", unconfirmed = false, failedAny = false, answersBad = false;
      try {
        for (let attempt = 1; attempt <= 2 && !ok && !needManual && !wasAborted; attempt++) {
          if (aborted()) { wasAborted = true; break; }
          captured.length = 0; clickCounts = {}; popupHits = 0; lastPopupText = ""; refillDeadline = 0;
          const startHref = readFrameHref();
          const t0 = Date.now(), deadline = t0 + 20e3;
          let triggered = false;                                  // 是否已成功调用过页面提交入口
          let clickedConfirm = 0;                                 // 本轮真正点到“确定/提交”的次数（正向证据）
          let popupClearedAt = 0;                                 // 确认层被点掉、从界面上消失的时刻
          let sawFail = false;                                    // 本轮是否已捕获到明确的失败提示
          while (Date.now() < deadline) {
            if (aborted()) { wasAborted = true; break; }
            const el = Date.now() - t0;
            // ★★ 触发提交之前，先确认答案还在页面上 ★★
            //   页面提交失败会 location.reload() 清空答案；若此时不重填就直接触发，页面会拿着空模型走完提交链，
            //   交上去就是一张空白卷（页面照样跳转，于是被误判成“提交成功”）。先补写，补不上就拒绝提交。
            if (pageBusy()) { await sleepMs(300); continue; }   // 页面正在重载 → 等它稳，绝不在这时候触发提交
            const _ea = ensureAnswers();
            if (_ea === false) { answersBad = true; break; }
            if (_ea === "wait") { await sleepMs(300); continue; }   // 还有题没写进模型 → 本轮不触发提交，下一轮继续补
            // ★ 触发器分三级兜底：函数入口 → submitCheckTimes → 页面上真实的提交按钮
            //   （旧实现只在“全程无任何反应”时才调 submitCheckTimes，且**调用后不再巡检弹层**，
            //     于是 submitCheckTimes 弹出的“未做完/确认提交”框永远没人点 → 提交链卡死，
            //     而脚本还会因为读不到“失败/成功”字样误判为提交成功并跳章）
            if (!triggered) {
              try { if (iframeWindow.btnBlueSubmit) { iframeWindow.btnBlueSubmit(); triggered = true; console.log("[提交] 已调用 btnBlueSubmit()"); } } catch (e) { console.log("[提交] btnBlueSubmit 异常:", e); }
            }
            if (!triggered && el > 1200) {
              try { if (iframeWindow.submitCheckTimes) { iframeWindow.submitCheckTimes(); triggered = true; console.log("[提交] 已调用 submitCheckTimes()"); } } catch (e) { console.log("[提交] submitCheckTimes 异常:", e); }
            }
            if (!triggered && el > 3000) {
              let domBtn = null;
              const docs = getDocs(), sels = [".btnSubmit", ".btnBlueSubmit", "#btnBlueSubmit", "#submitBtn", ".subBtn", "#submit"];
              for (let di = 0; di < docs.length && !domBtn; di++) {
                for (let si = 0; si < sels.length && !domBtn; si++) {
                  let b = null;
                  try { b = docs[di].querySelector(sels[si]); } catch (e) {}
                  if (isVisible(b)) domBtn = b;
                }
              }
              if (domBtn) { try { domBtn.click(); triggered = true; console.log("[提交] 已点击页面提交按钮:", sels.join("/")); } catch (e) {} }
            }
            // ★ 弹层巡检：每轮都查、都点。“您还有未做完的多选题，确认提交吗？”与普通“确认提交？”都必须点掉，
            //   这里永远点确定/提交，绝不当成“取消”（这两个框的确定按钮正是页面发起真正提交的入口）
            const hit = popupCheck();
            if (hit && hit.manual) { needManual = hit.label; break; }
            if (hit) {
              if (hit.text) lastPopupText = hit.text;
              if (hit.clicked) clickedConfirm++;
              if (hit.lowScore) console.log("[提交] 本章提交成功、但未达到及格线（已点“取消”继续，未触发重做）");
              popupClearedAt = 0;
            } else if (clickedConfirm > 0 && !popupClearedAt) popupClearedAt = Date.now();
            // ★ 结果判定
            const failMsg = captured.filter(function(m) { return failRe.test(m); })[0];
            const txt = readText();
            if (failMsg || failRe.test(txt)) { sawFail = true; failedAny = true; console.log("[提交] 捕获失败提示:", failMsg || txt.slice(0, 120)); break; }
            if (captured.some(function(m) { return okRe.test(m); }) || okPageRe.test(txt)) { console.log("[提交] 检测到提交成功提示"); ok = true; break; }
            // 正向证据①：确认层被我们点掉、且之后 2.5 秒内没再冒弹层、也没有失败提示 → 提交确实发出去了
            if (clickedConfirm > 0 && popupClearedAt && Date.now() - popupClearedAt > 2500 && !popupCheck()) {
              console.log("[提交] 确认弹层已点掉且无失败提示，判定提交成功（最后弹层:", lastPopupText || "(无)", "）"); ok = true; break;
            }
            // 正向证据②：提交后页面自己跳走了（confirmSubmitWork 成功时会 location.href = data.url）
            if (clickedConfirm > 0 && readFrameHref() !== startHref) { console.log("[提交] 提交后页面已跳转，判定提交成功"); ok = true; break; }
            await sleepMs(200);
          }
          if (needManual || wasAborted || ok || answersBad) break;
          // 等待窗口结束，先看还有什么没走完（★ 失败分支跳出时绝不能在这里被判成成功）
          const stuck = popupCheck();
          if (stuck && stuck.manual) { needManual = stuck.label; break; }
          if (sawFail) {
            console.log("[提交] 第 " + attempt + " 次提交失败" + (attempt < 2 ? "，准备重试…" : ""));
            await sleepMs(1200);
          } else if (stuck) {
            console.log("[提交] 第 " + attempt + " 次结束仍有弹层未被点掉:", stuck.text || stuck.label, "；已点弹层次数:", popupHits);
            await sleepMs(1200);
          } else if (clickedConfirm > 0) {
            console.log("[提交] 第 " + attempt + " 次结束：确认弹层已点掉、无失败提示，判定提交成功（最后弹层:", lastPopupText || "(无)", "）");
            ok = true;
          } else {
            // ★ 没有任何“已提交”的正向证据时，绝不判成功。
            //   旧实现走到这里会无条件 ok = true（“无失败提示、无残留弹层”=成功），
            //   于是弹层没人点、提交根本没发生，脚本却报“章节测验已完成，全部答出”并自动跳到下一章。
            unconfirmed = true;
            console.log("[提交][诊断] 第 " + attempt + " 次：未找到确认弹层，也未捕获成功/失败提示；可见候选:", dumpCandidates());
            if (attempt < 2) await sleepMs(1200);
          }
        }
      } finally {
        restorePopups();
      }
      if (wasAborted) {
        this.askStore.log("提交过程中检测到手动切换章节，已中止提交", "info");
        return "aborted";
      }
      if (needManual) {
        this.askStore.log("需要人工处理（" + needManual + "），已停止自动提交与跳章", "error");
        return false;
      }
      if (!ok && answersBad) {
        this.askStore.log("页面上没有可提交的答案（答案没写进页面模型，或被页面刷新/失败重载清空），自动补写未成功，已拒绝提交空白答案并停止自动跳章，请手动检查", "error");
        return false;
      }
      if (!ok && failedAny) {
        // ★ 明确捕获到页面的失败提示（如 alert“作业提交失败！”）→ 就是失败，不能含糊成 unconfirmed
        this.askStore.log("章节测验提交失败（页面返回失败提示），已停止自动跳章，请手动检查并提交", "error");
        return false;
      }
      if (!ok) {
        this.askStore.log("未能确认提交结果（未检测到确认弹层，也未捕获成功/失败提示），已停止自动跳章，请手动确认", "error");
        return "unconfirmed";
      }
      return true;
    }
    homework() {
      return new Promise(async (resolve) => {
        const Timu = _unsafeWindow.document.querySelectorAll(".questionLi");
        if (!Timu)
          return void resolve();
        let ques = [];
        for (let i = 0; i < Timu.length; i++) {
          let data = getQuestion("2", Timu[i]);
          ques.push(data);
        }
        this.askStore.reset(), this.askStore.count = ques.length, this.askStore.task.name = "作业";
        for (let i = 0; i < ques.length; i++) {
          await sleep(this.defaultConfig.answerInterval), this.askStore.insert(ques[i]), this.askStore.task.work.inx = i;
          let data = await getAnswers(ques[i]);
          this.askStore.get(i).allAnswer = data;
          let tmp = fillAnswer(data, ques[i], Timu[i], _unsafeWindow);
          tmp ? (this.askStore.get(i).status = "primary", this.askStore.get(i).answer = tmp) : (this.askStore.get(i).status = "danger", this.askStore.get(i).answer = "暂无答案"), this.askStore.get(i).dom = Timu[i];
        }
      });
    }
    exam() {
      return new Promise(async (resolve) => {
        this.askStore.reset(), this.askStore.count = 1, this.askStore.task.name = "考试";
        let data = getQuestion("3", _unsafeWindow.document.body);
        this.askStore.insert(data), this.askStore.task.work.inx = 0;
        let data1 = await getAnswers(data);
        this.askStore.get(0).allAnswer = data1;
        let tmp = fillAnswer(data1, data, document.getElementsByClassName("mark_table")[0], _unsafeWindow);
        if (tmp ? (this.askStore.get(0).status = "primary", this.askStore.get(0).answer = tmp) : (this.askStore.get(0).status = "danger", this.askStore.get(0).answer = "暂无答案"), this.defaultConfig.autoExam) {
          await sleep(this.defaultConfig.answerInterval);
          const nextButton = $('.nextDiv .jb_btn:contains("下一题")');
          nextButton ? nextButton.click() : (this.askStore.log("已完成答题，请自行检查答案填写后自行提交", "success"), this.askStore.task.status = "已完成答题，请自行检查答案填写后自行提交");
        } else
          this.askStore.task.status = "未开启自动切换，等待手动切换";
      });
    }
    pdf(iframeWindow) {
      return new Promise(async (resolve) => {
        const contentWindow = iframeWindow.document.querySelector("#panView").contentWindow;
        contentWindow.scrollTo(0, contentWindow.document.body.scrollHeight), resolve();
      });
    }
    async s(iframeWindow) {
      /* 已完成的章节测验，无需处理 */
    }
  }
  const pinia = pinia$1.createPinia(), app = vue.createApp(App).use(ElementPlus).use(pinia), _self = _unsafeWindow, top = _self.top, formStore = useformStore();
  switch (app.mount((() => {
    try {
      const div = top.document.createElement("div");
      return div.id = "cccxapp", top.document.getElementById(div.id) ? div : (top.document.body.append(div), div);
    } catch (e) {
      log(e, "error");
    }
  })()), (() => {
    document.body.oncopy = null, document.body.oncut = null, document.body.onpaste = null, document.body.onselectstart = null, document.body.ondragstart = null;
    const style = document.createElement("style");
    style.innerHTML = "\n       * {\n           -webkit-user-select: auto !important;\n           -moz-user-select: auto !important;\n           -o-user-select: auto !important;\n           user-select: auto !important;\n       }\n   ", document.head.appendChild(style);
  })(), _self.location.pathname) {
    case "/work/doHomeWorkNew":
    case "/mooc-ans/work/doHomeWorkNew":
    case "/mooc2-ans/work/doHomeWorkNew":
      location.href.includes("mooc2=1") && (location.href = location.href.replace(/&mooc2=1/g, ""));
      break;
    case "/mycourse/studentstudy":
    case "/mooc-ans/mycourse/studentstudy":
    case "/mooc2-ans/mycourse/studentstudy":
      if (!_self.location.href.match(/mooc2=1/)) {
        ElementPlus.ElNotification({ title: "Auto Ask", message: "暂不支持旧版章节，尝试切换至新版", type: "error" }), _self.location.href = _self.location.href + "&mooc2=1";
        break;
      }
      const cxModel = new Cx();
      cxModel.askStore.log("脚本初始化成功！", "success");
      // 构建标识：用于从 F12 控制台直接确认“当前实际运行的到底是哪一版脚本”，
      // 专门解决“本地明明改好了、篡改猴里却还是旧副本”的排查难题
      const BUILD_TAG = "1.2.5-20261011d";
      try {
        console.log("[构建] 学习通AI助手 已加载 | version=1.2.5 build=" + BUILD_TAG + " | 特征: 全帧递归找确认弹层 / 确定性直写答案模型#answer<qid> / 补写链路已修(改读allAnswer并拍平) / 及格线弹窗点取消(不重做) / 自动答题开关已接入(死开关修复) / 关闭自动提交→调noSubmit暂存答案 / 元数据加@connect*(任意API域名可用)");
      } catch (e) {}
      // ===== 章节任务调度（支持“手动切章抢占”）=====
      // runningTask  是否有章节任务正在执行
      // taskEpoch    任务代次：+1 即让正在跑的任务在下一个检查点自行中止
      // handledKey   已交给任务处理的“规范化地址标识”（防止同一章节重复执行）
      // pendingKey   任务执行期间用户切换到的新内容标识（旧任务退出后立即接手）
      let runningTask = false, taskEpoch = 0, handledKey = null, pendingKey = null, navSeen = false, seenKey = null, seenTimes = 0;
      const SLOG = function() { try { console.log.apply(console, ["[调度]"].concat([].slice.call(arguments))); } catch (e) {} };
      const shortUrl = (u) => {
        if (!u) return String(u);
        const m = u.match(/[?&]chapterId=(\d+)/);
        return (m ? "ch" + m[1] : String(u).slice(0, 110)) + (String(u).length > 110 ? "…" : "");
      };
      // 规范化：剔除每次重载都可能被重新生成的会话令牌（enc/cpi/openc），
      // 否则页面自己刷新一下（参数重发）就会被误判成“用户切章”，导致正在答题的任务被无故中止、整章重跑
      const VOLATILE_PARAM = /^(enc|cpi|openc|fragmentid)$/i;
      const normalizeUrl = (u) => {
        if (!u) return u;
        try {
          const i = String(u).indexOf("?");
          if (i < 0) return String(u);
          const base = String(u).slice(0, i);
          const qs = String(u).slice(i + 1).split("&").filter(function(p) {
            return p && !VOLATILE_PARAM.test(p.split("=")[0]);
          }).sort();
          return base + "?" + qs.join("&");
        } catch (e) { return u; }
      };
      const readChapterUrl = () => {
        try {
          const f = _self.document.querySelector("#iframe");
          return f && f.contentWindow ? f.contentWindow.location.href : null;
        } catch (e) { return null; }
      };
      const readChapterKey = () => normalizeUrl(readChapterUrl());
      const startWork = async () => {
        if (runningTask) return;
        runningTask = true;
        const myEpoch = ++taskEpoch;
        const aborted = () => myEpoch !== taskEpoch;
        const ctx = { aborted };
        let bailed = false;
        const bail = () => {
          if (bailed) return;   // 一轮里会被多个检查点调用，只提示/记录一次
          bailed = true;
          SLOG("任务中止(epoch " + myEpoch + ")：检测到用户已切换内容");
          cxModel.askStore.log("检测到已手动切换章节，已中止当前任务", "info");
        };
        let submitFailedThisRound = false, doneChapterUrl = null;
        try {
        var _a, _b, _c, _d, _e;
        await waitElementLoaded(_self, "#iframe");
        if (aborted()) return bail();
        const cardsIframe = _self.document.querySelector("#iframe");
        if (!cardsIframe) return;
        await waitIframeLoaded(cardsIframe);
        if (aborted()) return bail();
        const _self1 = cardsIframe.contentWindow;
        if (!_self1) return;
        const startChapterUrl = _self1.location.href;
        const startChapterKey = normalizeUrl(startChapterUrl);
        SLOG("开始处理:", shortUrl(startChapterUrl), "(epoch " + myEpoch + ")");
        top.scroll2Job && top.scroll2Job();
        let jobList = _self1.document.querySelectorAll(".ans-job-icon") || [];
        for (let i = 0; i < jobList.length; i++) {
          if (aborted()) { bail(); break; }
          const item = jobList[i];
          if ((_a = item.parentElement) == null ? void 0 : _a.classList.contains("ans-job-finished")) {
            const iframe = (_b = item.parentElement) == null ? void 0 : _b.querySelector("iframe");
            if (iframe == null ? void 0 : iframe.src.match(/\/ananas\/modules\/work\/index.html/)) {
              await waitIframeLoaded(iframe), JSON.parse(iframe.getAttribute("data"));
              const workIframe = (_c = iframe.contentWindow) == null ? void 0 : _c.document.querySelector("iframe");
              workIframe && (await waitIframeLoaded(workIframe), cxModel.s(workIframe.contentWindow));
            }
            console.log(iframe.src, "已完成"), cxModel.askStore.log("已完成的任务点,跳过");
          } else {
            const iframe = (_d = item.parentElement) == null ? void 0 : _d.querySelector("iframe");
            await waitIframeLoaded(iframe);
            if (aborted()) { bail(); break; }
            const otherInfo = JSON.parse(iframe.getAttribute("data"));
            if (cxModel.askStore.log(`正在完成任务:${otherInfo.name || otherInfo.title}`), iframe == null ? void 0 : iframe.src.match(/\/ananas\/modules\/video\/index\.html/)) {
              if (!formStore.forminput.autoVideo) {
                cxModel.askStore.log("视频任务已跳过", "success");
                continue;
              }
              await cxModel.video(iframe.contentWindow, ctx);
              if (aborted()) { bail(); break; }
              cxModel.askStore.log("视频任务已完成", "success");
            } else if (iframe == null ? void 0 : iframe.src.match(/\/ananas\/modules\/work\/index.html/)) {
              if (false === formStore.forminput.autoAnswer) {   // ★「自动答题」开关：显式关闭才跳过（原先该开关是死的，永不读取；用 ===false 防老配置缺键被误判为关闭）
                cxModel.askStore.log("自动答题已关闭，跳过本节测验/作业", "success");
                continue;
              }
              cxModel.askStore.log("即将开始做作业", "info");
              const workIframe = (_e = iframe.contentWindow) == null ? void 0 : _e.document.querySelector("iframe");
              if (workIframe) {
                await waitIframeLoaded(workIframe), await cxModel.work(workIframe.contentWindow, ctx);
                if (aborted()) { bail(); break; }
                if (cxModel.askStore.submitFailed) submitFailedThisRound = true;
                cxModel.askStore.log("作业任务已完成", "success");
              }
            } else if (iframe == null ? void 0 : iframe.src.match(/\/ananas\/modules\/audio\/index.html/)) {
              if (log("音频", "error"), !formStore.forminput.autoVideo) {
                cxModel.askStore.log("音频任务已跳过", "success");
                continue;
              }
              if (iframe) {
                await waitIframeLoaded(iframe);
                if (aborted()) { bail(); break; }
                await cxModel.audio(iframe.contentWindow, ctx);
                if (aborted()) { bail(); break; }
                cxModel.askStore.log("音频任务已完成", "success");
              }
            } else
              (iframe == null ? void 0 : iframe.src.match(/\/ananas\/modules\/pdf\/index.html/)) ? (log("文档", "error"), iframe && (await waitIframeLoaded(iframe), await cxModel.pdf(iframe.contentWindow), cxModel.askStore.log("pdf任务已完成", "success"))) : (console.log(iframe == null ? void 0 : iframe.src, "未知"), cxModel.askStore.log("未知任务跳过", "success"));
          }
        }
        await sleep(formStore.forminput.interval);
        if (aborted()) return bail();
        const curChapterUrl = readChapterUrl() || startChapterUrl;
        // 只有“整轮都停留在本节”才算真正处理完；若期间地址已变（按规范化后比对，忽略会话令牌抖动），
        // 说明新内容尚未被处理，这里绝不能把它记成已处理，否则会被永久跳过（finally 里会按当前地址重开任务）
        const stayedPut = normalizeUrl(curChapterUrl) === startChapterKey;
        doneChapterUrl = stayedPut ? curChapterUrl : null;
        SLOG("本轮结束判定: 停留本节=" + stayedPut + "，当前=" + shortUrl(curChapterUrl));
        if (submitFailedThisRound) {
          cxModel.askStore.log("检测到本章节提交失败，已停止自动跳章，请手动提交", "error");
        } else if (!stayedPut) {
          cxModel.askStore.log("检测到已手动切换内容，跳过自动跳章", "info");
        } else if (!formStore.forminput.autoJump) {
          cxModel.askStore.msg("由于未开启自动切换,请手动切换");
        } else {
          const nextChapterBtn = top == null ? void 0 : top.document.querySelector(".nextChapter");
          nextChapterBtn && nextChapterBtn.click();
        }
        } catch (e) {
          console.error("[超星AI助手]", e);
        } finally {
          runningTask = false;
          pendingKey = null;
          navSeen = false;
          const curKey = readChapterKey();
          if (doneChapterUrl) {
            // 正常跑完：记下本节；若这期间用户已手动切走，立即接手用户当前所在内容
            handledKey = normalizeUrl(doneChapterUrl);
            if (curKey && curKey !== handledKey) {
              SLOG("正常结束后地址已变，立即接手:", shortUrl(readChapterUrl()));
              handledKey = curKey;
              cxModel.askStore.reset();
              startWork();
            }
          } else if (curKey) {
            // 被手动切章抢占：本任务未完成任何内容，直接按用户“当前实际所在”的内容重开任务
            // （注意不能用被抢占前的旧地址记账，否则「切走再切回同一章」会被误判为已处理而永远不填）
            SLOG("本任务被抢占/未完成，按当前内容重开:", shortUrl(readChapterUrl()));
            handledKey = curKey;
            cxModel.askStore.reset();
            startWork();
          } else {
            handledKey = null;
          }
        }
      };
      setInterval(async () => {
        try {
          await waitElementLoaded(_self, "#iframe");
          const cardsIframe = _self.document.querySelector("#iframe");
          if (!cardsIframe) return;
          await waitIframeLoaded(cardsIframe);
          if (!cardsIframe.contentWindow) return;
          const curUrl = readChapterUrl();
          const curKey = normalizeUrl(curUrl);
          if (!curKey) return;
          // 连续两轮看到同一地址才算“稳定”
          if (curKey === seenKey) seenTimes++; else { seenKey = curKey; seenTimes = 1; }
          // 地址离开了“已处理内容” → 记一次导航（用于识别“切走再切回同一章”：回来时地址虽相同，但页面已重载）
          if (curKey !== handledKey) navSeen = true;
          // 无事可做：地址就是已处理内容，且期间没有离开过
          if (curKey === handledKey && !navSeen) return;
          // 已有处理记录时，地址变化需连续两轮稳定才认定为用户切换（过滤瞬时中间态）
          if (handledKey !== null && seenTimes < 2) {
            SLOG("地址变化待确认(" + seenTimes + "/2):", shortUrl(curUrl));
            return;
          }
          if (runningTask) {
            // 任务执行中检测到用户切换：抢占旧任务（它在下一个检查点自行退出），退出后立即接手新内容
            if (pendingKey !== curKey) {
              pendingKey = curKey;
              const oldEpoch = taskEpoch;
              taskEpoch++;
              SLOG("抢占：中止当前任务(epoch " + oldEpoch + "→" + taskEpoch + ")，目标:", shortUrl(curUrl));
              cxModel.askStore.log("检测到手动切换章节，正在中止当前任务并切换…", "info");
            }
            return;
          }
          handledKey = curKey;
          navSeen = false;
          cxModel.askStore.reset();
          SLOG("开始处理:", shortUrl(curUrl));
          startWork();
        } catch (e) {
        }
      }, 2e3);
      break;
    case "/mooc2-ans/mycourse/stu":
    case "/mooc-ans/mycourse/stu":
    case "/mycourse/stu":
      ElementPlus.ElNotification({ title: "Auto Ask", message: "此页面无任务，请自行进入章节页面", type: "error" });
      break;
    case "/work/selectWorkQuestionYiPiYue":
    case "/knowledge/cards":
      break;
    case "/mooc2/work/dowork":
    case "/mooc-ans/mooc2/work/dowork":
    case "/mooc2-ans/mooc2/work/dowork":
      const cxModel1 = new Cx();
      if (false === formStore.forminput.autoAnswer) {   // ★「自动答题」开关（显式关闭才跳过）
        cxModel1.askStore.log("自动答题已关闭，跳过本次作业", "success");
        break;
      }
      cxModel1.askStore.log("脚本初始化成功！", "success"), await( cxModel1.homework());
      break;
    case "/exam-ans/exam/test/reVersionTestStartNew":
      const cxModel2 = new Cx();
      await( cxModel2.exam()), cxModel2.askStore.log("脚本初始化成功！", "success");
  }

})(Vue, Pinia, ElementPlus, md5, $);