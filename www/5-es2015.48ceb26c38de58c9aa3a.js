(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{HxNh:function(n,t,e){"use strict";e.r(t);var o=e("8Y7J");class i{}var l=e("pMnS"),s=e("MKJQ"),a=e("sZkV"),r=e("lGQG"),c=e("5dVO"),u=e("2g2N"),d=e("n90K");class _{constructor(n,t,e,o,i,l){this.nav=n,this.authService=t,this.loader=e,this.toastService=o,this.router=i,this.storageService=l,this.seg_id=1,this.photo="assets/images/user.jpg",this.reviews=[],this.postData={name:"",email:"",password:"",password_confirmation:"",phone:"",address:"",business_name:"",user_id:""},this.storageService.getData().then(n=>{n?(this.postData.user_id=n.result_FrontLogin.id,this.ViewProfile()):this.postData.user_id=""})}ngOnInit(){}ViewProfile(){this.loader.loadingPresent(),this.authService.viewProfile({user_id:this.postData.user_id}).subscribe(n=>{console.log("My shipping_addresses => "+JSON.stringify(n)),!1===n.error?(this.loader.loadingDismiss(),this.postData.name=n.result_viewProfile.name,this.postData.phone=n.result_viewProfile.phone,this.postData.address=n.result_viewProfile.address,this.postData.business_name=n.result_viewProfile.business_name,this.postData.email=n.result_viewProfile.email):(this.loader.loadingDismiss(),this.toastService.presentToast(n.msg))},n=>{this.loader.loadingDismiss(),null!=JSON.stringify(n.error.errors)?this.toastService.presentToast(JSON.stringify(n.error.errors)):this.toastService.presentToast("Network Issue...")})}validateInputs(){const n=this.postData.name.trim();return this.postData.name&&n.length>0}UpdateProfile(){this.validateInputs()?(this.loader.loadingPresent(),this.authService.updateProfile({user_id:this.postData.user_id,name:this.postData.name,phone:this.postData.phone,address:this.postData.address,business_name:this.postData.business_name}).subscribe(n=>{console.log("My shipping_addresses => "+JSON.stringify(n)),!1===n.error?(this.loader.loadingDismiss(),this.toastService.presentToast(n.msg),this.ViewProfile()):(this.loader.loadingDismiss(),this.toastService.presentToast(n.msg))},n=>{this.loader.loadingDismiss(),null!=JSON.stringify(n.error.errors)?this.toastService.presentToast(JSON.stringify(n.error.errors)):this.toastService.presentToast("Network Issue...")})):(this.loader.loadingDismiss(),this.toastService.presentToast("All fields are required..."))}goToAddress(){this.router.navigate(["manage-address"])}goToEditProfile(){this.router.navigate(["edit-profile"])}}var g=e("iInd"),p=o.nb({encapsulation:0,styles:[["ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--color:white}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50%;height:50%}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:22px}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-badge[_ngcontent-%COMP%]{position:absolute;right:3px;bottom:14px}.main_content_div[_ngcontent-%COMP%]{width:100%}.main_content_div[_ngcontent-%COMP%]   .back_image[_ngcontent-%COMP%]{height:300px;width:100%;background-position:center;background-size:cover;background-repeat:no-repeat;position:relative}.main_content_div[_ngcontent-%COMP%]   .back_image[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{position:absolute;bottom:20px;right:20px;--background:white;color:#000;font-weight:600}.main_content_div[_ngcontent-%COMP%]   .white_div[_ngcontent-%COMP%]{height:90px;width:90px;background:center/cover no-repeat #fff;border-radius:50%;margin:-45px auto auto;position:relative;border:4px solid #fff}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]{padding:20px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{display:block}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .usernane[_ngcontent-%COMP%]{text-align:center;font-weight:600;font-size:18px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .location[_ngcontent-%COMP%]{margin-top:10px;text-align:center;color:gray;font-size:14px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .pin[_ngcontent-%COMP%]{color:gray}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div[_ngcontent-%COMP%]{margin-top:20px;display:flex;flex-direction:row;align-items:center;justify-content:space-around}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{color:#000;font-size:.8rem;border:1px solid #d3d3d3;border-radius:5px;padding:5px;text-align:center}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{border:1px solid #d3d3d3;border-radius:5px;color:#000}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div1[_ngcontent-%COMP%]{margin-top:20px;display:flex;justify-content:center;flex-direction:column;align-items:center}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div1[_ngcontent-%COMP%]   .gray_div[_ngcontent-%COMP%]{height:60px;width:60px;border-radius:5px;background:#d3d3d3;position:relative}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .flex_div1[_ngcontent-%COMP%]   .history[_ngcontent-%COMP%]{width:45px;height:45px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .segment_div[_ngcontent-%COMP%]{display:flex;margin-top:20px;border-bottom:1px solid #d3d3d3}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .segment_div[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{margin-right:30px;color:gray;padding-bottom:10px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .segment_div[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]{border-bottom:1px solid red}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .segment_detail[_ngcontent-%COMP%]{padding-top:20px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .segment_detail[_ngcontent-%COMP%]   .sleepy[_ngcontent-%COMP%]{margin:auto;display:block}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .segment_detail[_ngcontent-%COMP%]   .sleepy_lbl[_ngcontent-%COMP%]{display:block;text-align:center;margin-top:20px;margin-bottom:20px;color:gray;font-size:14px}.main_content_div[_ngcontent-%COMP%]   .content_div[_ngcontent-%COMP%]   .logout[_ngcontent-%COMP%]{--border-radius:5px;margin-top:20px;font-weight:600}"]],data:{}});function b(n){return o.Hb(0,[(n()(),o.pb(0,0,null,null,10,"ion-header",[],null,null,null,s.mb,s.q)),o.ob(1,49152,null,0,a.C,[o.h,o.k,o.x],null,null),(n()(),o.pb(2,0,null,0,8,"ion-toolbar",[["color","primary"]],null,null,null,s.Rb,s.V)),o.ob(3,49152,null,0,a.Ab,[o.h,o.k,o.x],{color:[0,"color"]},null),(n()(),o.pb(4,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,s.bb,s.f)),o.ob(5,49152,null,0,a.m,[o.h,o.k,o.x],null,null),(n()(),o.pb(6,0,null,0,1,"ion-menu-button",[["autoHide","false"]],null,null,null,s.vb,s.A)),o.ob(7,49152,null,0,a.S,[o.h,o.k,o.x],{autoHide:[0,"autoHide"]},null),(n()(),o.pb(8,0,null,0,2,"ion-label",[],null,null,null,s.sb,s.w)),o.ob(9,49152,null,0,a.O,[o.h,o.k,o.x],null,null),(n()(),o.Gb(-1,0,[" My Account "])),(n()(),o.pb(11,0,null,null,18,"ion-content",[],null,null,null,s.hb,s.l)),o.ob(12,49152,null,0,a.v,[o.h,o.k,o.x],null,null),(n()(),o.pb(13,0,null,0,16,"div",[["class","main_content_div"]],null,null,null,null,null)),(n()(),o.pb(14,0,null,null,0,"div",[["class","back_image"]],[[4,"backgroundImage",null]],null,null,null,null)),(n()(),o.pb(15,0,null,null,0,"div",[["class","white_div"]],[[4,"backgroundImage",null]],null,null,null,null)),(n()(),o.pb(16,0,null,null,13,"div",[["class","content_div"]],null,null,null,null,null)),(n()(),o.pb(17,0,null,null,2,"ion-label",[["class","usernane"]],null,null,null,s.sb,s.w)),o.ob(18,49152,null,0,a.O,[o.h,o.k,o.x],null,null),(n()(),o.Gb(19,0,["",""])),(n()(),o.pb(20,0,null,null,2,"ion-label",[["class","location"]],null,null,null,s.sb,s.w)),o.ob(21,49152,null,0,a.O,[o.h,o.k,o.x],null,null),(n()(),o.Gb(22,0,[" "," "])),(n()(),o.pb(23,0,null,null,6,"div",[["class","flex_div"]],null,null,null,null,null)),(n()(),o.pb(24,0,null,null,2,"ion-label",[],null,[[null,"click"]],(function(n,t,e){var o=!0;return"click"===t&&(o=!1!==n.component.goToEditProfile()&&o),o}),s.sb,s.w)),o.ob(25,49152,null,0,a.O,[o.h,o.k,o.x],null,null),(n()(),o.Gb(-1,0,["Edit Profile"])),(n()(),o.pb(27,0,null,null,2,"ion-label",[],null,[[null,"click"]],(function(n,t,e){var o=!0;return"click"===t&&(o=!1!==n.component.goToAddress()&&o),o}),s.sb,s.w)),o.ob(28,49152,null,0,a.O,[o.h,o.k,o.x],null,null),(n()(),o.Gb(-1,0,["Manage Address"]))],(function(n,t){n(t,3,0,"primary"),n(t,7,0,"false")}),(function(n,t){var e=t.component;n(t,14,0,"url(assets/pf_img2.png)"),n(t,15,0,"url("+e.photo+")"),n(t,19,0,e.postData.name),n(t,22,0,e.postData.email)}))}function h(n){return o.Hb(0,[(n()(),o.pb(0,0,null,null,1,"app-my-profile",[],null,null,null,b,p)),o.ob(1,114688,null,0,_,[a.Hb,r.a,c.a,u.a,g.m,d.a],null,null)],(function(n,t){n(t,1,0)}),null)}var m=o.lb("app-my-profile",_,h,{},{},[]),v=e("SVse"),P=e("s7LF");class O{}e.d(t,"MyProfilePageModuleNgFactory",(function(){return M}));var M=o.mb(i,[],(function(n){return o.yb([o.zb(512,o.j,o.X,[[8,[l.a,m]],[3,o.j],o.v]),o.zb(4608,v.k,v.j,[o.s,[2,v.q]]),o.zb(4608,P.m,P.m,[]),o.zb(4608,a.c,a.c,[o.x,o.g]),o.zb(4608,a.Gb,a.Gb,[a.c,o.j,o.p]),o.zb(4608,a.Kb,a.Kb,[a.c,o.j,o.p]),o.zb(1073742336,v.b,v.b,[]),o.zb(1073742336,P.l,P.l,[]),o.zb(1073742336,P.b,P.b,[]),o.zb(1073742336,a.Cb,a.Cb,[]),o.zb(1073742336,g.o,g.o,[[2,g.t],[2,g.m]]),o.zb(1073742336,O,O,[]),o.zb(1073742336,i,i,[]),o.zb(1024,g.k,(function(){return[[{path:"",component:_}]]}),[])])}))}}]);