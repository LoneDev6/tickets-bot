import{a as e,c as t,d as n,i as r,l as i,n as a,o,r as s,s as c,t as l,u}from"./index-BgUu8rx4.js";var d={name:`chevron-right`,size:24,node:[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]};d.node;var f=t(d),p={name:`hash`,size:24,node:[[`line`,{x1:`4`,x2:`20`,y1:`9`,y2:`9`,key:`4lhtct`}],[`line`,{x1:`4`,x2:`20`,y1:`15`,y2:`15`,key:`vyu0kd`}],[`line`,{x1:`10`,x2:`8`,y1:`3`,y2:`21`,key:`1ggp8o`}],[`line`,{x1:`16`,x2:`14`,y1:`3`,y2:`21`,key:`weycgp`}]]};p.node;var m=t(p),h={name:`send`,size:24,node:[[`path`,{d:`M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z`,key:`1ffxy3`}],[`path`,{d:`m21.854 2.147-10.94 10.939`,key:`12cjpa`}]]};h.node;var g=t(h),_=u((e=>{Object.defineProperty(e,"__esModule",{value:!0});var t=/\r\n?/g,n=/\t/g,r=/\f/g,i=function(e){return e.replace(t,`
`).replace(r,``).replace(n,`    `)},a=function(e,t){var n=e||{};if(t!=null)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n},o=function(e,t){var n=Object.keys(e).filter(function(t){var n=e[t];if(n==null||n.match==null)return!1;var r=n.order;return typeof r==`number`&&isFinite(r)||typeof console>`u`||console.warn("simple-markdown: Invalid order for rule `"+t+"`: "+String(r)),!0});n.sort(function(t,n){var r=e[t],i=e[n],a=r.order,o=i.order;if(a!==o)return a-o;var s=+!r.quality,c=+!i.quality;return s===c?t<n?-1:+(t>n):s-c});var r,o=function(t,i){var a=[];for(i||=r,r=i;t;){var s=null,c=null,l=null,u=NaN,d=0,f=n[0],p=e[f];do{var m=p.order,h=i.prevCapture==null?``:i.prevCapture[0],g=p.match(t,i,h);if(g){var _=p.quality?p.quality(g,i,h):0;_<=u||(s=f,c=p,l=g,u=_)}d++,f=n[d],p=e[f]}while(p&&(!l||p.order===m&&p.quality));if(c==null||l==null)throw Error("Could not find a matching rule for the below content. The rule with highest `order` should always match content provided to it. Check the definition of `match` for '"+n[n.length-1]+`'. It seems to not match the following source:
`+t);if(l.index)throw Error("`match` must return a capture starting at index 0 (the current parse index). Did you forget a ^ at the start of the RegExp?");var v=c.parse(l,o,i);if(Array.isArray(v))Array.prototype.push.apply(a,v);else{if(typeof v!=`object`||!v)throw Error(`parse() function returned invalid parse result: '${v}'`);v.type??=s,a.push(v)}i.prevCapture=l,t=t.substring(i.prevCapture[0].length)}return a};return function(e,n){return r=a(n,t),!r.inline&&!r.disableAutoBlockNewlines&&(e+=`

`),r.prevCapture=null,o(i(e),r)}},s=function(e){var t=function(t,n,r){return n.inline?e.exec(t):null};return t.regex=e,t},c=function(e){var t=function(t,n){return n.inline?null:e.exec(t)};return t.regex=e,t},l=function(e){var t=function(t,n){return e.exec(t)};return t.regex=e,t};typeof Symbol==`function`&&Symbol.for;var u=function(e,t,n,r){n||={},r=r===void 0||r;var i=``;for(var a in n){var o=n[a];Object.prototype.hasOwnProperty.call(n,a)&&o&&(i+=` `+m(a)+`="`+m(o)+`"`)}var s=`<`+e+i+`>`;return r?s+t+`</`+e+`>`:s},d=function(e){if(e==null)return null;try{var t=new URL(e,`https://localhost`).protocol;if(t.indexOf(`javascript:`)===0||t.indexOf(`vbscript:`)===0||t.indexOf(`data:`)===0)return null}catch{return null}return e},f=/[<>&"']/g,p={"<":`&lt;`,">":`&gt;`,"&":`&amp;`,'"':`&quot;`,"'":`&#x27;`,"/":`&#x2F;`,"`":`&#96;`},m=function(e){return String(e).replace(f,function(e){return p[e]})},h=/\\([^0-9A-Za-z\s])/g,g=function(e){return e.replace(h,`$1`)},_=function(e,t,n){var r=n.inline||!1;n.inline=!0;var i=e(t,n);return n.inline=r,i},v=function(e,t,n){var r=n.inline||!1;n.inline=!1;var i=e(t+`

`,n);return n.inline=r,i},y=function(e,t,n){return{content:_(t,e[1],n)}},b=function(){return{}},x=`(?:[*+-]|\\d+\\.)`,S=`( *)(`+x+`) +`,C=RegExp(`^`+S),w=RegExp(S+`[^\\n]*(?:\\n(?!\\1`+x+` )[^\\n]*)*(
|$)`,`gm`),T=/\n{2,}$/,E=/^ (?= *`)|(` *) $/g,D=T,O=/ *\n+$/,ee=RegExp(`^( *)(`+x+`) [\\s\\S]+?(?:
{2,}(?! )(?!\\1`+x+` )\\n*|\\s*
*$)`),k=/(?:^|\n)( *)$/,te=(function(){var e=/^ *\| *| *\| *$/g,t=/ *$/,n=/^ *-+: *$/,r=/^ *:-+: *$/,i=/^ *:-+ *$/,a=function(e){return n.test(e)?`right`:r.test(e)?`center`:i.test(e)?`left`:null},o=function(t,n,r,i){return i&&(t=t.replace(e,``)),t.trim().split(`|`).map(a)},s=function(e,n,r,i){var a=r.inTable;r.inTable=!0;var o=n(e.trim(),r);r.inTable=a;var s=[[]];return o.forEach(function(e,n){e.type===`tableSeparator`?(!i||n!==0&&n!==o.length-1)&&s.push([]):(e.type===`text`&&(o[n+1]==null||o[n+1].type===`tableSeparator`)&&(e.content=e.content.replace(t,``)),s[s.length-1].push(e))}),s},c=function(e,t,n,r){return e.trim().split(`
`).map(function(e){return s(e,t,n,r)})},l=function(e){return function(t,n,r){r.inline=!0;var i=s(t[1],n,r,e),a=o(t[2],n,r,e),l=c(t[3],n,r,e);return r.inline=!1,{type:`table`,header:i,align:a,cells:l}}};return{parseTable:l(!0),parseNpTable:l(!1),TABLE_REGEX:/^ *(\|.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/,NPTABLE_REGEX:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/}})(),ne=`(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*`,A=`\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*`,re=/mailto:/i,ie=function(e,t,n){var r=(e[2]||e[1]).replace(/\s+/g,` `).toLowerCase();if(t._defs&&t._defs[r]){var i=t._defs[r];n.target=i.target,n.title=i.title}return t._refs=t._refs||{},t._refs[r]=t._refs[r]||[],t._refs[r].push(n),n},j=0,ae={Array:{html:function(e,t,n){for(var r=``,i=0;i<e.length;i++){var a=e[i];if(a.type===`text`)for(a={type:`text`,content:a.content};i+1<e.length&&e[i+1].type===`text`;i++)a.content+=e[i+1].content;r+=t(a,n)}return r}},heading:{order:j++,match:c(/^ *(#{1,6})([^\n]+?)#* *(?:\n *)+\n/),parse:function(e,t,n){return{level:e[1].length,content:_(t,e[2].trim(),n)}},html:function(e,t,n){return u(`h`+e.level,t(e.content,n))}},nptable:{order:j++,match:c(te.NPTABLE_REGEX),parse:te.parseNpTable,html:null},lheading:{order:j++,match:c(/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/),parse:function(e,t,n){return{type:`heading`,level:e[2]===`=`?1:2,content:_(t,e[1],n)}},html:null},hr:{order:j++,match:c(/^( *[-*_]){3,} *(?:\n *)+\n/),parse:b,html:function(e,t,n){return`<hr aria-hidden="true">`}},codeBlock:{order:j++,match:c(/^(?:    [^\n]+\n*)+(?:\n *)+\n/),parse:function(e,t,n){return{lang:void 0,content:e[0].replace(/^    /gm,``).replace(/\n+$/,``)}},html:function(e,t,n){var r=e.lang?`markdown-code-`+e.lang:void 0;return u(`pre`,u(`code`,m(e.content),{class:r}))}},fence:{order:j++,match:c(/^ *(`{3,}|~{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n *)+\n/),parse:function(e,t,n){return{type:`codeBlock`,lang:e[2]||void 0,content:e[3]}},html:null},blockQuote:{order:j++,match:c(/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/),parse:function(e,t,n){return{content:t(e[0].replace(/^ *> ?/gm,``),n)}},html:function(e,t,n){return u(`blockquote`,t(e.content,n))}},list:{order:j++,match:function(e,t){var n=t.prevCapture==null?``:t.prevCapture[0],r=k.exec(n),i=t._list||!t.inline;return r&&i?(e=r[1]+e,ee.exec(e)):null},parse:function(e,t,n){var r=e[2],i=r.length>1,a=i?+r:void 0,o=e[0].replace(D,`
`).match(w),s=!1;return{ordered:i,start:a,items:o.map(function(e,r){var i=C.exec(e),a=i?i[0].length:0,c=RegExp(`^ {1,`+a+`}`,`gm`),l=e.replace(c,``).replace(C,``),u=r===o.length-1,d=l.indexOf(`

`)!==-1||u&&s;s=d;var f=n.inline,p=n._list;n._list=!0;var m;d?(n.inline=!1,m=l.replace(O,`

`)):(n.inline=!0,m=l.replace(O,``));var h=t(m,n);return n.inline=f,n._list=p,h})}},html:function(e,t,n){var r=e.items.map(function(e){return u(`li`,t(e,n))}).join(``);return u(e.ordered?`ol`:`ul`,r,{start:e.start})}},def:{order:j++,match:c(/^ *\[([^\]]+)\]: *<?([^\s>]*)>?(?: +["(]([^\n]+)[")])? *\n(?: *\n)*/),parse:function(e,t,n){var r=e[1].replace(/\s+/g,` `).toLowerCase(),i=e[2],a=e[3];return n._refs&&n._refs[r]&&n._refs[r].forEach(function(e){e.target=i,e.title=a}),n._defs=n._defs||{},n._defs[r]={target:i,title:a},{def:r,target:i,title:a}},html:function(){return``}},table:{order:j++,match:c(te.TABLE_REGEX),parse:te.parseTable,html:function(e,t,n){var r=function(t){return e.align[t]==null?``:`text-align:`+e.align[t]+`;`},i=e.header.map(function(e,i){return u(`th`,t(e,n),{style:r(i),scope:`col`})}).join(``),a=e.cells.map(function(e){return u(`tr`,e.map(function(e,i){return u(`td`,t(e,n),{style:r(i)})}).join(``))}).join(``);return u(`table`,u(`thead`,u(`tr`,i))+u(`tbody`,a))}},newline:{order:j++,match:c(/^(?:\n *)*\n/),parse:b,html:function(e,t,n){return`
`}},paragraph:{order:j++,match:c(/^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),parse:y,html:function(e,t,n){return u(`div`,t(e.content,n),{class:`paragraph`})}},escape:{order:j++,match:s(/^\\([^0-9A-Za-z\s])/),parse:function(e,t,n){return{type:`text`,content:e[1]}},html:null},tableSeparator:{order:j++,match:function(e,t){return t.inTable?/^ *\| */.exec(e):null},parse:function(){return{type:`tableSeparator`}},html:function(){return` &vert; `}},autolink:{order:j++,match:s(/^<([^: >]+:\/[^ >]+)>/),parse:function(e,t,n){return{type:`link`,content:[{type:`text`,content:e[1]}],target:e[1]}},html:null},mailto:{order:j++,match:s(/^<([^ >]+@[^ >]+)>/),parse:function(e,t,n){var r=e[1],i=e[1];return re.test(i)||(i=`mailto:`+i),{type:`link`,content:[{type:`text`,content:r}],target:i}},html:null},url:{order:j++,match:s(/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/),parse:function(e,t,n){return{type:`link`,content:[{type:`text`,content:e[1]}],target:e[1],title:void 0}},html:null},link:{order:j++,match:s(RegExp(`^\\[(`+ne+`)\\]\\(`+A+`\\)`)),parse:function(e,t,n){return{content:t(e[1],n),target:g(e[2]),title:e[3]}},html:function(e,t,n){var r={href:d(e.target),title:e.title};return u(`a`,t(e.content,n),r)}},image:{order:j++,match:s(RegExp(`^!\\[(`+ne+`)\\]\\(`+A+`\\)`)),parse:function(e,t,n){return{alt:e[1],target:g(e[2]),title:e[3]}},html:function(e,t,n){return u(`img`,``,{src:d(e.target),alt:e.alt,title:e.title},!1)}},reflink:{order:j++,match:s(RegExp(`^\\[(`+ne+`)\\]\\s*\\[([^\\]]*)\\]`)),parse:function(e,t,n){return ie(e,n,{type:`link`,content:t(e[1],n)})},html:null},refimage:{order:j++,match:s(RegExp(`^!\\[(`+ne+`)\\]\\s*\\[([^\\]]*)\\]`)),parse:function(e,t,n){return ie(e,n,{type:`image`,alt:e[1]})},html:null},em:{order:j,match:s(RegExp(`^\\b_((?:__|\\\\[\\s\\S]|[^\\\\_])+?)_\\b|^\\*(?=\\S)((?:\\*\\*|\\\\[\\s\\S]|\\s+(?:\\\\[\\s\\S]|[^\\s\\*\\\\]|\\*\\*)|[^\\s\\*\\\\])+?)\\*(?!\\*)`)),quality:function(e){return e[0].length+.2},parse:function(e,t,n){return{content:t(e[2]||e[1],n)}},html:function(e,t,n){return u(`em`,t(e.content,n))}},strong:{order:j,match:s(/^\*\*((?:\\[\s\S]|[^\\])+?)\*\*(?!\*)/),quality:function(e){return e[0].length+.1},parse:y,html:function(e,t,n){return u(`strong`,t(e.content,n))}},u:{order:j++,match:s(/^__((?:\\[\s\S]|[^\\])+?)__(?!_)/),quality:function(e){return e[0].length},parse:y,html:function(e,t,n){return u(`u`,t(e.content,n))}},del:{order:j++,match:s(/^~~(?=\S)((?:\\[\s\S]|~(?!~)|[^\s~\\]|\s(?!~~))+?)~~/),parse:y,html:function(e,t,n){return u(`del`,t(e.content,n))}},inlineCode:{order:j++,match:s(/^(`+)([\s\S]*?[^`])\1(?!`)/),parse:function(e,t,n){return{content:e[2].replace(E,`$1`)}},html:function(e,t,n){return u(`code`,m(e.content))}},br:{order:j++,match:l(/^ {2,}\n/),parse:b,html:function(e,t,n){return`<br>`}},text:{order:j++,match:l(/^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+:\S|$)/),parse:function(e,t,n){return{content:e[0]}},html:function(e,t,n){return m(e.content)}}},M=function(e,t){return!t&&typeof console<`u`&&console.warn(`simple-markdown ruleOutput should take 'react' or 'html' as the second argument.`),function(n,r,i){return e[n.type][t](n,r,i)}},oe=function(e){var t=function(n,r){return r||={},Array.isArray(n)?n.map(function(e){return t(e,r)}).join(``):e(n,t,r)};return t},se=function(e,t,n={}){if(!t)throw Error("simple-markdown: outputFor: `property` must be defined. if you just upgraded, you probably need to replace `outputFor` with `reactFor`");var r,i=(e.Array||ae.Array)[t];if(!i)throw Error("simple-markdown: outputFor: to join nodes of type `"+t+"` you must provide an `Array:` joiner rule with that type, Please see the docs for details on specifying an Array rule.");var o=i,s=function(n,i){return i||=r,r=i,Array.isArray(n)?o(n,s,i):e[n.type][t](n,s,i)};return function(e,t){return r=a(t,n),s(e,r)}},ce=o(ae),N=function(e,t){return t||={},t.inline=!1,ce(e,t)},le=function(e,t){return t||={},t.inline=!0,ce(e,t)},P=function(e,t){var n=T.test(e);return t||={},t.inline=!n,ce(e,t)},F=se(ae,`html`);e.default={defaultRules:ae,parserFor:o,outputFor:se,inlineRegex:s,blockRegex:c,anyScopeRegex:l,parseInline:_,parseBlock:v,markdownToHtml:function(e,t){return F(N(e,t),t)},defaultBlockParse:N,defaultInlineParse:le,defaultImplicitParse:P,defaultHtmlOutput:F,preprocess:i,sanitizeText:m,sanitizeUrl:d,unescapeUrl:g,htmlTag:u,defaultRawParse:ce,ruleOutput:M,htmlFor:oe,defaultParse:function(...e){return typeof console<`u`&&console.warn("defaultParse is deprecated, please use `defaultImplicitParse`"),P.apply(null,e)},defaultOutput:function(...e){return typeof console<`u`&&console.warn("defaultOutput is deprecated, please use `defaultReactOutput`"),defaultReactOutput.apply(null,e)}}})),v=u((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.GuildNavigationRegex=e.SlashCommandRegex=e.SubtextRegex=e.HeadingRegex=e.TimestampRegex=e.TextRegex=e.StrikeThroughRegex=e.SpoilerRegex=e.EmoticonRegex=e.CodeBlockRegex=e.BlockQuoteRegex=e.HereRegex=e.EveryoneRegex=e.UserMentionRegex=e.RoleMentionRegex=e.EmojiRegex=e.ChannelMentionRegex=void 0,e.ChannelMentionRegex=/^<#(\d{17,20})>/,e.EmojiRegex=/^<(a)?:(\w{2,32}):(\d{17,21})>/,e.RoleMentionRegex=/^<@&(\d{17,20})>/,e.UserMentionRegex=/^<@!?(\d{17,20})>/,e.EveryoneRegex=/^@everyone/,e.HereRegex=/^@here/,e.BlockQuoteRegex=/^( *>>> ([\s\S]*))|^( *> [^\n]*(\n *> [^\n]*)*\n?)/,e.CodeBlockRegex=/^```(([a-z0-9_+\-.#]+?)\n+)?\n*([^]+?)\n*```/i,e.EmoticonRegex=/^(¯\\_\(ツ\)_\/¯)/,e.SpoilerRegex=/^\|\|([\s\S]+?)\|\|/,e.StrikeThroughRegex=/^~~([\s\S]+?)~~(?!_)/,e.TextRegex=/^[\s\S]+?(?=[^0-9A-Za-z\s]|\n\n|\n|\w+:\S|$)/,e.TimestampRegex=/^<t:(-?\d+)(?::(R|t|T|d|D|f|F))?>/,e.HeadingRegex=/^(#{1,3}) +([^\n]+?)(\n|$)/,e.SubtextRegex=/^-# +([^\n]+?)(\n|$)/,e.SlashCommandRegex=/^<\/([-_'\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}(?: [-_'\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}){0,2})?:(\d{17,21})>/u,e.GuildNavigationRegex=/^<(\d{17,20}):(?:(customize|browse|guide)|(linked-roles)(:\d{17,20})?)>/})),y=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.guildNavigation=void 0;var i=r(_()),a=v();e.guildNavigation={order:i.default.defaultRules.strong.order,match:e=>a.GuildNavigationRegex.exec(e),parse:function(e){let t=e[2]??e[3];if(t===`linked-roles`){let n=e[4]?.slice(1)??null;return{id:e[1],navigation:t,roleId:n}}return{id:e[1],navigation:t}}}})),b=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.slashCommand=void 0;var i=r(_()),a=v();e.slashCommand={order:i.default.defaultRules.strong.order,match:e=>a.SlashCommandRegex.exec(e),parse:function(e){let t=e[1].split(` `),n={fullName:e[1],name:t[0],subcommand:null,subcommandGroup:null,id:e[2]};return t.length==2&&(n.subcommand=t[1]),t.length===3&&(n.subcommandGroup=t[1],n.subcommand=t[2]),n}}})),x=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.everyone=void 0;var i=r(_()),a=v();e.everyone={order:i.default.defaultRules.strong.order,match:e=>a.EveryoneRegex.exec(e),parse:function(){return{}}}})),S=u((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.TwemojiRegex=void 0,e.TwemojiRegex=/^((?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83d\udc30\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udeef\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83d\udc30\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udeef\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83d\udc30\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udeef\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83d\udc30\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udeef\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83d\udc30\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udeef\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83d\udc30\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udeef\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83d\udc30\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udeef\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83d\udc30\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udeef\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83d\udc30\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udeef\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83d\udc30\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udeef\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83d\udc30\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udeef\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83d\udc30\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udeef\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83d\udc30\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udeef\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83d\udc30\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udeef\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83d\udc30\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udeef\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6f\ud83c\udffb\u200d\u2640\ufe0f|\ud83d\udc6f\ud83c\udffb\u200d\u2642\ufe0f|\ud83d\udc6f\ud83c\udffc\u200d\u2640\ufe0f|\ud83d\udc6f\ud83c\udffc\u200d\u2642\ufe0f|\ud83d\udc6f\ud83c\udffd\u200d\u2640\ufe0f|\ud83d\udc6f\ud83c\udffd\u200d\u2642\ufe0f|\ud83d\udc6f\ud83c\udffe\u200d\u2640\ufe0f|\ud83d\udc6f\ud83c\udffe\u200d\u2642\ufe0f|\ud83d\udc6f\ud83c\udfff\u200d\u2640\ufe0f|\ud83d\udc6f\ud83c\udfff\u200d\u2642\ufe0f|\ud83e\udd3c\ud83c\udffb\u200d\u2640\ufe0f|\ud83e\udd3c\ud83c\udffb\u200d\u2642\ufe0f|\ud83e\udd3c\ud83c\udffc\u200d\u2640\ufe0f|\ud83e\udd3c\ud83c\udffc\u200d\u2642\ufe0f|\ud83e\udd3c\ud83c\udffd\u200d\u2640\ufe0f|\ud83e\udd3c\ud83c\udffd\u200d\u2642\ufe0f|\ud83e\udd3c\ud83c\udffe\u200d\u2640\ufe0f|\ud83e\udd3c\ud83c\udffe\u200d\u2642\ufe0f|\ud83e\udd3c\ud83c\udfff\u200d\u2640\ufe0f|\ud83e\udd3c\ud83c\udfff\u200d\u2642\ufe0f|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc6f\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83e\udd3c\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc6f\udc8f\udc91]|\ud83e[\udd1d\udd3c])|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd\ude70])(?:\u200d\u27a1\ufe0f)?|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f(?:\u200d\u27a1\ufe0f)?)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f(?:\u200d\u27a1\ufe0f)?|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83e\uddd1\u200d\ud83e\uddd1\u200d\ud83e\uddd2\u200d\ud83e\uddd2|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83e\uddd1\u200d\ud83e\uddd1\u200d\ud83e\uddd2|\ud83e\uddd1\u200d\ud83e\uddd2\u200d\ud83e\uddd2|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u26d3\ufe0f\u200d\ud83d\udca5|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udf44\u200d\ud83d\udfeb|\ud83c\udf4b\u200d\ud83d\udfe9|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc26\u200d\ud83d\udd25|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83d\ude42\u200d\u2194\ufe0f|\ud83d\ude42\u200d\u2195\ufe0f|\ud83e\uddd1\u200d\ud83e\uddd2|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c\udfc3|\ud83d\udeb6|\ud83e\uddce)(?:\ud83c[\udffb-\udfff])?(?:\u200d\u27a1\ufe0f)?|(?:\ud83c[\udf85\udfc2\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4\udeb5\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded8\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude8a\ude8e-\udec2\udec6\udec8\udecd-\udedc\udedf-\udeea\udeef]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f)/})),C=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.twemoji=void 0;var i=r(_()),a=S();e.twemoji={order:i.default.defaultRules.strong.order,match:e=>a.TwemojiRegex.exec(e),parse:function(e){return{name:e[0]}}}})),w=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.channel=void 0;var i=r(_()),a=v();e.channel={order:i.default.defaultRules.strong.order,match:e=>a.ChannelMentionRegex.exec(e),parse:function(e){return{id:e[1]}}}})),T=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.timestamp=void 0;var i=r(_()),a=v();e.timestamp={order:i.default.defaultRules.strong.order,match:e=>a.TimestampRegex.exec(e),parse:function(e){return{timestamp:e[1],format:e[2]}}}})),E=u((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.extend=void 0,e.extend=(e,t)=>Object.assign({},t,e)})),D=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.blockQuote=void 0;var i=r(_()),a=E(),o=v();e.blockQuote=(0,a.extend)({match:function(e,t,n){return!/^$|\n *$/.test(n)||t.inQuote?null:o.BlockQuoteRegex.exec(e)},parse:function(e,t,n){let r=e[0],i=/^ *>>> ?/.exec(r)?/^ *>>> ?/:/^ *> ?/gm;return{content:t(r.replace(i,``),Object.assign({},n,{inQuote:!0})),type:`blockQuote`}}},i.default.defaultRules.blockQuote)})),O=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.strikethrough=void 0;var i=r(_()),a=E(),o=v();e.strikethrough=(0,a.extend)({match:i.default.inlineRegex(o.StrikeThroughRegex)},i.default.defaultRules.del)})),ee=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.codeBlock=void 0;var i=r(_()),a=E(),o=v();e.codeBlock=(0,a.extend)({match:i.default.inlineRegex(o.CodeBlockRegex),parse:function(e,t,n){return{lang:(e[2]||``).trim(),content:e[3]||``,inQuote:n.inQuote||!1}}},i.default.defaultRules.codeBlock)})),k=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.emoji=void 0;var i=r(_()),a=v();e.emoji={order:i.default.defaultRules.strong.order,match:e=>a.EmojiRegex.exec(e),parse:function(e){return{animated:e[1]===`a`,name:e[2],id:e[3]}}}})),te=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.role=void 0;var i=r(_()),a=v();e.role={order:i.default.defaultRules.strong.order,match:e=>a.RoleMentionRegex.exec(e),parse:function(e){return{id:e[1]}}}})),ne=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.autolink=void 0;var i=r(_());e.autolink=(0,E().extend)({parse:e=>({content:[{type:`text`,content:e[1]}],target:e[1]})},i.default.defaultRules.autolink)})),A=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.here=void 0;var i=r(_()),a=v();e.here={order:i.default.defaultRules.strong.order,match:e=>a.HereRegex.exec(e),parse:function(){return{}}}})),re=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.emoticon=void 0;var i=r(_()),a=v();e.emoticon={order:i.default.defaultRules.text.order,match:e=>a.EmoticonRegex.exec(e),parse:function(e){return{type:`text`,content:e[1]}}}})),ie=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.user=void 0;var i=r(_()),a=v();e.user={order:i.default.defaultRules.strong.order,match:e=>a.UserMentionRegex.exec(e),parse:function(e){return{id:e[1],type:`user`}}}})),j=u((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.spoiler=void 0;var t=v();e.spoiler={order:0,match:e=>t.SpoilerRegex.exec(e),parse:function(e,t,n){return{content:t(e[1],n)}}}})),ae=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.heading=void 0;var i=r(_()),a=E(),o=v();e.heading=(0,a.extend)({match:function(e,t){return t.prevCapture===null||t.prevCapture.slice(-1)[0]===`
`?o.HeadingRegex.exec(e):null}},i.default.defaultRules.heading)})),M=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.subtext=void 0;var i=r(_()),a=v();e.subtext={order:i.default.defaultRules.heading.order-.5,match:function(e,t){return t.prevCapture===null||t.prevCapture.slice(-1)[0]===`
`?a.SubtextRegex.exec(e):null},parse:function(e,t,n){return{content:t(e[1],n)}}}})),oe=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.text=void 0;var i=r(_()),a=E(),o=v();e.text=(0,a.extend)({match:e=>o.TextRegex.exec(e)},i.default.defaultRules.text)})),se=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.url=void 0;var i=r(_());e.url=(0,E().extend)({parse:e=>({content:[{type:`text`,content:e[1]}],target:e[1]})},i.default.defaultRules.url)})),ce=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.em=void 0;var i=E(),a=r(_());e.em=(0,i.extend)({parse:function(e,t,n){let r=a.default.defaultRules.em.parse(e,t,Object.assign({},n,{inEmphasis:!0}));return n.inEmphasis?r.content:r}},a.default.defaultRules.em)})),N=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.br=void 0;var i=r(_());e.br=(0,E().extend)({match:i.default.anyScopeRegex(/^\n/)},i.default.defaultRules.br)})),le=u(((e,t,n)=>{var r=n&&n.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,"__esModule",{value:!0}),e.rulesExtended=e.rules=e.SimpleMarkdown=void 0,e.parse=I;var i=r(_());e.SimpleMarkdown=i.default;var a=y(),o=b(),s=x(),c=C(),l=w(),u=T(),d=D(),f=O(),p=ee(),m=k(),h=te(),g=ne(),v=A(),S=re(),E=ie(),le=j(),P=ae(),F=M(),ue=oe(),de=se(),fe=ce(),pe=N();e.rules={blockQuote:d.blockQuote,codeBlock:p.codeBlock,newline:i.default.defaultRules.newline,escape:i.default.defaultRules.escape,autolink:g.autolink,url:de.url,em:fe.em,strong:i.default.defaultRules.strong,underline:i.default.defaultRules.u,strikethrough:f.strikethrough,inlineCode:i.default.defaultRules.inlineCode,text:ue.text,emoticon:S.emoticon,br:pe.br,spoiler:le.spoiler,heading:P.heading,subtext:F.subtext,user:E.user,channel:l.channel,role:h.role,emoji:m.emoji,everyone:s.everyone,here:v.here,twemoji:c.twemoji,timestamp:u.timestamp,slashCommand:o.slashCommand,guildNavigation:a.guildNavigation},e.rulesExtended=Object.assign(Object.assign({},e.rules),{link:i.default.defaultRules.link});var me=i.default.parserFor(e.rules),he=i.default.parserFor(e.rulesExtended);function I(e,t=`normal`){return t===`normal`?me(e,{inline:!0}):he(e,{inline:!0})}e.default=I})),P=n(i(),1),F=le(),ue=globalThis,de=ue.ShadowRoot&&(ue.ShadyCSS===void 0||ue.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,fe=Symbol(),pe=new WeakMap,me=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(de&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=pe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&pe.set(t,e))}return e}toString(){return this.cssText}},he=e=>new me(typeof e==`string`?e:e+``,void 0,fe),I=(e,...t)=>new me(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,fe),ge=(e,t)=>{if(de)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=ue.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},_e=de?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return he(t)})(e):e,{is:ve,defineProperty:ye,getOwnPropertyDescriptor:be,getOwnPropertyNames:xe,getOwnPropertySymbols:Se,getPrototypeOf:Ce}=Object,we=globalThis,Te=we.trustedTypes,Ee=Te?Te.emptyScript:``,De=we.reactiveElementPolyfillSupport,Oe=(e,t)=>e,ke={toAttribute(e,t){switch(t){case Boolean:e=e?Ee:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},Ae=(e,t)=>!ve(e,t),je={attribute:!0,type:String,converter:ke,reflect:!1,useDefault:!1,hasChanged:Ae};Symbol.metadata??=Symbol(`metadata`),we.litPropertyMetadata??=new WeakMap;var Me=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=je){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&ye(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=be(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??je}static _$Ei(){if(this.hasOwnProperty(Oe(`elementProperties`)))return;let e=Ce(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Oe(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Oe(`properties`))){let e=this.properties,t=[...xe(e),...Se(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(_e(e))}else e!==void 0&&t.push(_e(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ge(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?ke:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?ke:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??Ae)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};Me.elementStyles=[],Me.shadowRootOptions={mode:`open`},Me[Oe(`elementProperties`)]=new Map,Me[Oe(`finalized`)]=new Map,De?.({ReactiveElement:Me}),(we.reactiveElementVersions??=[]).push(`2.1.2`);var Ne=globalThis,Pe=e=>e,Fe=Ne.trustedTypes,Ie=Fe?Fe.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,Le=`$lit$`,Re=`lit$${Math.random().toFixed(9).slice(2)}$`,ze=`?`+Re,Be=`<${ze}>`,Ve=document,He=()=>Ve.createComment(``),Ue=e=>e===null||typeof e!=`object`&&typeof e!=`function`,We=Array.isArray,Ge=e=>We(e)||typeof e?.[Symbol.iterator]==`function`,Ke=`[ 	
\f\r]`,qe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Je=/-->/g,Ye=/>/g,Xe=RegExp(`>|${Ke}(?:([^\\s"'>=/]+)(${Ke}*=${Ke}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Ze=/'/g,Qe=/"/g,$e=/^(?:script|style|textarea|title)$/i,et=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),L=et(1),R=et(2),tt=Symbol.for(`lit-noChange`),nt=Symbol.for(`lit-nothing`),rt=new WeakMap,it=Ve.createTreeWalker(Ve,129);function at(e,t){if(!We(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return Ie===void 0?t:Ie.createHTML(t)}var ot=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=qe;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===qe?c[1]===`!--`?o=Je:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=Xe):($e.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=Xe):o=Ye:o===Xe?c[0]===`>`?(o=i??qe,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?Xe:c[3]===`"`?Qe:Ze):o===Qe||o===Ze?o=Xe:o===Je||o===Ye?o=qe:(o=Xe,i=void 0);let d=o===Xe&&e[t+1].startsWith(`/>`)?` `:``;a+=o===qe?n+Be:l>=0?(r.push(s),n.slice(0,l)+Le+n.slice(l)+Re+d):n+Re+(l===-2?t:d)}return[at(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},st=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=ot(t,n);if(this.el=e.createElement(l,r),it.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=it.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(Le)){let t=u[o++],n=i.getAttribute(e).split(Re),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?ft:r[1]===`?`?pt:r[1]===`@`?mt:dt}),i.removeAttribute(e)}else e.startsWith(Re)&&(c.push({type:6,index:a}),i.removeAttribute(e));if($e.test(i.tagName)){let e=i.textContent.split(Re),t=e.length-1;if(t>0){i.textContent=Fe?Fe.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],He()),it.nextNode(),c.push({type:2,index:++a});i.append(e[t],He())}}}else if(i.nodeType===8){if(i.data===ze)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(Re,e+1))!==-1;)c.push({type:7,index:a}),e+=Re.length-1}}a++}}static createElement(e,t){let n=Ve.createElement(`template`);return n.innerHTML=e,n}};function ct(e,t,n=e,r){if(t===tt)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=Ue(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=ct(e,i._$AS(e,t.values),i,r)),t}var lt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??Ve).importNode(t,!0);it.currentNode=r;let i=it.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new ut(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ht(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=it.nextNode(),a++)}return it.currentNode=Ve,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},ut=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=nt,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ct(this,e,t),Ue(e)?e===nt||e==null||e===``?(this._$AH!==nt&&this._$AR(),this._$AH=nt):e!==this._$AH&&e!==tt&&this._(e):e._$litType$===void 0?e.nodeType===void 0?Ge(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==nt&&Ue(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ve.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=st.createElement(at(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new lt(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=rt.get(e.strings);return t===void 0&&rt.set(e.strings,t=new st(e)),t}k(t){We(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(He()),this.O(He()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=Pe(e).nextSibling;Pe(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},dt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=nt,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=nt}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=ct(this,e,t,0),a=!Ue(e)||e!==this._$AH&&e!==tt,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=ct(this,r[n+o],t,o),s===tt&&(s=this._$AH[o]),a||=!Ue(s)||s!==this._$AH[o],s===nt?e=nt:e!==nt&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===nt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ft=class extends dt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===nt?void 0:e}},pt=class extends dt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==nt)}},mt=class extends dt{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=ct(this,e,t,0)??nt)===tt)return;let n=this._$AH,r=e===nt&&n!==nt||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==nt&&(n===nt||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ht=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ct(this,e)}},gt={M:Le,P:Re,A:ze,C:1,L:ot,R:lt,D:Ge,V:ct,I:ut,H:dt,N:pt,U:mt,B:ft,F:ht},_t=Ne.litHtmlPolyfillSupport;_t?.(st,ut),(Ne.litHtmlVersions??=[]).push(`3.3.3`);var vt=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new ut(t.insertBefore(He(),e),e,void 0,n??{})}return i._$AI(e),i},yt=globalThis,z=class extends Me{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=vt(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tt}};z._$litElement$=!0,z.finalized=!0,yt.litElementHydrateSupport?.({LitElement:z});var bt=yt.litElementPolyfillSupport;bt?.({LitElement:z}),(yt.litElementVersions??=[]).push(`4.2.2`);var B=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},xt={attribute:!0,type:String,converter:ke,reflect:!1,hasChanged:Ae},St=(e=xt,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function V(e){return(t,n)=>typeof n==`object`?St(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function Ct(e){return V({...e,state:!0,attribute:!1})}function wt(e){return(t,n)=>{let r=typeof t==`function`?t:t[n];Object.assign(r,e)}}var Tt=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Et=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Dt=(()=>{let e=[B(`discord-action-row`)],t,n=[],r,i=z;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Tt(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=I`
		:host {
			display: flex;
			flex-wrap: wrap;
		}
	`;render(){return L`<slot></slot>`}static{Et(r,n)}};return r})(),Ot=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},kt=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},At=(()=>{let e=[B(`discord-attachments`)],t,n=[],r,i=z;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Ot(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=I`
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
	`;render(){return L`<slot></slot>`}static{kt(r,n)}};return r})(),jt=class extends Event{constructor(e,t,n,r){super(`context-request`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=n,this.subscribe=r??!1}};function Mt(e){return e}var Nt=class{constructor(e,t,n,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(e,t)=>{this.unsubscribe&&(this.unsubscribe!==t&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=e,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(e,t)),this.unsubscribe=t},this.host=e,t.context!==void 0){let e=t;this.context=e.context,this.callback=e.callback,this.subscribe=e.subscribe??!1}else this.context=t,this.callback=n,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&=(this.unsubscribe(),void 0)}dispatchRequest(){this.host.dispatchEvent(new jt(this.context,this.host,this.t,this.subscribe))}},Pt=class{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){let n=t||!Object.is(e,this.o);this.o=e,n&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(let[e,{disposer:t}]of this.subscriptions)e(this.o,t)},e!==void 0&&(this.value=e)}addCallback(e,t,n){if(!n)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});let{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}},Ft=class extends Event{constructor(e,t){super(`context-provider`,{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}},It=class extends Pt{constructor(e,t,n){super(t.context===void 0?n:t.initialValue),this.onContextRequest=e=>{if(e.context!==this.context)return;let t=e.contextTarget??e.composedPath()[0];t!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,t,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;let t=new Set;for(let[e,{consumerHost:n}]of this.subscriptions)t.has(e)||(t.add(e),n.dispatchEvent(new jt(this.context,n,e,!0)));e.stopPropagation()},this.host=e,this.context=t.context===void 0?t:t.context,this.attachListeners(),this.host.addController?.(this)}attachListeners(){this.host.addEventListener(`context-request`,this.onContextRequest),this.host.addEventListener(`context-provider`,this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new Ft(this.context,this.host))}};function Lt({context:e}){return(t,n)=>{let r=new WeakMap;if(typeof n==`object`)return{get(){return t.get.call(this)},set(e){return r.get(this).setValue(e),t.set.call(this,e)},init(t){return r.set(this,new It(this,{context:e,initialValue:t})),t}};{t.constructor.addInitializer((t=>{r.set(t,new It(t,{context:e}))}));let i=Object.getOwnPropertyDescriptor(t,n),a;if(i===void 0){let e=new WeakMap;a={get(){return e.get(this)},set(t){r.get(this).setValue(t),e.set(this,t)},configurable:!0,enumerable:!0}}else{let e=i.set;a={...i,set(t){r.get(this).setValue(t),e?.call(this,t)}}}Object.defineProperty(t,n,a);return}}}function H({context:e,subscribe:t}){return(n,r)=>{typeof r==`object`?r.addInitializer((function(){new Nt(this,{context:e,callback:e=>{n.set.call(this,e)},subscribe:t})})):n.constructor.addInitializer((n=>{new Nt(n,{context:e,callback:e=>{n[r]=e},subscribe:t})}))}}var Rt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},zt=e=>(...t)=>({_$litDirective$:e,values:t}),Bt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},U=zt(class extends Bt{constructor(e){if(super(e),e.type!==Rt.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let n=e.element.classList;for(let e of this.st)e in t||(n.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return tt}}),W=e=>e??nt,{I:Vt}=gt,Ht=e=>e.strings===void 0,Ut=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),Ut(e,t);return!0},Wt=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Gt=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Jt(t)}};function Kt(e){this._$AN===void 0?this._$AM=e:(Wt(this),this._$AM=e,Gt(this))}function qt(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)Ut(r[e],!1),Wt(r[e]);else r!=null&&(Ut(r,!1),Wt(r))}else Ut(this,e)}}var Jt=e=>{e.type==Rt.CHILD&&(e._$AP??=qt,e._$AQ??=Kt)},Yt=class extends Bt{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Gt(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(Ut(this,e),Wt(this))}setValue(e){if(Ht(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},Xt=()=>new Zt,Zt=class{},Qt=new WeakMap,$t=zt(class extends Yt{render(e){return nt}update(e,[t]){let n=t!==this.G;return n&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),nt}rt(e){if(this.G!==void 0){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=Qt.get(t);n===void 0&&(n=new WeakMap,Qt.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}}get lt(){return typeof this.G==`function`?Qt.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});function G(e,t,n){return e?t(e):n?.(e)}var en=I`
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
`,tn=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},nn=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},rn=(()=>{let e=z,t,n=[],r=[],i,a=[],o=[],s,c=[],l=[],u,d=[],f=[],p,m=[],h=[],g,_=[],v=[],y,b=[],x=[],S,C=[],w=[];return class extends e{static{let T=typeof Symbol==`function`&&Symbol.metadata?Object.create(e[Symbol.metadata]??null):void 0;t=[Ct()],i=[Ct()],s=[Ct()],u=[Ct()],p=[Ct()],g=[Ct()],y=[Ct()],S=[Ct()],tn(this,null,t,{kind:`accessor`,name:`currentPlaybackPosition`,static:!1,private:!1,access:{has:e=>`currentPlaybackPosition`in e,get:e=>e.currentPlaybackPosition,set:(e,t)=>{e.currentPlaybackPosition=t}},metadata:T},n,r),tn(this,null,i,{kind:`accessor`,name:`totalMediaDuration`,static:!1,private:!1,access:{has:e=>`totalMediaDuration`in e,get:e=>e.totalMediaDuration,set:(e,t)=>{e.totalMediaDuration=t}},metadata:T},a,o),tn(this,null,s,{kind:`accessor`,name:`isPlaying`,static:!1,private:!1,access:{has:e=>`isPlaying`in e,get:e=>e.isPlaying,set:(e,t)=>{e.isPlaying=t}},metadata:T},c,l),tn(this,null,u,{kind:`accessor`,name:`raf`,static:!1,private:!1,access:{has:e=>`raf`in e,get:e=>e.raf,set:(e,t)=>{e.raf=t}},metadata:T},d,f),tn(this,null,p,{kind:`accessor`,name:`isMuted`,static:!1,private:!1,access:{has:e=>`isMuted`in e,get:e=>e.isMuted,set:(e,t)=>{e.isMuted=t}},metadata:T},m,h),tn(this,null,g,{kind:`accessor`,name:`currentVolume`,static:!1,private:!1,access:{has:e=>`currentVolume`in e,get:e=>e.currentVolume,set:(e,t)=>{e.currentVolume=t}},metadata:T},_,v),tn(this,null,y,{kind:`accessor`,name:`hasEnded`,static:!1,private:!1,access:{has:e=>`hasEnded`in e,get:e=>e.hasEnded,set:(e,t)=>{e.hasEnded=t}},metadata:T},b,x),tn(this,null,S,{kind:`accessor`,name:`hasRunUpdate`,static:!1,private:!1,access:{has:e=>`hasRunUpdate`in e,get:e=>e.hasRunUpdate,set:(e,t)=>{e.hasRunUpdate=t}},metadata:T},C,w),T&&Object.defineProperty(this,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:T})}mediaComponentRef=Xt();seekSliderRef=Xt();volumeControlRef=Xt();volumeControlInputRef=Xt();#e=nn(this,n,`0:00`);get currentPlaybackPosition(){return this.#e}set currentPlaybackPosition(e){this.#e=e}#t=(nn(this,r),nn(this,a,``));get totalMediaDuration(){return this.#t}set totalMediaDuration(e){this.#t=e}#n=(nn(this,o),nn(this,c,!1));get isPlaying(){return this.#n}set isPlaying(e){this.#n=e}#r=(nn(this,l),nn(this,d,null));get raf(){return this.#r}set raf(e){this.#r=e}#i=(nn(this,f),nn(this,m,!1));get isMuted(){return this.#i}set isMuted(e){this.#i=e}#a=(nn(this,h),nn(this,_,1));get currentVolume(){return this.#a}set currentVolume(e){this.#a=e}#o=(nn(this,v),nn(this,b,!1));get hasEnded(){return this.#o}set hasEnded(e){this.#o=e}#s=(nn(this,x),nn(this,C,!1));get hasRunUpdate(){return this.#s}set hasRunUpdate(e){this.#s=e}calculateTime(e){let t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${n<10?`0${n}`:`${n}`}`}displayMediaDuration(){this.mediaComponentRef.value&&(this.totalMediaDuration=this.calculateTime(this.mediaComponentRef.value.duration))}setSliderMax(){this.mediaComponentRef.value&&this.seekSliderRef.value&&(this.seekSliderRef.value.max=Math.floor(this.mediaComponentRef.value.duration).toString())}displayBufferedAmount(){if(this.mediaComponentRef.value&&this.seekSliderRef.value){let e=this.mediaComponentRef.value.buffered.length-1;if(e>=0){let t=Math.floor(this.mediaComponentRef.value.buffered.end(e));this.style.setProperty(`--buffered-width`,`${t/Number(this.seekSliderRef.value.max)*100}%`)}}}whilePlaying=(nn(this,w),()=>{if(this.mediaComponentRef.value&&this.seekSliderRef.value){this.seekSliderRef.value.value=Math.floor(this.mediaComponentRef.value.currentTime).toString();let e=Number(this.seekSliderRef.value.value);this.currentPlaybackPosition=this.calculateTime(e),this.style.setProperty(`--seek-before-width`,`${e/Number(this.seekSliderRef.value.max)*100}%`),this.raf=requestAnimationFrame(this.whilePlaying)}});handleEnded(){this.mediaComponentRef.value&&(this.mediaComponentRef.value.pause(),this.raf!==null&&cancelAnimationFrame(this.raf),this.isPlaying=!1,this.hasEnded=!0)}handleClickPlayPauseIcon=()=>{this.mediaComponentRef.value&&(this.hasEnded&&=!1,this.isPlaying?(this.mediaComponentRef.value.pause(),this.raf!==null&&cancelAnimationFrame(this.raf),this.isPlaying=!1):(this.mediaComponentRef.value.play(),requestAnimationFrame(this.whilePlaying),this.isPlaying=!0))};handleSpaceToPlayPause=e=>{e.code===`Space`&&(e.preventDefault(),e.stopPropagation(),this.handleClickPlayPauseIcon())};handleClickMuteIcon(){this.mediaComponentRef.value&&(this.isMuted?(this.mediaComponentRef.value.muted=!1,this.isMuted=!1):(this.mediaComponentRef.value.muted=!0,this.isMuted=!0))}handleSeekSliderInput(e){let t=e.target;this.style.setProperty(`--seek-before-width`,`${Number(t.value)/Number(t.max)*100}%`),this.seekSliderRef.value&&(this.currentPlaybackPosition=this.calculateTime(Number(this.seekSliderRef.value.value))),this.mediaComponentRef.value&&!this.mediaComponentRef.value.paused&&this.raf!==null&&cancelAnimationFrame(this.raf)}handleSeekSliderChange=()=>{this.mediaComponentRef.value&&this.seekSliderRef.value&&(this.mediaComponentRef.value.currentTime=Number(this.seekSliderRef.value.value),this.mediaComponentRef.value.paused||requestAnimationFrame(this.whilePlaying))};handleVolumeSliderInput(e){let{value:t}=e.target;if(this.mediaComponentRef.value){let e=Number(t)/100;this.currentVolume=e,this.mediaComponentRef.value.volume=e}}handleVolumeVerticalEnter(){this.volumeControlRef.value&&this.style.setProperty(`--volume-slider-opacity`,`1`)}handleVolumeVerticalLeave(){this.volumeControlRef.value&&this.style.setProperty(`--volume-slider-opacity`,`0`)}handleVolumeVerticalFocus(){this.handleVolumeVerticalEnter(),this.addEventListener(`keydown`,this.handleVolumeControlKeyboard)}handleVolumeVerticalBlur(){this.handleVolumeVerticalLeave(),this.removeEventListener(`keydown`,this.handleVolumeControlKeyboard)}handleVolumeControlKeyboard(e){let t=0;e.code===`ArrowDown`?t=-.1:e.code===`ArrowUp`&&(t=.1),t!==0&&this.adjustVolume(t,e)}adjustVolume(e,t){t.preventDefault(),t.stopPropagation();let n=this.currentVolume+e;n<.1?n=0:n>1&&(n=1),this.mediaComponentRef.value&&this.volumeControlInputRef.value&&(this.currentVolume=n,this.mediaComponentRef.value.volume=n,this.volumeControlInputRef.value.value=(n*100).toString())}mediaMetadataLoaded=()=>{this.mediaComponentRef.value&&(this.displayMediaDuration(),this.setSliderMax(),this.displayBufferedAmount())};shouldUpdate(e){return e.has(`hasRunUpdate`)&&e.size===1?!1:super.shouldUpdate(e)}firstUpdated(e){this.hasRunUpdate||(this.mediaComponentRef.value&&(this.mediaComponentRef.value.readyState>0?(this.displayMediaDuration(),this.setSliderMax(),this.displayBufferedAmount()):this.mediaComponentRef.value.addEventListener(`loadedmetadata`,this.mediaMetadataLoaded)),this.hasRunUpdate=!0,super.firstUpdated(e))}disconnectedCallback(){super.disconnectedCallback(),this.mediaComponentRef.value?.removeEventListener(`loadedmetadata`,this.mediaMetadataLoaded)}}})(),an=I`
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
`,on=I`
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
`,K=zt(class extends Yt{host;element;prevData={};eventData={};render(e){return nt}update(e,[t]){this.element!==e.element&&(this.element=e.element),this.host=e.options?.host??this.element,this.apply(t),this.groom(t),this.prevData={...t}}apply(e){if(!e)return;let{prevData:t,element:n}=this;for(let[r,i]of Object.entries(e)){if(i===t[r])continue;let e=r.slice(1);switch(r[0]){case`@`:this.eventData[e]=i,this.applyEvent(e,i);break;case`.`:n[e]=i;break;case`?`:i?n.setAttribute(e,``):n.removeAttribute(e);break;default:i===null?n.removeAttribute(r):n.setAttribute(r,String(i))}}}groom(e){let{prevData:t,element:n}=this;if(t)for(let[r,i]of Object.entries(t)){let t=r.slice(1);if(!e||!(r in e)&&n[t]===i)switch(r[0]){case`@`:this.groomEvent(t,i);break;case`.`:n[t]=void 0;break;case`?`:n.removeAttribute(t);break;default:n.removeAttribute(r)}}}applyEvent(e,t){let{prevData:n,element:r}=this;this.eventData[e]=t,n[e]&&r.removeEventListener(e,this,t),r.addEventListener(e,this,t)}groomEvent(e,t){let{element:n}=this;Reflect.deleteProperty(this.eventData,e),n.removeEventListener(e,this,t)}handleEvent(e){let t=this.eventData[e.type];typeof t==`function`?t.call(this.host,e):t.handleEvent(e)}disconnected(){let{eventData:e,element:t}=this;for(let[n,r]of Object.entries(e)){let e=n.slice(1);t.removeEventListener(e,this,r)}}reconnected(){let{eventData:e,element:t}=this;for(let[n,r]of Object.entries(e)){let e=n.slice(1);t.addEventListener(e,this,r)}}}),sn=R`
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
`;function cn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${sn}
	</svg>`}var ln=R`
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
`;function un(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${ln}
	</svg>`}var dn=R`
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
`;function fn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${dn}
	</svg>`}var pn=R`
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
`;function mn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${pn}
	</svg>`}var hn=R`
	<path d="M6.563.875h-.438V.438H4.812v1.313h-.438V.875h-.436V.438h-.875v.438h-.438v.875h-.437V.438H.875v.438H.438v1.75h.438v.438h.875v.438h.438v.875h.438v.438h.438v.438h.875v-.438h.438v-.438h.438V3.5h.438v-.437h.875v-.438h.438z" fill="#ff7fc0"/>
	<path d="M3.938 0h-.875v.438h.875zm-1.75 0H.875v.438h1.313zm3.938 0H4.813v.438h1.313zm.438.438h-.438v.438h.438zm.438.438h-.438v1.75h.438zM4.377.438h-.439v.438h.438v.875h.438V.438zm-2.189 0v1.313h.438V.875h.438V.438zm-1.313 0H.438v.438h.438zM.438.875H0v1.75h.438zm.438 1.75H.438v.438h.438zm.875.438H.875v.438h.875zm4.375 0h-.875v.438h.875zm.438-.438h-.438v.438h.438zM5.251 3.938V3.5h-.438v.875h1.75v-.437zM1.75 3.5v.438H.438v.438h1.75V3.5zm-1.313.875H0v1.75h.438zm.438 1.75H.438v.438h.438zm5.25.438H.875v.438h5.25zm.438-.438h-.438v.438h.438zm.438-1.75h-.438v1.75h.438zm-4.376 0h-.437v.438h.438zm.438.438h-.438v.438h.438zm1.313 0h-.438v.438h.438zm.438-.438h-.438v.438h.438zm-.875.875h-.876v.438h.875z" fill="#000"/>
	<path d="M4.813 4.375v.438h-.438v.438h-.437v.438h-.875v-.438h-.438v-.438h-.437v-.438H.438v1.75h.438v.438h5.25v-.438h.438v-1.75z" fill="#6be473"/>
	<path d="M1.75 5.25h-.437v.438h.438zm-.438-.438H.875v.438h.438zM5.25 6.125v-.438h-.438v.438h-.874v-.438h-.875v.438h-.875v-.438H1.75v.438H.875v.438h5.25v-.438zm.438-.875H5.25v.438h.438zm.438-.438h-.438v.438h.438zm.438.875h-.438v.438h.438z" fill="#008456"/>
	<path d="M2.625 3.938h-.437v.438h.438zm.438.438h-.438v.438h.438zm1.313 0h-.438v.438h.438zm.438-.438h-.438v.438h.438zm.438-.875h-.438v.438h.438zm.875-.438h-.438v.438h.438zm.438-.875h-.438v.875h.438zM3.94 4.813h-.877v.438h.875z" fill="#ff1c90"/>
	<path d="M4.375 5.25h-.437v.438h.438zm.438-.438h-.438v.438h.438zm.438-.438h-.438v.438h.438zm-4.813.001v.875h.438v-.438h1.313v-.438zm.438-3.5H.438v.875h.438zM2.189.437H.875v.438h1.313zm.875.438h-.439v.438h.438zm.875-.438h-.876v.438h.875zm1.313 0h-.438v.875h.438V.875h.875V.438z" fill="#f0f0f0"/>
`;function gn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${hn}
	</svg>`}var _n=R`
	<path d="M3.063.875v.438h.875V.875zm.875-.438v.438h1.75V.438zm1.75.438v.438h.438V.875zm.438.438v.438h.438v-.438zm.438.438v2.188h.438V1.75zm-.438 2.188v.875h.438v-.876zm-.438.875v.438h.438v-.438zm-.875.438v.438h.875v-.438zm-.875.438v.438h.875V5.69zm-.875.438v.438h.875v-.438z" fill="#000"/>
	<path d="M6.563 1.75h-.438v-.437h-.438V.875H3.938v.438h-.875V.875h-1.75v.438H.875v.438H.438v2.188h.438v.875h.438v.438h.875v.438h.875v.438h.875V5.69h.875v-.438h.875v-.438h.438v-.876h.438z" fill="#ff7fc0"/>
	<path d="M6.563 1.75h-.438v2.188h.438zm-.438 2.188h-.438v.875h.438zm-4.812 0H.875v.875h.438zm4.375.875h-.875v.438h.875zm-.875.438h-.875v.438h.875zm-.875.438h-.875v.438h.875zm-.875-.438h-.875v.438h.875zm-.875-.438h-.875v.438h.875z" fill="#ff1b90"/>
	<path d="M1.313.438v.438h1.75V.438zM.875.875v.438h.438V.875zm-.437.438v.438h.438v-.438zM0 1.75v2.188h.438V1.75zm.438 2.188v.875h.438v-.875zm.438.875v.438h.438v-.438zm.438.438v.438h.875v-.438zm.875.438v.438h.875v-.438z" fill="#000"/>
	<path d="M1.313.875v.438h1.75V.875zm2.625 0v.438h1.75V.875zm-.875.438v.438h.875v-.438z" fill="#f0f0f0"/>
	<path opacity=".6" d="M4.813 2.625v-.437h-.875v.438h-.875v-.438h-.875v.438H1.75v1.313h.438v.438h.879v.438h.875v-.438h.871v-.439h.438V2.625z" fill="#fff"/>
	<path d="M5.688 1.313v.438h.438v-.438zm-4.813 0v.438h.438v-.438zm.438.438v.438h.438V1.75zM.438 1.75v.875h.438V1.75z" fill="#f0f0f0"/>
`;function vn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${_n}
	</svg>`}var yn=R`
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
`;function bn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${yn}
	</svg>`}var xn=R`
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
`;function Sn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${xn}
	</svg>`}var Cn=R`
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
`;function wn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Cn}
	</svg>`}var Tn=R`
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
`;function En(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Tn}
	</svg>`}var Dn=R`
	<path d="M6.125 2.188v-.875h-.438V.875h-.438V.438h-.875v.438h.438v.438h.438v1.75h-.438v.438h-.438v.438H2.625V3.5h-.437v-.437H1.75v-1.75h.438V.875h.438V.438H1.75v.438h-.437v.438H.875v.875H.438v2.625h.438v.875h.438v.438h.875v.438h2.625v-.438h.875v-.438h.438v-.875h.438V2.188z" fill="#b79cf8"/>
	<path d="M2.625 0H1.75v.438h.875zM.875 1.313H.438v.875h.438zm1.313 0H1.75v1.75h.438zm2.188 2.188H2.625v.438h1.75z" fill="#000"/>
	<path d="M4.375 3.938h-1.75v.438h1.75z" fill="#f0f0f0"/>
	<path d="M.438 2.188H0v2.625h.438zm4.375 4.375H2.188v.438h2.625z" fill="#000"/>
	<path d="M.875 4.375H.438v.438h.438zm4.813.875h-.875v.438H2.188V5.25h-.875v-.438H.875v.875h.438v.438h.875v.438h2.625v-.438h.875v-.438h.438v-.875h-.438zm.875-.875h-.438v.438h.438z" fill="#816bee"/>
	<path d="M1.75.438h-.437v.438h.438zm-.437.437H.875v.438h.438z" fill="#000"/>
	<path d="M2.625.438H1.75v.438h.875zM1.75.875h-.437v.438h.438zm-.437.438H.875v.438h.438zm-.438.875H.438v.438h.438zm.438.438H.875v.438h.438zm.875.438H1.75v.438h.438zm.438.438h-.438v.438h.438zm2.625-.438h-.438v.438h.438zM4.813.439h-.438v.438h.438zm0 3.063h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.063.438h-.438v.438h.438zm-.438.437h-.437v.438h.438zm0 2.188h-.437v.438h.438zm-1.75 1.75H.438v.875h.438zm.438.875H.875v.438h.438zM5.251 0h-.875v.438h.875zm.438 6.125h-.875v.438h.875zm-3.5 0h-.876v.438h.875zm4.374-4.812h-.438v.875h.438zm-1.313 0h-.438v1.75h.438zM7 2.188h-.438v2.625H7zM5.687.438h-.438v.438h.438zm.438.438h-.438v.438h.438zM4.375.438h-.437v.438h.438zm.438.438h-.438v.438h.438zm0 2.188h-.438v.438h.438zm1.75 1.75h-.438v.875h.438zm-.438.875h-.438v.438h.438z" fill="#000"/>
	<path d="M2.188.875H1.75v.438h.438z" fill="#b79cf8"/>
