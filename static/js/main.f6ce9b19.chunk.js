(this.webpackJsonpkeyword=this.webpackJsonpkeyword||[]).push([[0],{109:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(14),c=n.n(i),l=(n(76),n(50)),o=n.n(l),s=n(57),d=n(21),u=n.p+"static/media/github-svgrepo-com.b472f676.svg",b=(n(78),n(79),n(80),n(60)),m=n.n(b),j=n(5),h=(n(81),n(147)),x=n(140),p=n(2),g=n(150),f=n(144),O=n(153),v=n(142),y=n(143),w=n(141),k=n(154),C=n(151),N=n(4),A=Object(x.a)({root:{width:"80%",marginLeft:"auto",marginRight:"auto",display:"inline-block"},label:{fontSize:"0.6em"},input:{width:42,color:"#AAA",borderBottom:"1px solid #AAA !important"}});function I(e){var t=A(),n=r.a.useState(e.val),a=Object(d.a)(n,2),i=a[0],c=a[1];return Object(N.jsx)("div",{className:t.root,children:Object(N.jsxs)(w.a,{container:!0,spacing:2,alignItems:"center",children:[Object(N.jsx)(w.a,{item:!0,className:t.label,children:e.label}),Object(N.jsx)(w.a,{item:!0,xs:!0,children:Object(N.jsx)(k.a,{className:t.slider,value:"number"===typeof i?i:0,onChange:function(e,t){c(t)},"aria-labelledby":"input-slider",min:e.min,max:e.max})}),Object(N.jsx)(w.a,{item:!0,children:Object(N.jsx)(C.a,{className:t.input,value:i,margin:"dense",onChange:function(e){c(""===e.target.value?"":Number(e.target.value))},onBlur:function(){i<e.min?c(e.min):i>e.max&&c(e.max)},id:e.id,inputProps:{step:1,min:e.min,max:e.max,type:"number","aria-labelledby":"input-slider"}})})]})})}n(87);var S=Object(x.a)((function(e){return{root:{width:"100%",marginBottom:"16px"},accordion:{backgroundColor:"#1b212c",color:"#DDD"},heading:{fontSize:e.typography.pxToRem(15),marginLeft:"auto",marginRight:"auto"},secondaryHeading:{fontSize:e.typography.pxToRem(15),color:e.palette.text.secondary},icon:{verticalAlign:"bottom",height:20,width:20},column:{flexBasis:"50%",justifyContent:"center"},helper:{borderLeft:"2px solid ".concat(e.palette.divider),padding:e.spacing(1,2)},link:{color:e.palette.primary.main,textDecoration:"none","&:hover":{textDecoration:"underline"}}}}));function B(){var e,t=S(),n=r.a.useState(!1),a=Object(d.a)(n,2),i=a[0],c=a[1];return Object(N.jsx)("div",{className:t.root,children:Object(N.jsxs)(g.a,{className:t.accordion,expanded:"panel1"===i,onChange:(e="panel1",function(t,n){c(!!n&&e)}),children:[Object(N.jsx)(O.a,{"aria-controls":"panel1c-content",id:"panel1c-header",style:{backgroundColor:"#373c45"},children:Object(N.jsx)(v.a,{className:t.heading,children:"OPTIONS"})}),Object(N.jsx)(y.a,{}),Object(N.jsxs)(f.a,{id:"flexContainer",className:t.details,children:[Object(N.jsxs)("div",{className:t.column,children:[Object(N.jsx)(I,{min:0,max:100,val:35,id:"slider1",label:"1-grams"}),Object(N.jsx)(I,{min:0,max:100,val:15,id:"slider2",label:"2-grams"}),Object(N.jsx)(I,{min:0,max:100,val:0,id:"slider3",label:"3-grams"}),Object(N.jsx)(I,{min:0,max:100,val:0,id:"slider4",label:"4-grams"})]}),Object(N.jsxs)("div",{className:Object(p.a)(t.column,t.helper),children:[Object(N.jsx)(I,{min:1,max:50,val:4,id:"sliderMin",label:"Min. chars"}),Object(N.jsx)(I,{min:1,max:50,val:30,id:"sliderMax",label:"Max. chars"})]})]})]})})}var T=n(152),D=n(111),E=Object(x.a)((function(e){return{root:{id:"chipContainer",width:"100%",background:"none",boxShadow:"none",display:"flex",justifyContent:"center",flexWrap:"wrap",listStyle:"none",padding:e.spacing(.5),margin:0},chip:{margin:e.spacing(.5)}}}));function M(e){var t=E();return 0==e.chipData.length?Object(N.jsx)(v.a,{style:{color:"#AAA"},children:" Results appear here "}):Object(N.jsx)(D.a,{component:"ul",className:t.root,children:e.chipData.map((function(n){return Object(N.jsx)("li",{children:Object(N.jsx)(T.a,{icon:undefined,label:n.label,onDelete:e.handleDelete(n),className:t.chip})},n.key)}))})}var F=n(34),L=n(61),R=n(59),P=n.n(R),z=n(27),J=n(148),H=n(145),W=n(149),_=n(146);function U(e){var t=e.children,n=e.value,a=e.index,r=Object(L.a)(e,["children","value","index"]);return Object(N.jsx)("div",Object(F.a)(Object(F.a)({role:"tabpanel",hidden:n!==a,id:"full-width-tabpanel-".concat(a),"aria-labelledby":"full-width-tab-".concat(a)},r),{},{children:n===a&&Object(N.jsx)(J.a,{p:3,children:t})}))}var V=Object(x.a)((function(e){return{root:{backgroundColor:"#1b212c",width:"100%"}}}));function q(e){var t=V(),n=Object(z.a)(),a=r.a.useState(0),i=Object(d.a)(a,2),c=i[0],l=i[1];return Object(N.jsxs)("div",{className:t.root,children:[Object(N.jsx)(H.a,{position:"static",style:{background:"#373c45"},children:Object(N.jsx)(W.a,{value:c,onChange:function(e,t){l(t)},indicatorColor:"primary",textColor:"primary",variant:"fullWidth","aria-label":"full width tabs example",children:e.inner.map((function(e,t){return Object(N.jsx)(_.a,Object(F.a)(Object(F.a)({label:e.label},{id:"full-width-tab-".concat(n=t),"aria-controls":"full-width-tabpanel-".concat(n)}),{},{style:{color:"#FFF"}}),t);var n}))})}),Object(N.jsx)(P.a,{axis:"rtl"===n.direction?"x-reverse":"x",index:c,onChangeIndex:function(e){l(e)},children:e.inner.map((function(e,t){return Object(N.jsx)(U,{value:c,index:t,dir:n.direction,children:e.component},t)}))})]})}var G=Object(j.a)({root:{background:"#718dbd","&:hover":{backgroundColor:"#5572a5",color:"white"},border:0,color:"white",height:48,padding:"0 30px",margin:"1em"},label:{textTransform:"capitalize"}})(h.a);var K=function(){var e=r.a.useState([]),t=Object(d.a)(e,2),n=t[0],a=t[1];return Object(N.jsx)("div",{className:"App",children:Object(N.jsxs)("header",{className:"App-header",children:[Object(N.jsxs)("h1",{style:{margin:"1em 0 1em 0"},children:["Extract ",Object(N.jsx)("code",{style:{color:"#718dbd"},children:"keywords"})," from text documents!"]}),Object(N.jsx)("textarea",{className:"textarea",rows:"10",margin:"normal",id:"textInput",label:"Input text",placeholder:"Input text here"}),Object(N.jsx)(B,{}),Object(N.jsx)(G,{id:"button_submit",startIcon:Object(N.jsx)(m.a,{}),onClick:function(){return function(e){var t=document.getElementById("textInput").value,n=document.getElementById("slider1").value,a=document.getElementById("slider2").value,r=document.getElementById("slider3").value,i=document.getElementById("slider4").value,c=document.getElementById("sliderMin").value,l=document.getElementById("sliderMax").value,d=document.getElementById("statusText");if(""==t)return;var u=JSON.stringify({text:t,ngram:[n,a,r,i],chars:[c,l]});fetch("https://keyword.bitgnd.com:5000/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:u}).then(function(){var t=Object(s.a)(o.a.mark((function t(n){var a,r,i,c;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.json();case 2:if(a=t.sent,d.innerHTML=a.message,n.ok){t.next=7;break}return r=a&&a.message||n.status,t.abrupt("return",Promise.reject(r));case 7:i=a.result.flat(),c=i.map((function(e,t){return{key:t,label:e}})),e(c);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(e){console.error("There was an error!",e)}))}(a)},children:"SUBMIT"}),Object(N.jsx)(q,{inner:[{label:"Chips",component:Object(N.jsx)(M,{chipData:n,handleDelete:function(e){return function(){a((function(t){return t.filter((function(t){return t.key!==e.key}))}))}}})},{label:"List",component:Object(N.jsx)("textarea",{className:"textarea",rows:"10",value:n.map((function(e){return e.label})).join("\n"),onChange:function(){},placeholder:"Results appear here"})},{label:"CSV",component:Object(N.jsx)("textarea",{className:"textarea",rows:"10",value:n.map((function(e){return e.label})).join(", "),onChange:function(){},placeholder:"Results appear here"})}]}),Object(N.jsx)("h3",{id:"statusText",style:{marginTop:"1em",fontSize:"0.65em",color:"#AAAAAA"},children:"Status text"}),Object(N.jsx)("a",{className:"App-link",target:"_blank",rel:"noopener noreferrer",href:"https://github.com/suhren/keyword/",children:Object(N.jsx)("img",{src:u,style:{margin:"32px",width:"64px",height:"64px"}})})]})})},Q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,156)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),i(e),c(e)}))};c.a.render(Object(N.jsx)(r.a.StrictMode,{children:Object(N.jsx)(K,{})}),document.getElementById("root")),Q()},76:function(e,t,n){},80:function(e,t,n){},87:function(e,t,n){}},[[109,1,2]]]);
//# sourceMappingURL=main.f6ce9b19.chunk.js.map