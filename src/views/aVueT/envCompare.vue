<template>
  <div>
    <el-button @click="clickConfig">配置导入</el-button>
    <el-card>
      <div slot="header"><span>内容获取</span></div>
      <div class="html-content" v-html="textValue"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textValue: '',
    }
  },
  methods: {
    clickConfig() {
      let data = `
id:AAA00001 ,package:xml    ,desc:<span style="color:red">测试数据一号</span>;
id:BBB00002 ,package:json   ,desc:<span style="color:green">这是一段绿色测试内容</span>;
id:CCC00003 ,package:yaml   ,desc:<span style="color:blue">蓝色关键字段</span>;
id:DDD00004 ,package:xml    ,desc:普通描述字段;
id:EEE00005 ,package:json   ,desc:日志数据，开始记录→;
log: [2025-11-17 12:01:02] INFO  —— Service started successfully; environment=prod; thread=main;
log: [2025-11-17 12:01:03] WARN  —— Request took too long: 1293ms; url=/api/v1/resource/this/is/a/very/long/url/for/testing/purposes;
log: [2025-11-17 12:01:04] ERROR —— Cannot connect to database: timeout; retry=3/5;
path:/this/is/a/very/very/very/very/very/very/very/very/long/path/to/check/horizontal/scrolling/component/test/line;
json:{
  "user":"小明",
  "age":26,
  "address":{
    "province":"浙江省",
    "city":"杭州市",
    "district":"西湖区"
  },
  "tags":["程序员","Vue","ElementUI","测试数据"]
};
xml:<root><node id="1234">这是一段非常非常非常非常非常非常长的 XML 内容，用来测试滚动条是否正常工作。</node></root>;
longTextLine:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;
longNumberLine:1234567890123456789012345678901234567890123456789012345678901234567890;
specialCharsLine:!@#$%^&*()_+{}|:"<>?~\`-=[]\\;',./!@#$%^&*( )_+;
unicodeLine:😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚🤩;
id:FFF00006 ,package:json   ,desc:<span style="color:red">错误高亮字段</span>;
id:GGG00007 ,package:xml    ,desc:字段对齐测试                ,note:空格数量测试;
id:HHH00008 ,package:json   ,desc:JSON 长字段测试，内容如下—— {"a":1,"b":2,"c":[3,4,5], "long":"这是一个非常长非常长非常长非常长非常长的字段，无意义，仅用于测试"};
id:III00009 ,package:yaml   ,desc:|-
    这是一段模拟 YAML 长文本
    用来测试格式是否能保持
    同时也能测试换行和缩进;
id:JJJ00010 ,package:txt    ,desc:This_is_a_super_long_single_word_that_will_force_horizontal_scrolling_in_any_scenario_without_wrapping;
repeatLine:
  Lorem ipsum dolor sit amet,   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac magna justo. Quisque eget odio ac lectus vestibulum faucibus eget in metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.;
consectetur adipiscing elit. Praesent ac magna justo. Quisque eget odio ac lectus vestibulum faucibus eget in metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.;
repeatLine:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare ligula non elit consequat, eu ultricies sapien blandit. Suspendisse vitae neque nec neque fermentum tempus.;
repeatLine:
repeatLine:
  Lorem ipsum dolor sit amet,   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac mag1111111111111111111111111111111111111111111111111111111111111111111111111111na justo. Quisque eget odio ac lectus vestibulum faucibus eget in metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.;
consectetur adipiscing elit. Praesent ac magna justo. Quisque eget odio ac lectus vestibulum faucibus eget in metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.;
repeatLine:
repeatLine:
  Lorem ipsum dolor sit amet,   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac magna justo. Quisque eget odio ac lectus vestibulum faucibus eget in metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.;   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac magna justo. Quisque eget odio ac lectus vestibulum faucibus eget in metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.;   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac magna justo. Quisque eget odio ac lectus vestibulum faucibus eget in metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.;
consectetur adipiscing elit. Praesent ac magna justo. Quisque eget odio ac lectus vestibulum faucibus eget in metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.;
repeatLine:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare ligula non elit consequat, eu ultricies sapien blandit. Suspendisse vitae neque nec neque fermentum tempus.;
repeatLine:
repeatLine:
  Lorem ipsum dolor sit amet,   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac magna justo. Quisque eget odio ac lectus vestibulum faucibus eget in metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.;
consectetur adipiscing elit. Praesent ac magna justo. Quisque eget odio ac lectus vestibulum faucibus eget in metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.;
repeatLine:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare ligula non elit consequat, eu ultricies sapien blandit. Suspendisse vitae neque nec neque fermentum tempus.;
repeatLine:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut libero non ex pharetra dictum. Nullam vel condimentum mauris, non ullamcorper dolor.;
superLongURL:http://www.example.com/api/v1/query?param1=aaaaaaaaaaaaaaaaaaaaaaa&param2=bbbbbbbbbbbbbbbbbbbbbbb&param3=cccccccccccccccccccccccccccccccccccccccccccccccccc&timestamp=1699999999999;
endingNote:<span style="color:orange">假数据结束（END）</span>;
`

      this.textValue = data
    },
  },
}
</script>

<style lang="scss">
// white-space: pre-wrap; /* 更自然的折行显示 */ word-break: break-all; /* 避免超长字符撑爆布局 */
.html-content {
  white-space: pre; /* ❗保持原格式，不自动换行 */
  font-family: monospace;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 8px;
  min-height: 600px;
  max-height: 600px;
  overflow-x: auto; /* 横向滚动条 */
  overflow-y: auto; /* 纵向滚动条 */
  line-height: 1.6;
  font-weight: 600;
}
</style>