`;function On(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Dn}
	</svg>`}var kn=R`
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
`;function An(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${kn}
	</svg>`}var jn=R`
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
`;function Mn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${jn}
	</svg>`}var Nn=R`
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
`;function Pn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Nn}
	</svg>`}var Fn=R`
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
`;function In(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Fn}
	</svg>`}var Ln=R`
	<path d="M5.688 1.313V.875h-.875v.438h-.438V.875h-.437V.438h-.875v.438h-.438v.438h-.437V.875h-.875v.438H.875v1.75h.875v.438h.438v-.438h2.625v.438h.438v-.438h.875v-1.75z" fill="#d1cdd5"/>
	<path d="M6.125 3.938V3.5h-1.75v-.437h-1.75v.438H.875v.438H.438v1.313h.438v.438h1.75v.438h.438v.438h.875v-.438h.438V5.69h1.75v-.438h.438V3.938z" fill="#57595f"/>
	<path d="M3.938 0h-.875v.438h.875zm-.875.438h-.438v.438h.438zm1.313 0h-.438v.438h.438zm1.313 0h-.875v.438h.875zm.438.438h-.438v.438h.438zm-1.313 0h-.438v.438h.438zM2.625.875h-.437v.438h.438zM2.188.438h-.875v.438h.875zm-1.313.875H.438v1.75h.438zm.438-.438H.875v.438h.438zM.875 3.5H.438v.438h.438zm-.437.438H0v1.313h.438zm.438 1.313H.438v.438h.438zm1.75.438H.875v.438h1.75zm.438.438h-.439v.438h.438zm.875.438h-.876v.438h.875zm.438-.438h-.439v.438h.438zm1.75-.438h-1.75v.438h1.75zm.438-.438h-.438v.438h.438zm.438-1.313h-.438v1.313h.438zM6.565 3.5h-.438v.438h.438zm0-2.188h-.438v1.75h.438zM2.188 3.5H1.75v.438h.438zm.438-.438h-.438V3.5h.438zm1.75-.438H2.625v.438h1.75zm.438.438h-.438V3.5h.438zm.438.438h-.438v.438h.438zm.438-.438h-.438V3.5h.875v-.437zm-4.377.001H.875v.438h.875v-.438z" fill="#000"/>
	<path d="M.875 4.813H.438v.438h.438zm.438.438H.875v.438h.438zm1.75.438h-.438v.438h.438zm1.313 0h-.438v.438h.438zm-.438.438h-.875v.438h.875zm2.188-.875h-.438v.438h.438zm.438-1.313h-.438v1.313h.438z" fill="#35363a"/>
	<path d="M1.313 2.625H.875v.438h.438zm.875.438H1.75v.438h.438zm3.063 0h-.438v.438h.438zm-2.626-.438h-.437v.438h.438zm2.188 0h-.438v.438h.438z" fill="#847d8b"/>
	<path d="M5.25 3.063h-.438v.438h.438zm-.875-.875h-1.75v.438h1.75zm1.75-.438h-.438v1.313h.438z" fill="#847d8b"/>
	<path d="M1.75 1.75h-.437v.438h.438zm-.437-.437H.875v.438h.438zm.875-.438h-.875v.438h.875zm.875 0h-.438v.438h.438zm.875-.438h-.875v.438h.875zm.438.438h-.438v.438h.438zm1.313 0h-.875v.438h.875zm.438.438h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M.875 3.938H.438v.438h.438zm.438-.438H.875v.438h.438zm1.313 0h-.438v.438h.438zm1.75-.438H2.625V3.5h1.75zm.875.875h-.438v.438h.438zm.875-.438h-.875v.438h.875z" fill="#d8d8d8"/>
`;function Rn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Ln}
	</svg>`}var zn=R`
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
`;function Bn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${zn}
	</svg>`}var Vn=R`
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
`;function Hn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Vn}
	</svg>`}var Un=R`
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
`;function Wn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Un}
	</svg>`}var Gn=R`
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
`;function Kn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Gn}
	</svg>`}var qn=R`
	<path d="M5.688 2.625v-.437H5.25V1.75h-.438v-.437h-.438V.875h-.436V.438h-.875v.438h-.438v.438h-.437v.438H1.75v.438h-.437v.438H.875v.875H.438v2.188h.438v.438h.875v.438h3.5v-.438h.875v-.438h.438V3.5h-.438v-.875z" fill="#0abbff"/>
	<path d="M3.063 0v.438h.875V0zm-.438.438v.438h.438V.438zm1.313 0v.438h.438V.438zm.438.438v.438h.438V.875zm.438.438v.438h.438v-.439zm.438.438v.438h.438v-.44zm.438.438v.438h.438v-.44zm.438.438v.875h.438v-.878zm-5.69-.003V3.5h.438v-.875zM0 3.5v2.188h.438V3.5zm6.563 0v2.188h.438V3.5zM2.188.875v.438h.438V.875zm-.438.438v.438h.438v-.438zm-.437.437v.438h.438V1.75zm-.438.438v.438h.438v-.438zm-.438 3.5v.438h.438v-.438zm5.688 0v.438h.438v-.438zm-4.375.875v.438h3.5v-.438z" fill="#000"/>
	<path d="M1.75 6.125v.438h3.5v-.438z" fill="#4282d8"/>
	<path d="M.875 6.125v.438h.875v-.438zm5.25.438v-.438H5.25v.438z" fill="#000"/>
	<path d="M3.063.438v.438h.875V.438z" fill="#fff"/>
	<path opacity=".5" d="M4.813 3.5v-.437h-.438v-.438h-.437v-.437h-.875v.438h-.438v.438h-.437v.438H1.75v1.313h.438v.438h2.625v-.438h.438V3.5z" fill="#fff"/>
	<path d="M2.625.875v.438h.438V.875zm-.437.438v.438h.438v-.438zm.438.438v.438h.438V1.75zM1.75 1.75v.438h.438V1.75zm-.437.438v.438h.438v-.438zm-.438.437V3.5h.438v-.875zM.438 3.5v.875h.438V3.5z" fill="#fff"/>
	<path d="M5.25 2.188v.438h.438v-.438zm.438.438v.875h.438v-.876zm.438.875v1.75h-.438v.438H5.25v.438h.875v-.438h.438V3.5zM.875 6.125h.875v-.438H.875z" fill="#4282d8"/>
