(this.webpackJsonpkeyword=this.webpackJsonpkeyword||[]).push([[0],{101:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(14),c=a.n(i),s=(a(76),a(50)),l=a.n(s),o=a(58),d=a(23),u=(a(78),a(34)),h=a(63),b=a(59),m=a.n(b),j=a(123),p=a(27),x=a(131),g=a(124),f=a(132),O=a(125),y=a(3);function v(e){var t=e.children,a=e.value,n=e.index,r=Object(h.a)(e,["children","value","index"]);return Object(y.jsx)("div",Object(u.a)(Object(u.a)({role:"tabpanel",hidden:a!==n,id:"full-width-tabpanel-".concat(n),"aria-labelledby":"full-width-tab-".concat(n)},r),{},{children:a===n&&Object(y.jsx)(x.a,{p:3,children:t})}))}var w=Object(j.a)((function(e){return{root:{backgroundColor:"#1b212c",width:"100%"}}}));function k(e){var t=w(),a=Object(p.a)(),n=r.a.useState(0),i=Object(d.a)(n,2),c=i[0],s=i[1];return Object(y.jsxs)("div",{className:t.root,children:[Object(y.jsx)(g.a,{position:"static",style:{background:"#373c45"},children:Object(y.jsx)(f.a,{value:c,onChange:function(e,t){s(t)},indicatorColor:"primary",textColor:"primary",variant:"fullWidth","aria-label":"full width tabs example",children:e.inner.map((function(e,t){return Object(y.jsx)(O.a,Object(u.a)(Object(u.a)({label:e.label},{id:"full-width-tab-".concat(a=t),"aria-controls":"full-width-tabpanel-".concat(a)}),{},{style:{color:"#FFF"}}),t);var a}))})}),Object(y.jsx)(m.a,{axis:"rtl"===a.direction?"x-reverse":"x",index:c,onChangeIndex:function(e){s(e)},children:e.inner.map((function(e,t){return Object(y.jsx)(v,{value:c,index:t,dir:a.direction,children:e.component},t)}))})]})}var C=a(126),I=a(103),A=a(136),N=Object(j.a)((function(e){return{root:{id:"chipContainer",width:"100%",background:"none",boxShadow:"none",display:"flex",justifyContent:"center",flexWrap:"wrap",listStyle:"none",padding:e.spacing(.5),margin:0},chip:{margin:e.spacing(.5)}}}));function T(e){var t=N();return 0==e.chipData.length?Object(y.jsx)(C.a,{style:{color:"#AAA"},children:" Results appear here "}):Object(y.jsx)(I.a,{component:"ul",className:t.root,children:e.chipData.map((function(a){return Object(y.jsx)("li",{children:Object(y.jsx)(A.a,{icon:undefined,label:a.label,onDelete:e.handleDelete(a),className:t.chip})},a.key)}))})}var B=a.p+"static/media/github-svgrepo-com.f3a72930.svg",S=a(61),D=a.n(S),E=a(62),R=a.n(E),L=a(5),F=a(128),M=a(130),P=a(133),q=a(135),V=a(129),Y=a(127),z=a(137),J=a(134),W=Object(j.a)({root:{width:"80%",marginLeft:"auto",marginRight:"auto",display:"inline-block"},label:{fontSize:"0.6em"},input:{width:42,color:"#AAA",borderBottom:"1px solid #AAA !important"}});function U(e){var t=W(),a=r.a.useState(e.val),n=Object(d.a)(a,2),i=n[0],c=n[1];return Object(y.jsx)("div",{className:t.root,children:Object(y.jsxs)(Y.a,{container:!0,spacing:2,alignItems:"center",children:[Object(y.jsx)(Y.a,{item:!0,className:t.label,children:e.label}),Object(y.jsx)(Y.a,{item:!0,xs:!0,children:Object(y.jsx)(z.a,{className:t.slider,value:"number"===typeof i?i:0,onChange:function(e,t){c(t)},"aria-labelledby":"input-slider",min:e.min,max:e.max})}),Object(y.jsx)(Y.a,{item:!0,children:Object(y.jsx)(J.a,{className:t.input,value:i,margin:"dense",onChange:function(e){c(""===e.target.value?"":Number(e.target.value))},onBlur:function(){i<e.min?c(e.min):i>e.max&&c(e.max)},id:e.id,inputProps:{step:1,min:e.min,max:e.max,type:"number","aria-labelledby":"input-slider"}})})]})})}var X="https://keyword.bitgnd.com/generate",G="#373c45",H="#1b212c",K=Object(L.a)({root:{background:"#718dbd","&:hover":{backgroundColor:"#5572a5"},color:"white",height:48,padding:"0 30px",margin:"2em 2em 2em 2em"}})(F.a);var Q=function(){var e=r.a.useState([]),t=Object(d.a)(e,2),a=t[0],n=t[1],i=r.a.useState(" "),c=Object(d.a)(i,2),s=c[0],u=c[1];return Object(y.jsx)("div",{className:"App",children:Object(y.jsxs)("header",{className:"App-header",children:[Object(y.jsxs)("h1",{style:{margin:"1em 0 0.5em 0",fontSize:"1.2em"},children:["Extract ",Object(y.jsx)("code",{style:{color:"#718dbd"},children:"keywords"})," from text documents!"]}),Object(y.jsxs)("div",{children:[Object(y.jsxs)(P.a,{style:{backgroundColor:H},children:[Object(y.jsx)(q.a,{style:{backgroundColor:G},children:Object(y.jsx)(C.a,{style:{marginLeft:"auto",marginRight:"auto",color:"#DDD"},children:"ABOUT"})}),Object(y.jsx)(V.a,{children:Object(y.jsxs)(C.a,{style:{fontSize:"0.6em",color:"#AAA",textAlign:"left"},children:["This app can extract common keywords or phrases from texts. You can do this by copying some source of text, like e.g. an article on Wikipedia, and pasting it into the text area. The algorithm is robust enough so that you can literally go to an article, select all text with CTRL+A, copy it with CTRL+C, and finally paste it here with CTRL+V, and it should work. Pressing the submit button will send the text to the API back end where the keywords are extracted. These are then sent back to this interface and presented below. The algorithm is specifically tuned for english language, as it has some knowledge about certain english parts-of-speech, such as Nouns, Adjectives, and Verbs. It will however also work with other languages, albeit a bit worse.",Object(y.jsx)("br",{}),Object(y.jsx)("br",{}),"You can view the results as 'chips' where you can also remove results that are not of good quality by pressing the 'X' in each chip. After you are happy with the words, you can also view them as either a list or as comma-separated values (CSV) by navigating in the tab panel.",Object(y.jsx)("br",{}),Object(y.jsx)("br",{}),"You can also control how the algorithm searches for keywords by changing the options below: The options 1-gram, through 4-gram refers to the general concept of",Object(y.jsx)("a",{href:"https://en.wikipedia.org/wiki/N-gram",children:"n-grams"})," in linguistics. This is just a fancy term for 'a sequence of n words'. For example, a 1-gram (unigram) would be a single word like 'Cat' or 'Apple'. A 2-gram (bigram) is sequence of two words, like 'New York' or 'Apple pie'. This same logic applies for 3- and 4-grams. By looking at the most statistically frequent n-grams, these are in practice used to find 'collocations', or common sequences of words in the text.",Object(y.jsx)("br",{}),Object(y.jsx)("br",{}),"The results can also be be controlled by specifcying the minimum and maximum allowed number of characters per result (spaces not included)."]})})]}),Object(y.jsxs)(P.a,{style:{backgroundColor:H,color:"#DDD"},children:[Object(y.jsx)(q.a,{style:{backgroundColor:G},children:Object(y.jsx)(C.a,{style:{marginLeft:"auto",marginRight:"auto",color:"#DDD"},children:"OPTIONS"})}),Object(y.jsx)(M.a,{}),Object(y.jsxs)(V.a,{id:"flexContainer",children:[Object(y.jsxs)("div",{style:{flexBasis:"50%"},children:[Object(y.jsx)(U,{min:0,max:100,val:35,id:"slider1",label:"1-grams"}),Object(y.jsx)(U,{min:0,max:100,val:15,id:"slider2",label:"2-grams"}),Object(y.jsx)(U,{min:0,max:100,val:0,id:"slider3",label:"3-grams"}),Object(y.jsx)(U,{min:0,max:100,val:0,id:"slider4",label:"4-grams"})]}),Object(y.jsxs)("div",{style:{flexBasis:"50%"},children:[Object(y.jsx)(U,{min:1,max:50,val:4,id:"sliderMin",label:"Min. chars"}),Object(y.jsx)(U,{min:1,max:50,val:30,id:"sliderMax",label:"Max. chars"})]})]})]})]}),Object(y.jsx)("textarea",{className:"textarea",rows:"10",margin:"0",id:"textInput",label:"Input text",placeholder:"Input text here"}),Object(y.jsxs)("div",{style:{display:"inline-block"},children:[Object(y.jsx)(K,{startIcon:Object(y.jsx)(D.a,{}),onClick:function(){return function(e,t){var a=document.getElementById("textInput").value,n=parseInt(document.getElementById("slider1").value),r=parseInt(document.getElementById("slider2").value),i=parseInt(document.getElementById("slider3").value),c=parseInt(document.getElementById("slider4").value),s=parseInt(document.getElementById("sliderMin").value),d=parseInt(document.getElementById("sliderMax").value);if(a.split(" ").length<10)return void t("Enter at least 10 words");var u=JSON.stringify({text:a,ngrams:[n,r,i,c],chars:[s,d]});fetch(X,{method:"POST",headers:{"Content-Type":"application/json"},body:u}).then(function(){var a=Object(o.a)(l.a.mark((function a(n){var r,i,c,s,o;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.json();case 2:if(r=a.sent,n.ok){a.next=5;break}return a.abrupt("return",Promise.reject(r));case 5:i=r.data.result,c=i.map((function(e){return e.length})),s=i.flat().map((function(e,t){return{key:t,label:e}})),e(s),o="Result: "+c.map((function(e,t){return"[".concat(e,"] ").concat(t+1,"-grams")})).join(", "),t(o);case 11:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()).catch((function(e){console.error(e),t(e.error.message)}))}(n,u)},children:"SUBMIT"}),Object(y.jsx)(K,{startIcon:Object(y.jsx)(R.a,{}),onClick:function(){document.getElementById("textInput").value="",n([]),u("")},children:"CLEAR"})]}),Object(y.jsx)(k,{inner:[{label:"Chips",component:Object(y.jsx)(T,{chipData:a,handleDelete:function(e){return function(){n((function(t){return t.filter((function(t){return t.key!==e.key}))}))}}})},{label:"List",component:Object(y.jsx)("textarea",{className:"textarea",rows:"10",value:a.map((function(e){return e.label})).join("\n"),onChange:function(){},placeholder:"Results appear here"})},{label:"CSV",component:Object(y.jsx)("textarea",{className:"textarea",rows:"10",value:a.map((function(e){return e.label})).join(", "),onChange:function(){},placeholder:"Results appear here"})}]}),Object(y.jsx)(C.a,{id:"statusText",variant:"h6",style:{color:"#AAA",margin:"0.5em"},children:s}),Object(y.jsx)("a",{className:"App-link",href:"https://github.com/suhren/keyword/",children:Object(y.jsx)("img",{src:B,style:{margin:"1em",width:"64px",height:"64px"}})})]})})},Z=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,139)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),i(e),c(e)}))};c.a.render(Object(y.jsx)(r.a.StrictMode,{children:Object(y.jsx)(Q,{})}),document.getElementById("root")),Z()},76:function(e,t,a){},78:function(e,t,a){}},[[101,1,2]]]);
//# sourceMappingURL=main.3bd29a3c.chunk.js.map