(()=>{"use strict";var e={874:function(e,r,t){var n=this&&this.__awaiter||function(e,r,t,n){return new(t||(t=Promise))((function(a,s){function u(e){try{i(n.next(e))}catch(e){s(e)}}function o(e){try{i(n.throw(e))}catch(e){s(e)}}function i(e){var r;e.done?a(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(u,o)}i((n=n.apply(e,r||[])).next())}))},a=this&&this.__generator||function(e,r){var t,n,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(i){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;s&&(s=0,o[0]&&(u=0)),u;)try{if(t=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,n=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((a=(a=u.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){u.label=o[1];break}if(6===o[0]&&u.label<a[1]){u.label=a[1],a=o;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(o);break}a[2]&&u.ops.pop(),u.trys.pop();continue}o=r.call(e,u)}catch(e){o=[6,e],n=0}finally{t=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};r.__esModule=!0,r.getLevel=void 0;var s=t(553),u=t(736);r.getLevel=function(e,r){return n(this,void 0,void 0,(function(){var t,n,o,i,c,l;return a(this,(function(a){switch(a.label){case 0:return a.trys.push([0,3,,4]),t=e.params.game,n=Number(e.params.level),t&&n?[4,s.default.findOne({game:t,levelNumber:n})]:[2];case 1:return o=a.sent(),[4,u.default.findOne({_id:e.body.userData.user_id})];case 2:return(i=a.sent())?o?(c={winCondition:o.winCondition,name:o.name[i.language],description:o.description[i.language],submitText:o.submitText[i.language]},r.status(200).json(c),[3,4]):[2,r.status(404).send("Level ".concat(n,' of the game "').concat(t,'" not found'))]:[2,r.status(401).send("Invalid Token")];case 3:return l=a.sent(),console.error(l),r.status(500).send("Server error"),[3,4];case 4:return[2]}}))}))}},507:function(e,r,t){var n=this&&this.__awaiter||function(e,r,t,n){return new(t||(t=Promise))((function(a,s){function u(e){try{i(n.next(e))}catch(e){s(e)}}function o(e){try{i(n.throw(e))}catch(e){s(e)}}function i(e){var r;e.done?a(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(u,o)}i((n=n.apply(e,r||[])).next())}))},a=this&&this.__generator||function(e,r){var t,n,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(i){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;s&&(s=0,o[0]&&(u=0)),u;)try{if(t=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,n=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((a=(a=u.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){u.label=o[1];break}if(6===o[0]&&u.label<a[1]){u.label=a[1],a=o;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(o);break}a[2]&&u.ops.pop(),u.trys.pop();continue}o=r.call(e,u)}catch(e){o=[6,e],n=0}finally{t=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};r.__esModule=!0,r.verifyToken=r.checkEmailEligibility=r.checkUsernameEligibility=r.registerUser=r.loginUser=void 0;var s=t(432),u=t(344),o=t(966),i=t(736);r.loginUser=function(e,r){return n(this,void 0,void 0,(function(){var t,n,i,c,l,d,f,p,v;return a(this,(function(a){switch(a.label){case 0:return a.trys.push([0,6,,7]),t=e.body,n=t.login,i=t.password,n&&i?[4,o.default.findOne({email:n})]:[2,r.status(400).send('Invalid input: "password" and "login" are required')];case 1:return(l=a.sent())?[3,3]:[4,o.default.findOne({username:n})];case 2:l=a.sent(),a.label=3;case 3:return d=(c=l).password,(f=c)?[4,s.compare(i,d)]:[3,5];case 4:f=a.sent(),a.label=5;case 5:return f?(p=u.sign({user_id:c._id,isAdmin:c.isAdmin},process.env.TOKEN_KEY,{expiresIn:process.env.TOKEN_LIFETIME}),r.status(200).json(p),[3,7]):(r.status(404).send('User with this "password" and "login" was not found'),[2]);case 6:return v=a.sent(),console.error(v),r.status(500).send("Server error"),[3,7];case 7:return[2]}}))}))},r.registerUser=function(e,r){return n(this,void 0,void 0,(function(){var t,n,c,l,d,f,p,v,h,y;return a(this,(function(a){switch(a.label){case 0:if(a.trys.push([0,4,,5]),t=e.body,n=t.email,c=t.password,l=t.username,d=t.adminPassword,f=!1,!(n&&c&&l))return[2,r.status(400).send('Invalid input: "email", "password" and "username" are required')];if(d){if(d!==process.env.ADMIN_PASSWORD)return[2,r.status(401).send("Invalid admin password")];f=!0}return[4,s.hash(c,10)];case 1:return p=a.sent(),[4,o.default.create({email:n.toLowerCase(),username:l,password:p,isAdmin:f})];case 2:return v=a.sent(),[4,i.default.create({username:l,_id:v._id})];case 3:return a.sent(),h=u.sign({user_id:v._id,isAdmin:f},process.env.TOKEN_KEY,{expiresIn:process.env.TOKEN_LIFETIME}),r.status(201).json(h),[3,5];case 4:return y=a.sent(),console.error(y),r.status(500).send("Server error"),[3,5];case 5:return[2]}}))}))},r.checkUsernameEligibility=function(e){var r=this;return function(t,s,u){return n(r,void 0,void 0,(function(){var r,n;return a(this,(function(a){switch(a.label){case 0:return a.trys.push([0,4,,5]),(r=t.body.username)?[3,1]:[2,s.status(400).send('Invalid input: "username" is required')];case 1:return[4,o.default.findOne({username:r})];case 2:if(a.sent())return[2,s.status(422).send("Username is already taken")];a.label=3;case 3:return e?(s.end(),[3,5]):[2,u()];case 4:return n=a.sent(),console.error(n),s.status(500).send("Server error"),[3,5];case 5:return[2]}}))}))}},r.checkEmailEligibility=function(e){var r=this;return function(t,s,u){return n(r,void 0,void 0,(function(){var r,n;return a(this,(function(a){switch(a.label){case 0:return a.trys.push([0,4,,5]),(r=t.body.email)?[3,1]:[2,s.status(400).send('Invalid input: "email" is required')];case 1:return[4,o.default.findOne({email:r})];case 2:if(a.sent())return[2,s.status(409).send("A user with this email address already exists")];a.label=3;case 3:return e?(s.end(),[3,5]):[2,u()];case 4:return n=a.sent(),console.error(n),s.status(500).send("Server error"),[3,5];case 5:return[2]}}))}))}},r.verifyToken=function(e){var r=this;return function(t,s,o){return n(r,void 0,void 0,(function(){var r,n;return a(this,(function(a){if(!(r=t.body.token||t.query.token||t.headers["x-access-token"]))return[2,s.status(403).send("A token is required for authentication")];try{if(void 0===(n=u.verify(r,process.env.TOKEN_KEY)).user_id||void 0===n.isAdmin)return[2,s.status(401).send("Invalid Token")];if(e&&!n.isAdmin)return[2,s.status(401).send("You don't have rights to do that")];t.body.userData=n}catch(e){return[2,s.status(401).send("Invalid Token")]}return[2,o()]}))}))}}},198:function(e,r,t){var n=this&&this.__awaiter||function(e,r,t,n){return new(t||(t=Promise))((function(a,s){function u(e){try{i(n.next(e))}catch(e){s(e)}}function o(e){try{i(n.throw(e))}catch(e){s(e)}}function i(e){var r;e.done?a(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(u,o)}i((n=n.apply(e,r||[])).next())}))},a=this&&this.__generator||function(e,r){var t,n,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(i){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;s&&(s=0,o[0]&&(u=0)),u;)try{if(t=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,n=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((a=(a=u.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){u.label=o[1];break}if(6===o[0]&&u.label<a[1]){u.label=a[1],a=o;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(o);break}a[2]&&u.ops.pop(),u.trys.pop();continue}o=r.call(e,u)}catch(e){o=[6,e],n=0}finally{t=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};r.__esModule=!0,r.processAvatar=r.getAvatar=r.updateAvatarByUsername=r.updateAvatar=void 0;var s=t(441),u=t(736),o=t(781),i=t(667);r.updateAvatar=function(e,r){return n(this,void 0,void 0,(function(){var t,n,s;return a(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),t=e.body.avatarId,n=e.body.userData.user_id,[4,u.default.findOneAndUpdate({_id:n},{avatarId:t},{new:!0})];case 1:return a.sent(),r.status(200).end(),[3,3];case 2:return s=a.sent(),console.error(s),r.status(500).send("Server error"),[3,3];case 3:return[2]}}))}))},r.updateAvatarByUsername=function(e,r){return n(this,void 0,void 0,(function(){var t,n,s;return a(this,(function(a){switch(a.label){case 0:return a.trys.push([0,4,,5]),t=e.body.avatarId,(n=e.params.username)?[4,u.default.findOneAndUpdate({username:n},{avatarId:t},{new:!0})]:[3,2];case 1:return a.sent(),[3,3];case 2:return[2,r.status(400).send('Invalid input: "username" is required')];case 3:return r.status(200).end(),[3,5];case 4:return s=a.sent(),console.error(s),r.status(500).send("Server error"),[3,5];case 5:return[2]}}))}))},r.getAvatar=function(e,r){return n(this,void 0,void 0,(function(){var t,n,s,o;return a(this,(function(a){switch(a.label){case 0:return a.trys.push([0,3,,4]),(t=e.params.username)?[4,u.default.findOne({username:t})]:[2,r.status(400).send('Invalid input: "username" is required')];case 1:return(n=a.sent())?[4,i.bucket.find({_id:n.avatarId}).toArray()]:[2,r.status(404).send('User with this "username" not found')];case 2:return(s=a.sent())&&0!==s.length?(i.bucket.openDownloadStream(n.avatarId).pipe(r),[3,4]):[2,r.status(404).json({err:"User does not have an avatar"})];case 3:return o=a.sent(),console.error(o),r.status(500).send("Server error"),[3,4];case 4:return[2]}}))}))},r.processAvatar=function(e,r,t){return n(this,void 0,void 0,(function(){var n,u;return a(this,(function(a){try{n=e.file,u=n.buffer,s(u).resize(192,192,{fit:"contain",background:"#fff"}).flatten({background:"#fff"}).jpeg({quality:50}).toBuffer((function(r,a){var s=o.Readable.from(a);i.avatarStorage.fromStream(s,e,n).then((function(r){e.body.avatarId=r.id,t()}))}))}catch(e){console.error(e),r.status(500).send("Server error")}return[2]}))}))}},105:function(e,r,t){var n=this&&this.__awaiter||function(e,r,t,n){return new(t||(t=Promise))((function(a,s){function u(e){try{i(n.next(e))}catch(e){s(e)}}function o(e){try{i(n.throw(e))}catch(e){s(e)}}function i(e){var r;e.done?a(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(u,o)}i((n=n.apply(e,r||[])).next())}))},a=this&&this.__generator||function(e,r){var t,n,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(i){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;s&&(s=0,o[0]&&(u=0)),u;)try{if(t=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,n=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((a=(a=u.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){u.label=o[1];break}if(6===o[0]&&u.label<a[1]){u.label=a[1],a=o;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(o);break}a[2]&&u.ops.pop(),u.trys.pop();continue}o=r.call(e,u)}catch(e){o=[6,e],n=0}finally{t=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};r.__esModule=!0,r.getUserDataByUsername=r.getUserData=r.updateUserDataByUsername=r.updateUserData=void 0;var s=t(736);r.updateUserData=function(e,r,t){return n(this,void 0,void 0,(function(){var n,u,o,i,c,l,d,f;return a(this,(function(a){switch(a.label){case 0:return a.trys.push([0,5,,6]),n=e.body,u=n.language,o=n.levelFlexbox,u||o?(i=void 0,e.body.username?e.body.userData.isAdmin?(c=String(e.body.username),[4,s.default.findOneAndUpdate({username:c},{language:u,levelFlexbox:o},{new:!0})]):[2,r.status(401).send("You don't have rights to do that")]:[3,2]):[2,t()];case 1:return i=a.sent(),[3,4];case 2:return l=e.body.userData.user_id,[4,s.default.findOneAndUpdate({_id:l},{language:u,levelFlexbox:o},{new:!0})];case 3:i=a.sent(),a.label=4;case 4:return d={language:i.language,levelFlexbox:i.levelFlexbox},r.status(200).json(d),[3,6];case 5:return f=a.sent(),console.error(f),r.status(500).send("Server error"),[3,6];case 6:return[2]}}))}))},r.updateUserDataByUsername=function(e,r,t){return n(this,void 0,void 0,(function(){var n,u,o,i,c,l,d;return a(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),n=e.body,u=n.language,o=n.levelFlexbox,u||o?(i=e.params.username)?[4,s.default.findOneAndUpdate({username:i},{language:u,levelFlexbox:o},{new:!0})]:[2,r.status(400).send('Invalid input: "username" is required')]:[2,t()];case 1:return c=a.sent(),l={language:c.language,levelFlexbox:c.levelFlexbox},r.status(200).json(l),[3,3];case 2:return d=a.sent(),console.error(d),r.status(500).send("Server error"),[3,3];case 3:return[2]}}))}))},r.getUserData=function(e,r){return n(this,void 0,void 0,(function(){var t,n,u,o,i;return a(this,(function(a){switch(a.label){case 0:return a.trys.push([0,5,,6]),t=void 0,e.body.username?e.body.userData.isAdmin?(n=String(e.body.username),[4,s.default.findOne({username:n})]):[2,r.status(401).send("You don't have rights to do that")]:[3,2];case 1:return(t=a.sent())?[3,4]:[2,r.status(404).send('User with this "nickname" not found')];case 2:return u=e.body.userData.user_id,[4,s.default.findOne({_id:u})];case 3:t=a.sent(),a.label=4;case 4:return o={language:t.language,levelFlexbox:t.levelFlexbox},r.status(200).json(o),[3,6];case 5:return i=a.sent(),console.error(i),r.status(500).send("Server error"),[3,6];case 6:return[2]}}))}))},r.getUserDataByUsername=function(e,r){return n(this,void 0,void 0,(function(){var t,n,u,o;return a(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),(t=e.params.username)?e.body.userData.isAdmin?[4,s.default.findOne({username:t})]:[2,r.status(401).send("You don't have rights to do that")]:[2,r.status(400).send('Invalid input: "username" is required')];case 1:return(n=a.sent())?(u={language:n.language,levelFlexbox:n.levelFlexbox},r.status(200).json(u),[3,3]):[2,r.status(404).send('User with this "nickname" not found')];case 2:return o=a.sent(),console.error(o),r.status(500).send("Server error"),[3,3];case 3:return[2]}}))}))}},776:function(e,r,t){var n=this&&this.__awaiter||function(e,r,t,n){return new(t||(t=Promise))((function(a,s){function u(e){try{i(n.next(e))}catch(e){s(e)}}function o(e){try{i(n.throw(e))}catch(e){s(e)}}function i(e){var r;e.done?a(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(u,o)}i((n=n.apply(e,r||[])).next())}))},a=this&&this.__generator||function(e,r){var t,n,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(i){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;s&&(s=0,o[0]&&(u=0)),u;)try{if(t=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,n=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((a=(a=u.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){u.label=o[1];break}if(6===o[0]&&u.label<a[1]){u.label=a[1],a=o;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(o);break}a[2]&&u.ops.pop(),u.trys.pop();continue}o=r.call(e,u)}catch(e){o=[6,e],n=0}finally{t=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};r.__esModule=!0,r.getUsersRecords=void 0;var s=t(736);r.getUsersRecords=function(e,r){return n(this,void 0,void 0,(function(){var t,n,u,o,i,c,l,d;return a(this,(function(a){switch(a.label){case 0:return a.trys.push([0,3,,4]),t=e.query,n=s.default.find(),t.limit>=0&&(t.page>=0&&n.skip(t.limit*(t.page-1)),n.limit(t.limit)),n.sort([[t.sort,t.order]]),n.select({_id:0,username:1,levelFlexbox:1}),[4,n.exec()];case 1:return u=a.sent(),i=(o=r).setHeader,c=["X-Total-Count"],l="".concat,[4,s.default.find().estimatedDocumentCount().exec()];case 2:return i.apply(o,c.concat([l.apply("",[a.sent()])])),r.status(200).json(u),[3,4];case 3:return d=a.sent(),console.error(d),r.status(500).send("Server error"),[3,4];case 4:return[2]}}))}))}},607:(e,r,t)=>{r.__esModule=!0,r.listen=r.MONGODB_URI=r.PORT=void 0;var n=t(860);t(142).config();var a=t(470),s=t(582),u=t(14),o=t(667);r.PORT=process.env.PORT,r.MONGODB_URI=process.env.MONGODB_URI;var i=n();i.use(s()),i.use(n.json()),i.use(n.urlencoded({extended:!0})),a.token("body",(function(e){return JSON.stringify(e.body)})),i.use(a(":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]")),i.use("/",u.router),r.listen=function(){i.listen(r.PORT),console.log("Server started at http://localhost:"+r.PORT)},(0,o.connect)()},667:function(e,r,t){var n=this&&this.__awaiter||function(e,r,t,n){return new(t||(t=Promise))((function(a,s){function u(e){try{i(n.next(e))}catch(e){s(e)}}function o(e){try{i(n.throw(e))}catch(e){s(e)}}function i(e){var r;e.done?a(e.value):(r=e.value,r instanceof t?r:new t((function(e){e(r)}))).then(u,o)}i((n=n.apply(e,r||[])).next())}))},a=this&&this.__generator||function(e,r){var t,n,a,s,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(i){return function(o){if(t)throw new TypeError("Generator is already executing.");for(;s&&(s=0,o[0]&&(u=0)),u;)try{if(t=1,n&&(a=2&o[0]?n.return:o[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;switch(n=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,n=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!((a=(a=u.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){u=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){u.label=o[1];break}if(6===o[0]&&u.label<a[1]){u.label=a[1],a=o;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(o);break}a[2]&&u.ops.pop(),u.trys.pop();continue}o=r.call(e,u)}catch(e){o=[6,e],n=0}finally{t=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}};r.__esModule=!0,r.upload=r.avatarStorage=r.bucket=r.connect=void 0;var s=t(738),u=t(185),o=t(607),i=t(940);function c(){var e=u.default.connections[0].db;r.bucket=new u.default.mongo.GridFSBucket(e,{bucketName:"filesBucket"})}t(142).config(),r.connect=function e(){return n(this,void 0,void 0,(function(){return a(this,(function(r){u.default.set("strictQuery",!0),u.default.connection.on("error",console.error).on("disconnected",e).on("connected",c).once("open",o.listen);try{return[2,u.default.connect(o.MONGODB_URI,{})]}catch(e){throw e}return[2]}))}))},r.avatarStorage=new i.GridFsStorage({url:process.env.MONGODB_URI,file:function(e){return new Promise((function(r){r({filename:e.body._id+"avatar",bucketName:"filesBucket"})})).catch((function(e){return console.error(e)}))}}),r.upload=s({fileFilter:function(e,r,t){r.mimetype.includes("jpeg")||r.mimetype.includes("png")||r.mimetype.includes("jpg")?t(null,!0):t(null,!1)}})},553:(e,r,t)=>{r.__esModule=!0,r.schema=void 0;var n=t(185),a=new n.Schema({levelNumber:{type:Number,required:!0},game:{type:String,required:!0},winCondition:{type:String,required:!0},name:{en_us:{type:String,required:!0},es_es:{type:String,required:!0},ru:{type:String,required:!0},uk:{type:String,required:!0}},description:{en_us:{type:String,required:!0},es_es:{type:String,required:!0},ru:{type:String,required:!0},uk:{type:String,required:!0}},submitText:{en_us:{type:String,required:!0},es_es:{type:String,required:!0},ru:{type:String,required:!0},uk:{type:String,required:!0}}}),s=n.default.model("LevelData",a);r.schema=s.schema,r.default=s},966:(e,r,t)=>{r.__esModule=!0,r.schema=void 0;var n=t(185),a=new n.Schema({username:{type:String,unique:!0,required:!0},email:{type:String,unique:!0,required:!0},password:{type:String,required:!0},isAdmin:{type:Boolean,required:!0}}),s=n.default.model("User",a);r.schema=s.schema,r.default=s},736:(e,r,t)=>{r.__esModule=!0,r.schema=void 0;var n=t(185),a=t(13),s=new n.Schema({username:{type:String,unique:!0,required:!0},levelFlexbox:{type:Number,required:!0,default:1},language:{type:String,required:!0,default:"en_us"},avatarId:{type:a.ObjectId,required:!0,default:"63d663c156bef39ec55d01ae"}}),u=n.default.model("UserData",s);r.schema=u.schema,r.default=u},14:(e,r,t)=>{r.__esModule=!0,r.router=void 0;var n=t(507),a=t(860),s=t(667),u=t(198),o=t(105),i=t(776),c=t(874);r.router=a.Router(),r.router.post("/login",n.loginUser),r.router.post("/register",(0,n.checkEmailEligibility)(!1),(0,n.checkUsernameEligibility)(!1),n.registerUser),r.router.post("/register/check-username",(0,n.checkUsernameEligibility)(!0)),r.router.post("/register/check-email",(0,n.checkEmailEligibility)(!0)),r.router.patch("/avatar",(0,n.verifyToken)(!1),s.upload.single("file"),u.processAvatar,(0,n.verifyToken)(!1),u.updateAvatar),r.router.get("/avatar/:username",u.getAvatar),r.router.patch("/avatar/:username",(0,n.verifyToken)(!0),s.upload.single("file"),u.processAvatar,(0,n.verifyToken)(!0),u.updateAvatarByUsername),r.router.patch("/user",(0,n.verifyToken)(!1),o.updateUserData,o.getUserData),r.router.get("/user",(0,n.verifyToken)(!1),o.getUserData),r.router.patch("/user/:username",(0,n.verifyToken)(!0),o.updateUserDataByUsername,o.getUserDataByUsername),r.router.get("/user/:username",(0,n.verifyToken)(!0),o.getUserDataByUsername),r.router.get("/records",(0,n.verifyToken)(!1),i.getUsersRecords),r.router.get("/levels/:game/:level",(0,n.verifyToken)(!1),c.getLevel)},432:e=>{e.exports=require("bcryptjs")},582:e=>{e.exports=require("cors")},142:e=>{e.exports=require("dotenv")},860:e=>{e.exports=require("express")},344:e=>{e.exports=require("jsonwebtoken")},13:e=>{e.exports=require("mongodb")},185:e=>{e.exports=require("mongoose")},470:e=>{e.exports=require("morgan")},738:e=>{e.exports=require("multer")},940:e=>{e.exports=require("multer-gridfs-storage")},441:e=>{e.exports=require("sharp")},781:e=>{e.exports=require("stream")}},r={};!function t(n){var a=r[n];if(void 0!==a)return a.exports;var s=r[n]={exports:{}};return e[n].call(s.exports,s,s.exports,t),s.exports}(607)})();