`;function Jn(e={}){return L`<svg
		${K(e)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${qn}
	</svg>`}var Yn=globalThis.$discordMessage??{};function Xn(){return Yn}var Zn={blue:`https://cdn.discordapp.com/embed/avatars/0.png`,gray:`https://cdn.discordapp.com/embed/avatars/1.png`,green:`https://cdn.discordapp.com/embed/avatars/2.png`,orange:`https://cdn.discordapp.com/embed/avatars/3.png`,red:`https://cdn.discordapp.com/embed/avatars/4.png`,pink:`https://cdn.discordapp.com/embed/avatars/5.png`},Qn=Xn().avatars??{},$n=Object.assign(Zn,Qn,{default:Zn[Qn.default]??Qn.default??Zn.blue}),er=Xn().profiles??{},tr=Xn().defaultTheme===`light`?`light`:`dark`,nr=Xn().defaultMode===`compact`?`compact`:`cozy`,rr=Xn().defaultBackground===`none`?`none`:`discord`,ir=new Map([[`heart`,vn()],[`crystal`,cn()],[`diamond`,un()],[`explosion`,fn()],[`flame`,mn()],[`flower`,gn()],[`key`,bn()],[`leaf`,Sn()],[`lightning`,wn()],[`magic`,En()],[`moon`,On()],[`mushroom`,An()],[`mythical`,Mn()],[`ornament`,Pn()],[`plasma`,In()],[`rock`,Rn()],[`shell`,Bn()],[`skull`,Hn()],[`sun`,Wn()],[`sword`,Kn()],[`water`,Jn()]]),ar=R`
	<path
		fill="currentColor"
		d="M18.91 12.98a5.45 5.45 0 0 1 2.18 6.2c-.1.33-.09.68.1.96l.83 1.32a1 1 0 0 1-.84 1.54h-5.5A5.6 5.6 0 0 1 10 17.5a5.6 5.6 0 0 1 5.68-5.5c1.2 0 2.32.36 3.23.98Z"
	/>
	<path
		fill="currentColor"
		d="M19.24 10.86c.32.16.72-.02.74-.38L20 10c0-4.42-4.03-8-9-8s-9 3.58-9 8c0 1.5.47 2.91 1.28 4.11.14.21.12.49-.06.67l-1.51 1.51A1 1 0 0 0 2.4 18h5.1a.5.5 0 0 0 .49-.5c0-4.2 3.5-7.5 7.68-7.5 1.28 0 2.5.3 3.56.86Z"
	/>
`;function or(e={}){return L`<svg
		${K(e)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		${ar}
	</svg>`}var sr=R`
	<path
		fill="currentColor"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"
	/>
`;function cr(e={}){return L`<svg
		${K(e)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${sr}
	</svg>`}var lr=R`
	<path
		fill="currentColor"
		d="M12 2.81a1 1 0 0 1 0-1.41l.36-.36a1 1 0 0 1 1.41 0l9.2 9.2a1 1 0 0 1 0 1.4l-.7.7a1 1 0 0 1-1.3.13l-9.54-6.72a1 1 0 0 1-.08-1.58l1-1L12 2.8ZM12 21.2a1 1 0 0 1 0 1.41l-.35.35a1 1 0 0 1-1.41 0l-9.2-9.19a1 1 0 0 1 0-1.41l.7-.7a1 1 0 0 1 1.3-.12l9.54 6.72a1 1 0 0 1 .07 1.58l-1 1 .35.36ZM15.66 16.8a1 1 0 0 1-1.38.28l-8.49-5.66A1 1 0 1 1 6.9 9.76l8.49 5.65a1 1 0 0 1 .27 1.39ZM17.1 14.25a1 1 0 1 0 1.11-1.66L9.73 6.93a1 1 0 0 0-1.11 1.66l8.49 5.66Z"
	/>
`;function ur(e={}){return L`<svg
		${K(e)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${lr}
	</svg>`}var dr=R`
	<path
		fill="currentColor"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M6 9h1V6a5 5 0 0 1 10 0v3h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3Zm9-3v3H9V6a3 3 0 1 1 6 0Zm-1 8a2 2 0 0 1-1 1.73V18a1 1 0 1 1-2 0v-2.27A2 2 0 1 1 14 14Z"
	/>
`;function fr(e={}){return L`<svg
		${K(e)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${dr}
	</svg>`}var pr=R`
	<path
		fill="currentColor"
		d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z"
	/>
	<path
		fill="currentColor"
		d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z"
	/>
`;function mr(e={}){return L`<svg
		${K(e)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${pr}
	</svg>`}var hr=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},gr=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},q=Mt(`light-theme`),_r=Mt(`compact-mode`),vr=Mt(`no-background`),yr=(()=>{let e=[B(`discord-messages`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[Lt({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],c=[Lt({context:vr}),V({type:Boolean,reflect:!0,attribute:`no-background`})],d=[Lt({context:_r}),V({type:Boolean,reflect:!0,attribute:`compact-mode`})],m=[V({reflect:!0,attribute:`channel-type`})],_=[V({reflect:!0,attribute:`channel-name`})],hr(this,null,a,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:x},o,s),hr(this,null,c,{kind:`accessor`,name:`noBackground`,static:!1,private:!1,access:{has:e=>`noBackground`in e,get:e=>e.noBackground,set:(e,t)=>{e.noBackground=t}},metadata:x},l,u),hr(this,null,d,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:x},f,p),hr(this,null,m,{kind:`accessor`,name:`channelType`,static:!1,private:!1,access:{has:e=>`channelType`in e,get:e=>e.channelType,set:(e,t)=>{e.channelType=t}},metadata:x},h,g),hr(this,null,_,{kind:`accessor`,name:`channelName`,static:!1,private:!1,access:{has:e=>`channelName`in e,get:e=>e.channelName,set:(e,t)=>{e.channelName=t}},metadata:x},v,y),hr(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=I`
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
	`;#e=gr(this,o,!1);get lightTheme(){return this.#e}set lightTheme(e){this.#e=e}#t=(gr(this,s),gr(this,l,!1));get noBackground(){return this.#t}set noBackground(e){this.#t=e}#n=(gr(this,u),gr(this,f,!1));get compactMode(){return this.#n}set compactMode(e){this.#n=e}#r=(gr(this,p),gr(this,h,void 0));get channelType(){return this.#r}set channelType(e){this.#r=e}#i=(gr(this,g),gr(this,v,void 0));get channelName(){return this.#i}set channelName(e){this.#i=e}connectedCallback(){super.connectedCallback(),(this.lightTheme||tr===`light`&&this.lightTheme)&&(this.lightTheme=!0),(this.compactMode||nr===`compact`&&this.compactMode)&&(this.compactMode=!0),(this.noBackground||rr===`none`&&this.noBackground)&&(this.noBackground=!0)}render(){let e;switch(this.channelType){case`text`:e=L`${cr()}`;break;case`voice`:e=L`${mr()}`;break;case`locked`:e=L`${fr()}`;break;case`thread`:e=L`${ur()}`;break;case`forum`:e=L`${or()}`}return L`
			${G(this.channelType&&this.channelName,()=>L`<div class="discord-channel-header">
						<div class="discord-channel-icon">${e}</div>
						<div class="discord-channel-name">${this.channelName}</div>
					</div>`)}
			<slot></slot>
		`}constructor(){super(...arguments),gr(this,y)}static{gr(r,n)}};return r})(),br=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},xr=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Sr=(()=>{let e=[B(`discord-link`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({context:q,subscribe:!0}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],c=[V()],d=[V()],m=[V()],_=[V()],br(this,null,a,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:x},o,s),br(this,null,c,{kind:`accessor`,name:`href`,static:!1,private:!1,access:{has:e=>`href`in e,get:e=>e.href,set:(e,t)=>{e.href=t}},metadata:x},l,u),br(this,null,d,{kind:`accessor`,name:`rel`,static:!1,private:!1,access:{has:e=>`rel`in e,get:e=>e.rel,set:(e,t)=>{e.rel=t}},metadata:x},f,p),br(this,null,m,{kind:`accessor`,name:`target`,static:!1,private:!1,access:{has:e=>`target`in e,get:e=>e.target,set:(e,t)=>{e.target=t}},metadata:x},h,g),br(this,null,_,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:x},v,y),br(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=I`
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
	`;#e=xr(this,o,!1);get lightTheme(){return this.#e}set lightTheme(e){this.#e=e}#t=(xr(this,s),xr(this,l,void 0));get href(){return this.#t}set href(e){this.#t=e}#n=(xr(this,u),xr(this,f,void 0));get rel(){return this.#n}set rel(e){this.#n=e}#r=(xr(this,p),xr(this,h,void 0));get target(){return this.#r}set target(e){this.#r=e}#i=(xr(this,g),xr(this,v,void 0));get type(){return this.#i}set type(e){this.#i=e}render(){return L`<a
			href=${W(this.href)}
			rel=${W(this.rel)}
			target=${W(this.target)}
			type=${W(this.type)}
			class=${U({"discord-link-light-theme":this.lightTheme})}
			><slot></slot
		></a>`}constructor(){super(...arguments),xr(this,y)}static{xr(r,n)}};return r})(),Cr=R`
	<path
		fill="currentColor"
		d="M12 2a1 1 0 0 1 1 1v10.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V3a1 1 0 0 1 1-1ZM3 20a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3Z"
	/>
`;function wr(e={}){return L`<svg
		${K(e)}
		class="discord-icon-download"
		aria-hidden="true"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		fill="none"
		viewBox="0 0 24 24"
	>
		${Cr}
	</svg>`}var Tr=R`
	<path fill="currentColor" d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H6ZM15 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3Z"></path>
`;function Er(e={}){return L`<svg ${K(e)} aria-hidden="true" role="img" width="16" height="16" fill="none" viewBox="0 0 24 24">${Tr}</svg>`}var Dr=R`
	<path fill="currentColor" d="M9.25 3.35C7.87 2.45 6 3.38 6 4.96v14.08c0 1.58 1.87 2.5 3.25 1.61l10.85-7.04a1.9 1.9 0 0 0 0-3.22L9.25 3.35Z"></path>
`;function Or(e={}){return L`<svg ${K(e)} aria-hidden="true" role="img" width="16" height="16" fill="none" viewBox="0 0 24 24">${Dr}</svg>`}var kr=R`
	<path fill="currentColor" d="M12,5 L12,1 L7,6 L12,11 L12,7 C15.31,7 18,9.69 18,13 C18,16.31 15.31,19 12,19 C8.69,19 6,16.31 6,13 L4,13 C4,17.42 7.58,21 12,21 C16.42,21 20,17.42 20,13 C20,8.58 16.42,5 12,5 L12,5 Z"></path>
`;function Ar(e={}){return L`<svg ${K(e)} aria-hidden="true" role="img" width="16" height="16" fill="none" viewBox="0 0 24 24">${kr}</svg>`}var jr=R`
	<path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z"></path>
	<path fill="currentColor" d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z"></path>
`;function Mr(e={}){return L`<svg ${K(e)} aria-hidden="true" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">${jr}</svg>`}var Nr=R`
	<path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.18 15.36c-.55.35-1.18-.12-1.18-.78v-.27c0-.36.2-.67.45-.93a2 2 0 0 0 0-2.76c-.24-.26-.45-.57-.45-.93v-.27c0-.66.63-1.13 1.18-.78a4 4 0 0 1 0 6.72Z"></path>
`;function Pr(e={}){return L`<svg ${K(e)} aria-hidden="true" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">${Nr}</svg>`}var Fr=R`
	<path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM22.7 8.3a1 1 0 0 0-1.4 0L19 10.58l-2.3-2.3a1 1 0 1 0-1.4 1.42L17.58 12l-2.3 2.3a1 1 0 0 0 1.42 1.4L19 13.42l2.3 2.3a1 1 0 0 0 1.4-1.42L20.42 12l2.3-2.3a1 1 0 0 0 0-1.4Z"></path>
`;function Ir(e={}){return L`<svg ${K(e)} aria-hidden="true" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">${Fr}</svg>`}var Lr=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Rr=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},zr=(()=>{let e=[B(`discord-audio-attachment`)],t,n=[],r,i=rn,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V()],d=[V({type:Number})],m=[V({attribute:`bytes-unit`})],_=[H({context:q,subscribe:!0}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],Lr(this,null,a,{kind:`accessor`,name:`href`,static:!1,private:!1,access:{has:e=>`href`in e,get:e=>e.href,set:(e,t)=>{e.href=t}},metadata:x},o,s),Lr(this,null,c,{kind:`accessor`,name:`name`,static:!1,private:!1,access:{has:e=>`name`in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:x},l,u),Lr(this,null,d,{kind:`accessor`,name:`bytes`,static:!1,private:!1,access:{has:e=>`bytes`in e,get:e=>e.bytes,set:(e,t)=>{e.bytes=t}},metadata:x},f,p),Lr(this,null,m,{kind:`accessor`,name:`bytesUnit`,static:!1,private:!1,access:{has:e=>`bytesUnit`in e,get:e=>e.bytesUnit,set:(e,t)=>{e.bytesUnit=t}},metadata:x},h,g),Lr(this,null,_,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:x},v,y),Lr(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=[on,an,en,I`
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
		`];#e=Rr(this,o,void 0);get href(){return this.#e}set href(e){this.#e=e}#t=(Rr(this,s),Rr(this,l,void 0));get name(){return this.#t}set name(e){this.#t=e}#n=(Rr(this,u),Rr(this,f,void 0));get bytes(){return this.#n}set bytes(e){this.#n=e}#r=(Rr(this,p),Rr(this,h,void 0));get bytesUnit(){return this.#r}set bytesUnit(e){this.#r=e}#i=(Rr(this,g),Rr(this,v,!1));get lightTheme(){return this.#i}set lightTheme(e){this.#i=e}render(){let e=this.name?.replaceAll(/\s/g,`_`)?.replaceAll(/[^\w-]/g,``);return L`<div class="discord-media-attachment-non-visual-media-item-container">
			<div class="discord-audio-attachment-non-visual-media-item">
				<div class="discord-media-attachment-mosaic-item-media">
					<div
						class=${U({"discord-audio-attachment-wrapper-audio":!0,"discord-audio-attachment-light-theme":this.lightTheme})}
					>
						<div class="discord-audio-attachment-audio-metadata">
							<div class="discord-audio-attachment-audio-metadata-content">
								<discord-link
									href=${W(this.href)}
									ref="noreferrer noopener"
									target="_blank"
									role="button"
									aria-label="Download"
								>
									${e}
								</discord-link>
								<div class="discord-audio-attachment-audio-metadata-size">
									${this.bytes}${G(this.bytesUnit,()=>L` ${this.bytesUnit}`,()=>null)}
								</div>
							</div>
						</div>
						<audio
							${$t(this.mediaComponentRef)}
							class="discord-audio-attachment-audio-element"
							preload="metadata"
							@progress=${this.displayBufferedAmount}
							@ended=${this.handleEnded}
						>
							<source src=${W(this.href)} />
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
								${G(this.hasEnded,()=>Ar({class:`discord-media-attachment-control-icon`}),()=>G(this.isPlaying,()=>Er({class:`discord-media-attachment-control-icon`}),()=>Or({class:`discord-media-attachment-control-icon`})))}
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
										${$t(this.seekSliderRef)}
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
									<div ${$t(this.volumeControlRef)} class="discord-media-attachment-button-slider">
										<div
											class="discord-media-attachment-volume-vertical"
											@mouseenter=${this.handleVolumeVerticalEnter}
											@mouseleave=${this.handleVolumeVerticalLeave}
										>
											<input
												${$t(this.volumeControlInputRef)}
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
											${G(this.currentVolume===0||this.isMuted,()=>Ir({class:`discord-media-attachment-button-control-icon`}),()=>G(this.currentVolume<=.5,()=>Pr({class:`discord-media-attachment-button-control-icon`}),()=>Mr({class:`discord-media-attachment-button-control-icon`})))}
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
					href="${W(this.href)}"
					rel="noreferrer noopener"
					target="_blank"
					role="button"
					tabindex="0"
				>
					${wr()}
				</a>
			</div>
		</div>`}constructor(){super(...arguments),Rr(this,y)}static{Rr(r,n)}};return r})(),Br=R`
	<path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor" />
`;function Vr(e={}){return L`<svg
		${K(e)}
		class="discord-application-tag-verified"
		aria-label="Verified App"
		aria-hidden="false"
		width="16"
		height="16"
		viewBox="0 0 16 15.2"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Br}
	</svg>`}var Hr=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Ur=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Wr=(()=>{let e=[B(`discord-verified-author-tag`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[];var d=class extends i{static{r=this}static{let f=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({type:Boolean})],c=[H({context:_r}),V({type:Boolean,reflect:!0,attribute:`compact-mode`})],Hr(this,null,a,{kind:`accessor`,name:`verified`,static:!1,private:!1,access:{has:e=>`verified`in e,get:e=>e.verified,set:(e,t)=>{e.verified=t}},metadata:f},o,s),Hr(this,null,c,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:f},l,u),Hr(null,t={value:r},e,{kind:`class`,name:r.name,metadata:f},null,n),d=r=t.value,f&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:f})}static styles=I`
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
	`;#e=Ur(this,o,!1);get verified(){return this.#e}set verified(e){this.#e=e}#t=(Ur(this,s),Ur(this,l,!1));get compactMode(){return this.#t}set compactMode(e){this.#t=e}render(){return L`${G(this.verified,()=>Vr())}App`}constructor(){super(...arguments),Ur(this,u)}static{Ur(r,n)}};return r})(),Gr=`important`,Kr=` !`+Gr,qr=zt(class extends Bt{constructor(e){if(super(e),e.type!==Rt.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[t]){let{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)t[e]??(this.ft.delete(e),e.includes(`-`)?n.removeProperty(e):n[e]=null);for(let e in t){let r=t[e];if(r!=null){this.ft.add(e);let t=typeof r==`string`&&r.endsWith(Kr);e.includes(`-`)||t?n.setProperty(e,t?r.slice(0,-11):r,t?Gr:``):n[e]=r}}return tt}}),Jr=class extends Error{constructor(e){super(e),this.name=`DiscordComponentsError`}},Yr=new Intl.DateTimeFormat(`en-US`,{day:`2-digit`,month:`2-digit`,year:`numeric`}),Xr=new Intl.DateTimeFormat(`en-US`,{hour12:!0,hour:`2-digit`,minute:`2-digit`}),Zr=new Intl.DateTimeFormat(`en-US`,{hour12:!1,hour:`2-digit`,minute:`2-digit`}),Qr=e=>e instanceof Date?Yr.format(e):e,$r=(e,t=!1)=>e instanceof Date?t?Zr.format(e):Xr.format(e):e;function ei(e,t=!1,n=!1){if(!(e instanceof Date)&&typeof e!=`string`)throw TypeError(`Timestamp prop must be a Date object or a string.`);return t?$r(e,n):Qr(e)}var ti=/\.(?<ext>bmp|jpe?g|png|gif|webp|tiff)$/i;function ni(e){if(!ti.test(e))throw new Jr(`The url of an image for discord-image-attachment should match the regex ${ti}`)}var ri=/(?:<(?<animated>a)?:(?<name>\w{2,32}):)?(?<id>\d{17,21})>?/;function ii(e){let t=Xn().emojis?.[e];if(t)return t;let n=ri.exec(e);if(n?.groups){let{name:e,id:t,animated:r}=n.groups;return{name:e,url:`https://cdn.discordapp.com/emojis/${t}.${r?`gif`:`png`}`}}}function ai(e){if(e)return ir.get(e)??e}var oi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},J=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},si=(()=>{let e=[B(`discord-author-info`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,D=[],O=[],ee,k=[],te=[],ne,A=[],re=[],ie,j=[],ae=[],M,oe=[],se=[],ce,N=[],le=[];var P=class extends i{static{r=this}static{let F=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V({type:Boolean})],d=[V({type:Boolean})],m=[V({type:Boolean,attribute:`official-app`})],_=[V({type:Boolean})],b=[V({attribute:`role-color`})],C=[V({attribute:`role-icon`})],E=[V({attribute:`role-name`})],ee=[V({attribute:`clan-icon`})],ne=[V({attribute:`clan-tag`})],ie=[V({type:Boolean})],M=[H({context:_r}),V({type:Boolean,reflect:!0,attribute:`compact-mode`})],ce=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],oi(this,null,a,{kind:`accessor`,name:`author`,static:!1,private:!1,access:{has:e=>`author`in e,get:e=>e.author,set:(e,t)=>{e.author=t}},metadata:F},o,s),oi(this,null,c,{kind:`accessor`,name:`bot`,static:!1,private:!1,access:{has:e=>`bot`in e,get:e=>e.bot,set:(e,t)=>{e.bot=t}},metadata:F},l,u),oi(this,null,d,{kind:`accessor`,name:`server`,static:!1,private:!1,access:{has:e=>`server`in e,get:e=>e.server,set:(e,t)=>{e.server=t}},metadata:F},f,p),oi(this,null,m,{kind:`accessor`,name:`officialApp`,static:!1,private:!1,access:{has:e=>`officialApp`in e,get:e=>e.officialApp,set:(e,t)=>{e.officialApp=t}},metadata:F},h,g),oi(this,null,_,{kind:`accessor`,name:`op`,static:!1,private:!1,access:{has:e=>`op`in e,get:e=>e.op,set:(e,t)=>{e.op=t}},metadata:F},v,y),oi(this,null,b,{kind:`accessor`,name:`roleColor`,static:!1,private:!1,access:{has:e=>`roleColor`in e,get:e=>e.roleColor,set:(e,t)=>{e.roleColor=t}},metadata:F},x,S),oi(this,null,C,{kind:`accessor`,name:`roleIcon`,static:!1,private:!1,access:{has:e=>`roleIcon`in e,get:e=>e.roleIcon,set:(e,t)=>{e.roleIcon=t}},metadata:F},w,T),oi(this,null,E,{kind:`accessor`,name:`roleName`,static:!1,private:!1,access:{has:e=>`roleName`in e,get:e=>e.roleName,set:(e,t)=>{e.roleName=t}},metadata:F},D,O),oi(this,null,ee,{kind:`accessor`,name:`clanIcon`,static:!1,private:!1,access:{has:e=>`clanIcon`in e,get:e=>e.clanIcon,set:(e,t)=>{e.clanIcon=t}},metadata:F},k,te),oi(this,null,ne,{kind:`accessor`,name:`clanTag`,static:!1,private:!1,access:{has:e=>`clanTag`in e,get:e=>e.clanTag,set:(e,t)=>{e.clanTag=t}},metadata:F},A,re),oi(this,null,ie,{kind:`accessor`,name:`verified`,static:!1,private:!1,access:{has:e=>`verified`in e,get:e=>e.verified,set:(e,t)=>{e.verified=t}},metadata:F},j,ae),oi(this,null,M,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:F},oe,se),oi(this,null,ce,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:F},N,le),oi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:F},null,n),P=r=t.value,F&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:F})}static styles=I`
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
	`;#e=J(this,o,void 0);get author(){return this.#e}set author(e){this.#e=e}#t=(J(this,s),J(this,l,!1));get bot(){return this.#t}set bot(e){this.#t=e}#n=(J(this,u),J(this,f,!1));get server(){return this.#n}set server(e){this.#n=e}#r=(J(this,p),J(this,h,!1));get officialApp(){return this.#r}set officialApp(e){this.#r=e}#i=(J(this,g),J(this,v,!1));get op(){return this.#i}set op(e){this.#i=e}#a=(J(this,y),J(this,x,void 0));get roleColor(){return this.#a}set roleColor(e){this.#a=e}#o=(J(this,S),J(this,w,void 0));get roleIcon(){return this.#o}set roleIcon(e){this.#o=e}#s=(J(this,T),J(this,D,void 0));get roleName(){return this.#s}set roleName(e){this.#s=e}#c=(J(this,O),J(this,k,void 0));get clanIcon(){return this.#c}set clanIcon(e){this.#c=e}#l=(J(this,te),J(this,A,void 0));get clanTag(){return this.#l}set clanTag(e){this.#l=e}#u=(J(this,re),J(this,j,!1));get verified(){return this.#u}set verified(e){this.#u=e}#d=(J(this,ae),J(this,oe,!1));get compactMode(){return this.#d}set compactMode(e){this.#d=e}#f=(J(this,se),J(this,N,!1));get lightTheme(){return this.#f}set lightTheme(e){this.#f=e}render(){let e=ai(this.clanIcon),t=this.clanTag?.slice(0,4);return L`${G(this.compactMode,()=>null,()=>L`<span class="discord-author-username" style="${qr({color:this.roleColor??void 0})}">${this.author}</span>`)}
		${G(this.roleIcon&&!this.compactMode,()=>L`<img
					class="discord-author-role-icon"
					src=${W(this.roleIcon)}
					height="20"
					width="20"
					alt=${W(this.roleName)}
					draggable="false"
				/>`)}
		${G(this.bot&&!this.server&&!this.officialApp,()=>L`<discord-verified-author-tag .verified=${this.verified}></discord-verified-author-tag>`)}
		${G(this.server&&!this.bot&&!this.officialApp,()=>L`<span class="discord-application-tag">Server</span>`)}
		${G(this.officialApp&&!this.server&&!this.bot,()=>L`<span class="discord-official-application">${Vr()}OFFICIAL</span>`)}
		${G(this.op,()=>L`<span class="discord-application-tag discord-application-tag-op">OP</span>`)}
		${G(this.compactMode,()=>L`<span class="discord-author-username" style="${qr({color:this.roleColor??void 0})}">${this.author}</span>`)}
		${G(this.clanIcon&&this.clanTag&&this.clanTag?.length>0,()=>L`
				<span class="discord-clan-tag">
					${e===`string`?L`<img srcset=${W(e)} alt=${W(t)} width="12" height="12" draggable="false" />`:e}
					<span>${t}</span>
				</span>
			`)} `}constructor(){super(...arguments),J(this,le)}static{J(r,n)}};return r})(),ci=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},li=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},ui=(()=>{let e=[B(`discord-bold`)],t,n=[],r,i=z;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;ci(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=I`
		:host > strong {
			font-weight: 700;
		}
	`;render(){return L`
			<strong>
				<slot></slot>
			</strong>
		`}static{li(r,n)}};return r})(),di=R`
	<path
		fill="currentColor"
		d="M10 5V3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V14H19V19H5V5H10Z"
	/>
	<path fill="currentColor" d="M21 2.99902H14V4.99902H17.586L9.29297 13.292L10.707 14.706L19 6.41302V9.99902H21V2.99902Z"
	/>
`;function fi(e={}){return L`<svg ${K(e)} class="discord-button-launch" aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
		${di}
	</svg>`}var pi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},mi=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},hi=(()=>{let e=[B(`discord-button`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[];var C=class extends i{static{r=this}static{let w=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({reflect:!0,attribute:`emoji`})],c=[V({reflect:!0,attribute:`emoji-name`})],d=[V({reflect:!0,attribute:`url`})],m=[V({type:Boolean,reflect:!0,attribute:`disabled`})],_=[V({reflect:!0,attribute:`type`})],b=[V({reflect:!0,attribute:`modal-id`})],pi(this,null,a,{kind:`accessor`,name:`emoji`,static:!1,private:!1,access:{has:e=>`emoji`in e,get:e=>e.emoji,set:(e,t)=>{e.emoji=t}},metadata:w},o,s),pi(this,null,c,{kind:`accessor`,name:`emojiName`,static:!1,private:!1,access:{has:e=>`emojiName`in e,get:e=>e.emojiName,set:(e,t)=>{e.emojiName=t}},metadata:w},l,u),pi(this,null,d,{kind:`accessor`,name:`url`,static:!1,private:!1,access:{has:e=>`url`in e,get:e=>e.url,set:(e,t)=>{e.url=t}},metadata:w},f,p),pi(this,null,m,{kind:`accessor`,name:`disabled`,static:!1,private:!1,access:{has:e=>`disabled`in e,get:e=>e.disabled,set:(e,t)=>{e.disabled=t}},metadata:w},h,g),pi(this,null,_,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:w},v,y),pi(this,null,b,{kind:`accessor`,name:`modalId`,static:!1,private:!1,access:{has:e=>`modalId`in e,get:e=>e.modalId,set:(e,t)=>{e.modalId=t}},metadata:w},x,S),pi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:w},null,n),C=r=t.value,w&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:w})}static styles=I`
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
	`;#e=mi(this,o,void 0);get emoji(){return this.#e}set emoji(e){this.#e=e}#t=(mi(this,s),mi(this,l,`emoji`));get emojiName(){return this.#t}set emojiName(e){this.#t=e}#n=(mi(this,u),mi(this,f,void 0));get url(){return this.#n}set url(e){this.#n=e}#r=(mi(this,p),mi(this,h,!1));get disabled(){return this.#r}set disabled(e){this.#r=e}#i=(mi(this,g),mi(this,v,`secondary`));get type(){return this.#i}set type(e){this.#i=e}#a=(mi(this,y),mi(this,x,void 0));get modalId(){return this.#a}set modalId(e){this.#a=e}validButtonTypes=(mi(this,S),new Set([`primary`,`secondary`,`success`,`destructive`]));checkType(){if(this.type){if(typeof this.type!=`string`)throw TypeError("DiscordButton `type` prop must be a string.");if(!this.validButtonTypes.has(this.type))throw RangeError("DiscordButton `type` prop must be one of: 'primary', 'secondary', 'success', 'destructive'")}}checkParentElement(){if(this.parentElement?.tagName.toLowerCase()!==`discord-action-row`)throw new Jr(`All <discord-button> components must be direct children of <discord-action-row>.`)}handleButtonClick(){if(this.modalId){let e=this.parentElement?.parentElement?.parentElement?.parentElement;if(e?.tagName?.toLowerCase()===`discord-messages`){let t=e?.querySelector(`discord-modal`),n=t?.shadowRoot?.querySelector(`dialog#${this.modalId}`),r=n?.querySelector(`div.discord-modal-box`);n instanceof HTMLDialogElement&&r instanceof HTMLDivElement&&(n.showModal(),r.style.display=`flex`,t&&(t.originalBodyOverflow=globalThis.getComputedStyle(globalThis.document.body).overflow,globalThis.document.body.style.overflow=`hidden`))}}}render(){this.checkType(),this.checkParentElement();let e=this.url&&!this.disabled,t=L`
			${G(this.emoji,()=>L`<img src=${this.emoji} alt=${this.emojiName} draggable="true" class="emoji" />`)}
			<span>
				<slot></slot>
			</span>
			${G(this.url,()=>fi())}
		`;return e?L`<a class="secondary" href=${this.url} target="_blank" rel="noopener noreferrer">${t}</a>`:L`<button
			class=${U({[this.type]:!0,disabled:this.disabled,hoverable:!this.disabled})}
			@click=${this.handleButtonClick}
		>
			${t}
		</button>`}static{mi(r,n)}};return r})(),gi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},_i=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},vi=(()=>{let e=[B(`discord-code`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[];var m=class extends i{static{r=this}static{let h=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({type:Boolean,reflect:!0})],c=[H({context:q,subscribe:!0}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],d=[V({type:Boolean,reflect:!0})],gi(this,null,a,{kind:`accessor`,name:`multiline`,static:!1,private:!1,access:{has:e=>`multiline`in e,get:e=>e.multiline,set:(e,t)=>{e.multiline=t}},metadata:h},o,s),gi(this,null,c,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:h},l,u),gi(this,null,d,{kind:`accessor`,name:`embed`,static:!1,private:!1,access:{has:e=>`embed`in e,get:e=>e.embed,set:(e,t)=>{e.embed=t}},metadata:h},f,p),gi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:h},null,n),m=r=t.value,h&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:h})}static styles=I`
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
	`;#e=_i(this,o,!1);get multiline(){return this.#e}set multiline(e){this.#e=e}#t=(_i(this,s),_i(this,l,!1));get lightTheme(){return this.#t}set lightTheme(e){this.#t=e}#n=(_i(this,u),_i(this,f,!1));get embed(){return this.#n}set embed(e){this.#n=e}render(){return this.multiline?L`<discord-pre ?embed=${this.embed}
				><code><slot></slot></code
			></discord-pre>`:L`<code><slot></slot></code>`}constructor(){super(...arguments),_i(this,p)}static{_i(r,n)}};return r})(),yi=R`
	<path
		fill="currentColor"
		d="M56 50.6667V13.3333C56 10.4 53.6 8 50.6667 8H13.3333C10.4 8 8 10.4 8 13.3333V50.6667C8 53.6 10.4 56 13.3333 56H50.6667C53.6 56 56 53.6 56 50.6667ZM22.6667 36L29.3333 44.0267L38.6667 32L50.6667 48H13.3333L22.6667 36Z"
	/>
`;function bi(e={}){return L`<svg ${K(e)} aria-hidden="false" width="64" height="64" viewBox="0 0 64 64">${yi}</svg>`}var xi=R`
	<path
		fill="currentColor"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM16.8995 8.41419L15.4853 6.99998L7 15.4853L8.41421 16.8995L16.8995 8.41419Z"
	/>
`;function Si(e){return L`<svg ${K(e||{})} class="discord-command-icon" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
		${xi}
	</svg>`}var Ci=R`
	<path
		d="M0.809739 3.59646L5.12565 0.468433C5.17446 0.431163 5.23323 0.408043 5.2951 0.401763C5.35698 0.395482 5.41943 0.406298 5.4752 0.432954C5.53096 0.45961 5.57776 0.50101 5.61013 0.552343C5.64251 0.603676 5.65914 0.662833 5.6581 0.722939V2.3707C10.3624 2.3707 11.2539 5.52482 11.3991 7.21174C11.4028 7.27916 11.3848 7.34603 11.3474 7.40312C11.3101 7.46021 11.2554 7.50471 11.1908 7.53049C11.1262 7.55626 11.0549 7.56204 10.9868 7.54703C10.9187 7.53201 10.857 7.49695 10.8104 7.44666C8.72224 5.08977 5.6581 5.63359 5.6581 5.63359V7.28135C5.65831 7.34051 5.64141 7.39856 5.60931 7.44894C5.5772 7.49932 5.53117 7.54004 5.4764 7.5665C5.42163 7.59296 5.3603 7.60411 5.29932 7.59869C5.23834 7.59328 5.18014 7.57151 5.13128 7.53585L0.809739 4.40892C0.744492 4.3616 0.691538 4.30026 0.655067 4.22975C0.618596 4.15925 0.599609 4.08151 0.599609 4.00269C0.599609 3.92386 0.618596 3.84612 0.655067 3.77562C0.691538 3.70511 0.744492 3.64377 0.809739 3.59646Z"
		fill="currentColor"
	/>
`;function wi(e={}){return L`<svg ${K(e)} class="discord-reply-icon" aria-hidden="false" width="12" height="8" viewBox="0 0 12 8">${Ci}</svg>`}var Ti=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Y=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ei=(()=>{let e=[B(`discord-reply`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,D=[],O=[],ee,k=[],te=[],ne,A=[],re=[],ie,j=[],ae=[],M,oe=[],se=[],ce,N=[],le=[],P,F=[],ue=[],de,fe=[],pe=[],me,he=[],ge=[],_e,ve=[],ye=[],be,xe=[],Se=[];var Ce=class extends i{static{r=this}static{let I=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V()],d=[V()],m=[V({type:Boolean})],_=[V({type:Boolean})],b=[V({type:Boolean,attribute:`official-app`})],C=[V({type:Boolean})],E=[V({type:Boolean})],ee=[V({type:Boolean})],ne=[V({attribute:`role-color`})],ie=[V({type:Boolean})],M=[V({type:Boolean})],ce=[V({type:Boolean})],P=[V({attribute:`clan-icon`})],de=[V({attribute:`clan-tag`})],me=[V({type:Boolean,reflect:!0})],_e=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],be=[H({context:_r}),V({type:Boolean,reflect:!0,attribute:`compact-mode`})],Ti(this,null,a,{kind:`accessor`,name:`profile`,static:!1,private:!1,access:{has:e=>`profile`in e,get:e=>e.profile,set:(e,t)=>{e.profile=t}},metadata:I},o,s),Ti(this,null,c,{kind:`accessor`,name:`author`,static:!1,private:!1,access:{has:e=>`author`in e,get:e=>e.author,set:(e,t)=>{e.author=t}},metadata:I},l,u),Ti(this,null,d,{kind:`accessor`,name:`avatar`,static:!1,private:!1,access:{has:e=>`avatar`in e,get:e=>e.avatar,set:(e,t)=>{e.avatar=t}},metadata:I},f,p),Ti(this,null,m,{kind:`accessor`,name:`bot`,static:!1,private:!1,access:{has:e=>`bot`in e,get:e=>e.bot,set:(e,t)=>{e.bot=t}},metadata:I},h,g),Ti(this,null,_,{kind:`accessor`,name:`server`,static:!1,private:!1,access:{has:e=>`server`in e,get:e=>e.server,set:(e,t)=>{e.server=t}},metadata:I},v,y),Ti(this,null,b,{kind:`accessor`,name:`officialApp`,static:!1,private:!1,access:{has:e=>`officialApp`in e,get:e=>e.officialApp,set:(e,t)=>{e.officialApp=t}},metadata:I},x,S),Ti(this,null,C,{kind:`accessor`,name:`op`,static:!1,private:!1,access:{has:e=>`op`in e,get:e=>e.op,set:(e,t)=>{e.op=t}},metadata:I},w,T),Ti(this,null,E,{kind:`accessor`,name:`verified`,static:!1,private:!1,access:{has:e=>`verified`in e,get:e=>e.verified,set:(e,t)=>{e.verified=t}},metadata:I},D,O),Ti(this,null,ee,{kind:`accessor`,name:`edited`,static:!1,private:!1,access:{has:e=>`edited`in e,get:e=>e.edited,set:(e,t)=>{e.edited=t}},metadata:I},k,te),Ti(this,null,ne,{kind:`accessor`,name:`roleColor`,static:!1,private:!1,access:{has:e=>`roleColor`in e,get:e=>e.roleColor,set:(e,t)=>{e.roleColor=t}},metadata:I},A,re),Ti(this,null,ie,{kind:`accessor`,name:`command`,static:!1,private:!1,access:{has:e=>`command`in e,get:e=>e.command,set:(e,t)=>{e.command=t}},metadata:I},j,ae),Ti(this,null,M,{kind:`accessor`,name:`attachment`,static:!1,private:!1,access:{has:e=>`attachment`in e,get:e=>e.attachment,set:(e,t)=>{e.attachment=t}},metadata:I},oe,se),Ti(this,null,ce,{kind:`accessor`,name:`mentions`,static:!1,private:!1,access:{has:e=>`mentions`in e,get:e=>e.mentions,set:(e,t)=>{e.mentions=t}},metadata:I},N,le),Ti(this,null,P,{kind:`accessor`,name:`clanIcon`,static:!1,private:!1,access:{has:e=>`clanIcon`in e,get:e=>e.clanIcon,set:(e,t)=>{e.clanIcon=t}},metadata:I},F,ue),Ti(this,null,de,{kind:`accessor`,name:`clanTag`,static:!1,private:!1,access:{has:e=>`clanTag`in e,get:e=>e.clanTag,set:(e,t)=>{e.clanTag=t}},metadata:I},fe,pe),Ti(this,null,me,{kind:`accessor`,name:`deleted`,static:!1,private:!1,access:{has:e=>`deleted`in e,get:e=>e.deleted,set:(e,t)=>{e.deleted=t}},metadata:I},he,ge),Ti(this,null,_e,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:I},ve,ye),Ti(this,null,be,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:I},xe,Se),Ti(null,t={value:r},e,{kind:`class`,name:r.name,metadata:I},null,n),Ce=r=t.value,I&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:I})}static styles=I`
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
	`;#e=Y(this,o,void 0);get profile(){return this.#e}set profile(e){this.#e=e}#t=(Y(this,s),Y(this,l,`User`));get author(){return this.#t}set author(e){this.#t=e}#n=(Y(this,u),Y(this,f,void 0));get avatar(){return this.#n}set avatar(e){this.#n=e}#r=(Y(this,p),Y(this,h,!1));get bot(){return this.#r}set bot(e){this.#r=e}#i=(Y(this,g),Y(this,v,!1));get server(){return this.#i}set server(e){this.#i=e}#a=(Y(this,y),Y(this,x,!1));get officialApp(){return this.#a}set officialApp(e){this.#a=e}#o=(Y(this,S),Y(this,w,!1));get op(){return this.#o}set op(e){this.#o=e}#s=(Y(this,T),Y(this,D,!1));get verified(){return this.#s}set verified(e){this.#s=e}#c=(Y(this,O),Y(this,k,!1));get edited(){return this.#c}set edited(e){this.#c=e}#l=(Y(this,te),Y(this,A,void 0));get roleColor(){return this.#l}set roleColor(e){this.#l=e}#u=(Y(this,re),Y(this,j,!1));get command(){return this.#u}set command(e){this.#u=e}#d=(Y(this,ae),Y(this,oe,!1));get attachment(){return this.#d}set attachment(e){this.#d=e}#f=(Y(this,se),Y(this,N,!1));get mentions(){return this.#f}set mentions(e){this.#f=e}#p=(Y(this,le),Y(this,F,void 0));get clanIcon(){return this.#p}set clanIcon(e){this.#p=e}#m=(Y(this,ue),Y(this,fe,void 0));get clanTag(){return this.#m}set clanTag(e){this.#m=e}#h=(Y(this,pe),Y(this,he,!1));get deleted(){return this.#h}set deleted(e){this.#h=e}#g=(Y(this,ge),Y(this,ve,!1));get lightTheme(){return this.#g}set lightTheme(e){this.#g=e}#_=(Y(this,ye),Y(this,xe,!1));get compactMode(){return this.#_}set compactMode(e){this.#_=e}resolveAvatar(e){return $n[e]??e??$n.default}render(){let e={author:this.author,bot:this.bot,verified:this.verified,officialApp:this.officialApp,op:this.op,server:this.server,roleColor:this.roleColor,clanIcon:this.clanIcon,clanTag:this.clanTag},t=Reflect.get(er,this.profile)??{},n={...e,...t,avatar:this.resolveAvatar(t.avatar??this.avatar)},r=ai(n.clanIcon),i=n.clanTag?.slice(0,4),a=L`
			${G(n.bot&&!n.server&&!n.officialApp,()=>L`<span class="discord-application-tag">${n.verified?Vr():``}App</span>`)}
			${G(n.server&&!n.bot&&!n.officialApp,()=>L`<span class="discord-application-tag">Server</span>`)}
			${G(n.officialApp&&!n.server&&!n.bot,()=>L`<span class="discord-application-tag">${Vr()}OFFICIAL</span>`)}
		`;return L`${G(this.compactMode||this.deleted,()=>L`<div class="discord-reply-badge">${wi()}</div>`,()=>L`<img class="discord-replied-message-avatar" src="${W(n.avatar)}" alt="${W(n.author)}" />`)}
		${G(this.deleted,()=>L`<div class="discord-replied-deleted-message-content"><em>Original message was deleted</em></div>`,()=>L`${a}
					<span class="discord-replied-message-username" style=${qr({color:n.roleColor})}
						>${G(this.mentions,()=>`@`)}${n.author}</span
					>
					${G(n.clanIcon&&n.clanTag&&n.clanTag?.length>0,()=>L`<span class="discord-clan-tag">
								${r===`string`?L`<img
											srcset=${W(r)}
											alt=${W(i)}
											width="12"
											height="12"
											draggable="false"
										/>`:r}
								<span>${i}</span>
							</span>`)}
					<!-- display: inline -->
					<div class="discord-replied-message-content"
						><slot></slot>${G(this.edited,()=>L`<span class="discord-message-edited">(edited)</span>`)}</div
					>
					${G(this.command,()=>Si({class:`discord-replied-message-content-icon`}),()=>G(this.attachment,()=>bi({class:`discord-replied-message-content-icon`})))}`)}`}constructor(){super(...arguments),Y(this,Se)}static{Y(r,n)}};return r})(),Di=R`
	<path d="M4.61241 0L6 0.845294L1.38759 10L0 9.15471L4.61241 0Z" fill="currentColor" />
`;function Oi(e={}){return L`<svg ${K(e)} class="discord-command-icon" aria-hidden="false" width="6" height="10" viewBox="0 0 6 10" fill="none">
		${Di}
	</svg>`}var ki=R`
	<path fill="currentColor" d="M2.06 7.61c-.25.95.31 1.92 1.26 2.18l4.3 1.15c.94.25 1.91-.31 2.17-1.26l1.15-4.3c.25-.94-.31-1.91-1.26-2.17l-4.3-1.15c-.94-.25-1.91.31-2.17 1.26l-1.15 4.3ZM12.98 7.87a2 2 0 0 0 1.75 2.95H20a2 2 0 0 0 1.76-2.95l-2.63-4.83a2 2 0 0 0-3.51 0l-2.63 4.83ZM5.86 13.27a.89.89 0 0 1 1.28 0l.75.77a.9.9 0 0 0 .54.26l1.06.12c.5.06.85.52.8 1.02l-.13 1.08c-.02.2.03.42.14.6l.56.92c.27.43.14 1-.28 1.26l-.9.58a.92.92 0 0 0-.37.48l-.36 1.02a.9.9 0 0 1-1.15.57l-1-.36a.89.89 0 0 0-.6 0l-1 .36a.9.9 0 0 1-1.15-.57l-.36-1.02a.92.92 0 0 0-.37-.48l-.9-.58a.93.93 0 0 1-.28-1.26l.56-.93c.11-.17.16-.38.14-.59l-.12-1.08c-.06-.5.3-.96.8-1.02l1.05-.12a.9.9 0 0 0 .54-.26l.75-.77ZM18.52 13.71a1.1 1.1 0 0 0-2.04 0l-.46 1.24c-.19.5-.57.88-1.07 1.07l-1.24.46a1.1 1.1 0 0 0 0 2.04l1.24.46c.5.19.88.57 1.07 1.07l.46 1.24c.35.95 1.7.95 2.04 0l.46-1.24c.19-.5.57-.88 1.07-1.07l1.24-.46a1.1 1.1 0 0 0 0-2.04l-1.24-.46a1.8 1.8 0 0 1-1.07-1.07l-.46-1.24Z">
	</path>
`;function Ai(e={}){return L`<svg ${K(e)} class="discord-command-icon-name" aria-hidden="false" width="10" height="10" viewBox="0 0 24 24" fill="none">
		${ki}
	</svg>`}var ji=R`
	<path fill="currentColor" d="M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z"></path>
`;function Mi(e={}){return L`<svg ${K(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		${ji}
	</svg>`}var Ni=R`
	<path fill="color-mix( in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%" d="M12 22a10 10 0 1 0-8.45-4.64c.13.19.11.44-.04.61l-2.06 2.37A1 1 0 0 0 2.2 22H12Z" class="">
    </path>
`;function Pi(e={}){return L`<svg ${K(e)} aria-hidden="false" width="16" height="16" viewBox="0 0 24 24" fill="none">${Ni}</svg>`}var Fi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},X=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ii=(()=>{let e=[B(`discord-command`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,D=[],O=[],ee,k=[],te=[],ne,A=[],re=[],ie,j=[],ae=[],M,oe=[],se=[],ce,N=[],le=[],P,F=[],ue=[],de,fe=[],pe=[],me,he=[],ge=[],_e,ve=[],ye=[],be,xe=[],Se=[],Ce,we=[],Te=[],Ee,De=[],Oe=[];var ke=class extends i{static{r=this}static{let I=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({attribute:`profile`})],c=[V({attribute:`author`})],d=[V({attribute:`avatar`})],m=[V({attribute:`role-color`})],_=[V({attribute:`command`})],b=[V({attribute:`type`})],C=[V({attribute:`context-user-profile`})],E=[V({attribute:`context-user-name`})],ee=[V({attribute:`context-user-image`})],ne=[V({attribute:`context-user-role-color`})],ie=[V({type:Boolean,attribute:`context-user-bot`})],M=[V({type:Boolean,attribute:`context-user-bot-verified`})],ce=[V({type:Boolean,attribute:`context-command-reply`})],P=[V({type:Boolean,attribute:`context-attachment-reply`})],de=[V({type:String,attribute:`context-message-reply`})],me=[V({type:Boolean,attribute:`context-message-deleted`})],_e=[V({type:Boolean,attribute:`context-user-application-official`})],be=[V({type:Boolean,attribute:`context-user-server`})],Ce=[H({context:_r}),V({type:Boolean,reflect:!0,attribute:`compact-mode`})],Ee=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],Fi(this,null,a,{kind:`accessor`,name:`profile`,static:!1,private:!1,access:{has:e=>`profile`in e,get:e=>e.profile,set:(e,t)=>{e.profile=t}},metadata:I},o,s),Fi(this,null,c,{kind:`accessor`,name:`author`,static:!1,private:!1,access:{has:e=>`author`in e,get:e=>e.author,set:(e,t)=>{e.author=t}},metadata:I},l,u),Fi(this,null,d,{kind:`accessor`,name:`avatar`,static:!1,private:!1,access:{has:e=>`avatar`in e,get:e=>e.avatar,set:(e,t)=>{e.avatar=t}},metadata:I},f,p),Fi(this,null,m,{kind:`accessor`,name:`roleColor`,static:!1,private:!1,access:{has:e=>`roleColor`in e,get:e=>e.roleColor,set:(e,t)=>{e.roleColor=t}},metadata:I},h,g),Fi(this,null,_,{kind:`accessor`,name:`command`,static:!1,private:!1,access:{has:e=>`command`in e,get:e=>e.command,set:(e,t)=>{e.command=t}},metadata:I},v,y),Fi(this,null,b,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:I},x,S),Fi(this,null,C,{kind:`accessor`,name:`contextUserProfile`,static:!1,private:!1,access:{has:e=>`contextUserProfile`in e,get:e=>e.contextUserProfile,set:(e,t)=>{e.contextUserProfile=t}},metadata:I},w,T),Fi(this,null,E,{kind:`accessor`,name:`contextUserName`,static:!1,private:!1,access:{has:e=>`contextUserName`in e,get:e=>e.contextUserName,set:(e,t)=>{e.contextUserName=t}},metadata:I},D,O),Fi(this,null,ee,{kind:`accessor`,name:`contextUserAvatar`,static:!1,private:!1,access:{has:e=>`contextUserAvatar`in e,get:e=>e.contextUserAvatar,set:(e,t)=>{e.contextUserAvatar=t}},metadata:I},k,te),Fi(this,null,ne,{kind:`accessor`,name:`contextUserRoleColor`,static:!1,private:!1,access:{has:e=>`contextUserRoleColor`in e,get:e=>e.contextUserRoleColor,set:(e,t)=>{e.contextUserRoleColor=t}},metadata:I},A,re),Fi(this,null,ie,{kind:`accessor`,name:`contextUserBot`,static:!1,private:!1,access:{has:e=>`contextUserBot`in e,get:e=>e.contextUserBot,set:(e,t)=>{e.contextUserBot=t}},metadata:I},j,ae),Fi(this,null,M,{kind:`accessor`,name:`contextUserBotVerified`,static:!1,private:!1,access:{has:e=>`contextUserBotVerified`in e,get:e=>e.contextUserBotVerified,set:(e,t)=>{e.contextUserBotVerified=t}},metadata:I},oe,se),Fi(this,null,ce,{kind:`accessor`,name:`contextCommandReply`,static:!1,private:!1,access:{has:e=>`contextCommandReply`in e,get:e=>e.contextCommandReply,set:(e,t)=>{e.contextCommandReply=t}},metadata:I},N,le),Fi(this,null,P,{kind:`accessor`,name:`contextAttachmentReply`,static:!1,private:!1,access:{has:e=>`contextAttachmentReply`in e,get:e=>e.contextAttachmentReply,set:(e,t)=>{e.contextAttachmentReply=t}},metadata:I},F,ue),Fi(this,null,de,{kind:`accessor`,name:`contextMessageReply`,static:!1,private:!1,access:{has:e=>`contextMessageReply`in e,get:e=>e.contextMessageReply,set:(e,t)=>{e.contextMessageReply=t}},metadata:I},fe,pe),Fi(this,null,me,{kind:`accessor`,name:`contextMessageDeleted`,static:!1,private:!1,access:{has:e=>`contextMessageDeleted`in e,get:e=>e.contextMessageDeleted,set:(e,t)=>{e.contextMessageDeleted=t}},metadata:I},he,ge),Fi(this,null,_e,{kind:`accessor`,name:`contextUserOfficialApplication`,static:!1,private:!1,access:{has:e=>`contextUserOfficialApplication`in e,get:e=>e.contextUserOfficialApplication,set:(e,t)=>{e.contextUserOfficialApplication=t}},metadata:I},ve,ye),Fi(this,null,be,{kind:`accessor`,name:`contextUserServer`,static:!1,private:!1,access:{has:e=>`contextUserServer`in e,get:e=>e.contextUserServer,set:(e,t)=>{e.contextUserServer=t}},metadata:I},xe,Se),Fi(this,null,Ce,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:I},we,Te),Fi(this,null,Ee,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:I},De,Oe),Fi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:I},null,n),ke=r=t.value,I&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:I})}static styles=[Ei.styles,I`
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
		`];#e=X(this,o,void 0);get profile(){return this.#e}set profile(e){this.#e=e}#t=(X(this,s),X(this,l,`User`));get author(){return this.#t}set author(e){this.#t=e}#n=(X(this,u),X(this,f,void 0));get avatar(){return this.#n}set avatar(e){this.#n=e}#r=(X(this,p),X(this,h,void 0));get roleColor(){return this.#r}set roleColor(e){this.#r=e}#i=(X(this,g),X(this,v,void 0));get command(){return this.#i}set command(e){this.#i=e}#a=(X(this,y),X(this,x,`slash_command`));get type(){return this.#a}set type(e){this.#a=e}#o=(X(this,S),X(this,w,void 0));get contextUserProfile(){return this.#o}set contextUserProfile(e){this.#o=e}#s=(X(this,T),X(this,D,`User`));get contextUserName(){return this.#s}set contextUserName(e){this.#s=e}#c=(X(this,O),X(this,k,void 0));get contextUserAvatar(){return this.#c}set contextUserAvatar(e){this.#c=e}#l=(X(this,te),X(this,A,void 0));get contextUserRoleColor(){return this.#l}set contextUserRoleColor(e){this.#l=e}#u=(X(this,re),X(this,j,!1));get contextUserBot(){return this.#u}set contextUserBot(e){this.#u=e}#d=(X(this,ae),X(this,oe,!1));get contextUserBotVerified(){return this.#d}set contextUserBotVerified(e){this.#d=e}#f=(X(this,se),X(this,N,!1));get contextCommandReply(){return this.#f}set contextCommandReply(e){this.#f=e}#p=(X(this,le),X(this,F,!1));get contextAttachmentReply(){return this.#p}set contextAttachmentReply(e){this.#p=e}#m=(X(this,ue),X(this,fe,void 0));get contextMessageReply(){return this.#m}set contextMessageReply(e){this.#m=e}#h=(X(this,pe),X(this,he,!1));get contextMessageDeleted(){return this.#h}set contextMessageDeleted(e){this.#h=e}#g=(X(this,ge),X(this,ve,!1));get contextUserOfficialApplication(){return this.#g}set contextUserOfficialApplication(e){this.#g=e}#_=(X(this,ye),X(this,xe,!1));get contextUserServer(){return this.#_}set contextUserServer(e){this.#_=e}#v=(X(this,Se),X(this,we,!1));get compactMode(){return this.#v}set compactMode(e){this.#v=e}#y=(X(this,Te),X(this,De,!1));get lightTheme(){return this.#y}set lightTheme(e){this.#y=e}validCommandTypes=(X(this,Oe),new Set([`user_command`,`message_command`,`slash_command`]));checkType(){if(this.type){if(typeof this.type!=`string`)throw TypeError("DiscordCommand `type` prop must be a string.");if(!this.validCommandTypes.has(this.type))throw RangeError("DiscordCommand `type` prop must be one of: 'uer_command', 'message_command' or 'slash_command'")}}resolveAvatar(e){return $n[e]??e??$n.default}render(){this.checkType();let e={author:this.author,bot:!1,verified:!1,server:!1,roleColor:this.roleColor},t=Reflect.get(er,this.profile)??{},n={...e,...t,avatar:this.resolveAvatar(t.avatar??this.avatar)},r={author:this.contextUserName,bot:this.contextUserBot,verified:this.contextUserBotVerified,server:!1,roleColor:this.contextUserRoleColor},i=Reflect.get(er,this.contextUserProfile)??{},a={...r,...i,avatar:this.resolveAvatar(i.avatar??this.contextUserAvatar)},o=this.contextMessageDeleted?L`<em class="discord-message-deleted">Original message was deleted</em>`:this.contextMessageReply;return L`
			${G(this.compactMode,()=>L`<div class="discord-reply-badge">${Oi()}</div>`,()=>L`<img class="discord-replied-message-avatar" src="${W(n.avatar)}" alt="${W(n.author)}" />`)}
			<span class="discord-replied-message-username" style=${qr({color:n.roleColor??``})}>${n.author}</span>
			<span> used </span>
			${G(this.type===`slash_command`,()=>L`<div class="discord-replied-message-content discord-slash-command-name">
						${Ai()}<span>${this.command}</span>
					</div>`)}
			${G(this.type===`user_command`,()=>L`<div class="discord-replied-message-content discord-context-command-name"><span>${this.command}</span></div>
						${Mi({class:`discord-arrow-right-icon`})}
						<div class="discord-context-user">
							${G(!this.compactMode,()=>L`<img
										class="discord-replied-message-avatar"
										src="${W(a.avatar)}"
										alt="${W(a.author)}"
									/>`)}
							<span class="discord-replied-message-username" style=${qr({color:a.roleColor??``})}
								>${a.author}</span
							>
						</div>`)}
			${G(this.type===`message_command`,()=>L`<div class="discord-replied-message-content discord-context-command-name"><span>${this.command}</span></div>
						${Mi({class:`discord-arrow-right-icon`})}
						${G(!this.contextMessageDeleted,()=>L`<div class="discord-context-user">
									${G(!this.compactMode,()=>G(!this.contextUserOfficialApplication,()=>L`<img
													class="discord-replied-message-avatar"
													src="${W(a.avatar)}"
													alt="${W(a.author)}"
												/>`,()=>L`<img
													class="discord-replied-message-avatar"
													src="${W($n.blue)}"
													alt="OFFICIALAPPLICATION"
												/>`))}
									${G(a.bot,()=>L`<span class="discord-application-tag">${a.verified?Vr():``}App</span>`,()=>G(this.contextUserServer,()=>L`<span class="discord-application-tag">SERVER</span>`,()=>G(this.contextUserOfficialApplication,()=>L`<span class="discord-application-tag">${Vr()}OFFICIAL</span>`)))}
									<span class="discord-replied-message-username" style=${qr({color:a.roleColor??``})}
										>${a.author}</span
									><span></span>
								</div>`,()=>G(this.contextMessageDeleted,()=>Pi({class:`discord-message-margintop`,style:`margin-right: 3px;`})))}
						<div class="discord-replied-message-content discord-message-margintop">${o}</div>
						${G(this.contextCommandReply&&!this.contextMessageDeleted,()=>Si({class:`discord-replied-message-content-icon discord-message-margintop`}),()=>G(this.contextAttachmentReply,()=>bi({class:`discord-replied-message-content-icon discord-message-margintop`})))} `)}
		`}static{X(r,n)}};return r})(),Li=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Ri=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},zi=(()=>{let e=[B(`discord-custom-emoji`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V()],d=[V({attribute:!1})],m=[V({type:Boolean,attribute:`embed-emoji`})],_=[V({type:Boolean,attribute:`jumbo`})],Li(this,null,a,{kind:`accessor`,name:`name`,static:!1,private:!1,access:{has:e=>`name`in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:x},o,s),Li(this,null,c,{kind:`accessor`,name:`url`,static:!1,private:!1,access:{has:e=>`url`in e,get:e=>e.url,set:(e,t)=>{e.url=t}},metadata:x},l,u),Li(this,null,d,{kind:`accessor`,name:`customEmojisMap`,static:!1,private:!1,access:{has:e=>`customEmojisMap`in e,get:e=>e.customEmojisMap,set:(e,t)=>{e.customEmojisMap=t}},metadata:x},f,p),Li(this,null,m,{kind:`accessor`,name:`embedEmoji`,static:!1,private:!1,access:{has:e=>`embedEmoji`in e,get:e=>e.embedEmoji,set:(e,t)=>{e.embedEmoji=t}},metadata:x},h,g),Li(this,null,_,{kind:`accessor`,name:`jumbo`,static:!1,private:!1,access:{has:e=>`jumbo`in e,get:e=>e.jumbo,set:(e,t)=>{e.jumbo=t}},metadata:x},v,y),Li(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=I`
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
	`;#e=Ri(this,o,void 0);get name(){return this.#e}set name(e){this.#e=e}#t=(Ri(this,s),Ri(this,l,void 0));get url(){return this.#t}set url(e){this.#t=e}#n=(Ri(this,u),Ri(this,f,{}));get customEmojisMap(){return this.#n}set customEmojisMap(e){this.#n=e}#r=(Ri(this,p),Ri(this,h,void 0));get embedEmoji(){return this.#r}set embedEmoji(e){this.#r=e}#i=(Ri(this,g),Ri(this,v,void 0));get jumbo(){return this.#i}set jumbo(e){this.#i=e}willUpdate(){if(!this.url&&this.name){let e=ii(this.name)??this.customEmojisMap[this.name];e&&(this.url??=e.url??``,this.embedEmoji??=e.embedEmoji??!1)}}render(){let e=`:${this.name}:`;return L`<span
			class=${U({"discord-embed-custom-emoji":this.embedEmoji,"discord-custom-emoji":!this.embedEmoji})}
			><img
				aria-label=${e}
				src=${W(this.url)}
				alt=${e}
				draggable="false"
				class=${U({"discord-embed-custom-emoji-image":this.embedEmoji,"discord-custom-emoji-image":!this.embedEmoji,"discord-custom-jumbo-emoji-image":this.jumbo})}
		/></span> `}constructor(){super(...arguments),Ri(this,y)}static{Ri(r,n)}};return r})(),Bi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Vi=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Hi=(()=>{let e=[B(`discord-embed`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,D=[],O=[],ee,k=[],te=[],ne,A=[],re=[],ie,j=[],ae=[],M,oe=[],se=[];var ce=class extends i{static{r=this}static{let N=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V({attribute:`author-name`})],d=[V({attribute:`author-image`})],m=[V({attribute:`author-url`})],_=[V({attribute:`embed-title`})],b=[V({attribute:!1})],C=[V()],E=[V()],ee=[V()],ne=[V()],ie=[V()],M=[H({context:q,subscribe:!0}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],Bi(this,null,a,{kind:`accessor`,name:`color`,static:!1,private:!1,access:{has:e=>`color`in e,get:e=>e.color,set:(e,t)=>{e.color=t}},metadata:N},o,s),Bi(this,null,c,{kind:`accessor`,name:`authorName`,static:!1,private:!1,access:{has:e=>`authorName`in e,get:e=>e.authorName,set:(e,t)=>{e.authorName=t}},metadata:N},l,u),Bi(this,null,d,{kind:`accessor`,name:`authorImage`,static:!1,private:!1,access:{has:e=>`authorImage`in e,get:e=>e.authorImage,set:(e,t)=>{e.authorImage=t}},metadata:N},f,p),Bi(this,null,m,{kind:`accessor`,name:`authorUrl`,static:!1,private:!1,access:{has:e=>`authorUrl`in e,get:e=>e.authorUrl,set:(e,t)=>{e.authorUrl=t}},metadata:N},h,g),Bi(this,null,_,{kind:`accessor`,name:`embedTitle`,static:!1,private:!1,access:{has:e=>`embedTitle`in e,get:e=>e.embedTitle,set:(e,t)=>{e.embedTitle=t}},metadata:N},v,y),Bi(this,null,b,{kind:`accessor`,name:`embedEmojisMap`,static:!1,private:!1,access:{has:e=>`embedEmojisMap`in e,get:e=>e.embedEmojisMap,set:(e,t)=>{e.embedEmojisMap=t}},metadata:N},x,S),Bi(this,null,C,{kind:`accessor`,name:`url`,static:!1,private:!1,access:{has:e=>`url`in e,get:e=>e.url,set:(e,t)=>{e.url=t}},metadata:N},w,T),Bi(this,null,E,{kind:`accessor`,name:`thumbnail`,static:!1,private:!1,access:{has:e=>`thumbnail`in e,get:e=>e.thumbnail,set:(e,t)=>{e.thumbnail=t}},metadata:N},D,O),Bi(this,null,ee,{kind:`accessor`,name:`image`,static:!1,private:!1,access:{has:e=>`image`in e,get:e=>e.image,set:(e,t)=>{e.image=t}},metadata:N},k,te),Bi(this,null,ne,{kind:`accessor`,name:`video`,static:!1,private:!1,access:{has:e=>`video`in e,get:e=>e.video,set:(e,t)=>{e.video=t}},metadata:N},A,re),Bi(this,null,ie,{kind:`accessor`,name:`provider`,static:!1,private:!1,access:{has:e=>`provider`in e,get:e=>e.provider,set:(e,t)=>{e.provider=t}},metadata:N},j,ae),Bi(this,null,M,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:N},oe,se),Bi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:N},null,n),ce=r=t.value,N&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:N})}static styles=I`
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
	`;#e=Vi(this,o,void 0);get color(){return this.#e}set color(e){this.#e=e}#t=(Vi(this,s),Vi(this,l,void 0));get authorName(){return this.#t}set authorName(e){this.#t=e}#n=(Vi(this,u),Vi(this,f,void 0));get authorImage(){return this.#n}set authorImage(e){this.#n=e}#r=(Vi(this,p),Vi(this,h,void 0));get authorUrl(){return this.#r}set authorUrl(e){this.#r=e}#i=(Vi(this,g),Vi(this,v,void 0));get embedTitle(){return this.#i}set embedTitle(e){this.#i=e}#a=(Vi(this,y),Vi(this,x,{}));get embedEmojisMap(){return this.#a}set embedEmojisMap(e){this.#a=e}#o=(Vi(this,S),Vi(this,w,void 0));get url(){return this.#o}set url(e){this.#o=e}#s=(Vi(this,T),Vi(this,D,void 0));get thumbnail(){return this.#s}set thumbnail(e){this.#s=e}#c=(Vi(this,O),Vi(this,k,void 0));get image(){return this.#c}set image(e){this.#c=e}#l=(Vi(this,te),Vi(this,A,void 0));get video(){return this.#l}set video(e){this.#l=e}#u=(Vi(this,re),Vi(this,j,void 0));get provider(){return this.#u}set provider(e){this.#u=e}#d=(Vi(this,ae),Vi(this,oe,!1));get lightTheme(){return this.#d}set lightTheme(e){this.#d=e}render(){let e=this.parseTitle(this.authorName),t=this.parseTitle(this.embedTitle);return L`<div style=${qr({"background-color":this.color})} class="discord-left-border"></div>
			<div class="discord-embed-root">
				<div class="discord-embed-wrapper">
					<div class="discord-embed-grid">
						${G(this.provider,()=>L`<div class="discord-embed-provider">${this.provider}</div>`)}
						${G(e,()=>L`<div class="discord-embed-author">
									${G(this.authorImage,()=>L`<img src=${W(this.authorImage)} alt="" class="discord-author-image" />`)}
									${G(this.authorUrl,()=>L`<a
												href=${W(this.authorUrl)}
												target="_blank"
												rel="noopener noreferrer"
												class="discord-embed-author-block"
											>
												<span class="discord-embed-author-block">${e}</span>
											</a>`,()=>L`<span class="discord-embed-author-block">${e}</span>`)}
								</div>`)}
						${G(t,()=>L`<div class="discord-embed-title">
									${this.url?L`<a href="${this.url}" target="_blank" rel="noopener noreferrer"> ${t} </a>`:L`${t}`}
								</div>`)}
						<slot name="description"></slot>
						<slot name="fields"></slot>
						${G(this.image||this.video,()=>L`<div class=${U({"discord-embed-media":!0,"discord-embed-media-video":!!this.video})}>
									${this.renderMedia()}
								</div>`)}
						${G(this.thumbnail,()=>L`<img src=${W(this.thumbnail)} alt="" class="discord-embed-thumbnail" />`)}
						<slot name="footer"></slot>
					</div>
				</div>
			</div>`}renderMedia(){return this.video?L`
				<video
					controls
					muted
					preload="none"
					poster=${W(this.image)}
					src=${W(this.video)}
					height="225"
					width="400"
					class="discord-embed-video"
				>
					<img src=${W(this.image)} alt="Discord embed media" class="discord-embed-image" />
				</video>
			`:this.image?L`<img src=${W(this.image)} alt="Discord embed media" class="discord-embed-image" />`:null}parseTitle(e){if(!e)return null;let t=[],n=``;for(let r of e.split(`
`)){for(let e of r.split(` `)){let r=ii(e)??this.embedEmojisMap[e]??{};r.name?t.push(L`<discord-custom-emoji name=${r.name} url=${W(r.url)} embed-emoji></discord-custom-emoji>`):n+=`${e} `,n===` `&&t.push(L`<br />`)}t.push(n),n=``}return t.map(e=>typeof e==`string`?L`<span>${e}</span>`:e)}constructor(){super(...arguments),Vi(this,se)}static{Vi(r,n)}};return r})(),Ui=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Wi=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Gi=(()=>{let e=[B(`discord-embed-description`)],t,n=[],r,i=z;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Ui(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=I`
		:host {
			font-size: 0.875rem;
			font-weight: 400;
			grid-column: 1/1;
			line-height: 1.125rem;
			margin-top: 8px;
			min-width: 0;
		}
	`;render(){return L`<slot></slot>`}static{Wi(r,n)}};return r})(),Ki=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},qi=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ji=(()=>{let e=[B(`discord-embed-field`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({reflect:!0,attribute:`field-title`})],c=[V({attribute:!1})],d=[V({type:Boolean,reflect:!0,attribute:`inline`})],m=[V({type:Number,reflect:!0,attribute:`inline-index`})],_=[H({context:q,subscribe:!0}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],Ki(this,null,a,{kind:`accessor`,name:`fieldTitle`,static:!1,private:!1,access:{has:e=>`fieldTitle`in e,get:e=>e.fieldTitle,set:(e,t)=>{e.fieldTitle=t}},metadata:x},o,s),Ki(this,null,c,{kind:`accessor`,name:`embedFieldEmojisMap`,static:!1,private:!1,access:{has:e=>`embedFieldEmojisMap`in e,get:e=>e.embedFieldEmojisMap,set:(e,t)=>{e.embedFieldEmojisMap=t}},metadata:x},l,u),Ki(this,null,d,{kind:`accessor`,name:`inline`,static:!1,private:!1,access:{has:e=>`inline`in e,get:e=>e.inline,set:(e,t)=>{e.inline=t}},metadata:x},f,p),Ki(this,null,m,{kind:`accessor`,name:`inlineIndex`,static:!1,private:!1,access:{has:e=>`inlineIndex`in e,get:e=>e.inlineIndex,set:(e,t)=>{e.inlineIndex=t}},metadata:x},h,g),Ki(this,null,_,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:x},v,y),Ki(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=I`
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
	`;#e=qi(this,o,void 0);get fieldTitle(){return this.#e}set fieldTitle(e){this.#e=e}#t=(qi(this,s),qi(this,l,{}));get embedFieldEmojisMap(){return this.#t}set embedFieldEmojisMap(e){this.#t=e}#n=(qi(this,u),qi(this,f,!1));get inline(){return this.#n}set inline(e){this.#n=e}#r=(qi(this,p),qi(this,h,void 0));get inlineIndex(){return this.#r}set inlineIndex(e){this.#r=e}#i=(qi(this,g),qi(this,v,!1));get lightTheme(){return this.#i}set lightTheme(e){this.#i=e}validInlineIndices=(qi(this,y),new Set([1,2,3]));checkInlineIndex(){if(this.inlineIndex){let e=Number(this.inlineIndex);if(!Number.isNaN(e)&&!this.validInlineIndices.has(e))throw RangeError("DiscordEmbedField `inlineIndex` prop must be one of: 1, 2, or 3")}}render(){this.checkInlineIndex();let e=this.parseTitle(this.fieldTitle);return L`${G(e,()=>L`<div class="discord-field-title">${[...e]}</div>`)}<slot></slot>`}parseTitle(e){if(!e)return null;let t=[],n=``;for(let r of e.split(`
`)){for(let e of r.split(` `)){let r=ii(e)??this.embedFieldEmojisMap[e]??{};r.name?t.push(L`<discord-custom-emoji name=${r.name} url=${W(r.url)} embed-emoji></discord-custom-emoji>`):n+=`${e} `,n===` `&&t.push(L`<br />`)}t.push(n),n=``}return t.map(e=>typeof e==`string`?L`<span>${e}</span>`:e)}static{qi(r,n)}};return r})(),Yi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Xi=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Zi=(()=>{let e=[B(`discord-embed-fields`)],t,n=[],r,i=z;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Yi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=I`
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
	`;render(){return L`<slot></slot>`}static{Xi(r,n)}};return r})(),Qi=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},$i=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},ea=(()=>{let e=[B(`discord-embed-footer`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[];var _=class extends i{static{r=this}static{let v=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({attribute:`footer-image`})],c=[V({attribute:`footer-image-alt`})],d=[V({type:String,reflect:!0,converter:e=>ei(e),attribute:!0})],m=[H({context:q,subscribe:!0}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],Qi(this,null,a,{kind:`accessor`,name:`footerImage`,static:!1,private:!1,access:{has:e=>`footerImage`in e,get:e=>e.footerImage,set:(e,t)=>{e.footerImage=t}},metadata:v},o,s),Qi(this,null,c,{kind:`accessor`,name:`footerImageAlt`,static:!1,private:!1,access:{has:e=>`footerImageAlt`in e,get:e=>e.footerImageAlt,set:(e,t)=>{e.footerImageAlt=t}},metadata:v},l,u),Qi(this,null,d,{kind:`accessor`,name:`timestamp`,static:!1,private:!1,access:{has:e=>`timestamp`in e,get:e=>e.timestamp,set:(e,t)=>{e.timestamp=t}},metadata:v},f,p),Qi(this,null,m,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:v},h,g),Qi(null,t={value:r},e,{kind:`class`,name:r.name,metadata:v},null,n),_=r=t.value,v&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:v})}static styles=I`
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
	`;#e=$i(this,o,void 0);get footerImage(){return this.#e}set footerImage(e){this.#e=e}#t=($i(this,s),$i(this,l,void 0));get footerImageAlt(){return this.#t}set footerImageAlt(e){this.#t=e}#n=($i(this,u),$i(this,f,void 0));get timestamp(){return this.#n}set timestamp(e){this.#n=e}#r=($i(this,p),$i(this,h,!1));get lightTheme(){return this.#r}set lightTheme(e){this.#r=e}updateTimestamp(e){e&&!Number.isNaN(new Date(e).getTime())&&(this.timestamp=ei(e))}render(){return this.updateTimestamp(this.timestamp),L`${G(this.footerImage,()=>L`<img src=${W(this.footerImage)} alt=${W(this.footerImageAlt)} class="discord-footer-image" />`)}
			<slot></slot>
			${G(this.timestamp,()=>L`<span class="discord-footer-separator">&bull;</span>`)}
			${G(this.timestamp,()=>` ${this.timestamp}`,()=>null)}`}constructor(){super(...arguments),$i(this,g)}static{$i(r,n)}};return r})(),ta=R`
	<path
	fill="#939bf9"
	d="m72 29.3v60.3c0 2.24 0 3.36-.44 4.22-.38.74-1 1.36-1.74 1.74-.86.44-1.98.44-4.22.44h-59.2c-2.24 0-3.36 0-4.22-.44-.74-.38-1.36-1-1.74-1.74-.44-.86-.44-1.98-.44-4.22v-83.2c0-2.24 0-3.36.44-4.22.38-.74 1-1.36 1.74-1.74.86-.44 1.98-.44 4.22-.44h36.3c1.96 0 2.94 0 3.86.22.5.12.98.28 1.44.5v16.88c0 2.24 0 3.36.44 4.22.38.74 1 1.36 1.74 1.74.86.44 1.98.44 4.22.44h16.88c.22.46.38.94.5 1.44.22.92.22 1.9.22 3.86z" fill="#d3d6fd"/><path d="m68.26 20.26c1.38 1.38 2.06 2.06 2.56 2.88.18.28.32.56.46.86h-16.88c-2.24 0-3.36 0-4.22-.44-.74-.38-1.36-1-1.74-1.74-.44-.86-.44-1.98-.44-4.22v-16.880029c.3.14.58.28.86.459999.82.5 1.5 1.18 2.88 2.56z" />
`;function na(e={}){return L`<svg ${K(e)} aria-hidden="false" fill="none" width="72" height="96" viewBox="0 0 72 96">${ta}</svg>`}var ra=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ia=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},aa=(()=>{let e=[B(`discord-file-attachment`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,D=[],O=[];var ee=class extends i{static{r=this}static{let k=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V({type:Number})],d=[V({attribute:`bytes-unit`})],m=[V()],_=[V()],b=[V()],C=[V()],E=[H({context:q,subscribe:!0}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],ra(this,null,a,{kind:`accessor`,name:`name`,static:!1,private:!1,access:{has:e=>`name`in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:k},o,s),ra(this,null,c,{kind:`accessor`,name:`bytes`,static:!1,private:!1,access:{has:e=>`bytes`in e,get:e=>e.bytes,set:(e,t)=>{e.bytes=t}},metadata:k},l,u),ra(this,null,d,{kind:`accessor`,name:`bytesUnit`,static:!1,private:!1,access:{has:e=>`bytesUnit`in e,get:e=>e.bytesUnit,set:(e,t)=>{e.bytesUnit=t}},metadata:k},f,p),ra(this,null,m,{kind:`accessor`,name:`href`,static:!1,private:!1,access:{has:e=>`href`in e,get:e=>e.href,set:(e,t)=>{e.href=t}},metadata:k},h,g),ra(this,null,_,{kind:`accessor`,name:`rel`,static:!1,private:!1,access:{has:e=>`rel`in e,get:e=>e.rel,set:(e,t)=>{e.rel=t}},metadata:k},v,y),ra(this,null,b,{kind:`accessor`,name:`target`,static:!1,private:!1,access:{has:e=>`target`in e,get:e=>e.target,set:(e,t)=>{e.target=t}},metadata:k},x,S),ra(this,null,C,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:k},w,T),ra(this,null,E,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:k},D,O),ra(null,t={value:r},e,{kind:`class`,name:r.name,metadata:k},null,n),ee=r=t.value,k&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:k})}static styles=I`
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
	`;#e=ia(this,o,void 0);get name(){return this.#e}set name(e){this.#e=e}#t=(ia(this,s),ia(this,l,void 0));get bytes(){return this.#t}set bytes(e){this.#t=e}#n=(ia(this,u),ia(this,f,void 0));get bytesUnit(){return this.#n}set bytesUnit(e){this.#n=e}#r=(ia(this,p),ia(this,h,void 0));get href(){return this.#r}set href(e){this.#r=e}#i=(ia(this,g),ia(this,v,void 0));get rel(){return this.#i}set rel(e){this.#i=e}#a=(ia(this,y),ia(this,x,void 0));get target(){return this.#a}set target(e){this.#a=e}#o=(ia(this,S),ia(this,w,void 0));get type(){return this.#o}set type(e){this.#o=e}#s=(ia(this,T),ia(this,D,!1));get lightTheme(){return this.#s}set lightTheme(e){this.#s=e}render(){return L`<div class="discord-file-attachment-non-visual-media-item-container">
			<div class="discord-file-attachment-non-visual-media-item">
				<div class="discord-file-attachment-mosaic-item-media">
					<div class=${U({"discord-file-attachment-mosaic-style":!0,"discord-file-attachment-light-theme":this.lightTheme})}>
						${na({class:`discord-file-attachment-icon`,alt:`Attachment file type: unknown`,title:`unknown`})}
						<div class="discord-file-attachment-inner">
							<div class="discord-file-attachment-filename-link-wrapper">
								<discord-link
									href=${W(this.href)}
									rel=${W(this.rel)}
									target=${W(this.target)}
									type=${W(this.type)}
								>
									${this.name}
								</discord-link>
							</div>
							<div class="discord-file-attachment-metadata">
								${this.bytes}${G(this.bytesUnit,()=>L` ${this.bytesUnit}`,()=>null)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="discord-button-download-attachment">
				<a
					class="discord-link-download-attachment"
					aria-label="Download"
					href="${W(this.href)}"
					rel="noreferrer noopener"
					target="_blank"
					role="button"
					tabindex="0"
				>
					${wr()}
				</a>
			</div>
		</div>`}constructor(){super(...arguments),ia(this,O)}static{ia(r,n)}};return r})(),oa=(e,t,n)=>{for(let n of t)if(n[0]===e)return(0,n[1])();return n?.()},sa=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ca=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},la=(()=>{let e=[B(`discord-header`)],t,n=[],r,i=z,a,o=[],s=[];var c=class extends i{static{r=this}static{let l=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({type:Number,reflect:!0})],sa(this,null,a,{kind:`accessor`,name:`level`,static:!1,private:!1,access:{has:e=>`level`in e,get:e=>e.level,set:(e,t)=>{e.level=t}},metadata:l},o,s),sa(null,t={value:r},e,{kind:`class`,name:r.name,metadata:l},null,n),c=r=t.value,l&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:l})}static styles=I`
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
	`;#e=ca(this,o,1);get level(){return this.#e}set level(e){this.#e=e}ensureLevelIsNumber(){this.level&&!Number.isNaN(this.level)&&(this.level=Number(this.level))}checkLevel(){if(this.level<1||this.level>3)throw RangeError(`The level property must be a number between 1 and 3 (inclusive)`)}render(){return this.ensureLevelIsNumber(),this.checkLevel(),oa(this.level,[[1,()=>L`<h1><slot></slot></h1>`],[2,()=>L`<h2><slot></slot></h2>`],[3,()=>L`<h3><slot></slot></h3>`]],()=>L`<slot></slot>`)}constructor(){super(...arguments),ca(this,s)}static{ca(r,n)}};return r})(),ua=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},da=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},fa=(()=>{let e=[B(`discord-image-attachment`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({reflect:!0,attribute:`url`})],c=[V({type:Number,reflect:!0,attribute:`height`})],d=[V({type:Number,reflect:!0,attribute:`width`})],m=[V({reflect:!0,attribute:`alt`})],_=[V({type:Boolean,attribute:`custom-image-element`})],ua(this,null,a,{kind:`accessor`,name:`url`,static:!1,private:!1,access:{has:e=>`url`in e,get:e=>e.url,set:(e,t)=>{e.url=t}},metadata:x},o,s),ua(this,null,c,{kind:`accessor`,name:`height`,static:!1,private:!1,access:{has:e=>`height`in e,get:e=>e.height,set:(e,t)=>{e.height=t}},metadata:x},l,u),ua(this,null,d,{kind:`accessor`,name:`width`,static:!1,private:!1,access:{has:e=>`width`in e,get:e=>e.width,set:(e,t)=>{e.width=t}},metadata:x},f,p),ua(this,null,m,{kind:`accessor`,name:`alt`,static:!1,private:!1,access:{has:e=>`alt`in e,get:e=>e.alt,set:(e,t)=>{e.alt=t}},metadata:x},h,g),ua(this,null,_,{kind:`accessor`,name:`customImageElement`,static:!1,private:!1,access:{has:e=>`customImageElement`in e,get:e=>e.customImageElement,set:(e,t)=>{e.customImageElement=t}},metadata:x},v,y),ua(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=I`
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
	`;#e=da(this,o,void 0);get url(){return this.#e}set url(e){this.#e=e}#t=(da(this,s),da(this,l,void 0));get height(){return this.#t}set height(e){this.#t=e}#n=(da(this,u),da(this,f,void 0));get width(){return this.#n}set width(e){this.#n=e}#r=(da(this,p),da(this,h,`discord image attachment`));get alt(){return this.#r}set alt(e){this.#r=e}#i=(da(this,g),da(this,v,!1));get customImageElement(){return this.#i}set customImageElement(e){this.#i=e}componentWillRender(){this.customImageElement||ni(this.url)}render(){return L`
			<div class="discord-image-attachment">
				<div class="discord-image-wrapper" style="${qr({height:`${this.height}px`,width:`${this.width}px`})}">
					${G(this.customImageElement,()=>L`<slot></slot>`,()=>L`<img
								alt=${W(this.alt)}
								src=${W(this.url)}
								height=${W(this.height)}
								width=${W(this.width)}
							/>`)}
				</div>
			</div>
		`}constructor(){super(...arguments),da(this,y)}static{da(r,n)}};return r})(),pa=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ma=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},ha=(()=>{let e=[B(`discord-input-text`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,D=[],O=[],ee,k=[],te=[],ne,A=[],re=[],ie,j=[],ae=[],M,oe=[],se=[];var ce=class extends i{static{r=this}static{let N=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({reflect:!0,attribute:`type`,type:String})],c=[V({reflect:!0,attribute:`required`,type:Boolean})],d=[V({reflect:!0,attribute:`label`,type:String})],m=[V({reflect:!0,attribute:`placeholder`,type:String})],_=[V({reflect:!0,attribute:`min-length`,type:Number})],b=[V({reflect:!0,attribute:`max-length`,type:Number})],C=[H({context:q,subscribe:!0}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],E=[V({type:String,reflect:!0,attribute:`default-value`})],ee=[Ct()],ne=[Ct()],ie=[Ct()],M=[Ct()],pa(this,null,a,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:N},o,s),pa(this,null,c,{kind:`accessor`,name:`required`,static:!1,private:!1,access:{has:e=>`required`in e,get:e=>e.required,set:(e,t)=>{e.required=t}},metadata:N},l,u),pa(this,null,d,{kind:`accessor`,name:`label`,static:!1,private:!1,access:{has:e=>`label`in e,get:e=>e.label,set:(e,t)=>{e.label=t}},metadata:N},f,p),pa(this,null,m,{kind:`accessor`,name:`placeholder`,static:!1,private:!1,access:{has:e=>`placeholder`in e,get:e=>e.placeholder,set:(e,t)=>{e.placeholder=t}},metadata:N},h,g),pa(this,null,_,{kind:`accessor`,name:`minLength`,static:!1,private:!1,access:{has:e=>`minLength`in e,get:e=>e.minLength,set:(e,t)=>{e.minLength=t}},metadata:N},v,y),pa(this,null,b,{kind:`accessor`,name:`maxLength`,static:!1,private:!1,access:{has:e=>`maxLength`in e,get:e=>e.maxLength,set:(e,t)=>{e.maxLength=t}},metadata:N},x,S),pa(this,null,C,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:N},w,T),pa(this,null,E,{kind:`accessor`,name:`defaultValue`,static:!1,private:!1,access:{has:e=>`defaultValue`in e,get:e=>e.defaultValue,set:(e,t)=>{e.defaultValue=t}},metadata:N},D,O),pa(this,null,ee,{kind:`accessor`,name:`value`,static:!1,private:!1,access:{has:e=>`value`in e,get:e=>e.value,set:(e,t)=>{e.value=t}},metadata:N},k,te),pa(this,null,ne,{kind:`accessor`,name:`hasWarning`,static:!1,private:!1,access:{has:e=>`hasWarning`in e,get:e=>e.hasWarning,set:(e,t)=>{e.hasWarning=t}},metadata:N},A,re),pa(this,null,ie,{kind:`accessor`,name:`calculatedMaxLength`,static:!1,private:!1,access:{has:e=>`calculatedMaxLength`in e,get:e=>e.calculatedMaxLength,set:(e,t)=>{e.calculatedMaxLength=t}},metadata:N},j,ae),pa(this,null,M,{kind:`accessor`,name:`calculatedCharactersCount`,static:!1,private:!1,access:{has:e=>`calculatedCharactersCount`in e,get:e=>e.calculatedCharactersCount,set:(e,t)=>{e.calculatedCharactersCount=t}},metadata:N},oe,se),pa(null,t={value:r},e,{kind:`class`,name:r.name,metadata:N},null,n),ce=r=t.value,N&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:N})}static styles=I`
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
	`;#e=ma(this,o,`paragraph`);get type(){return this.#e}set type(e){this.#e=e}#t=(ma(this,s),ma(this,l,!1));get required(){return this.#t}set required(e){this.#t=e}#n=(ma(this,u),ma(this,f,void 0));get label(){return this.#n}set label(e){this.#n=e}#r=(ma(this,p),ma(this,h,void 0));get placeholder(){return this.#r}set placeholder(e){this.#r=e}#i=(ma(this,g),ma(this,v,0));get minLength(){return this.#i}set minLength(e){this.#i=e}#a=(ma(this,y),ma(this,x,4e3));get maxLength(){return this.#a}set maxLength(e){this.#a=e}#o=(ma(this,S),ma(this,w,!1));get lightTheme(){return this.#o}set lightTheme(e){this.#o=e}#s=(ma(this,T),ma(this,D,``));get defaultValue(){return this.#s}set defaultValue(e){this.#s=e}#c=(ma(this,O),ma(this,k,``));get value(){return this.#c}set value(e){this.#c=e}#l=(ma(this,te),ma(this,A,!1));get hasWarning(){return this.#l}set hasWarning(e){this.#l=e}#u=(ma(this,re),ma(this,j,null));get calculatedMaxLength(){return this.#u}set calculatedMaxLength(e){this.#u=e}#d=(ma(this,ae),ma(this,oe,0));get calculatedCharactersCount(){return this.#d}set calculatedCharactersCount(e){this.#d=e}connectedCallback(){super.connectedCallback(),this.defaultValue&&(this.value=this.defaultValue,this.calculatedCharactersCount=this.value.length)}resetState(){this.hasWarning=!1,this.calculatedMaxLength=null,this.calculatedCharactersCount=0,this.value=this.defaultValue?this.defaultValue:``}render(){return this.checkNeededArgument(),this.checkType(),L`
			<div class="discord-input-text">
				<div class=${U({"discord-text-input-warning-length":this.hasWarning})}>
					<h2 class="discord-label-input-text">
						${this.label.slice(0,45)}${G(this.required&&!this.hasWarning,()=>L`<span class="discord-text-input-required">*</span>`)}
					</h2>
					${G(this.hasWarning,()=>L`<span class="discord-text-input-warning-length discord-text-input-warning-error-text">
								- Must be between ${this.minLength} and ${this.maxLength} in length.</span
							>`)}
				</div>
				<div class="discord-text-input-container">
					${G(this.type===`paragraph`,()=>L`
							<div class="discord-text-input-container">
								<textarea
									@input=${e=>this.handleInputChange(e)}
									.required=${this.required}
									.value=${this.value}
									class="discord-text-input-paragraph"
									type="text"
									minlength="${this.minLength}"
									maxlength="${this.maxLength}"
									placeholder="${W(this.placeholder)}"
									rows="3"
								></textarea>
								<div class="discord-text-input-textarea-max-length">
									<span
										>${G(this.valueIsNotNullOrUndefined(this.calculatedMaxLength),()=>this.calculatedMaxLength,()=>G(this.value,()=>this.maxLength-this.value.length,()=>this.maxLength))}</span
									>
								</div>
							</div>
						`)}
					${G(this.type===`short`,()=>L`<input
								@input=${e=>this.handleInputChange(e)}
								.required=${this.required}
								.value=${this.value}
								class="discord-text-input-short"
								type="text"
								minlength="${this.minLength}"
								maxlength="${this.maxLength}"
								placeholder="${W(this.placeholder)}"
								rows="3"
							/>`)}
				</div>
				${G(this.required,()=>L`
						<div class="discord-text-input-message-needed-input">
							<div class="icon">
								<div class="exclamation">!</div>
							</div>
							<span>Please fill out this field.</span>
						</div>
					`)}
				${G(this.valueIsNotNullOrUndefined(this.minLength),()=>L`
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
				<div class=${U({"discord-text-input-warning-length":this.hasWarning})}>
					<h2 class="discord-text-input-warning-length">
						${G(this.hasWarning&&this.valueIsNotNullOrUndefined(this.minLength),()=>L`<span class="discord-text-input-warning-bottom-error-text"
									>Must be ${this.minLength} characters or more in length.</span
								>`)}
					</h2>
				</div>
			</div>
		`}validInputTextTypes=(ma(this,se),new Set([`short`,`paragraph`]));checkNeededArgument(){if(!this.label)throw new Jr(`Label is required to input text`);if(!this.type)throw new Jr(`Type is required to input text`)}checkType(){if(typeof this.type!=`string`)throw TypeError("DiscordInputText `type` prop must be a string.");if(!this.validInputTextTypes.has(this.type))throw RangeError("DiscordInputText `type` prop must be one of: 'short', 'paragraph'")}valueIsNotNullOrUndefined(e){return e!=null}handleInputChange(e){let t=e?.target;if(this.value=t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement?t.value:``,t instanceof HTMLTextAreaElement||t instanceof HTMLInputElement){let e=t.value.length;this.hasWarning=e===0&&this.minLength===0&&this.valueIsNotNullOrUndefined(this.maxLength)&&this.required?!0:e<this.minLength,this.calculatedMaxLength=this.maxLength-e,this.calculatedCharactersCount=e}let n=this.shadowRoot?.querySelector(`div.discord-text-input-message-needed-input`),r=this.shadowRoot?.querySelector(`div.discord-text-input-message-needed-min-length`);t.value.length>=this.minLength&&r instanceof HTMLDivElement&&r.style.display&&(r.style.opacity=`0`,globalThis.setTimeout(()=>{r.style.display=``},1e3)),n instanceof HTMLDivElement&&n.style.display&&(n.style.opacity=`0`,globalThis.setTimeout(()=>{n.style.display=``},1e3))}static{ma(r,n)}};return r})(),ga=R`
<path
	fill="currentColor"
	fill-rule="evenodd"
	d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z"
/>
`;function _a(e){return L`<svg ${K(e)} class="discord-guild-badge" aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2">
		${ga}
	</svg>`}var va=R`
	<path
		d="M10.5906 6.39993L9.19223 7.29993C8.99246 7.39993 8.89258 7.39993 8.69281 7.29993C8.59293 7.19993 8.39317 7.09993 8.29328 6.99993C7.89375 6.89993 7.5941 6.99993 7.29445 7.19993L6.79504 7.49993L4.29797 9.19993C3.69867 9.49993 2.99949 9.39993 2.69984 8.79993C2.30031 8.29993 2.50008 7.59993 2.99949 7.19993L5.99598 5.19993C6.79504 4.69993 7.79387 4.49993 8.69281 4.69993C9.49188 4.89993 10.0912 5.29993 10.5906 5.89993C10.7904 6.09993 10.6905 6.29993 10.5906 6.39993Z"
		fill="currentColor"
	/>
	<path
		d="M13.4871 7.79985C13.4871 8.19985 13.2874 8.59985 12.9877 8.79985L9.89135 10.7999C9.29206 11.1999 8.69276 11.3999 7.99358 11.3999C7.69393 11.3999 7.49417 11.3999 7.19452 11.2999C6.39545 11.0999 5.79616 10.6999 5.29674 10.0999C5.19686 9.89985 5.29674 9.69985 5.39663 9.59985L6.79499 8.69985C6.89487 8.59985 7.09463 8.59985 7.19452 8.69985C7.39428 8.79985 7.59405 8.89985 7.69393 8.99985C8.09346 8.99985 8.39311 8.99985 8.69276 8.79985L9.39194 8.39985L11.3896 6.99985L11.6892 6.79985C12.1887 6.49985 12.9877 6.59985 13.2874 7.09985C13.4871 7.39985 13.4871 7.59985 13.4871 7.79985Z"
		fill="currentColor"
	/>
`;function ya(e={}){return L`<svg ${K(e)} class="partner-badge-overlay" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16">
		${va}
	</svg>`}var ba=R`
	<path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor" />
`;function xa(e={}){return L`<svg ${K(e)} class="verified-badge-overlay" aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2">
		${ba}
	</svg>`}var Sa=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Ca=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},wa=(()=>{let e=[B(`discord-invite`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,D=[],O=[],ee,k=[],te=[],ne,A=[],re=[];var ie=class extends i{static{r=this}static{let j=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V()],d=[V()],m=[V({type:Number})],_=[V({type:Number})],b=[V({type:Boolean})],C=[V({type:Boolean})],E=[V({attribute:`invite-title`})],ee=[V({attribute:`join-btn`})],ne=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],Sa(this,null,a,{kind:`accessor`,name:`icon`,static:!1,private:!1,access:{has:e=>`icon`in e,get:e=>e.icon,set:(e,t)=>{e.icon=t}},metadata:j},o,s),Sa(this,null,c,{kind:`accessor`,name:`name`,static:!1,private:!1,access:{has:e=>`name`in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:j},l,u),Sa(this,null,d,{kind:`accessor`,name:`url`,static:!1,private:!1,access:{has:e=>`url`in e,get:e=>e.url,set:(e,t)=>{e.url=t}},metadata:j},f,p),Sa(this,null,m,{kind:`accessor`,name:`online`,static:!1,private:!1,access:{has:e=>`online`in e,get:e=>e.online,set:(e,t)=>{e.online=t}},metadata:j},h,g),Sa(this,null,_,{kind:`accessor`,name:`members`,static:!1,private:!1,access:{has:e=>`members`in e,get:e=>e.members,set:(e,t)=>{e.members=t}},metadata:j},v,y),Sa(this,null,b,{kind:`accessor`,name:`verified`,static:!1,private:!1,access:{has:e=>`verified`in e,get:e=>e.verified,set:(e,t)=>{e.verified=t}},metadata:j},x,S),Sa(this,null,C,{kind:`accessor`,name:`partnered`,static:!1,private:!1,access:{has:e=>`partnered`in e,get:e=>e.partnered,set:(e,t)=>{e.partnered=t}},metadata:j},w,T),Sa(this,null,E,{kind:`accessor`,name:`inviteTitle`,static:!1,private:!1,access:{has:e=>`inviteTitle`in e,get:e=>e.inviteTitle,set:(e,t)=>{e.inviteTitle=t}},metadata:j},D,O),Sa(this,null,ee,{kind:`accessor`,name:`joinBtn`,static:!1,private:!1,access:{has:e=>`joinBtn`in e,get:e=>e.joinBtn,set:(e,t)=>{e.joinBtn=t}},metadata:j},k,te),Sa(this,null,ne,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:j},A,re),Sa(null,t={value:r},e,{kind:`class`,name:r.name,metadata:j},null,n),ie=r=t.value,j&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:j})}static styles=I`
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
	`;#e=Ca(this,o,Zn.blue);get icon(){return this.#e}set icon(e){this.#e=e}#t=(Ca(this,s),Ca(this,l,`Discord Server`));get name(){return this.#t}set name(e){this.#t=e}#n=(Ca(this,u),Ca(this,f,void 0));get url(){return this.#n}set url(e){this.#n=e}#r=(Ca(this,p),Ca(this,h,0));get online(){return this.#r}set online(e){this.#r=e}#i=(Ca(this,g),Ca(this,v,0));get members(){return this.#i}set members(e){this.#i=e}#a=(Ca(this,y),Ca(this,x,!1));get verified(){return this.#a}set verified(e){this.#a=e}#o=(Ca(this,S),Ca(this,w,!1));get partnered(){return this.#o}set partnered(e){this.#o=e}#s=(Ca(this,T),Ca(this,D,`You've been invited to join a server`));get inviteTitle(){return this.#s}set inviteTitle(e){this.#s=e}#c=(Ca(this,O),Ca(this,k,`Join`));get joinBtn(){return this.#c}set joinBtn(e){this.#c=e}#l=(Ca(this,te),Ca(this,A,!1));get lightTheme(){return this.#l}set lightTheme(e){this.#l=e}render(){return L`<div class="discord-invite-header">${this.inviteTitle}</div>
			<div class="discord-invite-root">
				<div class="discord-invite-info">
					<img class="discord-invite-icon" src=${W(this.icon)} alt=${W(this.name)} />
					<div class="discord-invite-info-text-ellipsis">
						<div class="discord-invite-title">
							${G(this.verified&&!this.partnered||!this.verified&&this.partnered,()=>L`<div class="discord-invite-badge">
										${_a({"aria-label":this.partnered?`Discord Partner`:`Verified`,class:`discord-invite-badge-${this.partnered?`partnered`:`verified`}`})}
										<div class="discord-invite-badge-container">
											${this.partnered?ya():xa()}
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
				<a class="discord-invite-join" href=${W(this.url)} target="_blank" rel="noopener noreferrer">${this.joinBtn}</a>
			</div>`}constructor(){super(...arguments),Ca(this,re)}static{Ca(r,n)}};return r})(),Ta=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Ea=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Da=(()=>{let e=[B(`discord-italic`)],t,n=[],r,i=z;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Ta(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=I`
		:host > em {
			font-style: italic;
		}
	`;render(){return L`
			<em>
				<slot></slot>
			</em>
		`}static{Ea(r,n)}};return r})(),Oa=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ka=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Aa=(()=>{let e=[B(`discord-list-item`)],t,n=[],r,i=z;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Oa(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=I`
		:host > li {
			margin-bottom: 4px;
		}
	`;checkParentElement(){if(this.parentElement?.tagName.toLowerCase()!==`discord-unordered-list`&&this.parentElement?.tagName.toLowerCase()!==`discord-ordered-list`)throw new Jr(`All <discord-list-item> components must be direct children of <discord-unordered-list> or <discord-ordered-list>.`)}render(){return this.checkParentElement(),L`<li><slot></slot></li>`}static{ka(r,n)}};return r})();function ja(e){return e.startsWith(`#`)?e.slice(1):e}function Ma(e){let t=e.length===3||e.length===4;return{r:t?`${e.slice(0,1)}${e.slice(0,1)}`:e.slice(0,2),g:t?`${e.slice(1,2)}${e.slice(1,2)}`:e.slice(2,4),b:t?`${e.slice(2,3)}${e.slice(2,3)}`:e.slice(4,6),a:(t?`${e.slice(3,4)}${e.slice(3,4)}`:e.slice(6,8))||`ff`}}function Na(e){return Number.parseInt(e,16)}function Pa({r:e,g:t,b:n,a:r}){return{r:Na(e),g:Na(t),b:Na(n),a:Number((Na(r)/255).toFixed(2))}}function Fa(e){return typeof e==`number`||typeof e==`string`&&Number.isFinite(Number(e))}function Ia(e,t){let{r:n,g:r,b:i,a}=e;return`rgba(${n}, ${r}, ${i}, ${Fa(t)?t:a})`}function La(e,t){return Ia(Pa(Ma(ja(e))),t)}var Ra=R`
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
`;function za(e={}){return L`<svg
		${K(e)}
		class="discord-mention-icon"
		aria-label="Browse Channels"
		aria-hidden="false"
		role="img"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Ra}
	</svg>`}var Ba=R`
	<path
		fill="currentColor"
		d="M21.487 5.126L12.487 0.126C12.184 -0.042 11.818 -0.042 11.515 0.126L2.51498 5.126C2.19798 5.302 2.00098 5.636 2.00098 5.999C2.00098 6.693 2.11498 22.999 12.001 22.999C21.887 22.999 22.001 6.693 22.001 5.999C22.001 5.636 21.804 5.302 21.487 5.126ZM12.001 5.999C13.382 5.999 14.501 7.118 14.501 8.499C14.501 9.88 13.382 10.999 12.001 10.999C10.62 10.999 9.50098 9.88 9.50098 8.499C9.50098 7.118 10.62 5.999 12.001 5.999ZM8.25098 16C8.25098 13.699 9.69998 12.25 12.001 12.25C14.302 12.25 15.751 13.699 15.751 16H8.25098Z"
	/>
`;function Va(e={}){return L`<svg
		${K(e)}
		class="discord-mention-icon"
		aria-label="Customise Community"
		aria-hidden="false"
		role="img"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Ba}
	</svg>`}var Ha=R`
	<path
		d="M11 3a1 1 0 1 1 2 0v2h5.75c.16 0 .3.07.4.2l2.63 3.5a.5.5 0 0 1 0 .6l-2.63 3.5a.5.5 0 0 1-.4.2H13v5h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1c0-1.1.9-2 2-2h2v-5H2.8a.5.5 0 0 1-.44-.72L3.9 9.22a.5.5 0 0 0 0-.44L2.36 5.72A.5.5 0 0 1 2.81 5H11V3Z"
		fill="currentColor"
	/>
`;function Ua(e={}){return L`<svg
		${K(e)}
		class="discord-mention-icon"
		aria-label="Server Guide"
		aria-hidden="false"
		role="img"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Ha}
	</svg>`}var Wa=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Ga=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ka=(()=>{let e=[B(`discord-mention`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[];var _=class extends i{static{r=this}static{let v=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({type:Boolean,reflect:!0})],c=[V({reflect:!0})],d=[V({reflect:!0})],m=[H({context:q,subscribe:!0}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],Wa(this,null,a,{kind:`accessor`,name:`highlight`,static:!1,private:!1,access:{has:e=>`highlight`in e,get:e=>e.highlight,set:(e,t)=>{e.highlight=t}},metadata:v},o,s),Wa(this,null,c,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:v},l,u),Wa(this,null,d,{kind:`accessor`,name:`color`,static:!1,private:!1,access:{has:e=>`color`in e,get:e=>e.color,set:(e,t)=>{e.color=t}},metadata:v},f,p),Wa(this,null,m,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:v},h,g),Wa(null,t={value:r},e,{kind:`class`,name:r.name,metadata:v},null,n),_=r=t.value,v&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:v})}static styles=I`
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
	`;#e=Ga(this,o,!1);get highlight(){return this.#e}set highlight(e){this.#e=e}#t=(Ga(this,s),Ga(this,l,`user`));get type(){return this.#t}set type(e){this.#t=e}#n=(Ga(this,u),Ga(this,f,void 0));get color(){return this.#n}set color(e){this.#n=e}setHoverColor=(Ga(this,p),()=>{this.color&&(this.style.backgroundColor=La(this.color,.3))});resetHoverColor=()=>{this.color&&(this.style.backgroundColor=La(this.color,.1))};#r=Ga(this,h,!1);get lightTheme(){return this.#r}set lightTheme(e){this.#r=e}connectedCallback(){super.connectedCallback(),this.color&&this.type===`role`&&(this.addEventListener(`mouseover`,this.setHoverColor),this.addEventListener(`mouseout`,this.resetHoverColor))}disconnectedCallback(){this.removeEventListener(`mouseover`,this.setHoverColor),this.removeEventListener(`mouseout`,this.resetHoverColor),super.disconnectedCallback()}willUpdate(){this.color&&(this.style.color=this.color,this.type===`role`&&(this.style.backgroundColor=La(this.color,.1)))}render(){return L`<span class="no-wrap"
				>${oa(this.type,[[`channel`,()=>cr()],[`user`,()=>L`@`],[`role`,()=>L`@`],[`voice`,()=>mr()],[`locked`,()=>fr()],[`thread`,()=>ur()],[`forum`,()=>or()],[`server-guide`,()=>Ua()],[`channels-and-roles`,()=>za()],[`customize-community`,()=>Va()],[`slash`,()=>L`/`]])}</span
			><slot></slot>`}constructor(){super(...arguments),Ga(this,g)}static{Ga(r,n)}};return r})(),qa=R`
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
`;function Ja(e={}){return L`<svg
		${K(e)}
		class="discord-message-ephemeral-icon"
		aria-hidden="false"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${qa}
	</svg>`}var Ya=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Z=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Xa=(()=>{let e=[B(`discord-message`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,D=[],O=[],ee,k=[],te=[],ne,A=[],re=[],ie,j=[],ae=[],M,oe=[],se=[],ce,N=[],le=[],P,F=[],ue=[],de,fe=[],pe=[],me,he=[],ge=[],_e,ve=[],ye=[],be,xe=[],Se=[],Ce,we=[],Te=[],Ee,De=[],Oe=[],ke,Ae=[],je=[],Me,Ne=[],Pe=[],Fe,Ie=[],Le=[],Re,ze=[],Be=[];var Ve=class extends i{static{r=this}static{let I=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V()],d=[V()],m=[V({type:Boolean})],_=[V({type:Boolean})],b=[V({type:Boolean,attribute:`official-app`})],C=[V({type:Boolean})],E=[V({type:Boolean})],ee=[V({type:Boolean})],ne=[V({attribute:`role-color`})],ie=[V({attribute:`role-icon`})],M=[V({attribute:`role-name`})],ce=[V({attribute:`clan-icon`})],P=[V({attribute:`clan-tag`})],de=[V({type:Boolean,reflect:!0})],me=[V({type:Boolean,reflect:!0})],_e=[V({type:String,converter:e=>ei(e,!1,!1),attribute:!0})],be=[V({type:Boolean,attribute:`twenty-four`})],Ce=[V({type:Boolean,attribute:`message-body-only`})],Ee=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],ke=[H({context:_r}),V({type:Boolean,reflect:!0,attribute:`compact-mode`})],Me=[H({context:vr}),V({type:Boolean,reflect:!0,attribute:`no-background`})],Fe=[V({type:Boolean,reflect:!0,attribute:`has-thread`})],Re=[V({reflect:!1,attribute:`dismiss-message-clicked`})],Ya(this,null,a,{kind:`accessor`,name:`profile`,static:!1,private:!1,access:{has:e=>`profile`in e,get:e=>e.profile,set:(e,t)=>{e.profile=t}},metadata:I},o,s),Ya(this,null,c,{kind:`accessor`,name:`author`,static:!1,private:!1,access:{has:e=>`author`in e,get:e=>e.author,set:(e,t)=>{e.author=t}},metadata:I},l,u),Ya(this,null,d,{kind:`accessor`,name:`avatar`,static:!1,private:!1,access:{has:e=>`avatar`in e,get:e=>e.avatar,set:(e,t)=>{e.avatar=t}},metadata:I},f,p),Ya(this,null,m,{kind:`accessor`,name:`bot`,static:!1,private:!1,access:{has:e=>`bot`in e,get:e=>e.bot,set:(e,t)=>{e.bot=t}},metadata:I},h,g),Ya(this,null,_,{kind:`accessor`,name:`server`,static:!1,private:!1,access:{has:e=>`server`in e,get:e=>e.server,set:(e,t)=>{e.server=t}},metadata:I},v,y),Ya(this,null,b,{kind:`accessor`,name:`officialApp`,static:!1,private:!1,access:{has:e=>`officialApp`in e,get:e=>e.officialApp,set:(e,t)=>{e.officialApp=t}},metadata:I},x,S),Ya(this,null,C,{kind:`accessor`,name:`verified`,static:!1,private:!1,access:{has:e=>`verified`in e,get:e=>e.verified,set:(e,t)=>{e.verified=t}},metadata:I},w,T),Ya(this,null,E,{kind:`accessor`,name:`op`,static:!1,private:!1,access:{has:e=>`op`in e,get:e=>e.op,set:(e,t)=>{e.op=t}},metadata:I},D,O),Ya(this,null,ee,{kind:`accessor`,name:`edited`,static:!1,private:!1,access:{has:e=>`edited`in e,get:e=>e.edited,set:(e,t)=>{e.edited=t}},metadata:I},k,te),Ya(this,null,ne,{kind:`accessor`,name:`roleColor`,static:!1,private:!1,access:{has:e=>`roleColor`in e,get:e=>e.roleColor,set:(e,t)=>{e.roleColor=t}},metadata:I},A,re),Ya(this,null,ie,{kind:`accessor`,name:`roleIcon`,static:!1,private:!1,access:{has:e=>`roleIcon`in e,get:e=>e.roleIcon,set:(e,t)=>{e.roleIcon=t}},metadata:I},j,ae),Ya(this,null,M,{kind:`accessor`,name:`roleName`,static:!1,private:!1,access:{has:e=>`roleName`in e,get:e=>e.roleName,set:(e,t)=>{e.roleName=t}},metadata:I},oe,se),Ya(this,null,ce,{kind:`accessor`,name:`clanIcon`,static:!1,private:!1,access:{has:e=>`clanIcon`in e,get:e=>e.clanIcon,set:(e,t)=>{e.clanIcon=t}},metadata:I},N,le),Ya(this,null,P,{kind:`accessor`,name:`clanTag`,static:!1,private:!1,access:{has:e=>`clanTag`in e,get:e=>e.clanTag,set:(e,t)=>{e.clanTag=t}},metadata:I},F,ue),Ya(this,null,de,{kind:`accessor`,name:`highlight`,static:!1,private:!1,access:{has:e=>`highlight`in e,get:e=>e.highlight,set:(e,t)=>{e.highlight=t}},metadata:I},fe,pe),Ya(this,null,me,{kind:`accessor`,name:`ephemeral`,static:!1,private:!1,access:{has:e=>`ephemeral`in e,get:e=>e.ephemeral,set:(e,t)=>{e.ephemeral=t}},metadata:I},he,ge),Ya(this,null,_e,{kind:`accessor`,name:`timestamp`,static:!1,private:!1,access:{has:e=>`timestamp`in e,get:e=>e.timestamp,set:(e,t)=>{e.timestamp=t}},metadata:I},ve,ye),Ya(this,null,be,{kind:`accessor`,name:`twentyFour`,static:!1,private:!1,access:{has:e=>`twentyFour`in e,get:e=>e.twentyFour,set:(e,t)=>{e.twentyFour=t}},metadata:I},xe,Se),Ya(this,null,Ce,{kind:`accessor`,name:`messageBodyOnly`,static:!1,private:!1,access:{has:e=>`messageBodyOnly`in e,get:e=>e.messageBodyOnly,set:(e,t)=>{e.messageBodyOnly=t}},metadata:I},we,Te),Ya(this,null,Ee,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:I},De,Oe),Ya(this,null,ke,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:I},Ae,je),Ya(this,null,Me,{kind:`accessor`,name:`noBackground`,static:!1,private:!1,access:{has:e=>`noBackground`in e,get:e=>e.noBackground,set:(e,t)=>{e.noBackground=t}},metadata:I},Ne,Pe),Ya(this,null,Fe,{kind:`accessor`,name:`hasThread`,static:!1,private:!1,access:{has:e=>`hasThread`in e,get:e=>e.hasThread,set:(e,t)=>{e.hasThread=t}},metadata:I},Ie,Le),Ya(this,null,Re,{kind:`accessor`,name:`dismissMessageClicked`,static:!1,private:!1,access:{has:e=>`dismissMessageClicked`in e,get:e=>e.dismissMessageClicked,set:(e,t)=>{e.dismissMessageClicked=t}},metadata:I},ze,Be),Ya(null,t={value:r},e,{kind:`class`,name:r.name,metadata:I},null,n),Ve=r=t.value,I&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:I})}static styles=I`
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
	`;#e=Z(this,o,void 0);get profile(){return this.#e}set profile(e){this.#e=e}#t=(Z(this,s),Z(this,l,`User`));get author(){return this.#t}set author(e){this.#t=e}#n=(Z(this,u),Z(this,f,void 0));get avatar(){return this.#n}set avatar(e){this.#n=e}#r=(Z(this,p),Z(this,h,!1));get bot(){return this.#r}set bot(e){this.#r=e}#i=(Z(this,g),Z(this,v,!1));get server(){return this.#i}set server(e){this.#i=e}#a=(Z(this,y),Z(this,x,!1));get officialApp(){return this.#a}set officialApp(e){this.#a=e}#o=(Z(this,S),Z(this,w,!1));get verified(){return this.#o}set verified(e){this.#o=e}#s=(Z(this,T),Z(this,D,!1));get op(){return this.#s}set op(e){this.#s=e}#c=(Z(this,O),Z(this,k,!1));get edited(){return this.#c}set edited(e){this.#c=e}#l=(Z(this,te),Z(this,A,void 0));get roleColor(){return this.#l}set roleColor(e){this.#l=e}#u=(Z(this,re),Z(this,j,void 0));get roleIcon(){return this.#u}set roleIcon(e){this.#u=e}#d=(Z(this,ae),Z(this,oe,void 0));get roleName(){return this.#d}set roleName(e){this.#d=e}#f=(Z(this,se),Z(this,N,void 0));get clanIcon(){return this.#f}set clanIcon(e){this.#f=e}#p=(Z(this,le),Z(this,F,void 0));get clanTag(){return this.#p}set clanTag(e){this.#p=e}#m=(Z(this,ue),Z(this,fe,!1));get highlight(){return this.#m}set highlight(e){this.#m=e}#h=(Z(this,pe),Z(this,he,!1));get ephemeral(){return this.#h}set ephemeral(e){this.#h=e}#g=(Z(this,ge),Z(this,ve,new Date));get timestamp(){return this.#g}set timestamp(e){this.#g=e}#_=(Z(this,ye),Z(this,xe,!1));get twentyFour(){return this.#_}set twentyFour(e){this.#_=e}#v=(Z(this,Se),Z(this,we,!1));get messageBodyOnly(){return this.#v}set messageBodyOnly(e){this.#v=e}#y=(Z(this,Te),Z(this,De,!1));get lightTheme(){return this.#y}set lightTheme(e){this.#y=e}#b=(Z(this,Oe),Z(this,Ae,!1));get compactMode(){return this.#b}set compactMode(e){this.#b=e}#x=(Z(this,je),Z(this,Ne,!1));get noBackground(){return this.#x}set noBackground(e){this.#x=e}#S=(Z(this,Pe),Z(this,Ie,!1));get hasThread(){return this.#S}set hasThread(e){this.#S=e}#C=(Z(this,Le),Z(this,ze,()=>{}));get dismissMessageClicked(){return this.#C}set dismissMessageClicked(e){this.#C=e}willUpdate(){this.hasThread=Array.from(this.children).some(e=>e.tagName.toLowerCase()===`discord-thread`),this.highlight=this.highlight||Array.from(this.children).some(e=>e.tagName.toLowerCase()===`discord-mention`&&e.hasAttribute(`highlight`)&&(e.type===`user`||e.type===`role`))}handleSpaceToDismissMessage(e){e.code===`Space`&&(e.preventDefault(),e.stopPropagation(),this.dismissMessageClicked?.())}render(){let e={author:this.author,bot:this.bot,officialApp:this.officialApp,verified:this.verified,server:this.server,op:this.op,roleColor:this.roleColor,roleIcon:this.roleIcon,clanIcon:this.clanIcon,clanTag:this.clanTag,roleName:this.roleName},t=this.profile!==void 0&&Reflect.get(er,this.profile)||{},n={...e,...t,avatar:this.resolveAvatar(t.avatar??this.avatar)},r=ei(this.timestamp,this.compactMode,this.twentyFour)??void 0;return L`
			<slot name="reply"></slot>
			<div
				class=${U({"discord-message-inner":!0,"discord-message-inner-center":this.messageBodyOnly})}
			>
				${G(this.compactMode&&!this.messageBodyOnly,()=>L`<time datetime="${W(r)}" class="discord-message-timestamp">${r}</time>`,()=>null)}
				${G(this.messageBodyOnly,()=>L`<time
							datetime="${W(r)}"
							class=${U({"discord-message-timestamp":!0,"discord-message-timestamp-hover":!0,"discord-message-body-only-indent":!this.compactMode})}
						></time>`,()=>null)}
				${G(this.compactMode||this.messageBodyOnly,()=>null,()=>L`<div class="discord-author-avatar">
							<img src="${W(n.avatar)}" alt="${W(n.author)}" />
						</div>`)}

				<div class="discord-message-content">
					${G(this.compactMode||this.messageBodyOnly,()=>null,()=>L`
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
							><time datetime="${W(r)}" class="discord-message-timestamp">${r}</time>
						`)}
					<div class="discord-message-body">
						${G(this.compactMode,()=>L`<discord-author-info
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
						${G(this.edited,()=>L`<span class="discord-message-edited">(edited)</span>`,()=>null)}
					</div>
					<div class="discord-message-compact-indent">
						<slot name="attachments"></slot>
						<slot name="embeds"></slot>
						<slot name="components"></slot>
						<slot name="reactions"></slot>
						<slot name="thread"></slot>
						${G(this.ephemeral,()=>L`
								<div class="discord-message-ephemeral">
									${Ja()} Only you can see this •
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
		`}resolveAvatar(e){return e===void 0?$n.default:$n[e]??e??$n.default}constructor(){super(...arguments),Z(this,Be)}static{Z(r,n)}};return r})(),Za=R`
	<path fill="currentColor" d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z"></path>
`;function Qa(e={}){return L`<svg ${K(e)} aria-hidden="false" aria-label="Close" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">
		${Za}
	</svg>`}var $a=R`
	<circle cx="12" cy="12" r="10" fill="transparent"></circle>
	<path fill="color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%)" fill-rule="evenodd" d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm1.44-15.94L13.06 14a1.06 1.06 0 0 1-2.12 0l-.38-6.94a1 1 0 0 1 1-1.06h.88a1 1 0 0 1 1 1.06Zm-.19 10.69a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" clip-rule="evenodd"></path>
`;function eo(e={}){return L`<svg ${K(e)} aria-hidden="false" aria-label="Warning" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">
		${$a}
	</svg>`}var to=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},no=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},ro=(()=>{let e=[B(`discord-modal`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,D=[],O=[],ee,k=[],te=[];var ne=class extends i{static{r=this}static{let A=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V()],d=[V()],m=[V({reflect:!0,attribute:`modal-id`})],_=[V({reflect:!0,attribute:`modal-title`})],b=[V({reflect:!1,noAccessor:!0,attribute:!1})],C=[V({reflect:!1,noAccessor:!0,attribute:!1})],E=[H({context:q,subscribe:!0}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],ee=[Ct()],to(this,null,a,{kind:`accessor`,name:`profile`,static:!1,private:!1,access:{has:e=>`profile`in e,get:e=>e.profile,set:(e,t)=>{e.profile=t}},metadata:A},o,s),to(this,null,c,{kind:`accessor`,name:`author`,static:!1,private:!1,access:{has:e=>`author`in e,get:e=>e.author,set:(e,t)=>{e.author=t}},metadata:A},l,u),to(this,null,d,{kind:`accessor`,name:`avatar`,static:!1,private:!1,access:{has:e=>`avatar`in e,get:e=>e.avatar,set:(e,t)=>{e.avatar=t}},metadata:A},f,p),to(this,null,m,{kind:`accessor`,name:`modalId`,static:!1,private:!1,access:{has:e=>`modalId`in e,get:e=>e.modalId,set:(e,t)=>{e.modalId=t}},metadata:A},h,g),to(this,null,_,{kind:`accessor`,name:`modalTitle`,static:!1,private:!1,access:{has:e=>`modalTitle`in e,get:e=>e.modalTitle,set:(e,t)=>{e.modalTitle=t}},metadata:A},v,y),to(this,null,b,{kind:`accessor`,name:`submitForm`,static:!1,private:!1,access:{has:e=>`submitForm`in e,get:e=>e.submitForm,set:(e,t)=>{e.submitForm=t}},metadata:A},x,S),to(this,null,C,{kind:`accessor`,name:`closeForm`,static:!1,private:!1,access:{has:e=>`closeForm`in e,get:e=>e.closeForm,set:(e,t)=>{e.closeForm=t}},metadata:A},w,T),to(this,null,E,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:A},D,O),to(this,null,ee,{kind:`accessor`,name:`originalBodyOverflow`,static:!1,private:!1,access:{has:e=>`originalBodyOverflow`in e,get:e=>e.originalBodyOverflow,set:(e,t)=>{e.originalBodyOverflow=t}},metadata:A},k,te),to(null,t={value:r},e,{kind:`class`,name:r.name,metadata:A},null,n),ne=r=t.value,A&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:A})}static styles=I`
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
	`;#e=no(this,o,void 0);get profile(){return this.#e}set profile(e){this.#e=e}#t=(no(this,s),no(this,l,`User`));get author(){return this.#t}set author(e){this.#t=e}#n=(no(this,u),no(this,f,void 0));get avatar(){return this.#n}set avatar(e){this.#n=e}#r=(no(this,p),no(this,h,void 0));get modalId(){return this.#r}set modalId(e){this.#r=e}#i=(no(this,g),no(this,v,void 0));get modalTitle(){return this.#i}set modalTitle(e){this.#i=e}#a=(no(this,y),no(this,x,void 0));get submitForm(){return this.#a}set submitForm(e){this.#a=e}#o=(no(this,S),no(this,w,void 0));get closeForm(){return this.#o}set closeForm(e){this.#o=e}#s=(no(this,T),no(this,D,!1));get lightTheme(){return this.#s}set lightTheme(e){this.#s=e}#c=(no(this,O),no(this,k,void 0));get originalBodyOverflow(){return this.#c}set originalBodyOverflow(e){this.#c=e}dialogRef=(no(this,te),Xt());handleClickCloseIcon(){this.dialogRef.value&&this.dialogRef.value.close()}handleFormSubmit(e){e.preventDefault(),e.stopPropagation();let t=this.shadowRoot?.querySelector(`slot`)?.assignedElements()??[];for(let e of t)if(e instanceof ha){let t=e.shadowRoot,n=t?.querySelector(`input`)??t?.querySelector(`textarea`);if(n?.attributes.getNamedItem(`required`)&&!n.value){let e=t?.querySelector(`div.discord-text-input-message-needed-input`);e instanceof HTMLDivElement&&!e.style.display&&(e.style.display=`flex`,globalThis.setTimeout(()=>{e.style.opacity=`1`},1));return}if(n instanceof HTMLTextAreaElement&&n.value.length<Number(n.attributes.getNamedItem(`minlength`)?.value)&&n.value.length>0||n instanceof HTMLTextAreaElement&&n.value.length<Number(n.attributes.getNamedItem(`minlength`)?.value)&&n?.attributes.getNamedItem(`required`)){let n=t?.querySelector(`div.discord-text-input-message-needed-min-length`);n instanceof HTMLDivElement&&!n.style.display&&(n.style.display=`flex`,e.hasWarning=!0,globalThis.setTimeout(()=>{n.style.opacity=`1`},1));return}}this.submitForm?.(),this.handleClickCloseIcon()}onCloseDialog(){globalThis.document.body.style.overflow=this.originalBodyOverflow??`scroll`;let e=this.shadowRoot?.querySelector(`div.discord-modal-box`);e instanceof HTMLDivElement&&(e.style.display=`none`);let t=this.shadowRoot?.querySelector(`slot`)?.assignedElements()??[];for(let e of t)if(e instanceof ha){e.resetState();let t=e.shadowRoot,n=t?.querySelector(`div.discord-text-input-message-needed-input`),r=t?.querySelector(`div.discord-text-input-message-needed-min-length`);n instanceof HTMLDivElement&&n.style.display&&(n.style.display=``,n.style.opacity=`0`),r instanceof HTMLDivElement&&r.style.display&&(r.style.display=``,r.style.opacity=`0`)}this.closeForm?.()}render(){let e={author:this.author},t=this.profile!==void 0&&Reflect.get(er,this.profile)||{},n={...e,...t,avatar:this.resolveAvatar(t.avatar??this.avatar)};return L`
			<dialog
				${$t(this.dialogRef)}
				id="${W(this.modalId)}"
				class=${U({"discord-modal":!0,"discord-modal-light-theme":this.lightTheme})}
				@close=${this.onCloseDialog}
			>
				<div class="discord-modal-box">
					<form @submit=${this.handleFormSubmit}>
						<div aria-labelledby="discord-modal-title" role="dialog" tabindex="-1" aria-modal="true">
							<div class=${U({"discord-modal-root":!0,"discord-modal-root-light-theme":this.lightTheme})}>
								<div class="discord-modal-header-container">
									<div class="discord-modal-avatar">
										<img src="${W(n.avatar)}" alt="${W(n.author)}" />
									</div>
									<div
										id="discord-modal-title"
										class=${U({"discord-modal-title":!0,"discord-modal-title-light-theme":this.lightTheme})}
									>
										${this.modalTitle}
									</div>
									<button
										aria-label="Close"
										@click=${this.handleClickCloseIcon}
										type="button"
										class=${U({"discord-modal-close-button":!0,"discord-modal-close-button-light-theme":this.lightTheme})}
									>
										<div class="discord-modal-close-button-content">${Qa()}</div>
									</button>
								</div>
								<div
									class=${U({"discord-modal-content-container":!0,"discord-modal-content-container-light-theme":this.lightTheme})}
								>
									<div class="discord-modal-warning-container">
										<div class="discord-modal-warning-icon">
											${eo({class:`discord-modal-warning-icon-svg`+(this.lightTheme?` discord-modal-warning-icon-svg-light-theme`:``)})}
										</div>
										<div
											class=${U({"discord-modal-warning":!0,"discord-modal-warning-light-theme":this.lightTheme})}
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
									class=${U({"discord-modal-actions-container":!0,"discord-modal-actions-container-light-theme":this.lightTheme})}
								>
									<button type="submit" class="discord-modal-button discord-modal-button-submit">
										<div class="discord-modal-button-content">Submit</div>
									</button>
									<button
										type="button"
										class=${U({"discord-modal-button":!0,"discord-modal-button-cancel":!0,"discord-modal-button-cancel-light-theme":this.lightTheme})}
										@click=${this.handleClickCloseIcon}
									>
										<div
											class=${U({"discord-modal-button-content":!0,"discord-modal-button-content-light-theme":this.lightTheme})}
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
		`}resolveAvatar(e){return e===void 0?$n.default:$n[e]??e??$n.default}static{no(r,n)}};return r})(),io=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ao=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},oo=(()=>{let e=[B(`discord-ordered-list`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[];var d=class extends i{static{r=this}static{let f=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({type:Number,reflect:!0})],c=[Ct()],io(this,null,a,{kind:`accessor`,name:`start`,static:!1,private:!1,access:{has:e=>`start`in e,get:e=>e.start,set:(e,t)=>{e.start=t}},metadata:f},o,s),io(this,null,c,{kind:`accessor`,name:`startLength`,static:!1,private:!1,access:{has:e=>`startLength`in e,get:e=>e.startLength,set:(e,t)=>{e.startLength=t}},metadata:f},l,u),io(null,t={value:r},e,{kind:`class`,name:r.name,metadata:f},null,n),d=r=t.value,f&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:f})}static styles=I`
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
	`;#e=ao(this,o,1);get start(){return this.#e}set start(e){this.#e=e}#t=(ao(this,s),ao(this,l,1));get startLength(){return this.#t}set startLength(e){this.#t=e}checkChildren(){if(!Array.from(this.children).every(e=>{let t=e.tagName.toLowerCase();return t===`discord-list-item`||t===`discord-unordered-list`||t===`discord-ordered-list`}))throw new Jr(`All direct children inside of a <discord-ordered-list> components must be one of <discord-unordered-list>, <discord-ordered-list>, or <discord-list-item>.`)}willUpdate(){let e=Array.from(this.children).filter(e=>e.tagName.toLowerCase()===`discord-list-item`).length,t=this.start+e;this.startLength=t.toString().length}render(){return this.checkChildren(),L`<ol start=${this.start} style="--totalCharacters:${this.startLength}">
			<slot></slot>
		</ol>`}constructor(){super(...arguments),ao(this,u)}static{ao(r,n)}};return r})(),so=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},co=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},lo=Mt(`multiple-answers`),uo=Mt(`ended`),fo=Mt(`voted`),po=Mt(`show-votes`),mo=(()=>{let e=[B(`discord-poll`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,D=[],O=[];var ee=class extends i{static{r=this}static{let k=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({type:String,attribute:`question`,reflect:!0})],c=[V({type:String,attribute:`time-end`,reflect:!0})],d=[Lt({context:uo}),V({type:Boolean,attribute:`ended`,reflect:!0})],m=[Lt({context:lo}),V({type:Boolean,reflect:!0,attribute:`multiple-answers`})],_=[Lt({context:fo}),V({type:Boolean,reflect:!0,attribute:`voted`})],b=[Lt({context:po}),V({type:Boolean,reflect:!0,attribute:`show-results`})],C=[H({context:_r}),V({type:Boolean,reflect:!0,attribute:`compact-mode`})],E=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],so(this,null,a,{kind:`accessor`,name:`question`,static:!1,private:!1,access:{has:e=>`question`in e,get:e=>e.question,set:(e,t)=>{e.question=t}},metadata:k},o,s),so(this,null,c,{kind:`accessor`,name:`timeEnd`,static:!1,private:!1,access:{has:e=>`timeEnd`in e,get:e=>e.timeEnd,set:(e,t)=>{e.timeEnd=t}},metadata:k},l,u),so(this,null,d,{kind:`accessor`,name:`pollEnded`,static:!1,private:!1,access:{has:e=>`pollEnded`in e,get:e=>e.pollEnded,set:(e,t)=>{e.pollEnded=t}},metadata:k},f,p),so(this,null,m,{kind:`accessor`,name:`multipleAnswers`,static:!1,private:!1,access:{has:e=>`multipleAnswers`in e,get:e=>e.multipleAnswers,set:(e,t)=>{e.multipleAnswers=t}},metadata:k},h,g),so(this,null,_,{kind:`accessor`,name:`pollVoted`,static:!1,private:!1,access:{has:e=>`pollVoted`in e,get:e=>e.pollVoted,set:(e,t)=>{e.pollVoted=t}},metadata:k},v,y),so(this,null,b,{kind:`accessor`,name:`showResults`,static:!1,private:!1,access:{has:e=>`showResults`in e,get:e=>e.showResults,set:(e,t)=>{e.showResults=t}},metadata:k},x,S),so(this,null,C,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:k},w,T),so(this,null,E,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:k},D,O),so(null,t={value:r},e,{kind:`class`,name:r.name,metadata:k},null,n),ee=r=t.value,k&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:k})}static styles=I`
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
	`;#e=co(this,o,void 0);get question(){return this.#e}set question(e){this.#e=e}#t=(co(this,s),co(this,l,`24h`));get timeEnd(){return this.#t}set timeEnd(e){this.#t=e}#n=(co(this,u),co(this,f,!1));get pollEnded(){return this.#n}set pollEnded(e){this.#n=e}#r=(co(this,p),co(this,h,!1));get multipleAnswers(){return this.#r}set multipleAnswers(e){this.#r=e}#i=(co(this,g),co(this,v,!1));get pollVoted(){return this.#i}set pollVoted(e){this.#i=e}#a=(co(this,y),co(this,x,!1));get showResults(){return this.#a}set showResults(e){this.#a=e}#o=(co(this,S),co(this,w,!1));get compactMode(){return this.#o}set compactMode(e){this.#o=e}#s=(co(this,T),co(this,D,!1));get lightTheme(){return this.#s}set lightTheme(e){this.#s=e}#c=(co(this,O),!1);get selected(){return this.#c}set selected(e){this.#c=e}#l=0;get totVotes(){return this.#l}set totVotes(e){this.#l=e}connectedCallback(){super.connectedCallback();let e=this.parentElement?.querySelectorAll(`discord-poll-answer`);if(e)for(let t=0;t<e?.length;t++)e[t].attributes.getNamedItem(`selected`)&&(this.selected=!0),this.totVotes+=e[t].attributes.getNamedItem(`votes`)?.nodeValue?Number(e[t].attributes.getNamedItem(`votes`)?.nodeValue):0}render(){let e=this.multipleAnswers?`Select one or more answers`:`Select one answer`;return L`<div>
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
				${G(!this.pollEnded&&!this.pollVoted&&!this.showResults,()=>L`<div class="discord-poll-result-vote">
							<div class="discord-poll-footer-hover discord-poll-color-show-results">Show results</div>
							<button
								type="button"
								class="${U({"discord-poll-button-vote":!0,"discord-poll-button-vote-disabled":!this.selected})}"
							>
								<div>Vote</div>
							</button>
						</div>`)}
				${G(!this.pollEnded&&this.pollVoted||this.showResults,()=>L`
						<button type="button" class="discord-poll-button-remove-vote">
							<div>${!this.pollEnded&&this.pollVoted?`Remove vote`:`Go back to vote`}</div>
						</button>
					`)}
			</div>
		</div> `}static{co(r,n)}};return r})(),ho=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},go=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},_o=(()=>{let e=[B(`discord-poll-answer`)],t,n=[],r,i=z,a=[],o,s=[],c=[],l,u=[],d=[],f,p=[],m=[],h,g=[],_=[],v,y=[],b=[],x,S=[],C=[],w,T=[],E=[],D,O=[],ee=[],k,te=[],ne=[],A,re=[],ie=[],j;var ae=class extends i{static{r=this}static{let M=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;o=[V({type:String,attribute:`emoji`,reflect:!0})],l=[V({type:String,attribute:`answer`,reflect:!0})],f=[V({type:Number,attribute:`votes`,reflect:!0})],h=[V({type:Boolean,attribute:`selected`,reflect:!0})],v=[H({context:_r})],x=[H({context:lo})],w=[H({context:uo})],D=[H({context:fo})],k=[H({context:po})],A=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],j=[wt({once:!1,capture:!0,passive:!0})],go(this,null,o,{kind:`accessor`,name:`emoji`,static:!1,private:!1,access:{has:e=>`emoji`in e,get:e=>e.emoji,set:(e,t)=>{e.emoji=t}},metadata:M},s,c),go(this,null,l,{kind:`accessor`,name:`answer`,static:!1,private:!1,access:{has:e=>`answer`in e,get:e=>e.answer,set:(e,t)=>{e.answer=t}},metadata:M},u,d),go(this,null,f,{kind:`accessor`,name:`votes`,static:!1,private:!1,access:{has:e=>`votes`in e,get:e=>e.votes,set:(e,t)=>{e.votes=t}},metadata:M},p,m),go(this,null,h,{kind:`accessor`,name:`selected`,static:!1,private:!1,access:{has:e=>`selected`in e,get:e=>e.selected,set:(e,t)=>{e.selected=t}},metadata:M},g,_),go(this,null,v,{kind:`accessor`,name:`compactMode`,static:!1,private:!1,access:{has:e=>`compactMode`in e,get:e=>e.compactMode,set:(e,t)=>{e.compactMode=t}},metadata:M},y,b),go(this,null,x,{kind:`accessor`,name:`multipleAnswers`,static:!1,private:!1,access:{has:e=>`multipleAnswers`in e,get:e=>e.multipleAnswers,set:(e,t)=>{e.multipleAnswers=t}},metadata:M},S,C),go(this,null,w,{kind:`accessor`,name:`pollEnded`,static:!1,private:!1,access:{has:e=>`pollEnded`in e,get:e=>e.pollEnded,set:(e,t)=>{e.pollEnded=t}},metadata:M},T,E),go(this,null,D,{kind:`accessor`,name:`pollVoted`,static:!1,private:!1,access:{has:e=>`pollVoted`in e,get:e=>e.pollVoted,set:(e,t)=>{e.pollVoted=t}},metadata:M},O,ee),go(this,null,k,{kind:`accessor`,name:`showResult`,static:!1,private:!1,access:{has:e=>`showResult`in e,get:e=>e.showResult,set:(e,t)=>{e.showResult=t}},metadata:M},te,ne),go(this,null,A,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:M},re,ie),go(this,null,j,{kind:`method`,name:`_onClick`,static:!1,private:!1,access:{has:e=>`_onClick`in e,get:e=>e._onClick},metadata:M},null,a),go(null,t={value:r},e,{kind:`class`,name:r.name,metadata:M},null,n),ae=r=t.value,M&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:M})}static styles=I`
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
	`;#e=(ho(this,a),ho(this,s,void 0));get emoji(){return this.#e}set emoji(e){this.#e=e}#t=(ho(this,c),ho(this,u,void 0));get answer(){return this.#t}set answer(e){this.#t=e}#n=(ho(this,d),ho(this,p,0));get votes(){return this.#n}set votes(e){this.#n=e}#r=(ho(this,m),ho(this,g,!1));get selected(){return this.#r}set selected(e){this.#r=e}#i=(ho(this,_),ho(this,y,!1));get compactMode(){return this.#i}set compactMode(e){this.#i=e}#a=(ho(this,b),ho(this,S,!1));get multipleAnswers(){return this.#a}set multipleAnswers(e){this.#a=e}#o=(ho(this,C),ho(this,T,!1));get pollEnded(){return this.#o}set pollEnded(e){this.#o=e}#s=(ho(this,E),ho(this,O,!1));get pollVoted(){return this.#s}set pollVoted(e){this.#s=e}#c=(ho(this,ee),ho(this,te,!1));get showResult(){return this.#c}set showResult(e){this.#c=e}#l=(ho(this,ne),ho(this,re,!1));get lightTheme(){return this.#l}set lightTheme(e){this.#l=e}#u=(ho(this,ie),0);get totalVotesPoll(){return this.#u}set totalVotesPoll(e){this.#u=e}#d;get percentageVoted(){return this.#d}set percentageVoted(e){this.#d=e}#f=[];get arrayAnswers(){return this.#f}set arrayAnswers(e){this.#f=e}#p=[];get winners(){return this.#p}set winners(e){this.#p=e}connectedCallback(){super.connectedCallback();let e=this.parentElement?.getElementsByTagName(`discord-poll-answer`);if(e)for(let t=0;t<e?.length;t++){let n=e[t].attributes.getNamedItem(`votes`)?Number(e[t].attributes.getNamedItem(`votes`)?.nodeValue):0;this.arrayAnswers.push({answer:e[t].attributes.getNamedItem(`answer`)?.nodeValue,value:n}),this.arrayAnswers=this.arrayAnswers.toSorted((e,t)=>t.value-e.value),this.totalVotesPoll+=n}for(let e=0;e<this.arrayAnswers?.length;e++)if(this.winners.includes(this.arrayAnswers[e].answer)||this.winners.push(this.arrayAnswers[e].answer),this.arrayAnswers[e+1]){if(this.arrayAnswers[e].value===this.arrayAnswers[e+1].value)this.winners.includes(this.arrayAnswers[e+1].answer)||this.winners.push(this.arrayAnswers[e+1].answer);else break}if(this.parentElement?.getAttribute(`multiple-answers`)!==``){let t=0;if(e)for(let n of e)n.selected&&t++;if(t>1)throw new Jr(`<discord-poll> single vote was selected more than 1 answer`)}this.percentageVoted=this.votes/this.totalVotesPoll*100}render(){return this.percentageVoted=this.percentageVoted.toPrecision(3).split(`.`)[1]===`0`?Number(this.percentageVoted.toPrecision(3).split(`.`)[0]):Number(this.percentageVoted.toPrecision(3)),L`
			<label>
				<div class="${U({"discord-answer-container":!this.pollVoted&&!this.pollEnded&&!this.showResult})}">
					<div
						class="${U({"discord-answer":!0,"discord-answer-selected":this.selected&&!this.pollEnded&&!this.showResult,"discord-answer-selected-ended":this.pollEnded&&this.winners.includes(this.answer)})}"
					>
						<div
							class=${U({"discord-answer-backdround-color":!0,"discord-background-color-selected":!this.pollEnded&&this.selected&&this.pollVoted,"discord-background-color-winner":this.pollEnded&&this.winners.includes(this.answer),"discord-background-color-default":this.pollEnded&&!this.winners.includes(this.answer)||!this.pollEnded&&!this.selected&&this.pollVoted||this.showResult})}
							style="width:${this.percentageVoted}%;"
						></div>
						<div class="discord-answer-flex">
							${G(this.emoji,()=>L`<img class="discord-answer-emoji" src="${this.emoji}" alt="emoji" />`)}
							<div class="discord-awnswer-title">${this.answer}</div>
						</div>
						<div class="discord-answer-flex">
							${G(this.pollVoted||this.pollEnded||this.showResult,()=>L`<h5 class="discord-answer-no-margin discord-quantity-votes">
										${this.votes} ${this.votes>1||this.votes===0?`votes`:`vote`}
									</h5>`)}
							${G(this.pollVoted||this.pollEnded||this.showResult,()=>L`<h4 class="discord-answer-no-margin discord-percentage-votes">${this.percentageVoted}%</h4>`)}
							${G(this.selected&&!this.showResult,()=>G(this.multipleAnswers,()=>G(this.pollEnded,()=>G(this.winners.includes(this.answer),()=>L`<div class="discord-checkbox-div-answer-selected-ended-winner">
																${Vr({style:`width:24px;height:24px;`})}
															</div>`,()=>L`<div class="discord-checkbox-div-answer-selected-ended-no-winner">
																${Vr({style:`width:24px;height:24px;`})}
															</div>`),()=>G(!this.pollVoted,()=>L`<div class="discord-checkbox-div-multiple-answer-selected">
																${Vr({style:`width:24px;height:24px;`})}
															</div>`,()=>L`<div class="discord-checkbox-div-answer-selected-voted">
																${Vr({style:`width:24px;height:24px;`})}
															</div>`)),()=>G(this.pollEnded,()=>L`<div class="discord-checkbox-div-answer-selected-ended-winner">
														${Vr({style:`width:24px;height:24px;`})}
													</div>`,()=>G(!this.pollVoted,()=>L`
															<div class="discord-checkbox-div-answer">
																<div class="discord-checkbox-div-answer-selected"></div>
															</div>
														`,()=>L`<div class="discord-checkbox-div-answer-selected-voted">
																${Vr({style:`width:24px;height:24px;`})}
															</div>`))),()=>G(!this.pollEnded&&!this.pollVoted&&!this.showResult,()=>L`<div
												class="${U({"discord-checkbox-div-multiple-answer":this.multipleAnswers,"discord-checkbox-div-answer":!this.multipleAnswers})}"
											></div>`))}
						</div>
					</div>
					<span class="discord-answer-hidden"><input type="checkbox" @click=${()=>this._onClick()} /></span>
				</div>
			</label>
		`}_onClick(){if(this.pollEnded||this.pollVoted)return;let e=this.parentElement,t=e?.shadowRoot?.querySelector(`button.discord-poll-button-vote`),n=e?.getElementsByTagName(`discord-poll-answer`);if(this.selected){if(this.selected=!1,t){if(e?.getAttribute(`multiple-answers`)===``){let e=0;if(n)for(let t of n)t.selected&&e++;if(e>0){t.className=`discord-poll-button-vote`;return}}t.className=`discord-poll-button-vote discord-poll-button-vote-disabled`}}else{if(e?.getAttribute(`multiple-answers`)!==``&&n)for(let e of n)e.selected=!1;t&&(t.className=`discord-poll-button-vote`),this.selected=!0}}static{ho(r,n)}};return r})(),vo=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},yo=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},bo=(()=>{let e=[B(`discord-pre`)],t,n=[],r,i=z,a,o=[],s=[];var c=class extends i{static{r=this}static{let l=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({type:Boolean,reflect:!0})],vo(this,null,a,{kind:`accessor`,name:`embed`,static:!1,private:!1,access:{has:e=>`embed`in e,get:e=>e.embed,set:(e,t)=>{e.embed=t}},metadata:l},o,s),vo(null,t={value:r},e,{kind:`class`,name:r.name,metadata:l},null,n),c=r=t.value,l&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:l})}static styles=I`
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
	`;#e=yo(this,o,!1);get embed(){return this.#e}set embed(e){this.#e=e}render(){return L`<pre><slot></slot
		></pre>`}constructor(){super(...arguments),yo(this,s)}static{yo(r,n)}};return r})(),xo=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},So=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Co=(()=>{let e=[B(`discord-quote`)],t,n=[],r,i=z,a,o=[],s=[];var c=class extends i{static{r=this}static{let l=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({context:q,subscribe:!0}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],xo(this,null,a,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:l},o,s),xo(null,t={value:r},e,{kind:`class`,name:r.name,metadata:l},null,n),c=r=t.value,l&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:l})}static styles=I`
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
	`;#e=So(this,o,!1);get lightTheme(){return this.#e}set lightTheme(e){this.#e=e}render(){return L`
			<div class="discord-quote-divider"></div>
			<!-- display: inline -->
			<blockquote><slot></slot></blockquote>
		`}constructor(){super(...arguments),So(this,s)}static{So(r,n)}};return r})(),wo=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},To=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Eo=(()=>{let e=[B(`discord-reaction`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[];var C=class extends i{static{r=this}static{let w=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V()],d=[V({type:Number})],m=[V({type:Boolean,reflect:!0})],_=[V({type:Boolean})],b=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],wo(this,null,a,{kind:`accessor`,name:`emoji`,static:!1,private:!1,access:{has:e=>`emoji`in e,get:e=>e.emoji,set:(e,t)=>{e.emoji=t}},metadata:w},o,s),wo(this,null,c,{kind:`accessor`,name:`name`,static:!1,private:!1,access:{has:e=>`name`in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:w},l,u),wo(this,null,d,{kind:`accessor`,name:`count`,static:!1,private:!1,access:{has:e=>`count`in e,get:e=>e.count,set:(e,t)=>{e.count=t}},metadata:w},f,p),wo(this,null,m,{kind:`accessor`,name:`reacted`,static:!1,private:!1,access:{has:e=>`reacted`in e,get:e=>e.reacted,set:(e,t)=>{e.reacted=t}},metadata:w},h,g),wo(this,null,_,{kind:`accessor`,name:`interactive`,static:!1,private:!1,access:{has:e=>`interactive`in e,get:e=>e.interactive,set:(e,t)=>{e.interactive=t}},metadata:w},v,y),wo(this,null,b,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:w},x,S),wo(null,t={value:r},e,{kind:`class`,name:r.name,metadata:w},null,n),C=r=t.value,w&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:w})}static styles=I`
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
	`;#e=To(this,o,void 0);get emoji(){return this.#e}set emoji(e){this.#e=e}#t=(To(this,s),To(this,l,`:emoji:`));get name(){return this.#t}set name(e){this.#t=e}#n=(To(this,u),To(this,f,1));get count(){return this.#n}set count(e){this.#n=e}#r=(To(this,p),To(this,h,!1));get reacted(){return this.#r}set reacted(e){this.#r=e}#i=(To(this,g),To(this,v,!1));get interactive(){return this.#i}set interactive(e){this.#i=e}#a=(To(this,y),To(this,x,!1));get lightTheme(){return this.#a}set lightTheme(e){this.#a=e}render(){return L`<div class="discord-reaction-inner" @click=${this.handleReactionClick} @keydown=${this.handleReactionClick}>
			${G(this.emoji?.includes(`http`)||this.emoji?.startsWith(`/`)||this.emoji?.startsWith(`./`),()=>L`<img src=${W(this.emoji)} alt=${W(this.name)} draggable="false" />`,()=>L`<span>${this.emoji}</span>`)}
			<span class="discord-reaction-count">${this.count}</span>
		</div>`}handleReactionClick=(To(this,S),e=>{this.interactive&&(e.shiftKey?this.count--:this.count++,this.count<=0&&(this.count=1))});static{To(r,n)}};return r})(),Do=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Oo=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},ko=(()=>{let e=[B(`discord-reactions`)],t,n=[],r,i=z;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Do(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=I`
		:host {
			display: flex;
			-webkit-box-flex: 1;
			-ms-flex: 1 0 auto;
			flex: 1 0 auto;
			align-items: center;
			flex-wrap: wrap;
		}
	`;render(){return L`<slot></slot>`}static{Oo(r,n)}};return r})(),Ao=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},jo=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Mo=(()=>{let e=[B(`discord-spoiler`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[];var d=class extends i{static{r=this}static{let f=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({type:Boolean,reflect:!0})],c=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],Ao(this,null,a,{kind:`accessor`,name:`activated`,static:!1,private:!1,access:{has:e=>`activated`in e,get:e=>e.activated,set:(e,t)=>{e.activated=t}},metadata:f},o,s),Ao(this,null,c,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:f},l,u),Ao(null,t={value:r},e,{kind:`class`,name:r.name,metadata:f},null,n),d=r=t.value,f&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:f})}static styles=I`
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
	`;#e=jo(this,o,!1);get activated(){return this.#e}set activated(e){this.#e=e}#t=(jo(this,s),jo(this,l,!1));get lightTheme(){return this.#t}set lightTheme(e){this.#t=e}render(){return L`<slot
			@click=${()=>{this.activated=!0}}
			@keydown=${()=>{this.activated=!0}}
		></slot>`}constructor(){super(...arguments),jo(this,u)}static{jo(r,n)}};return r})(),No=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Po=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Fo=(()=>{let e=[B(`discord-string-select-menu`)],t,n=[],r,i=z,a=[],o,s=[],c=[],l,u=[],d=[],f,p=[],m=[],h;var g=class extends i{static{r=this}static{let _=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;o=[V({type:Boolean,attribute:`disabled`})],l=[V({attribute:`placeholder`})],f=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],h=[wt({once:!1,capture:!0,passive:!0})],Po(this,null,o,{kind:`accessor`,name:`disabled`,static:!1,private:!1,access:{has:e=>`disabled`in e,get:e=>e.disabled,set:(e,t)=>{e.disabled=t}},metadata:_},s,c),Po(this,null,l,{kind:`accessor`,name:`placeholder`,static:!1,private:!1,access:{has:e=>`placeholder`in e,get:e=>e.placeholder,set:(e,t)=>{e.placeholder=t}},metadata:_},u,d),Po(this,null,f,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:_},p,m),Po(this,null,h,{kind:`method`,name:`_onClick`,static:!1,private:!1,access:{has:e=>`_onClick`in e,get:e=>e._onClick},metadata:_},null,a),Po(null,t={value:r},e,{kind:`class`,name:r.name,metadata:_},null,n),g=r=t.value,_&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:_})}static styles=I`
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
	`;#e=(No(this,a),No(this,s,void 0));get disabled(){return this.#e}set disabled(e){this.#e=e}#t=(No(this,c),No(this,u,`Make a selection`));get placeholder(){return this.#t}set placeholder(e){this.#t=e}#n=(No(this,d),No(this,p,!1));get lightTheme(){return this.#n}set lightTheme(e){this.#n=e}render(){return L`
			<label
				class="${U({"discord-string-select-menu-label":!0,"discord-string-select-menu":!0,"discord-string-select-menu-disabled":this.disabled})}"
			>
				<span>${this.placeholder}</span> ${Mi({class:`discord-expand-more-icon`})}
				<span class="discord-string-select-menu-hidden"><input type="checkbox" @click=${this._onClick} /></span>
			</label>
			<div class="discord-string-select-menu-option-slot discord-string-select-menu-hidden"><slot></slot></div>
		`}_onClick(){let e=this.shadowRoot?.querySelectorAll(`svg.discord-expand-more-icon`).item(0),t=this.shadowRoot?.querySelectorAll(`div.discord-string-select-menu-option-slot`).item(0);(this.shadowRoot?.querySelectorAll(`label.discord-string-select-menu`).item(0))?.className.includes(`discord-string-select-menu-disabled`)||(t?.className.includes(`discord-string-select-menu-hidden`)?(t?.setAttribute(`class`,`discord-string-select-menu-option-slot`),e?.setAttribute(`class`,`discord-expand-more-icon discord-string-select-menu-rotated`)):(t?.setAttribute(`class`,`discord-string-select-menu-option-slot discord-string-select-menu-hidden`),e?.setAttribute(`class`,`discord-expand-more-icon`)))}constructor(){super(...arguments),No(this,m)}static{No(r,n)}};return r})(),Io=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Lo=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ro=(()=>{let e=[B(`discord-string-select-menu-option`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[];var C=class extends i{static{r=this}static{let w=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({reflect:!0,attribute:`emoji`})],c=[V({reflect:!0,attribute:`emoji-name`})],d=[V({attribute:`label`})],m=[V({attribute:`description`})],_=[V({reflect:!1,noAccessor:!0,attribute:!1})],b=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],Io(this,null,a,{kind:`accessor`,name:`emoji`,static:!1,private:!1,access:{has:e=>`emoji`in e,get:e=>e.emoji,set:(e,t)=>{e.emoji=t}},metadata:w},o,s),Io(this,null,c,{kind:`accessor`,name:`emojiName`,static:!1,private:!1,access:{has:e=>`emojiName`in e,get:e=>e.emojiName,set:(e,t)=>{e.emojiName=t}},metadata:w},l,u),Io(this,null,d,{kind:`accessor`,name:`label`,static:!1,private:!1,access:{has:e=>`label`in e,get:e=>e.label,set:(e,t)=>{e.label=t}},metadata:w},f,p),Io(this,null,m,{kind:`accessor`,name:`description`,static:!1,private:!1,access:{has:e=>`description`in e,get:e=>e.description,set:(e,t)=>{e.description=t}},metadata:w},h,g),Io(this,null,_,{kind:`accessor`,name:`selectOption`,static:!1,private:!1,access:{has:e=>`selectOption`in e,get:e=>e.selectOption,set:(e,t)=>{e.selectOption=t}},metadata:w},v,y),Io(this,null,b,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:w},x,S),Io(null,t={value:r},e,{kind:`class`,name:r.name,metadata:w},null,n),C=r=t.value,w&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:w})}static styles=I`
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
	`;#e=Lo(this,o,void 0);get emoji(){return this.#e}set emoji(e){this.#e=e}#t=(Lo(this,s),Lo(this,l,`emoji`));get emojiName(){return this.#t}set emojiName(e){this.#t=e}#n=(Lo(this,u),Lo(this,f,void 0));get label(){return this.#n}set label(e){this.#n=e}#r=(Lo(this,p),Lo(this,h,void 0));get description(){return this.#r}set description(e){this.#r=e}#i=(Lo(this,g),Lo(this,v,void 0));get selectOption(){return this.#i}set selectOption(e){this.#i=e}checkLabelIsProvided(){if(!this.label)throw new Jr(`The label of option is required`)}#a=(Lo(this,y),Lo(this,x,!1));get lightTheme(){return this.#a}set lightTheme(e){this.#a=e}render(){return this.checkLabelIsProvided(),L`
			<label>
				${G(this.emoji,()=>G(this.emoji?.includes(`http`)||this.emoji?.startsWith(`/`)||this.emoji?.startsWith(`./`),()=>L`<img
								src=${this.emoji}
								alt=${W(this.emojiName)}
								draggable="true"
								class="discord-string-select-menu-option-emoji"
							/>`,()=>L`<span class="discord-string-select-menu-option-emoji">${this.emoji}</span>`))}
				<div class="discord-string-select-menu-option-ellipsis-text">
					<div class="discord-string-select-menu-option-ellipsis-text">
						<strong>${this.label}</strong>
					</div>
					${G(this.description,()=>L`<span>${this.description}</span>`)}
				</div>
				<span class="discord-string-select-menu-option-hidden"><input type="checkbox" @click=${()=>this.selectOption?.()} /></span>
			</label>
		`}constructor(){super(...arguments),Lo(this,S)}static{Lo(r,n)}};return r})(),zo=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Bo=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Vo=(()=>{let e=[B(`discord-subscript`)],t,n=[],r,i=z,a,o=[],s=[];var c=class extends i{static{r=this}static{let l=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],zo(this,null,a,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:l},o,s),zo(null,t={value:r},e,{kind:`class`,name:r.name,metadata:l},null,n),c=r=t.value,l&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:l})}static styles=I`
		small {
			display: block;
			color: color-mix(in oklab, hsl(214 calc(1 * 8.1%) 61.2% / 1) 100%, black 0%);
			font-size: 0.8125rem;
			line-height: 1.11719rem;
		}

		:host([light-theme]) > small {
			color: color-mix(in oklab, hsl(228 calc(1 * 5.2%) 38% / 1) 100%, black 0%);
		}
	`;#e=Bo(this,o,!1);get lightTheme(){return this.#e}set lightTheme(e){this.#e=e}render(){return L`
			<small>
				<span>
					<slot></slot>
				</span>
			</small>
		`}constructor(){super(...arguments),Bo(this,s)}static{Bo(r,n)}};return r})(),Ho=R`
	<path d="M4 0L0 4V8L4 12L8 8V4L4 0ZM7 7.59L4 10.59L1 7.59V4.41L4 1.41L7 4.41V7.59Z" fill="currentColor" />
	<path d="M2 4.83V7.17L4 9.17L6 7.17V4.83L4 2.83L2 4.83Z" fill="currentColor" />
`;function Uo(e={}){return L`<svg ${K(e)} aria-hidden="false" width="24" height="24" viewBox="0 0 8 12">${Ho}</svg>`}var Wo=R`
	<path
		fill="#3ba55c"
		fill-rule="evenodd"
		d="M17.7163041 15.36645368c-.0190957.02699568-1.9039523 2.6680735-2.9957762 2.63320406-3.0676659-.09785935-6.6733809-3.07188394-9.15694343-5.548738C3.08002193 9.9740657.09772497 6.3791404 0 3.3061316v-.024746C0 2.2060575 2.61386252.3152347 2.64082114.2972376c.7110335-.4971705 1.4917101-.3149497 1.80959713.1372281.19320342.2744561 2.19712724 3.2811005 2.42290565 3.6489167.09884826.1608492.14714912.3554431.14714912.5702838 0 .2744561-.07975258.5770327-.23701117.8751101-.1527655.2902036-.65262318 1.1664385-.89862055 1.594995.2673396.3768148.94804468 1.26429792 2.351016 2.66357424 1.39173858 1.39027775 2.28923588 2.07641807 2.67002628 2.34187563.4302146-.2452108 1.3086162-.74238132 1.5972981-.89423205.5447887-.28682915 1.0907006-.31944893 1.4568885-.08661115.3459689.2182151 3.3383754 2.21027167 3.6225641 2.41611376.2695862.19234426.4144887.5399137.4144887.91672846 0 .2969525-.089862.61190215-.2808189.88523346"
	/>
`;function Go(e={}){return L`<svg ${K(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Wo}</svg>`}var Ko=R`
	<g fill="none" fill-rule="evenodd">
		<path
			fill="#99AAB5"
			d="M0 14.25V18h3.75L14.81 6.94l-3.75-3.75L0 14.25zM17.71 4.04c.39-.39.39-1.02 0-1.41L15.37.29c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
		/>
		<path d="M0 0h18v18H0" />
	</g>
`;function qo(e={}){return L`<svg ${K(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Ko}</svg>`}var Jo=R`
	<g fill="none" fill-rule="evenodd">
		<path d="M0 0h18v18H0z" />
		<path
			fill="#99AAB5"
			d="M3.2765961.00034226C6.344262.0982016 9.949977 3.0722262 12.43353953 5.54908026c2.48356254 2.47685405 5.4658595 6.07177934 5.56358447 9.14478814 0 1.1000741-2.61386252 2.9908969-2.64082114 3.008894-.7110335.4971705-1.4917101.3149497-1.80959713-.1372281-.19320342-.2744561-2.19712724-3.2811005-2.42290565-3.6489167-.09884826-.1608492-.14714912-.3554431-.14714912-.5702838 0-.2744561.07975258-.5770327.23701117-.8751101.1527655-.2902036.65262318-1.1664385.89862055-1.594995-.2673396-.3768148-.94804468-1.26429792-2.351016-2.66357424C8.3695281 6.8223767 7.4720308 6.1362364 7.0912404 5.87077883c-.4302146.2452108-1.3086162.74238132-1.5972981.89423205-.5447887.28682915-1.0907006.31944893-1.4568885.08661115C3.6910849 6.63340693.6986784 4.64135036.4144897 4.43550827.1449035 4.243164.000001 3.89559457.000001 3.5187798c0-.29695252.089862-.61190217.2808189-.88523348.0190957-.02699568 1.9039523-2.6680735 2.9957762-2.63320406z"
		/>
	</g>
`;function Yo(e={}){return L`<svg ${K(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Jo}</svg>`}var Xo=R`
	<path
		d="m16.908 8.39684-8.29587-8.295827-1.18584 1.184157 1.18584 1.18584-4.14834 4.1475v.00167l-1.18583-1.18583-1.185 1.18583 3.55583 3.55502-4.740831 4.74 1.185001 1.185 4.74083-4.74 3.55581 3.555 1.185-1.185-1.185-1.185 4.1475-4.14836h.0009l1.185 1.185z"
		fill="#b9bbbe"
	/>
`;function Zo(e={}){return L`<svg ${K(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Xo}</svg>`}var Qo=R`
	<path
		fill="#b9bbbe"
		fill-rule="evenodd"
		d="M1.575 9a2.25 2.25 0 0 0 0 3.18l.345.345c.128.128.323.15.488.075a2.25 2.25 0 0 1 3 3 .43.43 0 0 0 .06.48l.352.345a2.25 2.25 0 0 0 3.18 0l5.077-5.077a.75.75 0 0 1 1.02-1.02L16.425 9a2.25 2.25 0 0 0 0-3.18l-.345-.352a.42.42 0 0 0-.488-.06 2.25 2.25 0 0 1-3-3 .42.42 0 0 0-.068-.488l-.345-.345a2.25 2.25 0 0 0-3.18 0L7.671 2.903a.75.75 0 0 1-1.02 1.02zm7.508-4.725a.75.75 0 1 0-1.057 1.05l.517.525A.75.75 0 1 0 9.6 4.785l-.517-.525Zm2.063 2.063a.75.75 0 1 0-1.057 1.057l.517.525a.75.75 0 0 0 1.057-1.065l-.517-.525Zm2.063 2.063a.75.75 0 0 0-1.057 1.057l.517.525a.75.75 0 0 0 1.057-1.065l-.517-.525Z"
		clip-rule="evenodd"
	/>
`;function $o(e={}){return L`<svg ${K(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Qo}</svg>`}var es=R`
	<path
		d="M10 0C4.486 0 0 4.486 0 10C0 15.515 4.486 20 10 20C15.514 20 20 15.515 20 10C20 4.486 15.514 0 10 0ZM9 4H11V11H9V4ZM10 15.25C9.31 15.25 8.75 14.691 8.75 14C8.75 13.31 9.31 12.75 10 12.75C10.69 12.75 11.25 13.31 11.25 14C11.25 14.691 10.69 15.25 10 15.25Z"
		fill-rule="evenodd"
		clip-rule="evenodd"
		fill="currentColor"
	/>
`;function ts(e={}){return L`<svg ${K(e)} aria-hidden="false" width="20" height="20" viewBox="0 0 20 20">${es}</svg>`}var ns=R`
	<path
		xmlns="http://www.w3.org/2000/svg"
		d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
		fill="#ed4245"
	/>
`;function rs(e={}){return L`<svg ${K(e)} aria-hidden="false" width="20" height="20" viewBox="0 0 20 20">${ns}</svg>`}var is=R`
	<path
		fill="currentColor"
		d="M5.43309 21C5.35842 21 5.30189 20.9325 5.31494 20.859L5.99991 17H2.14274C2.06819 17 2.01168 16.9327 2.02453 16.8593L2.33253 15.0993C2.34258 15.0419 2.39244 15 2.45074 15H6.34991L7.40991 9H3.55274C3.47819 9 3.42168 8.93274 3.43453 8.85931L3.74253 7.09931C3.75258 7.04189 3.80244 7 3.86074 7H7.75991L8.45234 3.09903C8.46251 3.04174 8.51231 3 8.57049 3H10.3267C10.4014 3 10.4579 3.06746 10.4449 3.14097L9.75991 7H15.7599L16.4523 3.09903C16.4625 3.04174 16.5123 3 16.5705 3H18.3267C18.4014 3 18.4579 3.06746 18.4449 3.14097L17.7599 7H21.6171C21.6916 7 21.7481 7.06725 21.7353 7.14069L21.4273 8.90069C21.4172 8.95811 21.3674 9 21.3091 9H17.4099L17.0495 11.04H15.05L15.4104 9H9.41035L8.35035 15H10.5599V17H7.99991L7.30749 20.901C7.29732 20.9583 7.24752 21 7.18934 21H5.43309Z"
	/>
	<path
		fill="currentColor"
		d="M13.4399 12.96C12.9097 12.96 12.4799 13.3898 12.4799 13.92V20.2213C12.4799 20.7515 12.9097 21.1813 13.4399 21.1813H14.3999C14.5325 21.1813 14.6399 21.2887 14.6399 21.4213V23.4597C14.6399 23.6677 14.8865 23.7773 15.0408 23.6378L17.4858 21.4289C17.6622 21.2695 17.8916 21.1813 18.1294 21.1813H22.5599C23.0901 21.1813 23.5199 20.7515 23.5199 20.2213V13.92C23.5199 13.3898 23.0901 12.96 22.5599 12.96H13.4399Z"
	/>
`;function as(e={}){return L`<svg ${K(e)} aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">${is}</svg>`}var os=R`
	<g fill="none" fill-rule="evenodd">
		<path d="M18 0H0v18h18z" />
		<path fill="#3ba55c" d="M0 8h14.2l-3.6-3.6L12 3l6 6-6 6-1.4-1.4 3.6-3.6H0" />
	</g>
`;function ss(e={}){return L`<svg ${K(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${os}</svg>`}var cs=R`
	<g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
		<path d="M18 0H0v18h18z" />
		<path fill="#ed4245" d="M3.8 8l3.6-3.6L6 3 0 9l6 6 1.4-1.4L3.8 10H18V8" />
	</g>
`;function ls(e={}){return L`<svg ${K(e)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${cs}</svg>`}var us=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ds=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},fs=(()=>{let e=[B(`discord-system-message`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[];var b=class extends i{static{r=this}static{let x=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({type:String})],c=[V({reflect:!0,attribute:`type`})],d=[V({type:Boolean,reflect:!0,attribute:`channel-name`})],m=[V({type:Boolean,reflect:!0,attribute:`has-thread`})],_=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],us(this,null,a,{kind:`accessor`,name:`timestamp`,static:!1,private:!1,access:{has:e=>`timestamp`in e,get:e=>e.timestamp,set:(e,t)=>{e.timestamp=t}},metadata:x},o,s),us(this,null,c,{kind:`accessor`,name:`type`,static:!1,private:!1,access:{has:e=>`type`in e,get:e=>e.type,set:(e,t)=>{e.type=t}},metadata:x},l,u),us(this,null,d,{kind:`accessor`,name:`channelName`,static:!1,private:!1,access:{has:e=>`channelName`in e,get:e=>e.channelName,set:(e,t)=>{e.channelName=t}},metadata:x},f,p),us(this,null,m,{kind:`accessor`,name:`hasThread`,static:!1,private:!1,access:{has:e=>`hasThread`in e,get:e=>e.hasThread,set:(e,t)=>{e.hasThread=t}},metadata:x},h,g),us(this,null,_,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:x},v,y),us(null,t={value:r},e,{kind:`class`,name:r.name,metadata:x},null,n),b=r=t.value,x&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:x})}static styles=I`
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
	`;#e=ds(this,o,new Date);get timestamp(){return this.#e}set timestamp(e){this.#e=e}#t=(ds(this,s),ds(this,l,`join`));get type(){return this.#t}set type(e){this.#t=e}#n=(ds(this,u),ds(this,f,!1));get channelName(){return this.#n}set channelName(e){this.#n=e}#r=(ds(this,p),ds(this,h,!1));get hasThread(){return this.#r}set hasThread(e){this.#r=e}#i=(ds(this,g),ds(this,v,!1));get lightTheme(){return this.#i}set lightTheme(e){this.#i=e}checkType(){if(typeof this.type!=`string`)throw TypeError("DiscordSystemMessage `type` prop must be a string.");if(![`join`,`leave`,`call`,`missed-call`,`boost`,`edit`,`thread`,`pin`,`alert`,`error`,`upgrade`].includes(this.type))throw RangeError("DiscordSystemMessage `type` prop must be one of: 'join', 'leave', 'call', 'missed-call', 'boost', 'edit', 'thread', 'pin', 'alert', 'upgrade', 'error'")}willUpdate(){this.hasThread=Array.from(this.children).some(e=>e.tagName.toLowerCase()===`discord-thread`)}render(){return this.timestamp=ei(this.timestamp),this.checkType(),L`<div class="discord-message-icon">
				${oa(this.type,[[`join`,()=>ss()],[`leave`,()=>ls()],[`call`,()=>Go()],[`missed-call`,()=>Yo()],[`edit`,()=>qo()],[`boost`,()=>Uo()],[`thread`,()=>as()],[`pin`,()=>Zo()],[`alert`,()=>ts()],[`error`,()=>rs()],[`upgrade`,()=>$o()]])}
			</div>
			<div class="discord-message-content">
				<span>
					<slot></slot>
					<span class="discord-message-timestamp">${this.timestamp}</span>
				</span>
				<slot name="reactions"></slot>
				<slot name="thread"></slot>
			</div>`}constructor(){super(...arguments),ds(this,y)}static{ds(r,n)}};return r})(),ps=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ms=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},hs=(()=>{let e=[B(`discord-tenor-video`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[];var m=class extends i{static{r=this}static{let h=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V({type:Number})],d=[V({type:Number})],ps(this,null,a,{kind:`accessor`,name:`url`,static:!1,private:!1,access:{has:e=>`url`in e,get:e=>e.url,set:(e,t)=>{e.url=t}},metadata:h},o,s),ps(this,null,c,{kind:`accessor`,name:`height`,static:!1,private:!1,access:{has:e=>`height`in e,get:e=>e.height,set:(e,t)=>{e.height=t}},metadata:h},l,u),ps(this,null,d,{kind:`accessor`,name:`width`,static:!1,private:!1,access:{has:e=>`width`in e,get:e=>e.width,set:(e,t)=>{e.width=t}},metadata:h},f,p),ps(null,t={value:r},e,{kind:`class`,name:r.name,metadata:h},null,n),m=r=t.value,h&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:h})}static styles=I`
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
	`;#e=ms(this,o,void 0);get url(){return this.#e}set url(e){this.#e=e}#t=(ms(this,s),ms(this,l,void 0));get height(){return this.#t}set height(e){this.#t=e}#n=(ms(this,u),ms(this,f,void 0));get width(){return this.#n}set width(e){this.#n=e}render(){return L`
			<div class="discord-tenor-video-wrapper" height=${W(this.height)} width=${W(this.width)}>
				<a target="_blank" class="discord-tenor-video-original-link" href=${W(this.url)}> </a>
				<video
					autoplay
					muted
					loop
					preload="auto"
					src=${W(this.url)}
					class="discord-tenor-video"
					height=${W(this.height)}
					width=${W(this.width)}
				></video>
				<div class="discord-tenor-video-image-accessory">
					<div class="discord-tenor-video-gif-tag"></div>
				</div>
			</div>
		`}constructor(){super(...arguments),ms(this,p)}static{ms(r,n)}};return r})(),gs=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},_s=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},vs=(()=>{let e=[B(`discord-thread`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[];var m=class extends i{static{r=this}static{let h=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V()],d=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],gs(this,null,a,{kind:`accessor`,name:`name`,static:!1,private:!1,access:{has:e=>`name`in e,get:e=>e.name,set:(e,t)=>{e.name=t}},metadata:h},o,s),gs(this,null,c,{kind:`accessor`,name:`cta`,static:!1,private:!1,access:{has:e=>`cta`in e,get:e=>e.cta,set:(e,t)=>{e.cta=t}},metadata:h},l,u),gs(this,null,d,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:h},f,p),gs(null,t={value:r},e,{kind:`class`,name:r.name,metadata:h},null,n),m=r=t.value,h&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:h})}static styles=I`
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
	`;#e=_s(this,o,`Thread`);get name(){return this.#e}set name(e){this.#e=e}#t=(_s(this,s),_s(this,l,`See Thread`));get cta(){return this.#t}set cta(e){this.#t=e}#n=(_s(this,u),_s(this,f,!1));get lightTheme(){return this.#n}set lightTheme(e){this.#n=e}render(){return L`
			<div class="discord-thread-top">
				<span class="discord-thread-name">${this.name}</span>
				<span class="discord-thread-cta" aria-hidden="true"> ${this.cta} › </span>
			</div>
			<span class="discord-thread-bottom">
				<slot></slot>
			</span>
		`}constructor(){super(...arguments),_s(this,p)}static{_s(r,n)}};return r})(),ys=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},bs=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},xs=(()=>{let e=[B(`discord-thread-message`)],t,n=[],r,i=z,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[],m,h=[],g=[],_,v=[],y=[],b,x=[],S=[],C,w=[],T=[],E,D=[],O=[],ee,k=[],te=[],ne,A=[],re=[];var ie=class extends i{static{r=this}static{let j=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V()],d=[V()],m=[V({type:Boolean})],_=[V({type:Boolean})],b=[V({type:Boolean})],C=[V({type:Boolean})],E=[V({attribute:`role-color`})],ee=[V({attribute:`relative-timestamp`})],ne=[H({context:q}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],ys(this,null,a,{kind:`accessor`,name:`profile`,static:!1,private:!1,access:{has:e=>`profile`in e,get:e=>e.profile,set:(e,t)=>{e.profile=t}},metadata:j},o,s),ys(this,null,c,{kind:`accessor`,name:`author`,static:!1,private:!1,access:{has:e=>`author`in e,get:e=>e.author,set:(e,t)=>{e.author=t}},metadata:j},l,u),ys(this,null,d,{kind:`accessor`,name:`avatar`,static:!1,private:!1,access:{has:e=>`avatar`in e,get:e=>e.avatar,set:(e,t)=>{e.avatar=t}},metadata:j},f,p),ys(this,null,m,{kind:`accessor`,name:`bot`,static:!1,private:!1,access:{has:e=>`bot`in e,get:e=>e.bot,set:(e,t)=>{e.bot=t}},metadata:j},h,g),ys(this,null,_,{kind:`accessor`,name:`server`,static:!1,private:!1,access:{has:e=>`server`in e,get:e=>e.server,set:(e,t)=>{e.server=t}},metadata:j},v,y),ys(this,null,b,{kind:`accessor`,name:`verified`,static:!1,private:!1,access:{has:e=>`verified`in e,get:e=>e.verified,set:(e,t)=>{e.verified=t}},metadata:j},x,S),ys(this,null,C,{kind:`accessor`,name:`edited`,static:!1,private:!1,access:{has:e=>`edited`in e,get:e=>e.edited,set:(e,t)=>{e.edited=t}},metadata:j},w,T),ys(this,null,E,{kind:`accessor`,name:`roleColor`,static:!1,private:!1,access:{has:e=>`roleColor`in e,get:e=>e.roleColor,set:(e,t)=>{e.roleColor=t}},metadata:j},D,O),ys(this,null,ee,{kind:`accessor`,name:`relativeTimestamp`,static:!1,private:!1,access:{has:e=>`relativeTimestamp`in e,get:e=>e.relativeTimestamp,set:(e,t)=>{e.relativeTimestamp=t}},metadata:j},k,te),ys(this,null,ne,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:j},A,re),ys(null,t={value:r},e,{kind:`class`,name:r.name,metadata:j},null,n),ie=r=t.value,j&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:j})}static styles=I`
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
	`;#e=bs(this,o,void 0);get profile(){return this.#e}set profile(e){this.#e=e}#t=(bs(this,s),bs(this,l,`User`));get author(){return this.#t}set author(e){this.#t=e}#n=(bs(this,u),bs(this,f,void 0));get avatar(){return this.#n}set avatar(e){this.#n=e}#r=(bs(this,p),bs(this,h,!1));get bot(){return this.#r}set bot(e){this.#r=e}#i=(bs(this,g),bs(this,v,!1));get server(){return this.#i}set server(e){this.#i=e}#a=(bs(this,y),bs(this,x,!1));get verified(){return this.#a}set verified(e){this.#a=e}#o=(bs(this,S),bs(this,w,!1));get edited(){return this.#o}set edited(e){this.#o=e}#s=(bs(this,T),bs(this,D,void 0));get roleColor(){return this.#s}set roleColor(e){this.#s=e}#c=(bs(this,O),bs(this,k,`1m ago`));get relativeTimestamp(){return this.#c}set relativeTimestamp(e){this.#c=e}#l=(bs(this,te),bs(this,A,!1));get lightTheme(){return this.#l}set lightTheme(e){this.#l=e}resolveAvatar(e){return $n[e]??e??$n.default}render(){let e={author:this.author,bot:this.bot,verified:this.verified,server:this.server,roleColor:this.roleColor},t=Reflect.get(er,this.profile)??{},n={...e,...t,avatar:this.resolveAvatar(t.avatar??this.avatar)};return L`<img src=${W(n.avatar)} class="discord-thread-message-avatar" alt=${W(n.author)} />
			${G(n.bot&&!n.server,()=>L`<span class="discord-application-tag"> ${n.verified?Vr():null} App </span>`)}
			${G(n.server&&!n.bot,()=>L`<span class="discord-application-tag">Server</span>`)}
			<span class="discord-thread-message-username" style=${qr({color:n.roleColor})}> ${n.author} </span>
			<div class="discord-thread-message-content">
				<slot></slot>
				${G(this.edited,()=>L`<span class="discord-message-edited">(edited)</span>`)}
			</div>
			<span class="discord-thread-message-timestamp">${this.relativeTimestamp}</span>`}constructor(){super(...arguments),bs(this,re)}static{bs(r,n)}};return r})(),Ss=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Cs=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},ws=(()=>{let e=[B(`discord-time`)],t,n=[],r,i=z;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Ss(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}static styles=I`
		:host {
			white-space: nowrap;
			background-color: #ffffff0f;
			border-radius: 3px;
			padding: 0 2px;
		}
	`;render(){return L`<slot></slot>`}static{Cs(r,n)}};return r})(),Ts=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Es=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ds=(()=>{let e=[B(`discord-underlined`)],t,n=[],r,i=z;var a=class extends i{static{r=this}static{let o=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;Ts(null,t={value:r},e,{kind:`class`,name:r.name,metadata:o},null,n),a=r=t.value,o&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o}),Es(r,n)}render(){return L`
			<u>
				<slot></slot>
			</u>
		`}};return r})(),Os=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},ks=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},As=(()=>{let e=[B(`discord-unordered-list`)],t,n=[],r,i=z,a,o=[],s=[];var c=class extends i{static{r=this}static{let l=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V({type:Boolean,reflect:!0})],Os(this,null,a,{kind:`accessor`,name:`nested`,static:!1,private:!1,access:{has:e=>`nested`in e,get:e=>e.nested,set:(e,t)=>{e.nested=t}},metadata:l},o,s),Os(null,t={value:r},e,{kind:`class`,name:r.name,metadata:l},null,n),c=r=t.value,l&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:l})}static styles=I`
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
	`;#e=ks(this,o,!1);get nested(){return this.#e}set nested(e){this.#e=e}checkChildren(){if(!Array.from(this.children).every(e=>{let t=e.tagName.toLowerCase();return t===`discord-list-item`||t===`discord-unordered-list`||t===`discord-ordered-list`}))throw new Jr(`All direct children inside of a <discord-unordered-list> components must be one of <discord-unordered-list>, <discord-ordered-list>, or <discord-list-item>.`)}willUpdate(){(this.parentElement?.tagName.toLowerCase()===`discord-unordered-list`||this.parentElement?.tagName.toLowerCase()===`discord-ordered-list`)&&(this.nested=!0)}render(){return this.checkChildren(),L`<ul>
			<slot></slot>
		</ul>`}constructor(){super(...arguments),ks(this,s)}static{ks(r,n)}};return r})(),js=R`
	<path fill="currentColor" d="M4 6c0-1.1.9-2 2-2h3a1 1 0 0 0 0-2H6a4 4 0 0 0-4 4v3a1 1 0 0 0 2 0V6ZM4 18c0 1.1.9 2 2 2h3a1 1 0 1 1 0 2H6a4 4 0 0 1-4-4v-3a1 1 0 1 1 2 0v3ZM18 4a2 2 0 0 1 2 2v3a1 1 0 1 0 2 0V6a4 4 0 0 0-4-4h-3a1 1 0 1 0 0 2h3ZM20 18a2 2 0 0 1-2 2h-3a1 1 0 1 0 0 2h3a4 4 0 0 0 4-4v-3a1 1 0 1 0-2 0v3Z"></path>
`;function Ms(e={}){return L`<svg ${K(e)} aria-hidden="true" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">${js}</svg>`}var Ns=R`
	<path fill="currentColor" d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H6ZM15 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3Z"></path>
`;function Ps(e={}){return L`<svg ${K(e)} aria-hidden="true" role="img" width="16" height="16" fill="none" viewBox="0 0 24 24">${Ns}</svg>`}var Fs=function(e,t,n,r,i,a){function o(e){if(e!==void 0&&typeof e!=`function`)throw TypeError(`Function expected`);return e}for(var s=r.kind,c=s===`getter`?`get`:s===`setter`?`set`:`value`,l=!t&&e?r.static?e:e.prototype:null,u=t||(l?Object.getOwnPropertyDescriptor(l,r.name):{}),d,f=!1,p=n.length-1;p>=0;p--){var m={};for(var h in r)m[h]=h===`access`?{}:r[h];for(var h in r.access)m.access[h]=r.access[h];m.addInitializer=function(e){if(f)throw TypeError(`Cannot add initializers after decoration has completed`);a.push(o(e||null))};var g=(0,n[p])(s===`accessor`?{get:u.get,set:u.set}:u[c],m);if(s===`accessor`){if(g===void 0)continue;if(typeof g!=`object`||!g)throw TypeError(`Object expected`);(d=o(g.get))&&(u.get=d),(d=o(g.set))&&(u.set=d),(d=o(g.init))&&i.unshift(d)}else(d=o(g))&&(s===`field`?i.unshift(d):u[c]=d)}l&&Object.defineProperty(l,r.name,u),f=!0},Is=function(e,t,n){for(var r=arguments.length>2,i=0;i<t.length;i++)n=r?t[i].call(e,n):t[i].call(e);return r?n:void 0},Ls=(()=>{let e=[B(`discord-video-attachment`)],t,n=[],r,i=rn,a,o=[],s=[],c,l=[],u=[],d,f=[],p=[];var m=class extends i{static{r=this}static{let h=typeof Symbol==`function`&&Symbol.metadata?Object.create(i[Symbol.metadata]??null):void 0;a=[V()],c=[V()],d=[H({context:q,subscribe:!0}),V({type:Boolean,reflect:!0,attribute:`light-theme`})],Fs(this,null,a,{kind:`accessor`,name:`href`,static:!1,private:!1,access:{has:e=>`href`in e,get:e=>e.href,set:(e,t)=>{e.href=t}},metadata:h},o,s),Fs(this,null,c,{kind:`accessor`,name:`poster`,static:!1,private:!1,access:{has:e=>`poster`in e,get:e=>e.poster,set:(e,t)=>{e.poster=t}},metadata:h},l,u),Fs(this,null,d,{kind:`accessor`,name:`lightTheme`,static:!1,private:!1,access:{has:e=>`lightTheme`in e,get:e=>e.lightTheme,set:(e,t)=>{e.lightTheme=t}},metadata:h},f,p),Fs(null,t={value:r},e,{kind:`class`,name:r.name,metadata:h},null,n),m=r=t.value,h&&Object.defineProperty(r,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:h})}static styles=[on,an,en,I`
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
		`];#e=Is(this,o,void 0);get href(){return this.#e}set href(e){this.#e=e}#t=(Is(this,s),Is(this,l,void 0));get poster(){return this.#t}set poster(e){this.#t=e}#n=(Is(this,u),Is(this,f,!1));get lightTheme(){return this.#n}set lightTheme(e){this.#n=e}playPausePopAnimationContainerRef=(Is(this,p),Xt());async handleFullScreenClicked(){this.mediaComponentRef.value&&await this.mediaComponentRef.value.requestFullscreen()}handleHasStartedPlayingOrHasPaused(){this.playPausePopAnimationContainerRef.value&&this.playPausePopAnimationContainerRef.value.classList.add(`discord-video-attachment-overlay-content-hidden`),globalThis.setTimeout(()=>{this.playPausePopAnimationContainerRef.value&&this.playPausePopAnimationContainerRef.value.classList.remove(`discord-video-attachment-overlay-content-hidden`)},200)}render(){return L`<div class="discord-media-attachment-non-visual-media-item-container">
			<div class="discord-video-attachment-one-by-one-grid">
				<div class="discord-media-attachment-mosaic-item-media">
					<div class="discord-video-attachment-image-wrapper">
						<div class="discord-video-attachment-loading-overlay">
							<div
								class=${U({"discord-video-attachment-wrapper":!0,"discord-video-attachment-wrapper-light-theme":this.lightTheme})}
							>
								<video
									${$t(this.mediaComponentRef)}
									class="discord-video-attachment-video-container"
									playsinline
									height="315"
									preload="metadata"
									width="550"
									role="button"
									poster=${W(this.poster)}
									@play=${this.handleHasStartedPlayingOrHasPaused}
									@pause=${this.handleHasStartedPlayingOrHasPaused}
									@progress=${this.displayBufferedAmount}
									@click=${this.handleClickPlayPauseIcon}
									@ended=${this.handleEnded}
								>
									<source src=${W(this.href)} />
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
											${G(this.hasEnded,()=>Ar({class:`discord-media-attachment-control-icon`}),()=>G(this.isPlaying,()=>Er({class:`discord-media-attachment-control-icon`}),()=>Or({class:`discord-media-attachment-control-icon`})))}
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
													${$t(this.seekSliderRef)}
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
												<div ${$t(this.volumeControlRef)} class="discord-media-attachment-button-slider">
													<div
														class="discord-media-attachment-volume-vertical"
														@mouseenter=${this.handleVolumeVerticalEnter}
														@mouseleave=${this.handleVolumeVerticalLeave}
													>
														<input
															${$t(this.volumeControlInputRef)}
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
														${G(this.currentVolume===0||this.isMuted,()=>Ir({class:`discord-media-attachment-button-control-icon`}),()=>G(this.currentVolume<=.5,()=>Pr({class:`discord-media-attachment-button-control-icon`}),()=>Mr({class:`discord-media-attachment-button-control-icon`})))}
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
													${Ms({class:`discord-media-attachment-button-control-icon`})}
												</div>
											</button>
										</div>
									</div>
								</div>
								<div class="discord-video-attachment-play-pause-pop">
									${Ps({class:`discord-video-attachment-play-pause-pop-icon`})}
								</div>
								<div ${$t(this.playPausePopAnimationContainerRef)}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="discord-button-download-attachment">
				<a
					class="discord-link-download-attachment"
					aria-label="Download"
					href="${W(this.href)}"
					rel="noreferrer noopener"
					target="_blank"
					role="button"
					tabindex="0"
				>
					${wr()}
				</a>
			</div>
		</div>`}static{Is(r,n)}};return r})(),Rs=new Set([`children`,`localName`,`ref`,`style`,`className`]),zs=new WeakMap,Bs=(e,t,n,r,i)=>{let a=i?.[t];a===void 0?(e[t]=n,n==null&&t in HTMLElement.prototype&&e.removeAttribute(t)):n!==r&&((e,t,n)=>{let r=zs.get(e);r===void 0&&zs.set(e,r=new Map);let i=r.get(t);n===void 0?i!==void 0&&(r.delete(t),e.removeEventListener(t,i)):i===void 0?(r.set(t,i={handleEvent:n}),e.addEventListener(t,i)):i.handleEvent=n})(e,a,n)},Vs=({react:e,tagName:t,elementClass:n,events:r,displayName:i})=>{let a=new Set(Object.keys(r??{})),o=e.forwardRef(((i,o)=>{let s=e.useRef(new Map),c=e.useRef(null),l={},u={};for(let[e,t]of Object.entries(i))Rs.has(e)?l[e===`className`?`class`:e]=t:a.has(e)||e in n.prototype?u[e]=t:l[e]=t;return e.useLayoutEffect((()=>{if(c.current===null)return;let e=new Map;for(let t in u)Bs(c.current,t,i[t],s.current.get(t),r),s.current.delete(t),e.set(t,i[t]);for(let[e,t]of s.current)Bs(c.current,e,void 0,t,r);s.current=e})),e.useLayoutEffect((()=>{c.current?.removeAttribute(`defer-hydration`)}),[]),l.suppressHydrationWarning=!0,e.createElement(t,{...l,ref:e.useCallback((e=>{c.current=e,typeof o==`function`?o(e):o!==null&&(o.current=e)}),[o])})}));return o.displayName=i??n.name,o},Hs=Object.defineProperty,Us=(e,t)=>Hs(e,`name`,{value:t,configurable:!0});function Q(e,t){return Vs({tagName:e,elementClass:t,react:P.default})}Us(Q,`createReactComponent`),Q(`discord-action-row`,Dt);var Ws=Q(`discord-attachments`,At);Q(`discord-audio-attachment`,zr),Q(`discord-author-info`,si);var Gs=Q(`discord-bold`,ui);Q(`discord-button`,hi);var Ks=Q(`discord-code`,vi);Q(`discord-command`,Ii);var qs=Q(`discord-custom-emoji`,zi),Js=Q(`discord-embed`,Hi),Ys=Q(`discord-embed-description`,Gi),Xs=Q(`discord-embed-field`,Ji),Zs=Q(`discord-embed-fields`,Zi),Qs=Q(`discord-embed-footer`,ea),$s=Q(`discord-file-attachment`,aa);Q(`discord-header`,la);var ec=Q(`discord-image-attachment`,fa);Q(`discord-input-text`,ha),Q(`discord-invite`,wa);var tc=Q(`discord-italic`,Da);Q(`discord-link`,Sr),Q(`discord-list-item`,Aa);var nc=Q(`discord-mention`,Ka),rc=Q(`discord-message`,Xa),ic=Q(`discord-messages`,yr);Q(`discord-modal`,ro),Q(`discord-ordered-list`,oo),Q(`discord-poll`,mo),Q(`discord-poll-answer`,_o);var ac=Q(`discord-pre`,bo),oc=Q(`discord-quote`,Co),sc=Q(`discord-reaction`,Eo),cc=Q(`discord-reactions`,ko),lc=Q(`discord-reply`,Ei),uc=Q(`discord-spoiler`,Mo);Q(`discord-string-select-menu`,Fo),Q(`discord-string-select-menu-option`,Ro),Q(`discord-subscript`,Vo),Q(`discord-system-message`,fs),Q(`discord-tenor-video`,hs),Q(`discord-thread`,vs),Q(`discord-thread-message`,xs);var dc=Q(`discord-time`,ws),fc=Q(`discord-underlined`,Ds);Q(`discord-unordered-list`,As),Q(`discord-verified-author-tag`,Wr),Q(`discord-video-attachment`,Ls);var $=e();function pc(e){if(typeof e==`string`)try{let t=new URL(e);return[`https:`,`http:`].includes(t.protocol)&&!t.username&&!t.password?t.href:void 0}catch{return}}function mc(e){return`https://cdn.discordapp.com/embed/avatars/${/^\d+$/.test(e)?Number((BigInt(e)>>22n)%6n):0}.png`}function hc(e,t,n){return e.map((e,r)=>{let i=Array.isArray(e.content)?hc(e.content,t,n):String(e.content??``),a=i;switch(e.type){case`strong`:a=(0,$.jsx)(Gs,{children:i});break;case`em`:a=(0,$.jsx)(tc,{children:i});break;case`underline`:a=(0,$.jsx)(fc,{children:i});break;case`strikethrough`:a=(0,$.jsx)(`s`,{children:i});break;case`spoiler`:a=(0,$.jsx)(uc,{children:i});break;case`inlineCode`:a=(0,$.jsx)(Ks,{children:i});break;case`codeBlock`:a=(0,$.jsx)(ac,{children:i});break;case`blockQuote`:a=(0,$.jsx)(oc,{children:i});break;case`br`:a=(0,$.jsx)(`br`,{});break;case`heading`:a=(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(Gs,{children:i}),(0,$.jsx)(`br`,{})]});break;case`user`:a=(0,$.jsx)(nc,{children:n?.users[String(e.id)]||t.get(String(e.id))||String(e.id)});break;case`role`:a=(0,$.jsx)(nc,{type:`role`,color:n?.roleColors?.[String(e.id)],children:n?.roles[String(e.id)]||String(e.id)});break;case`channel`:a=(0,$.jsx)(nc,{type:`channel`,children:String(e.id)});break;case`everyone`:case`here`:a=(0,$.jsx)(nc,{children:e.type});break;case`link`:case`url`:case`autolink`:{let t=pc(e.target);a=t?(0,$.jsx)(`a`,{href:t,target:`_blank`,rel:`noopener noreferrer`,className:`ticket-chat-link`,children:i}):i;break}case`emoji`:{let t=String(e.id);a=/^\d{16,22}$/.test(t)?(0,$.jsx)(qs,{name:String(e.name),url:`https://cdn.discordapp.com/emojis/${t}.${e.animated?`gif`:`png`}`}):i;break}case`timestamp`:{let t=new Date(Number(e.timestamp)*1e3);a=Number.isNaN(t.getTime())?String(e.timestamp):(0,$.jsx)(dc,{title:t.toLocaleString(),children:t.toLocaleString()});break}}return(0,$.jsx)(P.Fragment,{children:a},r)})}function gc({content:e,authors:t,mentions:n}){let r=(0,P.useMemo)(()=>(0,F.parse)(e,`extended`),[e]);return(0,$.jsx)($.Fragment,{children:hc(r,t,n)})}var _c=(0,P.memo)(function({message:e,previous:t,authors:n,mentions:r,pending:i=!1}){let a=t?.authorId===e.authorId&&t.webhookId===e.webhookId&&t.bot===e.bot&&!e.replyTo&&e.createdAt-t.createdAt<3e5&&new Date(t.createdAt).toDateString()===new Date(e.createdAt).toDateString();return(0,$.jsxs)(rc,{author:e.authorName||`Unknown user`,avatar:pc(e.authorAvatarUrl)||mc(e.authorId),bot:!!e.bot,roleColor:/^#[0-9a-f]{6}$/i.test(e.authorRoleColor||``)?e.authorRoleColor:void 0,"data-message-id":i?void 0:e.id,style:a?{marginTop:0}:void 0,title:new Date(e.createdAt).toLocaleString(`en-GB`),timestamp:new Date(e.createdAt).toLocaleTimeString(`en`,{hour:`numeric`,minute:`2-digit`}),edited:!!e.editedAt,messageBodyOnly:a,children:[e.replyTo&&(0,$.jsx)(lc,{slot:`reply`,author:e.replyTo.authorName,avatar:pc(e.replyTo.authorAvatarUrl)||mc(e.replyTo.authorId),roleColor:`var(--chat-reply-author)`,bot:!!e.replyTo.bot,children:(0,$.jsx)(gc,{content:e.replyTo.content,authors:n,mentions:r})}),(0,$.jsx)(gc,{content:e.content,authors:n,mentions:r}),!!e.attachments.length&&(0,$.jsx)(Ws,{slot:`attachments`,children:e.attachments.map((e,t)=>{let n=pc(e.url);return n?e.contentType?.startsWith(`image/`)||/\.(png|jpe?g|gif|webp)(\?|$)/i.test(n)?(0,$.jsx)(ec,{customImageElement:!0,className:`ticket-chat-attachment`,children:(0,$.jsx)(`a`,{href:n,target:`_blank`,rel:`noopener noreferrer`,className:`ticket-chat-image`,"aria-label":`Open attachment: ${e.name}`,children:(0,$.jsx)(`img`,{src:n,alt:e.name,loading:`lazy`})})},t):(0,$.jsx)($s,{name:e.name,href:n,bytes:e.size||0,target:`_blank`,rel:`noopener noreferrer`},t):(0,$.jsx)(`span`,{children:e.name},t)})}),e.embeds?.map((e,t)=>(0,$.jsxs)(Js,{slot:`embeds`,embedTitle:e.title||``,url:pc(e.url),color:typeof e.color==`number`?`#${e.color.toString(16).padStart(6,`0`)}`:void 0,image:pc(e.image),thumbnail:pc(e.thumbnail),authorName:e.author?.name,authorUrl:pc(e.author?.url),authorImage:pc(e.author?.iconUrl),children:[e.description&&(0,$.jsx)(Ys,{slot:`description`,children:(0,$.jsx)(gc,{content:e.description,authors:n,mentions:r})}),!!e.fields?.length&&(0,$.jsx)(Zs,{slot:`fields`,children:e.fields.map((e,t)=>(0,$.jsx)(Xs,{fieldTitle:e.name,inline:!!e.inline,children:(0,$.jsx)(gc,{content:e.value,authors:n,mentions:r})},t))}),e.footer&&(0,$.jsx)(Qs,{slot:`footer`,footerImage:pc(e.footer.iconUrl),children:e.footer.text})]},t)),!!e.reactions?.length&&(0,$.jsx)(cc,{slot:`reactions`,children:e.reactions.map((e,t)=>(0,$.jsx)(sc,{name:e.emoji,emoji:e.emoji,count:e.count,reacted:!!e.reacted,interactive:!1},t))})]})});function vc({ticket:e,session:t,messages:n,onRead:i,onUnauthorized:u,hasOlder:d,loadingOlder:p,onLoadOlder:h,historyError:_,refreshing:v,onReady:y,mentions:b}){let[x,S]=(0,P.useState)(()=>!window.matchMedia(`(prefers-color-scheme: dark)`).matches),[C,w]=(0,P.useState)(null),[T,E]=(0,P.useState)(``),[D,O]=(0,P.useState)(!1),[ee,k]=(0,P.useState)(``),[te,ne]=(0,P.useState)([]),[A,re]=(0,P.useState)(!1),[ie]=(0,P.useState)(()=>e.unread?{at:e.teamReadAt||0,id:e.teamReadMessageId}:null),j=(0,P.useRef)(null),ae=(0,P.useRef)(null),M=(0,P.useRef)(null),oe=(0,P.useRef)(!0),se=(0,P.useRef)(null),ce=(0,P.useRef)(null),N=(0,P.useRef)(``),le=(0,P.useRef)(!1),F=ie?n.findIndex(e=>e.createdAt>ie.at||e.createdAt===ie.at&&ie.id!=null&&BigInt(e.id)>BigInt(ie.id)):-1,ue=n.at(-1),de=(0,P.useRef)(ue?.id),fe=(0,P.useMemo)(()=>new Map(n.map(e=>[e.authorId,e.authorName])),[n]),pe=e=>n.some(n=>e.serverMessageId&&n.id===e.serverMessageId||(n.clientNonce===e.nonce||e.previousNonces.includes(n.clientNonce||``))&&n.authorId===t.user.id),me=te.filter(e=>!pe(e));function he(e){ne(t=>e(t.filter(e=>!pe(e))))}let I=(0,P.useCallback)(()=>{let e=j.current;if(e){if(oe.current)e.scrollTop=e.scrollHeight;else if(se.current){let t=e.querySelector(`[data-message-id="${se.current.id}"]`);t&&(e.scrollTop+=t.getBoundingClientRect().top-e.getBoundingClientRect().top-se.current.top)}ce.current=e.scrollTop}},[]);function ge(){let e=j.current;if(!e)return;if(ce.current===e.scrollTop){ce.current=null;return}if(ce.current=null,oe.current=e.scrollHeight-e.scrollTop-e.clientHeight<32,oe.current){se.current=null,re(!1);return}re(!0);let t=e.getBoundingClientRect().top,n=[...e.querySelectorAll(`[data-message-id]`)].find(e=>e.getBoundingClientRect().bottom>t);se.current=n?{id:n.dataset.messageId,top:n.getBoundingClientRect().top-t}:null,e.scrollTop<80&&d&&!p&&!_&&h()}(0,P.useEffect)(()=>{let e=window.matchMedia(`(prefers-color-scheme: dark)`),t=()=>S(!e.matches);return e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]),(0,P.useEffect)(()=>{let e=requestAnimationFrame(()=>w(x));return()=>cancelAnimationFrame(e)},[x]),(0,P.useLayoutEffect)(()=>{I()},[n,te,C,I]),(0,P.useEffect)(()=>{if(C!==x||!y)return;let e=0,t=requestAnimationFrame(()=>{e=requestAnimationFrame(y)});return()=>{cancelAnimationFrame(t),cancelAnimationFrame(e)}},[C,x,y]),(0,P.useEffect)(()=>{let e=de.current;de.current=ue?.id,e&&e!==ue?.id&&!oe.current&&re(!0)},[ue?.id]),(0,P.useEffect)(()=>{let e=j.current?.querySelector(`discord-messages`);if(!e)return;let t=new ResizeObserver(I);return t.observe(e),j.current&&t.observe(j.current),()=>t.disconnect()},[x,I]),(0,P.useEffect)(()=>{let e=M.current;if(!e||C!==x||!ue)return;let t=!1,n=()=>{t&&document.visibilityState===`visible`&&N.current!==ue.id&&(N.current=ue.id,i({messageAt:ue.createdAt,messageId:ue.id}).catch(e=>{N.current=``,k(e instanceof Error?e.message:`Unable to mark this conversation as read.`)}))},r=new IntersectionObserver(([e])=>{t=e.isIntersecting,n()});return r.observe(e),document.addEventListener(`visibilitychange`,n),()=>{r.disconnect(),document.removeEventListener(`visibilitychange`,n)}},[ue,i,C,x]);async function _e(r,i){let a=T,s=r===`requester`?`I have an update on this request. Could you take another look?`:(i?.content??a).trim();if(!s||le.current||e.status!==`open`)return;if(r===`staff`&&!i){let e=me.find(e=>e.state===`failed`&&e.message.content===s);e&&(i={key:e.key,content:e.message.content})}le.current=!0,O(!0),k(``);let l;if(r===`staff`&&t.capabilities.replyClientNonce){l=crypto.randomUUID();let e={id:`pending:`+l,authorId:t.user.id,authorName:t.user.displayName||t.user.username,authorAvatarUrl:t.user.avatarUrl,content:s,createdAt:Date.now(),editedAt:null,bot:!0,attachments:[]};he(t=>i?t.map(t=>t.key===i.key?{...t,previousNonces:[...t.previousNonces,t.nonce],nonce:l,message:e,state:`sending`,serverMessageId:void 0,error:void 0}:t):[...t,{key:l,nonce:l,previousNonces:[],message:e,state:`sending`}]),oe.current=!0,se.current=null,re(!1),I()}let d=document.activeElement;try{let i=r===`staff`?`/api/tickets/`+encodeURIComponent(e.threadId)+`/reply`:`/api/mock/tickets/`+encodeURIComponent(e.threadId)+`/messages`,o=await c(i,t.csrfToken,r===`staff`?{content:s,clientNonce:l}:{content:s,sender:r});if(r===`staff`){let e=o.messageId;n.some(n=>n.id===e||l&&n.clientNonce===l&&n.authorId===t.user.id)?he(e=>e.filter(e=>e.nonce!==l)):he(t=>t.map(t=>t.nonce===l?{...t,message:{...t.message,id:e},state:`sent`,serverMessageId:e}:t)),l||(oe.current=!0,se.current=null,re(!1),I()),E(e=>e===a&&a.trim()===s?``:e),document.activeElement===d&&(d===ae.current||d?.getAttribute(`aria-label`)===`Send message`)&&ae.current?.focus({preventScroll:!0})}}catch(e){e instanceof o&&[401,403].includes(e.status)&&u();let t=e instanceof Error?e.message:`Unable to send the message.`;r===`staff`&&l?he(e=>e.map(e=>e.nonce===l?{...e,state:`failed`,error:t}:e)):k(t+` Your draft has been kept.`)}finally{le.current=!1,O(!1)}}return(0,$.jsxs)(`div`,{className:`ticket-chat`,"data-theme":x?`light`:`dark`,children:[(0,$.jsxs)(`header`,{className:`ticket-chat-header`,children:[(0,$.jsxs)(`div`,{className:`flex min-w-0 items-center gap-2`,children:[(0,$.jsx)(m,{className:`size-5 shrink-0`,"aria-hidden":`true`}),e.parentName&&(0,$.jsxs)(`span`,{className:`hidden min-w-0 items-center gap-2 text-sm sm:inline-flex`,children:[(0,$.jsx)(`span`,{className:`truncate`,children:e.parentName}),(0,$.jsx)(f,{className:`size-4 shrink-0`,"aria-hidden":`true`})]}),(0,$.jsx)(`h2`,{className:`truncate font-semibold`,children:e.name||e.openerName||`private-ticket`})]}),(0,$.jsxs)(`div`,{className:`flex shrink-0 items-center gap-2`,children:[v&&(0,$.jsx)(`span`,{role:`status`,className:`whitespace-nowrap text-xs`,children:`Refreshing messages…`}),t.capabilities.mockChat&&(0,$.jsx)(a,{type:`button`,variant:`ghost`,size:`sm`,className:`ticket-chat-control shrink-0`,disabled:D||e.status!==`open`,onClick:()=>void _e(`requester`),children:`Simulate incoming`})]})]}),(0,$.jsxs)(`div`,{className:`relative flex min-h-0 flex-1 flex-col`,children:[(0,$.jsxs)(`div`,{ref:j,className:`ticket-chat-scroll`,role:`region`,"aria-label":`Ticket conversation`,tabIndex:0,onScroll:ge,children:[(0,$.jsx)(ic,{lightTheme:x,className:`ticket-chat-transcript`,children:C===x&&(0,$.jsxs)($.Fragment,{children:[d&&(0,$.jsx)(`div`,{className:`px-4 py-2`,children:(0,$.jsx)(a,{variant:`ghost`,size:`sm`,className:`ticket-chat-control`,disabled:p,onClick:()=>{ge(),h()},children:p?`Loading older messages…`:`Load older messages`})}),n.map((e,t)=>{let r=n[t-1],i=new Date(e.createdAt).toDateString(),a=!r||new Date(r.createdAt).toDateString()!==i,o=t===F&&(t>0||!d);return(0,$.jsxs)(P.Fragment,{children:[(a||o)&&(0,$.jsxs)(`div`,{className:`ticket-chat-date ${o?`ticket-chat-unread`:``}`,role:`separator`,"aria-label":o?`New messages`:void 0,children:[(0,$.jsx)(`span`,{children:a?new Date(e.createdAt).toLocaleDateString(`en`,{day:`numeric`,month:`long`,year:`numeric`}):`New messages`}),o&&(0,$.jsx)(`span`,{className:`ticket-chat-unread-label`,"aria-hidden":`true`,children:`NEW`})]}),(0,$.jsx)(_c,{message:e,previous:o?void 0:r,authors:fe,mentions:b})]},e.id)}),me.map(t=>(0,$.jsxs)(`div`,{"data-pending-message":t.key,style:{opacity:.55},children:[(0,$.jsx)(_c,{message:t.message,authors:fe,mentions:b,pending:!0}),(0,$.jsxs)(`div`,{className:`flex items-center gap-2 px-16 text-xs`,children:[(0,$.jsx)(`span`,{role:`status`,children:t.state===`sending`?`Sending…`:t.state===`sent`?`Sent`:`Failed to send: `+(t.error||`Unknown error.`)}),t.state===`failed`&&(0,$.jsx)(a,{type:`button`,variant:`ghost`,size:`sm`,className:`ticket-chat-control`,disabled:D||e.status!==`open`,onClick:()=>void _e(`staff`,{key:t.key,content:t.message.content}),children:`Retry`})]})]},t.key)),!n.length&&!me.length&&(0,$.jsx)(`p`,{className:`p-6`,children:`This is the beginning of this ticket conversation.`})]})},x?`light`:`dark`),(0,$.jsx)(`div`,{ref:M,className:`h-px`})]}),A&&(0,$.jsxs)(a,{className:`ticket-chat-new`,size:`sm`,onClick:()=>{oe.current=!0,se.current=null,I(),re(!1)},children:[(0,$.jsx)(`span`,{className:`hidden sm:inline`,children:`You’re viewing older messages`}),(0,$.jsx)(`span`,{children:`Jump to present`})]}),(ee||_)&&(0,$.jsx)(s,{variant:`destructive`,className:`absolute inset-x-3 bottom-3 z-10 w-auto`,children:(0,$.jsx)(r,{children:ee||_})})]}),t.capabilities.canReply?(0,$.jsxs)(`form`,{className:`ticket-chat-composer`,onSubmit:e=>{e.preventDefault(),_e(`staff`)},children:[(0,$.jsxs)(`div`,{className:`ticket-chat-input-row`,children:[(0,$.jsx)(`label`,{htmlFor:`mock-message`,className:`sr-only`,children:`Message`}),(0,$.jsx)(l,{ref:ae,id:`mock-message`,className:`ticket-chat-input`,placeholder:e.status===`open`?`Message #${e.name||e.openerName||`private-ticket`}`:`This ticket is closed`,value:T,maxLength:2e3,disabled:e.status!==`open`,onChange:e=>E(e.target.value),onKeyDown:e=>{e.key!==`Enter`||e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||e.nativeEvent.isComposing||(e.preventDefault(),le.current||e.currentTarget.form?.requestSubmit())}}),(0,$.jsx)(a,{"aria-label":`Send message`,title:`Send message`,type:`submit`,variant:`ghost`,size:`icon`,className:`ticket-chat-control shrink-0 self-end`,disabled:D||!T.trim()||e.status!==`open`,children:(0,$.jsx)(g,{className:`size-5`})})]}),(0,$.jsxs)(`div`,{className:`ticket-chat-hint`,children:[(0,$.jsx)(`span`,{role:`status`,children:D?`Sending…`:`Enter to send · Shift+Enter for a new line`}),(0,$.jsx)(`span`,{children:t.capabilities.mockChat?`Local mock`:`Your Discord profile`})]})]}):(0,$.jsx)(`p`,{className:`ticket-chat-readonly`,children:`Read-only conversation · Reply in Discord`})]})}export{vc as TicketConversation};