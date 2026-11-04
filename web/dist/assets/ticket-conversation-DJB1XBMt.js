import{a as e,c as t,d as n,i as r,l as i,n as a,o,r as s,s as c,t as l,u}from"./index-DfLz6m-l.js";var d={name:`hash`,size:24,node:[[`line`,{x1:`4`,x2:`20`,y1:`9`,y2:`9`,key:`4lhtct`}],[`line`,{x1:`4`,x2:`20`,y1:`15`,y2:`15`,key:`vyu0kd`}],[`line`,{x1:`10`,x2:`8`,y1:`3`,y2:`21`,key:`1ggp8o`}],[`line`,{x1:`16`,x2:`14`,y1:`3`,y2:`21`,key:`weycgp`}]]};d.node;var f=t(d),p={name:`send`,size:24,node:[[`path`,{d:`M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,key:`1ffxy3`}],[`path`,{d:`m21.854 2.147-10.94 10.939`,key:`12cjpa`}]]};p.node;var m=t(p),h=u((e=>{Object.defineProperty(e,"__esModule",{value:!0});var t=/\r\n?/g,n=/\t/g,r=/\f/g,i=function(e){return e.replace(t,`
`).replace(r,``).replace(n,`    `)},a=function(e,t){var n=e||{};if(t!=null)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},o=function(e,t){var n=Object.keys(e).filter(function(t){var n=e[t];if(n==null||n.match==null)return!1;var r=n.order;return typeof r==`number`&&isFinite(r)||typeof console>`u`||console.warn("simple-markdown: Invalid order for rule `"+t+"`: "+String(r)),!0});n.sort(function(t,n){var r=e[t],i=e[n],a=r.order,o=i.order;if(a!==o)return a-o;var s=+!r.quality,c=+!i.quality;return s===c?t<n?-1:+(t>n):s-c});var r,o=function(t,i){var a=[];for(i||=r,r=i;t;){var s=null,c=null,l=null,u=NaN,d=0,f=n[0],p=e[f];do{var m=p.order,h=i.prevCapture==null?``:i.prevCapture[0],g=p.match(t,i,h);if(g){var _=p.quality?p.quality(g,i,h):0;_<=u||(s=f,c=p,l=g,u=_)}d++,f=n[d],p=e[f]}while(p&&(!l||p.order===m&&p.quality));if(c==null||l==null)throw Error("Could not find a matching rule for the below content. The rule with highest `order` should always match content provided to it. Check the definition of `match` for '"+n[n.length-1]+`'. It seems to not match the following source:
`+t);if(l.index)throw Error("`match` must return a capture starting at index 0 (the current parse index). Did you forget a ^ at the start of the RegExp?");var v=c.parse(l,o,i);if(Array.isArray(v))Array.prototype.push.apply(a,v);else{if(typeof v!=`object`||!v)throw Error(`parse() function returned invalid parse result: '${v}'`);v.type??=s,a.push(v)}i.prevCapture=l,t=t.substring(i.prevCapture[0].length)}return a};return function(e,n){return r=a(n,t),!r.inline&&!r.disableAutoBlockNewlines&&(e+=`

`),r.prevCapture=null,o(i(e),r)}},s=function(e){var t=function(t,n,r){return n.inline?e.exec(t):null};return t.regex=e,t},c=function(e){var t=function(t,n){return n.inline?null:e.exec(t)};return t.regex=e,t},l=function(e){var t=function(t,n){return e.exec(t)};return t.regex=e,t};typeof Symbol==`function`&&Symbol.for;var u=function(e,t,n,r){n||={},r=r===void 0||r;var i=``;for(var a in n){var o=n[a];Object.prototype.hasOwnProperty.call(n,a)&&o&&(i+=` `+m(a)+`="`+m(o)+`"`)}var s=`<`+e+i+`>`;return r?s+t+`</`+e+`>`:s},d=function(e){if(e==null)return null;try{var t=new URL(e,`https://localhost`).protocol;if(t.indexOf(`javascript:`)===0||t.indexOf(`vbscript:`)===0||t.indexOf(`data:`)===0)return null}catch{return null}return e},f=/[<>&"']/g,p={"<":`&lt;`,">":`&gt;`,"&":`&amp;`,'"':`&quot;`,"'":`&#x27;`,"/":`&#x2F;`,"`":`&#96;`},m=function(e){return String(e).replace(f,function(e){return p[e]})},h=/\\([^0-9A-Za-z\s])/g,g=function(e){return e.replace(h,`$1`)},_=function(e,t,n){var r=n.inline||!1;n.inline=!0;var i=e(t,n);return n.inline=r,i},v=function(e,t,n){var r=n.inline||!1;n.inline=!1;var i=e(t+`

`,n);return n.inline=r,i},y=function(e,t,n){return{content:_(t,e[1],n)}},b=function(){return{}},x=`(?:[*+-]|\\d+\\.)`,S=`( *)(`+x+`) +`,C=RegExp(`^`+S),w=RegExp(S+`[^\\n]*(?:\\n(?!\\1`+x+` )[^\\n]*)*(
|$)`,`gm`),T=/\n{2,}$/,E=/^ (?= *`)|(` *) $/g,ee=T,D=/ *\n+$/,O=RegExp(`^( *)(`+x+`) [\\s\\S]+?(?:
{2,}(?! )(?!\\1`+x+` )\\n*|\\s*
*$)`),k=/(?:^|\n)( *)$/,te=(function(){var e=/^ *\| *| *\| *$/g,t=/ *$/,n=/^ *-+: *$/,r=/^ *:-+: *$/,i=/^ *:-+ *$/,a=function(e){return n.test(e)?`right`:r.test(e)?`center`:i.test(e)?`left`:null},o=function(t,n,r,i){return i&&(t=t.replace(e,``)),t.trim().split(`|`).map(a)},s=function(e,n,r,i){var a=r.inTable;r.inTable=!0;var o=n(e.trim(),r);r.inTable=a;var s=[[]];return o.forEach(function(e,n){e.type===`tableSeparator`?(!i||n!==0&&n!==o.length-1)&&s.push([]):(e.type===`text`&&(o[n+1]==null||o[n+1].type===`tableSeparator`)&&(e.content=e.content.replace(t,``)),s[s.length-1].push(e))}),s},c=function(e,t,n,r){return e.trim().split(`
`).map(function(e){return s(e,t,n,r)})},l=function(e){return function(t,n,r){r.inline=!0;var i=s(t[1],n,r,e),a=o(t[2],n,r,e),l=c(t[3],n,r,e);return r.inline=!1,{type:`table`,header:i,align:a,cells:l}}};return{parseTable:l(!0),parseNpTable:l(!1),TABLE_REGEX:/^ *(\|.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/,NPTABLE_REGEX:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/}})(),A=`(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*`,j=`\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*`,ne=/mailto:/i,re=function(e,t,n){var r=(e[2]||e[1]).replace(/\s+/g,` `).toLowerCase();if(t._defs&&t._defs[r]){var i=t._defs[r];n.target=i.target,n.title=i.title}return t._refs=t._refs||{},t._refs[r]=t._refs[r]||[],t._refs[r].push(n),n},M=0,N={Array:{html:function(e,t,n){for(var r=``,i=0;i<e.length;i++){var a=e[i];if(a.type===`text`)for(a={type:`text`,content:a.content};i+1<e.length&&e[i+1].type===`text`;i++)a.content+=e[i+1].content;r+=t(a,n)}return r}},heading:{order:M++,match:c(/^ *(#{1,6})([^\n]+?)#* *(?:\n *)+\n/),parse:function(e,t,n){return{level:e[1].length,content:_(t,e[2].trim(),n)}},html:function(e,t,n){return u(`h`+e.level,t(e.content,n))}},nptable:{order:M++,match:c(te.NPTABLE_REGEX),parse:te.parseNpTable,html:null},lheading:{order:M++,match:c(/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/),parse:function(e,t,n){return{type:`heading`,level:e[2]===`=`?1:2,content:_(t,e[1],n)}},html:null},hr:{order:M++,match:c(/^( *[-*_]){3,} *(?:\n *)+\n/),parse:b,html:function(e,t,n){return`<hr aria-hidden="true">`}},codeBlock:{order:M++,match:c(/^(?:    [^\n]+\n*)+(?:\n *)+\n/),parse:function(e,t,n){return{lang:void 0,content:e[0].replace(/^    /gm,``).replace(/\n+$/,``)}},html:function(e,t,n){var r=e.lang?`markdown-code-`+e.lang:void 0;return u(`pre`,u(`code`,m(e.content),{class:r}))}},fence:{order:M++,match:c(/^ *(`{3,}|~{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n *)+\n/),parse:function(e,t,n){return{type:`codeBlock`,lang:e[2]||void 0,content:e[3]}},html:null},blockQuote:{order:M++,match:c(/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/),parse:function(e,t,n){return{content:t(e[0].replace(/^ *> ?/gm,``),n)}},html:function(e,t,n){return u(`blockquote`,t(e.content,n))}},list:{order:M++,match:function(e,t){var n=t.prevCapture==null?``:t.prevCapture[0],r=k.exec(n),i=t._list||!t.inline;return r&&i?(e=r[1]+e,O.exec(e)):null},parse:function(e,t,n){var r=e[2],i=r.length>1,a=i?+r:void 0,o=e[0].replace(ee,`
`).match(w),s=!1;return{ordered:i,start:a,items:o.map(function(e,r){var i=C.exec(e),a=i?i[0].length:0,c=RegExp(`^ {1,`+a+`}`,`gm`),l=e.replace(c,``).replace(C,``),u=r===o.length-1,d=l.indexOf(`

`)!==-1||u&&s;s=d;var f=n.inline,p=n._list;n._list=!0;var m;d?(n.inline=!1,m=l.replace(D,`

`)):(n.inline=!0,m=l.replace(D,``));var h=t(m,n);return n.inline=f,n._list=p,h})}},html:function(e,t,n){var r=e.items.map(function(e){return u(`li`,t(e,n))}).join(``);return u(e.ordered?`ol`:`ul`,r,{start:e.start})}},def:{order:M++,match:c(/^ *\[([^\]]+)\]: *<?([^\s>]*)>?(?: +["(]([^\n]+)[")])? *\n(?: *\n)*/),parse:function(e,t,n){var r=e[1].replace(/\s+/g,` `).toLowerCase(),i=e[2],a=e[3];return n._refs&&n._refs[r]&&n._refs[r].forEach(function(e){e.target=i,e.title=a}),n._defs=n._defs||{},n._defs[r]={target:i,title:a},{def:r,target:i,title:a}},html:function(){return``}},table:{order:M++,match:c(te.TABLE_REGEX),parse:te.parseTable,html:function(e,t,n){var r=function(t){return e.align[t]==null?``:`text-align:`+e.align[t]+`;`},i=e.header.map(function(e,i){return u(`th`,t(e,n),{style:r(i),scope:`col`})}).join(``),a=e.cells.map(function(e){return u(`tr`,e.map(function(e,i){return u(`td`,t(e,n),{style:r(i)})}).join(``))}).join(``);return u(`table`,u(`thead`,u(`tr`,i))+u(`tbody`,a))}},newline:{order:M++,match:c(/^(?:\n *)*\n/),parse:b,html:function(e,t,n){return`
`}},paragraph:{order:M++,match:c(/^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),parse:y,html:function(e,t,n){return u(`div`,t(e.content,n),{class:`paragraph`})}},escape:{order:M++,match:s(/^\\([^0-9A-Za-z\s])/),parse:function(e,t,n){return{type:`text`,content:e[1]}},html:null},tableSeparator:{order:M++,match:function(e,t){return t.inTable?/^ *\| */.exec(e):null},parse:function(){return{type:`tableSeparator`}},html:function(){return` &vert; `}},autolink:{order:M++,match:s(/^<([^: >]+:\/[^ >]+)>/),parse:function(e,t,n){return{type:`link`,content:[{type:`text`,content:e[1]}],target:e[1]}},html:null},mailto:{order:M++,match:s(/^<([^ >]+@[^ >]+)>/),parse:function(e,t,n){var r=e[1],i=e[1];return ne.test(i)||(i=`mailto:`+i),{type:`link`,content:[{type:`text`,content:r}],target:i}},html:null},url:{order:M++,match:s(/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/),parse:function(e,t,n){return{type:`link`,content:[{type:`text`,content:e[1]}],target:e[1],title:void 0}},html:null},link:{order:M++,match:s(RegExp(`^\\[(`+A+`)\\]\\(`+j+`\\)`)),parse:function(e,t,n){return{content:t(e[1],n),target:g(e[2]),title:e[3]}},html:function(e,t,n){var r={href:d(e.target),title:e.title};return u(`a`,t(e.content,n),r)}},image:{order:M++,match:s(RegExp(`^!\\[(`+A+`)\\]\\(`+j+`\\)`)),parse:function(e,t,n){return{alt:e[1],target:g(e[2]),title:e[3]}},html:function(e,t,n){return u(`img`,``,{src:d(e.target),alt:e.alt,title:e.title},!1)}},reflink:{order:M++,match:s(RegExp(`^\\[(`+A+`)\\]\\s*\\[([^\\]]*)\\]`)),parse:function(e,t,n){return re(e,n,{type:`link`,content:t(e[1],n)})},html:null},refimage:{order:M++,match:s(RegExp(`^!\\[(`+A+`)\\]\\s*\\[([^\\]]*)\\]`)),parse:function(e,t,n){return re(e,n,{type:`image`,alt:e[1]})},html:null},em:{order:M,match:s(RegExp(`^\\b_((?:__|\\\\[\\s\\S]|[^\\\\_])+?)_\\b|^\\*(?=\\S)((?:\\*\\*|\\\\[\\s\\S]|\\s+(?:\\\\[\\s\\S]|[^\\s\\*\\\\]|\\*\\*)|[^\\s\\*\\\\])+?)\\*(?!\\*)`)),quality:function(e){return e[0].length+.2},parse:function(e,t,n){return{content:t(e[2]||e[1],n)}},html:function(e,t,n){return u(`em`,t(e.content,n))}},strong:{order:M,match:s(/^\*\*((?:\\[\s\S]|[^\\])+?)\*\*(?!\*)/),quality:function(e){return e[0].length+.1},parse:y,html:function(e,t,n){return u(`strong`,t(e.content,n))}},u:{order:M++,match:s(/^__((?:\\[\s\S]|[^\\])+?)__(?!_)/),quality:function(e){return e[0].length},parse:y,html:function(e,t,n){return u(`u`,t(e.content,n))}},del:{order:M++,match:s(/^~~(?=\S)((?:\\[\s\S]|~(?!~)|[^\s~\\]|\s(?!~~))+?)~~/),parse:y,html:function(e,t,n){return u(`del`,t(e.content,n))}},inlineCode:{order:M++,match:s(/^(`+)([\s\S]*?[^`])\1(?!`)/),parse:function(e,t,n){return{content:e[2].replace(E,`$1`)}},html:function(e,t,n){return u(`code`,m(e.content))}},br:{order:M++,match:l(/^ {2,}\n/),parse:b,html:function(e,t,n){return`<br>`}},text:{order:M++,match:l(/^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+:\S|$)/),parse:function(e,t,n){return{content:e[0]}},html:function(e,t,n){return m(e.content)}}},P=function(e,t){return!t&&typeof console<`u`&&console.warn(`simple-markdown ruleOutput should take 'react' or 'html' as the second argument.`),function(n,r,i){return e[n.type][t](n,r,i)}},ie=function(e){var t=function(n,r){return r||={},Array.isArray(n)?n.map(function(e){return t(e,r)}).join(``):e(n,t,r)};return t},ae=function(e,t,n={}){if(!t)throw Error("simple-markdown: outputFor: `property` must be defined. if you just upgraded, you probably need to replace `outputFor` with `reactFor`");var r,i=(e.Array||N.Array)[t];if(!i)throw Error("simple-markdown: outputFor: to join nodes of type `"+t+"` you must provide an `Array:` joiner rule with that type, Please see the docs for details on specifying an Array rule.");var o=i,s=function(n,i){return i||=r,r=i,Array.isArray(n)?o(n,s,i):e[n.type][t](n,s,i)};return function(e,t){return r=a(t,n),s(e,r)}},oe=o(N),F=function(e,t){return t||={},t.inline=!1,oe(e,t)},se=function(e,t){return t||={},t.inline=!0,oe(e,t)},ce=function(e,t){var n=T.test(e);return t||={},t.inline=!n,oe(e,t)},I=ae(N,`html`);e.default={defaultRules:N,parserFor:o,outputFor:ae,inlineRegex:s,blockRegex:c,anyScopeRegex:l,parseInline:_,parseBlock:v,markdownToHtml:function(e,t){return I(F(e,t),t)},defaultBlockParse:F,defaultInlineParse:se,defaultImplicitParse:ce,defaultHtmlOutput:I,preprocess:i,sanitizeText:m,sanitizeUrl:d,unescapeUrl:g,htmlTag:u,defaultRawParse:oe,ruleOutput:P,htmlFor:ie,defaultParse:function(...e){return typeof console<`u`&&console.warn("defaultParse is deprecated, please use `defaultImplicitParse`"),ce.apply(null,e)},defaultOutput:function(...e){return typeof console<`u`&&console.warn("defaultOutput is deprecated, please use `defaultReactOutput`"),defaultReactOutput.apply(null,e)}}})),g=u((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.GuildNavigationRegex=e.SlashCommandRegex=e.SubtextRegex=e.HeadingRegex=e.TimestampRegex=e.TextRegex=e.StrikeThroughRegex=e.SpoilerRegex=e.EmoticonRegex=e.CodeBlockRegex=e.BlockQuoteRegex=e.HereRegex=e.EveryoneRegex=e.UserMentionRegex=e.RoleMentionRegex=e.EmojiRegex=e.ChannelMentionRegex=void 0,e.ChannelMentionRegex=/^<#(\d{17,20})>/,e.EmojiRegex=/^<(a)?:(\w{2,32}):(\d{17,21})>/,e.RoleMentionRegex=/^<@&(\d{17,20})>/,e.UserMentionRegex=/^<@!?(\d{17,20})>/,e.EveryoneRegex=/^@everyone/,e.HereRegex=/^@here/,e.BlockQuoteRegex=/^( *>>> ([\s\S]*))|^( *> [^\n]*(\n *> [^\n]*)*\n?)/,e.CodeBlockRegex=/^```(([a-z0-9_+\-.#]+?)\n+)?\n*([^]+?)\n*```/i,e.EmoticonRegex=/^(¯\\_\(ツ\)_\/¯)/,e.SpoilerRegex=/^\|\|([\s\S]+?)\|\|/,e.StrikeThroughRegex=/^~~([\s\S]+?)~~(?!_)/,e.TextRegex=/^[\s\S]+?(?=[^0-9A-Za-z\s]|\n\n|\n|\w+:\S|$)/,e.TimestampRegex=/^<t:(-?\d+)(?::(R|t|T|d|D|f|F))?>/,e.HeadingRegex=/^(#{1,3}) +([^\n]+?)(\n|$)/,e.SubtextRegex=/^-# +([^\n]+?)(\n|$)/,e.SlashCommandRegex=/^<\/([-_'\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}(?: [-_'\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}){0,2})?:(\d{17,21})>/u,e.GuildNavigationRegex=/^<(\d{17,20}):(?:(customize|browse|guide)|(linked-roles)(:\d{17,20})?)>/})),_=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.guildNavigation=void 0;var i=r(h()),a=g();e.guildNavigation={order:i.default.defaultRules.strong.order,match:e=>a.GuildNavigationRegex.exec(e),parse:function(e){let t=e[2]??e[3];if(t===`linked-roles`){let n=e[4]?.slice(1)??null;return{id:e[1],navigation:t,roleId:n}}return{id:e[1],navigation:t}}}})),v=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.slashCommand=void 0;var i=r(h()),a=g();e.slashCommand={order:i.default.defaultRules.strong.order,match:e=>a.SlashCommandRegex.exec(e),parse:function(e){let t=e[1].split(` `),n={fullName:e[1],name:t[0],subcommand:null,subcommandGroup:null,id:e[2]};return t.length==2&&(n.subcommand=t[1]),t.length===3&&(n.subcommandGroup=t[1],n.subcommand=t[2]),n}}})),y=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.everyone=void 0;var i=r(h()),a=g();e.everyone={order:i.default.defaultRules.strong.order,match:e=>a.EveryoneRegex.exec(e),parse:function(){return{}}}})),b=u((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.TwemojiRegex=void 0,e.TwemojiRegex=/^((?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83d\udc30\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udeef\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83d\udc30\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udeef\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83d\udc30\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udeef\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83d\udc30\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udeef\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83d\udc30\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udeef\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83d\udc30\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udeef\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83d\udc30\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udeef\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83d\udc30\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udeef\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83d\udc30\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udeef\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83d\udc30\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udeef\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83d\udc30\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udeef\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83d\udc30\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udeef\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83d\udc30\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udeef\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83d\udc30\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udeef\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83d\udc30\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udeef\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6f\ud83c\udffb\u200d\u2640\ufe0f|\ud83d\udc6f\ud83c\udffb\u200d\u2642\ufe0f|\ud83d\udc6f\ud83c\udffc\u200d\u2640\ufe0f|\ud83d\udc6f\ud83c\udffc\u200d\u2642\ufe0f|\ud83d\udc6f\ud83c\udffd\u200d\u2640\ufe0f|\ud83d\udc6f\ud83c\udffd\u200d\u2642\ufe0f|\ud83d\udc6f\ud83c\udffe\u200d\u2640\ufe0f|\ud83d\udc6f\ud83c\udffe\u200d\u2642\ufe0f|\ud83d\udc6f\ud83c\udfff\u200d\u2640\ufe0f|\ud83d\udc6f\ud83c\udfff\u200d\u2642\ufe0f|\ud83e\udd3c\ud83c\udffb\u200d\u2640\ufe0f|\ud83e\udd3c\ud83c\udffb\u200d\u2642\ufe0f|\ud83e\udd3c\ud83c\udffc\u200d\u2640\ufe0f|\ud83e\udd3c\ud83c\udffc\u200d\u2642\ufe0f|\ud83e\udd3c\ud83c\udffd\u200d\u2640\ufe0f|\ud83e\udd3c\ud83c\udffd\u200d\u2642\ufe0f|\ud83e\udd3c\ud83c\udffe\u200d\u2640\ufe0f|\ud83e\udd3c\ud83c\udffe\u200d\u2642\ufe0f|\ud83e\udd3c\ud83c\udfff\u200d\u2640\ufe0f|\ud83e\udd3c\ud83c\udfff\u200d\u2642\ufe0f|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc6f\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83e\udd3c\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc6f\udc8f\udc91]|\ud83e[\udd1d\udd3c])|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd\ude70])(?:\u200d\u27a1\ufe0f)?|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f(?:\u200d\u27a1\ufe0f)?)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f(?:\u200d\u27a1\ufe0f)?|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83e\uddd1\u200d\ud83e\uddd1\u200d\ud83e\uddd2\u200d\ud83e\uddd2|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83e\uddd1\u200d\ud83e\uddd1\u200d\ud83e\uddd2|\ud83e\uddd1\u200d\ud83e\uddd2\u200d\ud83e\uddd2|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u26d3\ufe0f\u200d\ud83d\udca5|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udf44\u200d\ud83d\udfeb|\ud83c\udf4b\u200d\ud83d\udfe9|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc26\u200d\ud83d\udd25|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83d\ude42\u200d\u2194\ufe0f|\ud83d\ude42\u200d\u2195\ufe0f|\ud83e\uddd1\u200d\ud83e\uddd2|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c\udfc3|\ud83d\udeb6|\ud83e\uddce)(?:\ud83c[\udffb-\udfff])?(?:\u200d\u27a1\ufe0f)?|(?:\ud83c[\udf85\udfc2\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4\udeb5\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded8\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude8a\ude8e-\udec2\udec6\udec8\udecd-\udedc\udedf-\udeea\udeef]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f)/})),x=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.twemoji=void 0;var i=r(h()),a=b();e.twemoji={order:i.default.defaultRules.strong.order,match:e=>a.TwemojiRegex.exec(e),parse:function(e){return{name:e[0]}}}})),S=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.channel=void 0;var i=r(h()),a=g();e.channel={order:i.default.defaultRules.strong.order,match:e=>a.ChannelMentionRegex.exec(e),parse:function(e){return{id:e[1]}}}})),C=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.timestamp=void 0;var i=r(h()),a=g();e.timestamp={order:i.default.defaultRules.strong.order,match:e=>a.TimestampRegex.exec(e),parse:function(e){return{timestamp:e[1],format:e[2]}}}})),w=u((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.extend=void 0,e.extend=(e,t)=>Object.assign({},t,e)})),T=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.blockQuote=void 0;var i=r(h()),a=w(),o=g();e.blockQuote=(0,a.extend)({match:function(e,t,n){return!/^$|\n *$/.test(n)||t.inQuote?null:o.BlockQuoteRegex.exec(e)},parse:function(e,t,n){let r=e[0],i=/^ *>>> ?/.exec(r)?/^ *>>> ?/:/^ *> ?/gm;return{content:t(r.replace(i,``),Object.assign({},n,{inQuote:!0})),type:`blockQuote`}}},i.default.defaultRules.blockQuote)})),E=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.strikethrough=void 0;var i=r(h()),a=w(),o=g();e.strikethrough=(0,a.extend)({match:i.default.inlineRegex(o.StrikeThroughRegex)},i.default.defaultRules.del)})),ee=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.codeBlock=void 0;var i=r(h()),a=w(),o=g();e.codeBlock=(0,a.extend)({match:i.default.inlineRegex(o.CodeBlockRegex),parse:function(e,t,n){return{lang:(e[2]||``).trim(),content:e[3]||``,inQuote:n.inQuote||!1}}},i.default.defaultRules.codeBlock)})),D=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.emoji=void 0;var i=r(h()),a=g();e.emoji={order:i.default.defaultRules.strong.order,match:e=>a.EmojiRegex.exec(e),parse:function(e){return{animated:e[1]===`a`,name:e[2],id:e[3]}}}})),O=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.role=void 0;var i=r(h()),a=g();e.role={order:i.default.defaultRules.strong.order,match:e=>a.RoleMentionRegex.exec(e),parse:function(e){return{id:e[1]}}}})),k=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.autolink=void 0;var i=r(h());e.autolink=(0,w().extend)({parse:e=>({content:[{type:`text`,content:e[1]}],target:e[1]})},i.default.defaultRules.autolink)})),te=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.here=void 0;var i=r(h()),a=g();e.here={order:i.default.defaultRules.strong.order,match:e=>a.HereRegex.exec(e),parse:function(){return{}}}})),A=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.emoticon=void 0;var i=r(h()),a=g();e.emoticon={order:i.default.defaultRules.text.order,match:e=>a.EmoticonRegex.exec(e),parse:function(e){return{type:`text`,content:e[1]}}}})),j=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.user=void 0;var i=r(h()),a=g();e.user={order:i.default.defaultRules.strong.order,match:e=>a.UserMentionRegex.exec(e),parse:function(e){return{id:e[1],type:`user`}}}})),ne=u((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.spoiler=void 0;var t=g();e.spoiler={order:0,match:e=>t.SpoilerRegex.exec(e),parse:function(e,t,n){return{content:t(e[1],n)}}}})),re=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.heading=void 0;var i=r(h()),a=w(),o=g();e.heading=(0,a.extend)({match:function(e,t){return t.prevCapture===null||t.prevCapture.slice(-1)[0]===`
`?o.HeadingRegex.exec(e):null}},i.default.defaultRules.heading)})),M=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.subtext=void 0;var i=r(h()),a=g();e.subtext={order:i.default.defaultRules.heading.order-.5,match:function(e,t){return t.prevCapture===null||t.prevCapture.slice(-1)[0]===`
`?a.SubtextRegex.exec(e):null},parse:function(e,t,n){return{content:t(e[1],n)}}}})),N=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.text=void 0;var i=r(h()),a=w(),o=g();e.text=(0,a.extend)({match:e=>o.TextRegex.exec(e)},i.default.defaultRules.text)})),P=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.url=void 0;var i=r(h());e.url=(0,w().extend)({parse:e=>({content:[{type:`text`,content:e[1]}],target:e[1]})},i.default.defaultRules.url)})),ie=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.em=void 0;var i=w(),a=r(h());e.em=(0,i.extend)({parse:function(e,t,n){let r=a.default.defaultRules.em.parse(e,t,Object.assign({},n,{inEmphasis:!0}));return n.inEmphasis?r.content:r}},a.default.defaultRules.em)})),ae=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.br=void 0;var i=r(h());e.br=(0,w().extend)({match:i.default.anyScopeRegex(/^\n/)},i.default.defaultRules.br)})),oe=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.rulesExtended=e.rules=e.SimpleMarkdown=void 0,e.parse=me;var i=r(h());e.SimpleMarkdown=i.default;var a=_(),o=v(),s=y(),c=x(),l=S(),u=C(),d=T(),f=E(),p=ee(),m=D(),g=O(),b=k(),w=te(),oe=A(),F=j(),se=ne(),ce=re(),I=M(),le=N(),ue=P(),de=ie(),fe=ae();e.rules={blockQuote:d.blockQuote,codeBlock:p.codeBlock,newline:i.default.defaultRules.newline,escape:i.default.defaultRules.escape,autolink:b.autolink,url:ue.url,em:de.em,strong:i.default.defaultRules.strong,underline:i.default.defaultRules.u,strikethrough:f.strikethrough,inlineCode:i.default.defaultRules.inlineCode,text:le.text,emoticon:oe.emoticon,br:fe.br,spoiler:se.spoiler,heading:ce.heading,subtext:I.subtext,user:F.user,channel:l.channel,role:g.role,emoji:m.emoji,everyone:s.everyone,here:w.here,twemoji:c.twemoji,timestamp:u.timestamp,slashCommand:o.slashCommand,guildNavigation:a.guildNavigation},e.rulesExtended=Object.assign(Object.assign({},e.rules),{link:i.default.defaultRules.link});var L=i.default.parserFor(e.rules),pe=i.default.parserFor(e.rulesExtended);function me(e,t=`normal`){return t===`normal`?L(e,{inline:!0}):pe(e,{inline:!0})}e.default=me})),F=n(i(),1),se=oe(),ce=globalThis,I=ce.ShadowRoot&&(ce.ShadyCSS===void 0||ce.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,le=Symbol(),ue=new WeakMap,de=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(I&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=ue.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&ue.set(t,e))}return e}toString(){return this.cssText}},fe=e=>new de(typeof e==`string`?e:e+``,void 0,le),L=(e,...t)=>new de(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,le),pe=(e,t)=>{if(I)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=ce.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},me=I?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return fe(t)})(e):e,{is:he,defineProperty:ge,getOwnPropertyDescriptor:_e,getOwnPropertyNames:ve,getOwnPropertySymbols:ye,getPrototypeOf:be}=Object,xe=globalThis,Se=xe.trustedTypes,Ce=Se?Se.emptyScript:``,we=xe.reactiveElementPolyfillSupport,Te=(e,t)=>e,Ee={toAttribute(e,t){switch(t){case Boolean:e=e?Ce:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},De=(e,t)=>!he(e,t),Oe={attribute:!0,type:String,converter:Ee,reflect:!1,useDefault:!1,hasChanged:De};Symbol.metadata??=Symbol(`metadata`),xe.litPropertyMetadata??=new WeakMap;var ke=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Oe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&ge(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=_e(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Oe}static _$Ei(){if(this.hasOwnProperty(Te(`elementProperties`)))return;let e=be(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Te(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Te(`properties`))){let e=this.properties,t=[...ve(e),...ye(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(me(e))}else e!==void 0&&t.push(me(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return pe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?Ee:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?Ee:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??De)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};ke.elementStyles=[],ke.shadowRootOptions={mode:`open`},ke[Te(`elementProperties`)]=new Map,ke[Te(`finalized`)]=new Map,we?.({ReactiveElement:ke}),(xe.reactiveElementVersions??=[]).push(`2.1.2`);var Ae=globalThis,je=e=>e,Me=Ae.trustedTypes,Ne=Me?Me.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,Pe=`$lit$`,Fe=`lit$${Math.random().toFixed(9).slice(2)}$`,Ie=`?`+Fe,Le=`<${Ie}>`,Re=document,ze=()=>Re.createComment(``),Be=e=>e===null||typeof e!=`object`&&typeof e!=`function`,Ve=Array.isArray,He=e=>Ve(e)||typeof e?.[Symbol.iterator]==`function`,Ue=`[ 	
\f\r]`,We=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ge=/-->/g,Ke=/>/g,qe=RegExp(`>|${Ue}(?:([^\\s"'>=/]+)(${Ue}*=${Ue}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Je=/'/g,Ye=/"/g,Xe=/^(?:script|style|textarea|title)$/i,Ze=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),R=Ze(1),z=Ze(2),Qe=Symbol.for(`lit-noChange`),$e=Symbol.for(`lit-nothing`),et=new WeakMap,tt=Re.createTreeWalker(Re,129);function nt(e,t){if(!Ve(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return Ne===void 0?t:Ne.createHTML(t)}var rt=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=We;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===We?c[1]===`!--`?o=Ge:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=qe):(Xe.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=qe):o=Ke:o===qe?c[0]===`>`?(o=i??We,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?qe:c[3]===`"`?Ye:Je):o===Ye||o===Je?o=qe:o===Ge||o===Ke?o=We:(o=qe,i=void 0);let d=o===qe&&e[t+1].startsWith(`/>`)?` `:``;a+=o===We?n+Le:l>=0?(r.push(s),n.slice(0,l)+Pe+n.slice(l)+Fe+d):n+Fe+(l===-2?t:d)}return[nt(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},it=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=rt(t,n);if(this.el=e.createElement(l,r),tt.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=tt.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(Pe)){let t=u[o++],n=i.getAttribute(e).split(Fe),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?lt:r[1]===`?`?ut:r[1]===`@`?dt:ct}),i.removeAttribute(e)}else e.startsWith(Fe)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Xe.test(i.tagName)){let e=i.textContent.split(Fe),t=e.length-1;if(t>0){i.textContent=Me?Me.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],ze()),tt.nextNode(),c.push({type:2,index:++a});i.append(e[t],ze())}}}else if(i.nodeType===8){if(i.data===Ie)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(Fe,e+1))!==-1;)c.push({type:7,index:a}),e+=Fe.length-1}}a++}}static createElement(e,t){let n=Re.createElement(`template`);return n.innerHTML=e,n}};function at(e,t,n=e,r){if(t===Qe)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=Be(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=at(e,i._$AS(e,t.values),i,r)),t}var ot=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??Re).importNode(t,!0);tt.currentNode=r;let i=tt.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new st(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ft(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=tt.nextNode(),a++)}return tt.currentNode=Re,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},st=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=$e,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=at(this,e,t),Be(e)?e===$e||e==null||e===``?(this._$AH!==$e&&this._$AR(),this._$AH=$e):e!==this._$AH&&e!==Qe&&this._(e):e._$litType$===void 0?e.nodeType===void 0?He(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==$e&&Be(this._$AH)?this._$AA.nextSibling.data=e:this.T(Re.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=it.createElement(nt(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new ot(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=et.get(e.strings);return t===void 0&&et.set(e.strings,t=new it(e)),t}k(t){Ve(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(ze()),this.O(ze()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=je(e).nextSibling;je(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ct=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=$e,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=$e}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=at(this,e,t,0),a=!Be(e)||e!==this._$AH&&e!==Qe,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=at(this,r[n+o],t,o),s===Qe&&(s=this._$AH[o]),a||=!Be(s)||s!==this._$AH[o],s===$e?e=$e:e!==$e&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===$e?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},lt=class extends ct{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$e?void 0:e}},ut=class extends ct{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==$e)}},dt=class extends ct{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=at(this,e,t,0)??$e)===Qe)return;let n=this._$AH,r=e===$e&&n!==$e||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==$e&&(n===$e||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ft=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){at(this,e)}},pt={M:Pe,P:Fe,A:Ie,C:1,L:rt,R:ot,D:He,V:at,I:st,H:ct,N:ut,U:dt,B:lt,F:ft},mt=Ae.litHtmlPolyfillSupport;mt?.(it,st),(Ae.litHtmlVersions??=[]).push(`3.3.3`);var ht=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new st(t.insertBefore(ze(),e),e,void 0,n??{})}return i._$AI(e),i},gt=globalThis,B=class extends ke{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ht(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Qe}};B._$litElement$=!0,B.finalized=!0,gt.litElementHydrateSupport?.({LitElement:B});var _t=gt.litElementPolyfillSupport;_t?.({LitElement:B}),(gt.litElementVersions??=[]).push(`4.2.2`);var V=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},vt={attribute:!0,type:String,converter:Ee,reflect:!1,hasChanged:De},yt=(e=vt,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function H(e){return(t,n)=>typeof n==`object`?yt(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function bt(e){return H({...e,state:!0,attribute:!1})}function xt(e){return(t,n)=>{let r=typeof t==`function`?t:t[n];Object.assign(r,e)}}var St=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Ct=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},wt=(()=>{let e=[V(`discord-action-row`)],t,n=[],r,i=B;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;St(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=L`
		:host {
			display: flex;
			flex-wrap: wrap;
		}
	`;render(){return R`<slot></slot>`}static{Ct(r,n)}};return r})(),Tt=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Et=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Dt=(()=>{let e=[V(`discord-attachments`)],t,n=[],r,i=B;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Tt(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=L`
		:host {
			display: grid;
			grid-auto-flow: row;
			grid-row-gap: 0.25rem;
			text-indent: 0;
			min-height: 0;
			min-width: 0;
			padding-top: 0.125rem;
			padding-bottom: 0.125rem;
			position: relative;
		}

		:host > * {
			justify-self: start;
			-ms-flex-item-align: start;
			align-self: start;
		}
	`;render(){return R`<slot></slot>`}static{Et(r,n)}};return r})(),Ot=class extends Event{constructor(e,t,n,r){super(`context-request`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=n,this.subscribe=r??!1}};function kt(e){return e}var At=class{constructor(e,t,n,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,t.context!==void 0){let e=t;this.context=e.context,this.callback=e.callback,this.subscribe=e.subscribe??!1}else this.context=t,this.callback=n,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&=(this.unsubscribe(),void 0)}dispatchRequest(){this.host.dispatchEvent(new Ot(this.context,this.host,this.t,this.subscribe))}},jt=class{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let n=t||!Object.is(e,this.o);this.o=e,n&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},e!==void 0&&(this.value=e)}addCallback(e,t,n){if(!n)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}},Mt=class extends Event{constructor(e,t){super(`context-provider`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}},Nt=class extends jt{constructor(e,t,n){super(t.context===void 0?n:t.initialValue),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:n}]of this.subscriptions)t.has(e)||(t.add(e),n.dispatchEvent(new Ot(this.context,n,e,!0)));e.stopPropagation()},this.host=e,this.context=t.context===void 0?t:t.context,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener(`context-request`,this.onContextRequest),this.host.addEventListener(`context-provider`,this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new Mt(this.context,this.host))}};function Pt({context:e}){return(t,n)=>{let r=new WeakMap;if(typeof n==`object`)return{get(){return t.get.call(this)},set(e){return r.get(this).setValue(e),t.set.call(this,e)},init(t){return r.set(this,new Nt(this,{context:e,initialValue:t})),t}};{t.constructor.addInitializer((t=>{r.set(t,new Nt(t,{context:e}))}));let i=Object.getOwnPropertyDescriptor(t,n),a;if(i===void 0){let e=new WeakMap;a={get(){return e.get(this)},set(t){r.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=i.set;a={...i,set(t){r.get(this).setValue(t),e?.call(this,t)}}}Object.defineProperty(t,n,a);return}}}function U({context:e,subscribe:t}){return(n,r)=>{typeof r==`object`?r.addInitializer((function(){new At(this,{context:e,callback:e=>{n.set.call(this,e)},subscribe:t})})):n.constructor.addInitializer((n=>{new At(n,{context:e,callback:e=>{n[r]=e},subscribe:t})}))}}var Ft={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},It=e=>(...t)=>({_$litDirective$:e,values:t}),Lt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},W=It(class extends Lt{constructor(e){if(super(e),e.type!==Ft.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let n=e.element.classList;for(let e of this.st)e in t||(n.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return Qe}}),G=e=>e??$e,{I:Rt}=pt,zt=e=>e.strings===void 0,Bt=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),Bt(e,t);return!0},Vt=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Ht=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Gt(t)}};function Ut(e){this._$AN===void 0?this._$AM=e:(Vt(this),this._$AM=e,Ht(this))}function Wt(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)Bt(r[e],!1),Vt(r[e]);else r!=null&&(Bt(r,!1),Vt(r))}else Bt(this,e)}}var Gt=e=>{e.type==Ft.CHILD&&(e._$AP??=Wt,e._$AQ??=Ut)},Kt=class extends Lt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Ht(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Bt(this,e),Vt(this))}setValue(e){if(zt(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},qt=()=>new Jt,Jt=class{},Yt=new WeakMap,Xt=It(class extends Kt{render(e){return $e}update(e,[t]){let n=t!==this.G;return n&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),$e}rt(e){if(this.G!==void 0){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=Yt.get(t);n===void 0&&(n=new WeakMap,Yt.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}}get lt(){return typeof this.G==`function`?Yt.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});function K(e,t,n){return e?t(e):n?.(e)}var Zt=L`
	.discord-media-attachment-non-visual-media-item-container {
		justify-self: start;
		align-self: start;
		margin-top: 8px;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.discord-media-attachment-mosaic-item-media {
		border-radius: 2px;
		display: flex;
		flex-flow: row nowrap;
		height: 100%;
		max-height: inherit;
		max-width: 100%;
		position: relative;
	}

	.discord-media-attachment-controls {
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 4px;
		background-color: hsl(0 calc(1 * 0%) 0% / 0.6);
		border-radius: 3px;
	}

	.discord-media-attachment-video-button {
		margin-right: 8px;
	}

	.discord-media-attachment-control-icon {
		display: block;
		width: 24px;
		height: 24px;
		padding: 4px;
		cursor: pointer;
		flex: 0 0 auto;
		opacity: 0.6;
	}

	.discord-media-attachment-duration-time-wrapper {
		flex: 0 0 auto;
		margin: 4px;
		height: 12px;
	}

	.discord-media-attachment-duration-time-display {
		font-weight: 500;
		display: inline-block;
		font-family:
			'gg mono', 'Source Code Pro', Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter', 'DejaVu Sans Mono',
			'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier, monospace;
		font-size: 12px;
		line-height: 12px;
		vertical-align: text-top;
	}

	.discord-media-attachment-duration-time-separator {
		margin: 0 2px;
	}

	.discord-media-attachment-non-visual-media-item-container:hover .discord-button-download-attachment {
		display: block !important;
	}

	.discord-button-download-attachment {
		display: none;
		position: absolute;
		top: -8px;
		right: -8px;
		border-radius: 5px;
		outline: color-mix(in oklab, hsl(220 calc(1 * 6.5%) 18% / 1) 100%, black 0%);
		background-color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%);
	}

	.discord-link-download-attachment {
		color: color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%);
		display: flex;
	}

	.discord-icon-download {
		padding: 6px;
	}
`,Qt=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},$t=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},en=(()=>{let e=B,t,n=[],r=[],i,a=[],o=[],s,c=[],l=[],u,d=[],f=[],p,m=[],h=[],g,_=[],v=[],y,b=[],x=[],S,C=[],w=[];return class extends e{static{let T=typeof Symbol==`function`&&Symbol.metadata?Object.create(e[Symbol.metadata]??null):void 0;t=[bt()],i=[bt()],s=[bt()],u=[bt()],p=[bt()],g=[bt()],y=[bt()],S=[bt()],Qt(this,null,t,{kind:`accessor`,name:`currentPlaybackPosition`,static:!1,private:!1,access:{has:e=>`currentPlaybackPosition`in e,get:e=>e.currentPlaybackPosition,set:(e,t)=>{e.currentPlaybackPosition=t}},metadata:T},n,r),Qt(this,null,i,{kind:`accessor`,name:`totalMediaDuration`,static:!1,private:!1,access:{has:e=>`totalMediaDuration`in e,get:e=>e.totalMediaDuration,set:(e,t)=>{e.totalMediaDuration=t}},metadata:T},a,o),Qt(this,null,s,{kind:`accessor`,name:`isPlaying`,static:!1,private:!1,access:{has:e=>`isPlaying`in e,get:e=>e.isPlaying,set:(e,t)=>{e.isPlaying=t}},metadata:T},c,l),Qt(this,null,u,{kind:`accessor`,name:`raf`,static:!1,private:!1,access:{has:e=>`raf`in e,get:e=>e.raf,set:(e,t)=>{e.raf=t}},metadata:T},d,f),Qt(this,null,p,{kind:`accessor`,name:`isMuted`,static:!1,private:!1,access:{has:e=>`isMuted`in e,get:e=>e.isMuted,set:(e,t)=>{e.isMuted=t}},metadata:T},m,h),Qt(this,null,g,{kind:`accessor`,name:`currentVolume`,static:!1,private:!1,access:{has:e=>`currentVolume`in e,get:e=>e.currentVolume,set:(e,t)=>{e.currentVolume=t}},metadata:T},_,v),Qt(this,null,y,{kind:`accessor`,name:`hasEnded`,static:!1,private:!1,access:{has:e=>`hasEnded`in e,get:e=>e.hasEnded,set:(e,t)=>{e.hasEnded=t}},metadata:T},b,x),Qt(this,null,S,{kind:`accessor`,name:`hasRunUpdate`,static:!1,private:!1,access:{has:e=>`hasRunUpdate`in e,get:e=>e.hasRunUpdate,set:(e,t)=>{e.hasRunUpdate=t}},metadata:T},C,w),T&&Object.defineProperty(this,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:T})}mediaComponentRef=qt();seekSliderRef=qt();volumeControlRef=qt();volumeControlInputRef=qt();#e=$t(this,n,`0:00`);get currentPlaybackPosition(){return this.#e}set currentPlaybackPosition(e){this.#e=e}#t=($t(this,r),$t(this,a,``));get totalMediaDuration(){return this.#t}set totalMediaDuration(e){this.#t=e}#n=($t(this,o),$t(this,c,!1));get isPlaying(){return this.#n}set isPlaying(e){this.#n=e}#r=($t(this,l),$t(this,d,null));get raf(){return this.#r}set raf(e){this.#r=e}#i=($t(this,f),$t(this,m,!1));get isMuted(){return this.#i}set isMuted(e){this.#i=e}#a=($t(this,h),$t(this,_,1));get currentVolume(){return this.#a}set currentVolume(e){this.#a=e}#o=($t(this,v),$t(this,b,!1));get hasEnded(){return this.#o}set hasEnded(e){this.#o=e}#s=($t(this,x),$t(this,C,!1));get hasRunUpdate(){return this.#s}set hasRunUpdate(e){this.#s=e}calculateTime(e){let t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${n<10?`0${n}`:`${n}`}`}displayMediaDuration(){this.mediaComponentRef.value&&(this.totalMediaDuration=this.calculateTime(this.mediaComponentRef.value.duration))}setSliderMax(){this.mediaComponentRef.value&&this.seekSliderRef.value&&(this.seekSliderRef.value.max=Math.floor(this.mediaComponentRef.value.duration).toString())}displayBufferedAmount(){if(this.mediaComponentRef.value&&this.seekSliderRef.value){let e=this.mediaComponentRef.value.buffered.length-1;if(e>=0){let t=Math.floor(this.mediaComponentRef.value.buffered.end(e));this.style.setProperty(`--buffered-width`,`${t/Number(this.seekSliderRef.value.max)*100}%`)}}}whilePlaying=($t(this,w),()=>{if(this.mediaComponentRef.value&&this.seekSliderRef.value){this.seekSliderRef.value.value=Math.floor(this.mediaComponentRef.value.currentTime).toString();let e=Number(this.seekSliderRef.value.value);this.currentPlaybackPosition=this.calculateTime(e),this.style.setProperty(`--seek-before-width`,`${e/Number(this.seekSliderRef.value.max)*100}%`),this.raf=requestAnimationFrame(this.whilePlaying)}});handleEnded(){this.mediaComponentRef.value&&(this.mediaComponentRef.value.pause(),this.raf!==null&&cancelAnimationFrame(this.raf),this.isPlaying=!1,this.hasEnded=!0)}handleClickPlayPauseIcon=()=>{this.mediaComponentRef.value&&(this.hasEnded&&=!1,this.isPlaying?(this.mediaComponentRef.value.pause(),this.raf!==null&&cancelAnimationFrame(this.raf),this.isPlaying=!1):(this.mediaComponentRef.value.play(),requestAnimationFrame(this.whilePlaying),this.isPlaying=!0))};handleSpaceToPlayPause=e=>{e.code===`Space`&&(e.preventDefault(),e.stopPropagation(),this.handleClickPlayPauseIcon())};handleClickMuteIcon(){this.mediaComponentRef.value&&(this.isMuted?(this.mediaComponentRef.value.muted=!1,this.isMuted=!1):(this.mediaComponentRef.value.muted=!0,this.isMuted=!0))}handleSeekSliderInput(e){let t=e.target;this.style.setProperty(`--seek-before-width`,`${Number(t.value)/Number(t.max)*100}%`),this.seekSliderRef.value&&(this.currentPlaybackPosition=this.calculateTime(Number(this.seekSliderRef.value.value))),this.mediaComponentRef.value&&!this.mediaComponentRef.value.paused&&this.raf!==null&&cancelAnimationFrame(this.raf)}handleSeekSliderChange=()=>{this.mediaComponentRef.value&&this.seekSliderRef.value&&(this.mediaComponentRef.value.currentTime=Number(this.seekSliderRef.value.value),this.mediaComponentRef.value.paused||requestAnimationFrame(this.whilePlaying))};handleVolumeSliderInput(e){let{value:t}=e.target;if(this.mediaComponentRef.value){let e=Number(t)/100;this.currentVolume=e,this.mediaComponentRef.value.volume=e}}handleVolumeVerticalEnter(){this.volumeControlRef.value&&this.style.setProperty(`--volume-slider-opacity`,`1`)}handleVolumeVerticalLeave(){this.volumeControlRef.value&&this.style.setProperty(`--volume-slider-opacity`,`0`)}handleVolumeVerticalFocus(){this.handleVolumeVerticalEnter(),this.addEventListener(`keydown`,this.handleVolumeControlKeyboard)}handleVolumeVerticalBlur(){this.handleVolumeVerticalLeave(),this.removeEventListener(`keydown`,this.handleVolumeControlKeyboard)}handleVolumeControlKeyboard(e){let t=0;e.code===`ArrowDown`?t=-.1:e.code===`ArrowUp`&&(t=.1),t!==0&&this.adjustVolume(t,e)}adjustVolume(e,t){t.preventDefault(),t.stopPropagation();let n=this.currentVolume+e;n<.1?n=0:n>1&&(n=1),this.mediaComponentRef.value&&this.volumeControlInputRef.value&&(this.currentVolume=n,this.mediaComponentRef.value.volume=n,this.volumeControlInputRef.value.value=(n*100).toString())}mediaMetadataLoaded=()=>{this.mediaComponentRef.value&&(this.displayMediaDuration(),this.setSliderMax(),this.displayBufferedAmount())};shouldUpdate(e){return e.has(`hasRunUpdate`)&&e.size===1?!1:super.shouldUpdate(e)}firstUpdated(e){this.hasRunUpdate||(this.mediaComponentRef.value&&(this.mediaComponentRef.value.readyState>0?(this.displayMediaDuration(),this.setSliderMax(),this.displayBufferedAmount()):this.mediaComponentRef.value.addEventListener(`loadedmetadata`,this.mediaMetadataLoaded)),this.hasRunUpdate=!0,super.firstUpdated(e))}disconnectedCallback(){super.disconnectedCallback(),this.mediaComponentRef.value?.removeEventListener(`loadedmetadata`,this.mediaMetadataLoaded)}}})(),tn=L`
	.discord-media-attachment-horizontal {
		width: 100%;
		display: flex;
		align-self: stretch;
	}

	.discord-media-attachment-media-bar-interaction {
		position: relative;
		flex: 1 1 auto;
		align-self: stretch;
		display: flex;
		align-items: center;
		cursor: pointer;
		margin: 0 7px;
	}

	.discord-media-attachment-playback-control {
		position: relative;
		flex: 1 1 auto;
		height: 6px;
		background-color: hsl(210 calc(1 * 9.3%) 78.8% / 0.3);
	}

	.discord-media-attachment-playback-control:hover {
		box-shadow: 0 1px 1px hsl(0 calc(1 * 0%) 0% / 0.3);
	}

	.discord-media-attachment-playback-control::before {
		background-color: hsl(210 calc(1 * 9.3%) 78.8% / 0.3);
		left: -3px;
		border-radius: 3px 0 0 3px;
		content: '';
		position: absolute;
		top: 0;
		height: 100%;
		width: 3px;
		z-index: 1;
	}

	input[type='range'].discord-media-attachment-playback-control::-webkit-slider-runnable-track {
		width: 2.47264%;
		height: 100%;
		cursor: pointer;
		opacity: 1;
		background: linear-gradient(to right, hsl(199 100% calc(1 * 69%) / 1) var(--buffered-width));
	}

	input[type='range'].discord-media-attachment-playback-control::before {
		position: absolute;
		content: '';
		top: 0;
		width: var(--seek-before-width);
		height: 100%;
		z-index: 3;
		background-color: hsl(199 100% calc(1 * 69%) / 1);
		cursor: pointer;
	}

	input[type='range'].discord-media-attachment-playback-control::-webkit-slider-thumb {
		position: relative;
		cursor: pointer;
		border-radius: 3px;
		width: auto;
		height: 18px;
		line-height: 18px;
		text-align: center;
		font-weight: 600;
		font-size: 12px;
		color: hsl(0 calc(1 * 0%) 97.6% / 1);
		opacity: 1;
		transition: opacity.2s ease-out;
		pointer-events: none;
		-webkit-appearance: none;
		box-sizing: content-box;
		background-color: hsl(0 calc(1 * 0%) 0% / 1);
		margin: -5px 0 0 0;
		z-index: 4;
	}

	input[type='range'].discord-media-attachment-playback-control:active::-webkit-slider-thumb {
		transform: scale(1.2);
		filter: brightness(85%);
	}

	input[type='range'].discord-media-attachment-playback-control::-moz-range-track {
		width: 2.47264%;
		height: 100%;
		cursor: pointer;
		opacity: 1;
		background: linear-gradient(to right, hsl(199 100% calc(1 * 69%) / 1) var(--buffered-width));
	}

	input[type='range'].discord-media-attachment-playback-control::-moz-range-progress {
		background-color: hsl(199 100% calc(1 * 69%) / 1);
	}

	input[type='range'].discord-media-attachment-playback-control::-moz-focus-outer {
		border: 0;
	}

	input[type='range'].discord-media-attachment-playback-control::-moz-range-thumb {
		border-radius: 50%;
		position: relative;
		cursor: pointer;
		line-height: 18px;
		text-align: center;
		font-weight: 600;
		font-size: 12px;
		opacity: 1;
		transition: opacity.2s ease-out;
		pointer-events: none;
		-webkit-appearance: none;
		box-sizing: content-box;
		background: #007db5;
		margin: -5px 0 0 0;
	}

	input[type='range'].discord-media-attachment-playback-control:active::-moz-range-thumb {
		transform: scale(1.2);
		filter: brightness(85%);
	}
`,nn=L`
	.discord-media-attachment-flex {
		display: flex;
	}

	.discord-media-attachment-flex-container {
		justify-content: flex-end;
		align-items: center;
		flex-direction: column;
		display: flex;
		position: relative;
	}

	.discord-media-attachment-button-slider {
		margin-bottom: 4px;
		margin-left: -4px;
		position: absolute;
		bottom: calc(100% + 16px);
		left: -78px;
		right: 0;
		height: 50px;
		opacity: var(--volume-slider-opacity);
		-webkit-app-region: no-drag;
	}

	.discord-media-attachment-volume-vertical {
		display: flex;
		align-items: center;
		transform-origin: top;
		transform: rotate(270deg);
		height: 54px;
		width: 140px;
	}

	.discord-media-attachment-button {
		cursor: pointer;
		line-height: 0;
		width: auto;
		background: transparent;
		color: currentColor;
		border: 0;
		padding: 0;
		margin: 0;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border-radius: 3px;
		font-size: 14px;
		font-weight: 500;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}

	.discord-media-attachment-button-content {
		--custom-button-link-underline-offset: 1px;
		--button--underline-color: transparent;
		--custom-button-link-underline-width: 1px;
		--custom-button-link-underline-stop: calc(var(--custom-button-link-underline-width) + var(--custom-button-link-underline-offset));

		background-image: linear-gradient(
			to top,
			transparent,
			transparent var(--custom-button-link-underline-offset),
			var(--button--underline-color) var(--custom-button-link-underline-offset),
			var(--button--underline-color) var(--custom-button-link-underline-stop),
			transparent var(--custom-button-link-underline-stop)
		);
	}

	.discord-media-attachment-button-control-icon {
		display: block;
		width: 24px;
		height: 24px;
		padding: 4px;
		cursor: pointer;
		flex: 0 0 auto;
		opacity: 0.6;
	}

	.discord-media-attachment-volume-slider {
		position: relative;
		height: 6px;
		background-color: hsl(210 calc(1 * 9.3%) 78.8% / 0.3);
		width: 88px;
	}

	.discord-media-attachment-volume-slider:hover {
		box-shadow: 0 1px 1px hsl(0 calc(1 * 0%) 0% / 0.3);
	}

	.discord-media-attachment-volume-slider::before {
		background-color: hsl(210 calc(1 * 9.3%) 78.8%/0.3);
		left: 0px;
		border-radius: 3px 0 0 3px;
		content: '';
		position: absolute;
		top: 0;
		height: 6px;
		width: 100%;
		z-index: 3;
	}

	input[type='range'].discord-media-attachment-volume-slider::-webkit-slider-runnable-track {
		background-color: hsl(210 calc(1 * 9.3%) 78.8%/0.3);
		height: 2.47264%;
		width: 100%;
		cursor: grab;
		border-radius: 8px;
	}

	input[type='range'].discord-media-attachment-volume-slider::-webkit-slider-thumb {
		position: relative;
		bottom: 8px;
		z-index: 4;
	}

	input[type='range'].discord-media-attachment-volume-slider:active::-webkit-slider-thumb {
		transform: scale(1.2);
		filter: brightness(85%);
	}
`,q=It(class extends Kt{host;element;prevData={};eventData={};render(e){return $e}update(e,[t]){this.element!==e.element&&(this.element=e.element),this.host=e.options?.host??this.element,this.apply(t),this.groom(t),this.prevData={...t}}apply(e){if(!e)return;let{prevData:t,element:n}=this;for(let[r,i]of Object.entries(e)){if(i===t[r])continue;let e=r.slice(1);switch(r[0]){case`@`:this.eventData[e]=i,this.applyEvent(e,i);break;case`.`:n[e]=i;break;case`?`:i?n.setAttribute(e,``):n.removeAttribute(e);break;default:i===null?n.removeAttribute(r):n.setAttribute(r,String(i))}}}groom(e){let{prevData:t,element:n}=this;if(t)for(let[r,i]of Object.entries(t)){let t=r.slice(1);if(!e||!(r in e)&&n[t]===i)switch(r[0]){case`@`:this.groomEvent(t,i);break;case`.`:n[t]=void 0;break;case`?`:n.removeAttribute(t);break;default:n.removeAttribute(r)}}}applyEvent(e,t){let{prevData:n,element:r}=this;this.eventData[e]=t,n[e]&&r.removeEventListener(e,this,t),r.addEventListener(e,this,t)}groomEvent(e,t){let{element:n}=this;Reflect.deleteProperty(this.eventData,e),n.removeEventListener(e,this,t)}handleEvent(e){let t=this.eventData[e.type];typeof t==`function`?t.call(this.host,e):t.handleEvent(e)}disconnected(){let{eventData:e,element:t}=this;for(let[n,r]of Object.entries(e)){let e=n.slice(1);t.removeEventListener(e,this,r)}}reconnected(){let{eventData:e,element:t}=this;for(let[n,r]of Object.entries(e)){let e=n.slice(1);t.addEventListener(e,this,r)}}}),rn=z`
	<path d="M5.688 3.5v.438H5.25v.438h-.438V1.313h-.438V.875h-.436V.438H3.5v6.125h2.625v-.438H5.25v-.438h.438v-.438h.438v-.438h.438V3.5z" fill="#b79cf8"/>
	<path d="M3.063.438v.438h-.438v.438h-.437v3.5h-.875v-.438H.438v1.75h.438v.438h2.625V.438z" fill="#ff7fc0"/>
	<path d="M3.938 0h-.875v.438h.875zm-.875.438h-.438v.438h.438z" fill="#000"/>
	<path d="M3.938.438h-.875v.438h.875zm-.875.437h-.438v.438h.438zm0 1.75h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M2.188 5.25H1.75v.438h.438z" fill="#ffa5d3"/>
	<path d="M2.625 5.25h-.437v.438h.438zm-1.75.438H.438v.438h.438zm2.625.438H.875v.438H3.5z" fill="#ff1c90"/>
	<path d="M1.75 5.688h-.437v.438h.438zm-.438-.438H.875v.438h.438zm1.313-.875V3.5h-.437v1.313h.438v1.313h.438v-1.75zm.438-3.5v1.313h-.438v.438h.438v1.313h.438V.875z" fill="#ffa5d3"/>
	<path d="M6.125 3.5h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-3.5.875h-.874v.438h.875zm-.875-.438H.438v.438h.875z" fill="#f0f0f0"/>
	<path d="M.875 5.25v-.875H.438v.875z" fill="#f0f0f0"/>
	<path d="M4.813 1.313h-.438v.438h.438z" fill="#cdbafa"/>
	<path d="M2.625 1.313h-.437v1.313h.438z" fill="#f0f0f0"/>
	<path d="M4.375.438h-.437v.438h.438zm.438.438h-.438v.438h.438zM2.625 4.814h-.437v.438h.438zm3.938 0h-.438v.438h.438zm-.875.438v.438H5.25v.438h.875v-.875zm.438.875v.438H.875v.438h5.688v-.875zM.875 6.125H.438v.438h.438zM7 3.062H5.687V3.5H7zm-5.687.876H0v.438h1.313z" fill="#000"/>
	<path d="M.438 6.125V3.938H0v2.188zm6.563-1.313V3.5h-.438v1.313zM2.625.875h-.437v.438h.438zm-.875.438v3.063h-.437v.438h.875V1.313zm3.5 2.188V1.313h-.438v3.063h.438v-.438h.438V3.5z" fill="#000"/>
	<path d="M3.938.875H3.5v.875h.438zm.438 1.75V1.75h-.438V3.5h.438v.438h.438V2.625zm.875 1.75h-.438v.438h.438zm-1.313 0H3.5v1.313h.438zm.875 1.313h-.438v.438h.438zm0-.875h-.438v.438h.438zm.438.438h-.438v.438h.438z" fill="#cdbafa"/>
	<path d="M5.25 6.125v-.438h-.438v.438H3.5v.438h2.625v-.438zm.438-.875H5.25v.438h.438zm.438-.438h-.438v.438h.438z" fill="#816bee"/>
`;function an(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${rn}
	</svg>`}var on=z`
	<path d="M4.375 1.75v-.437h-.437V.438h-.875v.875h-.438v.438h-.437v.438h.438v.438h.438v.438h.875v-.44h.438v-.437h.438V1.75z" fill="#47baff"/>
	<path d="M4.375 5.25v.438h-.437v.875h-.875v-.875h-.438V5.25h-.437v-.438h.438v-.438h.438v-.436h.875v.438h.438v.438h.438v.438z" fill="#ff2c52"/>
	<path d="M3.063 0v.438h.875V0z" fill="#000"/>
	<path d="M3.063.438v.438h.875V.438z" fill="#f0f0f0"/>
	<path d="M3.063 2.625v.438h.875v-.438z" fill="#4282d8"/>
	<path d="M3.063.438h-.438v.875h.438zM.438 3.063H0v.875h.438zm.875 0v-.438H.438v.438zm1.313-1.75h-.438v.438h.438z" fill="#000"/>
	<path d="M2.625 1.75h-.437v.438h.438zm.438-.438h-.438v.438h.438zm0 2.625v.438h.875v-.437z" fill="#f0f0f0"/>
	<path d="M3.063 6.125v.438h.875v-.438zm0-.875h-.438v.438h.438zm-.438-.438h-.437v.438h.438z" fill="#be0351"/>
	<path d="M3.063 4.375h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.938 5.688h.438V5.25h-.438zm.438-.438h.438v-.438h-.438zm-.438-.438h.438v-.438h-.438z" fill="#be0351"/>
	<path d="M3.5 1.75h-.437v.438h.438z" fill="#f0f0f0"/>
	<path d="M4.375 2.188h-.437v.438h.438zm.438-.438h-.438v.438h.438z" fill="#4282d8"/>
	<path d="M5.25 4.375h.438v-.437h.875v-.875h-.875v-.438H5.25v-.437h-.438v.438h-.438v.438h-.436v.875h.438v.438h.438v.438h.438z" fill="#C7C7C7"/>
	<path d="M6.563 3.063h-.438v.875h.438z" fill="#707070"/>
	<path d="M5.25 2.625v-.437h-.438v.438zm-.438.438v-.438h-.438v.438z" fill="#fff"/>
	<path d="M4.813 4.375v-.437h-.438v.438zm-.438-.438V3.5h-.437v.438zm1.313.438v-.437H5.25v.438zm-.438.438v-.438h-.438v.438z" fill="#707070"/>
	<path d="M1.75 4.375h-.437v-.437H.438v-.875h.875v-.438h.438v-.437h.438v.438h.438v.438h.438v.875h-.44v.438h-.437v.438H1.75z" fill="#C7C7C7"/>
	<path d="M.438 3.938h.438v-.875H.438z" fill="#fff"/>
	<path d="M2.625 3.938h.438v-.875h-.438z" fill="#707070"/>
	<path d="M2.188 2.625v-.437H1.75v.438zm-.438.438v-.438h-.437v.438zm.438.438v-.438H1.75v.438z" fill="#fff"/>
	<path d="M2.625 4.375v-.437h-.437v.438zm-.438.438v-.438H1.75v.438z" fill="#707070"/>
	<path d="M2.188 1.75H1.75v.438h.438zm.438.438h-.438v.438h.438zm.438.438h-.439v.438h.438zm.875.438h-.876v.875h.875zm.438.875h-.439v.438h.438zm.438.438h-.438v.438h.438zM1.75 2.188h-.437v.438h.438zm2.188 4.813v-.438h-.875v.438zm-.875-1.313h-.438v.875h.438zM.438 3.938v.438h.875v-.438zm2.188 1.313h-.438v.438h.438zm-.438-.438H1.75v.438h.438zm-.438-.438h-.437v.438h.438zm2.188-3.063h.438V.438h-.438zm2.625 2.625h.438v-.874h-.438zm0-.875v-.437h-.875v.438zM4.375 1.749h.438v-.436h-.438zm.438.438h.438V1.75h-.438zm-.438.438h.438v-.437h-.438zm-.437.438h.438v-.438h-.438zM2.625 4.376h.438v-.438h-.438zm-.438.438h.438v-.438h-.437z" fill="#000"/>
	<path d="M4.813 2.188h.438V1.75h-.438zm.438.438h.438v-.438h-.438zM3.938 6.564h.438v-.875h-.438zm1.75-2.625v.438h.875v-.439zm-1.313 1.75h.438v-.438h-.438zm.438-.438h.438v-.438h-.438zm.438-.438h.438v-.438h-.438z" fill="#000"/>
`;function sn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${on}
	</svg>`}var cn=z`
	<path d="M6.125 3.063v-.438h-.438v.438H4.374v-.438h-.436V1.313h.438V.875H3.063v1.75h-.438v.438H.438v.875h.438v.438h.438v-.438h1.313v.438h.438v1.313h-.44v.438h.438v.438h.875v-.438h.438v-.438h-.438V4.376h.438v-.438h1.313v.438h.438v-.438h.438v-.875z" fill="#ffb84b"/>
	<path d="M3.938 0h-.875v.438h.875zM2.625.875H1.313v.438h1.313zm-1.312.438H.875v1.313h.438zm1.75 0h-.438v1.313h.438zm1.313 0h-.438v1.313h.438zm1.75 0h-.438v1.313h.438zM5.688.875H4.375v.438h1.313zm-3.063 1.75H1.313v.438h1.313zm3.063 0H4.375v.438h1.313zM3.063.438h-.438v.438h.438z" fill="#000"/>
	<path d="M2.625 1.313h-.437v.438h.438zm-.437.437H1.75v.438h.438zm3.5-.438H5.25v.438h.438zm-.438.438h-.438v.438h.438zm.438 2.625H5.25v.438h.438zm-.438.438h-.438v.438h.438zm-2.625-.438h-.437v.438h.438zm-.438.438H1.75v.438h.438z" fill="#57595f"/>
	<path d="M4.375.438h-.437v.438h.438zM.438 3.063H0v.875h.438z" fill="#000"/>
	<path d="M2.188 1.75v.438h-.875v.438h1.313V1.75zm3.063 0v.438h-.875v.438h1.313V1.75zM2.188 4.813v.438h-.875v.438h1.313v-.875zm3.063 0v.438h-.875v.438h1.313v-.875z" fill="#35363a"/>
	<path d="M.875 3.938H.438v.438h.438zm0-1.313H.438v.438h.438zM7 3.063h-.438v.875H7z" fill="#000"/>
	<path d="M6.563 3.063h-.438v.875h.438z" fill="#ba3500"/>
	<path d="M.875 3.063H.438v.875h.438z" fill="#f0f0f0"/>
	<path d="M6.563 2.625h-.438v.438h.438zm0 1.313h-.438v.438h.438z" fill="#000"/>
	<path d="M6.125 3.938h-.438v.438h.438zm-3.062 0h-.438v.438h.438zm-1.75 0H.875v.438h.438zm3.063 0h-.438v.438h.438z" fill="#ba3500"/>
	<path d="M3.938 6.563h-.875v.438h.875zm-1.313-.875H1.313v.438h1.313zM1.312 4.375H.875v1.313h.438zm1.75 0h-.437v1.313h.438zm1.313 0h-.437v1.313h.438zm1.75 0h-.438v1.313h.438zm-.438 1.313H4.374v.438h1.313zm-3.062-1.75H1.313v.438h1.313zm3.063 0H4.375v.438h1.313z" fill="#000"/>
	<path d="M2.625 3.5H1.313v.438h1.313zm3.063 0H4.375v.438h1.313z" fill="#ba3500"/>
	<path d="M3.063 6.125h-.438v.438h.438zm1.313 0h-.438v.438h.438z" fill="#000"/>
	<path d="M3.938 6.125h-.875v.438h.875z" fill="#ba3500"/>
	<path d="M3.938.438h-.875v.438h.875zm-.875.437h-.438v.438h.438V.438Z" fill="#f0f0f0"/>
	<path d="M4.375 5.688h-.437v.438h.438z" fill="#ba3500"/>
	<path d="M2.188 1.313h-.875v.875h.438V1.75h.438zm3.063 0h-.875v.875h.438V1.75h.438zM2.188 4.376h-.875v.875h.438v-.438h.438zm3.063 0h-.875v.875h.438v-.438h.438z" fill="#d8d8d8"/>
	<path d="M3.938 2.188V1.75H3.5V.875h-.437v1.313zm0 .438H3.5v.438h-.437v.438h-.438v.438h.438v.875h.438v1.313h.438v-1.75H3.5V3.5h.875v-.437h-.437zm2.188.438h-.438v.438h.438zm-3.063-.439h-.438v.438h.438zm-1.75.438H.875v.438h.438zm.875 0H1.75v.438h.438z" fill="#fd6214"/>
`;function ln(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${cn}
	</svg>`}var un=z`
	<path d="M5.688 2.625V1.75H5.25V.438h-.438v.438h-.438v.438h-.436v.438H3.5v.438H1.313v.438H.875v.875H.438v1.75h.438v.438h.438v.438h.438v.438h3.5v-.438h.438v-.438h.438V2.625z" fill="#fd6214"/>
	<path d="M0 3.5v1.75h.438V3.5zm6.563.438v1.313h.438V3.938zm-.438-1.313v1.313h.438V2.625zm-.438-.875v.875h.438V1.75z" fill="#000"/>
	<path d="M6.125 3.938v1.313h.438V3.938zm-.438-1.313v1.313h.438V2.625zm-.438-.875v.875h.438V1.75z" fill="#ba3500"/>
	<path d="M.438 2.625V3.5h.438v-.875zm2.625-1.313h-.438v.438h.438zm.875 0H3.5v.438h.438zM3.5 1.75h-.437v.438h.438zm-2.625.438v.438h.438v-.438zM.437 5.251v.438h.438v-.438zm.438.438v.438h.438v-.438zm.438.438v.438h.438v-.438zm4.813-.875v.438h.438v-.438zm-.438.438v.438h.438V5.69zm-.438.438v.438h.438v-.438zm-3.5.438v.438h3.5v-.438zM1.313 1.75v.438h.438V1.75zm.438-.438v.438h.438v-.437zm.438-.438v.438h.438V.875zm1.75 0v.438h.438V.875zm.438-.438v.438h.438V.438zm.438-.438v.438h.438V0z" fill="#000"/>
	<path d="M4.813.438v.438h.438V.438zm-.438.438v.438h.438V.875zm-.437.437v.438h.438v-.438zM3.5 1.75v.438h.438V1.75zm-1.312-.437v.438h.438v-.438zm-.438.437v.438h.438V1.75zm.875 0v.438h.438V1.75z" fill="#f0f0f0"/>
	<path d="M2.188 1.75v.438h.438V1.75z" fill="#fd6214"/>
	<path opacity=".5" d="M4.813 1.75v.438h.438V1.75zm.438 2.188V3.5h-.438v-.875h-.438v.438h-.437v.438H2.625v-.438h-.437v.875h-.875v.875h.438v.875h.438v.438h2.625v-.438h.438v-.875h.438v-.875z" fill="#fff"/>
	<path d="M1.313 2.188v.438h.438v-.438zm-.438.437V3.5h.438v-.875zm.875.875v.438h.438V3.5z" fill="#f0f0f0"/>
	<path d="M.875 5.25v.438h.438V5.25zm.438.438v.438h.438v-.438zm3.938 0v.438h.438v-.438zm.438-.438v.438h.438V5.25zm-3.938.875v.438h3.5v-.438z" fill="#ba3500"/>
	<path d="M.438 3.5v.875h.438V3.5zm4.375.875h-.438v-.437h-1.75v.438h-.437v.875h.438v.438h1.75v-.438h.438z" fill="#f0f0f0"/>
	<path d="M5.25.438v1.313h.438V.438z" fill="#000"/>
`;function dn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${un}
	</svg>`}var fn=z`
	<path d="M6.563.875h-.438V.438H4.812v1.313h-.438V.875h-.436V.438h-.875v.438h-.438v.875h-.437V.438H.875v.438H.438v1.75h.438v.438h.875v.438h.438v.875h.438v.438h.438v.438h.875v-.438h.438v-.438h.438V3.5h.438v-.437h.875v-.438h.438z" fill="#ff7fc0"/>
	<path d="M3.938 0h-.875v.438h.875zm-1.75 0H.875v.438h1.313zm3.938 0H4.813v.438h1.313zm.438.438h-.438v.438h.438zm.438.438h-.438v1.75h.438zM4.377.438h-.439v.438h.438v.875h.438V.438zm-2.189 0v1.313h.438V.875h.438V.438zm-1.313 0H.438v.438h.438zM.438.875H0v1.75h.438zm.438 1.75H.438v.438h.438zm.875.438H.875v.438h.875zm4.375 0h-.875v.438h.875zm.438-.438h-.438v.438h.438zM5.251 3.938V3.5h-.438v.875h1.75v-.437zM1.75 3.5v.438H.438v.438h1.75V3.5zm-1.313.875H0v1.75h.438zm.438 1.75H.438v.438h.438zm5.25.438H.875v.438h5.25zm.438-.438h-.438v.438h.438zm.438-1.75h-.438v1.75h.438zm-4.376 0h-.437v.438h.438zm.438.438h-.438v.438h.438zm1.313 0h-.438v.438h.438zm.438-.438h-.438v.438h.438zm-.875.875h-.876v.438h.875z" fill="#000"/>
	<path d="M4.813 4.375v.438h-.438v.438h-.437v.438h-.875v-.438h-.438v-.438h-.437v-.438H.438v1.75h.438v.438h5.25v-.438h.438v-1.75z" fill="#6be473"/>
	<path d="M1.75 5.25h-.437v.438h.438zm-.438-.438H.875v.438h.438zM5.25 6.125v-.438h-.438v.438h-.874v-.438h-.875v.438h-.875v-.438H1.75v.438H.875v.438h5.25v-.438zm.438-.875H5.25v.438h.438zm.438-.438h-.438v.438h.438zm.438.875h-.438v.438h.438z" fill="#008456"/>
	<path d="M2.625 3.938h-.437v.438h.438zm.438.438h-.438v.438h.438zm1.313 0h-.438v.438h.438zm.438-.438h-.438v.438h.438zm.438-.875h-.438v.438h.438zm.875-.438h-.438v.438h.438zm.438-.875h-.438v.875h.438zM3.94 4.813h-.877v.438h.875z" fill="#ff1c90"/>
	<path d="M4.375 5.25h-.437v.438h.438zm.438-.438h-.438v.438h.438zm.438-.438h-.438v.438h.438zm-4.813.001v.875h.438v-.438h1.313v-.438zm.438-3.5H.438v.875h.438zM2.189.437H.875v.438h1.313zm.875.438h-.439v.438h.438zm.875-.438h-.876v.438h.875zm1.313 0h-.438v.875h.438V.875h.875V.438z" fill="#f0f0f0"/>
`;function pn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${fn}
	</svg>`}var mn=z`
	<path d="M3.063.875v.438h.875V.875zm.875-.438v.438h1.75V.438zm1.75.438v.438h.438V.875zm.438.438v.438h.438v-.438zm.438.438v2.188h.438V1.75zm-.438 2.188v.875h.438v-.876zm-.438.875v.438h.438v-.438zm-.875.438v.438h.875v-.438zm-.875.438v.438h.875V5.69zm-.875.438v.438h.875v-.438z" fill="#000"/>
	<path d="M6.563 1.75h-.438v-.437h-.438V.875H3.938v.438h-.875V.875h-1.75v.438H.875v.438H.438v2.188h.438v.875h.438v.438h.875v.438h.875v.438h.875V5.69h.875v-.438h.875v-.438h.438v-.876h.438z" fill="#ff7fc0"/>
	<path d="M6.563 1.75h-.438v2.188h.438zm-.438 2.188h-.438v.875h.438zm-4.812 0H.875v.875h.438zm4.375.875h-.875v.438h.875zm-.875.438h-.875v.438h.875zm-.875.438h-.875v.438h.875zm-.875-.438h-.875v.438h.875zm-.875-.438h-.875v.438h.875z" fill="#ff1b90"/>
	<path d="M1.313.438v.438h1.75V.438zM.875.875v.438h.438V.875zm-.437.438v.438h.438v-.438zM0 1.75v2.188h.438V1.75zm.438 2.188v.875h.438v-.875zm.438.875v.438h.438v-.438zm.438.438v.438h.875v-.438zm.875.438v.438h.875v-.438z" fill="#000"/>
	<path d="M1.313.875v.438h1.75V.875zm2.625 0v.438h1.75V.875zm-.875.438v.438h.875v-.438z" fill="#f0f0f0"/>
	<path opacity=".6" d="M4.813 2.625v-.437h-.875v.438h-.875v-.438h-.875v.438H1.75v1.313h.438v.438h.879v.438h.875v-.438h.871v-.439h.438V2.625z" fill="#fff"/>
	<path d="M5.688 1.313v.438h.438v-.438zm-4.813 0v.438h.438v-.438zm.438.438v.438h.438V1.75zM.438 1.75v.875h.438V1.75z" fill="#f0f0f0"/>
`;function hn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${mn}
	</svg>`}var gn=z`
	<path d="M6.125 2.625v.438H4.812v-.438h-.438v-.437h-.436V.875h.438V.438H.438v.438h.875v.438h.438v.438h.875v.875h-.438v.438H1.75v.875h-.437v.875H.875v.875H.438v.875h1.313v-.438h.875v-.438h.438v-.438h.438v-.438h.875v-.438h.438v-.437h.438v.438h.438v.438h.438v.438h.438V2.625z" fill="#ffe361"/>
	<path d="M6.125 0H4.812v.438h1.313zM1.75 6.563H.438v.438h1.313zm.875-.438H1.75v.438h.875zM1.313.875H.438v.438h.875zm.438.875v.438h.438v.438h.438V1.75zm0 1.313h-.438v.875h.438zm-.438.875H.875v.875h.438zm-.438.875H.438v.875h.438zm-.438.875H0v.875h.438zm3.938-.875H3.5v.438h.875zm0-4.813H.438v.438h3.938z" fill="#000"/>
	<path d="M4.375.438H.438v.438h3.938z" fill="#f0f0f0"/>
	<path d="M6.125 2.625H4.812v.438h1.313zM4.812.437h-.438v.438h.438z" fill="#000"/>
	<path d="M4.813.875h-.438v.875h.438zM6.126.437H4.813v.438h1.313z" fill="#f0f0f0"/>
	<path d="M6.125 2.188H4.812v.438h1.313z" fill="#ba3500"/>
	<path d="M.438.438H0v.438h.438zm1.313.875h-.438v.438h.438zm.438 1.313H1.75v.438h.438zM6.564.438h-.438v.438h.438zm.438.438h-.438v1.313h.438z" fill="#000"/>
	<path d="M6.563.875h-.438v1.313h.438z" fill="#ba3500"/>
	<path d="M7 2.625h-.438V5.25H7z" fill="#000"/>
	<path d="M6.563 2.625h-.438V5.25h.438z" fill="#ffb84b"/>
	<path d="M6.563 2.188h-.438v.438h.438zM4.375.875h-.437v1.313h.438zm.438 1.313h-.438v.438h.438z" fill="#000"/>
	<path d="M4.813 1.75h-.438v.438h.438z" fill="#ba3500"/>
	<path d="M3.063 5.688h-.438v.438h.438z" fill="#000"/>
	<path d="M4.375 3.063v.438h-.437v.438H3.5v.438h-.437v.438h-.438v.438h-.437v.438H1.75v.438h.875v-.438h.438v-.438h.438v-.438h.875v-.438h.438V3.063zM1.75 6.126h-.437v.438h.438z" fill="#ffb84b"/>
	<path d="M3.5 5.25h-.437v.438h.438z" fill="#000"/>
	<path d="M2.188 3.063H1.75v.438h.438zm.438-.438h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.063 2.188h-.438v.438h.438zm.438-.438h-.438v.438h.438z" fill="#ffb84b"/>
	<path d="M2.625 3.5h-.437v.438h.438zm-.875.438h-.437v.438h.438zm-.438.875H.875v.438h.438zm-.438.875H.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M4.813 4.375h-.438v.438h.438zm.438-.438h-.438v.438h.438zm.438.438h-.438v.438h.438zm.438.438h-.438v.438h.438zm.438.438h-.438v.438h.438z" fill="#000"/>
	<path d="M6.125.875H4.812v1.313h1.313z" fill="#fd6214"/>
`;function _n(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${gn}
	</svg>`}var vn=z`
	<path d="M6.563 0.876V0.437H3.937v0.437H1.313v2.187H0.437v2.187h5.25v-2.186h0.876z" fill="#bcef42"/>
	<path d="M4.813 5.687v-0.437H2.187v0.437z" fill="#7fb134"/>
	<path d="M6.563 0.876V0.437H3.937v0.437zm-2.626 0.437V0.876H2.187v0.437z" fill="#fff"/>
	<path d="M1.313 4.813v0.437h0.876v-0.437zm4.376 -0.437h-0.437v0.876h0.437zm0.876 -2.187h-0.437v0.876h0.437zm-0.437 0.876h-0.437v1.313h0.437z" fill="#7fb134"/>
	<path d="M7 0.437h-0.437v2.626H7z" fill="#000"/>
	<path d="M1.313 3.937H0.876v2.626h0.437z" fill="#4a8359"/>
	<path d="M6.563 0H3.937v0.437h2.626zM4.813 5.687H2.187v0.437h2.626zM3.937 0.437H2.187v0.437h1.75zM2.187 0.876h-0.874v0.437h0.876zm-0.874 0.437H0.876v0.876h0.437zM0.437 3.063H0v2.187h0.437v1.313h0.437V5.25H0.437zh0.437v-0.876H0.437zm5.25 2.187h-0.876v0.437h0.876zm0.437 -0.876h-0.437v0.876h0.437zh0.437V3.063h-0.437zM1.75 5.687h0.437v-0.437h-0.874v1.313h0.437zm-0.437 0.876H0.876V7h0.437z" fill="#000"/>
	<path d="M0.876 3.063h0.437v-0.876H0.876zm-0.438 0.874h0.437v-0.874H0.437zm1.75 -2.626h-0.874v0.876h0.437v-0.437h0.437z" fill="#fff"/>
	<path d="M1.75 3.5h0.876v-0.437h-0.876zm0.876 -0.437h0.876v-0.437h-0.876zm0.876 -0.437h0.876v-0.438H3.5zm0.876 -0.437h0.437v-0.438h-0.437zm0.437 -0.437h0.437v-0.438H4.814z" fill="#4a8359"/>
	<path d="M2.187 1.75v0.437h0.437v-0.437z" fill="#fff"/>
	<path d="M1.313 3.5v0.437h0.437V3.5z" fill="#4a8359"/>
`;function yn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${vn}
	</svg>`}var bn=z`
	<path d="M2.188 2.625H1.75v.438H.875v.875H3.5v.875h-.437v.438h-.438v.438h-.437v.438H1.75v.438h.875v-.438h.438v-.438h.438v-.438h.438v-.438h.875v-.438h.438v-.437h.875v-.875H3.063v-.438h.438v-.437h.438V1.75h.438v-.437H3.5v.438h-.437v.438h-.875z" fill="#ffe361"/>
	<path d="M.438 3.063H0v.875h.438z" fill="#000"/>
	<path d="M.875 3.063H.438v.875h.438z" fill="#f0f0f0"/>
	<path d="M7 3.063h-.438v.875H7zm-5.687-.438H.438v.438h.875zm1.313-.875H1.75v.438h.875zm-.876.438h-.437v.438h.438z" fill="#000"/>
	<path d="M1.75 2.625h-.437v.438h.438zm.438-.438H1.75v.438h.438zm.438.438h-.438v.438h.438zm.438-.875h-.439v.438h.438zm.438-.438h-.439v.438h.438zm0 3.063h-.439v.438h.438zm-.438.438h-.439v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438H1.75v.438h.438zm-.438.438h-.437v.438h.438z" fill="#f0f0f0"/>
	<path d="M5.25.875h-.438v.438h.438zm.438 3.063H5.25v.438h.438zm-.438.438h-.438v.438h.438zm-.875.438h-.437v.438h.438zm-.438.438H3.5v.438h.438zm2.625-1.75h-.438v.438h.438z" fill="#ffb84b"/>
	<path d="M6.563 3.063h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M4.813 1.313h-.438v.438h.438zm-.438.438h-.437v.438h.438zm-.437.437H3.5v.438h.438zm-.438.437h-.437v.438h.438z" fill="#ffb84b"/>
	<path d="M4.375.875h-.437v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.938.875h-.875v.438h.875zm-.875.438h-.438v.438h.438zM5.688 0H4.375v.438h1.313z" fill="#000"/>
	<path d="M5.688.438H4.375v.438h1.313z" fill="#f0f0f0"/>
	<path d="M6.563 2.625H3.5v.438h3.063zM4.375.437h-.437v.438h.438zm1.75 0h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.435v.438h.438zm2.188 1.75h-.875v.438h.875zm-1.313.875h-.875v.438h.875zm.438-.438h-.438v.438h.438zm-1.75 1.313h-.873v.438h.875zm.438-.438h-.436v.438h.438zm-1.75 1.313H1.313v.438h1.313zm.875-2.625H.438v.438h3.063zm-.438 2.188h-.436v.438h.438zm-1.75 0H.875v.438h.438zm.438-.438h-.436v.438h.438zm.438-.438H1.75v.438h.438zm.438-.438h-.437v.438h.438zm.438-.438h-.438v.438h.438z" fill="#000"/>
	<path d="M4.813.875h-.438v.438h.438z" fill="#ffe361"/>
`;function xn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${bn}
	</svg>`}var Sn=z`
	<path d="M6.125 1.75v-.437H5.25V.438H3.5v.438h-.437v.438h-.438V.875H1.313v.438H.875v1.75H.438v1.313h.438v-.438h.438V3.5h2.188v-.875h.438v-.437h2.188v.438h.438V1.75z" fill="#b79cf8"/>
	<path d="M3.938 2.625v.438H3.5v.875h.438v.875h.875v.438h1.313v-.438h.438V2.625z" fill="#9af4dc"/>
	<path d="M1.75 4.375v1.75h.438v.438h1.313v-.438h.438v-1.75z" fill="#9af4dc"/>
	<path d="M3.5 6.125H2.188v.438h1.313zm2.625-1.313H4.812v.438h1.313zm.438-.438h-.438v.438h.438zM3.938 5.687H3.5v.438h.438z" fill="#6c9ca6"/>
	<path d="M3.938 3.063H3.5v.438h.438zm.875.438h-.438v.438h.438zm1.313-.875H3.938v.438h2.188z" fill="#f0f0f0"/>
	<path d="M3.5.438h-.437v.438h.438zm3.063.875h-.438v.438h.438zm-.438 2.188h-.438v.875h.438zm-2.187-.876H3.5v.438h.438z" fill="#000"/>
	<path d="M3.938 2.188H3.5v.438h.438z" fill="#816bee"/>
	<path d="M1.313 3.938H.875v.438h.438zm1.75 1.75h-.438v.438h.438zm-.438-.438h-.437v.438h.438z" fill="#000"/>
	<path d="M2.625 5.25h-.437v.438h.438zm3.063-.875H5.25v.438h.438zm-.438-.438h-.438v.438h.438zM2.187 6.125H1.75v.438h.438zm1.75 0H3.5v.438h.438zM.874 4.375H.438v.438h.438zm.438 1.75H.875v.438h.438zm-.438.438H.438v.438h.438zM6.563 1.75v.875h-.438v.438h.438v1.75h.438V1.75zM5.688.875V.438H5.25v.875h.875V.875zM2.625.438H1.313v.438h1.313zm3.063 2.625H4.375v.438h1.313zM3.063 4.376H1.75v.438h1.313zm.438 2.188H2.188v.438h1.313zM3.063.875h-.438v.438h.438zm-1.75 0H.875v.438h.438z" fill="#000"/>
	<path d="M2.625.875H1.313v.438h1.313zm.438.438h-.438v.438h.438zm-1.313.875h-.437v.438h.438zm-.875.875H.438v.438h.438zm.438-1.75H.875v.438h.438z" fill="#f0f0f0"/>
	<path d="M6.125 5.25H4.812v.438h1.313zm-1.75-.438V3.5h-.437v.438H3.5v.438h.438v1.75h.438v-.875h.438v-.438zm2.188 0h-.438v.438h.438zM.875 1.313H.438v1.75h.438zm-.437 1.75H0v1.313h.438zm1.313 1.75h-.438v1.313h.438zm1.75 0h-.438v.875h.438zm-3.063 0H0v1.75h.438zM5.25 0H3.5v.438h1.75z" fill="#000"/>
	<path d="M3.5.875h-.437v.438h.438zM5.25.437H3.5v.438h1.75z" fill="#f0f0f0"/>
	<path d="M6.125 2.188H3.938v.438h2.188z" fill="#000"/>
	<path d="M6.125 1.75v-.437h-.438v.438H3.938v.438h2.188v.438h.438V1.75z" fill="#816bee"/>
	<path d="M2.188 4.813H1.75v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.063 2.625v.438h-1.75v.438h2.188v-.876z" fill="#816bee"/>
	<path d="M3.063 3.063v.438h-1.75v.438h2.188v-.876z" fill="#000"/>
	<path d="M1.313 3.5H.875v.438h.438zm-.438.438H.438v.438h.438z" fill="#816bee"/>
	<path d="M1.313 3.938v.438H.875v.438H.438v1.75h.438v-.438h.438V4.813h.438v-.438h1.75v-.437z" fill="#9af4dc"/>
	<path d="M1.313 4.375H.875v.438h.438zm-.438.438H.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M1.313 5.688H.875v.438h.438zm-.438.438H.438v.438h.438z" fill="#6c9ca6"/>
	<path d="M3.5 3.938H1.313v.438h2.188z" fill="#f0f0f0"/>
`;function Cn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Sn}
	</svg>`}var wn=z`
	<path d="M6.125 2.188v-.875h-.438V.875h-.438V.438h-.875v.438h.438v.438h.438v1.75h-.438v.438h-.438v.438H2.625V3.5h-.437v-.437H1.75v-1.75h.438V.875h.438V.438H1.75v.438h-.437v.438H.875v.875H.438v2.625h.438v.875h.438v.438h.875v.438h2.625v-.438h.875v-.438h.438v-.875h.438V2.188z" fill="#b79cf8"/>
	<path d="M2.625 0H1.75v.438h.875zM.875 1.313H.438v.875h.438zm1.313 0H1.75v1.75h.438zm2.188 2.188H2.625v.438h1.75z" fill="#000"/>
	<path d="M4.375 3.938h-1.75v.438h1.75z" fill="#f0f0f0"/>
	<path d="M.438 2.188H0v2.625h.438zm4.375 4.375H2.188v.438h2.625z" fill="#000"/>
	<path d="M.875 4.375H.438v.438h.438zm4.813.875h-.875v.438H2.188V5.25h-.875v-.438H.875v.875h.438v.438h.875v.438h2.625v-.438h.875v-.438h.438v-.875h-.438zm.875-.875h-.438v.438h.438z" fill="#816bee"/>
	<path d="M1.75.438h-.437v.438h.438zm-.437.437H.875v.438h.438z" fill="#000"/>
	<path d="M2.625.438H1.75v.438h.875zM1.75.875h-.437v.438h.438zm-.437.438H.875v.438h.438zm-.438.875H.438v.438h.438zm.438.438H.875v.438h.438zm.875.438H1.75v.438h.438zm.438.438h-.438v.438h.438zm2.625-.438h-.438v.438h.438zM4.813.439h-.438v.438h.438zm0 3.063h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.063.438h-.438v.438h.438zm-.438.437h-.437v.438h.438zm0 2.188h-.437v.438h.438zm-1.75 1.75H.438v.875h.438zm.438.875H.875v.438h.438zM5.251 0h-.875v.438h.875zm.438 6.125h-.875v.438h.875zm-3.5 0h-.876v.438h.875zm4.374-4.812h-.438v.875h.438zm-1.313 0h-.438v1.75h.438zM7 2.188h-.438v2.625H7zM5.687.438h-.438v.438h.438zm.438.438h-.438v.438h.438zM4.375.438h-.437v.438h.438zm.438.438h-.438v.438h.438zm0 2.188h-.438v.438h.438zm1.75 1.75h-.438v.875h.438zm-.438.875h-.438v.438h.438z" fill="#000"/>
	<path d="M2.188.875H1.75v.438h.438z" fill="#b79cf8"/>
`;function Tn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${wn}
	</svg>`}var En=z`
	<path d="M4.813 5.25v-.875h-.438v-.437h-1.75v.438h-.437v.875H1.75v1.313h3.5V5.251z" fill="#ffe361"/>
	<path d="M6.125 1.313V.875H5.25V.438h-3.5v.438H.875v.438H.438v2.625h.438v.438h.875v-.439h3.5v.438h.875v-.438h.438V1.313z" fill="#ff2c52"/>
	<path d="M5.25 0h-3.5v.438h3.5z" fill="#000"/>
	<path d="M5.25.438h-3.5v.438h3.5zm-3.5.437H.875v.438h.875zm4.375 0H5.25v.438h.875z" fill="#fff"/>
	<path d="M5.25 6.563h-3.5v.438h3.5zM.438 1.313H0v2.625h.438zM1.751.438H.875v.438h.875z" fill="#000"/>
	<path d="M.875 3.063v-1.75H.438v2.625h.875v-.875z" fill="#fff"/>
	<path d="M6.563 1.313h-.438v2.625h.438z" fill="#be0351"/>
	<path d="M6.563 2.625h-.875V3.5h.875zM5.25.875h-.875v.875h.875z" fill="#fff"/>
	<path opacity=".5" d="M6.563 2.625h-.438V3.5h.438z" fill="#be0351"/>
	<path d="M4.375 3.063h-1.75v.438h1.75zm.875.438h-.875v.438h.875zM2.625 3.5H1.75v.438h.875z" fill="#be0351"/>
	<path d="M2.625 4.375h-.437v.875h.438z" fill="#fff"/>
	<path d="M4.813 4.375h-.438v.875h.438zm0 .875v.875H1.75v.438h3.5V5.25z" fill="#ffb84b"/>
	<path d="M2.188 5.25H1.75v.875h.438z" fill="#fff"/>
	<path d="M1.75 3.938H.875v.438h.875zm4.375 0H5.25v.438h.875z" fill="#be0351"/>
	<path d="M3.5 2.625h-.875V3.5H3.5z" fill="#fff"/>
	<path opacity=".5" d="M3.5 3.063h-.875v.438H3.5z" fill="#be0351"/>
	<path d="M4.375 3.5h-1.75v.438h1.75z" fill="#000"/>
	<path d="M4.375 3.938h-1.75v.438h1.75z" fill="#fff"/>
	<path d="M.875.875H.438v.438h.438z" fill="#000"/>
	<path d="M2.188 1.313H1.75v.438h.438z" fill="#fff"/>
	<path d="M1.75 5.25h-.437v1.313h.438zm.438-.875h.438v-.437H1.75v.438H.875v.438h.875v.438h.438zM.875 3.938H.438v.438h.438zM7 1.313h-.438v2.625H7zM6.125.438H5.25v.438h.875zm.438.438h-.438v.438h.438zm-.438 3.5H5.25v-.438h-.875v.438h.438v.875h.438v1.313h.438V5.251h-.438v-.438h.875zh.438v-.438h-.438z" fill="#000"/>
`;function Dn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${En}
	</svg>`}var On=z`
	<path d="M6.125 3.063v-.438H5.25v-.437h-.438V1.75h-.438V.875h-.436V.438h-.875v.438h-.438v.875h-.437v.438H1.75v.438H.875v.438H.438v.875h.438v.438h.875v.438h.438v.438h.438v.875h.438v.438h.875v-.438h.438v-.875h.438v-.438h.438v-.438h.875v-.44h.438v-.875z" fill="#47baff"/>
	<path d="M4.813 3.063h-.875v-.438h-.875v.438h-.875v.875h.875v.438h.875v-.438h.875z" fill="#b5e3ff"/>
	<path d="M1.313 0H.438v.438h.875zm.875.438h-.875v.438h.875zm-.438 1.75H.875v.438h.875zM.438.438H0v.875h.438z" fill="#000"/>
	<path d="M1.313.438H.438v.875h.438V.875h.438z" fill="#f0f0f0"/>
	<path d="M.438 3.063H0v.875h.438zM7.001.438h-.438v.875h.438zm-.438.875h-.438v.875h.438zm-5.688 0H.438v.875h.438zm1.75-.438h-.437v.875h.438zm2.188 0h-.438v.875h.438zM3.063.438h-.438v.438h.438z" fill="#000"/>
	<path d="M3.063.875h-.438v.438h.438zm.438.438h-.438v.438h.438zm-1.313.875H1.75v.438h.438zm-.875.437H.875v.438h.438zm-.438.438H.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M1.313 6.563v-.438h.875V5.25H1.75v-.438H.875v.875H.438v.875z" fill="#b79cf8"/>
	<path d="M.875 5.688H.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M2.188 1.75H1.75v.438h.438z" fill="#000"/>
	<path d="M2.188.875H.875v1.313h.875V1.75h.438zm3.938 1.313V.875H4.813v.875h.438v.438z" fill="#b79cf8"/>
	<path d="M2.188.875H1.75v.875h.438zm-.438.875h-.437v.438h.438zm4.375-.438h-.438v.875h.438zm.438-.438h-.438v.438h.438z" fill="#816bee"/>
	<path d="M5.688 6.563v-.438h-.875V5.25h.438v-.438h.875v.875h.438v.875z" fill="#b79cf8"/>
	<path d="M6.563 5.688h-.438v.438h.438zm-.438-.875h-.438v.438h.438z" fill="#816bee"/>
	<path d="M.875 2.625H.438v.438h.438zM7 3.063h-.438v.875H7zm-.438-.438h-.438v.438h.438zM4.374.437h-.436v.438h.438zm.875 1.313h-.438v.438h.438zM3.938 0h-.875v.438h.875z" fill="#000"/>
	<path d="M3.938.438h-.875v.438h.875zm0 2.625h-.875v.875h.875zM6.563.438h-.875v.438h.875zm-.875.438h-.875v.438h.875z" fill="#f0f0f0"/>
	<path d="M3.938 2.188h-.875v.438h.875zm0 2.188h-.875v.438h.875zM6.563.001h-.875v.438h.875zm-.875.438h-.875v.438h.875zm.438 1.75h-.875v.438h.875zM1.313 6.563H.438v.438h.875zm.875-.438h-.875v.438h.875zm-.438-1.75H.875v.438h.875zM.437 5.688H0v.875h.438zm6.563 0h-.438v.875H7zm-.438-.875h-.438v.875h.438zm-5.687 0H.438v.875h.438zm1.75.438h-.437v.875h.438zm2.188 0h-.438v.875h.438zm-1.75.875h-.438v.438h.438zm-.875-1.313H1.75v.438h.438z" fill="#000"/>
	<path d="M2.188 5.25H1.75v.875h.438zm-.438-.438h-.437v.438h.438z" fill="#816bee"/>
	<path d="M.875 3.938H.438v.438h.438zm1.313-.875H1.75v.875h.438zm.875-.438h-.875v.438h.875zm0 1.313h-.875v.438h.875zm2.188-.875h-.438v.875h.438zm-.438-.438h-.875v.438h.875zm0 1.313h-.875v.438h.875zm1.75 0h-.438v.438h.438z" fill="#000"/>
	<path d="M6.563 3.063h-.438v.875h.438zm-.438-.438h-.438v.438h.438zm0 1.313h-.438v.438h.438zm-.875 0h-.438v.438h.438zm-1.313.875h-.874v.438h.875zm.438-.438h-.437v.438h.438zm-1.313 0h-.437v.438h.438zm.875 1.75h-.874v.438h.875zm.438-.438h-.437v.438h.438zm-1.313 0h-.437v.438h.438zm-.874-1.749H1.75v.438h.438zM.875 3.5H.438v.438h.438zm.438.438H.875v.438h.438z" fill="#4282d8"/>
	<path d="M4.375 6.125h-.437v.438h.438zm.875-1.313h-.438v.438h.438zm-1.313 1.75h-.874V7h.875zm2.625 0h-.875V7h.875zm-.875-.438h-.875v.438h.875zm.438-1.75H5.25v.438h.875z" fill="#000"/>
`;function kn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${On}
	</svg>`}var An=z`
	<path d="M3.938.438h-.875v1.75h.875zm.875 2.625v-.438h-.438v-.437h-1.75v.438h-.437v.438H.438v.875h1.75v.438h.438v.438h.438v1.75h.875v-1.75h.438v-.438h.438v-.439h1.75v-.875z" fill="#bcef42"/>
	<path d="M1.75 0h-.437v.438h.438zm.875 2.188h-.437v.438h.438zm2.188 0h-.438v.438h.438zM5.688 0H5.25v.438h.438zm.438.438h-.438v.438h.438zm.438.438h-.438v.438h.438zm.438.438h-.438v.438h.438zM3.938 0h-.875v.438h.875z" fill="#000"/>
	<path d="M3.938.438h-.875v.438h.875z" fill="#f0f0f0"/>
	<path d="M3.938 1.313h-.875v.438h.875zm0 .438h-.875v.438h.875z" fill="#7fb134"/>
	<path d="M3.938 5.25h-.875v.438h.875z" fill="#f0f0f0"/>
	<path d="M3.938 6.125h-.875v.438h.875zm0-1.313h-.875v.438h.875z" fill="#7fb134"/>
	<path d="M3.938 2.625h-.875v.438h.875zm0 1.313h-.875v.438h.875zm.438-.875h-.438v.875h.438z" fill="#000"/>
	<path d="M5.25 3.063h-.438v.875h.438z" fill="#7fb134"/>
	<path d="M3.063 3.063h-.438v.875h.438z" fill="#000"/>
	<path d="M2.625 2.625h-.437V3.5h.438z" fill="#f0f0f0"/>
	<path d="M1.313.438H.875v.438h.438z" fill="#000"/>
	<path d="M1.313.438v.438H.875v.438H.438v.438h1.313V.438z" fill="#6be473"/>
	<path d="M1.75.438h-.437v.438h.438zm-.437.437H.875v.438h.438z" fill="#f0f0f0"/>
	<path d="M1.75 1.313H.438v.438h1.313z" fill="#008456"/>
	<path d="M5.25 5.25v1.313h.438v-.438h.438v-.438h.438v-.438zm-4.812 0v.438h.438v.438h.438v.438h.438V5.251z" fill="#6be473"/>
	<path d="M1.75 5.25H.438v.438h1.313z" fill="#f0f0f0"/>
	<path d="M1.313 5.688v.875h.438v-.875z" fill="#008456"/>
	<path d="M6.125 1.313V.875h-.438V.438h-.438v1.313h1.313v-.438z" fill="#6be473"/>
	<path d="M5.688.438H5.25v.438h.438zm0 2.625H5.25v.438h.438z" fill="#f0f0f0"/>
	<path d="M6.563 3.5H5.25v.438h1.313z" fill="#7fb134"/>
	<path d="M6.563 1.313H5.25v.438h1.313z" fill="#008456"/>
	<path d="M.875.875H.438v.438h.438zM3.063.437h-.438v1.75h.438zm1.313 0h-.438v1.75h.438zm2.625 2.625h-.438v.875h.438zm-.438-.438h-1.75v.438h1.75zm0 1.313h-1.75v.438h1.75zM.438 3.063H0v.875h.438zm1.75-.438H.438v.438h1.75z" fill="#000"/>
	<path d="M1.75 3.063H.438v.875h.438V3.5h.875z" fill="#f0f0f0"/>
	<path d="M2.188 3.938H.438v.438h1.75zM.438 1.313H0v.438h.438zm1.313 5.25h-.438v.438h.438zm.875-2.188h-.438v.438h.438z" fill="#000"/>
	<path d="M1.75 3.5h-.437v.438h.438zm.438-.438H1.75v.875h.438z" fill="#7fb134"/>
	<path d="M2.188 3.063H1.75v.875h.438z" fill="#3f581a"/>
	<path d="M4.375 4.375h-1.75v.438h1.75z" fill="#7fb134"/>
	<path d="M4.375 2.188h-1.75v.438h1.75z" fill="#f0f0f0"/>
	<path d="M4.813 4.375h-.438v.438h.438z" fill="#000"/>
	<path d="M4.813 3.938h-.438v.438h.438z" fill="#7fb134"/>
	<path d="M5.688 6.563H5.25v.438h.438zm.438-.438h-.438v.438h.438zm.438-.438h-.438v.438h.438zm.438-.438h-.438v.438h.438zM3.939 6.562h-.876V7h.875zm-2.625-.438H.875v.438h.438zm-.438-.438H.438v.438h.438zm2.188-.875h-.439v1.75h.438zm1.313 0h-.439v1.75h.438zM1.75 1.75H.438v.438h1.75V.438H1.75zm3.5 0V.438h-.438v1.75h1.75V1.75z" fill="#000"/>
	<path d="M.438 4.813v.438h1.313v1.313h.438v-1.75zm4.375 0v1.75h.438V5.25h1.313v-.438zM.438 5.25H0v.438h.438z" fill="#000"/>
	<path d="M5.688 6.125H5.25v.438h.438zm.438-.438h-.438v.438h.438zm.438-.438h-.438v.438h.438z" fill="#008456"/>
	<path d="M5.688 5.25H5.25v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.938 3.063h-.875v.875h.875z" fill="#7fb134"/>
	<path d="M3.938 1.75h-.875v.438h.875zm0 3.063h-.875v.438h.875zm1.313-1.75h-.438v.875h.438z" fill="#3f581a"/>
`;function jn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${An}
	</svg>`}var Mn=z`
	<path d="M4.813 4.375h.438v-.437h1.313V3.5H5.251v-.437h-.438V1.75h.875v-.437H4.375v.438H3.063v-.438h-.438V.875H1.75v.438h-.437v.438H.875v.438H.438v2.625h.438v.438h.438v.438h.438v-.875h1.75v.438h-.439v.438h.438v.438h.875v-.438h1.313v-.438h-.875z" fill="#54cfff"/>
	<path d="M3.938 4.813H3.5v.438h.438zm1.75.438H5.25v.438h.438zm.875-1.75h-.438v.438h.438zM5.25 3.063h-.438v.438h.438zM1.312 4.376H.875v.438h.438zm.438.438h-.437v.875h.438zm2.625.875H3.063v.438h1.313zm0-1.313h-.437v.438h.438z" fill="#4282D8"/>
	<path d="M3.938 0H3.5v.438h.438zm.438.438h-.438v.438h.438zm-.876 0H1.75v.438H3.5zM1.75.875h-.437v.438h.438zm1.313 0h-.438v.438h.438zm.438.438h-.438v.438h.438zm.875 0h-.438v.438h.438zM5.689.875H4.376v.438h1.313zm.438.438h-.438v.438h.438zm-4.814 0H.875v.438h.438zm-.438.437H.438v.438h.438zm-.437.438H0v2.625h.438zm.875.438H.875v1.75h.438zm.438-.438h-.438v.438h.438zm2.188-.438H1.75v.438h2.188z" fill="#000"/>
	<path d="M3.938 1.75H3.5v.875h.438zm1.75 0h-.875v.438h.875z" fill="#000"/>
	<path d="M5.25 1.75h-.438v1.313h.438zm1.313 1.313H5.25v.438h1.313zm.438.438h-.438v.438h.438zm-2.625-.875h-.438v1.75h.438zm2.188 1.313H5.251v.438h1.313zm-1.313.438h-.438v.875h.438z" fill="#000"/>
	<path d="M5.688 4.813h-.875v.438h.875zm.438.438h-.438v.438h.438zm-.438.438H4.375v.438h1.313zm-1.313.438h-1.75v.438h1.75zM3.5 4.814H1.75v.438H3.5zm-.875 1.75h-.437v.438h.438zm-.438-.438H1.75v.438h.438zm-.438-.438h-.436v.438h.438zm.438-.438H1.75v.438h.438zm.875 0h-.437v.438h.438zm-1.75 0H.875v.438h.438zm-.438-.438H.438v.438h.438zm.875-.438h-.436v.438h.438zm2.188 0H3.5v.438h.438z" fill="#000"/>
	<path d="M3.938 2.625H3.5v-.437H1.75v.438h-.437v1.75h.438v.438h1.75v-.438h.438z" fill="#9af4dc"/>
	<path d="M3.5 4.375H1.75v.438H3.5zm-1.75-.437h-.437v.438h.438zm2.188 0H3.5v.438h.438z" fill="#6c9ca6"/>
	<path d="M1.75 2.625h-.437v.438h.438zm.875.438h-.437v.438h.438zm.875-.875H1.75v.438H3.5z" fill="#f0f0f0"/>
	<path d="M3.5 5.688h-.437v.438h.438z" fill="#000"/>
	<path d="M.875 2.188H.438v.875h.438zm.875-.875h-.437v.438h.438zm.875-.438H1.75v.438h.875zm3.063.438H4.375v.438h1.313zM3.938.438H3.5v.438h-.437v.438h.438v.438h.438v-.439h.438V.875h-.439zM2.625 5.25h-.437v.438H1.75v.438h.438v.438h.438v-.438h.438v-.438h-.439z" fill="#f0f0f0"/>
`;function Nn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Mn}
	</svg>`}var Pn=z`
	<path d="M5.688 1.313V.875h-.875v.438h-.438V.875h-.437V.438h-.875v.438h-.438v.438h-.437V.875h-.875v.438H.875v1.75h.875v.438h.438v-.438h2.625v.438h.438v-.438h.875v-1.75z" fill="#d1cdd5"/>
	<path d="M6.125 3.938V3.5h-1.75v-.437h-1.75v.438H.875v.438H.438v1.313h.438v.438h1.75v.438h.438v.438h.875v-.438h.438V5.69h1.75v-.438h.438V3.938z" fill="#57595f"/>
	<path d="M3.938 0h-.875v.438h.875zm-.875.438h-.438v.438h.438zm1.313 0h-.438v.438h.438zm1.313 0h-.875v.438h.875zm.438.438h-.438v.438h.438zm-1.313 0h-.438v.438h.438zM2.625.875h-.437v.438h.438zM2.188.438h-.875v.438h.875zm-1.313.875H.438v1.75h.438zm.438-.438H.875v.438h.438zM.875 3.5H.438v.438h.438zm-.437.438H0v1.313h.438zm.438 1.313H.438v.438h.438zm1.75.438H.875v.438h1.75zm.438.438h-.439v.438h.438zm.875.438h-.876v.438h.875zm.438-.438h-.439v.438h.438zm1.75-.438h-1.75v.438h1.75zm.438-.438h-.438v.438h.438zm.438-1.313h-.438v1.313h.438zM6.565 3.5h-.438v.438h.438zm0-2.188h-.438v1.75h.438zM2.188 3.5H1.75v.438h.438zm.438-.438h-.438V3.5h.438zm1.75-.438H2.625v.438h1.75zm.438.438h-.438V3.5h.438zm.438.438h-.438v.438h.438zm.438-.438h-.438V3.5h.875v-.437zm-4.377.001H.875v.438h.875v-.438z" fill="#000"/>
	<path d="M.875 4.813H.438v.438h.438zm.438.438H.875v.438h.438zm1.75.438h-.438v.438h.438zm1.313 0h-.438v.438h.438zm-.438.438h-.875v.438h.875zm2.188-.875h-.438v.438h.438zm.438-1.313h-.438v1.313h.438z" fill="#35363a"/>
	<path d="M1.313 2.625H.875v.438h.438zm.875.438H1.75v.438h.438zm3.063 0h-.438v.438h.438zm-2.626-.438h-.437v.438h.438zm2.188 0h-.438v.438h.438z" fill="#847d8b"/>
	<path d="M5.25 3.063h-.438v.438h.438zm-.875-.875h-1.75v.438h1.75zm1.75-.438h-.438v1.313h.438z" fill="#847d8b"/>
	<path d="M1.75 1.75h-.437v.438h.438zm-.437-.437H.875v.438h.438zm.875-.438h-.875v.438h.875zm.875 0h-.438v.438h.438zm.875-.438h-.875v.438h.875zm.438.438h-.438v.438h.438zm1.313 0h-.875v.438h.875zm.438.438h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M.875 3.938H.438v.438h.438zm.438-.438H.875v.438h.438zm1.313 0h-.438v.438h.438zm1.75-.438H2.625V3.5h1.75zm.875.875h-.438v.438h.438zm.875-.438h-.875v.438h.875z" fill="#d8d8d8"/>
`;function Fn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Pn}
	</svg>`}var In=z`
	<path d="M6.125 1.75v-.437h-.438V.875h-.438V.438H2.625v.438H1.75v.438h-.437v.438H.875v.875H.438v2.188h.438v.438h.438v.438h.438v.438h.438v.438h2.188v-.438h.875v-.438h.438v-.438h.438v-.875h.438V1.75z" fill="#bcef42"/>
	<path d="M6.563.438h-.875v.438h.875z" fill="#f0f0f0"/>
	<path d="M1.313 5.688H.438v.438h.875z" fill="#bcef42"/>
	<path d="M1.75 6.125H.438v.438h1.313z" fill="#7fb134"/>
	<path d="M6.563 3.5h-.438v.875h.438z" fill="#816bee"/>
	<path d="M5.25.438H2.625v.438H5.25z" fill="#f0f0f0"/>
	<path d="M5.25.875H2.625v.438H5.25z" fill="#b79cf8"/>
	<path d="M4.375 6.125H2.188v.438h2.188z" fill="#816bee"/>
	<path d="M6.563.875h-.438v.438h.438z" fill="#bcef42"/>
	<path d="M2.625 2.188h-.437v.438h.438zM1.313 1.75H.875v.438h.438zm.438-.438h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M2.625 1.313h-.437v.438h.438zm3.063 0H5.25v.438h.438z" fill="#b79cf8"/>
	<path d="M2.188.875H1.75v.438h.438zm.875 1.75h-.438v.438h.438zM.875 5.25H.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M6.125 4.813h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438z" fill="#816bee"/>
	<path d="M6.563.438v.875h-.438V.875h-.438v.438h.438v.438h.438v2.625h.438V.438zm-5.25.875H.875v.438h.438zm.438-.438h.875V.438H1.75zh-.438v.438h.438zm4.813 3.5h-.438v.875h.438zM.875 1.75H.438v.875h.438zM5.25 6.125h-.875v.438h.875zm.875-.875h-.438v.438h.438zm-4.812 0H.875v.438h.438zm.438.438h-.438v.438h.438zm-.875-.875H.438v.438h.438zm4.813.875h-.438v.438h.438zM.438 2.625H0v3.938h.438z" fill="#000"/>
	<path d="M5.25.875h.438V.438h.875V0H2.625v.438H5.25zM2.188 6.563v-.438H1.75v.438H.438v.438h3.938v-.438z" fill="#000"/>
	<path d="M.875 2.625H.438V3.5h.438z" fill="#f0f0f0"/>
	<path d="M4.375 2.625H3.5v.438h.875zm-.438 1.75h-.874v.438h.875zm.875-1.313h-.438v.875h.438zm-3.5 1.75h.875v-.438H1.75V2.188h-.437zm3.5-3.063H3.063v.438h1.75zm-.438 3.5H2.625v.438h1.75zm2.188-3.063h-.438v1.313h.438zM.875 3.5H.438v1.313h.438zm1.313-1.75H1.75v.438h.438zm1.313 1.313h-.438v.438h.438zm-.438.875h-.438v.438h.438zm-.438.875h-.437v.438h.438zm1.75-.875h-.437v.438h.438zm.438.875h-.438v.438h.438zm.438-.438h-.438v.438h.438zm-2.188-1.75v-.437h-.438v.438h-.437v1.313h.438V2.625zm3.063-.875h-.438v.438h.438zm-.875.438h-.438v.438h.438zm.438.438h-.438v1.75h.438zM1.313 4.813H.875v.438h.438zm.438.438h-.438v.438h.438zm.438.438H1.75v.438h.438z" fill="#b79cf8"/>
`;function Ln(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${In}
	</svg>`}var Rn=z`
	<path d="M6.125 1.75v-.437h-.438V.875h-.438V.438H1.75v.438h-.437v.438H.875v.438H.438v2.625h.438v.438h.438v.438h.438v.875h.438v.438h2.625v-.438h.438v-.875h.438v-.438h.438v-.438h.438V1.75z" fill="#d1cdd5"/>
	<path d="M1.75.438h-.437v.438h.438zm-.437.437H.875v.438h.438zm-.438.438H.438v.438h.438zm.875 3.938h-.437v.875h.438zm-.438-.438H.875v.438h.438zm.875 1.313H1.75v.438h.438zM.874 4.376H.438v.438h.438z" fill="#000"/>
	<path d="M1.75 4.813h-.437v.438h.438zm.438.875H1.75v.438h.438zm-.875-1.313H.875v.438h.438zm1.75-1.313H1.75v1.313h1.313z" fill="#847d8b"/>
	<path d="M3.063 3.5h-.875v.875h.875z" fill="#57595f"/>
	<path d="M5.25 3.063H3.938v1.313h1.313z" fill="#847d8b"/>
	<path d="M5.25 3.5h-.875v.875h.875z" fill="#57595f"/>
	<path d="M5.25 5.254h.438v-.438H5.25zm-.438.875h.438v-.438h-.438zm.875-1.313h.438v-.438h-.438z" fill="#847d8b"/>
	<path d="M.438 1.75H0v2.625h.438z" fill="#000"/>
	<path d="M.875 1.75H.438v2.625h.438z" fill="#fff"/>
	<path d="M5.25.879h.438V.441H5.25zm.438.438h.438V.879h-.438zm.438.438h.438v-.438h-.438zM5.251 6.13h.438v-.875h-.438zm.438-.875h.438v-.438h-.438zm-.875 1.313h.438V6.13h-.438zm1.313-1.75h.438V4.38h-.438zm.438-.438h.438V1.755h-.438z" fill="#000"/>
	<path d="M6.125 4.379h.438V1.754h-.438z" fill="#847d8b"/>
	<path d="M1.75 0v.438h3.5V0z" fill="#000"/>
	<path d="M1.75.875h-.437v.438h.438zm-.437.438H.875v.438h.438zm.438.438h-.438v.438h.438zm3.5-.433h.438V.88h-.438zm.438.438h.438v-.438h-.438zM1.75.438v.438h3.5V.438z" fill="#fff"/>
	<path d="M2.188 6.563v.438h2.625v-.438z" fill="#000"/>
	<path d="M2.188 6.125v.438h2.625v-.438z" fill="#847d8b"/>
	<path d="M3.063 5.688h-.438v.875h.438zm1.313 0h-.438v.875h.438z" fill="#57595f"/>
`;function zn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Rn}
	</svg>`}var Bn=z`
	<path d="M3.063 0H1.75v.438h1.313zm1.75.438h-1.75v.438h1.75zm-.875 2.187H3.5v1.75h.438zm-3.5-.437H0v2.625h.438zM6.563.875h-1.75v.438h1.75z" fill="#000"/>
	<path d="M3.063.438H1.75v.438h1.313zm1.75.438h-1.75v.438h1.75zm1.75.438h-1.75v.438h1.75z" fill="#f0f0f0"/>
	<path d="M3.063 6.563H1.75v.438h1.313z" fill="#000"/>
	<path d="M2.625 6.125v-.438h-.437v-.875H1.75V2.188h.438v-.875h.438V.875H1.75v.438H.875v1.75H.438v1.75h.438v.875h.438v.438h.438v.438h1.313v-.438z" fill="#ffe361"/>
	<path d="M3.063 6.125H1.75v.438h1.313z" fill="#ffb84b"/>
	<path d="M4.813 6.125h-1.75v.438h1.75z" fill="#000"/>
	<path d="M4.375 5.688V5.25h-.437v-.875H3.5v-1.75h.438V1.75h.438v-.437H3.063v.438h-.438v1.313h-.437v1.75h.438v.875h.438v.438h1.75v-.438z" fill="#ffe361"/>
	<path d="M6.563 5.688h-1.75v.438h1.75zM1.75.438h-.437v.438h.438zm-.437.437H.875v.438h.438zm-.438.438H.438v.875h.438zm6.125 0h-.438v.438H7zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.875h.438zm.875 3.063h-.438v.438h.438zm-.438-.438h-.438v.438h.438zm-.438-.875h-.438v.875h.438zm-.438-.875h-.438v.875h.438zM1.747 6.127h-.434v.438h.438zm-.438-.438H.875v.438h.438zm-.438-.875H.438v.875h.438zm1.313-2.625H1.75v2.625h.438zM3.059.876h-.434v.438h.438zm-.434.437h-.437v.875h.438z" fill="#000"/>
	<path d="M.875 2.188H.438v.875h.438zm1.75 0h-.437v.875h.438z" fill="#f0f0f0"/>
	<path d="M2.188 1.313H1.75v.875h.438z" fill="#ffb84b"/>
	<path d="M4.813 1.313h-.438v.438h.438z" fill="#000"/>
	<path d="M1.75.875h-.437v.438h.438z" fill="#f0f0f0"/>
	<path d="M2.625.875h-.437v.438h.438zm1.313.875H3.5v.875h.438zm.438-.438h-.438v.438h.438zm-2.188 3.5H1.75v.438h.438zm-.438.875h-.437v.438h.438zm-.438-.875H.875v.875h.438zm2.188.875v-.438h-.437v-.438h-.438v.875h.438v.438h1.75v-.438zm.438-1.313H3.5v.438h.438z" fill="#ffb84b"/>
	<path d="M4.375 5.688V5.25h-.437v-.875H3.5v-1.75h.438V1.75h.438v-.437H3.063v.438h-.438v1.313h-.437v1.75h.438v.875h.438v.438h1.75v-.438z" fill="url(#a)"/>
	<path d="M6.125 5.25v-.438h-.438v-.874h-.438v-.875h.438v-.875h.438V1.75H4.812v.438h-.438v.438h-.436v1.75h.438v.875h.438v.438h1.75v-.438z" fill="#ff2c52"/>
	<path d="M5.688 2.188H5.25v.875h.438zm.438-.438h-.438v.438h.438zm-.438 2.188H5.25v.438h.438zM5.25 5.251v-.438h-.875v.438h.438v.438h1.75v-.438z" fill="#be0351"/>
	<path d="M1.313 1.313H.875v.438h.438zm0 1.75H.875v.438h.438zm1.75-1.75h-.438v.438h.438zm1.75.438h-.438v.438h.438zm-.438.875h-.437v.438h.438z" fill="#f0f0f0"/>
	<path d="M4.375 1.75h-.437v.875h.438zM3.062 5.688h-.437v.438h.438zm-.438-.875h-.436v.875h.438zm2.188.438h-.438v.438h.438zm-.438-.875h-.436v.875h.438z" fill="#000"/>
	<defs>
		<radialGradient id="a" cx=".75" cy=".5" r="1" fx=".75" fy=".5">
		<stop stop-color="#ff2c52" offset="30%"/>
		<stop stop-color="#ffe361" offset="70%"/>
		</radialGradient>
	</defs>
`;function Vn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Bn}
	</svg>`}var Hn=z`
	<path d="M4.813.438v.438h-.438v.438h-.437v.438H3.5v.438h-.437v.875h-.438v.438H3.5v.875h.438v-.44h.875V3.5h.438v-.437h.438v-.438h.438v-.437h.438V.438z" fill="#d1cdd5"/>
	<path d="M1.313 3.938h.438v.438h.875v.875h.438v.438h.875v.438h.875v-.875h-.876v-.438H3.5v-.438h-.437v-.438h-.438V3.5h-.437v-.437H1.75v-.875H.875v.875h.438z" fill="#ffe361"/>
	<path d="M2.188 4.813h-.875v.875h.875zm-.875.875H.438v.875h.875z" fill="#ffe361"/>
	<path d="M4.813.438h-.438v.438h.438zm-.438.438h-.437v.438h.438zm-.437.437H3.5v.438h.438zM3.5 1.75h-.437v.438h.438zm-.437.438h-.438v.875h.438zm-.875 0H1.75v.875h.438zm-1.313 0H.438v.875h.438zm.438.875H.875v.875h.438zm3.5.875h-.875v.438h.875zm0 .875h-.875v.438h.875zm.438.438h-.438v.875h.438z" fill="#000"/>
	<path d="M6.563.438h-.438v1.75h.438z" fill="#847d8b"/>
	<path d="M.438 5.688H0v.875h.438zm4.375.438h-.875v.438h.875zm-.875-.438h-.875v.438h.875z" fill="#000"/>
	<path d="M2.188 5.25h-.875v.438h.875zm-.875.875H.438v.438h.875z" fill="#ffb84b"/>
	<path d="M1.313 6.125v.438h.438v-.438h.438v-.438h-.876zm1.313-.875v-.875H1.75v-.437h-.437v.875h.875v.875h.875V5.25zm-1.313 0v-.438H.875v.438H.438v.438h.875zm0 1.313H.438v.438h.875zM1.75 1.75H.875v.438h.875zm1.313 2.188v.438h.438V3.5h-.876v.438z" fill="#000"/>
	<path d="M5.688 1.313H5.25v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.436v.438h.438zm-.436.436H3.5v.438h.438z" fill="#847d8b"/>
	<path d="M3.063 3.063h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M1.75 3.5h-.437v.438h.438zm-.437-.875H.875v.438h.438zm.875 1.313H1.75v.438h.438zm.875.875h-.438v.438h.438zm.438.438h-.438v.438h.438zm.875.438h-.438v.438h.438z" fill="#ffb84b"/>
	<path d="M3.938 4.375H3.5v.438h.438zM2.625 3.063h-.437v.438h.438zm3.938-.875h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438-3.5V.44h1.75v1.75h.438V0z" fill="#000"/>
	<path d="M4.813 5.25h-.438v.438h.438zm-.875-.438H3.5v.438h.438zM3.5 4.374h-.437v.438h.438zm-.437-.436h-.438v.438h.438zM2.625 3.5h-.437v.438h.438zm-.437-.437H1.75v.438h.438zM3.5 2.188h-.437v.438h1.313v-.438h-.438V1.75H3.5zM4.375.875v.438h-.437v.438h1.313v-.438h-.438V.875zm1.75-.438H4.812v.438h1.313z" fill="#f0f0f0"/>
	<path d="M6.125 2.188h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.873.436H3.5v.438h.438z" fill="#847d8b"/>
	<path d="M1.75 2.188h-.437v.438h.438zm0 2.625h-.437v.438h.438zm-.875.875H.438v.438h.438z" fill="#f0f0f0"/>
`;function Un(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Hn}
	</svg>`}var Wn=z`
	<path d="M5.688 2.625v-.437H5.25V1.75h-.438v-.437h-.438V.875h-.436V.438h-.875v.438h-.438v.438h-.437v.438H1.75v.438h-.437v.438H.875v.875H.438v2.188h.438v.438h.875v.438h3.5v-.438h.875v-.438h.438V3.5h-.438v-.875z" fill="#0abbff"/>
	<path d="M3.063 0v.438h.875V0zm-.438.438v.438h.438V.438zm1.313 0v.438h.438V.438zm.438.438v.438h.438V.875zm.438.438v.438h.438v-.439zm.438.438v.438h.438v-.44zm.438.438v.438h.438v-.44zm.438.438v.875h.438v-.878zm-5.69-.003V3.5h.438v-.875zM0 3.5v2.188h.438V3.5zm6.563 0v2.188h.438V3.5zM2.188.875v.438h.438V.875zm-.438.438v.438h.438v-.438zm-.437.437v.438h.438V1.75zm-.438.438v.438h.438v-.438zm-.438 3.5v.438h.438v-.438zm5.688 0v.438h.438v-.438zm-4.375.875v.438h3.5v-.438z" fill="#000"/>
	<path d="M1.75 6.125v.438h3.5v-.438z" fill="#4282d8"/>
	<path d="M.875 6.125v.438h.875v-.438zm5.25.438v-.438H5.25v.438z" fill="#000"/>
	<path d="M3.063.438v.438h.875V.438z" fill="#fff"/>
	<path opacity=".5" d="M4.813 3.5v-.437h-.438v-.438h-.437v-.437h-.875v.438h-.438v.438h-.437v.438H1.75v1.313h.438v.438h2.625v-.438h.438V3.5z" fill="#fff"/>
	<path d="M2.625.875v.438h.438V.875zm-.437.438v.438h.438v-.438zm.438.438v.438h.438V1.75zM1.75 1.75v.438h.438V1.75zm-.437.438v.438h.438v-.438zm-.438.437V3.5h.438v-.875zM.438 3.5v.875h.438V3.5z" fill="#fff"/>
	<path d="M5.25 2.188v.438h.438v-.438zm.438.438v.875h.438v-.876zm.438.875v1.75h-.438v.438H5.25v.438h.875v-.438h.438V3.5zM.875 6.125h.875v-.438H.875z" fill="#4282d8"/>
`;function Gn(e={}){return R`<svg
		${q(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Wn}
	</svg>`}var Kn=globalThis.$discordMessage??{};function qn(){return Kn}var Jn={blue:`https://cdn.discordapp.com/embed/avatars/0.png`,gray:`https://cdn.discordapp.com/embed/avatars/1.png`,green:`https://cdn.discordapp.com/embed/avatars/2.png`,orange:`https://cdn.discordapp.com/embed/avatars/3.png`,red:`https://cdn.discordapp.com/embed/avatars/4.png`,pink:`https://cdn.discordapp.com/embed/avatars/5.png`},Yn=qn().avatars??{},Xn=Object.assign(Jn,Yn,{default:Jn[Yn.default]??Yn.default??Jn.blue}),Zn=qn().profiles??{},Qn=qn().defaultTheme===`light`?`light`:`dark`,$n=qn().defaultMode===`compact`?`compact`:`cozy`,er=qn().defaultBackground===`none`?`none`:`discord`,tr=new Map([[`heart`,hn()],[`crystal`,an()],[`diamond`,sn()],[`explosion`,ln()],[`flame`,dn()],[`flower`,pn()],[`key`,_n()],[`leaf`,yn()],[`lightning`,xn()],[`magic`,Cn()],[`moon`,Tn()],[`mushroom`,Dn()],[`mythical`,kn()],[`ornament`,jn()],[`plasma`,Nn()],[`rock`,Fn()],[`shell`,Ln()],[`skull`,zn()],[`sun`,Vn()],[`sword`,Un()],[`water`,Gn()]]),nr=z`
	<path
		fill="currentColor"
		d="M18.91 12.98a5.45 5.45 0 0 1 2.18 6.2c-.1.33-.09.68.1.96l.83 1.32a1 1 0 0 1-.84 1.54h-5.5A5.6 5.6 0 0 1 10 17.5a5.6 5.6 0 0 1 5.68-5.5c1.2 0 2.32.36 3.23.98Z"
	/>
	<path
		fill="currentColor"
		d="M19.24 10.86c.32.16.72-.02.74-.38L20 10c0-4.42-4.03-8-9-8s-9 3.58-9 8c0 1.5.47 2.91 1.28 4.11.14.21.12.49-.06.67l-1.51 1.51A1 1 0 0 0 2.4 18h5.1a.5.5 0 0 0 .49-.5c0-4.2 3.5-7.5 7.68-7.5 1.28 0 2.5.3 3.56.86Z"
	/>
`;function rr(e={}){return R`<svg
		${q(e)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		${nr}
	</svg>`}var ir=z`
	<path
		fill="currentColor"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"
	/>
`;function ar(e={}){return R`<svg
		${q(e)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${ir}
	</svg>`}var or=z`
	<path
		fill="currentColor"
		d="M12 2.81a1 1 0 0 1 0-1.41l.36-.36a1 1 0 0 1 1.41 0l9.2 9.2a1 1 0 0 1 0 1.4l-.7.7a1 1 0 0 1-1.3.13l-9.54-6.72a1 1 0 0 1-.08-1.58l1-1L12 2.8ZM12 21.2a1 1 0 0 1 0 1.41l-.35.35a1 1 0 0 1-1.41 0l-9.2-9.19a1 1 0 0 1 0-1.41l.7-.7a1 1 0 0 1 1.3-.12l9.54 6.72a1 1 0 0 1 .07 1.58l-1 1 .35.36ZM15.66 16.8a1 1 0 0 1-1.38.28l-8.49-5.66A1 1 0 1 1 6.9 9.76l8.49 5.65a1 1 0 0 1 .27 1.39ZM17.1 14.25a1 1 0 1 0 1.11-1.66L9.73 6.93a1 1 0 0 0-1.11 1.66l8.49 5.66Z"
	/>
`;function sr(e={}){return R`<svg
		${q(e)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${or}
	</svg>`}var cr=z`
	<path
		fill="currentColor"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M6 9h1V6a5 5 0 0 1 10 0v3h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3Zm9-3v3H9V6a3 3 0 1 1 6 0Zm-1 8a2 2 0 0 1-1 1.73V18a1 1 0 1 1-2 0v-2.27A2 2 0 1 1 14 14Z"
	/>
`;function lr(e={}){return R`<svg
		${q(e)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${cr}
	</svg>`}var ur=z`
	<path
		fill="currentColor"
		d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z"
	/>
	<path
		fill="currentColor"
		d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z"
	/>
`;function dr(e={}){return R`<svg
		${q(e)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${ur}
	</svg>`}var fr=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},pr=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},J=kt(`light-theme`),mr=kt(`compact-mode`),hr=kt(`no-background`),gr=(()=>{let e=[V(`discord-messages`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[Pt({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],c=[Pt({context:hr}),H({type:Boolean,reflect:!0,attribute:`no-background`})],d=[Pt({context:mr}),H({type:Boolean,reflect:!0,attribute:`compact-mode`})],m=[H({reflect:!0,attribute:`channel-type`})],_=[H({reflect:!0,attribute:`channel-name`})],fr(this,null,a,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:x},o,s),fr(this,null,c,{kind:`accessor`,name:`noBackground`,static:!1,private:!1,access:{has:e=>`noBackground`in e,get:e=>e.noBackground,set:(e,t)=>{e.noBackground=t}},metadata:x},l,u),fr(this,null,d,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:x},f,p),fr(this,null,m,{kind:`accessor`,name:`channelType`,static:!1,private:!1,access:{has:e=>`channelType`in e,get:e=>e.channelType,set:(e,t)=>{e.channelType=t}},metadata:x},h,g),fr(this,null,_,{kind:`accessor`,name:`channelName`,static:!1,private:!1,access:{has:e=>`channelName`in e,get:e=>e.channelName,set:(e,t)=>{e.channelName=t}},metadata:x},v,y),fr(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=L`
		:host {
			color: #fff;
			background-color: #36393e;
			display: block;
			font-size: 16px;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
			line-height: 170%;
			border: 1px solid rgba(255, 255, 255, 0.05);
		}

		:host([light-theme]) {
			color: #747f8d;
			background-color: #fff;
			border-color: #dedede;
		}

		:host([no-background]) {
			background-color: unset;
		}

		::slotted(*) {
			padding-top: 0.125rem;
			padding-bottom: 0.125rem;
		}

		::slotted(*:first-child) {
			margin-top: 0.5rem;
		}

		::slotted(*:not(:first-child)) {
			margin-top: 1.0625rem;
		}

		:host([compact-mode]) ::slotted(*:not(:first-child)) {
			margin-top: unset;
		}

		::slotted(*:last-child) {
			margin-bottom: 0.5rem;
			border-bottom-width: 0;
		}

		:host .discord-channel-header {
			display: flex;
			align-items: center;
			padding: 0.5rem 1rem;
			box-shadow:
				0 2px 0 0 rgba(0, 0, 0, 0.05),
				0 1.5px 0 0 rgba(0, 0, 0, 0.05),
				0 1px 0 0 rgba(0, 0, 0, 0.16);
		}

		:host .discord-channel-icon {
			height: 24px;
			width: auto;
			margin: 0 8px;
			position: relative;
			flex: 0 0 auto;
			color: #80848e;
		}

		:host([light-theme]) .discord-channel-icon {
			color: #6d6f78;
		}

		:host .discord-channel-name {
			margin: 0 8px 0 0;
			flex: 0 0 auto;
			min-width: auto;
		}
	`;#e=pr(this,o,!1);get lightTheme(){return this.#e}set lightTheme(e){this.#e=e}#t=(pr(this,s),pr(this,l,!1));get noBackground(){return this.#t}set noBackground(e){this.#t=e}#n=(pr(this,u),pr(this,f,!1));get compactMode(){return this.#n}set compactMode(e){this.#n=e}#r=(pr(this,p),pr(this,h,void 0));get channelType(){return this.#r}set channelType(e){this.#r=e}#i=(pr(this,g),pr(this,v,void 0));get channelName(){return this.#i}set channelName(e){this.#i=e}connectedCallback(){super.connectedCallback(),(this.lightTheme||Qn===`light`&&this.lightTheme)&&(this.lightTheme=!0),(this.compactMode||$n===`compact`&&this.compactMode)&&(this.compactMode=!0),(this.noBackground||er===`none`&&this.noBackground)&&(this.noBackground=!0)}render(){let e;switch(this.channelType){case`text`:e=R`${ar()}`;break;case`voice`:e=R`${dr()}`;break;case`locked`:e=R`${lr()}`;break;case`thread`:e=R`${sr()}`;break;case`forum`:e=R`${rr()}`}return R`
			${K(this.channelType&&this.channelName,()=>R`<div class="discord-channel-header">
						<div class="discord-channel-icon">${e}</div>
						<div class="discord-channel-name">${this.channelName}</div>
					</div>`)}
			<slot></slot>
		`}constructor(){super(...arguments),pr(this,y)}static{pr(r,n)}};return r})(),_r=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},vr=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},yr=(()=>{let e=[V(`discord-link`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[U({context:J,subscribe:!0}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],c=[H()],d=[H()],m=[H()],_=[H()],_r(this,null,a,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:x},o,s),_r(this,null,c,{kind:`accessor`,name:`href`,static:!1,private:!1,access:{has:e=>`href`in e,get:e=>e.href,set:(e,t)=>{e.href=t}},metadata:x},l,u),_r(this,null,d,{kind:`accessor`,name:`rel`,static:!1,private:!1,access:{has:e=>`rel`in e,get:e=>e.rel,set:(e,t)=>{e.rel=t}},metadata:x},f,p),_r(this,null,m,{kind:`accessor`,name:`target`,static:!1,private:!1,access:{has:e=>`target`in e,get:e=>e.target,set:(e,t)=>{e.target=t}},metadata:x},h,g),_r(this,null,_,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:x},v,y),_r(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=L`
		a {
			color: #00aff4;
			text-decoration: none;
		}

		a:hover {
			text-decoration: underline;
		}

		.discord-link-light-theme a {
			color: #00b0f4;
		}
	`;#e=vr(this,o,!1);get lightTheme(){return this.#e}set lightTheme(e){this.#e=e}#t=(vr(this,s),vr(this,l,void 0));get href(){return this.#t}set href(e){this.#t=e}#n=(vr(this,u),vr(this,f,void 0));get rel(){return this.#n}set rel(e){this.#n=e}#r=(vr(this,p),vr(this,h,void 0));get target(){return this.#r}set target(e){this.#r=e}#i=(vr(this,g),vr(this,v,void 0));get type(){return this.#i}set type(e){this.#i=e}render(){return R`<a
			href=${G(this.href)}
			rel=${G(this.rel)}
			target=${G(this.target)}
			type=${G(this.type)}
			class=${W({"discord-link-light-theme":this.lightTheme})}
			><slot></slot
		></a>`}constructor(){super(...arguments),vr(this,y)}static{vr(r,n)}};return r})(),br=z`
	<path
		fill="currentColor"
		d="M12 2a1 1 0 0 1 1 1v10.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V3a1 1 0 0 1 1-1ZM3 20a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3Z"
	/>
`;function xr(e={}){return R`<svg
		${q(e)}
		class="discord-icon-download"
		aria-hidden="true"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		fill="none"
		viewBox="0 0 24 24"
	>
		${br}
	</svg>`}var Sr=z`
	<path fill="currentColor" d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H6ZM15 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3Z"></path>
`;function Cr(e={}){return R`<svg ${q(e)} aria-hidden="true" role="img" width="16" height="16" fill="none" viewBox="0 0 24 24">${Sr}</svg>`}var wr=z`
	<path fill="currentColor" d="M9.25 3.35C7.87 2.45 6 3.38 6 4.96v14.08c0 1.58 1.87 2.5 3.25 1.61l10.85-7.04a1.9 1.9 0 0 0 0-3.22L9.25 3.35Z"></path>
`;function Tr(e={}){return R`<svg ${q(e)} aria-hidden="true" role="img" width="16" height="16" fill="none" viewBox="0 0 24 24">${wr}</svg>`}var Er=z`
	<path fill="currentColor" d="M12,5 L12,1 L7,6 L12,11 L12,7 C15.31,7 18,9.69 18,13 C18,16.31 15.31,19 12,19 C8.69,19 6,16.31 6,13 L4,13 C4,17.42 7.58,21 12,21 C16.42,21 20,17.42 20,13 C20,8.58 16.42,5 12,5 L12,5 Z"></path>
`;function Dr(e={}){return R`<svg ${q(e)} aria-hidden="true" role="img" width="16" height="16" fill="none" viewBox="0 0 24 24">${Er}</svg>`}var Or=z`
	<path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z"></path>
	<path fill="currentColor" d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z"></path>
`;function kr(e={}){return R`<svg ${q(e)} aria-hidden="true" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">${Or}</svg>`}var Ar=z`
	<path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.18 15.36c-.55.35-1.18-.12-1.18-.78v-.27c0-.36.2-.67.45-.93a2 2 0 0 0 0-2.76c-.24-.26-.45-.57-.45-.93v-.27c0-.66.63-1.13 1.18-.78a4 4 0 0 1 0 6.72Z"></path>
`;function jr(e={}){return R`<svg ${q(e)} aria-hidden="true" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">${Ar}</svg>`}var Mr=z`
	<path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM22.7 8.3a1 1 0 0 0-1.4 0L19 10.58l-2.3-2.3a1 1 0 1 0-1.4 1.42L17.58 12l-2.3 2.3a1 1 0 0 0 1.42 1.4L19 13.42l2.3 2.3a1 1 0 0 0 1.4-1.42L20.42 12l2.3-2.3a1 1 0 0 0 0-1.4Z"></path>
`;function Nr(e={}){return R`<svg ${q(e)} aria-hidden="true" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">${Mr}</svg>`}var Pr=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Fr=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ir=(()=>{let e=[V(`discord-audio-attachment`)],t,n=[],r,i=en,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H()],d=[H({type:Number})],m=[H({attribute:`bytes-unit`})],_=[U({context:J,subscribe:!0}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],Pr(this,null,a,{kind:`accessor`,name:`href`,static:!1,private:!1,access:{has:e=>`href`in e,get:e=>e.href,set:(e,t)=>{e.href=t}},metadata:x},o,s),Pr(this,null,c,{kind:`accessor`,name:`name`,static:!1,private:!1,access:{has:e=>`name`in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:x},l,u),Pr(this,null,d,{kind:`accessor`,name:`bytes`,static:!1,private:!1,access:{has:e=>`bytes`in e,get:e=>e.bytes,set:(e,t)=>{e.bytes=t}},metadata:x},f,p),Pr(this,null,m,{kind:`accessor`,name:`bytesUnit`,static:!1,private:!1,access:{has:e=>`bytesUnit`in e,get:e=>e.bytesUnit,set:(e,t)=>{e.bytesUnit=t}},metadata:x},h,g),Pr(this,null,_,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:x},v,y),Pr(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=[nn,tn,Zt,L`
			:host {
				display: grid;
				height: -moz-fit-content;
				height: fit-content;
				grid-auto-flow: row;
				grid-row-gap: 0.25rem;
				grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
				text-indent: 0;
				min-height: 0;
				min-width: 0;
				padding-top: 0.125rem;
				padding-bottom: 0.125rem;
				position: relative;

				--seek-before-width: 0%;
				--buffered-width: 0%;
				--volume-slider-opacity: 0;
			}

			.discord-audio-attachment-non-visual-media-item {
				width: -moz-fit-content;
				width: fit-content;
				max-width: 100%;
			}

			.discord-media-attachment-mosaic-item-media {
				width: 100%;
			}

			.discord-audio-attachment-wrapper-audio {
				background-color: #282828;
				border-color: #202020;
				border-radius: 8px;
				border-style: solid;
				border-width: 1px;
				box-sizing: border-box;
				color: hsl(0 calc(1 * 0%) 100% / 1);
				display: flex;
				flex-direction: column;
				flex: auto;
				height: auto;
				justify-content: space-between;
				max-width: 100%;
				overflow: visible;
				padding: 16px;
				position: relative;
				user-select: none;
				width: 432px;
			}

			.discord-audio-attachment-light-theme.discord-audio-attachment-wrapper-audio {
				border-color: #f3f3f3;
				background-color: #f9f9f9;
			}

			.discord-audio-attachment-audio-metadata {
				display: flex;
			}

			.discord-audio-attachment-audio-metadata::before {
				width: 24px;
				height: 40px;
				content: '';
				background-image: url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgNzIgOTYiIHdpZHRoPSI3MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNzIgMjkuM3Y2MC4zYzAgMi4yNCAwIDMuMzYtLjQ0IDQuMjItLjM4Ljc0LTEgMS4zNi0xLjc0IDEuNzQtLjg2LjQ0LTEuOTguNDQtNC4yMi40NGgtNTkuMmMtMi4yNCAwLTMuMzYgMC00LjIyLS40NC0uNzQtLjM4LTEuMzYtMS0xLjc0LTEuNzQtLjQ0LS44Ni0uNDQtMS45OC0uNDQtNC4yMnYtODMuMmMwLTIuMjQgMC0zLjM2LjQ0LTQuMjIuMzgtLjc0IDEtMS4zNiAxLjc0LTEuNzQuODYtLjQ0IDEuOTgtLjQ0IDQuMjItLjQ0aDM2LjNjMS45NiAwIDIuOTQgMCAzLjg2LjIyLjUuMTIuOTguMjggMS40NC41djE2Ljg4YzAgMi4yNCAwIDMuMzYuNDQgNC4yMi4zOC43NCAxIDEuMzYgMS43NCAxLjc0Ljg2LjQ0IDEuOTguNDQgNC4yMi40NGgxNi44OGMuMjIuNDYuMzguOTQuNSAxLjQ0LjIyLjkyLjIyIDEuOS4yMiAzLjg2eiIgZmlsbD0iI2QzZDZmZCIvPjxwYXRoIGQ9Im02OC4yNiAyMC4yNmMxLjM4IDEuMzggMi4wNiAyLjA2IDIuNTYgMi44OC4xOC4yOC4zMi41Ni40Ni44NmgtMTYuODhjLTIuMjQgMC0zLjM2IDAtNC4yMi0uNDQtLjc0LS4zOC0xLjM2LTEtMS43NC0xLjc0LS40NC0uODYtLjQ0LTEuOTgtLjQ0LTQuMjJ2LTE2Ljg4MDAyOWMuMy4xNC41OC4yOC44Ni40NTk5OTkuODIuNSAxLjUgMS4xOCAyLjg4IDIuNTZ6IiBmaWxsPSIjOTM5YmY5Ii8+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJtMzQuNzYgNDIuMTZjLS43NC0uMy0xLjYtLjE0LTIuMTguNDRsLTguNTggOS40aC02Yy0xLjEgMC0yIC45LTIgMnYxMmMwIDEuMS45IDIgMiAyaDZsOC41OCA5LjQyYy41OC41OCAxLjQ0Ljc0IDIuMTguNDQuNzYtLjMyIDEuMjQtMS4wNiAxLjI0LTEuODZ2LTMyYzAtLjgtLjQ4LTEuNTQtMS4yNC0xLjg0em01LjI0IDMuODR2NGM1LjUyIDAgMTAgNC40OCAxMCAxMHMtNC40OCAxMC0xMCAxMHY0YzcuNzIgMCAxNC02LjI4IDE0LTE0cy02LjI4LTE0LTE0LTE0em0wIDhjMy4zIDAgNiAyLjcgNiA2cy0yLjcgNi02IDZ2LTRjMS4xIDAgMi0uOSAyLTJzLS45LTItMi0yeiIgZmlsbD0iIzU4NjVmMiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+');
				background-size: 100%auto;
				background-repeat: no-repeat;
			}

			.discord-audio-attachment-audio-metadata-content {
				padding: 0 8px;
				flex: 1 1 auto;
				white-space: nowrap;
				overflow: hidden;
			}

			.discord-audio-attachment-audio-metadata-size {
				color: color-mix(in oklab, hsl(214 calc(1 * 8.1%) 61.2% / 1) 100%, black 0%);
				font-size: 12px;
				line-height: 16px;
				font-weight: 500;
				opacity: 0.7;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.discord-audio-attachment-audio-element {
				display: none !important;
				position: absolute;
				width: 0;
				height: 0;
			}
		`];#e=Fr(this,o,void 0);get href(){return this.#e}set href(e){this.#e=e}#t=(Fr(this,s),Fr(this,l,void 0));get name(){return this.#t}set name(e){this.#t=e}#n=(Fr(this,u),Fr(this,f,void 0));get bytes(){return this.#n}set bytes(e){this.#n=e}#r=(Fr(this,p),Fr(this,h,void 0));get bytesUnit(){return this.#r}set bytesUnit(e){this.#r=e}#i=(Fr(this,g),Fr(this,v,!1));get lightTheme(){return this.#i}set lightTheme(e){this.#i=e}render(){let e=this.name?.replaceAll(/\s/g,`_`)?.replaceAll(/[^\w-]/g,``);return R`<div class="discord-media-attachment-non-visual-media-item-container">
			<div class="discord-audio-attachment-non-visual-media-item">
				<div class="discord-media-attachment-mosaic-item-media">
					<div
						class=${W({"discord-audio-attachment-wrapper-audio":!0,"discord-audio-attachment-light-theme":this.lightTheme})}
					>
						<div class="discord-audio-attachment-audio-metadata">
							<div class="discord-audio-attachment-audio-metadata-content">
								<discord-link
									href=${G(this.href)}
									ref="noreferrer noopener"
									target="_blank"
									role="button"
									aria-label="Download"
								>
									${e}
								</discord-link>
								<div class="discord-audio-attachment-audio-metadata-size">
									${this.bytes}${K(this.bytesUnit,()=>R` ${this.bytesUnit}`,()=>null)}
								</div>
							</div>
						</div>
						<audio
							${Xt(this.mediaComponentRef)}
							class="discord-audio-attachment-audio-element"
							preload="metadata"
							@progress=${this.displayBufferedAmount}
							@ended=${this.handleEnded}
						>
							<source src=${G(this.href)} />
						</audio>
						<div class="discord-media-attachment-controls" style="transform: translateY(0%)">
							<div
								class="discord-media-attachment-video-button"
								tabindex="0"
								aria-label="${this.isPlaying?`Pause`:`Play`}"
								role="button"
								@click=${this.handleClickPlayPauseIcon}
								@keydown=${this.handleSpaceToPlayPause}
							>
								${K(this.hasEnded,()=>Dr({class:`discord-media-attachment-control-icon`}),()=>K(this.isPlaying,()=>Cr({class:`discord-media-attachment-control-icon`}),()=>Tr({class:`discord-media-attachment-control-icon`})))}
							</div>
							<div class="discord-media-attachment-duration-time-wrapper">
								<span role="status" class="discord-media-attachment-duration-time-display">${this.currentPlaybackPosition}</span>
								<span
									role="separator"
									class="discord-media-attachment-duration-time-display discord-media-attachment-duration-time-separator"
									>/</span
								>
								<span class="discord-media-attachment-duration-time-display">${this.totalMediaDuration}</span>
							</div>
							<div class="discord-media-attachment-horizontal">
								<div class="discord-media-attachment-media-bar-interaction">
									<input
										type="range"
										${Xt(this.seekSliderRef)}
										class="discord-media-attachment-playback-control"
										@input=${this.handleSeekSliderInput}
										@change=${this.handleSeekSliderChange}
										max="100"
										value="0"
									/>
								</div>
							</div>
							<div class="discord-media-attachment-flex">
								<div class="discord-media-attachment-flex-container">
									<div ${Xt(this.volumeControlRef)} class="discord-media-attachment-button-slider">
										<div
											class="discord-media-attachment-volume-vertical"
											@mouseenter=${this.handleVolumeVerticalEnter}
											@mouseleave=${this.handleVolumeVerticalLeave}
										>
											<input
												${Xt(this.volumeControlInputRef)}
												type="range"
												class="discord-media-attachment-volume-slider"
												@input=${this.handleVolumeSliderInput}
												max="100"
												value="100"
											/>
										</div>
									</div>
									<button
										aria-label="Control volume"
										type="button"
										class="discord-media-attachment-button"
										@focus=${this.handleVolumeVerticalFocus}
										@blur=${this.handleVolumeVerticalBlur}
										@mouseover=${this.handleVolumeVerticalEnter}
										@mouseout=${this.handleVolumeVerticalLeave}
										@click=${this.handleClickMuteIcon}
									>
										<div class="discord-media-attachment-button-content">
											${K(this.currentVolume===0||this.isMuted,()=>Nr({class:`discord-media-attachment-button-control-icon`}),()=>K(this.currentVolume<=.5,()=>jr({class:`discord-media-attachment-button-control-icon`}),()=>kr({class:`discord-media-attachment-button-control-icon`})))}
										</div>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="discord-button-download-attachment">
				<a
					class="discord-link-download-attachment"
					aria-label="Download"
					href="${G(this.href)}"
					rel="noreferrer noopener"
					target="_blank"
					role="button"
					tabindex="0"
				>
					${xr()}
				</a>
			</div>
		</div>`}constructor(){super(...arguments),Fr(this,y)}static{Fr(r,n)}};return r})(),Lr=z`
	<path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor" />
`;function Rr(e={}){return R`<svg
		${q(e)}
		class="discord-application-tag-verified"
		aria-label="Verified App"
		aria-hidden="false"
		width="16"
		height="16"
		viewBox="0 0 16 15.2"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Lr}
	</svg>`}var zr=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Br=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Vr=(()=>{let e=[V(`discord-verified-author-tag`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[];var d=class extends i{static{r=this}static{let f=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({type:Boolean})],c=[U({context:mr}),H({type:Boolean,reflect:!0,attribute:`compact-mode`})],zr(this,null,a,{kind:`accessor`,name:`verified`,static:!1,private:!1,access:{has:e=>`verified`in e,get:e=>e.verified,set:(e,t)=>{e.verified=t}},metadata:f},o,s),zr(this,null,c,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:f},l,u),zr(null,t={value:r},e,{kind:`class`,name:r.name,metadata:f},null,n),d=r=t.value,f&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:f})}static styles=L`
		:host {
			background-color: #5865f2;
			color: #fff;
			font-size: 0.625em;
			margin-left: 4px;
			border-radius: 3px;
			line-height: 100%;
			text-transform: uppercase;
			display: inline-flex;
			align-items: center;
			height: 0.9375rem;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			border-radius: 0.1875rem;
		}

		:host .discord-application-tag-verified {
			display: inline-block;
			width: 0.9375rem;
			height: 0.9375rem;
			margin-left: -0.25rem;
		}

		:host([compact-mode]) {
			padding-left: 10px;
			padding-right: 4px;
			margin-right: 0.25rem;
			margin-left: 0px !important;
			margin-top: 0px !important;
		}

		:host([compact-mode]) .discord-application-tag-verified {
			margin-right: 0.7em;
			margin-left: -0.7em;
		}
	`;#e=Br(this,o,!1);get verified(){return this.#e}set verified(e){this.#e=e}#t=(Br(this,s),Br(this,l,!1));get compactMode(){return this.#t}set compactMode(e){this.#t=e}render(){return R`${K(this.verified,()=>Rr())}App`}constructor(){super(...arguments),Br(this,u)}static{Br(r,n)}};return r})(),Hr=`important`,Ur=` !`+Hr,Wr=It(class extends Lt{constructor(e){if(super(e),e.type!==Ft.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[t]){let{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)t[e]??(this.ft.delete(e),e.includes(`-`)?n.removeProperty(e):n[e]=null);for(let e in t){let r=t[e];if(r!=null){this.ft.add(e);let t=typeof r==`string`&&r.endsWith(Ur);e.includes(`-`)||t?n.setProperty(e,t?r.slice(0,-11):r,t?Hr:``):n[e]=r}}return Qe}}),Gr=class extends Error{constructor(e){super(e),this.name=`DiscordComponentsError`}},Kr=new Intl.DateTimeFormat(`en-US`,{day:`2-digit`,month:`2-digit`,year:`numeric`}),qr=new Intl.DateTimeFormat(`en-US`,{hour12:!0,hour:`2-digit`,minute:`2-digit`}),Jr=new Intl.DateTimeFormat(`en-US`,{hour12:!1,hour:`2-digit`,minute:`2-digit`}),Yr=e=>e instanceof Date?Kr.format(e):e,Xr=(e,t=!1)=>e instanceof Date?t?Jr.format(e):qr.format(e):e;function Zr(e,t=!1,n=!1){if(!(e instanceof Date)&&typeof e!=`string`)throw TypeError(`Timestamp prop must be a Date object or a string.`);return t?Xr(e,n):Yr(e)}var Qr=/\.(?<ext>bmp|jpe?g|png|gif|webp|tiff)$/i;function $r(e){if(!Qr.test(e))throw new Gr(`The url of an image for discord-image-attachment should match the regex ${Qr}`)}var ei=/(?:<(?<animated>a)?:(?<name>\w{2,32}):)?(?<id>\d{17,21})>?/;function ti(e){let t=qn().emojis?.[e];if(t)return t;let n=ei.exec(e);if(n?.groups){let{name:e,id:t,animated:r}=n.groups;return{name:e,url:`https://cdn.discordapp.com/emojis/${t}.${r?`gif`:`png`}`}}}function ni(e){if(e)return tr.get(e)??e}var ri=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ii=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},ai=(()=>{let e=[V(`discord-author-info`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,ee=[],D=[],O,k=[],te=[],A,j=[],ne=[],re,M=[],N=[],P,ie=[],ae=[],oe,F=[],se=[];var ce=class extends i{static{r=this}static{let I=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H({type:Boolean})],d=[H({type:Boolean})],m=[H({type:Boolean,attribute:`official-app`})],_=[H({type:Boolean})],b=[H({attribute:`role-color`})],C=[H({attribute:`role-icon`})],E=[H({attribute:`role-name`})],O=[H({attribute:`clan-icon`})],A=[H({attribute:`clan-tag`})],re=[H({type:Boolean})],P=[U({context:mr}),H({type:Boolean,reflect:!0,attribute:`compact-mode`})],oe=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],ri(this,null,a,{kind:`accessor`,name:`author`,static:!1,private:!1,access:{has:e=>`author`in e,get:e=>e.author,set:(e,t)=>{e.author=t}},metadata:I},o,s),ri(this,null,c,{kind:`accessor`,name:`bot`,static:!1,private:!1,access:{has:e=>`bot`in e,get:e=>e.bot,set:(e,t)=>{e.bot=t}},metadata:I},l,u),ri(this,null,d,{kind:`accessor`,name:`server`,static:!1,private:!1,access:{has:e=>`server`in e,get:e=>e.server,set:(e,t)=>{e.server=t}},metadata:I},f,p),ri(this,null,m,{kind:`accessor`,name:`officialApp`,static:!1,private:!1,access:{has:e=>`officialApp`in e,get:e=>e.officialApp,set:(e,t)=>{e.officialApp=t}},metadata:I},h,g),ri(this,null,_,{kind:`accessor`,name:`op`,static:!1,private:!1,access:{has:e=>`op`in e,get:e=>e.op,set:(e,t)=>{e.op=t}},metadata:I},v,y),ri(this,null,b,{kind:`accessor`,name:`roleColor`,static:!1,private:!1,access:{has:e=>`roleColor`in e,get:e=>e.roleColor,set:(e,t)=>{e.roleColor=t}},metadata:I},x,S),ri(this,null,C,{kind:`accessor`,name:`roleIcon`,static:!1,private:!1,access:{has:e=>`roleIcon`in e,get:e=>e.roleIcon,set:(e,t)=>{e.roleIcon=t}},metadata:I},w,T),ri(this,null,E,{kind:`accessor`,name:`roleName`,static:!1,private:!1,access:{has:e=>`roleName`in e,get:e=>e.roleName,set:(e,t)=>{e.roleName=t}},metadata:I},ee,D),ri(this,null,O,{kind:`accessor`,name:`clanIcon`,static:!1,private:!1,access:{has:e=>`clanIcon`in e,get:e=>e.clanIcon,set:(e,t)=>{e.clanIcon=t}},metadata:I},k,te),ri(this,null,A,{kind:`accessor`,name:`clanTag`,static:!1,private:!1,access:{has:e=>`clanTag`in e,get:e=>e.clanTag,set:(e,t)=>{e.clanTag=t}},metadata:I},j,ne),ri(this,null,re,{kind:`accessor`,name:`verified`,static:!1,private:!1,access:{has:e=>`verified`in e,get:e=>e.verified,set:(e,t)=>{e.verified=t}},metadata:I},M,N),ri(this,null,P,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:I},ie,ae),ri(this,null,oe,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:I},F,se),ri(null,t={value:r},e,{kind:`class`,name:r.name,metadata:I},null,n),ce=r=t.value,I&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:I})}static styles=L`
		:host {
			display: inline-flex;
			align-items: center;
			font-size: 16px;
			text-underline-offset: 1px;
			margin-right: 0.25rem;
		}

		:host .discord-author-username {
			color: #fff;
			font-size: 1em;
			font-weight: 500;
		}

		:host .discord-author-username:hover {
			text-decoration: underline;
			cursor: pointer;
		}

		:host([light-theme]) .discord-author-username {
			color: #23262a;
		}

		:host .discord-clan-tag {
			background-color: oklab(0.431937 0.00109309 -0.0132537 / 0.54);
			color: #fff;
			font-size: 12px;
			font-weight: 500;
			margin-left: 0.25rem;
			border-radius: 4px;
			line-height: 100%;
			text-transform: uppercase;
			display: inline-flex;
			width: max-content;
			gap: 0.25rem;
			justify-content: space-between;
			align-items: center;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			height: 1.2rem;
			min-width: 45px;
			line-height: 1rem !important;
			transition: background-color 100ms ease-in-out;
			cursor: pointer;
		}

		:host .discord-clan-tag:hover {
			background-color: oklab(0.431937 0.00109309 -0.0132537 / 0.34);
		}

		:host([light-theme]) .discord-clan-tag {
			background-color: hsl(0 calc(1 * 0%) 0.8%/0.09);
			color: #000;
		}

		:host([light-theme]) .discord-clan-tag:hover {
			background-color: hsl(0 calc(1 * 0%) 0.8%/0.03);
		}

		:host([compact-mode]) .discord-clan-tag {
			margin-left: 0rem;
		}

		:host .discord-clan-tag span,
		:host .discord-clan-tag svg,
		:host .discord-clan-tag img {
			user-select: none;
			-webkit-user-select: none;
		}

		:host .discord-application-tag {
			background-color: #5865f2;
			color: #fff;
			font-size: 0.625em;
			border-radius: 3px;
			line-height: 100%;
			text-transform: uppercase;

			/* Use flex layout to ensure both verified icon and "BOT" text are aligned to center */
			display: inline-flex;
			align-items: center;

			/* Styling taken through Inspect Element on Discord client for Windows */
			height: 0.9375rem;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			border-radius: 0.1875rem;
		}

		:host .discord-official-application {
			background-color: #5865f2;
			color: #fff;
			font-size: 0.625em;
			margin-left: 4px;
			border-radius: 3px;
			line-height: 100%;
			text-transform: uppercase;

			/* Use flex layout to ensure both verified icon and "BOT" text are aligned to center */
			display: flex;
			align-items: center;

			/* Styling taken through Inspect Element on Discord client for Windows */
			height: 0.9375rem;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			border-radius: 0.1875rem;
		}

		:host([compact-mode]) .discord-official-application {
			margin-right: 5px;
			margin-left: 0px !important;
		}

		:host .discord-application-tag.discord-application-tag-op {
			background-color: #c9cdfb;
			color: #4752c4;
			border-radius: 0.4rem;
		}

		:host .discord-author-role-icon {
			margin-left: 0.25rem;
			vertical-align: top;
			height: calc(1rem + 4px);
			width: calc(1rem + 4px);
		}

		:host([compact-mode]) .discord-author-username {
			margin-right: 0.25rem;
		}

		:host([compact-mode]) .discord-application-tag {
			padding-left: 10px;
			padding-right: 4px;
			margin-right: 0.25rem;
		}
	`;#e=ii(this,o,void 0);get author(){return this.#e}set author(e){this.#e=e}#t=(ii(this,s),ii(this,l,!1));get bot(){return this.#t}set bot(e){this.#t=e}#n=(ii(this,u),ii(this,f,!1));get server(){return this.#n}set server(e){this.#n=e}#r=(ii(this,p),ii(this,h,!1));get officialApp(){return this.#r}set officialApp(e){this.#r=e}#i=(ii(this,g),ii(this,v,!1));get op(){return this.#i}set op(e){this.#i=e}#a=(ii(this,y),ii(this,x,void 0));get roleColor(){return this.#a}set roleColor(e){this.#a=e}#o=(ii(this,S),ii(this,w,void 0));get roleIcon(){return this.#o}set roleIcon(e){this.#o=e}#s=(ii(this,T),ii(this,ee,void 0));get roleName(){return this.#s}set roleName(e){this.#s=e}#c=(ii(this,D),ii(this,k,void 0));get clanIcon(){return this.#c}set clanIcon(e){this.#c=e}#l=(ii(this,te),ii(this,j,void 0));get clanTag(){return this.#l}set clanTag(e){this.#l=e}#u=(ii(this,ne),ii(this,M,!1));get verified(){return this.#u}set verified(e){this.#u=e}#d=(ii(this,N),ii(this,ie,!1));get compactMode(){return this.#d}set compactMode(e){this.#d=e}#f=(ii(this,ae),ii(this,F,!1));get lightTheme(){return this.#f}set lightTheme(e){this.#f=e}render(){let e=ni(this.clanIcon),t=this.clanTag?.slice(0,4);return R`${K(this.compactMode,()=>null,()=>R`<span class="discord-author-username" style="${Wr({color:this.roleColor??void 0})}">${this.author}</span>`)}
		${K(this.roleIcon&&!this.compactMode,()=>R`<img
					class="discord-author-role-icon"
					src=${G(this.roleIcon)}
					height="20"
					width="20"
					alt=${G(this.roleName)}
					draggable="false"
				/>`)}
		${K(this.bot&&!this.server&&!this.officialApp,()=>R`<discord-verified-author-tag .verified=${this.verified}></discord-verified-author-tag>`)}
		${K(this.server&&!this.bot&&!this.officialApp,()=>R`<span class="discord-application-tag">Server</span>`)}
		${K(this.officialApp&&!this.server&&!this.bot,()=>R`<span class="discord-official-application">${Rr()}OFFICIAL</span>`)}
		${K(this.op,()=>R`<span class="discord-application-tag discord-application-tag-op">OP</span>`)}
		${K(this.compactMode,()=>R`<span class="discord-author-username" style="${Wr({color:this.roleColor??void 0})}">${this.author}</span>`)}
		${K(this.clanIcon&&this.clanTag&&this.clanTag?.length>0,()=>R`
				<span class="discord-clan-tag">
					${e===`string`?R`<img srcset=${G(e)} alt=${G(t)} width="12" height="12" draggable="false" />`:e}
					<span>${t}</span>
				</span>
			`)} `}constructor(){super(...arguments),ii(this,se)}static{ii(r,n)}};return r})(),oi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},si=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},ci=(()=>{let e=[V(`discord-bold`)],t,n=[],r,i=B;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;oi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=L`
		:host > strong {
			font-weight: 700;
		}
	`;render(){return R`
			<strong>
				<slot></slot>
			</strong>
		`}static{si(r,n)}};return r})(),li=z`
	<path
		fill="currentColor"
		d="M10 5V3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V14H19V19H5V5H10Z"
	/>
	<path fill="currentColor" d="M21 2.99902H14V4.99902H17.586L9.29297 13.292L10.707 14.706L19 6.41302V9.99902H21V2.99902Z"
	/>
`;function ui(e={}){return R`<svg ${q(e)} class="discord-button-launch" aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
		${li}
	</svg>`}var di=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},fi=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},pi=(()=>{let e=[V(`discord-button`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[];var C=class extends i{static{r=this}static{let w=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({reflect:!0,attribute:`emoji`})],c=[H({reflect:!0,attribute:`emoji-name`})],d=[H({reflect:!0,attribute:`url`})],m=[H({type:Boolean,reflect:!0,attribute:`disabled`})],_=[H({reflect:!0,attribute:`type`})],b=[H({reflect:!0,attribute:`modal-id`})],di(this,null,a,{kind:`accessor`,name:`emoji`,static:!1,private:!1,access:{has:e=>`emoji`in e,get:e=>e.emoji,set:(e,t)=>{e.emoji=t}},metadata:w},o,s),di(this,null,c,{kind:`accessor`,name:`emojiName`,static:!1,private:!1,access:{has:e=>`emojiName`in e,get:e=>e.emojiName,set:(e,t)=>{e.emojiName=t}},metadata:w},l,u),di(this,null,d,{kind:`accessor`,name:`url`,static:!1,private:!1,access:{has:e=>`url`in e,get:e=>e.url,set:(e,t)=>{e.url=t}},metadata:w},f,p),di(this,null,m,{kind:`accessor`,name:`disabled`,static:!1,private:!1,access:{has:e=>`disabled`in e,get:e=>e.disabled,set:(e,t)=>{e.disabled=t}},metadata:w},h,g),di(this,null,_,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:w},v,y),di(this,null,b,{kind:`accessor`,name:`modalId`,static:!1,private:!1,access:{has:e=>`modalId`in e,get:e=>e.modalId,set:(e,t)=>{e.modalId=t}},metadata:w},x,S),di(null,t={value:r},e,{kind:`class`,name:r.name,metadata:w},null,n),C=r=t.value,w&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:w})}static styles=L`
		:host > *:first-child {
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			margin: 4px 8px 4px 0;
			padding: 2px 16px;
			width: auto;
			height: 32px;
			min-width: 60px;
			min-height: 32px;
			-webkit-transition:
				background-color 0.17s ease,
				color 0.17s ease;
			transition:
				background-color 0.17s ease,
				color 0.17s ease;
			border-radius: 3px;
			font-size: 14px;
			font-weight: 500;
			line-height: 16px;
			text-decoration: none !important;
			/* CSS Reset to unset button styling */
			border-width: unset;
			border-style: unset;
			border-color: unset;
			border-image: unset;
			box-sizing: unset;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
		}

		.success {
			color: #fff;
			background-color: #3ba55d;
		}

		.success.hoverable:hover {
			background-color: #2d7d46;
		}

		.destructive {
			color: #fff;
			background-color: #ed4245;
		}

		.destructive.hoverable:hover {
			background-color: #c03537;
		}

		.primary {
			color: #fff;
			background-color: #5865f2;
		}

		.primary.hoverable:hover {
			background-color: #4752c4;
		}

		.secondary {
			color: #fff;
			background-color: #4f545c;
		}

		.secondary.hoverable:hover {
			background-color: #5d6269;
		}

		.disabled {
			cursor: not-allowed !important;
			opacity: 0.5;
		}

		.launch {
			margin-left: 8px;
		}

		.emoji {
			margin-right: 4px;
			object-fit: contain;
			width: 1.375em;
			height: 1.375em;
			vertical-align: bottom;
		}
	`;#e=fi(this,o,void 0);get emoji(){return this.#e}set emoji(e){this.#e=e}#t=(fi(this,s),fi(this,l,`emoji`));get emojiName(){return this.#t}set emojiName(e){this.#t=e}#n=(fi(this,u),fi(this,f,void 0));get url(){return this.#n}set url(e){this.#n=e}#r=(fi(this,p),fi(this,h,!1));get disabled(){return this.#r}set disabled(e){this.#r=e}#i=(fi(this,g),fi(this,v,`secondary`));get type(){return this.#i}set type(e){this.#i=e}#a=(fi(this,y),fi(this,x,void 0));get modalId(){return this.#a}set modalId(e){this.#a=e}validButtonTypes=(fi(this,S),new Set([`primary`,`secondary`,`success`,`destructive`]));checkType(){if(this.type){if(typeof this.type!=`string`)throw TypeError("DiscordButton `type` prop must be a string.");if(!this.validButtonTypes.has(this.type))throw RangeError("DiscordButton `type` prop must be one of: 'primary', 'secondary', 'success', 'destructive'")}}checkParentElement(){if(this.parentElement?.tagName.toLowerCase()!==`discord-action-row`)throw new Gr(`All <discord-button> components must be direct children of <discord-action-row>.`)}handleButtonClick(){if(this.modalId){let e=this.parentElement?.parentElement?.parentElement?.parentElement;if(e?.tagName?.toLowerCase()===`discord-messages`){let t=e?.querySelector(`discord-modal`),n=t?.shadowRoot?.querySelector(`dialog#${this.modalId}`),r=n?.querySelector(`div.discord-modal-box`);n instanceof HTMLDialogElement&&r instanceof HTMLDivElement&&(n.showModal(),r.style.display=`flex`,t&&(t.originalBodyOverflow=globalThis.getComputedStyle(globalThis.document.body).overflow,globalThis.document.body.style.overflow=`hidden`))}}}render(){this.checkType(),this.checkParentElement();let e=this.url&&!this.disabled,t=R`
			${K(this.emoji,()=>R`<img src=${this.emoji} alt=${this.emojiName} draggable="true" class="emoji" />`)}
			<span>
				<slot></slot>
			</span>
			${K(this.url,()=>ui())}
		`;return e?R`<a class="secondary" href=${this.url} target="_blank" rel="noopener noreferrer">${t}</a>`:R`<button
			class=${W({[this.type]:!0,disabled:this.disabled,hoverable:!this.disabled})}
			@click=${this.handleButtonClick}
		>
			${t}
		</button>`}static{fi(r,n)}};return r})(),mi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},hi=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},gi=(()=>{let e=[V(`discord-code`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[];var m=class extends i{static{r=this}static{let h=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({type:Boolean,reflect:!0})],c=[U({context:J,subscribe:!0}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],d=[H({type:Boolean,reflect:!0})],mi(this,null,a,{kind:`accessor`,name:`multiline`,static:!1,private:!1,access:{has:e=>`multiline`in e,get:e=>e.multiline,set:(e,t)=>{e.multiline=t}},metadata:h},o,s),mi(this,null,c,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:h},l,u),mi(this,null,d,{kind:`accessor`,name:`embed`,static:!1,private:!1,access:{has:e=>`embed`in e,get:e=>e.embed,set:(e,t)=>{e.embed=t}},metadata:h},f,p),mi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:h},null,n),m=r=t.value,h&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:h})}static styles=L`
		:host {
			background-color: #2f3136;
			white-space: break-spaces;
			font-family:
				Consolas,
				Andale Mono WT,
				Andale Mono,
				Lucida Console,
				Lucida Sans Typewriter,
				DejaVu Sans Mono,
				Bitstream Vera Sans Mono,
				Liberation Mono,
				Nimbus Mono L,
				Monaco,
				Courier New,
				Courier,
				monospace;
			border-radius: 3px;
		}

		code {
			padding: 0.2em;
			margin: -0.2em;
			border-radius: 3px;
			border: none;
			font-size: 85%;
			text-indent: 0;
			white-space: pre-wrap;
		}

		:host([multiline]) code {
			display: block;
			width: 90%;
			font-size: 0.875rem;
			line-height: 1.125rem;
			padding: 0.5em;
			background: #2b2d31;
			border: 1px solid #1e1f22;
		}

		:host([embed]) code {
			background-color: #1e1f22;
		}

		:host([embed][multiline]) code {
			display: block;
			width: 100%;
			padding: 7px;
			border-radius: 4px;
			background: #1e1f22;
		}

		:host([light-theme]) code {
			border-color: #e3e5e8;
			background-color: #f2f3f5;
		}

		:host([light-theme][embed]) code {
			background-color: #e3e5e8;
		}
	`;#e=hi(this,o,!1);get multiline(){return this.#e}set multiline(e){this.#e=e}#t=(hi(this,s),hi(this,l,!1));get lightTheme(){return this.#t}set lightTheme(e){this.#t=e}#n=(hi(this,u),hi(this,f,!1));get embed(){return this.#n}set embed(e){this.#n=e}render(){return this.multiline?R`<discord-pre ?embed=${this.embed}
				><code><slot></slot></code
			></discord-pre>`:R`<code><slot></slot></code>`}constructor(){super(...arguments),hi(this,p)}static{hi(r,n)}};return r})(),_i=z`
	<path
		fill="currentColor"
		d="M56 50.6667V13.3333C56 10.4 53.6 8 50.6667 8H13.3333C10.4 8 8 10.4 8 13.3333V50.6667C8 53.6 10.4 56 13.3333 56H50.6667C53.6 56 56 53.6 56 50.6667ZM22.6667 36L29.3333 44.0267L38.6667 32L50.6667 48H13.3333L22.6667 36Z"
	/>
`;function vi(e={}){return R`<svg ${q(e)} aria-hidden="false" width="64" height="64" viewBox="0 0 64 64">${_i}</svg>`}var yi=z`
	<path
		fill="currentColor"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM16.8995 8.41419L15.4853 6.99998L7 15.4853L8.41421 16.8995L16.8995 8.41419Z"
	/>
`;function bi(e){return R`<svg ${q(e||{})} class="discord-command-icon" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
		${yi}
	</svg>`}var xi=z`
	<path
		d="M0.809739 3.59646L5.12565 0.468433C5.17446 0.431163 5.23323 0.408043 5.2951 0.401763C5.35698 0.395482 5.41943 0.406298 5.4752 0.432954C5.53096 0.45961 5.57776 0.50101 5.61013 0.552343C5.64251 0.603676 5.65914 0.662833 5.6581 0.722939V2.3707C10.3624 2.3707 11.2539 5.52482 11.3991 7.21174C11.4028 7.27916 11.3848 7.34603 11.3474 7.40312C11.3101 7.46021 11.2554 7.50471 11.1908 7.53049C11.1262 7.55626 11.0549 7.56204 10.9868 7.54703C10.9187 7.53201 10.857 7.49695 10.8104 7.44666C8.72224 5.08977 5.6581 5.63359 5.6581 5.63359V7.28135C5.65831 7.34051 5.64141 7.39856 5.60931 7.44894C5.5772 7.49932 5.53117 7.54004 5.4764 7.5665C5.42163 7.59296 5.3603 7.60411 5.29932 7.59869C5.23834 7.59328 5.18014 7.57151 5.13128 7.53585L0.809739 4.40892C0.744492 4.3616 0.691538 4.30026 0.655067 4.22975C0.618596 4.15925 0.599609 4.08151 0.599609 4.00269C0.599609 3.92386 0.618596 3.84612 0.655067 3.77562C0.691538 3.70511 0.744492 3.64377 0.809739 3.59646Z"
		fill="currentColor"
	/>
`;function Si(e={}){return R`<svg ${q(e)} class="discord-reply-icon" aria-hidden="false" width="12" height="8" viewBox="0 0 12 8">${xi}</svg>`}var Ci=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Y=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},wi=(()=>{let e=[V(`discord-reply`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,ee=[],D=[],O,k=[],te=[],A,j=[],ne=[],re,M=[],N=[],P,ie=[],ae=[],oe,F=[],se=[],ce,I=[],le=[],ue,de=[],fe=[],pe,me=[],he=[],ge,_e=[],ve=[],ye,be=[],xe=[];var Se=class extends i{static{r=this}static{let L=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H()],d=[H()],m=[H({type:Boolean})],_=[H({type:Boolean})],b=[H({type:Boolean,attribute:`official-app`})],C=[H({type:Boolean})],E=[H({type:Boolean})],O=[H({type:Boolean})],A=[H({attribute:`role-color`})],re=[H({type:Boolean})],P=[H({type:Boolean})],oe=[H({type:Boolean})],ce=[H({attribute:`clan-icon`})],ue=[H({attribute:`clan-tag`})],pe=[H({type:Boolean,reflect:!0})],ge=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],ye=[U({context:mr}),H({type:Boolean,reflect:!0,attribute:`compact-mode`})],Ci(this,null,a,{kind:`accessor`,name:`profile`,static:!1,private:!1,access:{has:e=>`profile`in e,get:e=>e.profile,set:(e,t)=>{e.profile=t}},metadata:L},o,s),Ci(this,null,c,{kind:`accessor`,name:`author`,static:!1,private:!1,access:{has:e=>`author`in e,get:e=>e.author,set:(e,t)=>{e.author=t}},metadata:L},l,u),Ci(this,null,d,{kind:`accessor`,name:`avatar`,static:!1,private:!1,access:{has:e=>`avatar`in e,get:e=>e.avatar,set:(e,t)=>{e.avatar=t}},metadata:L},f,p),Ci(this,null,m,{kind:`accessor`,name:`bot`,static:!1,private:!1,access:{has:e=>`bot`in e,get:e=>e.bot,set:(e,t)=>{e.bot=t}},metadata:L},h,g),Ci(this,null,_,{kind:`accessor`,name:`server`,static:!1,private:!1,access:{has:e=>`server`in e,get:e=>e.server,set:(e,t)=>{e.server=t}},metadata:L},v,y),Ci(this,null,b,{kind:`accessor`,name:`officialApp`,static:!1,private:!1,access:{has:e=>`officialApp`in e,get:e=>e.officialApp,set:(e,t)=>{e.officialApp=t}},metadata:L},x,S),Ci(this,null,C,{kind:`accessor`,name:`op`,static:!1,private:!1,access:{has:e=>`op`in e,get:e=>e.op,set:(e,t)=>{e.op=t}},metadata:L},w,T),Ci(this,null,E,{kind:`accessor`,name:`verified`,static:!1,private:!1,access:{has:e=>`verified`in e,get:e=>e.verified,set:(e,t)=>{e.verified=t}},metadata:L},ee,D),Ci(this,null,O,{kind:`accessor`,name:`edited`,static:!1,private:!1,access:{has:e=>`edited`in e,get:e=>e.edited,set:(e,t)=>{e.edited=t}},metadata:L},k,te),Ci(this,null,A,{kind:`accessor`,name:`roleColor`,static:!1,private:!1,access:{has:e=>`roleColor`in e,get:e=>e.roleColor,set:(e,t)=>{e.roleColor=t}},metadata:L},j,ne),Ci(this,null,re,{kind:`accessor`,name:`command`,static:!1,private:!1,access:{has:e=>`command`in e,get:e=>e.command,set:(e,t)=>{e.command=t}},metadata:L},M,N),Ci(this,null,P,{kind:`accessor`,name:`attachment`,static:!1,private:!1,access:{has:e=>`attachment`in e,get:e=>e.attachment,set:(e,t)=>{e.attachment=t}},metadata:L},ie,ae),Ci(this,null,oe,{kind:`accessor`,name:`mentions`,static:!1,private:!1,access:{has:e=>`mentions`in e,get:e=>e.mentions,set:(e,t)=>{e.mentions=t}},metadata:L},F,se),Ci(this,null,ce,{kind:`accessor`,name:`clanIcon`,static:!1,private:!1,access:{has:e=>`clanIcon`in e,get:e=>e.clanIcon,set:(e,t)=>{e.clanIcon=t}},metadata:L},I,le),Ci(this,null,ue,{kind:`accessor`,name:`clanTag`,static:!1,private:!1,access:{has:e=>`clanTag`in e,get:e=>e.clanTag,set:(e,t)=>{e.clanTag=t}},metadata:L},de,fe),Ci(this,null,pe,{kind:`accessor`,name:`deleted`,static:!1,private:!1,access:{has:e=>`deleted`in e,get:e=>e.deleted,set:(e,t)=>{e.deleted=t}},metadata:L},me,he),Ci(this,null,ge,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:L},_e,ve),Ci(this,null,ye,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:L},be,xe),Ci(null,t={value:r},e,{kind:`class`,name:r.name,metadata:L},null,n),Se=r=t.value,L&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:L})}static styles=L`
		:host {
			color: #b9bbbe;
			display: flex;
			font-size: 0.875rem;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;

			padding-top: 2px;
			margin-left: 56px;
			margin-bottom: 4px;
			align-items: center;
			line-height: 1.125rem;
			position: relative;
			white-space: pre;
			user-select: none;
		}

		:host([light-theme]) {
			color: #4f5660;
		}

		:host([compact-mode]),
		:host([deleted]) {
			margin-left: 62px;
			margin-bottom: 0;
		}

		:host:before {
			content: '';
			display: block;
			position: absolute;
			top: 50%;
			right: 100%;
			bottom: 0;
			left: -36px;
			margin-right: 4px;
			margin-top: -1px;
			margin-left: -1px;
			margin-bottom: -2px;
			border-left: 2px solid #4f545c !important;
			border-bottom: 0 solid #4f545c !important;
			border-right: 0 solid #4f545c !important;
			border-top: 2px solid #4f545c !important;
			border-top-left-radius: 6px;
		}

		:host([light-theme]):before {
			border-color: #747f8d !important;
		}

		.discord-replied-message-avatar,
		.discord-reply-badge {
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			user-select: none;
			margin-right: 0.25rem;
		}

		.discord-reply-badge {
			display: flex;
			align-items: center;
			justify-content: center;
			color: #b9bbbe;
			background: #202225;
		}

		:host([light-theme]) .discord-reply-badge {
			color: #4f5660;
			background: #e3e5e8;
		}

		:host .discord-clan-tag {
			background-color: oklab(0.431937 0.00109309 -0.0132537 / 0.8);
			color: #fff;
			font-size: 12px;
			font-weight: 500;
			margin-right: 0.25rem;
			border-radius: 4px;
			line-height: 100%;
			text-transform: uppercase;
			justify-content: space-between;
			display: inline-flex;
			align-items: center;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			height: 1.2rem;
			opacity: 0.55;
			transition: background-color 100ms ease-in-out;
			cursor: pointer;
		}

		:host .discord-clan-tag:hover {
			background-color: oklab(0.431937 0.00109309 -0.0132537 / 0.5);
		}

		:host([light-theme]) .discord-clan-tag {
			opacity: 0.65;
			background-color: hsl(0 calc(1 * 0%) 0.8%/0.09);
			color: #000;
		}

		:host([light-theme]) .discord-clan-tag:hover {
			background-color: hsl(0 calc(1 * 0%) 0.8%/0.03);
		}

		:host .discord-clan-tag svg,
		:host .discord-clan-tag img {
			display: inline-flex;
			align-items: center;
			margin-right: 0.25rem;
			right: 0.25rem;
		}

		:host .discord-clan-tag span {
			display: inline-flex;
			align-items: center;
			user-select: none;
			-webkit-user-select: none;
			line-height: 1rem !important;
		}

		.discord-application-tag {
			background-color: hsl(235, 85.6%, 64.7%);
			color: #fff;
			font-size: 0.625rem;
			margin-right: 0.25rem;
			line-height: 100%;
			text-transform: uppercase;

			/* Use flex layout to ensure both verified icon and "BOT" text are aligned to center */
			display: flex;
			align-items: center;

			/* Styling taken through Inspect Element on Discord client for Windows */
			height: 0.9375rem;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			border-radius: 0.1875rem;
		}

		:host([compact-mode]) .discord-application-tag {
			margin-right: 0.25rem;
		}

		.discord-application-tag .discord-application-tag-verified {
			width: 0.9375rem;
			height: 0.9375rem;
			margin-left: -0.1rem;
		}

		.discord-application-tag.discord-application-tag-op {
			background-color: #c9cdfb;
			color: #4752c4;
			border-radius: 0.4rem;
		}

		.discord-replied-message-username {
			flex-shrink: 0;
			font-size: inherit;
			line-height: inherit;
			margin-right: 0.25rem;
			opacity: 0.64;
			font-weight: 500;
			color: #fff;
		}

		.discord-replied-message-username:hover {
			text-decoration: underline;
			cursor: pointer;
		}

		.discord-replied-message-content {
			color: inherit;
			font-size: inherit;
			line-height: inherit;
			white-space: pre;
			text-overflow: ellipsis;
			user-select: none;
			cursor: pointer;
		}

		.discord-replied-deleted-message-content {
			color: inherit;
			font-size: inherit;
			line-height: inherit;
			white-space: pre;
			text-overflow: ellipsis;
		}

		.discord-message-edited {
			color: #72767d;
			font-size: 10px;
		}

		:host([light-theme]) .discord-message-edited {
			color: #99aab5;
		}

		.discord-replied-message-content:hover {
			color: #fff;
		}

		:host([light-theme]) .discord-replied-message-content:hover {
			color: #000;
		}

		:host .discord-replied-message-content .discord-message-edited {
			margin-left: 0.25rem;
		}

		.discord-replied-message-content-icon {
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			width: 20px;
			height: 20px;
			margin-left: 4px;
		}
	`;#e=Y(this,o,void 0);get profile(){return this.#e}set profile(e){this.#e=e}#t=(Y(this,s),Y(this,l,`User`));get author(){return this.#t}set author(e){this.#t=e}#n=(Y(this,u),Y(this,f,void 0));get avatar(){return this.#n}set avatar(e){this.#n=e}#r=(Y(this,p),Y(this,h,!1));get bot(){return this.#r}set bot(e){this.#r=e}#i=(Y(this,g),Y(this,v,!1));get server(){return this.#i}set server(e){this.#i=e}#a=(Y(this,y),Y(this,x,!1));get officialApp(){return this.#a}set officialApp(e){this.#a=e}#o=(Y(this,S),Y(this,w,!1));get op(){return this.#o}set op(e){this.#o=e}#s=(Y(this,T),Y(this,ee,!1));get verified(){return this.#s}set verified(e){this.#s=e}#c=(Y(this,D),Y(this,k,!1));get edited(){return this.#c}set edited(e){this.#c=e}#l=(Y(this,te),Y(this,j,void 0));get roleColor(){return this.#l}set roleColor(e){this.#l=e}#u=(Y(this,ne),Y(this,M,!1));get command(){return this.#u}set command(e){this.#u=e}#d=(Y(this,N),Y(this,ie,!1));get attachment(){return this.#d}set attachment(e){this.#d=e}#f=(Y(this,ae),Y(this,F,!1));get mentions(){return this.#f}set mentions(e){this.#f=e}#p=(Y(this,se),Y(this,I,void 0));get clanIcon(){return this.#p}set clanIcon(e){this.#p=e}#m=(Y(this,le),Y(this,de,void 0));get clanTag(){return this.#m}set clanTag(e){this.#m=e}#h=(Y(this,fe),Y(this,me,!1));get deleted(){return this.#h}set deleted(e){this.#h=e}#g=(Y(this,he),Y(this,_e,!1));get lightTheme(){return this.#g}set lightTheme(e){this.#g=e}#_=(Y(this,ve),Y(this,be,!1));get compactMode(){return this.#_}set compactMode(e){this.#_=e}resolveAvatar(e){return Xn[e]??e??Xn.default}render(){let e={author:this.author,bot:this.bot,verified:this.verified,officialApp:this.officialApp,op:this.op,server:this.server,roleColor:this.roleColor,clanIcon:this.clanIcon,clanTag:this.clanTag},t=Reflect.get(Zn,this.profile)??{},n={...e,...t,avatar:this.resolveAvatar(t.avatar??this.avatar)},r=ni(n.clanIcon),i=n.clanTag?.slice(0,4),a=R`
			${K(n.bot&&!n.server&&!n.officialApp,()=>R`<span class="discord-application-tag">${n.verified?Rr():``}App</span>`)}
			${K(n.server&&!n.bot&&!n.officialApp,()=>R`<span class="discord-application-tag">Server</span>`)}
			${K(n.officialApp&&!n.server&&!n.bot,()=>R`<span class="discord-application-tag">${Rr()}OFFICIAL</span>`)}
		`;return R`${K(this.compactMode||this.deleted,()=>R`<div class="discord-reply-badge">${Si()}</div>`,()=>R`<img class="discord-replied-message-avatar" src="${G(n.avatar)}" alt="${G(n.author)}" />`)}
		${K(this.deleted,()=>R`<div class="discord-replied-deleted-message-content"><em>Original message was deleted</em></div>`,()=>R`${a}
					<span class="discord-replied-message-username" style=${Wr({color:n.roleColor})}
						>${K(this.mentions,()=>`@`)}${n.author}</span
					>
					${K(n.clanIcon&&n.clanTag&&n.clanTag?.length>0,()=>R`<span class="discord-clan-tag">
								${r===`string`?R`<img
											srcset=${G(r)}
											alt=${G(i)}
											width="12"
											height="12"
											draggable="false"
										/>`:r}
								<span>${i}</span>
							</span>`)}
					<!-- display: inline -->
					<div class="discord-replied-message-content"
						><slot></slot>${K(this.edited,()=>R`<span class="discord-message-edited">(edited)</span>`)}</div
					>
					${K(this.command,()=>bi({class:`discord-replied-message-content-icon`}),()=>K(this.attachment,()=>vi({class:`discord-replied-message-content-icon`})))}`)}`}constructor(){super(...arguments),Y(this,xe)}static{Y(r,n)}};return r})(),Ti=z`
	<path d="M4.61241 0L6 0.845294L1.38759 10L0 9.15471L4.61241 0Z" fill="currentColor" />
`;function Ei(e={}){return R`<svg ${q(e)} class="discord-command-icon" aria-hidden="false" width="6" height="10" viewBox="0 0 6 10" fill="none">
		${Ti}
	</svg>`}var Di=z`
	<path fill="currentColor" d="M2.06 7.61c-.25.95.31 1.92 1.26 2.18l4.3 1.15c.94.25 1.91-.31 2.17-1.26l1.15-4.3c.25-.94-.31-1.91-1.26-2.17l-4.3-1.15c-.94-.25-1.91.31-2.17 1.26l-1.15 4.3ZM12.98 7.87a2 2 0 0 0 1.75 2.95H20a2 2 0 0 0 1.76-2.95l-2.63-4.83a2 2 0 0 0-3.51 0l-2.63 4.83ZM5.86 13.27a.89.89 0 0 1 1.28 0l.75.77a.9.9 0 0 0 .54.26l1.06.12c.5.06.85.52.8 1.02l-.13 1.08c-.02.2.03.42.14.6l.56.92c.27.43.14 1-.28 1.26l-.9.58a.92.92 0 0 0-.37.48l-.36 1.02a.9.9 0 0 1-1.15.57l-1-.36a.89.89 0 0 0-.6 0l-1 .36a.9.9 0 0 1-1.15-.57l-.36-1.02a.92.92 0 0 0-.37-.48l-.9-.58a.93.93 0 0 1-.28-1.26l.56-.93c.11-.17.16-.38.14-.59l-.12-1.08c-.06-.5.3-.96.8-1.02l1.05-.12a.9.9 0 0 0 .54-.26l.75-.77ZM18.52 13.71a1.1 1.1 0 0 0-2.04 0l-.46 1.24c-.19.5-.57.88-1.07 1.07l-1.24.46a1.1 1.1 0 0 0 0 2.04l1.24.46c.5.19.88.57 1.07 1.07l.46 1.24c.35.95 1.7.95 2.04 0l.46-1.24c.19-.5.57-.88 1.07-1.07l1.24-.46a1.1 1.1 0 0 0 0-2.04l-1.24-.46a1.8 1.8 0 0 1-1.07-1.07l-.46-1.24Z">
	</path>
`;function Oi(e={}){return R`<svg ${q(e)} class="discord-command-icon-name" aria-hidden="false" width="10" height="10" viewBox="0 0 24 24" fill="none">
		${Di}
	</svg>`}var ki=z`
	<path fill="currentColor" d="M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z"></path>
`;function Ai(e={}){return R`<svg ${q(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		${ki}
	</svg>`}var ji=z`
	<path fill="color-mix( in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%" d="M12 22a10 10 0 1 0-8.45-4.64c.13.19.11.44-.04.61l-2.06 2.37A1 1 0 0 0 2.2 22H12Z" class="">
    </path>
`;function Mi(e={}){return R`<svg ${q(e)} aria-hidden="false" width="16" height="16" viewBox="0 0 24 24" fill="none">${ji}</svg>`}var Ni=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},X=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Pi=(()=>{let e=[V(`discord-command`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,ee=[],D=[],O,k=[],te=[],A,j=[],ne=[],re,M=[],N=[],P,ie=[],ae=[],oe,F=[],se=[],ce,I=[],le=[],ue,de=[],fe=[],pe,me=[],he=[],ge,_e=[],ve=[],ye,be=[],xe=[],Se,Ce=[],we=[],Te,Ee=[],De=[];var Oe=class extends i{static{r=this}static{let L=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({attribute:`profile`})],c=[H({attribute:`author`})],d=[H({attribute:`avatar`})],m=[H({attribute:`role-color`})],_=[H({attribute:`command`})],b=[H({attribute:`type`})],C=[H({attribute:`context-user-profile`})],E=[H({attribute:`context-user-name`})],O=[H({attribute:`context-user-image`})],A=[H({attribute:`context-user-role-color`})],re=[H({type:Boolean,attribute:`context-user-bot`})],P=[H({type:Boolean,attribute:`context-user-bot-verified`})],oe=[H({type:Boolean,attribute:`context-command-reply`})],ce=[H({type:Boolean,attribute:`context-attachment-reply`})],ue=[H({type:String,attribute:`context-message-reply`})],pe=[H({type:Boolean,attribute:`context-message-deleted`})],ge=[H({type:Boolean,attribute:`context-user-application-official`})],ye=[H({type:Boolean,attribute:`context-user-server`})],Se=[U({context:mr}),H({type:Boolean,reflect:!0,attribute:`compact-mode`})],Te=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],Ni(this,null,a,{kind:`accessor`,name:`profile`,static:!1,private:!1,access:{has:e=>`profile`in e,get:e=>e.profile,set:(e,t)=>{e.profile=t}},metadata:L},o,s),Ni(this,null,c,{kind:`accessor`,name:`author`,static:!1,private:!1,access:{has:e=>`author`in e,get:e=>e.author,set:(e,t)=>{e.author=t}},metadata:L},l,u),Ni(this,null,d,{kind:`accessor`,name:`avatar`,static:!1,private:!1,access:{has:e=>`avatar`in e,get:e=>e.avatar,set:(e,t)=>{e.avatar=t}},metadata:L},f,p),Ni(this,null,m,{kind:`accessor`,name:`roleColor`,static:!1,private:!1,access:{has:e=>`roleColor`in e,get:e=>e.roleColor,set:(e,t)=>{e.roleColor=t}},metadata:L},h,g),Ni(this,null,_,{kind:`accessor`,name:`command`,static:!1,private:!1,access:{has:e=>`command`in e,get:e=>e.command,set:(e,t)=>{e.command=t}},metadata:L},v,y),Ni(this,null,b,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:L},x,S),Ni(this,null,C,{kind:`accessor`,name:`contextUserProfile`,static:!1,private:!1,access:{has:e=>`contextUserProfile`in e,get:e=>e.contextUserProfile,set:(e,t)=>{e.contextUserProfile=t}},metadata:L},w,T),Ni(this,null,E,{kind:`accessor`,name:`contextUserName`,static:!1,private:!1,access:{has:e=>`contextUserName`in e,get:e=>e.contextUserName,set:(e,t)=>{e.contextUserName=t}},metadata:L},ee,D),Ni(this,null,O,{kind:`accessor`,name:`contextUserAvatar`,static:!1,private:!1,access:{has:e=>`contextUserAvatar`in e,get:e=>e.contextUserAvatar,set:(e,t)=>{e.contextUserAvatar=t}},metadata:L},k,te),Ni(this,null,A,{kind:`accessor`,name:`contextUserRoleColor`,static:!1,private:!1,access:{has:e=>`contextUserRoleColor`in e,get:e=>e.contextUserRoleColor,set:(e,t)=>{e.contextUserRoleColor=t}},metadata:L},j,ne),Ni(this,null,re,{kind:`accessor`,name:`contextUserBot`,static:!1,private:!1,access:{has:e=>`contextUserBot`in e,get:e=>e.contextUserBot,set:(e,t)=>{e.contextUserBot=t}},metadata:L},M,N),Ni(this,null,P,{kind:`accessor`,name:`contextUserBotVerified`,static:!1,private:!1,access:{has:e=>`contextUserBotVerified`in e,get:e=>e.contextUserBotVerified,set:(e,t)=>{e.contextUserBotVerified=t}},metadata:L},ie,ae),Ni(this,null,oe,{kind:`accessor`,name:`contextCommandReply`,static:!1,private:!1,access:{has:e=>`contextCommandReply`in e,get:e=>e.contextCommandReply,set:(e,t)=>{e.contextCommandReply=t}},metadata:L},F,se),Ni(this,null,ce,{kind:`accessor`,name:`contextAttachmentReply`,static:!1,private:!1,access:{has:e=>`contextAttachmentReply`in e,get:e=>e.contextAttachmentReply,set:(e,t)=>{e.contextAttachmentReply=t}},metadata:L},I,le),Ni(this,null,ue,{kind:`accessor`,name:`contextMessageReply`,static:!1,private:!1,access:{has:e=>`contextMessageReply`in e,get:e=>e.contextMessageReply,set:(e,t)=>{e.contextMessageReply=t}},metadata:L},de,fe),Ni(this,null,pe,{kind:`accessor`,name:`contextMessageDeleted`,static:!1,private:!1,access:{has:e=>`contextMessageDeleted`in e,get:e=>e.contextMessageDeleted,set:(e,t)=>{e.contextMessageDeleted=t}},metadata:L},me,he),Ni(this,null,ge,{kind:`accessor`,name:`contextUserOfficialApplication`,static:!1,private:!1,access:{has:e=>`contextUserOfficialApplication`in e,get:e=>e.contextUserOfficialApplication,set:(e,t)=>{e.contextUserOfficialApplication=t}},metadata:L},_e,ve),Ni(this,null,ye,{kind:`accessor`,name:`contextUserServer`,static:!1,private:!1,access:{has:e=>`contextUserServer`in e,get:e=>e.contextUserServer,set:(e,t)=>{e.contextUserServer=t}},metadata:L},be,xe),Ni(this,null,Se,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:L},Ce,we),Ni(this,null,Te,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:L},Ee,De),Ni(null,t={value:r},e,{kind:`class`,name:r.name,metadata:L},null,n),Oe=r=t.value,L&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:L})}static styles=[wi.styles,L`
			:host .discord-slash-command-name {
				color: color-mix(in oklab, hsl(200 calc(1 * 100%) 49.4% / 1) 100%, black 0%) !important;
				font-weight: 500;
				background-color: #3c4270;
				border-radius: 3px;
				display: flex;
				padding: 0 5px;
				align-items: center;
				gap: 2px;
				cursor: default;
			}

			:host .discord-slash-command-name:hover {
				color: #fffffd !important;
				background-color: #5865f2;
			}

			.discord-context-command-name {
				color: color-mix(in oklab, hsl(200 calc(1 * 100%) 49.4% / 1) 100%, black 0%) !important;
				opacity: 0.64;
				cursor: default;
				font-weight: 500;
			}

			.discord-arrow-right-icon {
				transform: rotate(267deg);
				width: 12px;
				height: 12px;
				fill: none;
				margin-right: 2px;
				margin-left: 2px;
				margin-top: 3px;
			}

			.discord-context-user {
				display: flex;
				align-items: center;
				margin-top: 3px;
			}

			.discord-message-margintop {
				margin-top: 3px;
			}

			:host .discord-message-deleted {
				color: rgb(185, 187, 190) !important;
				cursor: default;
			}

			:host .discord-replied-message-username {
				margin-right: 0;
			}

			:host([light-theme]) .discord-replied-message-username {
				color: rgb(46, 51, 56);
			}

			:host([compact-mode]) .discord-context-user {
				display: flex;
				align-items: center;
				margin: 0 !important;
			}

			:host([compact-mode]) .discord-message-margintop {
				margin-top: 0 !important;
			}
		`];#e=X(this,o,void 0);get profile(){return this.#e}set profile(e){this.#e=e}#t=(X(this,s),X(this,l,`User`));get author(){return this.#t}set author(e){this.#t=e}#n=(X(this,u),X(this,f,void 0));get avatar(){return this.#n}set avatar(e){this.#n=e}#r=(X(this,p),X(this,h,void 0));get roleColor(){return this.#r}set roleColor(e){this.#r=e}#i=(X(this,g),X(this,v,void 0));get command(){return this.#i}set command(e){this.#i=e}#a=(X(this,y),X(this,x,`slash_command`));get type(){return this.#a}set type(e){this.#a=e}#o=(X(this,S),X(this,w,void 0));get contextUserProfile(){return this.#o}set contextUserProfile(e){this.#o=e}#s=(X(this,T),X(this,ee,`User`));get contextUserName(){return this.#s}set contextUserName(e){this.#s=e}#c=(X(this,D),X(this,k,void 0));get contextUserAvatar(){return this.#c}set contextUserAvatar(e){this.#c=e}#l=(X(this,te),X(this,j,void 0));get contextUserRoleColor(){return this.#l}set contextUserRoleColor(e){this.#l=e}#u=(X(this,ne),X(this,M,!1));get contextUserBot(){return this.#u}set contextUserBot(e){this.#u=e}#d=(X(this,N),X(this,ie,!1));get contextUserBotVerified(){return this.#d}set contextUserBotVerified(e){this.#d=e}#f=(X(this,ae),X(this,F,!1));get contextCommandReply(){return this.#f}set contextCommandReply(e){this.#f=e}#p=(X(this,se),X(this,I,!1));get contextAttachmentReply(){return this.#p}set contextAttachmentReply(e){this.#p=e}#m=(X(this,le),X(this,de,void 0));get contextMessageReply(){return this.#m}set contextMessageReply(e){this.#m=e}#h=(X(this,fe),X(this,me,!1));get contextMessageDeleted(){return this.#h}set contextMessageDeleted(e){this.#h=e}#g=(X(this,he),X(this,_e,!1));get contextUserOfficialApplication(){return this.#g}set contextUserOfficialApplication(e){this.#g=e}#_=(X(this,ve),X(this,be,!1));get contextUserServer(){return this.#_}set contextUserServer(e){this.#_=e}#v=(X(this,xe),X(this,Ce,!1));get compactMode(){return this.#v}set compactMode(e){this.#v=e}#y=(X(this,we),X(this,Ee,!1));get lightTheme(){return this.#y}set lightTheme(e){this.#y=e}validCommandTypes=(X(this,De),new Set([`user_command`,`message_command`,`slash_command`]));checkType(){if(this.type){if(typeof this.type!=`string`)throw TypeError("DiscordCommand `type` prop must be a string.");if(!this.validCommandTypes.has(this.type))throw RangeError("DiscordCommand `type` prop must be one of: 'uer_command', 'message_command' or 'slash_command'")}}resolveAvatar(e){return Xn[e]??e??Xn.default}render(){this.checkType();let e={author:this.author,bot:!1,verified:!1,server:!1,roleColor:this.roleColor},t=Reflect.get(Zn,this.profile)??{},n={...e,...t,avatar:this.resolveAvatar(t.avatar??this.avatar)},r={author:this.contextUserName,bot:this.contextUserBot,verified:this.contextUserBotVerified,server:!1,roleColor:this.contextUserRoleColor},i=Reflect.get(Zn,this.contextUserProfile)??{},a={...r,...i,avatar:this.resolveAvatar(i.avatar??this.contextUserAvatar)},o=this.contextMessageDeleted?R`<em class="discord-message-deleted">Original message was deleted</em>`:this.contextMessageReply;return R`
			${K(this.compactMode,()=>R`<div class="discord-reply-badge">${Ei()}</div>`,()=>R`<img class="discord-replied-message-avatar" src="${G(n.avatar)}" alt="${G(n.author)}" />`)}
			<span class="discord-replied-message-username" style=${Wr({color:n.roleColor??``})}>${n.author}</span>
			<span> used </span>
			${K(this.type===`slash_command`,()=>R`<div class="discord-replied-message-content discord-slash-command-name">
						${Oi()}<span>${this.command}</span>
					</div>`)}
			${K(this.type===`user_command`,()=>R`<div class="discord-replied-message-content discord-context-command-name"><span>${this.command}</span></div>
						${Ai({class:`discord-arrow-right-icon`})}
						<div class="discord-context-user">
							${K(!this.compactMode,()=>R`<img
										class="discord-replied-message-avatar"
										src="${G(a.avatar)}"
										alt="${G(a.author)}"
									/>`)}
							<span class="discord-replied-message-username" style=${Wr({color:a.roleColor??``})}
								>${a.author}</span
							>
						</div>`)}
			${K(this.type===`message_command`,()=>R`<div class="discord-replied-message-content discord-context-command-name"><span>${this.command}</span></div>
						${Ai({class:`discord-arrow-right-icon`})}
						${K(!this.contextMessageDeleted,()=>R`<div class="discord-context-user">
									${K(!this.compactMode,()=>K(!this.contextUserOfficialApplication,()=>R`<img
													class="discord-replied-message-avatar"
													src="${G(a.avatar)}"
													alt="${G(a.author)}"
												/>`,()=>R`<img
													class="discord-replied-message-avatar"
													src="${G(Xn.blue)}"
													alt="OFFICIALAPPLICATION"
												/>`))}
									${K(a.bot,()=>R`<span class="discord-application-tag">${a.verified?Rr():``}App</span>`,()=>K(this.contextUserServer,()=>R`<span class="discord-application-tag">SERVER</span>`,()=>K(this.contextUserOfficialApplication,()=>R`<span class="discord-application-tag">${Rr()}OFFICIAL</span>`)))}
									<span class="discord-replied-message-username" style=${Wr({color:a.roleColor??``})}
										>${a.author}</span
									><span></span>
								</div>`,()=>K(this.contextMessageDeleted,()=>Mi({class:`discord-message-margintop`,style:`margin-right: 3px;`})))}
						<div class="discord-replied-message-content discord-message-margintop">${o}</div>
						${K(this.contextCommandReply&&!this.contextMessageDeleted,()=>bi({class:`discord-replied-message-content-icon discord-message-margintop`}),()=>K(this.contextAttachmentReply,()=>vi({class:`discord-replied-message-content-icon discord-message-margintop`})))} `)}
		`}static{X(r,n)}};return r})(),Fi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Ii=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Li=(()=>{let e=[V(`discord-custom-emoji`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H()],d=[H({attribute:!1})],m=[H({type:Boolean,attribute:`embed-emoji`})],_=[H({type:Boolean,attribute:`jumbo`})],Fi(this,null,a,{kind:`accessor`,name:`name`,static:!1,private:!1,access:{has:e=>`name`in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:x},o,s),Fi(this,null,c,{kind:`accessor`,name:`url`,static:!1,private:!1,access:{has:e=>`url`in e,get:e=>e.url,set:(e,t)=>{e.url=t}},metadata:x},l,u),Fi(this,null,d,{kind:`accessor`,name:`customEmojisMap`,static:!1,private:!1,access:{has:e=>`customEmojisMap`in e,get:e=>e.customEmojisMap,set:(e,t)=>{e.customEmojisMap=t}},metadata:x},f,p),Fi(this,null,m,{kind:`accessor`,name:`embedEmoji`,static:!1,private:!1,access:{has:e=>`embedEmoji`in e,get:e=>e.embedEmoji,set:(e,t)=>{e.embedEmoji=t}},metadata:x},h,g),Fi(this,null,_,{kind:`accessor`,name:`jumbo`,static:!1,private:!1,access:{has:e=>`jumbo`in e,get:e=>e.jumbo,set:(e,t)=>{e.jumbo=t}},metadata:x},v,y),Fi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=L`
		.discord-custom-emoji {
			display: inline-block;
			cursor: pointer;
		}

		.discord-custom-emoji .discord-custom-emoji-image {
			object-fit: contain;
			width: 1.375rem;
			height: 1.375rem;
			vertical-align: bottom;
		}

		.discord-custom-emoji .discord-custom-jumbo-emoji-image {
			width: 3rem;
			height: 3rem;
			min-height: 3rem;
		}

		.discord-embed-custom-emoji {
			display: inline-block;
		}

		.discord-embed-custom-emoji .discord-embed-custom-emoji-image {
			width: 18px;
			height: 18px;
			vertical-align: bottom;
		}
	`;#e=Ii(this,o,void 0);get name(){return this.#e}set name(e){this.#e=e}#t=(Ii(this,s),Ii(this,l,void 0));get url(){return this.#t}set url(e){this.#t=e}#n=(Ii(this,u),Ii(this,f,{}));get customEmojisMap(){return this.#n}set customEmojisMap(e){this.#n=e}#r=(Ii(this,p),Ii(this,h,void 0));get embedEmoji(){return this.#r}set embedEmoji(e){this.#r=e}#i=(Ii(this,g),Ii(this,v,void 0));get jumbo(){return this.#i}set jumbo(e){this.#i=e}willUpdate(){if(!this.url&&this.name){let e=ti(this.name)??this.customEmojisMap[this.name];e&&(this.url??=e.url??``,this.embedEmoji??=e.embedEmoji??!1)}}render(){let e=`:${this.name}:`;return R`<span
			class=${W({"discord-embed-custom-emoji":this.embedEmoji,"discord-custom-emoji":!this.embedEmoji})}
			><img
				aria-label=${e}
				src=${G(this.url)}
				alt=${e}
				draggable="false"
				class=${W({"discord-embed-custom-emoji-image":this.embedEmoji,"discord-custom-emoji-image":!this.embedEmoji,"discord-custom-jumbo-emoji-image":this.jumbo})}
		/></span> `}constructor(){super(...arguments),Ii(this,y)}static{Ii(r,n)}};return r})(),Ri=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},zi=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Bi=(()=>{let e=[V(`discord-embed`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,ee=[],D=[],O,k=[],te=[],A,j=[],ne=[],re,M=[],N=[],P,ie=[],ae=[];var oe=class extends i{static{r=this}static{let F=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H({attribute:`author-name`})],d=[H({attribute:`author-image`})],m=[H({attribute:`author-url`})],_=[H({attribute:`embed-title`})],b=[H({attribute:!1})],C=[H()],E=[H()],O=[H()],A=[H()],re=[H()],P=[U({context:J,subscribe:!0}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],Ri(this,null,a,{kind:`accessor`,name:`color`,static:!1,private:!1,access:{has:e=>`color`in e,get:e=>e.color,set:(e,t)=>{e.color=t}},metadata:F},o,s),Ri(this,null,c,{kind:`accessor`,name:`authorName`,static:!1,private:!1,access:{has:e=>`authorName`in e,get:e=>e.authorName,set:(e,t)=>{e.authorName=t}},metadata:F},l,u),Ri(this,null,d,{kind:`accessor`,name:`authorImage`,static:!1,private:!1,access:{has:e=>`authorImage`in e,get:e=>e.authorImage,set:(e,t)=>{e.authorImage=t}},metadata:F},f,p),Ri(this,null,m,{kind:`accessor`,name:`authorUrl`,static:!1,private:!1,access:{has:e=>`authorUrl`in e,get:e=>e.authorUrl,set:(e,t)=>{e.authorUrl=t}},metadata:F},h,g),Ri(this,null,_,{kind:`accessor`,name:`embedTitle`,static:!1,private:!1,access:{has:e=>`embedTitle`in e,get:e=>e.embedTitle,set:(e,t)=>{e.embedTitle=t}},metadata:F},v,y),Ri(this,null,b,{kind:`accessor`,name:`embedEmojisMap`,static:!1,private:!1,access:{has:e=>`embedEmojisMap`in e,get:e=>e.embedEmojisMap,set:(e,t)=>{e.embedEmojisMap=t}},metadata:F},x,S),Ri(this,null,C,{kind:`accessor`,name:`url`,static:!1,private:!1,access:{has:e=>`url`in e,get:e=>e.url,set:(e,t)=>{e.url=t}},metadata:F},w,T),Ri(this,null,E,{kind:`accessor`,name:`thumbnail`,static:!1,private:!1,access:{has:e=>`thumbnail`in e,get:e=>e.thumbnail,set:(e,t)=>{e.thumbnail=t}},metadata:F},ee,D),Ri(this,null,O,{kind:`accessor`,name:`image`,static:!1,private:!1,access:{has:e=>`image`in e,get:e=>e.image,set:(e,t)=>{e.image=t}},metadata:F},k,te),Ri(this,null,A,{kind:`accessor`,name:`video`,static:!1,private:!1,access:{has:e=>`video`in e,get:e=>e.video,set:(e,t)=>{e.video=t}},metadata:F},j,ne),Ri(this,null,re,{kind:`accessor`,name:`provider`,static:!1,private:!1,access:{has:e=>`provider`in e,get:e=>e.provider,set:(e,t)=>{e.provider=t}},metadata:F},M,N),Ri(this,null,P,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:F},ie,ae),Ri(null,t={value:r},e,{kind:`class`,name:r.name,metadata:F},null,n),oe=r=t.value,F&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:F})}static styles=L`
		:host {
			color: #dcddde;
			display: flex;
			font-size: 13px;
			line-height: 150%;
			margin-bottom: 8px;
			margin-top: 8px;
		}

		:host([light-theme]) {
			color: #2e3338;
		}

		:host .discord-left-border {
			background-color: #202225;
			border-radius: 4px 0 0 4px;
			flex-shrink: 0;
			width: 4px;
		}

		:host([light-theme]) .discord-left-border {
			background-color: #e3e5e8;
		}

		:host .discord-embed-root {
			display: grid;
			grid-auto-flow: row;
			grid-row-gap: 0.25rem;
			min-height: 0;
			min-width: 0;
			text-indent: 0;
		}

		:host .discord-embed-wrapper {
			background-color: #2f3136;
			max-width: 520px;
			border: 1px solid rgba(46, 48, 54, 0.6);
			border-radius: 0 4px 4px 0;
			justify-self: start;
			align-self: start;
			display: grid;
			box-sizing: border-box;
		}

		:host([light-theme]) .discord-embed-wrapper {
			background-color: rgb(242, 243, 245);
			border-color: rgba(205, 205, 205, 0.3);
		}

		:host .discord-embed-wrapper .discord-embed-grid {
			display: inline-grid;
			grid-template-columns: auto -webkit-min-content;
			grid-template-columns: auto min-content;
			grid-template-columns: auto;
			grid-template-rows: auto;
			padding: 0.5rem 1rem 1rem 0.75rem;
		}

		:host .discord-embed-thumbnail {
			border-radius: 4px;
			flex-shrink: 0;
			grid-column: 2/2;
			grid-row: 1/8;
			justify-self: end;
			margin-left: 16px;
			margin-top: 8px;
			max-height: 80px;
			max-width: 80px;
			object-fit: contain;
			object-position: top center;
		}

		:host .discord-embed-author {
			-webkit-box-align: center;
			align-items: center;
			color: #fff;
			font-size: 14px;
			display: flex;
			font-weight: 600;
			grid-column: 1 / 1;
			margin-top: 8px;
			min-width: 0;
		}

		:host([light-theme]) .discord-embed-author {
			color: #060607;
		}

		:host .discord-embed-author a {
			color: #fff;
			font-weight: 600;
			text-decoration: none;
		}

		:host .discord-embed-author a:hover {
			text-decoration: underline;
		}

		:host([light-theme]) .discord-embed-author a {
			color: #060607;
		}

		:host .discord-embed-author .discord-author-image {
			border-radius: 50%;
			height: 24px;
			margin-right: 8px;
			width: 24px;
		}

		:host .discord-embed-author-block,
		:host .discord-embed-author-block > span {
			max-width: 95%;
		}

		:host .discord-embed-provider {
			font-size: 0.75rem;
			line-height: 1rem;
			font-weight: 400;
			grid-column: 1/1;
			margin-top: 8px;
			unicode-bidi: plaintext;
			text-align: left;
		}

		:host([light-theme]) .discord-embed-provider {
			color: #4f545c;
		}

		:host .discord-embed-title {
			-webkit-box-align: center;
			align-items: center;
			color: #fff;
			display: inline-block;
			font-size: 1rem;
			font-weight: 600;
			grid-column: 1 / 1;
			margin-top: 8px;
			min-width: 0;
		}

		:host([light-theme]) .discord-embed-title {
			color: #060607;
		}

		:host .discord-embed-title a {
			color: #00aff4;
			font-weight: 600;
			text-decoration: none;
		}

		:host .discord-embed-title a:hover {
			text-decoration: underline;
		}

		:host .discord-embed-image {
			border-radius: 4px;
			max-width: 300px;
			max-height: 300px;
		}

		:host .discord-embed-media {
			border-radius: 4px;
			contain: paint;
			display: block;
			grid-column: 1/1;
			margin-top: 16px;
		}

		:host .discord-embed-media.discord-embed-media-video {
			height: 225px;
		}

		:host .discord-embed.media .discord-embed-image {
			overflow: hidden;
			position: relative;
			user-select: text;
		}

		:host .discord-embed-media .discord-embed-video {
			-webkit-box-align: center;
			-webkit-box-pack: center;
			align-items: center;
			border-radius: 0;
			cursor: pointer;
			display: flex;
			height: 100%;
			justify-content: center;
			max-height: 100%;
			width: 100%;

			width: 400px;
			height: 225px;
			left: 0px;
			top: 0px;
		}

		.discord-embed-custom-emoji {
			display: inline-block;
		}

		.discord-embed-custom-emoji .discord-embed-custom-emoji-image {
			width: 18px;
			height: 18px;
			vertical-align: bottom;
		}

		slot[name='footer']::slotted(*) {
			grid-column: 1/3;
			grid-row: auto/auto;
		}
	`;#e=zi(this,o,void 0);get color(){return this.#e}set color(e){this.#e=e}#t=(zi(this,s),zi(this,l,void 0));get authorName(){return this.#t}set authorName(e){this.#t=e}#n=(zi(this,u),zi(this,f,void 0));get authorImage(){return this.#n}set authorImage(e){this.#n=e}#r=(zi(this,p),zi(this,h,void 0));get authorUrl(){return this.#r}set authorUrl(e){this.#r=e}#i=(zi(this,g),zi(this,v,void 0));get embedTitle(){return this.#i}set embedTitle(e){this.#i=e}#a=(zi(this,y),zi(this,x,{}));get embedEmojisMap(){return this.#a}set embedEmojisMap(e){this.#a=e}#o=(zi(this,S),zi(this,w,void 0));get url(){return this.#o}set url(e){this.#o=e}#s=(zi(this,T),zi(this,ee,void 0));get thumbnail(){return this.#s}set thumbnail(e){this.#s=e}#c=(zi(this,D),zi(this,k,void 0));get image(){return this.#c}set image(e){this.#c=e}#l=(zi(this,te),zi(this,j,void 0));get video(){return this.#l}set video(e){this.#l=e}#u=(zi(this,ne),zi(this,M,void 0));get provider(){return this.#u}set provider(e){this.#u=e}#d=(zi(this,N),zi(this,ie,!1));get lightTheme(){return this.#d}set lightTheme(e){this.#d=e}render(){let e=this.parseTitle(this.authorName),t=this.parseTitle(this.embedTitle);return R`<div style=${Wr({"background-color":this.color})} class="discord-left-border"></div>
			<div class="discord-embed-root">
				<div class="discord-embed-wrapper">
					<div class="discord-embed-grid">
						${K(this.provider,()=>R`<div class="discord-embed-provider">${this.provider}</div>`)}
						${K(e,()=>R`<div class="discord-embed-author">
									${K(this.authorImage,()=>R`<img src=${G(this.authorImage)} alt="" class="discord-author-image" />`)}
									${K(this.authorUrl,()=>R`<a
												href=${G(this.authorUrl)}
												target="_blank"
												rel="noopener noreferrer"
												class="discord-embed-author-block"
											>
												<span class="discord-embed-author-block">${e}</span>
											</a>`,()=>R`<span class="discord-embed-author-block">${e}</span>`)}
								</div>`)}
						${K(t,()=>R`<div class="discord-embed-title">
									${this.url?R`<a href="${this.url}" target="_blank" rel="noopener noreferrer"> ${t} </a>`:R`${t}`}
								</div>`)}
						<slot name="description"></slot>
						<slot name="fields"></slot>
						${K(this.image||this.video,()=>R`<div class=${W({"discord-embed-media":!0,"discord-embed-media-video":!!this.video})}>
									${this.renderMedia()}
								</div>`)}
						${K(this.thumbnail,()=>R`<img src=${G(this.thumbnail)} alt="" class="discord-embed-thumbnail" />`)}
						<slot name="footer"></slot>
					</div>
				</div>
			</div>`}renderMedia(){return this.video?R`
				<video
					controls
					muted
					preload="none"
					poster=${G(this.image)}
					src=${G(this.video)}
					height="225"
					width="400"
					class="discord-embed-video"
				>
					<img src=${G(this.image)} alt="Discord embed media" class="discord-embed-image" />
				</video>
			`:this.image?R`<img src=${G(this.image)} alt="Discord embed media" class="discord-embed-image" />`:null}parseTitle(e){if(!e)return null;let t=[],n=``;for(let r of e.split(`
`)){for(let e of r.split(` `)){let r=ti(e)??this.embedEmojisMap[e]??{};r.name?t.push(R`<discord-custom-emoji name=${r.name} url=${G(r.url)} embed-emoji></discord-custom-emoji>`):n+=`${e} `,n===` `&&t.push(R`<br />`)}t.push(n),n=``}return t.map(e=>typeof e==`string`?R`<span>${e}</span>`:e)}constructor(){super(...arguments),zi(this,ae)}static{zi(r,n)}};return r})(),Vi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Hi=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ui=(()=>{let e=[V(`discord-embed-description`)],t,n=[],r,i=B;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Vi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=L`
		:host {
			font-size: 0.875rem;
			font-weight: 400;
			grid-column: 1/1;
			line-height: 1.125rem;
			margin-top: 8px;
			min-width: 0;
		}
	`;render(){return R`<slot></slot>`}static{Hi(r,n)}};return r})(),Wi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Gi=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ki=(()=>{let e=[V(`discord-embed-field`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({reflect:!0,attribute:`field-title`})],c=[H({attribute:!1})],d=[H({type:Boolean,reflect:!0,attribute:`inline`})],m=[H({type:Number,reflect:!0,attribute:`inline-index`})],_=[U({context:J,subscribe:!0}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],Wi(this,null,a,{kind:`accessor`,name:`fieldTitle`,static:!1,private:!1,access:{has:e=>`fieldTitle`in e,get:e=>e.fieldTitle,set:(e,t)=>{e.fieldTitle=t}},metadata:x},o,s),Wi(this,null,c,{kind:`accessor`,name:`embedFieldEmojisMap`,static:!1,private:!1,access:{has:e=>`embedFieldEmojisMap`in e,get:e=>e.embedFieldEmojisMap,set:(e,t)=>{e.embedFieldEmojisMap=t}},metadata:x},l,u),Wi(this,null,d,{kind:`accessor`,name:`inline`,static:!1,private:!1,access:{has:e=>`inline`in e,get:e=>e.inline,set:(e,t)=>{e.inline=t}},metadata:x},f,p),Wi(this,null,m,{kind:`accessor`,name:`inlineIndex`,static:!1,private:!1,access:{has:e=>`inlineIndex`in e,get:e=>e.inlineIndex,set:(e,t)=>{e.inlineIndex=t}},metadata:x},h,g),Wi(this,null,_,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:x},v,y),Wi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=L`
		:host {
			font-size: 0.875rem;
			line-height: 1.125rem;
			min-width: 0;
			font-weight: 400;
			grid-column: 1/13;
			word-break: break-word;
		}

		:host .discord-field-title {
			color: #ffffff;
			font-weight: 600;
			font-size: 0.875rem;
			line-height: 1.125rem;
			min-width: 0;
			margin-bottom: 2px;
		}

		:host .discord-inline-field {
			flex-grow: 1;
			flex-basis: auto;
			min-width: 150px;
		}

		:host([light-theme]) .discord-field-title {
			color: #313338;
		}
	`;#e=Gi(this,o,void 0);get fieldTitle(){return this.#e}set fieldTitle(e){this.#e=e}#t=(Gi(this,s),Gi(this,l,{}));get embedFieldEmojisMap(){return this.#t}set embedFieldEmojisMap(e){this.#t=e}#n=(Gi(this,u),Gi(this,f,!1));get inline(){return this.#n}set inline(e){this.#n=e}#r=(Gi(this,p),Gi(this,h,void 0));get inlineIndex(){return this.#r}set inlineIndex(e){this.#r=e}#i=(Gi(this,g),Gi(this,v,!1));get lightTheme(){return this.#i}set lightTheme(e){this.#i=e}validInlineIndices=(Gi(this,y),new Set([1,2,3]));checkInlineIndex(){if(this.inlineIndex){let e=Number(this.inlineIndex);if(!Number.isNaN(e)&&!this.validInlineIndices.has(e))throw RangeError("DiscordEmbedField `inlineIndex` prop must be one of: 1, 2, or 3")}}render(){this.checkInlineIndex();let e=this.parseTitle(this.fieldTitle);return R`${K(e,()=>R`<div class="discord-field-title">${[...e]}</div>`)}<slot></slot>`}parseTitle(e){if(!e)return null;let t=[],n=``;for(let r of e.split(`
`)){for(let e of r.split(` `)){let r=ti(e)??this.embedFieldEmojisMap[e]??{};r.name?t.push(R`<discord-custom-emoji name=${r.name} url=${G(r.url)} embed-emoji></discord-custom-emoji>`):n+=`${e} `,n===` `&&t.push(R`<br />`)}t.push(n),n=``}return t.map(e=>typeof e==`string`?R`<span>${e}</span>`:e)}static{Gi(r,n)}};return r})(),qi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Ji=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Yi=(()=>{let e=[V(`discord-embed-fields`)],t,n=[],r,i=B;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;qi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=L`
		:host {
			display: grid;
			grid-column: 1/1;
			margin-top: 8px;
			grid-gap: 8px;
		}

		::slotted([inline-index='1']) {
			grid-column: 1/5 !important;
		}

		::slotted([inline-index='2']) {
			grid-column: 5/9 !important;
		}

		::slotted([inline-index='3']) {
			grid-column: 9/13 !important;
		}
	`;render(){return R`<slot></slot>`}static{Ji(r,n)}};return r})(),Xi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Zi=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Qi=(()=>{let e=[V(`discord-embed-footer`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[];var _=class extends i{static{r=this}static{let v=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({attribute:`footer-image`})],c=[H({attribute:`footer-image-alt`})],d=[H({type:String,reflect:!0,converter:e=>Zr(e),attribute:!0})],m=[U({context:J,subscribe:!0}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],Xi(this,null,a,{kind:`accessor`,name:`footerImage`,static:!1,private:!1,access:{has:e=>`footerImage`in e,get:e=>e.footerImage,set:(e,t)=>{e.footerImage=t}},metadata:v},o,s),Xi(this,null,c,{kind:`accessor`,name:`footerImageAlt`,static:!1,private:!1,access:{has:e=>`footerImageAlt`in e,get:e=>e.footerImageAlt,set:(e,t)=>{e.footerImageAlt=t}},metadata:v},l,u),Xi(this,null,d,{kind:`accessor`,name:`timestamp`,static:!1,private:!1,access:{has:e=>`timestamp`in e,get:e=>e.timestamp,set:(e,t)=>{e.timestamp=t}},metadata:v},f,p),Xi(this,null,m,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:v},h,g),Xi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:v},null,n),_=r=t.value,v&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:v})}static styles=L`
		:host {
			-webkit-box-align: center;
			align-items: center;
			display: flex;
			font-size: 12px;
			line-height: 16px;
			font-weight: 500;
			margin-top: 8px;
		}

		:host([light-theme]) {
			color: #747f8d;
		}

		:host .discord-footer-image {
			border-radius: 50%;
			flex-shrink: 0;
			height: 20px;
			margin-right: 8px;
			width: 20px;
		}

		:host .discord-footer-separator {
			color: #dcddde;
			font-weight: 500;
			display: inline-block;
			margin: 0 4px;
		}

		:host([light-theme]) .discord-footer-separator {
			color: #5c5e66;
		}
	`;#e=Zi(this,o,void 0);get footerImage(){return this.#e}set footerImage(e){this.#e=e}#t=(Zi(this,s),Zi(this,l,void 0));get footerImageAlt(){return this.#t}set footerImageAlt(e){this.#t=e}#n=(Zi(this,u),Zi(this,f,void 0));get timestamp(){return this.#n}set timestamp(e){this.#n=e}#r=(Zi(this,p),Zi(this,h,!1));get lightTheme(){return this.#r}set lightTheme(e){this.#r=e}updateTimestamp(e){e&&!Number.isNaN(new Date(e).getTime())&&(this.timestamp=Zr(e))}render(){return this.updateTimestamp(this.timestamp),R`${K(this.footerImage,()=>R`<img src=${G(this.footerImage)} alt=${G(this.footerImageAlt)} class="discord-footer-image" />`)}
			<slot></slot>
			${K(this.timestamp,()=>R`<span class="discord-footer-separator">&bull;</span>`)}
			${K(this.timestamp,()=>` ${this.timestamp}`,()=>null)}`}constructor(){super(...arguments),Zi(this,g)}static{Zi(r,n)}};return r})(),$i=z`
	<path
	fill="#939bf9"
	d="m72 29.3v60.3c0 2.24 0 3.36-.44 4.22-.38.74-1 1.36-1.74 1.74-.86.44-1.98.44-4.22.44h-59.2c-2.24 0-3.36 0-4.22-.44-.74-.38-1.36-1-1.74-1.74-.44-.86-.44-1.98-.44-4.22v-83.2c0-2.24 0-3.36.44-4.22.38-.74 1-1.36 1.74-1.74.86-.44 1.98-.44 4.22-.44h36.3c1.96 0 2.94 0 3.86.22.5.12.98.28 1.44.5v16.88c0 2.24 0 3.36.44 4.22.38.74 1 1.36 1.74 1.74.86.44 1.98.44 4.22.44h16.88c.22.46.38.94.5 1.44.22.92.22 1.9.22 3.86z" fill="#d3d6fd"/><path d="m68.26 20.26c1.38 1.38 2.06 2.06 2.56 2.88.18.28.32.56.46.86h-16.88c-2.24 0-3.36 0-4.22-.44-.74-.38-1.36-1-1.74-1.74-.44-.86-.44-1.98-.44-4.22v-16.880029c.3.14.58.28.86.459999.82.5 1.5 1.18 2.88 2.56z" />
`;function ea(e={}){return R`<svg ${q(e)} aria-hidden="false" fill="none" width="72" height="96" viewBox="0 0 72 96">${$i}</svg>`}var ta=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},na=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},ra=(()=>{let e=[V(`discord-file-attachment`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,ee=[],D=[];var O=class extends i{static{r=this}static{let k=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H({type:Number})],d=[H({attribute:`bytes-unit`})],m=[H()],_=[H()],b=[H()],C=[H()],E=[U({context:J,subscribe:!0}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],ta(this,null,a,{kind:`accessor`,name:`name`,static:!1,private:!1,access:{has:e=>`name`in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:k},o,s),ta(this,null,c,{kind:`accessor`,name:`bytes`,static:!1,private:!1,access:{has:e=>`bytes`in e,get:e=>e.bytes,set:(e,t)=>{e.bytes=t}},metadata:k},l,u),ta(this,null,d,{kind:`accessor`,name:`bytesUnit`,static:!1,private:!1,access:{has:e=>`bytesUnit`in e,get:e=>e.bytesUnit,set:(e,t)=>{e.bytesUnit=t}},metadata:k},f,p),ta(this,null,m,{kind:`accessor`,name:`href`,static:!1,private:!1,access:{has:e=>`href`in e,get:e=>e.href,set:(e,t)=>{e.href=t}},metadata:k},h,g),ta(this,null,_,{kind:`accessor`,name:`rel`,static:!1,private:!1,access:{has:e=>`rel`in e,get:e=>e.rel,set:(e,t)=>{e.rel=t}},metadata:k},v,y),ta(this,null,b,{kind:`accessor`,name:`target`,static:!1,private:!1,access:{has:e=>`target`in e,get:e=>e.target,set:(e,t)=>{e.target=t}},metadata:k},x,S),ta(this,null,C,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:k},w,T),ta(this,null,E,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:k},ee,D),ta(null,t={value:r},e,{kind:`class`,name:r.name,metadata:k},null,n),O=r=t.value,k&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:k})}static styles=L`
		:host {
			display: grid;
			height: -moz-fit-content;
			height: fit-content;
			grid-auto-flow: row;
			grid-row-gap: 0.25rem;
			grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
			text-indent: 0;
			min-height: 0;
			min-width: 0;
			padding-top: 0.125rem;
			padding-bottom: 0.125rem;
			position: relative;
		}

		:host > * {
			justify-self: start;
			align-self: start;
		}

		.discord-file-attachment-non-visual-media-item-container:hover .discord-button-download-attachment {
			display: block !important;
		}

		.discord-button-download-attachment {
			display: none;
			position: absolute;
			top: -8px;
			right: -8px;
			border-radius: 5px;
			outline: color-mix(in oklab, hsl(220 calc(1 * 6.5%) 18% / 1) 100%, black 0%);
			background-color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%);
		}

		.discord-link-download-attachment {
			color: color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%);
			display: flex;
		}

		.discord-icon-download {
			padding: 6px;
		}

		.discord-file-attachment-non-visual-media-item-container {
			margin-top: 8px;
			max-width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;
		}

		.discord-file-attachment-non-visual-media-item {
			width: -moz-fit-content;
			width: fit-content;
			max-width: 100%;
		}

		.discord-file-attachment-mosaic-item-media {
			position: relative;
			max-height: inherit;
			border-radius: 2px;
			width: 100%;
			align-items: center;
			display: flex;
			flex-flow: row nowrap;
			max-width: 100%;
			height: 100%;
		}

		.discord-file-attachment-mosaic-style {
			padding: 16px;
			border-radius: 8px;
			width: 432px;
			max-width: 100%;
			flex: auto;
			border-color: #202020;
			background-color: #282828;

			align-items: center;
			flex-direction: row;
			display: flex;
			box-sizing: border-box;
			letter-spacing: 0;
			border: 1px solid transparent;
		}

		.discord-file-attachment-light-theme.discord-file-attachment-mosaic-style {
			border-color: #f3f3f3;
			background-color: #f9f9f9;
		}

		.discord-file-attachment-icon {
			width: 30px;
			height: 40px;
			margin-right: 8px;
			flex-shrink: 0;
		}

		.discord-file-attachment-inner {
			flex: 1;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.discord-file-attachment-filename-link-wrapper {
			color: #00aff4;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.discord-file-attachment-metadata {
			line-height: 16px;
			font-size: 12px;
			font-weight: 400;
			color: hsl(223 calc(1 * 5.8%) 52.9% / 1);
			margin-right: 8px;
		}
	`;#e=na(this,o,void 0);get name(){return this.#e}set name(e){this.#e=e}#t=(na(this,s),na(this,l,void 0));get bytes(){return this.#t}set bytes(e){this.#t=e}#n=(na(this,u),na(this,f,void 0));get bytesUnit(){return this.#n}set bytesUnit(e){this.#n=e}#r=(na(this,p),na(this,h,void 0));get href(){return this.#r}set href(e){this.#r=e}#i=(na(this,g),na(this,v,void 0));get rel(){return this.#i}set rel(e){this.#i=e}#a=(na(this,y),na(this,x,void 0));get target(){return this.#a}set target(e){this.#a=e}#o=(na(this,S),na(this,w,void 0));get type(){return this.#o}set type(e){this.#o=e}#s=(na(this,T),na(this,ee,!1));get lightTheme(){return this.#s}set lightTheme(e){this.#s=e}render(){return R`<div class="discord-file-attachment-non-visual-media-item-container">
			<div class="discord-file-attachment-non-visual-media-item">
				<div class="discord-file-attachment-mosaic-item-media">
					<div class=${W({"discord-file-attachment-mosaic-style":!0,"discord-file-attachment-light-theme":this.lightTheme})}>
						${ea({class:`discord-file-attachment-icon`,alt:`Attachment file type: unknown`,title:`unknown`})}
						<div class="discord-file-attachment-inner">
							<div class="discord-file-attachment-filename-link-wrapper">
								<discord-link
									href=${G(this.href)}
									rel=${G(this.rel)}
									target=${G(this.target)}
									type=${G(this.type)}
								>
									${this.name}
								</discord-link>
							</div>
							<div class="discord-file-attachment-metadata">
								${this.bytes}${K(this.bytesUnit,()=>R` ${this.bytesUnit}`,()=>null)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="discord-button-download-attachment">
				<a
					class="discord-link-download-attachment"
					aria-label="Download"
					href="${G(this.href)}"
					rel="noreferrer noopener"
					target="_blank"
					role="button"
					tabindex="0"
				>
					${xr()}
				</a>
			</div>
		</div>`}constructor(){super(...arguments),na(this,D)}static{na(r,n)}};return r})(),ia=(e,t,n)=>{for(let n of t)if(n[0]===e)return(0,n[1])();return n?.()},aa=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},oa=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},sa=(()=>{let e=[V(`discord-header`)],t,n=[],r,i=B,a,o=[],s=[];var c=class extends i{static{r=this}static{let l=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({type:Number,reflect:!0})],aa(this,null,a,{kind:`accessor`,name:`level`,static:!1,private:!1,access:{has:e=>`level`in e,get:e=>e.level,set:(e,t)=>{e.level=t}},metadata:l},o,s),aa(null,t={value:r},e,{kind:`class`,name:r.name,metadata:l},null,n),c=r=t.value,l&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:l})}static styles=L`
		:host > * {
			margin: 16px 0 8px;
			font-weight: 700;
			line-height: 1.375em;
		}

		:host([level='1']) > h1 {
			font-size: 1.5rem;
		}

		:host([level='2']) > h2 {
			font-size: 1.25rem;
		}

		:host([level='3']) > h3 {
			font-size: 1rem;
		}

		:host([level='1']):first-child() > h1,
		:host([level='2']):first-child() > h2 {
			margin-top: 8px;
		}

		:host([level='3']):first-child() > h3 {
			margin-top: 4px;
		}
	`;#e=oa(this,o,1);get level(){return this.#e}set level(e){this.#e=e}ensureLevelIsNumber(){this.level&&!Number.isNaN(this.level)&&(this.level=Number(this.level))}checkLevel(){if(this.level<1||this.level>3)throw RangeError(`The level property must be a number between 1 and 3 (inclusive)`)}render(){return this.ensureLevelIsNumber(),this.checkLevel(),ia(this.level,[[1,()=>R`<h1><slot></slot></h1>`],[2,()=>R`<h2><slot></slot></h2>`],[3,()=>R`<h3><slot></slot></h3>`]],()=>R`<slot></slot>`)}constructor(){super(...arguments),oa(this,s)}static{oa(r,n)}};return r})(),ca=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},la=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},ua=(()=>{let e=[V(`discord-image-attachment`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({reflect:!0,attribute:`url`})],c=[H({type:Number,reflect:!0,attribute:`height`})],d=[H({type:Number,reflect:!0,attribute:`width`})],m=[H({reflect:!0,attribute:`alt`})],_=[H({type:Boolean,attribute:`custom-image-element`})],ca(this,null,a,{kind:`accessor`,name:`url`,static:!1,private:!1,access:{has:e=>`url`in e,get:e=>e.url,set:(e,t)=>{e.url=t}},metadata:x},o,s),ca(this,null,c,{kind:`accessor`,name:`height`,static:!1,private:!1,access:{has:e=>`height`in e,get:e=>e.height,set:(e,t)=>{e.height=t}},metadata:x},l,u),ca(this,null,d,{kind:`accessor`,name:`width`,static:!1,private:!1,access:{has:e=>`width`in e,get:e=>e.width,set:(e,t)=>{e.width=t}},metadata:x},f,p),ca(this,null,m,{kind:`accessor`,name:`alt`,static:!1,private:!1,access:{has:e=>`alt`in e,get:e=>e.alt,set:(e,t)=>{e.alt=t}},metadata:x},h,g),ca(this,null,_,{kind:`accessor`,name:`customImageElement`,static:!1,private:!1,access:{has:e=>`customImageElement`in e,get:e=>e.customImageElement,set:(e,t)=>{e.customImageElement=t}},metadata:x},v,y),ca(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=L`
		:host {
			display: block;
			position: relative;
			-webkit-user-select: text;
			-moz-user-select: text;
			-ms-user-select: text;
			user-select: text;
			overflow: hidden;
			border-radius: 3px;
		}

		.discord-image-attachment {
			color: #dcddde;
			display: flex;
			font-size: 13px;
			line-height: 150%;
			margin-bottom: 8px;
			margin-top: 8px;
		}
	`;#e=la(this,o,void 0);get url(){return this.#e}set url(e){this.#e=e}#t=(la(this,s),la(this,l,void 0));get height(){return this.#t}set height(e){this.#t=e}#n=(la(this,u),la(this,f,void 0));get width(){return this.#n}set width(e){this.#n=e}#r=(la(this,p),la(this,h,`discord image attachment`));get alt(){return this.#r}set alt(e){this.#r=e}#i=(la(this,g),la(this,v,!1));get customImageElement(){return this.#i}set customImageElement(e){this.#i=e}componentWillRender(){this.customImageElement||$r(this.url)}render(){return R`
			<div class="discord-image-attachment">
				<div class="discord-image-wrapper" style="${Wr({height:`${this.height}px`,width:`${this.width}px`})}">
					${K(this.customImageElement,()=>R`<slot></slot>`,()=>R`<img
								alt=${G(this.alt)}
								src=${G(this.url)}
								height=${G(this.height)}
								width=${G(this.width)}
							/>`)}
				</div>
			</div>
		`}constructor(){super(...arguments),la(this,y)}static{la(r,n)}};return r})(),da=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},fa=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},pa=(()=>{let e=[V(`discord-input-text`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,ee=[],D=[],O,k=[],te=[],A,j=[],ne=[],re,M=[],N=[],P,ie=[],ae=[];var oe=class extends i{static{r=this}static{let F=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({reflect:!0,attribute:`type`,type:String})],c=[H({reflect:!0,attribute:`required`,type:Boolean})],d=[H({reflect:!0,attribute:`label`,type:String})],m=[H({reflect:!0,attribute:`placeholder`,type:String})],_=[H({reflect:!0,attribute:`min-length`,type:Number})],b=[H({reflect:!0,attribute:`max-length`,type:Number})],C=[U({context:J,subscribe:!0}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],E=[H({type:String,reflect:!0,attribute:`default-value`})],O=[bt()],A=[bt()],re=[bt()],P=[bt()],da(this,null,a,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:F},o,s),da(this,null,c,{kind:`accessor`,name:`required`,static:!1,private:!1,access:{has:e=>`required`in e,get:e=>e.required,set:(e,t)=>{e.required=t}},metadata:F},l,u),da(this,null,d,{kind:`accessor`,name:`label`,static:!1,private:!1,access:{has:e=>`label`in e,get:e=>e.label,set:(e,t)=>{e.label=t}},metadata:F},f,p),da(this,null,m,{kind:`accessor`,name:`placeholder`,static:!1,private:!1,access:{has:e=>`placeholder`in e,get:e=>e.placeholder,set:(e,t)=>{e.placeholder=t}},metadata:F},h,g),da(this,null,_,{kind:`accessor`,name:`minLength`,static:!1,private:!1,access:{has:e=>`minLength`in e,get:e=>e.minLength,set:(e,t)=>{e.minLength=t}},metadata:F},v,y),da(this,null,b,{kind:`accessor`,name:`maxLength`,static:!1,private:!1,access:{has:e=>`maxLength`in e,get:e=>e.maxLength,set:(e,t)=>{e.maxLength=t}},metadata:F},x,S),da(this,null,C,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:F},w,T),da(this,null,E,{kind:`accessor`,name:`defaultValue`,static:!1,private:!1,access:{has:e=>`defaultValue`in e,get:e=>e.defaultValue,set:(e,t)=>{e.defaultValue=t}},metadata:F},ee,D),da(this,null,O,{kind:`accessor`,name:`value`,static:!1,private:!1,access:{has:e=>`value`in e,get:e=>e.value,set:(e,t)=>{e.value=t}},metadata:F},k,te),da(this,null,A,{kind:`accessor`,name:`hasWarning`,static:!1,private:!1,access:{has:e=>`hasWarning`in e,get:e=>e.hasWarning,set:(e,t)=>{e.hasWarning=t}},metadata:F},j,ne),da(this,null,re,{kind:`accessor`,name:`calculatedMaxLength`,static:!1,private:!1,access:{has:e=>`calculatedMaxLength`in e,get:e=>e.calculatedMaxLength,set:(e,t)=>{e.calculatedMaxLength=t}},metadata:F},M,N),da(this,null,P,{kind:`accessor`,name:`calculatedCharactersCount`,static:!1,private:!1,access:{has:e=>`calculatedCharactersCount`in e,get:e=>e.calculatedCharactersCount,set:(e,t)=>{e.calculatedCharactersCount=t}},metadata:F},ie,ae),da(null,t={value:r},e,{kind:`class`,name:r.name,metadata:F},null,n),oe=r=t.value,F&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:F})}static styles=L`
		.discord-input-text {
			width: 100%;
			margin-bottom: 1em;
		}

		.discord-label-input-text {
			margin-bottom: 8px;
			font-size: 12px;
			line-height: 1.3333333333333333;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.02em;
			color: color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%);
		}

		.discord-text-input-warning-length {
			display: flex;
			align-items: center;
			font-size: 12px;
			line-height: 1.3333333333333333;
			font-weight: 700;
			text-transform: normal !important;
			letter-spacing: 0.02em;
			color: #b0b5bc;
			gap: 3px;
		}

		.discord-text-input-warning-error-text {
			font-size: 12px;
			font-weight: 500;
			font-style: italic;
			text-transform: none;
		}

		.discord-text-input-warning-bottom-error-text {
			font-size: 12px;
			line-height: 1.3333333333333333;
			font-weight: 400;
		}

		.discord-text-input-required {
			padding-left: 4px;
			color: hsl(359 calc(1 * 87.3%) 59.8% / 1);
		}

		.discord-text-input-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;
		}

		.discord-text-input-paragraph {
			width: 100%;
			resize: none;
			box-sizing: border-box;
			height: 83px;
			padding: 8px 38.92px 8px 8px;
			border-radius: 3px;
			border: medium;
			background-color: #1e1f22;
			color: #b0b5bc;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
		}

		.discord-text-input-short {
			width: 100%;
			resize: none;
			box-sizing: border-box;
			height: 40px;
			padding: 8px 38.92px 8px 8px;
			border-radius: 3px;
			border: medium;
			background-color: #1e1f22;
			color: #b0b5bc;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
		}

		input,
		textarea,
		::placeholder {
			font-weight: 400;
			font-size: 16px;
			color: #b0b5bc;
			opacity: 0.8;
		}

		.discord-text-input-paragraph::-webkit-scrollbar {
			width: 8px;
			margin-right: 5px;
			background-color: transparent;
		}

		.discord-text-input-paragraph::-webkit-scrollbar-track {
			background-color: rgba(255, 255, 255, 0.2);
			margin-right: 1em auto;
			border-radius: 10px;
		}

		.discord-text-input-paragraph::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: rgba(0, 0, 0, 0.5);
			margin-right: 1em auto;
		}

		.discord-text-input-textarea-max-length {
			font-size: small;
			position: absolute;
			display: flex;
			color: #b0b5bc;
			right: 0;
			bottom: 0;
			padding-right: 16px;
		}

		:host .discord-text-input-warning-length * {
			color: color-mix(in oklab, hsl(358 calc(1 * 92.9%) 72.4% / 1) 100%, black 0%) !important;
		}

		:host([light-theme]) .discord-text-input-warning-length * {
			color: color-mix(in oklab, hsl(360 calc(1 * 60.2%) 39.4% / 1) 100%, black 0%) !important;
		}

		:host([light-theme]) .discord-text-input-short,
		:host([light-theme]) .discord-label-input-text {
			color: color-mix(in oklab, hsl(228 calc(1 * 6%) 32.5% / 1) 100%, black 0%);
		}

		:host([light-theme]) .discord-text-input-paragraph,
		:host([light-theme]) .discord-text-input-short {
			background-color: rgb(253, 253, 253);
			border: 1px solid #b0b5bc;
		}

		:host([light-theme]) input,
		:host([light-theme]) textarea,
		:host([light-theme]) ::placeholder {
			font-weight: 400;
			font-size: 16px;
			color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%);
			opacity: 0.8;
		}

		.discord-text-input-message-needed-input,
		.discord-text-input-message-needed-min-length {
			background-color: white;
			position: absolute;
			align-items: center;
			gap: 5px;
			left: 50%;
			transform: translateX(-50%);
			opacity: 0;
			display: none;
			transition: 0.5s;
			color: black;
			border-radius: 5px;
			text-align: center;
			font-family: system-ui;
			pointer-events: none;
			padding: 10px;
			min-width: 50%;
			border: black solid 1px;
			z-index: 25;
		}

		.discord-text-input-message-needed-input::after,
		.discord-text-input-message-needed-min-length::after {
			content: '';
			position: absolute;
			bottom: 100%; /* Positions the arrow above the div */
			left: 0;
			transform: translateX(50%);
			border-width: 10px !important; /* Arrow size */
			border-style: solid !important;
			border-color: transparent transparent white transparent !important; /* Arrow pointing up */
		}

		:host([light-theme]) .discord-text-input-message-needed-input::after,
		:host([light-theme]) .discord-text-input-message-needed-min-length::after {
			border-color: transparent transparent #bfbfbf transparent !important; /* Arrow pointing up */
		}

		.discord-text-input-message-needed-min-length::after {
			transform: translate(500%);
		}

		.discord-text-input-message-needed-min-length {
			left: 50% !important;
			width: max-content;
		}

		.icon {
			width: 25px;
			height: 25px;
			background-color: darkorange;
			border-radius: 5px;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-weight: bold;
			font-size: 18px;
			line-height: 1;
			text-align: center;
		}

		.exclamation {
			display: flex;
			flex-direction: column;
			align-items: center;
			line-height: 1;
		}
	`;#e=fa(this,o,`paragraph`);get type(){return this.#e}set type(e){this.#e=e}#t=(fa(this,s),fa(this,l,!1));get required(){return this.#t}set required(e){this.#t=e}#n=(fa(this,u),fa(this,f,void 0));get label(){return this.#n}set label(e){this.#n=e}#r=(fa(this,p),fa(this,h,void 0));get placeholder(){return this.#r}set placeholder(e){this.#r=e}#i=(fa(this,g),fa(this,v,0));get minLength(){return this.#i}set minLength(e){this.#i=e}#a=(fa(this,y),fa(this,x,4e3));get maxLength(){return this.#a}set maxLength(e){this.#a=e}#o=(fa(this,S),fa(this,w,!1));get lightTheme(){return this.#o}set lightTheme(e){this.#o=e}#s=(fa(this,T),fa(this,ee,``));get defaultValue(){return this.#s}set defaultValue(e){this.#s=e}#c=(fa(this,D),fa(this,k,``));get value(){return this.#c}set value(e){this.#c=e}#l=(fa(this,te),fa(this,j,!1));get hasWarning(){return this.#l}set hasWarning(e){this.#l=e}#u=(fa(this,ne),fa(this,M,null));get calculatedMaxLength(){return this.#u}set calculatedMaxLength(e){this.#u=e}#d=(fa(this,N),fa(this,ie,0));get calculatedCharactersCount(){return this.#d}set calculatedCharactersCount(e){this.#d=e}connectedCallback(){super.connectedCallback(),this.defaultValue&&(this.value=this.defaultValue,this.calculatedCharactersCount=this.value.length)}resetState(){this.hasWarning=!1,this.calculatedMaxLength=null,this.calculatedCharactersCount=0,this.value=this.defaultValue?this.defaultValue:``}render(){return this.checkNeededArgument(),this.checkType(),R`
			<div class="discord-input-text">
				<div class=${W({"discord-text-input-warning-length":this.hasWarning})}>
					<h2 class="discord-label-input-text">
						${this.label.slice(0,45)}${K(this.required&&!this.hasWarning,()=>R`<span class="discord-text-input-required">*</span>`)}
					</h2>
					${K(this.hasWarning,()=>R`<span class="discord-text-input-warning-length discord-text-input-warning-error-text">
								- Must be between ${this.minLength} and ${this.maxLength} in length.</span
							>`)}
				</div>
				<div class="discord-text-input-container">
					${K(this.type===`paragraph`,()=>R`
							<div class="discord-text-input-container">
								<textarea
									@input=${e=>this.handleInputChange(e)}
									.required=${this.required}
									.value=${this.value}
									class="discord-text-input-paragraph"
									type="text"
									minlength="${this.minLength}"
									maxlength="${this.maxLength}"
									placeholder="${G(this.placeholder)}"
									rows="3"
								></textarea>
								<div class="discord-text-input-textarea-max-length">
									<span
										>${K(this.valueIsNotNullOrUndefined(this.calculatedMaxLength),()=>this.calculatedMaxLength,()=>K(this.value,()=>this.maxLength-this.value.length,()=>this.maxLength))}</span
									>
								</div>
							</div>
						`)}
					${K(this.type===`short`,()=>R`<input
								@input=${e=>this.handleInputChange(e)}
								.required=${this.required}
								.value=${this.value}
								class="discord-text-input-short"
								type="text"
								minlength="${this.minLength}"
								maxlength="${this.maxLength}"
								placeholder="${G(this.placeholder)}"
								rows="3"
							/>`)}
				</div>
				${K(this.required,()=>R`
						<div class="discord-text-input-message-needed-input">
							<div class="icon">
								<div class="exclamation">!</div>
							</div>
							<span>Please fill out this field.</span>
						</div>
					`)}
				${K(this.valueIsNotNullOrUndefined(this.minLength),()=>R`
						<div class="discord-text-input-message-needed-min-length">
							<div class="icon">
								<div class="exclamation">!</div>
							</div>
							<span
								>Increase this text to ${this.minLength} characters or more. You are currently using ${this.calculatedCharactersCount}
								characters</span
							>
						</div>
					`)}
				<div class=${W({"discord-text-input-warning-length":this.hasWarning})}>
					<h2 class="discord-text-input-warning-length">
						${K(this.hasWarning&&this.valueIsNotNullOrUndefined(this.minLength),()=>R`<span class="discord-text-input-warning-bottom-error-text"
									>Must be ${this.minLength} characters or more in length.</span
								>`)}
					</h2>
				</div>
			</div>
		`}validInputTextTypes=(fa(this,ae),new Set([`short`,`paragraph`]));checkNeededArgument(){if(!this.label)throw new Gr(`Label is required to input text`);if(!this.type)throw new Gr(`Type is required to input text`)}checkType(){if(typeof this.type!=`string`)throw TypeError("DiscordInputText `type` prop must be a string.");if(!this.validInputTextTypes.has(this.type))throw RangeError("DiscordInputText `type` prop must be one of: 'short', 'paragraph'")}valueIsNotNullOrUndefined(e){return e!=null}handleInputChange(e){let t=e?.target;if(this.value=t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement?t.value:``,t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement){let e=t.value.length;this.hasWarning=e===0&&this.minLength===0&&this.valueIsNotNullOrUndefined(this.maxLength)&&this.required?!0:e<this.minLength,this.calculatedMaxLength=this.maxLength-e,this.calculatedCharactersCount=e}let n=this.shadowRoot?.querySelector(`div.discord-text-input-message-needed-input`),r=this.shadowRoot?.querySelector(`div.discord-text-input-message-needed-min-length`);t.value.length>=this.minLength&&r instanceof HTMLDivElement&&r.style.display&&(r.style.opacity=`0`,globalThis.setTimeout(()=>{r.style.display=``},1e3)),n instanceof HTMLDivElement&&n.style.display&&(n.style.opacity=`0`,globalThis.setTimeout(()=>{n.style.display=``},1e3))}static{fa(r,n)}};return r})(),ma=z`
<path
	fill="currentColor"
	fill-rule="evenodd"
	d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z"
/>
`;function ha(e){return R`<svg ${q(e)} class="discord-guild-badge" aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2">
		${ma}
	</svg>`}var ga=z`
	<path
		d="M10.5906 6.39993L9.19223 7.29993C8.99246 7.39993 8.89258 7.39993 8.69281 7.29993C8.59293 7.19993 8.39317 7.09993 8.29328 6.99993C7.89375 6.89993 7.5941 6.99993 7.29445 7.19993L6.79504 7.49993L4.29797 9.19993C3.69867 9.49993 2.99949 9.39993 2.69984 8.79993C2.30031 8.29993 2.50008 7.59993 2.99949 7.19993L5.99598 5.19993C6.79504 4.69993 7.79387 4.49993 8.69281 4.69993C9.49188 4.89993 10.0912 5.29993 10.5906 5.89993C10.7904 6.09993 10.6905 6.29993 10.5906 6.39993Z"
		fill="currentColor"
	/>
	<path
		d="M13.4871 7.79985C13.4871 8.19985 13.2874 8.59985 12.9877 8.79985L9.89135 10.7999C9.29206 11.1999 8.69276 11.3999 7.99358 11.3999C7.69393 11.3999 7.49417 11.3999 7.19452 11.2999C6.39545 11.0999 5.79616 10.6999 5.29674 10.0999C5.19686 9.89985 5.29674 9.69985 5.39663 9.59985L6.79499 8.69985C6.89487 8.59985 7.09463 8.59985 7.19452 8.69985C7.39428 8.79985 7.59405 8.89985 7.69393 8.99985C8.09346 8.99985 8.39311 8.99985 8.69276 8.79985L9.39194 8.39985L11.3896 6.99985L11.6892 6.79985C12.1887 6.49985 12.9877 6.59985 13.2874 7.09985C13.4871 7.39985 13.4871 7.59985 13.4871 7.79985Z"
		fill="currentColor"
	/>
`;function _a(e={}){return R`<svg ${q(e)} class="partner-badge-overlay" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16">
		${ga}
	</svg>`}var va=z`
	<path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor" />
`;function ya(e={}){return R`<svg ${q(e)} class="verified-badge-overlay" aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2">
		${va}
	</svg>`}var ba=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},xa=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Sa=(()=>{let e=[V(`discord-invite`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,ee=[],D=[],O,k=[],te=[],A,j=[],ne=[];var re=class extends i{static{r=this}static{let M=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H()],d=[H()],m=[H({type:Number})],_=[H({type:Number})],b=[H({type:Boolean})],C=[H({type:Boolean})],E=[H({attribute:`invite-title`})],O=[H({attribute:`join-btn`})],A=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],ba(this,null,a,{kind:`accessor`,name:`icon`,static:!1,private:!1,access:{has:e=>`icon`in e,get:e=>e.icon,set:(e,t)=>{e.icon=t}},metadata:M},o,s),ba(this,null,c,{kind:`accessor`,name:`name`,static:!1,private:!1,access:{has:e=>`name`in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:M},l,u),ba(this,null,d,{kind:`accessor`,name:`url`,static:!1,private:!1,access:{has:e=>`url`in e,get:e=>e.url,set:(e,t)=>{e.url=t}},metadata:M},f,p),ba(this,null,m,{kind:`accessor`,name:`online`,static:!1,private:!1,access:{has:e=>`online`in e,get:e=>e.online,set:(e,t)=>{e.online=t}},metadata:M},h,g),ba(this,null,_,{kind:`accessor`,name:`members`,static:!1,private:!1,access:{has:e=>`members`in e,get:e=>e.members,set:(e,t)=>{e.members=t}},metadata:M},v,y),ba(this,null,b,{kind:`accessor`,name:`verified`,static:!1,private:!1,access:{has:e=>`verified`in e,get:e=>e.verified,set:(e,t)=>{e.verified=t}},metadata:M},x,S),ba(this,null,C,{kind:`accessor`,name:`partnered`,static:!1,private:!1,access:{has:e=>`partnered`in e,get:e=>e.partnered,set:(e,t)=>{e.partnered=t}},metadata:M},w,T),ba(this,null,E,{kind:`accessor`,name:`inviteTitle`,static:!1,private:!1,access:{has:e=>`inviteTitle`in e,get:e=>e.inviteTitle,set:(e,t)=>{e.inviteTitle=t}},metadata:M},ee,D),ba(this,null,O,{kind:`accessor`,name:`joinBtn`,static:!1,private:!1,access:{has:e=>`joinBtn`in e,get:e=>e.joinBtn,set:(e,t)=>{e.joinBtn=t}},metadata:M},k,te),ba(this,null,A,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:M},j,ne),ba(null,t={value:r},e,{kind:`class`,name:r.name,metadata:M},null,n),re=r=t.value,M&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:M})}static styles=L`
		:host {
			background-color: #2f3136;
			border-radius: 4px;
			padding: 16px;
			max-width: 432px;
			min-width: 160px;
			width: 100%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
		}

		:host([light-theme]) {
			background-color: #f2f3f5;
		}

		:host .discord-invite-header {
			font-weight: 700;
			font-size: 12px;
			line-height: 16px;
			margin-bottom: 12px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			text-transform: uppercase;
			color: #b9bbbe;
		}

		:host([light-theme]) .discord-invite-header {
			color: #4f5660;
		}

		:host .discord-invite-root {
			display: flex;
			flex-flow: row wrap;
			gap: 16px;
		}

		:host .discord-invite-icon {
			background-color: #36393f;
			border-radius: 15px;
			margin-right: 16px;
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			width: 50px;
			height: 50px;
		}

		:host([light-theme]) .discord-invite-icon {
			background-color: #fff;
		}

		:host .discord-invite-info {
			font-family: 'gg sans', 'Noto Sans', WhitneyMedium, Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
			display: flex;
			flex: 1000 0 auto;
			align-items: center;
			max-width: 100%;
			display: flex;
		}

		.discord-invite-info-text-ellipsis {
			overflow: hidden;
			text-overflow: ellipsis;
		}

		:host .discord-invite-title {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			margin-bottom: 2px;
			color: white;
			font-size: 16px;
			line-height: 20px;
			font-weight: 700;
			display: flex;
			flex-direction: row;
		}

		:host([light-theme]) .discord-invite-title {
			color: #060607;
		}

		:host .discord-invite-name {
			flex: 1 1 auto;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		:host .discord-invite-counts {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			font-size: 14px;
			font-weight: 600;
			text-overflow: ellipsis;
			overflow: hidden;
			color: #b9bbbe;
			line-height: 16px;
		}

		:host .discord-invite-counts-info {
			text-overflow: ellipsis;
			overflow: hidden;
			display: flex;
			align-items: center;
		}

		:host .discord-invite-status {
			display: block;
			margin-right: 4px;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background-color: #747f8d;
		}

		:host .discord-invite-status-online {
			background-color: #3ba55d;
		}

		:host .discord-invite-count {
			-webkit-box-flex: 0;
			-ms-flex: 0 1 auto;
			flex: 0 1 auto;
			margin-right: 8px;
			color: #b9bbbe;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		:host .discord-invite-join {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40px;
			padding: 0 20px;
			align-self: center;
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			line-height: 20px;
			border-radius: 3px;
			font-size: 14px;
			font-weight: 600;
			color: white !important;
			background-color: #3ba55d;
			-webkit-transition: background-color 0.17s ease;
			transition: background-color 0.17s ease;
			text-decoration: none;
			box-sizing: border-box;
			flex: 1 0 auto;
		}

		:host .discord-invite-join:hover {
			background-color: #2d7d46;
		}

		:host .discord-invite-badge {
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			margin-right: 8px;
			width: 16px;
			height: 16px;
			align-self: center;
			position: relative;
		}

		:host .discord-invite-badge-verified {
			color: #3ba55d;
		}

		:host .discord-invite-badge-partnered {
			color: #5865f2;
		}

		:host .discord-invite-badge-container {
			position: absolute;
			top: -0.05px;
			left: 0.05px;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			pointer-events: none;
			color: white;
		}

		:host([light-theme]) .discord-invite-counts,
		:host([light-theme]) .discord-invite-count {
			color: #4f5660;
		}
	`;#e=xa(this,o,Jn.blue);get icon(){return this.#e}set icon(e){this.#e=e}#t=(xa(this,s),xa(this,l,`Discord Server`));get name(){return this.#t}set name(e){this.#t=e}#n=(xa(this,u),xa(this,f,void 0));get url(){return this.#n}set url(e){this.#n=e}#r=(xa(this,p),xa(this,h,0));get online(){return this.#r}set online(e){this.#r=e}#i=(xa(this,g),xa(this,v,0));get members(){return this.#i}set members(e){this.#i=e}#a=(xa(this,y),xa(this,x,!1));get verified(){return this.#a}set verified(e){this.#a=e}#o=(xa(this,S),xa(this,w,!1));get partnered(){return this.#o}set partnered(e){this.#o=e}#s=(xa(this,T),xa(this,ee,`You've been invited to join a server`));get inviteTitle(){return this.#s}set inviteTitle(e){this.#s=e}#c=(xa(this,D),xa(this,k,`Join`));get joinBtn(){return this.#c}set joinBtn(e){this.#c=e}#l=(xa(this,te),xa(this,j,!1));get lightTheme(){return this.#l}set lightTheme(e){this.#l=e}render(){return R`<div class="discord-invite-header">${this.inviteTitle}</div>
			<div class="discord-invite-root">
				<div class="discord-invite-info">
					<img class="discord-invite-icon" src=${G(this.icon)} alt=${G(this.name)} />
					<div class="discord-invite-info-text-ellipsis">
						<div class="discord-invite-title">
							${K(this.verified&&!this.partnered||!this.verified&&this.partnered,()=>R`<div class="discord-invite-badge">
										${ha({"aria-label":this.partnered?`Discord Partner`:`Verified`,class:`discord-invite-badge-${this.partnered?`partnered`:`verified`}`})}
										<div class="discord-invite-badge-container">
											${this.partnered?_a():ya()}
										</div>
									</div>`)}
							<span class="discord-invite-name">${this.name}</span>
						</div>
						<div class="discord-invite-counts">
							<div class="discord-invite-counts-info">
								<i class="discord-invite-status discord-invite-status-online"></i>
								<span class="discord-invite-count">${this.online.toLocaleString()} Online</span>
							</div>
							<div class="discord-invite-counts-info">
								<i class="discord-invite-status"></i>
								<span class="discord-invite-count">${this.members.toLocaleString()} Members</span>
							</div>
						</div>
					</div>
				</div>
				<a class="discord-invite-join" href=${G(this.url)} target="_blank" rel="noopener noreferrer">${this.joinBtn}</a>
			</div>`}constructor(){super(...arguments),xa(this,ne)}static{xa(r,n)}};return r})(),Ca=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},wa=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ta=(()=>{let e=[V(`discord-italic`)],t,n=[],r,i=B;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Ca(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=L`
		:host > em {
			font-style: italic;
		}
	`;render(){return R`
			<em>
				<slot></slot>
			</em>
		`}static{wa(r,n)}};return r})(),Ea=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Da=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Oa=(()=>{let e=[V(`discord-list-item`)],t,n=[],r,i=B;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Ea(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=L`
		:host > li {
			margin-bottom: 4px;
		}
	`;checkParentElement(){if(this.parentElement?.tagName.toLowerCase()!==`discord-unordered-list`&&this.parentElement?.tagName.toLowerCase()!==`discord-ordered-list`)throw new Gr(`All <discord-list-item> components must be direct children of <discord-unordered-list> or <discord-ordered-list>.`)}render(){return this.checkParentElement(),R`<li><slot></slot></li>`}static{Da(r,n)}};return r})();function ka(e){return e.startsWith(`#`)?e.slice(1):e}function Aa(e){let t=e.length===3||e.length===4;return{r:t?`${e.slice(0,1)}${e.slice(0,1)}`:e.slice(0,2),g:t?`${e.slice(1,2)}${e.slice(1,2)}`:e.slice(2,4),b:t?`${e.slice(2,3)}${e.slice(2,3)}`:e.slice(4,6),a:(t?`${e.slice(3,4)}${e.slice(3,4)}`:e.slice(6,8))||`ff`}}function ja(e){return Number.parseInt(e,16)}function Ma({r:e,g:t,b:n,a:r}){return{r:ja(e),g:ja(t),b:ja(n),a:Number((ja(r)/255).toFixed(2))}}function Na(e){return typeof e==`number`||typeof e==`string`&&Number.isFinite(Number(e))}function Pa(e,t){let{r:n,g:r,b:i,a}=e;return`rgba(${n}, ${r}, ${i}, ${Na(t)?t:a})`}function Fa(e,t){return Pa(Ma(Aa(ka(e))),t)}var Ia=z`
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		fill="currentColor"
		d="M18.5 23c.88 0 1.7-.25 2.4-.69l1.4 1.4a1 1 0 0 0 1.4-1.42l-1.39-1.4A4.5 4.5 0 1 0 18.5 23Zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
	/>
	<path
		fill="currentColor"
		d="M3 3a1 1 0 0 0 0 2h18a1 1 0 1 0 0-2H3ZM2 8a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM3 11a1 1 0 1 0 0 2h11a1 1 0 1 0 0-2H3ZM2 16a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM3 19a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H3Z"
	/>
`;function La(e={}){return R`<svg
		${q(e)}
		class="discord-mention-icon"
		aria-label="Browse Channels"
		aria-hidden="false"
		role="img"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Ia}
	</svg>`}var Ra=z`
	<path
		fill="currentColor"
		d="M21.487 5.126L12.487 0.126C12.184 -0.042 11.818 -0.042 11.515 0.126L2.51498 5.126C2.19798 5.302 2.00098 5.636 2.00098 5.999C2.00098 6.693 2.11498 22.999 12.001 22.999C21.887 22.999 22.001 6.693 22.001 5.999C22.001 5.636 21.804 5.302 21.487 5.126ZM12.001 5.999C13.382 5.999 14.501 7.118 14.501 8.499C14.501 9.88 13.382 10.999 12.001 10.999C10.62 10.999 9.50098 9.88 9.50098 8.499C9.50098 7.118 10.62 5.999 12.001 5.999ZM8.25098 16C8.25098 13.699 9.69998 12.25 12.001 12.25C14.302 12.25 15.751 13.699 15.751 16H8.25098Z"
	/>
`;function za(e={}){return R`<svg
		${q(e)}
		class="discord-mention-icon"
		aria-label="Customise Community"
		aria-hidden="false"
		role="img"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Ra}
	</svg>`}var Ba=z`
	<path
		d="M11 3a1 1 0 1 1 2 0v2h5.75c.16 0 .3.07.4.2l2.63 3.5a.5.5 0 0 1 0 .6l-2.63 3.5a.5.5 0 0 1-.4.2H13v5h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1c0-1.1.9-2 2-2h2v-5H2.8a.5.5 0 0 1-.44-.72L3.9 9.22a.5.5 0 0 0 0-.44L2.36 5.72A.5.5 0 0 1 2.81 5H11V3Z"
		fill="currentColor"
	/>
`;function Va(e={}){return R`<svg
		${q(e)}
		class="discord-mention-icon"
		aria-label="Server Guide"
		aria-hidden="false"
		role="img"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Ba}
	</svg>`}var Ha=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Ua=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Wa=(()=>{let e=[V(`discord-mention`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[];var _=class extends i{static{r=this}static{let v=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({type:Boolean,reflect:!0})],c=[H({reflect:!0})],d=[H({reflect:!0})],m=[U({context:J,subscribe:!0}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],Ha(this,null,a,{kind:`accessor`,name:`highlight`,static:!1,private:!1,access:{has:e=>`highlight`in e,get:e=>e.highlight,set:(e,t)=>{e.highlight=t}},metadata:v},o,s),Ha(this,null,c,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:v},l,u),Ha(this,null,d,{kind:`accessor`,name:`color`,static:!1,private:!1,access:{has:e=>`color`in e,get:e=>e.color,set:(e,t)=>{e.color=t}},metadata:v},f,p),Ha(this,null,m,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:v},h,g),Ha(null,t={value:r},e,{kind:`class`,name:r.name,metadata:v},null,n),_=r=t.value,v&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:v})}static styles=L`
		:host {
			color: #e3e7f8;
			background-color: hsla(235, 85.6%, 64.7%, 0.3);
			font-weight: 500;
			padding: 0 2px;
			border-radius: 3px;
			unicode-bidi: -moz-plaintext;
			unicode-bidi: plaintext;
			-webkit-transition:
				background-color 50ms ease-out,
				color 50ms ease-out;
			transition:
				background-color 50ms ease-out,
				color 50ms ease-out;
			cursor: pointer;
		}

		:host([type='role']) {
			background-color: rgba(#e3e7f8, 0.1);
		}

		:host([type='channel']) {
			position: relative;
		}

		:host([type='voice']),
		:host([type='locked']),
		:host([type='thread']),
		:host([type='forum']) {
			position: relative;
		}

		:host(:hover) {
			color: #fff;
			background-color: hsl(235, 85.6%, 64.7%);
		}

		:host([highlight][type='user']:hover) {
			text-decoration: underline;
			text-underline-offset: 1px;
		}

		:host([light-theme]) {
			color: #5865f2;
			background-color: hsla(235, 85.6%, 64.7%, 0.15);
		}

		:host([light-theme]:hover) {
			color: #ffffff;
			background-color: hsl(235, 85.6%, 64.7%);
		}

		.discord-mention-icon {
			width: 1rem;
			height: 1rem;
			margin-right: 4px;
			vertical-align: middle;
			margin-bottom: 0.2rem;
		}

		.no-wrap {
			white-space: nowrap;
		}
	`;#e=Ua(this,o,!1);get highlight(){return this.#e}set highlight(e){this.#e=e}#t=(Ua(this,s),Ua(this,l,`user`));get type(){return this.#t}set type(e){this.#t=e}#n=(Ua(this,u),Ua(this,f,void 0));get color(){return this.#n}set color(e){this.#n=e}setHoverColor=(Ua(this,p),()=>{this.color&&(this.style.backgroundColor=Fa(this.color,.3))});resetHoverColor=()=>{this.color&&(this.style.backgroundColor=Fa(this.color,.1))};#r=Ua(this,h,!1);get lightTheme(){return this.#r}set lightTheme(e){this.#r=e}connectedCallback(){super.connectedCallback(),this.color&&this.type===`role`&&(this.addEventListener(`mouseover`,this.setHoverColor),this.addEventListener(`mouseout`,this.resetHoverColor))}disconnectedCallback(){this.removeEventListener(`mouseover`,this.setHoverColor),this.removeEventListener(`mouseout`,this.resetHoverColor),super.disconnectedCallback()}willUpdate(){this.color&&(this.style.color=this.color,this.type===`role`&&(this.style.backgroundColor=Fa(this.color,.1)))}render(){return R`<span class="no-wrap"
				>${ia(this.type,[[`channel`,()=>ar()],[`user`,()=>R`@`],[`role`,()=>R`@`],[`voice`,()=>dr()],[`locked`,()=>lr()],[`thread`,()=>sr()],[`forum`,()=>rr()],[`server-guide`,()=>Va()],[`channels-and-roles`,()=>La()],[`customize-community`,()=>za()],[`slash`,()=>R`/`]])}</span
			><slot></slot>`}constructor(){super(...arguments),Ua(this,g)}static{Ua(r,n)}};return r})(),Ga=z`
 	<path 
		fill="currentColor" 
 		d="M15.56 11.77c.2-.1.44.02.44.23a4 4 0 1 1-4-4c.21 0 .33.25.23.44a2.5 2.5 0 0 0 3.32 3.32Z"
 	/>
  	<path 
		fill="currentColor" 
  		fill-rule="evenodd" 
  		d="M22.89 11.7q.105.3 0 .6C22.27 13.9 19.1 21 12 21c-7.11 0-10.27-7.11-10.89-8.7a.83.83 0 0 1 0-.6C1.73 10.1 4.9 3 12 3c7.11 0 10.27 7.11 10.89 8.7m-4.5-3.62A15.1 15.1 0 0 1 20.85 12c-.38.88-1.18 2.47-2.46 3.92C16.87 17.62 14.8 19 12 19s-4.87-1.38-6.39-3.08A15.1 15.1 0 0 1 3.15 12c.38-.88 1.18-2.47 2.46-3.92C7.13 6.38 9.2 5 12 5s4.87 1.38 6.39 3.08" 
  		clip-rule="evenodd"
  	/>
`;function Ka(e={}){return R`<svg
		${q(e)}
		class="discord-message-ephemeral-icon"
		aria-hidden="false"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Ga}
	</svg>`}var qa=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Z=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ja=(()=>{let e=[V(`discord-message`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,ee=[],D=[],O,k=[],te=[],A,j=[],ne=[],re,M=[],N=[],P,ie=[],ae=[],oe,F=[],se=[],ce,I=[],le=[],ue,de=[],fe=[],pe,me=[],he=[],ge,_e=[],ve=[],ye,be=[],xe=[],Se,Ce=[],we=[],Te,Ee=[],De=[],Oe,ke=[],Ae=[],je,Me=[],Ne=[],Pe,Fe=[],Ie=[],Le,Re=[],ze=[];var Be=class extends i{static{r=this}static{let L=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H()],d=[H()],m=[H({type:Boolean})],_=[H({type:Boolean})],b=[H({type:Boolean,attribute:`official-app`})],C=[H({type:Boolean})],E=[H({type:Boolean})],O=[H({type:Boolean})],A=[H({attribute:`role-color`})],re=[H({attribute:`role-icon`})],P=[H({attribute:`role-name`})],oe=[H({attribute:`clan-icon`})],ce=[H({attribute:`clan-tag`})],ue=[H({type:Boolean,reflect:!0})],pe=[H({type:Boolean,reflect:!0})],ge=[H({type:String,converter:e=>Zr(e,!1,!1),attribute:!0})],ye=[H({type:Boolean,attribute:`twenty-four`})],Se=[H({type:Boolean,attribute:`message-body-only`})],Te=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],Oe=[U({context:mr}),H({type:Boolean,reflect:!0,attribute:`compact-mode`})],je=[U({context:hr}),H({type:Boolean,reflect:!0,attribute:`no-background`})],Pe=[H({type:Boolean,reflect:!0,attribute:`has-thread`})],Le=[H({reflect:!1,attribute:`dismiss-message-clicked`})],qa(this,null,a,{kind:`accessor`,name:`profile`,static:!1,private:!1,access:{has:e=>`profile`in e,get:e=>e.profile,set:(e,t)=>{e.profile=t}},metadata:L},o,s),qa(this,null,c,{kind:`accessor`,name:`author`,static:!1,private:!1,access:{has:e=>`author`in e,get:e=>e.author,set:(e,t)=>{e.author=t}},metadata:L},l,u),qa(this,null,d,{kind:`accessor`,name:`avatar`,static:!1,private:!1,access:{has:e=>`avatar`in e,get:e=>e.avatar,set:(e,t)=>{e.avatar=t}},metadata:L},f,p),qa(this,null,m,{kind:`accessor`,name:`bot`,static:!1,private:!1,access:{has:e=>`bot`in e,get:e=>e.bot,set:(e,t)=>{e.bot=t}},metadata:L},h,g),qa(this,null,_,{kind:`accessor`,name:`server`,static:!1,private:!1,access:{has:e=>`server`in e,get:e=>e.server,set:(e,t)=>{e.server=t}},metadata:L},v,y),qa(this,null,b,{kind:`accessor`,name:`officialApp`,static:!1,private:!1,access:{has:e=>`officialApp`in e,get:e=>e.officialApp,set:(e,t)=>{e.officialApp=t}},metadata:L},x,S),qa(this,null,C,{kind:`accessor`,name:`verified`,static:!1,private:!1,access:{has:e=>`verified`in e,get:e=>e.verified,set:(e,t)=>{e.verified=t}},metadata:L},w,T),qa(this,null,E,{kind:`accessor`,name:`op`,static:!1,private:!1,access:{has:e=>`op`in e,get:e=>e.op,set:(e,t)=>{e.op=t}},metadata:L},ee,D),qa(this,null,O,{kind:`accessor`,name:`edited`,static:!1,private:!1,access:{has:e=>`edited`in e,get:e=>e.edited,set:(e,t)=>{e.edited=t}},metadata:L},k,te),qa(this,null,A,{kind:`accessor`,name:`roleColor`,static:!1,private:!1,access:{has:e=>`roleColor`in e,get:e=>e.roleColor,set:(e,t)=>{e.roleColor=t}},metadata:L},j,ne),qa(this,null,re,{kind:`accessor`,name:`roleIcon`,static:!1,private:!1,access:{has:e=>`roleIcon`in e,get:e=>e.roleIcon,set:(e,t)=>{e.roleIcon=t}},metadata:L},M,N),qa(this,null,P,{kind:`accessor`,name:`roleName`,static:!1,private:!1,access:{has:e=>`roleName`in e,get:e=>e.roleName,set:(e,t)=>{e.roleName=t}},metadata:L},ie,ae),qa(this,null,oe,{kind:`accessor`,name:`clanIcon`,static:!1,private:!1,access:{has:e=>`clanIcon`in e,get:e=>e.clanIcon,set:(e,t)=>{e.clanIcon=t}},metadata:L},F,se),qa(this,null,ce,{kind:`accessor`,name:`clanTag`,static:!1,private:!1,access:{has:e=>`clanTag`in e,get:e=>e.clanTag,set:(e,t)=>{e.clanTag=t}},metadata:L},I,le),qa(this,null,ue,{kind:`accessor`,name:`highlight`,static:!1,private:!1,access:{has:e=>`highlight`in e,get:e=>e.highlight,set:(e,t)=>{e.highlight=t}},metadata:L},de,fe),qa(this,null,pe,{kind:`accessor`,name:`ephemeral`,static:!1,private:!1,access:{has:e=>`ephemeral`in e,get:e=>e.ephemeral,set:(e,t)=>{e.ephemeral=t}},metadata:L},me,he),qa(this,null,ge,{kind:`accessor`,name:`timestamp`,static:!1,private:!1,access:{has:e=>`timestamp`in e,get:e=>e.timestamp,set:(e,t)=>{e.timestamp=t}},metadata:L},_e,ve),qa(this,null,ye,{kind:`accessor`,name:`twentyFour`,static:!1,private:!1,access:{has:e=>`twentyFour`in e,get:e=>e.twentyFour,set:(e,t)=>{e.twentyFour=t}},metadata:L},be,xe),qa(this,null,Se,{kind:`accessor`,name:`messageBodyOnly`,static:!1,private:!1,access:{has:e=>`messageBodyOnly`in e,get:e=>e.messageBodyOnly,set:(e,t)=>{e.messageBodyOnly=t}},metadata:L},Ce,we),qa(this,null,Te,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:L},Ee,De),qa(this,null,Oe,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:L},ke,Ae),qa(this,null,je,{kind:`accessor`,name:`noBackground`,static:!1,private:!1,access:{has:e=>`noBackground`in e,get:e=>e.noBackground,set:(e,t)=>{e.noBackground=t}},metadata:L},Me,Ne),qa(this,null,Pe,{kind:`accessor`,name:`hasThread`,static:!1,private:!1,access:{has:e=>`hasThread`in e,get:e=>e.hasThread,set:(e,t)=>{e.hasThread=t}},metadata:L},Fe,Ie),qa(this,null,Le,{kind:`accessor`,name:`dismissMessageClicked`,static:!1,private:!1,access:{has:e=>`dismissMessageClicked`in e,get:e=>e.dismissMessageClicked,set:(e,t)=>{e.dismissMessageClicked=t}},metadata:L},Re,ze),qa(null,t={value:r},e,{kind:`class`,name:r.name,metadata:L},null,n),Be=r=t.value,L&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:L})}static styles=L`
		:host {
			color: #dcddde;
			display: flex;
			flex-direction: column;
			font-size: 0.9em;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;

			position: relative;
			word-wrap: break-word;
			-webkit-user-select: text;
			-moz-user-select: text;
			-ms-user-select: text;
			user-select: text;
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			min-height: 1.375rem;
			padding-left: 1em;
			padding-right: 48px;
			margin-top: inherit;
			margin-bottom: inherit;
			line-height: 16px;
		}

		.discord-message-inner {
			display: flex;
			position: relative;
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
		}

		.discord-message-inner-center {
			align-items: center;
		}

		:host([message-body-only]) {
			margin-top: 0px !important;
			padding-top: 0.125rem !important;
			padding-bottom: 0.0625rem !important;
		}

		:host([highlight]),
		:host([ephemeral]) {
			padding-right: 5px;
			position: relative;
		}

		:host([highlight])::before,
		:host([ephemeral])::before {
			content: '';
			position: absolute;
			display: block;
			top: 0;
			left: 0;
			bottom: 0;
			pointer-events: none;
			width: 2px;
		}

		:host([highlight]) {
			background-color: rgba(250, 166, 26, 0.1);
		}

		:host([highlight][light-theme]) {
			background-color: rgba(250, 166, 26, 0.1);
		}

		:host([highlight])::before {
			background-color: #faa61a;
		}

		:host([light-theme][highlight])::before {
			background-color: #af7615;
		}

		:host([ephemeral]) {
			background-color: rgba(88, 101, 242, 0.05);
		}

		:host([ephemeral]:hover) {
			background-color: rgba(88, 101, 242, 0.1);
		}

		:host([ephemeral])::before {
			background-color: #5865f2;
		}

		:host([light-theme]) {
			color: #2e3338;
			border-color: #eceeef;
		}

		.discord-author-avatar {
			margin-right: 16px;
			margin-top: 5px;
			min-width: 40px;
			z-index: 1;
			display: flex;
		}

		.discord-author-avatar img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			cursor: pointer;
		}

		.discord-message-timestamp {
			color: #72767d;
			font-size: 12px;
			margin-left: 3px;
		}

		.discord-message-body-only-indent {
			width: 56px;
		}

		:host(:hover) .discord-message-timestamp-hover::before {
			content: attr(datetime);
		}

		:host([light-theme]) .discord-message-timestamp {
			color: #747f8d;
		}

		.discord-message-edited {
			color: #72767d;
			font-size: 10px;
		}

		:host([light-theme]) .discord-message-edited {
			color: #99aab5;
		}

		.discord-message-content {
			width: 100%;
			line-height: 160%;
			font-weight: normal;
			padding-top: 2px;
		}

		.discord-message-body {
			font-size: 1rem;
			font-weight: 400;
			word-break: break-word;
			position: relative;
		}

		:host([light-theme]) .discord-message-timestamp,
		:host([compact-mode]) .discord-message:hover .discord-message-timestamp {
			color: #99aab5;
		}

		:host([light-theme][compact-mode]).discord-message-timestamp {
			color: #d1d9de;
		}

		:host([compact-mode]) .discord-message-timestamp {
			display: inline-block;
			width: 3.1rem;
			text-align: right;
			font-size: 0.6875rem;
			line-height: 1.375rem;
			margin-right: 0.375rem;
			margin-left: 0;
			text-indent: 0;
		}

		:host([compact-mode]) .discord-message-body {
			line-height: 1.375rem;
			padding-left: 10px;
			margin-left: -6px;
		}

		:host([compact-mode]) .discord-message-compact-indent {
			padding-left: 10px;
		}

		:host .discord-message-markup {
			font-size: 1rem;
			line-height: 1.375rem;
			word-wrap: break-word;
			user-select: text;
			font-weight: 400;
			display: inline;
		}

		:host(:hover) {
			background-color: hsl(0 calc(1 * 0%) 0.8%/0.03);
		}

		:host([highlight]:hover) {
			background-color: hsl(40 calc(1 * 86.4%) 56.9%/0.08);
		}

		:host([has-thread]):after {
			width: 2rem;
			left: 2.2rem;
			top: 4.8rem;
			border-left: 2px solid #4f545c !important;
			border-bottom: 2px solid #4f545c !important;
			border-bottom-left-radius: 8px !important;
			bottom: 29px;
			content: '';
			position: absolute;
		}

		:host([light-theme][has-Thread]):after {
			border-color: #747f8d !important;
		}

		.discord-message-ephemeral {
			margin-top: 4px;
			font-size: 12px;
			font-weight: 400;
			color: #72767d;
		}

		:host([light-theme]) .discord-message-ephemeral {
			color: #747f8d;
		}

		.discord-message-ephemeral .discord-message-ephemeral-link {
			color: #00aff4;
			font-weight: 500;
			cursor: pointer;
		}

		.discord-message-ephemeral .discord-message-ephemeral-link:hover {
			text-decoration: underline;
		}

		.discord-message-ephemeral .discord-message-ephemeral-icon {
			margin-right: 4px;
			vertical-align: text-bottom;
		}
	`;#e=Z(this,o,void 0);get profile(){return this.#e}set profile(e){this.#e=e}#t=(Z(this,s),Z(this,l,`User`));get author(){return this.#t}set author(e){this.#t=e}#n=(Z(this,u),Z(this,f,void 0));get avatar(){return this.#n}set avatar(e){this.#n=e}#r=(Z(this,p),Z(this,h,!1));get bot(){return this.#r}set bot(e){this.#r=e}#i=(Z(this,g),Z(this,v,!1));get server(){return this.#i}set server(e){this.#i=e}#a=(Z(this,y),Z(this,x,!1));get officialApp(){return this.#a}set officialApp(e){this.#a=e}#o=(Z(this,S),Z(this,w,!1));get verified(){return this.#o}set verified(e){this.#o=e}#s=(Z(this,T),Z(this,ee,!1));get op(){return this.#s}set op(e){this.#s=e}#c=(Z(this,D),Z(this,k,!1));get edited(){return this.#c}set edited(e){this.#c=e}#l=(Z(this,te),Z(this,j,void 0));get roleColor(){return this.#l}set roleColor(e){this.#l=e}#u=(Z(this,ne),Z(this,M,void 0));get roleIcon(){return this.#u}set roleIcon(e){this.#u=e}#d=(Z(this,N),Z(this,ie,void 0));get roleName(){return this.#d}set roleName(e){this.#d=e}#f=(Z(this,ae),Z(this,F,void 0));get clanIcon(){return this.#f}set clanIcon(e){this.#f=e}#p=(Z(this,se),Z(this,I,void 0));get clanTag(){return this.#p}set clanTag(e){this.#p=e}#m=(Z(this,le),Z(this,de,!1));get highlight(){return this.#m}set highlight(e){this.#m=e}#h=(Z(this,fe),Z(this,me,!1));get ephemeral(){return this.#h}set ephemeral(e){this.#h=e}#g=(Z(this,he),Z(this,_e,new Date));get timestamp(){return this.#g}set timestamp(e){this.#g=e}#_=(Z(this,ve),Z(this,be,!1));get twentyFour(){return this.#_}set twentyFour(e){this.#_=e}#v=(Z(this,xe),Z(this,Ce,!1));get messageBodyOnly(){return this.#v}set messageBodyOnly(e){this.#v=e}#y=(Z(this,we),Z(this,Ee,!1));get lightTheme(){return this.#y}set lightTheme(e){this.#y=e}#b=(Z(this,De),Z(this,ke,!1));get compactMode(){return this.#b}set compactMode(e){this.#b=e}#x=(Z(this,Ae),Z(this,Me,!1));get noBackground(){return this.#x}set noBackground(e){this.#x=e}#S=(Z(this,Ne),Z(this,Fe,!1));get hasThread(){return this.#S}set hasThread(e){this.#S=e}#C=(Z(this,Ie),Z(this,Re,()=>{}));get dismissMessageClicked(){return this.#C}set dismissMessageClicked(e){this.#C=e}willUpdate(){this.hasThread=Array.from(this.children).some(e=>e.tagName.toLowerCase()===`discord-thread`),this.highlight=this.highlight||Array.from(this.children).some(e=>e.tagName.toLowerCase()===`discord-mention`&&e.hasAttribute(`highlight`)&&(e.type===`user`||e.type===`role`))}handleSpaceToDismissMessage(e){e.code===`Space`&&(e.preventDefault(),e.stopPropagation(),this.dismissMessageClicked?.())}render(){let e={author:this.author,bot:this.bot,officialApp:this.officialApp,verified:this.verified,server:this.server,op:this.op,roleColor:this.roleColor,roleIcon:this.roleIcon,clanIcon:this.clanIcon,clanTag:this.clanTag,roleName:this.roleName},t=this.profile!==void 0&&Reflect.get(Zn,this.profile)||{},n={...e,...t,avatar:this.resolveAvatar(t.avatar??this.avatar)},r=Zr(this.timestamp,this.compactMode,this.twentyFour)??void 0;return R`
			<slot name="reply"></slot>
			<div
				class=${W({"discord-message-inner":!0,"discord-message-inner-center":this.messageBodyOnly})}
			>
				${K(this.compactMode&&!this.messageBodyOnly,()=>R`<time datetime="${G(r)}" class="discord-message-timestamp">${r}</time>`,()=>null)}
				${K(this.messageBodyOnly,()=>R`<time
							datetime="${G(r)}"
							class=${W({"discord-message-timestamp":!0,"discord-message-timestamp-hover":!0,"discord-message-body-only-indent":!this.compactMode})}
						></time>`,()=>null)}
				${K(this.compactMode||this.messageBodyOnly,()=>null,()=>R`<div class="discord-author-avatar">
							<img src="${G(n.avatar)}" alt="${G(n.author)}" />
						</div>`)}

				<div class="discord-message-content">
					${K(this.compactMode||this.messageBodyOnly,()=>null,()=>R`
							<discord-author-info
								author=${n.author??``}
								?bot=${n.bot??!1}
								?server=${n.server??!1}
								?official-app=${n.officialApp??!1}
								?verified=${n.verified??!1}
								?op=${n.op??!1}
								role-color=${n.roleColor??``}
								role-icon=${n.roleIcon??``}
								role-name=${n.roleName??``}
								clan-icon=${n.clanIcon??``}
								clan-tag=${n.clanTag??``}
							></discord-author-info
							><time datetime="${G(r)}" class="discord-message-timestamp">${r}</time>
						`)}
					<div class="discord-message-body">
						${K(this.compactMode,()=>R`<discord-author-info
									author=${n.author??``}
									?bot=${n.bot??!1}
									?server=${n.server??!1}
									?official-app=${n.officialApp??!1}
									?verified=${n.verified??!1}
									?op=${n.op??!1}
									role-color=${n.roleColor??``}
									role-icon=${n.roleIcon??``}
									role-name=${n.roleName??``}
									clan-icon=${n.clanIcon??``}
									clan-tag=${n.clanTag??``}
								></discord-author-info>`,()=>null)}<span class="discord-message-markup"><slot></slot></span>
						${K(this.edited,()=>R`<span class="discord-message-edited">(edited)</span>`,()=>null)}
					</div>
					<div class="discord-message-compact-indent">
						<slot name="attachments"></slot>
						<slot name="embeds"></slot>
						<slot name="components"></slot>
						<slot name="reactions"></slot>
						<slot name="thread"></slot>
						${K(this.ephemeral,()=>R`
								<div class="discord-message-ephemeral">
									${Ka()} Only you can see this •
									<span
										role="button"
										class="discord-message-ephemeral-link"
										@click=${this.dismissMessageClicked}
										@keydown=${this.handleSpaceToDismissMessage}
										>Dismiss message</span
									>
								</div>
							`,()=>null)}
					</div>
				</div>
			</div>
		`}resolveAvatar(e){return e===void 0?Xn.default:Xn[e]??e??Xn.default}constructor(){super(...arguments),Z(this,ze)}static{Z(r,n)}};return r})(),Ya=z`
	<path fill="currentColor" d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z"></path>
`;function Xa(e={}){return R`<svg ${q(e)} aria-hidden="false" aria-label="Close" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">
		${Ya}
	</svg>`}var Za=z`
	<circle cx="12" cy="12" r="10" fill="transparent"></circle>
	<path fill="color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%)" fill-rule="evenodd" d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm1.44-15.94L13.06 14a1.06 1.06 0 0 1-2.12 0l-.38-6.94a1 1 0 0 1 1-1.06h.88a1 1 0 0 1 1 1.06Zm-.19 10.69a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" clip-rule="evenodd"></path>
`;function Qa(e={}){return R`<svg ${q(e)} aria-hidden="false" aria-label="Warning" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">
		${Za}
	</svg>`}var $a=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},eo=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},to=(()=>{let e=[V(`discord-modal`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,ee=[],D=[],O,k=[],te=[];var A=class extends i{static{r=this}static{let j=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H()],d=[H()],m=[H({reflect:!0,attribute:`modal-id`})],_=[H({reflect:!0,attribute:`modal-title`})],b=[H({reflect:!1,noAccessor:!0,attribute:!1})],C=[H({reflect:!1,noAccessor:!0,attribute:!1})],E=[U({context:J,subscribe:!0}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],O=[bt()],$a(this,null,a,{kind:`accessor`,name:`profile`,static:!1,private:!1,access:{has:e=>`profile`in e,get:e=>e.profile,set:(e,t)=>{e.profile=t}},metadata:j},o,s),$a(this,null,c,{kind:`accessor`,name:`author`,static:!1,private:!1,access:{has:e=>`author`in e,get:e=>e.author,set:(e,t)=>{e.author=t}},metadata:j},l,u),$a(this,null,d,{kind:`accessor`,name:`avatar`,static:!1,private:!1,access:{has:e=>`avatar`in e,get:e=>e.avatar,set:(e,t)=>{e.avatar=t}},metadata:j},f,p),$a(this,null,m,{kind:`accessor`,name:`modalId`,static:!1,private:!1,access:{has:e=>`modalId`in e,get:e=>e.modalId,set:(e,t)=>{e.modalId=t}},metadata:j},h,g),$a(this,null,_,{kind:`accessor`,name:`modalTitle`,static:!1,private:!1,access:{has:e=>`modalTitle`in e,get:e=>e.modalTitle,set:(e,t)=>{e.modalTitle=t}},metadata:j},v,y),$a(this,null,b,{kind:`accessor`,name:`submitForm`,static:!1,private:!1,access:{has:e=>`submitForm`in e,get:e=>e.submitForm,set:(e,t)=>{e.submitForm=t}},metadata:j},x,S),$a(this,null,C,{kind:`accessor`,name:`closeForm`,static:!1,private:!1,access:{has:e=>`closeForm`in e,get:e=>e.closeForm,set:(e,t)=>{e.closeForm=t}},metadata:j},w,T),$a(this,null,E,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:j},ee,D),$a(this,null,O,{kind:`accessor`,name:`originalBodyOverflow`,static:!1,private:!1,access:{has:e=>`originalBodyOverflow`in e,get:e=>e.originalBodyOverflow,set:(e,t)=>{e.originalBodyOverflow=t}},metadata:j},k,te),$a(null,t={value:r},e,{kind:`class`,name:r.name,metadata:j},null,n),A=r=t.value,j&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:j})}static styles=L`
		@keyframes modal-pop {
			0% {
				opacity: 0;
			}
		}

		*,
		:before,
		:after {
			border-width: 0 !important;
		}

		/* This does positioning, sizing, and transition */
		.discord-modal {
			pointer-events: none;
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			margin: 0;
			display: grid;
			height: 100%;
			width: 100%;
			max-height: none;
			max-width: none;
			justify-items: center;
			padding: 0;
			opacity: 0;
			overscroll-behavior: contain;
			z-index: 1002;
			background-color: transparent;
			color: inherit;
			transition-duration: 0.2s;
			transition-timing-function: ease;
			transition-property: all;
			overflow: hidden;
		}

		.discord-modal-open,
		.discord-modal:target,
		.discord-modal-toggle:checked + .discord-modal,
		.discord-modal[open] {
			pointer-events: auto;
			visibility: visible;
			opacity: 1;
		}

		:where(.discord-modal) {
			align-items: center;
		}

		.discord-modal-box {
			display: none;
			flex-direction: column;
			min-height: 0;
			max-width: 100%;
			background-color: oklab(0.321088 -0.000220731 -0.00934622);
			transform: translate(0, 0) rotate(0) skew(0) skewY(0) scaleX(0.9) scaleY(0.9);
			transition-property: all;
			transition-timing-function: ease;
			transition-duration: 0.2s;
			box-shadow: none;
			overflow-y: visible;
			border-radius: 4px;
		}

		.discord-modal-box:focus {
			outline: none;
			border: none;
		}

		.discord-modal-open .discord-modal-box,
		.discord-modal-toggle:checked + .discord-modal .discord-modal-box,
		.discord-modal:target .discord-modal-box,
		.discord-modal[open] .discord-modal-box {
			transform: translate(0, 0px) rotate(0) skew(0) skewY(0) scaleX(1) scaleY(1);
		}

		.discord-modal:not(dialog:not(.discord-modal-open)),
		.discord-modal::backdrop {
			background-color: rgba(0, 0, 0, 0.7);
			animation: modal-pop 0.2s ease-out;
		}

		.discord-modal-light-theme:not(dialog:not(.discord-modal-open)),
		.discord-modal-light-theme::backdrop {
			background-color: rgba(0, 0, 0, 0.54);
			backdrop-filter: blur(0px);
		}

		.discord-modal-root {
			background-color: oklab(0.321088 -0.000220731 -0.00934622);
			border-radius: 4px;
			display: flex;
			flex-direction: column;
			margin: 0 auto;
			pointer-events: all;
			position: relative;
			box-shadow:
				rgba(30, 31, 34, 0.6) 0px 0px 0px 1px,
				rgba(0, 0, 0, 0.2) 0px 2px 10px 0px;
			opacity: 1;
			transform: scale(1);
			width: 440px;
			max-height: 720px;
			min-height: 200px;
		}

		.discord-modal-content-container::-webkit-scrollbar {
			width: 5px;
			background-color: transparent;
		}

		.discord-modal-content-container::-webkit-scrollbar-track {
			background-color: transparent;
		}

		.discord-modal-content-container::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: rgba(0, 0, 0, 0.5);
		}

		.discord-modal-root-light-theme {
			box-shadow:
				0 0 0 1px hsl(210 calc(1 * 9.3%) 78.8% / 0.3),
				0 2px 10px 0 hsl(0 calc(1 * 0%) 0% / 0.1);
			background-color: color-mix(in oklab, hsl(0 calc(1 * 0%) 100% / 1) 100%, black 0%);
		}

		.discord-modal-header-container {
			flex: 0 0 auto;
			border-radius: 4px 4px 0 0;
			transition: box-shadow 0.1s ease-out;
			word-wrap: break-word;
			position: relative;
			padding: 16px;
			z-index: 1;
			overflow: hidden;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			flex-direction: row;
			display: flex;
		}

		.discord-modal-content-container {
			overflow: hidden auto;
			padding-right: 8px;
			position: relative;
			z-index: 0;
			border-radius: 5px 5px 0 0;
			padding-left: 16px;
			position: relative;
			z-index: 0;
			border-radius: 5px 5px 0 0;
			padding-left: 16px;
		}

		.discord-modal-actions-container {
			flex: 0 0 auto;
			box-shadow: inset 0 1px 0 hsl(220 calc(1 * 6.5%) 18% / 0.6);
			border-radius: 0 0 5px 5px;
			background-color: color-mix(in oklab, hsl(220 calc(1 * 6.5%) 18% / 1) 100%, black 0%);
			position: relative;
			padding: 16px;
			z-index: 1;
			overflow-x: hidden;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			flex-direction: row-reverse;
			display: flex;
		}

		.discord-modal-actions-container-light-theme {
			box-shadow: inset 0 1px 0 hsl(0 calc(1 * 0%) 97.6% / 0.6);
			background-color: color-mix(in oklab, hsl(220 calc(1 * 13%) 95.5% / 1) 100%, black 0%);
		}

		.discord-modal-avatar {
			margin-right: 0.5em;
			position: relative;
			min-width: 24px;
			width: 24px;
			height: 24px;
			border-radius: 50%;
		}

		.discord-modal-avatar img {
			width: 24px;
			height: 24px;
			border-radius: 50%;
		}

		.discord-modal-title {
			font-size: 24px;
			line-height: 30px;
			color: color-mix(in oklab, hsl(220 calc(1 * 13%) 95.5% / 1) 100%, black 0%);
		}

		.discord-modal-title-light-theme {
			color: color-mix(in oklab, hsl(240 calc(1 * 7.7%) 2.5% / 1) 100%, black 0%);
		}

		.discord-modal-close-button {
			position: absolute;
			top: 16px;
			right: 16px;
			height: 26px;
			padding: 4px;
			transition: opacity.2s ease-in-out;
			opacity: 0.5;
			cursor: pointer;
			border-radius: 3px;
			color: color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%);
			box-sizing: content-box;
			width: auto;
			background: transparent;
			border: 0;
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			font-weight: 500;
			line-height: 16px;
			-moz-user-select: none;
			user-select: none;
			outline: 0;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
			text-rendering: optimizeLegibility;
		}

		.discord-modal-close-button-light-theme {
			color: color-mix(in oklab, hsl(228 calc(1 * 6%) 32.5% / 1) 100%, black 0%);
		}

		.discord-modal-close-button:hover {
			opacity: 1;
			color: oklab(0.899401 -0.00192499 -0.00481987);
		}

		.discord-modal-close-button-light-theme:hover {
			color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%);
		}

		.discord-modal-close-button-content {
			background-image: linear-gradient(
				to top,
				transparent,
				transparent 1px,
				transparent 1px,
				transparent calc(1px + 1px),
				transparent calc(1px + 1px)
			);
		}

		.discord-modal-warning-container {
			margin-bottom: 8px;
			background: color-mix(in oklab, hsl(40 calc(1 * 86.4%) 56.9% / 0.1) 100%, hsl(0 0% 0% / 0.1) 0%);
			border: 1px solid color-mix(in oklab, hsl(40 calc(1 * 86.4%) 56.9% / 1) 100%, black 0%);
			color: color-mix(in oklab, hsl(0 calc(1 * 0%) 100% / 1) 100%, black 0%);
			display: flex;
			border-radius: 4px;
			font-weight: 500;
			padding: 8px;
			width: 100%;
			box-sizing: border-box;
		}

		.discord-modal-warning-container-light-theme {
			background: color-mix(in oklab, hsl(38 calc(1 * 78.6%) 38.4% / 0.1) 100%, hsl(0 0% 0% / 0.1) 0%);
			border: color-mix(in oklab, hsl(38 calc(1 * 78.6%) 38.4% / 1) 100%, black 0%);
			color: color-mix(in oklab, hsl(0 calc(1 * 0%) 0% / 1) 100%, black 0%);
		}

		.discord-modal-warning-icon {
			display: flex;
		}

		.discord-modal-warning {
			color: color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%);
			margin-left: 10px;
			flex: 1;
			align-self: center;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
			font-size: 14px;
			line-height: 1.2857142857142858;
			font-weight: 500;
		}

		.discord-modal-warning-light-theme {
			color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%);
		}

		.discord-modal-warning-icon-svg {
			fill: color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%);
			color: color-mix(in oklab, hsl(40 calc(1 * 86.4%) 56.9% / 1) 100%, black 0%);
			width: 24px;
			height: 24px;
			flex-shrink: 0;
		}

		.discord-modal-warning-icon-svg-light-theme {
			color: color-mix(in oklab, hsl(38 calc(1 * 78.6%) 38.4% / 1) 100%, black 0%);
			fill: none;
		}

		.discord-modal-warning-icon-svg-light-theme > path {
			fill: color-mix(in oklab, hsl(228 calc(1 * 6%) 32.5% / 1) 100%, black 0%);
		}

		.discord-modal-warning-author {
			font-weight: 600;
		}

		.discord-modal-button {
			align-items: center;
			background: none;
			border-radius: 3px;
			border: none;
			box-sizing: border-box;
			color: hsl(0 calc(1 * 0%) 100% / 1);
			display: flex;
			font-size: 14px;
			font-weight: 500;
			height: 38px;
			justify-content: center;
			line-height: 16px;
			min-height: 38px;
			min-width: 96px;
			padding: 2px 16px;
			position: relative;
			-moz-user-select: none;
			user-select: none;
			width: auto;
			cursor: pointer;
		}

		.discord-modal-button-submit {
			background-color: hsl(235 calc(1 * 85.6%) 64.7% / 1);
			transition:
				background-color 170ms ease,
				color 170ms ease;
		}

		.discord-modal-button-submit:hover {
			background-color: hsl(235 calc(1 * 51.4%) 52.4% / 1);
		}

		.discord-modal-button-submit:active {
			background-color: hsl(235 calc(1 * 46.7%) 44.1% / 1);
		}

		.discord-modal-button-cancel-light-theme {
			color: hsl(223 calc(1 * 5.8%) 52.9% / 1);
		}

		.discord-modal-button-cancel:hover > .discord-modal-button-content {
			--button--underline-color: hsl(0 calc(1 * 0%) 100% / 1);
		}

		.discord-modal-button-cancel-light-theme:hover > .discord-modal-button-content-light-theme {
			--button--underline-color: hsl(223 calc(1 * 5.8%) 52.9% / 1);
		}

		.discord-modal-button-content {
			--button--underline-color: transparent;
			margin: 0 auto;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			background-image: linear-gradient(
				to top,
				transparent,
				transparent 1px,
				var(--button--underline-color) 1px,
				var(--button--underline-color) calc(1px + 1px),
				transparent calc(1px + 1px)
			);
		}

		.discord-modal-slot-input-text {
			padding-right: 8px;
			padding-left: 20px;
			position: sticky;
			z-index: 3;
		}
	`;#e=eo(this,o,void 0);get profile(){return this.#e}set profile(e){this.#e=e}#t=(eo(this,s),eo(this,l,`User`));get author(){return this.#t}set author(e){this.#t=e}#n=(eo(this,u),eo(this,f,void 0));get avatar(){return this.#n}set avatar(e){this.#n=e}#r=(eo(this,p),eo(this,h,void 0));get modalId(){return this.#r}set modalId(e){this.#r=e}#i=(eo(this,g),eo(this,v,void 0));get modalTitle(){return this.#i}set modalTitle(e){this.#i=e}#a=(eo(this,y),eo(this,x,void 0));get submitForm(){return this.#a}set submitForm(e){this.#a=e}#o=(eo(this,S),eo(this,w,void 0));get closeForm(){return this.#o}set closeForm(e){this.#o=e}#s=(eo(this,T),eo(this,ee,!1));get lightTheme(){return this.#s}set lightTheme(e){this.#s=e}#c=(eo(this,D),eo(this,k,void 0));get originalBodyOverflow(){return this.#c}set originalBodyOverflow(e){this.#c=e}dialogRef=(eo(this,te),qt());handleClickCloseIcon(){this.dialogRef.value&&this.dialogRef.value.close()}handleFormSubmit(e){e.preventDefault(),e.stopPropagation();let t=this.shadowRoot?.querySelector(`slot`)?.assignedElements()??[];for(let e of t)if(e instanceof pa){let t=e.shadowRoot,n=t?.querySelector(`input`)??t?.querySelector(`textarea`);if(n?.attributes.getNamedItem(`required`)&&!n.value){let e=t?.querySelector(`div.discord-text-input-message-needed-input`);e instanceof HTMLDivElement&&!e.style.display&&(e.style.display=`flex`,globalThis.setTimeout(()=>{e.style.opacity=`1`},1));return}if(n instanceof HTMLTextAreaElement&&n.value.length<Number(n.attributes.getNamedItem(`minlength`)?.value)&&n.value.length>0||n instanceof HTMLTextAreaElement&&n.value.length<Number(n.attributes.getNamedItem(`minlength`)?.value)&&n?.attributes.getNamedItem(`required`)){let n=t?.querySelector(`div.discord-text-input-message-needed-min-length`);n instanceof HTMLDivElement&&!n.style.display&&(n.style.display=`flex`,e.hasWarning=!0,globalThis.setTimeout(()=>{n.style.opacity=`1`},1));return}}this.submitForm?.(),this.handleClickCloseIcon()}onCloseDialog(){globalThis.document.body.style.overflow=this.originalBodyOverflow??`scroll`;let e=this.shadowRoot?.querySelector(`div.discord-modal-box`);e instanceof HTMLDivElement&&(e.style.display=`none`);let t=this.shadowRoot?.querySelector(`slot`)?.assignedElements()??[];for(let e of t)if(e instanceof pa){e.resetState();let t=e.shadowRoot,n=t?.querySelector(`div.discord-text-input-message-needed-input`),r=t?.querySelector(`div.discord-text-input-message-needed-min-length`);n instanceof HTMLDivElement&&n.style.display&&(n.style.display=``,n.style.opacity=`0`),r instanceof HTMLDivElement&&r.style.display&&(r.style.display=``,r.style.opacity=`0`)}this.closeForm?.()}render(){let e={author:this.author},t=this.profile!==void 0&&Reflect.get(Zn,this.profile)||{},n={...e,...t,avatar:this.resolveAvatar(t.avatar??this.avatar)};return R`
			<dialog
				${Xt(this.dialogRef)}
				id="${G(this.modalId)}"
				class=${W({"discord-modal":!0,"discord-modal-light-theme":this.lightTheme})}
				@close=${this.onCloseDialog}
			>
				<div class="discord-modal-box">
					<form @submit=${this.handleFormSubmit}>
						<div aria-labelledby="discord-modal-title" role="dialog" tabindex="-1" aria-modal="true">
							<div class=${W({"discord-modal-root":!0,"discord-modal-root-light-theme":this.lightTheme})}>
								<div class="discord-modal-header-container">
									<div class="discord-modal-avatar">
										<img src="${G(n.avatar)}" alt="${G(n.author)}" />
									</div>
									<div
										id="discord-modal-title"
										class=${W({"discord-modal-title":!0,"discord-modal-title-light-theme":this.lightTheme})}
									>
										${this.modalTitle}
									</div>
									<button
										aria-label="Close"
										@click=${this.handleClickCloseIcon}
										type="button"
										class=${W({"discord-modal-close-button":!0,"discord-modal-close-button-light-theme":this.lightTheme})}
									>
										<div class="discord-modal-close-button-content">${Xa()}</div>
									</button>
								</div>
								<div
									class=${W({"discord-modal-content-container":!0,"discord-modal-content-container-light-theme":this.lightTheme})}
								>
									<div class="discord-modal-warning-container">
										<div class="discord-modal-warning-icon">
											${Qa({class:`discord-modal-warning-icon-svg`+(this.lightTheme?` discord-modal-warning-icon-svg-light-theme`:``)})}
										</div>
										<div
											class=${W({"discord-modal-warning":!0,"discord-modal-warning-light-theme":this.lightTheme})}
										>
											This form will be submitted to <strong class="discord-modal-warning-author">${n.author}</strong>. Do
											not share passwords or other sensitive information.
										</div>
									</div>
									<div
										aria-hidden="true"
										style="position: absolute; pointer-events: none; min-height: 0px; min-width: 1px; flex: 0 0 auto; height: 0px;"
									></div>
								</div>
								<div class="discord-modal-slot-input-text">
									<slot></slot>
								</div>
								<div
									class=${W({"discord-modal-actions-container":!0,"discord-modal-actions-container-light-theme":this.lightTheme})}
								>
									<button type="submit" class="discord-modal-button discord-modal-button-submit">
										<div class="discord-modal-button-content">Submit</div>
									</button>
									<button
										type="button"
										class=${W({"discord-modal-button":!0,"discord-modal-button-cancel":!0,"discord-modal-button-cancel-light-theme":this.lightTheme})}
										@click=${this.handleClickCloseIcon}
									>
										<div
											class=${W({"discord-modal-button-content":!0,"discord-modal-button-content-light-theme":this.lightTheme})}
										>
											Cancel
										</div>
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</dialog>
		`}resolveAvatar(e){return e===void 0?Xn.default:Xn[e]??e??Xn.default}static{eo(r,n)}};return r})(),no=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ro=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},io=(()=>{let e=[V(`discord-ordered-list`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[];var d=class extends i{static{r=this}static{let f=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({type:Number,reflect:!0})],c=[bt()],no(this,null,a,{kind:`accessor`,name:`start`,static:!1,private:!1,access:{has:e=>`start`in e,get:e=>e.start,set:(e,t)=>{e.start=t}},metadata:f},o,s),no(this,null,c,{kind:`accessor`,name:`startLength`,static:!1,private:!1,access:{has:e=>`startLength`in e,get:e=>e.startLength,set:(e,t)=>{e.startLength=t}},metadata:f},l,u),no(null,t={value:r},e,{kind:`class`,name:r.name,metadata:f},null,n),d=r=t.value,f&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:f})}static styles=L`
		:host > ol {
			list-style-image: initial;
			list-style-type: decimal;
			list-style-position: outside;
			margin-bottom: 0px;
			margin-top: 4px;
			margin-right: 0px;
			margin-left: calc(0.4em + 0.6em * var(--totalCharacters));
			padding: 0px;
		}
	`;#e=ro(this,o,1);get start(){return this.#e}set start(e){this.#e=e}#t=(ro(this,s),ro(this,l,1));get startLength(){return this.#t}set startLength(e){this.#t=e}checkChildren(){if(!Array.from(this.children).every(e=>{let t=e.tagName.toLowerCase();return t===`discord-list-item`||t===`discord-unordered-list`||t===`discord-ordered-list`}))throw new Gr(`All direct children inside of a <discord-ordered-list> components must be one of <discord-unordered-list>, <discord-ordered-list>, or <discord-list-item>.`)}willUpdate(){let e=Array.from(this.children).filter(e=>e.tagName.toLowerCase()===`discord-list-item`).length,t=this.start+e;this.startLength=t.toString().length}render(){return this.checkChildren(),R`<ol start=${this.start} style="--totalCharacters:${this.startLength}">
			<slot></slot>
		</ol>`}constructor(){super(...arguments),ro(this,u)}static{ro(r,n)}};return r})(),ao=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},oo=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},so=kt(`multiple-answers`),co=kt(`ended`),lo=kt(`voted`),uo=kt(`show-votes`),fo=(()=>{let e=[V(`discord-poll`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,ee=[],D=[];var O=class extends i{static{r=this}static{let k=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({type:String,attribute:`question`,reflect:!0})],c=[H({type:String,attribute:`time-end`,reflect:!0})],d=[Pt({context:co}),H({type:Boolean,attribute:`ended`,reflect:!0})],m=[Pt({context:so}),H({type:Boolean,reflect:!0,attribute:`multiple-answers`})],_=[Pt({context:lo}),H({type:Boolean,reflect:!0,attribute:`voted`})],b=[Pt({context:uo}),H({type:Boolean,reflect:!0,attribute:`show-results`})],C=[U({context:mr}),H({type:Boolean,reflect:!0,attribute:`compact-mode`})],E=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],ao(this,null,a,{kind:`accessor`,name:`question`,static:!1,private:!1,access:{has:e=>`question`in e,get:e=>e.question,set:(e,t)=>{e.question=t}},metadata:k},o,s),ao(this,null,c,{kind:`accessor`,name:`timeEnd`,static:!1,private:!1,access:{has:e=>`timeEnd`in e,get:e=>e.timeEnd,set:(e,t)=>{e.timeEnd=t}},metadata:k},l,u),ao(this,null,d,{kind:`accessor`,name:`pollEnded`,static:!1,private:!1,access:{has:e=>`pollEnded`in e,get:e=>e.pollEnded,set:(e,t)=>{e.pollEnded=t}},metadata:k},f,p),ao(this,null,m,{kind:`accessor`,name:`multipleAnswers`,static:!1,private:!1,access:{has:e=>`multipleAnswers`in e,get:e=>e.multipleAnswers,set:(e,t)=>{e.multipleAnswers=t}},metadata:k},h,g),ao(this,null,_,{kind:`accessor`,name:`pollVoted`,static:!1,private:!1,access:{has:e=>`pollVoted`in e,get:e=>e.pollVoted,set:(e,t)=>{e.pollVoted=t}},metadata:k},v,y),ao(this,null,b,{kind:`accessor`,name:`showResults`,static:!1,private:!1,access:{has:e=>`showResults`in e,get:e=>e.showResults,set:(e,t)=>{e.showResults=t}},metadata:k},x,S),ao(this,null,C,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:k},w,T),ao(this,null,E,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:k},ee,D),ao(null,t={value:r},e,{kind:`class`,name:r.name,metadata:k},null,n),O=r=t.value,k&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:k})}static styles=L`
		:host {
			display: flex;
			flex-direction: column;
			background-color: color-mix(in oklab, hsl(220 calc(1 * 6.5%) 18% / 1) 100%, black 0%);
			border-radius: 8px;
			padding: 16px;
			width: 100%;
			max-width: 472px;
			min-width: 302px;
			box-sizing: border-box;
			position: relative;
			overflow: hidden;
		}

		:host([light-theme]) {
			border: 1px solid color-mix(in oklab, hsl(0 calc(1 * 0%) 0% / 0.08) 100%, hsl(0 0% 0% / 0.08) 0%);
			background-color: color-mix(in oklab, hsl(0 calc(1 * 0%) 100% / 1) 100%, black 0%) !important;
		}

		:host([light-theme]) * {
			color: black;
		}

		.discord-poll-question {
			color: color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%);
			margin: 0;
			font-size: 1rem;
			word-break: break-word;
			line-height: 1.25;
			font-weight: 500;
		}

		.discord-poll-select {
			font-size: 0.875rem;
			grid-area: prompt;
			color: color-mix(in oklab, hsl(214 calc(1 * 8.1%) 61.2% / 1) 100%, black 0%) !important;
		}

		.discord-poll-answers {
			display: grid;
			grid-template-columns: 1fr;
			grid-auto-rows: 1fr;
			grid-gap: 8px;
			gap: 8px;
			margin: 8px 0 16px;
		}

		.discord-poll-footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.discord-poll-footer-votes-time {
			display: flex;
			align-items: center;
			color: color-mix(in oklab, hsl(214 calc(1 * 8.1%) 61.2% / 1) 100%, black 0%);
			font-size: 0.875rem;
			line-height: 1.2857142857142858;
			font-weight: 400;
		}

		.discord-poll-footer-time::before {
			content: '∙';
			margin: 0px 0.5rem;
			font-weight: 800;
		}

		.discord-poll-footer-time {
			display: flex;
			align-items: center;
		}

		.discord-poll-footer-hover:hover {
			color: #fff;
			text-decoration: underline;
			cursor: pointer;
		}

		:host([light-theme]) .discord-poll-footer-hover:hover {
			color: black;
			text-decoration: underline;
			cursor: pointer;
		}

		:host([light-theme]) .discord-poll-color-show-results {
			color: black !important;
		}

		.discord-poll-color-show-results {
			color: #fff !important;
			font-size: 0.875rem;
			font-weight: 600;
		}

		.discord-poll-result-vote {
			display: flex;
			align-items: center;
			gap: 15px;
		}

		:host .discord-poll-button-vote {
			cursor: pointer;
			background-color: hsl(235 calc(1 * 85.6%) 64.7% / 1) !important;
			color: hsl(0 calc(1 * 0%) 100% / 1) !important;
			padding: 9px 16px;
			border: none;
			border-radius: 3px;
			font-weight: 600;
		}

		:host .discord-poll-button-remove-vote {
			cursor: pointer;
			background-color: color-mix(in oklab, hsl(228 calc(1 * 6.7%) 14.7% / 1) 100%, black 0%) !important;
			color: color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%) !important;
			padding: 9px 16px;
			border: none;
			border-radius: 3px;
			font-weight: 600;
		}

		:host([light-theme]) button * {
			color: white !important;
		}

		:host .discord-poll-button-vote-disabled {
			cursor: no-drop;
			opacity: 0.5;
		}
	`;#e=oo(this,o,void 0);get question(){return this.#e}set question(e){this.#e=e}#t=(oo(this,s),oo(this,l,`24h`));get timeEnd(){return this.#t}set timeEnd(e){this.#t=e}#n=(oo(this,u),oo(this,f,!1));get pollEnded(){return this.#n}set pollEnded(e){this.#n=e}#r=(oo(this,p),oo(this,h,!1));get multipleAnswers(){return this.#r}set multipleAnswers(e){this.#r=e}#i=(oo(this,g),oo(this,v,!1));get pollVoted(){return this.#i}set pollVoted(e){this.#i=e}#a=(oo(this,y),oo(this,x,!1));get showResults(){return this.#a}set showResults(e){this.#a=e}#o=(oo(this,S),oo(this,w,!1));get compactMode(){return this.#o}set compactMode(e){this.#o=e}#s=(oo(this,T),oo(this,ee,!1));get lightTheme(){return this.#s}set lightTheme(e){this.#s=e}#c=(oo(this,D),!1);get selected(){return this.#c}set selected(e){this.#c=e}#l=0;get totVotes(){return this.#l}set totVotes(e){this.#l=e}connectedCallback(){super.connectedCallback();let e=this.parentElement?.querySelectorAll(`discord-poll-answer`);if(e)for(let t=0;t<e?.length;t++)e[t].attributes.getNamedItem(`selected`)&&(this.selected=!0),this.totVotes+=e[t].attributes.getNamedItem(`votes`)?.nodeValue?Number(e[t].attributes.getNamedItem(`votes`)?.nodeValue):0}render(){let e=this.multipleAnswers?`Select one or more answers`:`Select one answer`;return R`<div>
			<h4 class="discord-poll-question">${this.question}</h4>
			<div class="discord-poll-select">${e}</div>
			<div class="discord-poll-answers">
				<slot></slot>
			</div>
			<div class="discord-poll-footer">
				<div class="discord-poll-footer-votes-time">
					<span class="discord-poll-footer-hover">${this.totVotes} votes</span>
					<div class="discord-poll-footer-time">${this.pollEnded?`Poll closed`:`${this.timeEnd} left`}</div>
				</div>
				${K(!this.pollEnded&&!this.pollVoted&&!this.showResults,()=>R`<div class="discord-poll-result-vote">
							<div class="discord-poll-footer-hover discord-poll-color-show-results">Show results</div>
							<button
								type="button"
								class="${W({"discord-poll-button-vote":!0,"discord-poll-button-vote-disabled":!this.selected})}"
							>
								<div>Vote</div>
							</button>
						</div>`)}
				${K(!this.pollEnded&&this.pollVoted||this.showResults,()=>R`
						<button type="button" class="discord-poll-button-remove-vote">
							<div>${!this.pollEnded&&this.pollVoted?`Remove vote`:`Go back to vote`}</div>
						</button>
					`)}
			</div>
		</div> `}static{oo(r,n)}};return r})(),po=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},mo=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ho=(()=>{let e=[V(`discord-poll-answer`)],t,n=[],r,i=B,a=[],o,s=[],c=[],l,u=[],d=[],f,p=[],m=[],h,g=[],_=[],v,y=[],b=[],x,S=[],C=[],w,T=[],E=[],ee,D=[],O=[],k,te=[],A=[],j,ne=[],re=[],M;var N=class extends i{static{r=this}static{let P=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;o=[H({type:String,attribute:`emoji`,reflect:!0})],l=[H({type:String,attribute:`answer`,reflect:!0})],f=[H({type:Number,attribute:`votes`,reflect:!0})],h=[H({type:Boolean,attribute:`selected`,reflect:!0})],v=[U({context:mr})],x=[U({context:so})],w=[U({context:co})],ee=[U({context:lo})],k=[U({context:uo})],j=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],M=[xt({once:!1,capture:!0,passive:!0})],mo(this,null,o,{kind:`accessor`,name:`emoji`,static:!1,private:!1,access:{has:e=>`emoji`in e,get:e=>e.emoji,set:(e,t)=>{e.emoji=t}},metadata:P},s,c),mo(this,null,l,{kind:`accessor`,name:`answer`,static:!1,private:!1,access:{has:e=>`answer`in e,get:e=>e.answer,set:(e,t)=>{e.answer=t}},metadata:P},u,d),mo(this,null,f,{kind:`accessor`,name:`votes`,static:!1,private:!1,access:{has:e=>`votes`in e,get:e=>e.votes,set:(e,t)=>{e.votes=t}},metadata:P},p,m),mo(this,null,h,{kind:`accessor`,name:`selected`,static:!1,private:!1,access:{has:e=>`selected`in e,get:e=>e.selected,set:(e,t)=>{e.selected=t}},metadata:P},g,_),mo(this,null,v,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:P},y,b),mo(this,null,x,{kind:`accessor`,name:`multipleAnswers`,static:!1,private:!1,access:{has:e=>`multipleAnswers`in e,get:e=>e.multipleAnswers,set:(e,t)=>{e.multipleAnswers=t}},metadata:P},S,C),mo(this,null,w,{kind:`accessor`,name:`pollEnded`,static:!1,private:!1,access:{has:e=>`pollEnded`in e,get:e=>e.pollEnded,set:(e,t)=>{e.pollEnded=t}},metadata:P},T,E),mo(this,null,ee,{kind:`accessor`,name:`pollVoted`,static:!1,private:!1,access:{has:e=>`pollVoted`in e,get:e=>e.pollVoted,set:(e,t)=>{e.pollVoted=t}},metadata:P},D,O),mo(this,null,k,{kind:`accessor`,name:`showResult`,static:!1,private:!1,access:{has:e=>`showResult`in e,get:e=>e.showResult,set:(e,t)=>{e.showResult=t}},metadata:P},te,A),mo(this,null,j,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:P},ne,re),mo(this,null,M,{kind:`method`,name:`_onClick`,static:!1,private:!1,access:{has:e=>`_onClick`in e,get:e=>e._onClick},metadata:P},null,a),mo(null,t={value:r},e,{kind:`class`,name:r.name,metadata:P},null,n),N=r=t.value,P&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:P})}static styles=L`
		.discord-answer-container {
			display: flex;
			cursor: pointer;
		}

		.discord-answer-emoji {
			width: 24px;
			height: 24px;
			margin-right: 2px;
			border-radius: 3px;
		}

		.discord-checkbox-div-multiple-answer {
			flex-shrink: 0;
			width: 20px;
			height: 20px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 3px;
			background-color: transparent;
			border: 2px solid color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%);
		}

		.discord-checkbox-div-multiple-answer-selected {
			width: 20px;
			height: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 3px;
			background-color: hsl(235 calc(1 * 85.6%) 64.7% / 1);
		}

		.discord-checkbox-div-answer-selected-ended-winner {
			width: 24px;
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 99px;
			background-color: seagreen;
		}

		.discord-checkbox-div-answer-selected-ended-no-winner {
			width: 24px;
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 99px;
			background-color: white;
			color: black !important;
		}

		.discord-checkbox-div-answer-selected-voted {
			width: 24px;
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 99px;
			background-color: hsl(235 calc(1 * 85.6%) 64.7% / 1);
		}

		.discord-checkbox-div-answer {
			flex-shrink: 0;
			width: 20px;
			height: 20px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 99px;
			background-color: transparent;
			border: 2px solid color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%);
		}

		.discord-checkbox-div-answer-selected {
			margin: 2px;
			width: 10px;
			height: 10px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 99px;
			border: 2px solid transparent;
			background-color: color-mix(in oklab, hsl(235 calc(1 * 86.1%) 77.5% / 1) 100%, black 0%);
		}

		.discord-answer-hidden {
			display: none;
		}

		.discord-answer-flex {
			display: flex;
			align-items: center;
			gap: 8px;
		}

		.discord-answer-selected {
			outline: 1px solid color-mix(in oklab, hsl(235 calc(1 * 86.1%) 77.5% / 1) 100%, black 0%) !important;
		}

		.discord-answer-selected-ended {
			outline: 1px solid hsl(145 calc(1 * 65%) 39.2% / 1) !important;
		}

		.discord-answer {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			min-height: 50px;
			padding: 8px 16px;
			box-sizing: border-box;
			background-color: color-mix(in oklab, hsl(228 calc(1 * 6%) 32.5% / 0.3) 100%, hsl(0 0% 0% / 0.3) 0%);
			border-radius: 8px;
			color: color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%);
			word-break: break-word;
			overflow: hidden;
			outline: 1px solid transparent;
			z-index: 1;
			transition:
				background-color 170ms ease,
				outline-color 170ms ease;
		}

		:host([light-theme]) .discord-answer {
			background-color: color-mix(in oklab, hsl(223 calc(1 * 5.8%) 52.9% / 0.08) 100%, hsl(0 0% 0% / 0.08) 0%) !important;
		}

		:host([light-theme]) .discord-background-color-default {
			background-color: color-mix(in oklab, hsl(223 calc(1 * 5.8%) 52.9% / 0.2) 100%, hsl(0 0% 0% / 0.2) 0%) !important;
		}

		:host([light-theme]) .discord-awnswer-title,
		:host([light-theme]) .discord-quantity-votes,
		:host([light-theme]) .discord-percentage-votes {
			color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%) !important;
		}

		:host([light-theme]) .discord-checkbox-div-answer,
		:host([light-theme]) .discord-checkbox-div-multiple-answer {
			border-color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%) !important;
		}

		:host([light-theme]) .discord-checkbox-div-answer-selected-ended-no-winner {
			background-color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%);
			color: white !important;
		}

		.discord-answer-no-margin {
			margin: 0;
		}

		.discord-quantity-votes:hover {
			cursor: pointer;
			text-decoration: underline;
		}

		.discord-answer-backdround-color {
			content: '';
			position: absolute;
			height: 100%;
			left: 0;
			z-index: -1;
		}

		.discord-background-color-winner {
			background-color: color-mix(in oklab, hsl(145 calc(1 * 65%) 39.2% / 0.2) 100%, hsl(0 0% 0% / 0.2) 0%);
		}

		.discord-background-color-default {
			background-color: color-mix(in oklab, hsl(228 calc(1 * 6%) 32.5% / 0.48) 100%, hsl(0 0% 0% / 0.48) 0%);
		}

		.discord-background-color-selected {
			background-color: color-mix(in oklab, hsl(235 calc(1 * 85.6%) 64.7% / 0.2) 100%, hsl(0 0% 0% / 0.2) 0%);
		}
	`;#e=(po(this,a),po(this,s,void 0));get emoji(){return this.#e}set emoji(e){this.#e=e}#t=(po(this,c),po(this,u,void 0));get answer(){return this.#t}set answer(e){this.#t=e}#n=(po(this,d),po(this,p,0));get votes(){return this.#n}set votes(e){this.#n=e}#r=(po(this,m),po(this,g,!1));get selected(){return this.#r}set selected(e){this.#r=e}#i=(po(this,_),po(this,y,!1));get compactMode(){return this.#i}set compactMode(e){this.#i=e}#a=(po(this,b),po(this,S,!1));get multipleAnswers(){return this.#a}set multipleAnswers(e){this.#a=e}#o=(po(this,C),po(this,T,!1));get pollEnded(){return this.#o}set pollEnded(e){this.#o=e}#s=(po(this,E),po(this,D,!1));get pollVoted(){return this.#s}set pollVoted(e){this.#s=e}#c=(po(this,O),po(this,te,!1));get showResult(){return this.#c}set showResult(e){this.#c=e}#l=(po(this,A),po(this,ne,!1));get lightTheme(){return this.#l}set lightTheme(e){this.#l=e}#u=(po(this,re),0);get totalVotesPoll(){return this.#u}set totalVotesPoll(e){this.#u=e}#d;get percentageVoted(){return this.#d}set percentageVoted(e){this.#d=e}#f=[];get arrayAnswers(){return this.#f}set arrayAnswers(e){this.#f=e}#p=[];get winners(){return this.#p}set winners(e){this.#p=e}connectedCallback(){super.connectedCallback();let e=this.parentElement?.getElementsByTagName(`discord-poll-answer`);if(e)for(let t=0;t<e?.length;t++){let n=e[t].attributes.getNamedItem(`votes`)?Number(e[t].attributes.getNamedItem(`votes`)?.nodeValue):0;this.arrayAnswers.push({answer:e[t].attributes.getNamedItem(`answer`)?.nodeValue,value:n}),this.arrayAnswers=this.arrayAnswers.toSorted((e,t)=>t.value-e.value),this.totalVotesPoll+=n}for(let e=0;e<this.arrayAnswers?.length;e++)if(this.winners.includes(this.arrayAnswers[e].answer)||this.winners.push(this.arrayAnswers[e].answer),this.arrayAnswers[e+1]){if(this.arrayAnswers[e].value===this.arrayAnswers[e+1].value)this.winners.includes(this.arrayAnswers[e+1].answer)||this.winners.push(this.arrayAnswers[e+1].answer);else break}if(this.parentElement?.getAttribute(`multiple-answers`)!==``){let t=0;if(e)for(let n of e)n.selected&&t++;if(t>1)throw new Gr(`<discord-poll> single vote was selected more than 1 answer`)}this.percentageVoted=this.votes/this.totalVotesPoll*100}render(){return this.percentageVoted=this.percentageVoted.toPrecision(3).split(`.`)[1]===`0`?Number(this.percentageVoted.toPrecision(3).split(`.`)[0]):Number(this.percentageVoted.toPrecision(3)),R`
			<label>
				<div class="${W({"discord-answer-container":!this.pollVoted&&!this.pollEnded&&!this.showResult})}">
					<div
						class="${W({"discord-answer":!0,"discord-answer-selected":this.selected&&!this.pollEnded&&!this.showResult,"discord-answer-selected-ended":this.pollEnded&&this.winners.includes(this.answer)})}"
					>
						<div
							class=${W({"discord-answer-backdround-color":!0,"discord-background-color-selected":!this.pollEnded&&this.selected&&this.pollVoted,"discord-background-color-winner":this.pollEnded&&this.winners.includes(this.answer),"discord-background-color-default":this.pollEnded&&!this.winners.includes(this.answer)||!this.pollEnded&&!this.selected&&this.pollVoted||this.showResult})}
							style="width:${this.percentageVoted}%;"
						></div>
						<div class="discord-answer-flex">
							${K(this.emoji,()=>R`<img class="discord-answer-emoji" src="${this.emoji}" alt="emoji" />`)}
							<div class="discord-awnswer-title">${this.answer}</div>
						</div>
						<div class="discord-answer-flex">
							${K(this.pollVoted||this.pollEnded||this.showResult,()=>R`<h5 class="discord-answer-no-margin discord-quantity-votes">
										${this.votes} ${this.votes>1||this.votes===0?`votes`:`vote`}
									</h5>`)}
							${K(this.pollVoted||this.pollEnded||this.showResult,()=>R`<h4 class="discord-answer-no-margin discord-percentage-votes">${this.percentageVoted}%</h4>`)}
							${K(this.selected&&!this.showResult,()=>K(this.multipleAnswers,()=>K(this.pollEnded,()=>K(this.winners.includes(this.answer),()=>R`<div class="discord-checkbox-div-answer-selected-ended-winner">
																${Rr({style:`width:24px;height:24px;`})}
															</div>`,()=>R`<div class="discord-checkbox-div-answer-selected-ended-no-winner">
																${Rr({style:`width:24px;height:24px;`})}
															</div>`),()=>K(!this.pollVoted,()=>R`<div class="discord-checkbox-div-multiple-answer-selected">
																${Rr({style:`width:24px;height:24px;`})}
															</div>`,()=>R`<div class="discord-checkbox-div-answer-selected-voted">
																${Rr({style:`width:24px;height:24px;`})}
															</div>`)),()=>K(this.pollEnded,()=>R`<div class="discord-checkbox-div-answer-selected-ended-winner">
														${Rr({style:`width:24px;height:24px;`})}
													</div>`,()=>K(!this.pollVoted,()=>R`
															<div class="discord-checkbox-div-answer">
																<div class="discord-checkbox-div-answer-selected"></div>
															</div>
														`,()=>R`<div class="discord-checkbox-div-answer-selected-voted">
																${Rr({style:`width:24px;height:24px;`})}
															</div>`))),()=>K(!this.pollEnded&&!this.pollVoted&&!this.showResult,()=>R`<div
												class="${W({"discord-checkbox-div-multiple-answer":this.multipleAnswers,"discord-checkbox-div-answer":!this.multipleAnswers})}"
											></div>`))}
						</div>
					</div>
					<span class="discord-answer-hidden"><input type="checkbox" @click=${()=>this._onClick()} /></span>
				</div>
			</label>
		`}_onClick(){if(this.pollEnded||this.pollVoted)return;let e=this.parentElement,t=e?.shadowRoot?.querySelector(`button.discord-poll-button-vote`),n=e?.getElementsByTagName(`discord-poll-answer`);if(this.selected){if(this.selected=!1,t){if(e?.getAttribute(`multiple-answers`)===``){let e=0;if(n)for(let t of n)t.selected&&e++;if(e>0){t.className=`discord-poll-button-vote`;return}}t.className=`discord-poll-button-vote discord-poll-button-vote-disabled`}}else{if(e?.getAttribute(`multiple-answers`)!==``&&n)for(let e of n)e.selected=!1;t&&(t.className=`discord-poll-button-vote`),this.selected=!0}}static{po(r,n)}};return r})(),go=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},_o=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},vo=(()=>{let e=[V(`discord-pre`)],t,n=[],r,i=B,a,o=[],s=[];var c=class extends i{static{r=this}static{let l=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({type:Boolean,reflect:!0})],go(this,null,a,{kind:`accessor`,name:`embed`,static:!1,private:!1,access:{has:e=>`embed`in e,get:e=>e.embed,set:(e,t)=>{e.embed=t}},metadata:l},o,s),go(null,t={value:r},e,{kind:`class`,name:r.name,metadata:l},null,n),c=r=t.value,l&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:l})}static styles=L`
		:host pre {
			border-radius: 4px;
			padding: 0;
			font-size: 0.75rem;
			line-height: 1rem;
			margin-top: 6px;
			white-space: pre-wrap;
			background-clip: border-box;
			width: 90%;
			border: none;
		}

		:host([embed]) pre {
			margin: 0;
			margin-top: 6px;
			width: 100%;
		}
	`;#e=_o(this,o,!1);get embed(){return this.#e}set embed(e){this.#e=e}render(){return R`<pre><slot></slot
		></pre>`}constructor(){super(...arguments),_o(this,s)}static{_o(r,n)}};return r})(),yo=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},bo=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},xo=(()=>{let e=[V(`discord-quote`)],t,n=[],r,i=B,a,o=[],s=[];var c=class extends i{static{r=this}static{let l=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[U({context:J,subscribe:!0}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],yo(this,null,a,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:l},o,s),yo(null,t={value:r},e,{kind:`class`,name:r.name,metadata:l},null,n),c=r=t.value,l&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:l})}static styles=L`
		:host {
			display: flex;
		}

		.discord-quote-divider {
			background-color: #4f545c;
			border-radius: 4px;
			font-size: 0.9em;
			font-style: normal;
			font-weight: 400;
			margin: 0;
			padding: 0;
			width: 4px;
		}

		:host([light-theme]) .discord-quote-divider {
			background-color: #c4c9ce;
		}

		blockquote {
			margin-block-end: unset;
			margin-block-start: unset;
			margin-inline-end: unset;
			margin-inline-start: unset;
			padding: 0 8px 0 12px;
		}
	`;#e=bo(this,o,!1);get lightTheme(){return this.#e}set lightTheme(e){this.#e=e}render(){return R`
			<div class="discord-quote-divider"></div>
			<!-- display: inline -->
			<blockquote><slot></slot></blockquote>
		`}constructor(){super(...arguments),bo(this,s)}static{bo(r,n)}};return r})(),So=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Co=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},wo=(()=>{let e=[V(`discord-reaction`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[];var C=class extends i{static{r=this}static{let w=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H()],d=[H({type:Number})],m=[H({type:Boolean,reflect:!0})],_=[H({type:Boolean})],b=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],So(this,null,a,{kind:`accessor`,name:`emoji`,static:!1,private:!1,access:{has:e=>`emoji`in e,get:e=>e.emoji,set:(e,t)=>{e.emoji=t}},metadata:w},o,s),So(this,null,c,{kind:`accessor`,name:`name`,static:!1,private:!1,access:{has:e=>`name`in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:w},l,u),So(this,null,d,{kind:`accessor`,name:`count`,static:!1,private:!1,access:{has:e=>`count`in e,get:e=>e.count,set:(e,t)=>{e.count=t}},metadata:w},f,p),So(this,null,m,{kind:`accessor`,name:`reacted`,static:!1,private:!1,access:{has:e=>`reacted`in e,get:e=>e.reacted,set:(e,t)=>{e.reacted=t}},metadata:w},h,g),So(this,null,_,{kind:`accessor`,name:`interactive`,static:!1,private:!1,access:{has:e=>`interactive`in e,get:e=>e.interactive,set:(e,t)=>{e.interactive=t}},metadata:w},v,y),So(this,null,b,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:w},x,S),So(null,t={value:r},e,{kind:`class`,name:r.name,metadata:w},null,n),C=r=t.value,w&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:w})}static styles=L`
		:host > *:first-child {
			border-radius: 0.5rem;
			cursor: pointer;
			flex-shrink: 0;
			margin-right: 0.25rem;
			margin-bottom: 0.25rem;
			user-select: none;
			transition: none 0.1s ease;
			transition-property: background-color, border-color;
			background-color: #2f3136;
			border: 1px solid transparent;
		}

		:host([light-theme]) > *:first-child {
			background-color: #f2f3f5;
		}

		:host > *:first-child:hover {
			background-color: #36393f;
			border-color: #fff2;
		}

		:host([light-theme]:not([reacted])) > *:first-child:hover {
			background-color: white;
			border-color: #0003;
		}

		:host([reacted]) > *:first-child {
			background-color: rgba(88, 101, 242, 0.15);
			border-color: #5865f2;
		}

		:host([light-theme][reacted]) > *:first-child {
			background-color: #e7e9fd;
		}

		:host .discord-reaction-inner {
			display: flex;
			align-items: center;
			padding: 0.125rem 0.375rem;
		}

		:host img {
			width: 1rem;
			height: 1rem;
			margin: 0.125rem 0;
			min-width: auto;
			min-height: auto;
			object-fit: contain;
			vertical-align: bottom;
		}

		:host .discord-reaction-count {
			font-size: 0.875rem;
			font-weight: 500;
			margin-left: 0.375rem;
			text-align: center;
			color: #b9bbbe;
		}

		:host([light-theme]) .discord-reaction-count {
			color: #4f5660;
		}

		:host([reacted]) .discord-reaction-count {
			color: #dee0fc;
		}

		:host([light-theme][reacted]) .discord-reaction-count {
			color: #5865f2;
		}
	`;#e=Co(this,o,void 0);get emoji(){return this.#e}set emoji(e){this.#e=e}#t=(Co(this,s),Co(this,l,`:emoji:`));get name(){return this.#t}set name(e){this.#t=e}#n=(Co(this,u),Co(this,f,1));get count(){return this.#n}set count(e){this.#n=e}#r=(Co(this,p),Co(this,h,!1));get reacted(){return this.#r}set reacted(e){this.#r=e}#i=(Co(this,g),Co(this,v,!1));get interactive(){return this.#i}set interactive(e){this.#i=e}#a=(Co(this,y),Co(this,x,!1));get lightTheme(){return this.#a}set lightTheme(e){this.#a=e}render(){return R`<div class="discord-reaction-inner" @click=${this.handleReactionClick} @keydown=${this.handleReactionClick}>
			${K(this.emoji?.includes(`http`)||this.emoji?.startsWith(`/`)||this.emoji?.startsWith(`./`),()=>R`<img src=${G(this.emoji)} alt=${G(this.name)} draggable="false" />`,()=>R`<span>${this.emoji}</span>`)}
			<span class="discord-reaction-count">${this.count}</span>
		</div>`}handleReactionClick=(Co(this,S),e=>{this.interactive&&(e.shiftKey?this.count--:this.count++,this.count<=0&&(this.count=1))});static{Co(r,n)}};return r})(),To=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Eo=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Do=(()=>{let e=[V(`discord-reactions`)],t,n=[],r,i=B;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;To(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=L`
		:host {
			display: flex;
			-webkit-box-flex: 1;
			-ms-flex: 1 0 auto;
			flex: 1 0 auto;
			align-items: center;
			flex-wrap: wrap;
		}
	`;render(){return R`<slot></slot>`}static{Eo(r,n)}};return r})(),Oo=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ko=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ao=(()=>{let e=[V(`discord-spoiler`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[];var d=class extends i{static{r=this}static{let f=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({type:Boolean,reflect:!0})],c=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],Oo(this,null,a,{kind:`accessor`,name:`activated`,static:!1,private:!1,access:{has:e=>`activated`in e,get:e=>e.activated,set:(e,t)=>{e.activated=t}},metadata:f},o,s),Oo(this,null,c,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:f},l,u),Oo(null,t={value:r},e,{kind:`class`,name:r.name,metadata:f},null,n),d=r=t.value,f&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:f})}static styles=L`
		:host {
			background-color: #202225;
			border-radius: 3px;
			color: transparent;
			cursor: pointer;
		}

		:host([light-theme]) {
			background-color: #c4c9ce;
		}

		:host(:hover) {
			background-color: rgba(32, 34, 37, 0.8);
		}

		:host([light-theme]:hover) {
			background-color: #cfd3d7;
		}

		:host([activated]) {
			color: inherit;
			background-color: hsla(0, 0%, 100%, 0.1);
		}

		:host([light-theme][activated]) {
			background-color: #e5e5e5;
		}
	`;#e=ko(this,o,!1);get activated(){return this.#e}set activated(e){this.#e=e}#t=(ko(this,s),ko(this,l,!1));get lightTheme(){return this.#t}set lightTheme(e){this.#t=e}render(){return R`<slot
			@click=${()=>{this.activated=!0}}
			@keydown=${()=>{this.activated=!0}}
		></slot>`}constructor(){super(...arguments),ko(this,u)}static{ko(r,n)}};return r})(),jo=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Mo=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},No=(()=>{let e=[V(`discord-string-select-menu`)],t,n=[],r,i=B,a=[],o,s=[],c=[],l,u=[],d=[],f,p=[],m=[],h;var g=class extends i{static{r=this}static{let _=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;o=[H({type:Boolean,attribute:`disabled`})],l=[H({attribute:`placeholder`})],f=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],h=[xt({once:!1,capture:!0,passive:!0})],Mo(this,null,o,{kind:`accessor`,name:`disabled`,static:!1,private:!1,access:{has:e=>`disabled`in e,get:e=>e.disabled,set:(e,t)=>{e.disabled=t}},metadata:_},s,c),Mo(this,null,l,{kind:`accessor`,name:`placeholder`,static:!1,private:!1,access:{has:e=>`placeholder`in e,get:e=>e.placeholder,set:(e,t)=>{e.placeholder=t}},metadata:_},u,d),Mo(this,null,f,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:_},p,m),Mo(this,null,h,{kind:`method`,name:`_onClick`,static:!1,private:!1,access:{has:e=>`_onClick`in e,get:e=>e._onClick},metadata:_},null,a),Mo(null,t={value:r},e,{kind:`class`,name:r.name,metadata:_},null,n),g=r=t.value,_&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:_})}static styles=L`
		.discord-string-select-menu {
			height: 36px;
			min-height: 36px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			cursor: pointer;
			color: color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%);
			border: 1px solid;
			border-radius: 4px;
			background-color: color-mix(in oklab, hsl(225 calc(1 * 6.3%) 12.5% / 1) 100%, black 0%);
			border-color: color-mix(in oklab, hsl(225 calc(1 * 6.3%) 12.5% / 1) 100%, black 0%);
			padding: 8px !important;
			width: 90%;
			max-width: 400px;
			margin-right: 16px;
			transition: border 0.2s ease;
			font-weight: 500;
		}

		:host([light-theme]) .discord-string-select-menu {
			background-color: #ebebeb !important;
			border-color: #b5b5b5 !important;
			border: 1px solid;
			color: #2e3338;
		}

		:host([light-theme]) .discord-string-select-menu-option-slot {
			background-color: #ebebeb !important;
			border-color: #b5b5b5 !important;
			border: 1px solid;
			color: #2e3338;
		}

		.discord-string-select-menu-option-slot {
			overflow-y: auto;
			overflow-x: hidden;
			color: currentColor;
			border: none;
			border-top-left-radius: 0px;
			border-top-right-radius: 0px;
			border-color: color-mix(in oklab, hsl(225 calc(1 * 6.3%) 12.5% / 1) 100%, black 0%);
			background-color: color-mix(in oklab, hsl(220 calc(1 * 6.5%) 18% / 1) 100%, black 0%);
			cursor: pointer;
			box-sizing: border-box;
			border-radius: 4px;
			gap: 10px;
			display: block;
			max-height: 190px;
			position: absolute;
			width: 90%;
			max-width: 400px;
			z-index: 1002;
		}

		.discord-string-select-menu-option-slot::-webkit-scrollbar {
			width: 5px;
			background-color: transparent;
		}

		.discord-string-select-menu-option-slot::-webkit-scrollbar-track {
			background-color: transparent;
		}

		.discord-string-select-menu-option-slot::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: rgba(0, 0, 0, 0.3);
		}

		.discord-string-select-menu-label {
			width: 100%;
		}

		.discord-string-select-inside-menu {
			padding: 8px 8px 8px 12px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.discord-string-select-menu-hidden {
			display: none;
		}

		.discord-string-select-menu-disabled {
			cursor: not-allowed !important;
			opacity: 0.5;
		}

		.discord-string-select-inside-menu:hover {
			border-color: black;
			cursor: pointer;
		}

		.discord-string-select-menu-rotated {
			transform: rotate(-180deg);
		}

		.discord-expand-more-icon {
			margin-left: auto;
		}
	`;#e=(jo(this,a),jo(this,s,void 0));get disabled(){return this.#e}set disabled(e){this.#e=e}#t=(jo(this,c),jo(this,u,`Make a selection`));get placeholder(){return this.#t}set placeholder(e){this.#t=e}#n=(jo(this,d),jo(this,p,!1));get lightTheme(){return this.#n}set lightTheme(e){this.#n=e}render(){return R`
			<label
				class="${W({"discord-string-select-menu-label":!0,"discord-string-select-menu":!0,"discord-string-select-menu-disabled":this.disabled})}"
			>
				<span>${this.placeholder}</span> ${Ai({class:`discord-expand-more-icon`})}
				<span class="discord-string-select-menu-hidden"><input type="checkbox" @click=${this._onClick} /></span>
			</label>
			<div class="discord-string-select-menu-option-slot discord-string-select-menu-hidden"><slot></slot></div>
		`}_onClick(){let e=this.shadowRoot?.querySelectorAll(`svg.discord-expand-more-icon`).item(0),t=this.shadowRoot?.querySelectorAll(`div.discord-string-select-menu-option-slot`).item(0);(this.shadowRoot?.querySelectorAll(`label.discord-string-select-menu`).item(0))?.className.includes(`discord-string-select-menu-disabled`)||(t?.className.includes(`discord-string-select-menu-hidden`)?(t?.setAttribute(`class`,`discord-string-select-menu-option-slot`),e?.setAttribute(`class`,`discord-expand-more-icon discord-string-select-menu-rotated`)):(t?.setAttribute(`class`,`discord-string-select-menu-option-slot discord-string-select-menu-hidden`),e?.setAttribute(`class`,`discord-expand-more-icon`)))}constructor(){super(...arguments),jo(this,m)}static{jo(r,n)}};return r})(),Po=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Fo=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Io=(()=>{let e=[V(`discord-string-select-menu-option`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[];var C=class extends i{static{r=this}static{let w=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({reflect:!0,attribute:`emoji`})],c=[H({reflect:!0,attribute:`emoji-name`})],d=[H({attribute:`label`})],m=[H({attribute:`description`})],_=[H({reflect:!1,noAccessor:!0,attribute:!1})],b=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],Po(this,null,a,{kind:`accessor`,name:`emoji`,static:!1,private:!1,access:{has:e=>`emoji`in e,get:e=>e.emoji,set:(e,t)=>{e.emoji=t}},metadata:w},o,s),Po(this,null,c,{kind:`accessor`,name:`emojiName`,static:!1,private:!1,access:{has:e=>`emojiName`in e,get:e=>e.emojiName,set:(e,t)=>{e.emojiName=t}},metadata:w},l,u),Po(this,null,d,{kind:`accessor`,name:`label`,static:!1,private:!1,access:{has:e=>`label`in e,get:e=>e.label,set:(e,t)=>{e.label=t}},metadata:w},f,p),Po(this,null,m,{kind:`accessor`,name:`description`,static:!1,private:!1,access:{has:e=>`description`in e,get:e=>e.description,set:(e,t)=>{e.description=t}},metadata:w},h,g),Po(this,null,_,{kind:`accessor`,name:`selectOption`,static:!1,private:!1,access:{has:e=>`selectOption`in e,get:e=>e.selectOption,set:(e,t)=>{e.selectOption=t}},metadata:w},v,y),Po(this,null,b,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:w},x,S),Po(null,t={value:r},e,{kind:`class`,name:r.name,metadata:w},null,n),C=r=t.value,w&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:w})}static styles=L`
		label {
			display: flex;
			align-items: center;
			max-width: 400px;
			padding: 8px 8px 8px 12px;
			gap: 10px;
			font-size: small;
			cursor: pointer;
		}

		label:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}

		:host([light-theme]) {
			background-color: #f2f3f5 !important;
			border-color: #d9d9d9 !important;
			color: #2e3338;
		}

		:host([light-theme]) label:hover {
			background-color: rgba(204, 204, 204, 2) !important;
		}

		.discord-string-select-menu-option-emoji {
			margin-right: 4px;
			object-fit: contain;
			width: 1.375em;
			height: 1.375em;
			vertical-align: bottom;
		}

		.discord-string-select-menu-option-ellipsis-text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.discord-string-select-menu-option-hidden {
			display: none;
		}
	`;#e=Fo(this,o,void 0);get emoji(){return this.#e}set emoji(e){this.#e=e}#t=(Fo(this,s),Fo(this,l,`emoji`));get emojiName(){return this.#t}set emojiName(e){this.#t=e}#n=(Fo(this,u),Fo(this,f,void 0));get label(){return this.#n}set label(e){this.#n=e}#r=(Fo(this,p),Fo(this,h,void 0));get description(){return this.#r}set description(e){this.#r=e}#i=(Fo(this,g),Fo(this,v,void 0));get selectOption(){return this.#i}set selectOption(e){this.#i=e}checkLabelIsProvided(){if(!this.label)throw new Gr(`The label of option is required`)}#a=(Fo(this,y),Fo(this,x,!1));get lightTheme(){return this.#a}set lightTheme(e){this.#a=e}render(){return this.checkLabelIsProvided(),R`
			<label>
				${K(this.emoji,()=>K(this.emoji?.includes(`http`)||this.emoji?.startsWith(`/`)||this.emoji?.startsWith(`./`),()=>R`<img
								src=${this.emoji}
								alt=${G(this.emojiName)}
								draggable="true"
								class="discord-string-select-menu-option-emoji"
							/>`,()=>R`<span class="discord-string-select-menu-option-emoji">${this.emoji}</span>`))}
				<div class="discord-string-select-menu-option-ellipsis-text">
					<div class="discord-string-select-menu-option-ellipsis-text">
						<strong>${this.label}</strong>
					</div>
					${K(this.description,()=>R`<span>${this.description}</span>`)}
				</div>
				<span class="discord-string-select-menu-option-hidden"><input type="checkbox" @click=${()=>this.selectOption?.()} /></span>
			</label>
		`}constructor(){super(...arguments),Fo(this,S)}static{Fo(r,n)}};return r})(),Lo=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Ro=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},zo=(()=>{let e=[V(`discord-subscript`)],t,n=[],r,i=B,a,o=[],s=[];var c=class extends i{static{r=this}static{let l=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],Lo(this,null,a,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:l},o,s),Lo(null,t={value:r},e,{kind:`class`,name:r.name,metadata:l},null,n),c=r=t.value,l&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:l})}static styles=L`
		small {
			display: block;
			color: color-mix(in oklab, hsl(214 calc(1 * 8.1%) 61.2% / 1) 100%, black 0%);
			font-size: 0.8125rem;
			line-height: 1.11719rem;
		}

		:host([light-theme]) > small {
			color: color-mix(in oklab, hsl(228 calc(1 * 5.2%) 38% / 1) 100%, black 0%);
		}
	`;#e=Ro(this,o,!1);get lightTheme(){return this.#e}set lightTheme(e){this.#e=e}render(){return R`
			<small>
				<span>
					<slot></slot>
				</span>
			</small>
		`}constructor(){super(...arguments),Ro(this,s)}static{Ro(r,n)}};return r})(),Bo=z`
	<path d="M4 0L0 4V8L4 12L8 8V4L4 0ZM7 7.59L4 10.59L1 7.59V4.41L4 1.41L7 4.41V7.59Z" fill="currentColor" />
	<path d="M2 4.83V7.17L4 9.17L6 7.17V4.83L4 2.83L2 4.83Z" fill="currentColor" />
`;function Vo(e={}){return R`<svg ${q(e)} aria-hidden="false" width="24" height="24" viewBox="0 0 8 12">${Bo}</svg>`}var Ho=z`
	<path
		fill="#3ba55c"
		fill-rule="evenodd"
		d="M17.7163041 15.36645368c-.0190957.02699568-1.9039523 2.6680735-2.9957762 2.63320406-3.0676659-.09785935-6.6733809-3.07188394-9.15694343-5.548738C3.08002193 9.9740657.09772497 6.3791404 0 3.3061316v-.024746C0 2.2060575 2.61386252.3152347 2.64082114.2972376c.7110335-.4971705 1.4917101-.3149497 1.80959713.1372281.19320342.2744561 2.19712724 3.2811005 2.42290565 3.6489167.09884826.1608492.14714912.3554431.14714912.5702838 0 .2744561-.07975258.5770327-.23701117.8751101-.1527655.2902036-.65262318 1.1664385-.89862055 1.594995.2673396.3768148.94804468 1.26429792 2.351016 2.66357424 1.39173858 1.39027775 2.28923588 2.07641807 2.67002628 2.34187563.4302146-.2452108 1.3086162-.74238132 1.5972981-.89423205.5447887-.28682915 1.0907006-.31944893 1.4568885-.08661115.3459689.2182151 3.3383754 2.21027167 3.6225641 2.41611376.2695862.19234426.4144887.5399137.4144887.91672846 0 .2969525-.089862.61190215-.2808189.88523346"
	/>
`;function Uo(e={}){return R`<svg ${q(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Ho}</svg>`}var Wo=z`
	<g fill="none" fill-rule="evenodd">
		<path
			fill="#99AAB5"
			d="M0 14.25V18h3.75L14.81 6.94l-3.75-3.75L0 14.25zM17.71 4.04c.39-.39.39-1.02 0-1.41L15.37.29c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
		/>
		<path d="M0 0h18v18H0" />
	</g>
`;function Go(e={}){return R`<svg ${q(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Wo}</svg>`}var Ko=z`
	<g fill="none" fill-rule="evenodd">
		<path d="M0 0h18v18H0z" />
		<path
			fill="#99AAB5"
			d="M3.2765961.00034226C6.344262.0982016 9.949977 3.0722262 12.43353953 5.54908026c2.48356254 2.47685405 5.4658595 6.07177934 5.56358447 9.14478814 0 1.1000741-2.61386252 2.9908969-2.64082114 3.008894-.7110335.4971705-1.4917101.3149497-1.80959713-.1372281-.19320342-.2744561-2.19712724-3.2811005-2.42290565-3.6489167-.09884826-.1608492-.14714912-.3554431-.14714912-.5702838 0-.2744561.07975258-.5770327.23701117-.8751101.1527655-.2902036.65262318-1.1664385.89862055-1.594995-.2673396-.3768148-.94804468-1.26429792-2.351016-2.66357424C8.3695281 6.8223767 7.4720308 6.1362364 7.0912404 5.87077883c-.4302146.2452108-1.3086162.74238132-1.5972981.89423205-.5447887.28682915-1.0907006.31944893-1.4568885.08661115C3.6910849 6.63340693.6986784 4.64135036.4144897 4.43550827.1449035 4.243164.000001 3.89559457.000001 3.5187798c0-.29695252.089862-.61190217.2808189-.88523348.0190957-.02699568 1.9039523-2.6680735 2.9957762-2.63320406z"
		/>
	</g>
`;function qo(e={}){return R`<svg ${q(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Ko}</svg>`}var Jo=z`
	<path
		d="m16.908 8.39684-8.29587-8.295827-1.18584 1.184157 1.18584 1.18584-4.14834 4.1475v.00167l-1.18583-1.18583-1.185 1.18583 3.55583 3.55502-4.740831 4.74 1.185001 1.185 4.74083-4.74 3.55581 3.555 1.185-1.185-1.185-1.185 4.1475-4.14836h.0009l1.185 1.185z"
		fill="#b9bbbe"
	/>
`;function Yo(e={}){return R`<svg ${q(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Jo}</svg>`}var Xo=z`
	<path
		fill="#b9bbbe"
		fill-rule="evenodd"
		d="M1.575 9a2.25 2.25 0 0 0 0 3.18l.345.345c.128.128.323.15.488.075a2.25 2.25 0 0 1 3 3 .43.43 0 0 0 .06.48l.352.345a2.25 2.25 0 0 0 3.18 0l5.077-5.077a.75.75 0 0 1 1.02-1.02L16.425 9a2.25 2.25 0 0 0 0-3.18l-.345-.352a.42.42 0 0 0-.488-.06 2.25 2.25 0 0 1-3-3 .42.42 0 0 0-.068-.488l-.345-.345a2.25 2.25 0 0 0-3.18 0L7.671 2.903a.75.75 0 0 1-1.02 1.02zm7.508-4.725a.75.75 0 1 0-1.057 1.05l.517.525A.75.75 0 1 0 9.6 4.785l-.517-.525Zm2.063 2.063a.75.75 0 1 0-1.057 1.057l.517.525a.75.75 0 0 0 1.057-1.065l-.517-.525Zm2.063 2.063a.75.75 0 0 0-1.057 1.057l.517.525a.75.75 0 0 0 1.057-1.065l-.517-.525Z"
		clip-rule="evenodd"
	/>
`;function Zo(e={}){return R`<svg ${q(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Xo}</svg>`}var Qo=z`
	<path
		d="M10 0C4.486 0 0 4.486 0 10C0 15.515 4.486 20 10 20C15.514 20 20 15.515 20 10C20 4.486 15.514 0 10 0ZM9 4H11V11H9V4ZM10 15.25C9.31 15.25 8.75 14.691 8.75 14C8.75 13.31 9.31 12.75 10 12.75C10.69 12.75 11.25 13.31 11.25 14C11.25 14.691 10.69 15.25 10 15.25Z"
		fill-rule="evenodd"
		clip-rule="evenodd"
		fill="currentColor"
	/>
`;function $o(e={}){return R`<svg ${q(e)} aria-hidden="false" width="20" height="20" viewBox="0 0 20 20">${Qo}</svg>`}var es=z`
	<path
		xmlns="http://www.w3.org/2000/svg"
		d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
		fill="#ed4245"
	/>
`;function ts(e={}){return R`<svg ${q(e)} aria-hidden="false" width="20" height="20" viewBox="0 0 20 20">${es}</svg>`}var ns=z`
	<path
		fill="currentColor"
		d="M5.43309 21C5.35842 21 5.30189 20.9325 5.31494 20.859L5.99991 17H2.14274C2.06819 17 2.01168 16.9327 2.02453 16.8593L2.33253 15.0993C2.34258 15.0419 2.39244 15 2.45074 15H6.34991L7.40991 9H3.55274C3.47819 9 3.42168 8.93274 3.43453 8.85931L3.74253 7.09931C3.75258 7.04189 3.80244 7 3.86074 7H7.75991L8.45234 3.09903C8.46251 3.04174 8.51231 3 8.57049 3H10.3267C10.4014 3 10.4579 3.06746 10.4449 3.14097L9.75991 7H15.7599L16.4523 3.09903C16.4625 3.04174 16.5123 3 16.5705 3H18.3267C18.4014 3 18.4579 3.06746 18.4449 3.14097L17.7599 7H21.6171C21.6916 7 21.7481 7.06725 21.7353 7.14069L21.4273 8.90069C21.4172 8.95811 21.3674 9 21.3091 9H17.4099L17.0495 11.04H15.05L15.4104 9H9.41035L8.35035 15H10.5599V17H7.99991L7.30749 20.901C7.29732 20.9583 7.24752 21 7.18934 21H5.43309Z"
	/>
	<path
		fill="currentColor"
		d="M13.4399 12.96C12.9097 12.96 12.4799 13.3898 12.4799 13.92V20.2213C12.4799 20.7515 12.9097 21.1813 13.4399 21.1813H14.3999C14.5325 21.1813 14.6399 21.2887 14.6399 21.4213V23.4597C14.6399 23.6677 14.8865 23.7773 15.0408 23.6378L17.4858 21.4289C17.6622 21.2695 17.8916 21.1813 18.1294 21.1813H22.5599C23.0901 21.1813 23.5199 20.7515 23.5199 20.2213V13.92C23.5199 13.3898 23.0901 12.96 22.5599 12.96H13.4399Z"
	/>
`;function rs(e={}){return R`<svg ${q(e)} aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">${ns}</svg>`}var is=z`
	<g fill="none" fill-rule="evenodd">
		<path d="M18 0H0v18h18z" />
		<path fill="#3ba55c" d="M0 8h14.2l-3.6-3.6L12 3l6 6-6 6-1.4-1.4 3.6-3.6H0" />
	</g>
`;function as(e={}){return R`<svg ${q(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${is}</svg>`}var os=z`
	<g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
		<path d="M18 0H0v18h18z" />
		<path fill="#ed4245" d="M3.8 8l3.6-3.6L6 3 0 9l6 6 1.4-1.4L3.8 10H18V8" />
	</g>
`;function ss(e={}){return R`<svg ${q(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${os}</svg>`}var cs=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ls=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},us=(()=>{let e=[V(`discord-system-message`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({type:String})],c=[H({reflect:!0,attribute:`type`})],d=[H({type:Boolean,reflect:!0,attribute:`channel-name`})],m=[H({type:Boolean,reflect:!0,attribute:`has-thread`})],_=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],cs(this,null,a,{kind:`accessor`,name:`timestamp`,static:!1,private:!1,access:{has:e=>`timestamp`in e,get:e=>e.timestamp,set:(e,t)=>{e.timestamp=t}},metadata:x},o,s),cs(this,null,c,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:x},l,u),cs(this,null,d,{kind:`accessor`,name:`channelName`,static:!1,private:!1,access:{has:e=>`channelName`in e,get:e=>e.channelName,set:(e,t)=>{e.channelName=t}},metadata:x},f,p),cs(this,null,m,{kind:`accessor`,name:`hasThread`,static:!1,private:!1,access:{has:e=>`hasThread`in e,get:e=>e.hasThread,set:(e,t)=>{e.hasThread=t}},metadata:x},h,g),cs(this,null,_,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:x},v,y),cs(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=L`
		:host {
			color: #8e9297;
			display: flex;
			font-weight: 400;
			font-size: 1rem;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
			padding: 0px 1em;

			position: relative;
			word-wrap: break-word;
			-webkit-user-select: text;
			-moz-user-select: text;
			-ms-user-select: text;
			user-select: text;
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			padding-right: 0;
			min-height: 1.375rem;
			padding-right: 48px !important;
			margin-top: 1.0625rem;
		}

		:host([light-theme]) {
			color: #2e3338;
			border-color: #eceeef;
		}

		:host([channel-name]) {
			color: #fff;
		}

		:host([light-theme][channel-name]) {
			color: #060607;
		}

		:host([type='boost']) svg {
			color: #ff73fa;
		}

		:host([type='alert']) svg {
			color: #faa81a;
		}

		:host([type='error']) svg {
			color: #faa81a;
		}

		:host .discord-message-icon {
			margin-right: 16px;
			margin-top: 5px;
			min-width: 40px;
			display: flex;
			align-items: flex-start;
			justify-content: center;
		}

		:host .discord-message-icon svg {
			width: 16px;
			height: 16px;
		}

		:host .discord-message-timestamp {
			color: #72767d;
			font-size: 12px;
			margin-left: 3px;
		}

		:host([light-theme]) .discord-message-timestamp {
			color: #747f8d;
		}

		:host .discord-message-content {
			width: 100%;
			line-height: 160%;
			font-weight: normal;
			padding-top: 2px;
			display: flex;
			flex-direction: column;
		}

		:host .discord-message-content ::slotted(i) {
			font-style: normal;
			cursor: pointer;
			color: white;
			font-weight: 500;
		}

		:host([light-theme]) .discord-message-content ::slotted(i) {
			color: #060607;
		}

		:host .discord-message-content ::slotted(i:hover) {
			text-decoration: underline;
		}

		:host(:hover) {
			background-color: rgba(4, 4, 5, 0.07);
		}

		:host([light-theme]:hover) {
			background-color: rgba(6, 6, 7, 0.02);
		}

		:host([has-thread]):after {
			width: 2rem;
			left: 2.2rem;
			top: 1.75rem;
			border-left: 2px solid #4f545c !important;
			border-bottom: 2px solid #4f545c !important;
			border-bottom-left-radius: 8px !important;
			bottom: 29px;
			content: '';
			position: absolute;
		}

		:host([light-theme][has-thread]):after {
			border-color: #747f8d !important;
		}
	`;#e=ls(this,o,new Date);get timestamp(){return this.#e}set timestamp(e){this.#e=e}#t=(ls(this,s),ls(this,l,`join`));get type(){return this.#t}set type(e){this.#t=e}#n=(ls(this,u),ls(this,f,!1));get channelName(){return this.#n}set channelName(e){this.#n=e}#r=(ls(this,p),ls(this,h,!1));get hasThread(){return this.#r}set hasThread(e){this.#r=e}#i=(ls(this,g),ls(this,v,!1));get lightTheme(){return this.#i}set lightTheme(e){this.#i=e}checkType(){if(typeof this.type!=`string`)throw TypeError("DiscordSystemMessage `type` prop must be a string.");if(![`join`,`leave`,`call`,`missed-call`,`boost`,`edit`,`thread`,`pin`,`alert`,`error`,`upgrade`].includes(this.type))throw RangeError("DiscordSystemMessage `type` prop must be one of: 'join', 'leave', 'call', 'missed-call', 'boost', 'edit', 'thread', 'pin', 'alert', 'upgrade', 'error'")}willUpdate(){this.hasThread=Array.from(this.children).some(e=>e.tagName.toLowerCase()===`discord-thread`)}render(){return this.timestamp=Zr(this.timestamp),this.checkType(),R`<div class="discord-message-icon">
				${ia(this.type,[[`join`,()=>as()],[`leave`,()=>ss()],[`call`,()=>Uo()],[`missed-call`,()=>qo()],[`edit`,()=>Go()],[`boost`,()=>Vo()],[`thread`,()=>rs()],[`pin`,()=>Yo()],[`alert`,()=>$o()],[`error`,()=>ts()],[`upgrade`,()=>Zo()]])}
			</div>
			<div class="discord-message-content">
				<span>
					<slot></slot>
					<span class="discord-message-timestamp">${this.timestamp}</span>
				</span>
				<slot name="reactions"></slot>
				<slot name="thread"></slot>
			</div>`}constructor(){super(...arguments),ls(this,y)}static{ls(r,n)}};return r})(),ds=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},fs=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},ps=(()=>{let e=[V(`discord-tenor-video`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[];var m=class extends i{static{r=this}static{let h=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H({type:Number})],d=[H({type:Number})],ds(this,null,a,{kind:`accessor`,name:`url`,static:!1,private:!1,access:{has:e=>`url`in e,get:e=>e.url,set:(e,t)=>{e.url=t}},metadata:h},o,s),ds(this,null,c,{kind:`accessor`,name:`height`,static:!1,private:!1,access:{has:e=>`height`in e,get:e=>e.height,set:(e,t)=>{e.height=t}},metadata:h},l,u),ds(this,null,d,{kind:`accessor`,name:`width`,static:!1,private:!1,access:{has:e=>`width`in e,get:e=>e.width,set:(e,t)=>{e.width=t}},metadata:h},f,p),ds(null,t={value:r},e,{kind:`class`,name:r.name,metadata:h},null,n),m=r=t.value,h&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:h})}static styles=L`
		:host {
			color: #dcddde;
			display: flex;
			font-size: 13px;
			line-height: 150%;
			margin-bottom: 8px;
			margin-top: 8px;
		}

		.discord-tenor-video-wrapper {
			max-width: 169px;
			width: 100%;
			cursor: pointer;
			display: block;
			position: relative;
			-webkit-user-select: text;
			-moz-user-select: text;
			user-select: text;
			overflow: hidden;
			border-radius: 3px;
		}

		.discord-tenor-video {
			-webkit-box-align: center;
			-webkit-box-pack: center;
			align-items: center;
			border-radius: 0;
			cursor: pointer;
			display: flex;
			height: 100%;
			justify-content: center;
			max-height: 100%;
			width: 100%;
			left: 0px;
			top: 0px;
		}

		.discord-tenor-video-original-link {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 1;
		}

		.discord-tenor-video-image-accessory {
			position: absolute;
			top: 6px;
			left: 6px;
			z-index: 3;
		}

		.discord-tenor-video-gif-tag {
			background-image: url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjIyIiB2aWV3Qm94PSIwIDAgMjkgMjIiIHdpZHRoPSIyOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBkPSJtMCAwaDI5djIyaC0yOXoiLz48L2NsaXBQYXRoPjxnIGNsaXAtcGF0aD0idXJsKCNhKSI+PHBhdGggZD0ibTI2IDBoLTIzYy0xLjY1Njg1IDAtMyAxLjM0MzE1LTMgM3YxNmMwIDEuNjU2OSAxLjM0MzE1IDMgMyAzaDIzYzEuNjU2OSAwIDMtMS4zNDMxIDMtM3YtMTZjMC0xLjY1Njg1LTEuMzQzMS0zLTMtM3oiIGZpbGw9IiMyMDIyMjUiIGZpbGwtb3BhY2l0eT0iLjgiLz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJtOC4wMTcyNSAxNi4yMDU0Yy0uODQxIDAtMS41ODUzNC0uMjE3NS0yLjIzMy0uNjUyNS0uNjQ3NjctLjQzNS0xLjE1MDM0LTEuMDQ0LTEuNTA4LTEuODI3LS4zNTc2Ny0uNzkyNi0uNTM2NS0xLjcwMTMtLjUzNjUtMi43MjYgMC0xLjAxNDk3LjE4ODUtMS45MTM5Ny41NjU1LTIuNjk2OTcuMzg2NjYtLjc4My45NDI1LTEuMzk2ODMgMS42Njc1LTEuODQxNS43MzQ2Ni0uNDQ0NjYgMS42MDk1LS42NjcgMi42MjQ1LS42NjcuODYwMzMgMCAxLjYyODg1LjE4MzY3IDIuMzA1NDUuNTUxLjY4NjQuMzY3MzQgMS4yMDM1Ljg4NDUgMS41NTE1IDEuNTUxNWwtMS42Mzg1IDEuMTc0NWMtLjQ5My0uOTA4NjYtMS4yMjc2Mi0xLjM2My0yLjIwMzk1LTEuMzYzLS44ODkzNCAwLTEuNTcwODQuMjktMi4wNDQ1Ljg3LS40NzM2Ny41NzAzNC0uNzEwNSAxLjM3NzUtLjcxMDUgMi40MjE0NyAwIDEuMDUzNy4yMzY4MyAxLjg2NTcuNzEwNSAyLjQzNi40NzM2Ni41NzA0IDEuMTU1MTYuODU1NSAyLjA0NDUuODU1NS4zOTYzMyAwIC43NTg4My0uMDcyNSAxLjA4NzUtLjIxNzUuMzM4MzUtLjE1NDYuNTk5MzUtLjM2MjUuNzgyOTUtLjYyMzV2LTEuMjQ3aC0yLjMwNTQ1di0xLjg4NWg0LjM2NDQ1djUuNjg0aC0xLjcxMWwtLjI3NTUtLjk1N2MtLjU3MDI5Ljc3MzQtMS40MTYxMiAxLjE2LTIuNTM3NDUgMS4xNnoiLz48cGF0aCBkPSJtMTYuNTQ0NCAxNi4wMDI0aC0yLjExN3YtMTAuMDA0OTdoMi4xMTd6Ii8+PHBhdGggZD0ibTIwLjY5MzMgMTYuMDAyNGgtMi4xMTd2LTEwLjAwNDk3aDYuNjg0NXYxLjkxNGgtNC41Njc1djIuMzc3OTdoMy43MTJ2MS45MTRoLTMuNzEyeiIvPjwvZz48L2c+PC9zdmc+');
			width: 29px;
			height: 22px;
		}
	`;#e=fs(this,o,void 0);get url(){return this.#e}set url(e){this.#e=e}#t=(fs(this,s),fs(this,l,void 0));get height(){return this.#t}set height(e){this.#t=e}#n=(fs(this,u),fs(this,f,void 0));get width(){return this.#n}set width(e){this.#n=e}render(){return R`
			<div class="discord-tenor-video-wrapper" height=${G(this.height)} width=${G(this.width)}>
				<a target="_blank" class="discord-tenor-video-original-link" href=${G(this.url)}> </a>
				<video
					autoplay
					muted
					loop
					preload="auto"
					src=${G(this.url)}
					class="discord-tenor-video"
					height=${G(this.height)}
					width=${G(this.width)}
				></video>
				<div class="discord-tenor-video-image-accessory">
					<div class="discord-tenor-video-gif-tag"></div>
				</div>
			</div>
		`}constructor(){super(...arguments),fs(this,p)}static{fs(r,n)}};return r})(),ms=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},hs=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},gs=(()=>{let e=[V(`discord-thread`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[];var m=class extends i{static{r=this}static{let h=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H()],d=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],ms(this,null,a,{kind:`accessor`,name:`name`,static:!1,private:!1,access:{has:e=>`name`in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:h},o,s),ms(this,null,c,{kind:`accessor`,name:`cta`,static:!1,private:!1,access:{has:e=>`cta`in e,get:e=>e.cta,set:(e,t)=>{e.cta=t}},metadata:h},l,u),ms(this,null,d,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:h},f,p),ms(null,t={value:r},e,{kind:`class`,name:r.name,metadata:h},null,n),m=r=t.value,h&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:h})}static styles=L`
		:host {
			background-color: #2f3136;
			border-radius: 4px;
			cursor: pointer;
			margin-top: 8px;
			max-width: 480px;
			min-width: 0;
			padding: 8px;
			display: inline-flex;
			width: fit-content;
			flex-direction: column;
		}

		:host([light-theme]) {
			background-color: #f2f3f5;
		}

		:host .discord-thread-top {
			display: flex;
		}

		:host .discord-thread-bottom {
			font-size: 0.875rem;
			line-height: 1.125rem;
			align-items: center;
			color: #b9bbbe;
			display: flex;
			margin-top: 2px;
			white-space: nowrap;
		}

		:host([light-theme]) .discord-thread-bottom {
			color: #4f5660;
		}

		:host .discord-thread-name {
			font-size: 0.875rem;
			font-weight: 600;
			line-height: 1.125rem;
			color: white;
			margin-right: 8px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		:host([light-theme]) .discord-thread-name {
			color: #060607;
		}

		:host .discord-thread-cta {
			color: #00aff4;
			flex-shrink: 0;
			font-size: 0.875rem;
			font-weight: 600;
			line-height: 1.125rem;
		}

		:host .discord-thread-cta:hover {
			text-decoration: underline;
		}

		.discord-thread:hover .discord-thread-cta {
			text-decoration: underline;
		}
	`;#e=hs(this,o,`Thread`);get name(){return this.#e}set name(e){this.#e=e}#t=(hs(this,s),hs(this,l,`See Thread`));get cta(){return this.#t}set cta(e){this.#t=e}#n=(hs(this,u),hs(this,f,!1));get lightTheme(){return this.#n}set lightTheme(e){this.#n=e}render(){return R`
			<div class="discord-thread-top">
				<span class="discord-thread-name">${this.name}</span>
				<span class="discord-thread-cta" aria-hidden="true"> ${this.cta} › </span>
			</div>
			<span class="discord-thread-bottom">
				<slot></slot>
			</span>
		`}constructor(){super(...arguments),hs(this,p)}static{hs(r,n)}};return r})(),_s=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},vs=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},ys=(()=>{let e=[V(`discord-thread-message`)],t,n=[],r,i=B,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,ee=[],D=[],O,k=[],te=[],A,j=[],ne=[];var re=class extends i{static{r=this}static{let M=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H()],d=[H()],m=[H({type:Boolean})],_=[H({type:Boolean})],b=[H({type:Boolean})],C=[H({type:Boolean})],E=[H({attribute:`role-color`})],O=[H({attribute:`relative-timestamp`})],A=[U({context:J}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],_s(this,null,a,{kind:`accessor`,name:`profile`,static:!1,private:!1,access:{has:e=>`profile`in e,get:e=>e.profile,set:(e,t)=>{e.profile=t}},metadata:M},o,s),_s(this,null,c,{kind:`accessor`,name:`author`,static:!1,private:!1,access:{has:e=>`author`in e,get:e=>e.author,set:(e,t)=>{e.author=t}},metadata:M},l,u),_s(this,null,d,{kind:`accessor`,name:`avatar`,static:!1,private:!1,access:{has:e=>`avatar`in e,get:e=>e.avatar,set:(e,t)=>{e.avatar=t}},metadata:M},f,p),_s(this,null,m,{kind:`accessor`,name:`bot`,static:!1,private:!1,access:{has:e=>`bot`in e,get:e=>e.bot,set:(e,t)=>{e.bot=t}},metadata:M},h,g),_s(this,null,_,{kind:`accessor`,name:`server`,static:!1,private:!1,access:{has:e=>`server`in e,get:e=>e.server,set:(e,t)=>{e.server=t}},metadata:M},v,y),_s(this,null,b,{kind:`accessor`,name:`verified`,static:!1,private:!1,access:{has:e=>`verified`in e,get:e=>e.verified,set:(e,t)=>{e.verified=t}},metadata:M},x,S),_s(this,null,C,{kind:`accessor`,name:`edited`,static:!1,private:!1,access:{has:e=>`edited`in e,get:e=>e.edited,set:(e,t)=>{e.edited=t}},metadata:M},w,T),_s(this,null,E,{kind:`accessor`,name:`roleColor`,static:!1,private:!1,access:{has:e=>`roleColor`in e,get:e=>e.roleColor,set:(e,t)=>{e.roleColor=t}},metadata:M},ee,D),_s(this,null,O,{kind:`accessor`,name:`relativeTimestamp`,static:!1,private:!1,access:{has:e=>`relativeTimestamp`in e,get:e=>e.relativeTimestamp,set:(e,t)=>{e.relativeTimestamp=t}},metadata:M},k,te),_s(this,null,A,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:M},j,ne),_s(null,t={value:r},e,{kind:`class`,name:r.name,metadata:M},null,n),re=r=t.value,M&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:M})}static styles=L`
		:host {
			height: 18px;
			min-width: 0;
			display: flex;
			align-items: center;
			font-size: 0.875rem;
			line-height: 1.125rem;
		}

		:host .discord-thread-message-avatar {
			margin-right: 8px;
			flex: 0 0 auto;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			user-select: none;
		}

		:host .discord-thread-message-username {
			flex-shrink: 0;
			font-size: inherit;
			line-height: inherit;
			margin-right: 0.25rem;
			opacity: 0.64;
			color: white;
			display: inline;
			vertical-align: baseline;
			position: relative;
			overflow: hidden;
		}

		:host([light-theme]) .discord-thread-message-username {
			color: #060607;
		}

		:host .discord-application-tag {
			background-color: #5865f2;
			color: #fff;
			font-size: 0.65em;
			margin-right: 5px;
			border-radius: 3px;
			line-height: 100%;
			text-transform: uppercase;
			display: flex;
			align-items: center;
			height: 0.9375rem;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			border-radius: 0.1875rem;
		}

		:host .discord-application-tag-verified {
			display: inline-block;
			width: 0.9375rem;
			height: 0.9375rem;
			margin-left: -0.25rem;
		}

		:host .discord-thread-message-content {
			display: flex;
			align-items: baseline;
		}

		:host .discord-message-edited {
			color: #72767d;
			font-size: 10px;
			margin-left: 5px;
		}

		:host .discord-thread-message-timestamp {
			color: #72767d;
			flex-shrink: 0;
			margin-left: 8px;
			font-size: 0.875rem;
			line-height: 1.125rem;
		}

		:host([light-theme]) .discord-thread-message-timestamp,
		:host([light-theme]) .discord-message-edited {
			color: #747f8d;
		}
	`;#e=vs(this,o,void 0);get profile(){return this.#e}set profile(e){this.#e=e}#t=(vs(this,s),vs(this,l,`User`));get author(){return this.#t}set author(e){this.#t=e}#n=(vs(this,u),vs(this,f,void 0));get avatar(){return this.#n}set avatar(e){this.#n=e}#r=(vs(this,p),vs(this,h,!1));get bot(){return this.#r}set bot(e){this.#r=e}#i=(vs(this,g),vs(this,v,!1));get server(){return this.#i}set server(e){this.#i=e}#a=(vs(this,y),vs(this,x,!1));get verified(){return this.#a}set verified(e){this.#a=e}#o=(vs(this,S),vs(this,w,!1));get edited(){return this.#o}set edited(e){this.#o=e}#s=(vs(this,T),vs(this,ee,void 0));get roleColor(){return this.#s}set roleColor(e){this.#s=e}#c=(vs(this,D),vs(this,k,`1m ago`));get relativeTimestamp(){return this.#c}set relativeTimestamp(e){this.#c=e}#l=(vs(this,te),vs(this,j,!1));get lightTheme(){return this.#l}set lightTheme(e){this.#l=e}resolveAvatar(e){return Xn[e]??e??Xn.default}render(){let e={author:this.author,bot:this.bot,verified:this.verified,server:this.server,roleColor:this.roleColor},t=Reflect.get(Zn,this.profile)??{},n={...e,...t,avatar:this.resolveAvatar(t.avatar??this.avatar)};return R`<img src=${G(n.avatar)} class="discord-thread-message-avatar" alt=${G(n.author)} />
			${K(n.bot&&!n.server,()=>R`<span class="discord-application-tag"> ${n.verified?Rr():null} App </span>`)}
			${K(n.server&&!n.bot,()=>R`<span class="discord-application-tag">Server</span>`)}
			<span class="discord-thread-message-username" style=${Wr({color:n.roleColor})}> ${n.author} </span>
			<div class="discord-thread-message-content">
				<slot></slot>
				${K(this.edited,()=>R`<span class="discord-message-edited">(edited)</span>`)}
			</div>
			<span class="discord-thread-message-timestamp">${this.relativeTimestamp}</span>`}constructor(){super(...arguments),vs(this,ne)}static{vs(r,n)}};return r})(),bs=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},xs=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ss=(()=>{let e=[V(`discord-time`)],t,n=[],r,i=B;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;bs(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=L`
		:host {
			white-space: nowrap;
			background-color: #ffffff0f;
			border-radius: 3px;
			padding: 0 2px;
		}
	`;render(){return R`<slot></slot>`}static{xs(r,n)}};return r})(),Cs=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ws=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ts=(()=>{let e=[V(`discord-underlined`)],t,n=[],r,i=B;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Cs(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o}),ws(r,n)}render(){return R`
			<u>
				<slot></slot>
			</u>
		`}};return r})(),Es=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Ds=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Os=(()=>{let e=[V(`discord-unordered-list`)],t,n=[],r,i=B,a,o=[],s=[];var c=class extends i{static{r=this}static{let l=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({type:Boolean,reflect:!0})],Es(this,null,a,{kind:`accessor`,name:`nested`,static:!1,private:!1,access:{has:e=>`nested`in e,get:e=>e.nested,set:(e,t)=>{e.nested=t}},metadata:l},o,s),Es(null,t={value:r},e,{kind:`class`,name:r.name,metadata:l},null,n),c=r=t.value,l&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:l})}static styles=L`
		:host > ul {
			list-style-image: initial;
			list-style: disc;
			list-style-position: outside;
			margin: 4px 0 0 16px;
			padding: 0px;
		}

		:host([nested]) > ul {
			list-style: circle;
		}
	`;#e=Ds(this,o,!1);get nested(){return this.#e}set nested(e){this.#e=e}checkChildren(){if(!Array.from(this.children).every(e=>{let t=e.tagName.toLowerCase();return t===`discord-list-item`||t===`discord-unordered-list`||t===`discord-ordered-list`}))throw new Gr(`All direct children inside of a <discord-unordered-list> components must be one of <discord-unordered-list>, <discord-ordered-list>, or <discord-list-item>.`)}willUpdate(){(this.parentElement?.tagName.toLowerCase()===`discord-unordered-list`||this.parentElement?.tagName.toLowerCase()===`discord-ordered-list`)&&(this.nested=!0)}render(){return this.checkChildren(),R`<ul>
			<slot></slot>
		</ul>`}constructor(){super(...arguments),Ds(this,s)}static{Ds(r,n)}};return r})(),ks=z`
	<path fill="currentColor" d="M4 6c0-1.1.9-2 2-2h3a1 1 0 0 0 0-2H6a4 4 0 0 0-4 4v3a1 1 0 0 0 2 0V6ZM4 18c0 1.1.9 2 2 2h3a1 1 0 1 1 0 2H6a4 4 0 0 1-4-4v-3a1 1 0 1 1 2 0v3ZM18 4a2 2 0 0 1 2 2v3a1 1 0 1 0 2 0V6a4 4 0 0 0-4-4h-3a1 1 0 1 0 0 2h3ZM20 18a2 2 0 0 1-2 2h-3a1 1 0 1 0 0 2h3a4 4 0 0 0 4-4v-3a1 1 0 1 0-2 0v3Z"></path>
`;function As(e={}){return R`<svg ${q(e)} aria-hidden="true" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">${ks}</svg>`}var js=z`
	<path fill="currentColor" d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H6ZM15 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3Z"></path>
`;function Ms(e={}){return R`<svg ${q(e)} aria-hidden="true" role="img" width="16" height="16" fill="none" viewBox="0 0 24 24">${js}</svg>`}var Ns=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Ps=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Fs=(()=>{let e=[V(`discord-video-attachment`)],t,n=[],r,i=en,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[];var m=class extends i{static{r=this}static{let h=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H()],c=[H()],d=[U({context:J,subscribe:!0}),H({type:Boolean,reflect:!0,attribute:`light-theme`})],Ns(this,null,a,{kind:`accessor`,name:`href`,static:!1,private:!1,access:{has:e=>`href`in e,get:e=>e.href,set:(e,t)=>{e.href=t}},metadata:h},o,s),Ns(this,null,c,{kind:`accessor`,name:`poster`,static:!1,private:!1,access:{has:e=>`poster`in e,get:e=>e.poster,set:(e,t)=>{e.poster=t}},metadata:h},l,u),Ns(this,null,d,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:h},f,p),Ns(null,t={value:r},e,{kind:`class`,name:r.name,metadata:h},null,n),m=r=t.value,h&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:h})}static styles=[nn,tn,Zt,L`
			:host {
				display: grid;
				height: -moz-fit-content;
				height: fit-content;
				grid-auto-flow: row;
				grid-row-gap: 0.25rem;
				grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
				text-indent: 0;
				min-height: 0;
				min-width: 0;
				padding-top: 0.125rem;
				padding-bottom: 0.125rem;
				position: relative;

				--seek-before-width: 0%;
				--buffered-width: 0%;
				--volume-slider-opacity: 0;
			}

			:host .discord-button-download-attachment {
				top: 5px !important;
				right: 8px !important;
			}

			.discord-video-attachment-one-by-one-grid {
				max-width: 100%;
				border-radius: 8px;
				overflow: hidden;
				display: inline-block;
				width: -moz-fit-content;
				width: fit-content;
				max-height: 350px;
			}

			.discord-media-attachment-mosaic-item-media {
				overflow: hidden;
				align-items: start;
				justify-self: auto !important;
			}

			.discord-video-attachment-image-wrapper {
				display: block;
				max-height: inherit;
				margin: auto;
				width: 550px;
				height: 100%;
				flex: auto;
				position: relative;
				-webkit-user-select: text;
				-moz-user-select: text;
				user-select: text;
				overflow: hidden;
				border-radius: 3px;
			}

			.discord-video-attachment-loading-overlay {
				aspect-ratio: 1.74603 / 1;
				width: 100%;
				height: 100%;
			}

			.discord-video-attachment-wrapper {
				height: 100%;
				width: 100%;
				max-height: inherit;
				position: relative;
				overflow: hidden;
				border-radius: 3px;
				color: hsl(0 calc(1 * 0%) 100% / 1);
				-webkit-user-select: none;
				-moz-user-select: none;
				user-select: none;
				background-color: hsl(225 calc(1 * 6.3%) 12.5% / 1);
			}

			.discord-video-attachment-wrapper-light-theme.discord-video-attachment-wrapper {
				background-color: hsl(0 calc(1 * 0%) 97.6% / 1);
			}

			.discord-video-attachment-video-container {
				width: 100%;
				height: 100%;
				max-height: inherit;
				object-fit: cover;
				position: relative;
				display: block;
				-o-object-fit: cover;
				border-radius: 3px;
			}

			.discord-video-attachment-video-container::-webkit-media-controls-enclosure {
				display: none !important;
			}

			.discord-video-attachment-video-controls {
				position: absolute;
				left: 0;
				right: 0;
				bottom: -10px;
				padding-bottom: 10px;
				width: 100%;
				display: flex;
				align-items: center;
				background-color: hsl(0 calc(1 * 0%) 0% / 0.6);
				height: 32px;
			}

			.discord-video-attachment-video-button {
				margin-right: 8px;
			}

			.discord-video-attachment-control-icon {
				display: block;
				width: 24px;
				height: 24px;
				padding: 4px;
				cursor: pointer;
				flex: 0 0 auto;
				opacity: 0.6;
			}

			.discord-video-attachment-duration-time-wrapper {
				flex: 0 0 auto;
				margin: 4px;
				height: 12px;
			}

			.discord-video-attachment-duration-time-display {
				font-weight: 500;
				display: inline-block;
				font-family:
					'gg mono', 'Source Code Pro', Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter',
					'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier, monospace;
				font-size: 12px;
				line-height: 12px;
				vertical-align: text-top;
			}

			.discord-video-attachment-duration-time-separator {
				margin: 0 2px;
			}

			.discord-video-attachment-full-screen-button {
				cursor: pointer;
				margin-right: 8px;
				width: auto;
				background: transparent;
				color: currentColor;
				border: 0;
				padding: 0;
				margin: 0;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				border-radius: 3px;
				font-size: 14px;
				font-weight: 500;
				line-height: 16px;
				-webkit-user-select: none;
				-moz-user-select: none;
				user-select: none;
			}

			.discord-video-attachment-play-pause-pop {
				opacity: 0;
				transform: scale(2.5) translateZ(0px);
				position: absolute;
				top: 50%;
				left: 50%;
				margin-left: -23px;
				margin-top: -23px;
				padding: 12px;
				width: 24px;
				height: 24px;
				background-color: hsl(0 calc(1 * 0%) 0% / 0.6);
				color: hsl(0 calc(1 * 0%) 100% / 1);
				border-radius: 50%;
				pointer-events: none;
			}

			.discord-video-attachment-play-pause-pop-icon {
				width: 24px;
				height: 24px;
				display: block;
			}

			.discord-video-attachment-horizontal {
				width: 100%;
				display: flex;
				align-self: stretch;
			}

			.discord-video-attachment-media-bar-interaction {
				position: relative;
				flex: 1 1 auto;
				align-self: stretch;
				display: flex;
				align-items: center;
				cursor: pointer;
				margin: 0 7px;
			}

			@keyframes playPausePopIconKeyframes {
				0% {
					opacity: 0;
				}
				100% {
					opacity: 0;
				}
			}

			.discord-video-attachment-overlay-content-hidden {
				animation: playPausePopIconKeyframes 0.2s ease-in-out infinite;
			}
		`];#e=Ps(this,o,void 0);get href(){return this.#e}set href(e){this.#e=e}#t=(Ps(this,s),Ps(this,l,void 0));get poster(){return this.#t}set poster(e){this.#t=e}#n=(Ps(this,u),Ps(this,f,!1));get lightTheme(){return this.#n}set lightTheme(e){this.#n=e}playPausePopAnimationContainerRef=(Ps(this,p),qt());async handleFullScreenClicked(){this.mediaComponentRef.value&&await this.mediaComponentRef.value.requestFullscreen()}handleHasStartedPlayingOrHasPaused(){this.playPausePopAnimationContainerRef.value&&this.playPausePopAnimationContainerRef.value.classList.add(`discord-video-attachment-overlay-content-hidden`),globalThis.setTimeout(()=>{this.playPausePopAnimationContainerRef.value&&this.playPausePopAnimationContainerRef.value.classList.remove(`discord-video-attachment-overlay-content-hidden`)},200)}render(){return R`<div class="discord-media-attachment-non-visual-media-item-container">
			<div class="discord-video-attachment-one-by-one-grid">
				<div class="discord-media-attachment-mosaic-item-media">
					<div class="discord-video-attachment-image-wrapper">
						<div class="discord-video-attachment-loading-overlay">
							<div
								class=${W({"discord-video-attachment-wrapper":!0,"discord-video-attachment-wrapper-light-theme":this.lightTheme})}
							>
								<video
									${Xt(this.mediaComponentRef)}
									class="discord-video-attachment-video-container"
									playsinline
									height="315"
									preload="metadata"
									width="550"
									role="button"
									poster=${G(this.poster)}
									@play=${this.handleHasStartedPlayingOrHasPaused}
									@pause=${this.handleHasStartedPlayingOrHasPaused}
									@progress=${this.displayBufferedAmount}
									@click=${this.handleClickPlayPauseIcon}
									@ended=${this.handleEnded}
								>
									<source src=${G(this.href)} />
								</video>
								<div class="discord-video-attachment-video-controls">
									<div class="discord-media-attachment-controls" style="transform: translateY(0%)">
										<div
											class="discord-media-attachment-video-button"
											tabindex="0"
											aria-label="${this.isPlaying?`Pause`:`Play`}"
											role="button"
											@click=${this.handleClickPlayPauseIcon}
											@keydown=${this.handleSpaceToPlayPause}
										>
											${K(this.hasEnded,()=>Dr({class:`discord-media-attachment-control-icon`}),()=>K(this.isPlaying,()=>Cr({class:`discord-media-attachment-control-icon`}),()=>Tr({class:`discord-media-attachment-control-icon`})))}
										</div>
										<div class="discord-media-attachment-duration-time-wrapper">
											<span role="status" class="discord-media-attachment-duration-time-display"
												>${this.currentPlaybackPosition}</span
											>
											<span
												role="separator"
												class="discord-media-attachment-duration-time-display discord-media-attachment-duration-time-separator"
												>/</span
											>
											<span class="discord-media-attachment-duration-time-display">${this.totalMediaDuration}</span>
										</div>
										<div class="discord-media-attachment-horizontal">
											<div class="discord-media-attachment-media-bar-interaction">
												<input
													type="range"
													${Xt(this.seekSliderRef)}
													class="discord-media-attachment-playback-control"
													@input=${this.handleSeekSliderInput}
													@change=${this.handleSeekSliderChange}
													max="100"
													value="0"
												/>
											</div>
										</div>
										<div class="discord-media-attachment-flex">
											<div class="discord-media-attachment-flex-container">
												<div ${Xt(this.volumeControlRef)} class="discord-media-attachment-button-slider">
													<div
														class="discord-media-attachment-volume-vertical"
														@mouseenter=${this.handleVolumeVerticalEnter}
														@mouseleave=${this.handleVolumeVerticalLeave}
													>
														<input
															${Xt(this.volumeControlInputRef)}
															type="range"
															class="discord-media-attachment-volume-slider"
															@input=${this.handleVolumeSliderInput}
															max="100"
															value="100"
														/>
													</div>
												</div>
												<button
													aria-label="Control volume"
													type="button"
													class="discord-media-attachment-button"
													@focus=${this.handleVolumeVerticalFocus}
													@blur=${this.handleVolumeVerticalBlur}
													@mouseover=${this.handleVolumeVerticalEnter}
													@mouseout=${this.handleVolumeVerticalLeave}
													@click=${this.handleClickMuteIcon}
												>
													<div class="discord-media-attachment-button-content">
														${K(this.currentVolume===0||this.isMuted,()=>Nr({class:`discord-media-attachment-button-control-icon`}),()=>K(this.currentVolume<=.5,()=>jr({class:`discord-media-attachment-button-control-icon`}),()=>kr({class:`discord-media-attachment-button-control-icon`})))}
													</div>
												</button>
											</div>
										</div>
										<div>
											<button
												aria-label="Full screen"
												type="button"
												class="discord-media-attachment-button"
												@click=${this.handleFullScreenClicked}
											>
												<div class="discord-media-attachment-button-content">
													${As({class:`discord-media-attachment-button-control-icon`})}
												</div>
											</button>
										</div>
									</div>
								</div>
								<div class="discord-video-attachment-play-pause-pop">
									${Ms({class:`discord-video-attachment-play-pause-pop-icon`})}
								</div>
								<div ${Xt(this.playPausePopAnimationContainerRef)}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="discord-button-download-attachment">
				<a
					class="discord-link-download-attachment"
					aria-label="Download"
					href="${G(this.href)}"
					rel="noreferrer noopener"
					target="_blank"
					role="button"
					tabindex="0"
				>
					${xr()}
				</a>
			</div>
		</div>`}static{Ps(r,n)}};return r})(),Is=new Set([`children`,`localName`,`ref`,`style`,`className`]),Ls=new WeakMap,Rs=(e,t,n,r,i)=>{let a=i?.[t];a===void 0?(e[t]=n,n==null&&t in HTMLElement.prototype&&e.removeAttribute(t)):n!==r&&((e,t,n)=>{let r=Ls.get(e);r===void 0&&Ls.set(e,r=new Map);let i=r.get(t);n===void 0?i!==void 0&&(r.delete(t),e.removeEventListener(t,i)):i===void 0?(r.set(t,i={handleEvent:n}),e.addEventListener(t,i)):i.handleEvent=n})(e,a,n)},zs=({react:e,tagName:t,elementClass:n,events:r,displayName:i})=>{let a=new Set(Object.keys(r??{})),o=e.forwardRef(((i,o)=>{let s=e.useRef(new Map),c=e.useRef(null),l={},u={};for(let[e,t]of Object.entries(i))Is.has(e)?l[e===`className`?`class`:e]=t:a.has(e)||e in n.prototype?u[e]=t:l[e]=t;return e.useLayoutEffect((()=>{if(c.current===null)return;let e=new Map;for(let t in u)Rs(c.current,t,i[t],s.current.get(t),r),s.current.delete(t),e.set(t,i[t]);for(let[e,t]of s.current)Rs(c.current,e,void 0,t,r);s.current=e})),e.useLayoutEffect((()=>{c.current?.removeAttribute(`defer-hydration`)}),[]),l.suppressHydrationWarning=!0,e.createElement(t,{...l,ref:e.useCallback((e=>{c.current=e,typeof o==`function`?o(e):o!==null&&(o.current=e)}),[o])})}));return o.displayName=i??n.name,o},Bs=Object.defineProperty,Vs=(e,t)=>Bs(e,`name`,{value:t,configurable:!0});function Q(e,t){return zs({tagName:e,elementClass:t,react:F.default})}Vs(Q,`createReactComponent`),Q(`discord-action-row`,wt);var Hs=Q(`discord-attachments`,Dt);Q(`discord-audio-attachment`,Ir),Q(`discord-author-info`,ai);var Us=Q(`discord-bold`,ci);Q(`discord-button`,pi);var Ws=Q(`discord-code`,gi);Q(`discord-command`,Pi);var Gs=Q(`discord-custom-emoji`,Li),Ks=Q(`discord-embed`,Bi),qs=Q(`discord-embed-description`,Ui),Js=Q(`discord-embed-field`,Ki),Ys=Q(`discord-embed-fields`,Yi),Xs=Q(`discord-embed-footer`,Qi),Zs=Q(`discord-file-attachment`,ra);Q(`discord-header`,sa);var Qs=Q(`discord-image-attachment`,ua);Q(`discord-input-text`,pa),Q(`discord-invite`,Sa);var $s=Q(`discord-italic`,Ta);Q(`discord-link`,yr),Q(`discord-list-item`,Oa);var ec=Q(`discord-mention`,Wa),tc=Q(`discord-message`,Ja),nc=Q(`discord-messages`,gr);Q(`discord-modal`,to),Q(`discord-ordered-list`,io),Q(`discord-poll`,fo),Q(`discord-poll-answer`,ho);var rc=Q(`discord-pre`,vo),ic=Q(`discord-quote`,xo),ac=Q(`discord-reaction`,wo),oc=Q(`discord-reactions`,Do),sc=Q(`discord-reply`,wi),cc=Q(`discord-spoiler`,Ao);Q(`discord-string-select-menu`,No),Q(`discord-string-select-menu-option`,Io),Q(`discord-subscript`,zo),Q(`discord-system-message`,us),Q(`discord-tenor-video`,ps),Q(`discord-thread`,gs),Q(`discord-thread-message`,ys);var lc=Q(`discord-time`,Ss),uc=Q(`discord-underlined`,Ts);Q(`discord-unordered-list`,Os),Q(`discord-verified-author-tag`,Vr),Q(`discord-video-attachment`,Fs);var $=e();function dc(e){if(typeof e==`string`)try{let t=new URL(e);return[`https:`,`http:`].includes(t.protocol)&&!t.username&&!t.password?t.href:void 0}catch{return}}function fc(e){return`https://cdn.discordapp.com/embed/avatars/${/^\d+$/.test(e)?Number((BigInt(e)>>22n)%6n):0}.png`}function pc(e,t){return e.map((e,n)=>{let r=Array.isArray(e.content)?pc(e.content,t):String(e.content??``),i=r;switch(e.type){case`strong`:i=(0,$.jsx)(Us,{children:r});break;case`em`:i=(0,$.jsx)($s,{children:r});break;case`underline`:i=(0,$.jsx)(uc,{children:r});break;case`strikethrough`:i=(0,$.jsx)(`s`,{children:r});break;case`spoiler`:i=(0,$.jsx)(cc,{children:r});break;case`inlineCode`:i=(0,$.jsx)(Ws,{children:r});break;case`codeBlock`:i=(0,$.jsx)(rc,{children:r});break;case`blockQuote`:i=(0,$.jsx)(ic,{children:r});break;case`br`:i=(0,$.jsx)(`br`,{});break;case`heading`:i=(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(Us,{children:r}),(0,$.jsx)(`br`,{})]});break;case`user`:i=(0,$.jsx)(ec,{children:t.get(String(e.id))||String(e.id)});break;case`role`:i=(0,$.jsx)(ec,{type:`role`,children:String(e.id)});break;case`channel`:i=(0,$.jsx)(ec,{type:`channel`,children:String(e.id)});break;case`everyone`:case`here`:i=(0,$.jsx)(ec,{children:e.type});break;case`link`:case`url`:case`autolink`:{let t=dc(e.target);i=t?(0,$.jsx)(`a`,{href:t,target:`_blank`,rel:`noopener noreferrer`,className:`underline`,children:r}):r;break}case`emoji`:{let t=String(e.id);i=/^\d{16,22}$/.test(t)?(0,$.jsx)(Gs,{name:String(e.name),url:`https://cdn.discordapp.com/emojis/${t}.${e.animated?`gif`:`png`}`}):r;break}case`timestamp`:{let t=new Date(Number(e.timestamp)*1e3);i=Number.isNaN(t.getTime())?String(e.timestamp):(0,$.jsx)(lc,{title:t.toLocaleString(),children:t.toLocaleString()});break}}return(0,$.jsx)(F.Fragment,{children:i},n)})}function mc({content:e,authors:t}){let n=(0,F.useMemo)(()=>(0,se.parse)(e,`extended`),[e]);return(0,$.jsx)($.Fragment,{children:pc(n,t)})}var hc=(0,F.memo)(function({message:e,previous:t,authors:n}){let r=t?.authorId===e.authorId&&t.webhookId===e.webhookId&&t.bot===e.bot&&!e.replyTo&&e.createdAt-t.createdAt<3e5&&new Date(t.createdAt).toDateString()===new Date(e.createdAt).toDateString();return(0,$.jsxs)(tc,{author:e.authorName||`Unknown user`,avatar:dc(e.authorAvatarUrl)||fc(e.authorId),bot:!!e.bot,roleColor:/^#[0-9a-f]{6}$/i.test(e.authorRoleColor||``)?e.authorRoleColor:void 0,"data-message-id":e.id,style:r?{marginTop:0}:void 0,title:new Date(e.createdAt).toLocaleString(`en-GB`),timestamp:new Date(e.createdAt).toLocaleTimeString(`en-GB`,{hour:`2-digit`,minute:`2-digit`}),twentyFour:!0,edited:!!e.editedAt,messageBodyOnly:r,children:[e.replyTo&&(0,$.jsx)(sc,{slot:`reply`,author:e.replyTo.authorName,avatar:fc(e.replyTo.authorId),bot:!!e.replyTo.bot,children:(0,$.jsx)(mc,{content:e.replyTo.content,authors:n})}),(0,$.jsx)(mc,{content:e.content,authors:n}),!!e.attachments.length&&(0,$.jsx)(Hs,{slot:`attachments`,children:e.attachments.map((e,t)=>{let n=dc(e.url);return n?e.contentType?.startsWith(`image/`)||/\.(png|jpe?g|gif|webp)(\?|$)/i.test(n)?(0,$.jsx)(Qs,{url:n,alt:e.name},t):(0,$.jsx)(Zs,{name:e.name,href:n,bytes:e.size||0,target:`_blank`,rel:`noopener noreferrer`},t):(0,$.jsx)(`span`,{children:e.name},t)})}),e.embeds?.map((e,t)=>(0,$.jsxs)(Ks,{slot:`embeds`,embedTitle:e.title||``,url:dc(e.url),color:typeof e.color==`number`?`#${e.color.toString(16).padStart(6,`0`)}`:void 0,image:dc(e.image),thumbnail:dc(e.thumbnail),authorName:e.author?.name,authorUrl:dc(e.author?.url),authorImage:dc(e.author?.iconUrl),children:[e.description&&(0,$.jsx)(qs,{slot:`description`,children:(0,$.jsx)(mc,{content:e.description,authors:n})}),!!e.fields?.length&&(0,$.jsx)(Ys,{slot:`fields`,children:e.fields.map((e,t)=>(0,$.jsx)(Js,{fieldTitle:e.name,inline:!!e.inline,children:(0,$.jsx)(mc,{content:e.value,authors:n})},t))}),e.footer&&(0,$.jsx)(Xs,{slot:`footer`,footerImage:dc(e.footer.iconUrl),children:e.footer.text})]},t)),!!e.reactions?.length&&(0,$.jsx)(oc,{slot:`reactions`,children:e.reactions.map((e,t)=>(0,$.jsx)(ac,{name:e.emoji,emoji:e.emoji,count:e.count,reacted:!!e.reacted,interactive:!1},t))})]})});function gc({ticket:e,session:t,messages:n,onRead:i,onUnauthorized:u,hasOlder:d,loadingOlder:p,onLoadOlder:h,historyError:g}){let[_,v]=(0,F.useState)(()=>!window.matchMedia(`(prefers-color-scheme: dark)`).matches),[y,b]=(0,F.useState)(null),[x,S]=(0,F.useState)(``),[C,w]=(0,F.useState)(!1),[T,E]=(0,F.useState)(``),[ee,D]=(0,F.useState)(!1),O=(0,F.useRef)(null),k=(0,F.useRef)(null),te=(0,F.useRef)(null),A=(0,F.useRef)(!0),j=(0,F.useRef)(null),ne=(0,F.useRef)(null),re=(0,F.useRef)(``),M=(0,F.useRef)(!1),N=n.at(-1),P=(0,F.useRef)(N?.id),ie=(0,F.useMemo)(()=>new Map(n.map(e=>[e.authorId,e.authorName])),[n]),ae=(0,F.useCallback)(()=>{let e=O.current;if(e){if(A.current)e.scrollTop=e.scrollHeight;else if(j.current){let t=e.querySelector(`[data-message-id="${j.current.id}"]`);t&&(e.scrollTop+=t.getBoundingClientRect().top-e.getBoundingClientRect().top-j.current.top)}ne.current=e.scrollTop}},[]);function oe(){let e=O.current;if(!e)return;if(ne.current===e.scrollTop){ne.current=null;return}if(ne.current=null,A.current=e.scrollHeight-e.scrollTop-e.clientHeight<32,A.current){j.current=null,D(!1);return}let t=e.getBoundingClientRect().top,n=[...e.querySelectorAll(`[data-message-id]`)].find(e=>e.getBoundingClientRect().bottom>t);j.current=n?{id:n.dataset.messageId,top:n.getBoundingClientRect().top-t}:null}(0,F.useEffect)(()=>{let e=window.matchMedia(`(prefers-color-scheme: dark)`),t=()=>v(!e.matches);return e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]),(0,F.useEffect)(()=>{let e=requestAnimationFrame(()=>b(_));return()=>cancelAnimationFrame(e)},[_]),(0,F.useLayoutEffect)(()=>{ae()},[n,y,ae]),(0,F.useEffect)(()=>{let e=P.current;P.current=N?.id,e&&e!==N?.id&&!A.current&&D(!0)},[N?.id]),(0,F.useEffect)(()=>{let e=O.current?.querySelector(`discord-messages`);if(!e)return;let t=new ResizeObserver(ae);return t.observe(e),O.current&&t.observe(O.current),()=>t.disconnect()},[_,ae]),(0,F.useEffect)(()=>{let e=te.current;if(!e||y!==_||!N)return;let t=!1,n=()=>{t&&document.visibilityState===`visible`&&re.current!==N.id&&(re.current=N.id,i({messageAt:N.createdAt,messageId:N.id}).catch(e=>{re.current=``,E(e instanceof Error?e.message:`Unable to mark this conversation as read.`)}))},r=new IntersectionObserver(([e])=>{t=e.isIntersecting,n()});return r.observe(e),document.addEventListener(`visibilitychange`,n),()=>{r.disconnect(),document.removeEventListener(`visibilitychange`,n)}},[N,i,y,_]);async function se(n){let r=x,i=n===`requester`?`I have an update on this request. Could you take another look?`:r.trim();if(!i||M.current||e.status!==`open`)return;M.current=!0,w(!0),E(``);let a=document.activeElement;try{let o=n===`staff`?`/api/tickets/${encodeURIComponent(e.threadId)}/reply`:`/api/mock/tickets/${encodeURIComponent(e.threadId)}/messages`;await c(o,t.csrfToken,n===`staff`?{content:i}:{content:i,sender:n}),n===`staff`&&(S(e=>e===r?``:e),A.current=!0,j.current=null,D(!1),ae(),document.activeElement===a&&(a===k.current||a?.getAttribute(`aria-label`)===`Send message`)&&k.current?.focus({preventScroll:!0}))}catch(e){e instanceof o&&[401,403].includes(e.status)&&u(),E(e instanceof Error?e.message:`Unable to send the mock message. Your draft has been kept.`)}finally{M.current=!1,w(!1)}}return(0,$.jsxs)(`div`,{className:`ticket-chat`,"data-theme":_?`light`:`dark`,children:[(0,$.jsxs)(`header`,{className:`ticket-chat-header`,children:[(0,$.jsxs)(`div`,{className:`flex min-w-0 items-center gap-2`,children:[(0,$.jsx)(f,{className:`size-5 shrink-0`,"aria-hidden":`true`}),(0,$.jsx)(`h2`,{className:`truncate font-semibold`,children:e.openerName||`private-ticket`})]}),t.capabilities.mockChat&&(0,$.jsx)(a,{type:`button`,variant:`ghost`,size:`sm`,className:`ticket-chat-control shrink-0`,disabled:C||e.status!==`open`,onClick:()=>void se(`requester`),children:`Simulate incoming`})]}),(0,$.jsxs)(`div`,{className:`relative flex min-h-0 flex-1 flex-col`,children:[(0,$.jsxs)(`div`,{ref:O,className:`ticket-chat-scroll`,role:`region`,"aria-label":`Ticket conversation`,tabIndex:0,onScroll:oe,children:[(0,$.jsx)(nc,{lightTheme:_,className:`ticket-chat-transcript`,children:y===_&&(0,$.jsxs)($.Fragment,{children:[d&&(0,$.jsx)(`div`,{className:`px-4 py-2`,children:(0,$.jsx)(a,{variant:`ghost`,size:`sm`,className:`ticket-chat-control`,disabled:p,onClick:()=>{oe(),h()},children:p?`Loading older messages…`:`Load older messages`})}),n.map((e,t)=>{let r=n[t-1],i=new Date(e.createdAt).toDateString();return(0,$.jsxs)(F.Fragment,{children:[(!r||new Date(r.createdAt).toDateString()!==i)&&(0,$.jsx)(`div`,{className:`ticket-chat-date`,role:`separator`,children:(0,$.jsx)(`span`,{children:new Date(e.createdAt).toLocaleDateString(`en-GB`,{day:`numeric`,month:`long`,year:`numeric`})})}),(0,$.jsx)(hc,{message:e,previous:r,authors:ie})]},e.id)}),!n.length&&(0,$.jsx)(`p`,{className:`p-6`,children:`This is the beginning of this ticket conversation.`})]})},_?`light`:`dark`),(0,$.jsx)(`div`,{ref:te,className:`h-px`})]}),ee&&(0,$.jsx)(a,{className:`ticket-chat-new`,size:`sm`,onClick:()=>{A.current=!0,j.current=null,ae(),D(!1)},children:`New messages — jump to present`}),(T||g)&&(0,$.jsx)(s,{variant:`destructive`,className:`absolute inset-x-3 bottom-3 z-10 w-auto`,children:(0,$.jsx)(r,{children:T||g})})]}),t.capabilities.canReply?(0,$.jsxs)(`form`,{className:`ticket-chat-composer`,onSubmit:e=>{e.preventDefault(),se(`staff`)},children:[(0,$.jsxs)(`div`,{className:`ticket-chat-input-row`,children:[(0,$.jsx)(`label`,{htmlFor:`mock-message`,className:`sr-only`,children:`Message`}),(0,$.jsx)(l,{ref:k,id:`mock-message`,className:`ticket-chat-input`,placeholder:e.status===`open`?`Message #${e.openerName||`private-ticket`}`:`This ticket is closed`,value:x,maxLength:2e3,disabled:e.status!==`open`,onChange:e=>S(e.target.value),onKeyDown:e=>{e.key!==`Enter`||e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||e.nativeEvent.isComposing||(e.preventDefault(),M.current||e.currentTarget.form?.requestSubmit())}}),(0,$.jsx)(a,{"aria-label":`Send message`,title:`Send message`,type:`submit`,variant:`ghost`,size:`icon`,className:`ticket-chat-control shrink-0 self-end`,disabled:C||!x.trim()||e.status!==`open`,children:(0,$.jsx)(m,{className:`size-5`})})]}),(0,$.jsxs)(`div`,{className:`ticket-chat-hint`,children:[(0,$.jsx)(`span`,{role:`status`,children:C?`Sending…`:`Enter to send · Shift+Enter for a new line`}),(0,$.jsx)(`span`,{children:t.capabilities.mockChat?`Local mock`:`Your Discord profile`})]})]}):(0,$.jsx)(`p`,{className:`ticket-chat-readonly`,children:`Read-only conversation · Reply in Discord`})]})}export{gc as TicketConversation};