(this["webpackJsonpwhale-watch"]=this["webpackJsonpwhale-watch"]||[]).push([[0],{101:function(e,t,n){},104:function(e,t,n){},110:function(e,t,n){},111:function(e,t,n){},112:function(e,t,n){},118:function(e,t,n){},119:function(e,t,n){},121:function(e,t,n){},122:function(e,t,n){},123:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(24),s=n.n(a),o=(n(96),n(97),n(98),n(37)),i=n(14),l=n(33),u=n(34),d=n(75),j=n(74),h=n(1),b=c.a.createContext(null);function f(){var e=localStorage.getItem("dockerRemote");return null===e?{}:JSON.parse(e)}var O=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){var e;Object(l.a)(this,n);for(var r=arguments.length,c=new Array(r),a=0;a<r;a++)c[a]=arguments[a];return(e=t.call.apply(t,[this].concat(c))).state={dockerRemotes:f()},e.addDockerRemote=function(t){var n=e.state.dockerRemotes;n["".concat(t.host,":").concat(t.port)]=t,localStorage.setItem("dockerRemote",JSON.stringify(n)),e.setState({dockerRemotes:n})},e.removeDockerRemote=function(t){var n=e.state.dockerRemotes;delete n[t],localStorage.setItem("dockerRemote",JSON.stringify(n)),e.setState({dockerRemotes:n})},e}return Object(u.a)(n,[{key:"render",value:function(){return Object(h.jsx)(b.Provider,{value:{dockerRemotes:this.state.dockerRemotes,addDockerRemote:this.addDockerRemote,removeDockerRemote:this.removeDockerRemote},children:this.props.children})}}]),n}(c.a.Component);O.contextType=b;var p=O,m=n(26),x=n(8),v=n(44),g=n(13),k=n(16),y=n(27),N=n(12),w=n(21),R=n(17),C=n(9);function D(e){for(var t=0,n=["B","KB","MB","GB","TB"];t<n.length;t++){var r=n[t];if(e/1e3<1)return"".concat(e.toFixed(2)," ").concat(r);e/=1e3}return"".concat(e.toFixed(2)," TB")}function I(e){var t=new Date(1e3*e),n=t.getFullYear(),r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()];return t.getDate()+" "+r+" "+n+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()}var T=function(e){var t=e.data,n=e.image,c=e.fetchImageLs,a=e.setImageDetails,s=Object(r.useState)(!1),o=Object(x.a)(s,2),i=o[0],l=o[1],u=R.a.fromDockerRemoteData(t,l);return Object(h.jsxs)("tr",{children:[i&&Object(h.jsx)("td",{colSpan:5,children:Object(h.jsx)(w.a,{animation:"border",size:"sm"})}),!i&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("td",{children:n.RepoTags}),Object(h.jsx)("td",{className:"DockerImages-image-id",children:n.Id.slice(7)}),Object(h.jsx)("td",{children:I(n.Created)}),Object(h.jsx)("td",{children:D(n.Size)}),Object(h.jsxs)("td",{className:"DockerImages-actions",children:[Object(h.jsx)(g.a,{variant:"success lg",onClick:function(){u.containerCreate(n).then((function(){return Object(C.a)("A new container has been created")})).catch(C.b)},disabled:i,children:Object(h.jsx)("i",{className:"fa fa-play"})}),Object(h.jsx)(g.a,{variant:"info lg",onClick:function(){u.imageInspect(n).then((function(e){return a(e)})).catch(C.b)},disabled:i,children:Object(h.jsx)("i",{className:"fa fa-eye"})}),Object(h.jsx)(g.a,{variant:"danger lg",onClick:function(){u.imageRm(n).then((function(){return c(!0)})).then((function(){return Object(C.a)("The image has been deleted")})).catch(C.b)},disabled:i,children:Object(h.jsx)("i",{className:"fa fa-trash"})})]})]})]})};n(104);function S(e){return void 0===e?"":JSON.stringify(e,null,4)}var E=function(e){var t=e.data,n=e.eventKey,c=Object(r.useContext)(v.a),a=Object(r.useState)(!1),s=Object(x.a)(a,2),o=s[0],i=s[1],l=Object(r.useState)(),u=Object(x.a)(l,2),d=u[0],j=u[1],b=Object(r.useState)(),f=Object(x.a)(b,2),O=f[0],p=f[1],D=R.a.fromDockerRemoteData(t,i),I=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(c!==n||e){var r=R.a.fromDockerRemoteData(t,i);r.imageLs().then(j).catch(C.b)}},E=null===d||void 0===d?void 0:d.map((function(e,n){return Object(h.jsx)(T,{data:t,image:e,fetchImageLs:I,setImageDetails:p},n)}));return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)(k.a,{children:[Object(h.jsx)(m.a.Toggle,{as:k.a.Header,eventKey:n,onClick:function(){return I()},children:Object(h.jsx)("h5",{children:"Images"})}),Object(h.jsx)(m.a.Collapse,{eventKey:n,children:Object(h.jsxs)(k.a.Body,{children:[Object(h.jsxs)(y.a.Group,{className:"DockerImages-form",controlId:"dockerImages.tag",children:[Object(h.jsx)(y.a.Label,{className:"DockerImages-required-label",children:Object(h.jsx)("b",{children:"Pull image"})}),Object(h.jsx)(y.a.Control,{placeholder:"tag:latest",required:!0}),Object(h.jsx)(g.a,{variant:"primary",onClick:function(){var e=document.getElementById("dockerImages.tag"),t=null===e||void 0===e?void 0:e.value;if(void 0===t||null===t||0===t.length||t.startsWith(":"))return Object(C.a)("You must specify an image name to pull",{contentClassName:"text-danger"});e.value="",D.imageCreate(t).then((function(){return Object(C.a)("A new images is being pulled.\nIt may take a while before it shows here")})).catch(C.b)},children:Object(h.jsx)("i",{className:"fa fa-download"})})]}),o&&Object(h.jsx)(w.a,{animation:"border",size:"sm"}),!o&&void 0===d&&Object(h.jsx)("p",{children:"No images found"}),!o&&d&&Object(h.jsxs)("table",{className:"table table-hover",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{scope:"col",children:"Name"}),Object(h.jsx)("th",{scope:"col",children:"Image ID"}),Object(h.jsx)("th",{scope:"col",children:"Created"}),Object(h.jsx)("th",{scope:"col",children:"Size"}),Object(h.jsx)("th",{scope:"col",children:"Actions"})]})}),Object(h.jsx)("tbody",{children:E})]})]})})]}),Object(h.jsxs)(N.a,{dialogClassName:"modal-lg",show:void 0!==O,onHide:function(){return p(void 0)},children:[Object(h.jsx)(N.a.Header,{closeButton:!0,children:Object(h.jsxs)(N.a.Title,{children:[null===O||void 0===O?void 0:O.RepoTags," details"]})}),Object(h.jsx)(N.a.Body,{children:Object(h.jsx)("pre",{children:Object(h.jsx)("code",{children:S(O)})})})]})]})},A=n(84);var B=function(e){var t=e.data,n=e.volume,c=e.fetchVolumeLs,a=e.setVolumeDetails,s=Object(r.useState)(!1),o=Object(x.a)(s,2),i=o[0],l=o[1],u=R.a.fromDockerRemoteData(t,l);return Object(h.jsxs)("tr",{children:[i&&Object(h.jsx)("td",{colSpan:4,children:Object(h.jsx)(w.a,{animation:"border",size:"sm"})}),!i&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("td",{className:"DockerVolumes-name",children:n.Name}),Object(h.jsx)("td",{children:n.Driver}),Object(h.jsx)("td",{className:"DockerVolumes-name",children:n.Mountpoint}),Object(h.jsxs)("td",{className:"DockerVolumes-actions",children:[Object(h.jsx)(g.a,{variant:"info lg",onClick:function(){u.volumeInpect(n).then((function(e){return a(e)})).catch(C.b)},disabled:i,children:Object(h.jsx)("i",{className:"fa fa-eye"})}),Object(h.jsx)(g.a,{variant:"danger lg",onClick:function(){u.volumeRm(n).then((function(){return c(!0)})).then((function(){return Object(C.a)("The volume has been deleted")})).catch(C.b)},disabled:i,children:Object(h.jsx)("i",{className:"fa fa-trash"})})]})]})]})};n(111);var L=function(e){var t,n=e.data,c=e.eventKey,a=Object(r.useContext)(v.a),s=Object(r.useState)(!1),o=Object(x.a)(s,2),i=o[0],l=o[1],u=Object(r.useState)(),d=Object(x.a)(u,2),j=d[0],b=d[1],f=Object(r.useState)(),O=Object(x.a)(f,2),p=O[0],g=O[1],y=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(a!==c||e){var t=R.a.fromDockerRemoteData(n,l);t.volumeLs().then(b).catch(C.b)}},D=null===j||void 0===j?void 0:j.Volumes.map((function(e,t){return Object(h.jsx)(B,{volume:e,data:n,fetchVolumeLs:y,setVolumeDetails:g},t)}));return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)(k.a,{children:[Object(h.jsx)(m.a.Toggle,{as:k.a.Header,eventKey:c,onClick:function(){return y()},children:Object(h.jsx)("h5",{children:"Volumes"})}),Object(h.jsx)(m.a.Collapse,{eventKey:c,children:Object(h.jsxs)(k.a.Body,{children:[i&&Object(h.jsx)(w.a,{animation:"border",size:"sm"}),!i&&void 0===j&&Object(h.jsx)("p",{children:"No volumes found"}),!i&&j&&Object(h.jsxs)("table",{className:"table table-hover",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{scope:"col",children:"Name"}),Object(h.jsx)("th",{scope:"col",children:"Driver"}),Object(h.jsx)("th",{scope:"col",children:"Mountpoint"}),Object(h.jsx)("th",{scope:"col",children:"Actions"})]})}),Object(h.jsx)("tbody",{children:D})]})]})})]}),Object(h.jsxs)(N.a,{dialogClassName:"modal-lg",show:void 0!==p,onHide:function(){return g(void 0)},children:[Object(h.jsx)(N.a.Header,{closeButton:!0,children:Object(h.jsxs)(N.a.Title,{children:[null===p||void 0===p?void 0:p.Name," details"]})}),Object(h.jsx)(N.a.Body,{children:Object(h.jsx)("pre",{children:Object(h.jsx)("code",{children:(t=p,void 0===t?"":JSON.stringify(t,null,4))})})})]})]})};var F=function(e){var t=e.data,n=e.network,c=e.fetchNetworkLs,a=e.setNetworksDetails,s=Object(r.useState)(!1),o=Object(x.a)(s,2),i=o[0],l=o[1],u=R.a.fromDockerRemoteData(t,l);return Object(h.jsxs)("tr",{children:[i&&Object(h.jsx)("td",{colSpan:5,children:Object(h.jsx)(w.a,{animation:"border",size:"sm"})}),!i&&Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("td",{children:n.Name}),Object(h.jsx)("td",{className:"DockerNetworks-ellipsis",children:n.Id}),Object(h.jsx)("td",{children:n.Driver}),Object(h.jsx)("td",{children:n.Scope}),Object(h.jsxs)("td",{className:"DockerNetworks-actions",children:[Object(h.jsx)(g.a,{variant:"info lg",onClick:function(){u.networkInpect(n).then((function(e){return a(e)})).catch(C.b)},disabled:i,children:Object(h.jsx)("i",{className:"fa fa-eye"})}),Object(h.jsx)(g.a,{variant:"danger lg",onClick:function(){u.networkRm(n).then((function(){return c(!0)})).then((function(){return Object(C.a)("The network has been deleted")})).catch(C.b)},disabled:i,children:Object(h.jsx)("i",{className:"fa fa-trash"})})]})]})]})};n(112);var q=function(e){var t,n=e.data,c=e.eventKey,a=Object(r.useContext)(v.a),s=Object(r.useState)(!1),o=Object(x.a)(s,2),i=o[0],l=o[1],u=Object(r.useState)(),d=Object(x.a)(u,2),j=d[0],b=d[1],f=Object(r.useState)(),O=Object(x.a)(f,2),p=O[0],g=O[1],y=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(a!==c||e){var t=R.a.fromDockerRemoteData(n,l);console.log("FEST"),t.networkLs().then(b).catch(C.b)}},D=null===j||void 0===j?void 0:j.map((function(e,t){return Object(h.jsx)(F,{network:e,data:n,fetchNetworkLs:y,setNetworksDetails:g},t)}));return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)(k.a,{children:[Object(h.jsx)(m.a.Toggle,{id:"acc-networks",as:k.a.Header,eventKey:c,onClick:function(){return y()},children:Object(h.jsx)("h5",{children:"Networks"})}),Object(h.jsx)(m.a.Collapse,{eventKey:c,children:Object(h.jsxs)(k.a.Body,{children:[i&&Object(h.jsx)(w.a,{animation:"border",size:"sm"}),!i&&void 0===j&&Object(h.jsx)("p",{children:"No networks found"}),!i&&j&&Object(h.jsxs)("table",{className:"table table-hover",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{scope:"col",children:"Network ID"}),Object(h.jsx)("th",{scope:"col",children:"Name"}),Object(h.jsx)("th",{scope:"col",children:"Driver"}),Object(h.jsx)("th",{scope:"col",children:"Scope"}),Object(h.jsx)("th",{scope:"col",children:"Actions"})]})}),Object(h.jsx)("tbody",{children:D})]})]})})]}),Object(h.jsxs)(N.a,{dialogClassName:"modal-lg",show:void 0!==p,onHide:function(){return g(void 0)},children:[Object(h.jsx)(N.a.Header,{closeButton:!0,children:Object(h.jsxs)(N.a.Title,{children:[null===p||void 0===p?void 0:p.Name," details"]})}),Object(h.jsx)(N.a.Body,{children:Object(h.jsx)("pre",{children:Object(h.jsx)("code",{children:(t=p,void 0===t?"":JSON.stringify(t,null,4))})})})]})]})};var H=function(){var e=Object(r.useContext)(b),t=Object(i.h)(),n=null===e||void 0===e?void 0:e.dockerRemotes[t.dockerRemoteKey];return void 0===n?Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("h3",{children:"ERROR 404"}),Object(h.jsx)("p",{children:"The Docker remote you specified was not found"})]}):Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("h4",{children:"".concat(n.host,":").concat(n.port)}),Object(h.jsxs)(m.a,{children:[Object(h.jsx)(E,{data:n,eventKey:"0"}),Object(h.jsx)(A.a,{data:n,eventKey:"1"}),Object(h.jsx)(L,{data:n,eventKey:"2"}),Object(h.jsx)(q,{data:n,eventKey:"3"})]})]})},K=n(60),W=n(35);n(118);var G=function(){var e=Object(r.useContext)(b),t=[];null!==e&&(t=Object.entries(e.dockerRemotes));var n=t.map((function(t){var n=Object(x.a)(t,2),r=n[0],c=n[1];return Object(h.jsxs)(k.a,{bg:"dark",border:"primary",className:"mb-3",children:[Object(h.jsx)(k.a.Header,{children:Object(h.jsx)("h5",{children:"".concat(c.host,":").concat(c.port)})}),Object(h.jsx)(k.a.Body,{children:Object(h.jsx)(k.a.Text,{as:"div",children:Object(h.jsxs)(K.a,{children:[Object(h.jsxs)(W.a,{xs:9,children:["Host: ",Object(h.jsx)("b",{children:c.host}),Object(h.jsx)("br",{}),"Port: ",Object(h.jsx)("b",{children:c.port}),Object(h.jsx)("br",{})]}),Object(h.jsxs)(W.a,{className:"DockerRemoteList-buttons",xs:2,children:[Object(h.jsx)(o.b,{to:r,children:Object(h.jsx)(g.a,{variant:"primary lg",children:Object(h.jsx)("i",{className:"fa fa-eye"})})}),Object(h.jsx)(g.a,{variant:"danger lg",onClick:function(){return null===e||void 0===e?void 0:e.removeDockerRemote(r)},children:Object(h.jsx)("i",{className:"fa fa-trash"})})]})]})})})]},r)}));return Object(h.jsxs)(h.Fragment,{children:[n&&Object(h.jsx)("div",{className:"DockerRemoteList-CardDeck",children:n}),0===n.length&&Object(h.jsx)("p",{children:"No remote Docker instances found :("})]})},J=n(89),P=n(61),M=n(41),V=n(88),z=n(87),U=n(90),Q=(n(119),n(47));var Y=function(){var e={port:2375,host:Q.placeholderHost},t=Object(h.jsx)(z.a,{id:"infoTooltip",children:Q.infoTooltip}),n=Object(i.g)(),c=Object(i.f)(),a=Object(r.useState)(!1),s=Object(x.a)(a,2),o=s[0],l=s[1],u=Object(r.useState)(!1),d=Object(x.a)(u,2),j=d[0],f=d[1],O=Object(r.useState)(!1),p=Object(x.a)(O,2),m=p[0],v=p[1],k=Object(r.useState)(!1),C=Object(x.a)(k,2),D=C[0],I=C[1],T=Object(r.useState)(!0),S=Object(x.a)(T,2),E=S[0],A=S[1],B=Object(U.a)({defaultValues:e}),L=B.register,F=B.handleSubmit,q=B.reset,H=Object(r.useContext)(b),G=function(){v(!1),f(!1),q(e),l(!1)};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)(g.a,{variant:"success",onClick:function(){return l(!0)},children:[Object(h.jsx)("i",{className:"fa fa-plus"}),"\xa0\xa0 Add Docker remote"]}),Object(h.jsxs)(N.a,{dialogClassName:"modal-lg",show:o,onHide:G,children:[Object(h.jsx)(N.a.Header,{closeButton:!0,children:Object(h.jsx)(N.a.Title,{children:"Add a new Docker remote"})}),Object(h.jsx)(N.a.Body,{children:Object(h.jsxs)(y.a,{id:"dockerRemoteForm",onSubmit:F((function(e){e.protocol=E?"https":"http",null===H||void 0===H||H.addDockerRemote(e),G(),"/"!==n.pathname&&c.push("/")})),children:[Object(h.jsxs)(K.a,{children:[Object(h.jsx)(W.a,{xs:11,children:Object(h.jsx)(y.a.Group,{controlId:"dockerRemoteForm.local",children:Object(h.jsx)(y.a.Check,{checked:E,type:"switch",id:"dockerRemoteForm.local",label:E?"Using HTTPS":"Using HTTP",onChange:function(){return A(!E)}})})}),Object(h.jsx)(W.a,{xs:1,children:Object(h.jsx)(V.a,{placement:"left",delay:{show:150,hide:300},overlay:t,children:Object(h.jsx)("i",{className:"fa fa-2x fa-question-circle"})})})]}),Object(h.jsxs)(K.a,{children:[Object(h.jsx)(W.a,{xs:"6",children:Object(h.jsxs)(y.a.Group,{controlId:"dockerRemoteForm.host",children:[Object(h.jsxs)(y.a.Label,{className:"DockerRemoteForm-required-label info-tooltip",children:["Remote hostname or IP address",Object(h.jsx)("span",{className:"tooltip-text",children:Q.hostInfoTooltip})]}),Object(h.jsx)(y.a.Control,Object(M.a)(Object(M.a)({},L("host")),{},{type:"text",placeholder:Q.placeholderHost,required:!0}))]})}),Object(h.jsx)(W.a,{xs:"3",children:Object(h.jsxs)(y.a.Group,{controlId:"dockerRemoteForm.port",children:[Object(h.jsxs)(y.a.Label,{className:"DockerRemoteForm-required-label info-tooltip",children:["Remote port",Object(h.jsx)("span",{className:"tooltip-text",children:Q.portInfoTooltip})]}),Object(h.jsx)(y.a.Control,Object(M.a)(Object(M.a)({},L("port",{valueAsNumber:!0})),{},{type:"number",placeholder:Q.placeholderPort,required:!0}))]})})]})]})}),Object(h.jsxs)(N.a.Footer,{children:[j&&!D&&Object(h.jsx)("p",{className:"text-danger",children:"Could not connect to the Docker remote daemon"}),m&&!D&&Object(h.jsx)("p",{className:"text-success",children:"Connection successfully enstablished"}),Object(h.jsxs)(g.a,{variant:"warning",onClick:F((function(e){e.protocol=E?"https":"http";var t=function(){v(!1),f(!0)};R.a.fromDockerRemoteData(e,I).ping().then((function(e){return e?(f(!1),void v(!0)):t()})).catch(t)})),disabled:D,children:[D&&Object(h.jsx)(w.a,{animation:"border",size:"sm"}),!D&&"Test connection"]}),Object(h.jsx)(g.a,{variant:"secondary",onClick:G,children:"Cancel"}),Object(h.jsx)(g.a,{variant:"primary",type:"submit",form:"dockerRemoteForm",children:"Add"})]})]})]})};n(121);var Z=function(){return Object(h.jsxs)(P.a,{bg:"primary",variant:"dark",expand:"lg",children:[Object(h.jsx)(P.a.Brand,{children:Object(h.jsx)(o.b,{className:"navbar-brand",to:"/",children:"Whale watch"})}),Object(h.jsx)(P.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(h.jsxs)(P.a.Collapse,{id:"basic-navbar-nav",children:[Object(h.jsx)(J.a,{className:"mr-auto",children:Object(h.jsx)(Y,{})}),Object(h.jsx)(g.a,{href:"https://github.com/TendTo/Whale-watch",variant:"outline-light",children:Object(h.jsx)("i",{className:"fa fa-github"})})]})]})};n(122);var _=function(){return Object(h.jsx)("div",{className:"App",children:Object(h.jsx)(o.a,{children:Object(h.jsxs)(p,{children:[Object(h.jsx)(Z,{}),Object(h.jsx)("div",{className:"App-main",children:Object(h.jsxs)(i.c,{children:[Object(h.jsx)(i.a,{exact:!0,path:"/",children:Object(h.jsx)(G,{})}),Object(h.jsx)(i.a,{exact:!0,path:"/:dockerRemoteKey",children:Object(h.jsx)(H,{})})]})})]})})})},X=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,130)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),c(e),a(e),s(e)}))};s.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(_,{})}),document.getElementById("root")),X()},17:function(e,t,n){"use strict";var r=n(5),c=n.n(r),a=n(10),s=n(33),o=n(34),i=n(75),l=n(74),u=function(e){Object(i.a)(n,e);var t=Object(l.a)(n);function n(e,r,c,a){var o;return Object(s.a)(this,n),(o=t.call(this,e,r,c)).setLoading=a,o.force={force:"true"},o.all={all:"true"},o.allLogs={stderr:"true",stdout:"true",tail:100},o}return Object(o.a)(n,[{key:"handleError",value:function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==t&&null!==t){e.next=2;break}throw Error("No response");case 2:return n=t.status?"".concat(t.status," - ").concat(t.statusText):"Server error",e.prev=3,e.next=6,t.json();case 6:r=e.sent,n=r.message||n,e.next=12;break;case 10:e.prev=10,e.t0=e.catch(3);case 12:throw Error(n);case 13:case"end":return e.stop()}}),e,null,[[3,10]])})));return function(t){return e.apply(this,arguments)}}()},{key:"apiRequestWrapper",value:function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r,a,s,o=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.length>1&&void 0!==o[1]?o[1]:"GET",r=o.length>2?o[2]:void 0,a=o.length>3?o[3]:void 0,this.setLoading&&this.setLoading(!0),e.prev=4,e.next=7,this.apiRequest(t,n,r,a);case 7:if(void 0!==(s=e.sent)&&null!==s&&s.ok){e.next=11;break}return e.next=11,this.handleError(s);case 11:return this.setLoading&&this.setLoading(!1),e.abrupt("return",s);case 15:throw e.prev=15,e.t0=e.catch(4),this.setLoading&&this.setLoading(!1),e.t0;case 19:case"end":return e.stop()}}),e,this,[[4,15]])})));return function(t){return e.apply(this,arguments)}}()},{key:"imageCreate",value:function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(null===(n=t.match(/(.*?)(:[^:]+)?$/))||n.length<2)){e.next=3;break}throw Error("404 - imageCreate has failed");case 3:return r=n[1]||"",a=n[2]||"latest",r=r.endsWith(":")?r.slice(0,-1):r,a=a.startsWith(":")?a.slice(1):a,e.next=9,this.apiRequestWrapper("images/create","POST",{fromImage:r,tag:a});case 9:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"imageLs",value:function(){var e=Object(a.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("images/json");case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"imageInspect",value:function(){var e=Object(a.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("images/".concat(t.Id.replace("sha256:",""),"/json"));case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"imageRm",value:function(){var e=Object(a.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("images/".concat(t.Id.replace("sha256:","")),"DELETE",this.force);case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"containerCreate",value:function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.RepoTags?t.RepoTags[0]:t.Id.slice(7),e.next=3,this.apiRequestWrapper("containers/create","POST",void 0,{Image:n});case 3:return r=e.sent,e.next=6,r.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"containerRun",value:function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("containers/".concat(t.Id,"/start"),"POST");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"containerLs",value:function(){var e=Object(a.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("containers/json","GET",this.all);case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"containerInspect",value:function(){var e=Object(a.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("containers/".concat(t.Id,"/json"));case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"containerLogs",value:function(){var e=Object(a.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("containers/".concat(t.Id,"/logs"),"GET",this.allLogs);case 2:return n=e.sent,e.next=5,n.text();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"containerRestart",value:function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("containers/".concat(t.Id,"/restart"),"POST");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"containerStop",value:function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("containers/".concat(t.Id,"/stop"),"POST");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"containerRm",value:function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("containers/".concat(t.Id),"DELETE",this.force);case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"volumeLs",value:function(){var e=Object(a.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("volumes");case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"volumeInpect",value:function(){var e=Object(a.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("volumes/".concat(t.Name));case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"volumeRm",value:function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("volumes/".concat(t.Name),"DELETE",this.force);case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"ping",value:function(){var e=Object(a.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("_ping");case 2:return t=e.sent,e.next=5,t.text();case 5:return n=e.sent,e.abrupt("return","OK"===n);case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"networkLs",value:function(){var e=Object(a.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("networks");case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"networkInpect",value:function(){var e=Object(a.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("networks/".concat(t.Name));case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"networkRm",value:function(){var e=Object(a.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.apiRequestWrapper("networks/".concat(t.Name),"DELETE");case 2:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}],[{key:"fromDockerRemoteData",value:function(e,t){return new n(e.protocol,e.host,e.port,t)}}]),n}(function(){function e(t,n,r){Object(s.a)(this,e),this.protocol=t,this.host=n,this.port=r}return Object(o.a)(e,[{key:"baseUrl",get:function(){return"".concat(this.protocol,"://").concat(this.host).concat(this.port?":"+this.port:"")}},{key:"apiRequest",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,c=e?"".concat(this.baseUrl,"/").concat(e):this.baseUrl;return n&&(c+="?".concat(this.queryStringify(n))),this.request(c,t,r)}},{key:"request",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2?arguments[2]:void 0,r=new Headers;r.append("Content-Type","application/json");var c={headers:r,method:t};return n&&(c.body=JSON.stringify(n)),console.debug("Fetch - ".concat(t," - ").concat(e)),fetch(e,c)}},{key:"handleError",value:function(e){if(void 0===e||null===e)throw Error("No response");var t=e.status?"".concat(e.status," - ").concat(e.statusText):"Server error";throw console.error(t),Error(t)}},{key:"queryStringify",value:function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&null!==e[n]&&void 0!==e[n]&&t.push(encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t.join("&")}}]),e}());t.a=u},47:function(e){e.exports=JSON.parse('{"placeholderCa":"-----BEGIN CERTIFICATE-----\\nMIIGGTCCBAGgAwIBAgIdasdasdggbZEprmjKoWclqyd+zmQwDQYJKoZIhvcNAQEL\\nBQAwgZsxCzAJBgNVBAA56dGBaT4wDAYDVQQIDAVJdGFseTERMA8GA1UEBwwIUy5U\\n-----END CERTIFICATE-----","placeholderCert":"-----BEGIN CERTIFICATE-----\\n04dNMzgKIRZWt/WJucI7uPnd90g3XaD2z9LTfpQbs5ft5+qMyAiwMgvvFKOfK3gY\\nR8V6seVvA9BCJOEnTcxcl8dGeFbNtQLi2qkzk+CqTKwhIFjRatmQl00qBdnnR/4u\\n-----END CERTIFICATE-----","placeholderKey":"-----BEGIN RSA PRIVATE KEY-----\\n2bMtAoIBAHV+68HOkCKGe4ybfYGYA6eGyro6udeR5Qf8cRyUdLK1W0BhWUoHrRpb\\nxGIK3tCf3iXk8vtdm514snHGvZkh/kdvHtlWmA8QR0XeDoYh17egWZB+6OrxEV6m\\n-----END RSA PRIVATE KEY-----","placeholderHost":"hostname.com","placeholderPort":"2375","placeholderSocket":"/var/run/docker.sock","infoTooltip":"Connect to a new remote Docker daemon.\\nIf the HTTPS connection is selected, you have the option to specify ca, cert and key. This is only needed if the Docker daemon expects mutual authentication.\\nFor more pieces of information on the other fields, see the README.md","hostInfoTooltip":"Hostname or IP address of the machine running the Docker Daemon.","portInfoTooltip":"Port the Docker daemon is listening to. Default is 2375.","caInfoTooltip":"Certificate authority used to sign the certificate.\\nOnly needed if the certificate was self signed and requires mutual authentication.","certInfoTooltip":"Certificate that identifies the client.\\nOnly needed if mutual authentication is required.","keyInfoTooltip":"Key used to sign the client\'s certificate.\\nOnly needed if mutual authentication is required."}')},84:function(e,t,n){"use strict";(function(e){var r=n(8),c=n(0),a=n(44),s=n(26),o=n(16),i=n(12),l=n(21),u=n(17),d=n(9),j=n(85),h=(n(110),n(1));function b(e){return void 0===e?"":JSON.stringify(e,null,4)}t.a=function(t){var n,f=t.data,O=t.eventKey,p=Object(c.useContext)(a.a),m=Object(c.useState)(!1),x=Object(r.a)(m,2),v=x[0],g=x[1],k=Object(c.useState)(),y=Object(r.a)(k,2),N=y[0],w=y[1],R=Object(c.useState)(),C=Object(r.a)(R,2),D=C[0],I=C[1],T=Object(c.useState)(),S=Object(r.a)(T,2),E=S[0],A=S[1],B=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(p!==O||e){var t=u.a.fromDockerRemoteData(f,g);t.containerLs().then(w).catch(d.b)}},L=null===N||void 0===N?void 0:N.map((function(e,t){return Object(h.jsx)(j.a,{container:e,data:f,fetchContainerLs:B,setContainerDetails:I,setContainerLogs:A},t)}));return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)(o.a,{children:[Object(h.jsx)(s.a.Toggle,{as:o.a.Header,eventKey:O,onClick:function(){return B()},children:Object(h.jsx)("h5",{children:"Containers"})}),Object(h.jsx)(s.a.Collapse,{eventKey:O,children:Object(h.jsxs)(o.a.Body,{children:[v&&Object(h.jsx)(l.a,{animation:"border",size:"sm"}),!v&&void 0===N&&Object(h.jsx)("p",{children:"No containers found"}),!v&&N&&Object(h.jsxs)("table",{className:"table table-hover",children:[Object(h.jsx)("thead",{children:Object(h.jsxs)("tr",{children:[Object(h.jsx)("th",{scope:"col",children:"Name"}),Object(h.jsx)("th",{scope:"col",children:"Image Tag"}),Object(h.jsx)("th",{scope:"col",children:"Created"}),Object(h.jsx)("th",{scope:"col",children:"Status"}),Object(h.jsx)("th",{scope:"col",children:"Actions"})]})}),Object(h.jsx)("tbody",{children:L})]})]})})]}),Object(h.jsxs)(i.a,{dialogClassName:"modal-lg",show:void 0!==D,onHide:function(){return I(void 0)},children:[Object(h.jsx)(i.a.Header,{closeButton:!0,children:Object(h.jsxs)(i.a.Title,{children:[null===D||void 0===D?void 0:D.Name.slice(1)," details"]})}),Object(h.jsx)(i.a.Body,{children:Object(h.jsx)("pre",{children:Object(h.jsx)("code",{children:b(D)})})})]}),Object(h.jsxs)(i.a,{dialogClassName:"modal-lg",show:void 0!==E,onHide:function(){return A(void 0)},children:[Object(h.jsx)(i.a.Header,{closeButton:!0,children:Object(h.jsxs)(i.a.Title,{children:[null===E||void 0===E?void 0:E.name.slice(1)," logs"]})}),Object(h.jsx)(i.a.Body,{children:Object(h.jsx)("pre",{children:Object(h.jsx)("code",{children:(n=null===E||void 0===E?void 0:E.logs,void 0===n?"":n.split("\n").map((function(t){return{header:e.from(t.slice(0,8)),text:t}})).filter((function(e){var t=e.header;return e.text,0!==t[0]})).map((function(e,t){var n=e.header,r=e.text;return Object(h.jsx)("p",{className:"DockerContainers-logs ".concat(2===n[0]?"text-danger":""),children:1===n[0]||2===n[0]?r.slice(8):r},t)})))})})})]})]})}}).call(this,n(106).Buffer)},85:function(e,t,n){"use strict";var r=n(8),c=n(0),a=n(21),s=n(13),o=n(17),i=n(9),l=n(1);function u(e){var t=new Date(1e3*e),n=t.getFullYear(),r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t.getMonth()];return t.getDate()+" "+r+" "+n+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()}t.a=function(e){var t=e.data,n=e.container,d=e.fetchContainerLs,j=e.setContainerDetails,h=e.setContainerLogs,b=Object(c.useState)(!1),f=Object(r.a)(b,2),O=f[0],p=f[1],m=Object(c.useRef)(o.a.fromDockerRemoteData(t,p));return Object(c.useEffect)((function(){o.a.fromDockerRemoteData(t,p)}),[t,p]),Object(l.jsxs)("tr",{children:[O&&Object(l.jsx)("td",{colSpan:5,children:Object(l.jsx)(a.a,{animation:"border",size:"sm"})}),!O&&Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("td",{children:n.Names.map((function(e){return e.slice(1)}))}),Object(l.jsx)("td",{children:n.Image}),Object(l.jsx)("td",{children:u(n.Created)}),Object(l.jsx)("td",{children:n.Status}),Object(l.jsxs)("td",{className:"DockerContainers-actions",children:[Object(l.jsx)(s.a,{variant:"success lg",onClick:function(){m.current.containerRun(n).then((function(){return d(!0)})).then((function(){return Object(i.a)("A new container has started running")})).catch(i.b)},disabled:O,children:Object(l.jsx)("i",{className:"fa fa-play"})}),Object(l.jsx)(s.a,{variant:"info lg",onClick:function(){m.current.containerInspect(n).then(j).catch(i.b)},disabled:O,children:Object(l.jsx)("i",{className:"fa fa-eye"})}),Object(l.jsx)(s.a,{variant:"light lg",onClick:function(){m.current.containerLogs(n).then((function(e){return h({name:n.Names?n.Names[0]:n.Id,logs:e})})).catch(i.b)},disabled:O,children:Object(l.jsx)("i",{className:"fa fa-file-text-o"})}),Object(l.jsx)(s.a,{variant:"primary lg",onClick:function(){m.current.containerRestart(n).then((function(){return d(!0)})).then((function(){return Object(i.a)("The container has been restarted")})).catch(i.b)},disabled:O,children:Object(l.jsx)("i",{className:"fa fa-refresh"})}),Object(l.jsx)(s.a,{variant:"warning lg",onClick:function(){m.current.containerStop(n).then((function(){return d(!0)})).then((function(){return Object(i.a)("The container has been stopped")})).catch(i.b)},disabled:O,children:Object(l.jsx)("i",{className:"fa fa-stop"})}),Object(l.jsx)(s.a,{variant:"danger lg",onClick:function(){m.current.containerRm(n).then((function(){return d(!0)})).then((function(){return Object(i.a)("The container has been deleted")})).catch(i.b)},disabled:O,children:Object(l.jsx)("i",{className:"fa fa-trash"})})]})]})]})}},9:function(e,t,n){"use strict";n.d(t,"b",(function(){return f}));var r=n(41),c=n(0),a=n(24),s=n.n(a),o=(n(101),n(125)),i=n(124),l=n(1),u=[],d={time:3e3,className:"",position:"center"},j=function(){var e=document.getElementById("toast_container"),t=d.position||"center";s.a.render(Object(l.jsx)("div",{className:"toast-list ".concat(t),children:Object(l.jsx)(o.a,{classnames:"list",children:u.map((function(e){return Object(l.jsx)(i.a,{timeout:300,classNames:"toast",children:e.component},e.id)}))})}),e)},h=function(e){var t=e.message,n=e.className,a=e.contentClassName,s=e.clickable,o=e.onClick,i=Object(c.useRef)();Object(c.useLayoutEffect)((function(){if(i.current&&i.current.clientHeight){var e=i.current.clientHeight;i.current.style.height="0px",setTimeout((function(){i&&i.current&&(i.current.style.height="".concat(e,"px"))}),0)}}));var u=["toast-content",s?"clickable":"",a].filter(Boolean).join(" "),d={onClick:o,tabIndex:0,role:"button"};return Object(l.jsx)("div",{ref:i,className:"toast-message ".concat(n),children:Object(l.jsx)("div",Object(r.a)(Object(r.a)({className:u},s&&d),{},{children:t}))})};function b(e,t){var n="number"===typeof t?{time:t}:t||{},r=n.time,c=void 0===r?d.time:r,a=n.clickable,s=void 0!==a&&a,o=n.className,i=void 0===o?d.className:o,b=n.contentClassName,f=void 0===b?"":b,O=n.onClick,p=void 0===O?void 0:O;document.getElementById("toast_container")||console.error("No toast_container element"),u&&Array.isArray(u)||(u=[]),j();var m=Date.now();u.push({id:m,component:Object(l.jsx)(h,{message:e,className:i,clickable:s,onClick:p,contentClassName:f})}),j(),setTimeout((function(){var e=u.findIndex((function(e){return e.id===m}));u.splice(e,1),j()}),c)}function f(e){console.error(e);var t="text-danger",n="An error has occurred.";switch(e.message.slice(0,3)){case"304":n="Nothing has changed.",t="text-warning";break;case"403":n="Forbidden operation.";break;case"404":n="Resource not found.";break;case"409":n="A conflict has emerged."}b("".concat(n,"\nCheck the logs to know more"),{contentClassName:t})}t.a=b},97:function(e,t,n){},98:function(e,t,n){}},[[123,1,2]]]);
//# sourceMappingURL=main.7ded709f.chunk.js.map