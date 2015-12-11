"use strict";angular.module("iso",["ngRoute"]).constant("FULL",15).config(["$routeProvider","$locationProvider",function(o,t){t.html5Mode(!1)}]);
"use strict";angular.module("iso").controller("worldController",["$scope","$window","$timeout","$interval","$routeParams","Player","World","FULL",function(t,e,i,o,s,r,n,a){var l=this,c=Math.floor(a/2),d=a*c+c;this.world=n.get(r.getY(),r.getX()),this.grid=_.range(0,a*a),this.blocks=0,this.time=0,this.start=Date.now(),this.restart=function(){e.location.reload()},this.isDead=function(){return r.isDead()},this.hasVisited=function(t){return this.world[t].visited},this.isBlocked=function(t,e){var i=this.world[d+e+t*a];return r.isDead()||_.contains(["cube"],i.type)},this.move=function(t,e){this.isBlocked(t,e)||(this.world[d].type="visited-player",r.incPos(t,e),this.world=n.get(r.getY(),r.getX()),_.contains(["enemy","visited-enemy"],this.world[d].type)&&r.kill(),r.isDead()||(this.world[d].type="visited-player",this.blocks++))},this.getOpacity=function(t){var e=Math.floor(t/a),i=(t-e*a)%a,o=Math.sqrt(Math.pow(1+c-e,2)+Math.pow(1+c-i,2));return Math.max(0,1-o/(a+c))},this.getClass=function(t){return d===t?"player":this.world[t].type};var h=function(t){var e=0,o=0;switch(t.keyCode){case 37:e--;break;case 38:o--;break;case 39:e++;break;case 40:o++}(e||o)&&i(function(){return l.move(o,e)})},u=angular.element(document);u.on("keydown",h),t.$on("$destroy",function(){u.off("keydown",h)}),o(function(){r.isDead()||(l.time=(1+Date.now()-l.start)/1e3)},1e3)}]);
"use strict";angular.module("iso").service("Enemy",["$interval","Player","FULL",function(e,o,i){var t=this,s=3*i;this.enemies=[],this.world=void 0,this.add=function(e,o,i,t){this.world=e.world,this.enemies.push({pos:{x:t,y:i},move:{x:0,y:0},cell:o})},this._isEmpty=function(e,o,i){var t=e.pos.y+o,s=e.pos.x+i;if(_.isUndefined(this.world[t])||_.isUndefined(this.world[t][s]))return!1;var n=this.world[t][s];return _.isUndefined(n.type)||_.contains(["enemy","visited-enemy","visited-player"],n.type)},this._canMove=function(e,o,i){return i&&e.move.x&&i!==e.move.x||o&&e.move.y&&o!==e.move.y?!1:this._isEmpty(e,o,i)},this._kill=function(e){o.getY()===e.pos.y&&o.getX()===e.pos.x&&o.kill()},this._move=function(e,o,i){e.pos.x+=i,e.pos.y+=o,e.move.x=i,e.move.y=o,this._kill(e),e.cell.type="visited-enemy",e.cell=this.world[e.pos.y][e.pos.x],e.cell.type="enemy"},this._hasClearCol=function(e){for(var i=e.pos.x<o.getX()?1:-1,t=!0,s=0;t&&e.pos.x+s!==o.getX();)s+=i,t=this._isEmpty(e,0,s);return t},this._hasClearRow=function(e){for(var i=e.pos.y<o.getY()?1:-1,t=!0,s=0;t&&e.pos.y+s!==o.getY();)s+=i,t=this._isEmpty(e,s,0);return t},this._moveAll=function(){var e=this;this.enemies.length&&_.each(this.enemies,function(i){e._kill(i);var t=Math.abs(i.pos.x-o.getX()),n=Math.abs(i.pos.y-o.getY()),r=i.pos.y<o.getY()?1:-1,v=i.pos.x<o.getX()?1:-1;if(s>t&&s>n){if(!t&&e._hasClearRow(i))return e._move(i,r,0);if(!n&&e._hasClearCol(i))return e._move(i,0,v);if(t&&e._canMove(i,0,v))return e._move(i,0,v);if(n&&e._canMove(i,r,0))return e._move(i,r,0)}if(e._canMove(i,i.move.y,i.move.x))return e._move(i,i.move.y,i.move.x);var m=[1,-1][_.random()],l=[1,-1][_.random()];!i.move.y&&e._canMove(i,l,0)?e._move(i,l,0):!i.move.x&&e._canMove(i,0,m)?e._move(i,0,m):e._isEmpty(i,l,0)?e._move(i,l,0):e._isEmpty(i,0,m)&&e._move(i,0,m)})},e(function(){o.isDead()||t._moveAll()},750)}]);
"use strict";angular.module("iso").service("Player",function(){this.x=0,this.y=0,this.dead=!1,this.isDead=function(){return this.dead},this.incPos=function(t,i){this.x+=i,this.y+=t},this.getX=function(){return this.x},this.getY=function(){return this.y},this.kill=function(){this.dead=!0}});
"use strict";angular.module("iso").service("World",["Enemy","FULL",function(n,a){var e=Math.floor(a/2),t=Math.floor(a/4);this.world={},this.maps={},this.enemies=[],this.player={pos:{},move:{}},this._randomMap=function(n){var o=_.random(t,Math.floor(e-n/2)),r=_.random(t,Math.floor(e-n/2)),c=_.range(0,a),i={},h=_.random(e-n,e+n),u=h-o,p=h+o,s=_.range(u,p+1),f=_.random(e-n,e+n),m=f-r,d=f+r,l=_.range(m,d+1);return _.each(c,function(n){i[n]={},_.each(c,function(a){return i[n][a]={}})}),_.each(s,function(n){a>n&&n>=0&&!_.contains([h-1,h,h+1],n)&&(m>=0&&a>m&&(i[m][n].type="cube"),d>=0&&a>d&&(i[d][n].type="cube"))}),_.each(l,function(n){a>n&&n>=0&&!_.contains([f-1,f,f+1],n)&&(u>=0&&a>u&&(i[n][u].type="cube"),p>=0&&a>p&&(i[n][p].type="cube"))}),i},this._generateMap=function(){var n={},e=_.range(0,a),o=void 0;_.each(e,function(a){n[a]={},_.each(e,function(e){return n[a][e]={}})}),_.each([this._randomMap(0),this._randomMap(t)],function(a){_.each(a,function(a,e){_.each(a,function(a,t){a.type&&!n[e][t].type&&(n[e][t].type=a.type,n[e][t].color=o)})})});var r=_.random(a-1),c=_.random(a-1);return n[r][c].type||(n[r][c].type="enemy"),n},this.get=function(t,o){var r=this,c=t>=0?Math.ceil(t/a):Math.floor(t/a);_.each([c-1,c,c+1],function(t){r.maps[t]||(r.maps[t]={});var c=o>=0?Math.ceil(o/a):Math.floor(o/a);_.each([c-1,c,c+1],function(o){r.maps[t][o]||!function(){r.maps[t][o]=r._generateMap();var c=t*a-e;_.each(r.maps[t][o],function(t){r.world[c]=r.world[c]||{};var i=o*a-e;_.each(t,function(a){r.world[c][i]=a,"enemy"===a.type&&n.add(r,a,c,i),i++}),c++})}()})});var i=[];return _.each(_.range(t-e,t+e+1),function(n){_.each(_.range(o-e,o+e+1),function(e){var t=r.world[n][e];t.pos||(t.pos={x:e,y:n}),n%a===0&&e%a===0&&_.contains(["cube"],t.type)&&(t.type=void 0),i.push(t)})}),i}}]);