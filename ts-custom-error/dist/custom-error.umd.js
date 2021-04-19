!function(global,factory){"object"==typeof exports&&"undefined"!=typeof module?factory(exports):"function"==typeof define&&define.amd?define(["exports"],factory):factory(global.tsCustomError={})}(this,function(exports){function fixStack(target,fn){void 0===fn&&(fn=target.constructor);var captureStackTrace=Error.captureStackTrace;captureStackTrace&&captureStackTrace(target,fn)}var extendStatics,__extends=(extendStatics=function(d,b){return(extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])})(d,b)},function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}),CustomError=function(_super){function CustomError(message){var target,prototype,setPrototypeOf,_newTarget=this.constructor,_this=_super.call(this,message)||this;return Object.defineProperty(_this,"name",{value:_newTarget.name,enumerable:!1,configurable:!0}),target=_this,prototype=_newTarget.prototype,(setPrototypeOf=Object.setPrototypeOf)?setPrototypeOf(target,prototype):target.__proto__=prototype,fixStack(_this),_this}return __extends(CustomError,_super),CustomError}(Error),__spreadArrays=function(){for(var arguments$1=arguments,s=0,i=0,il=arguments.length;i<il;i++)s+=arguments$1[i].length;for(var r=Array(s),k=0,i=0;i<il;i++)for(var a=arguments[i],j=0,jl=a.length;j<jl;j++,k++)r[k]=a[j];return r};exports.CustomError=CustomError,exports.customErrorFactory=function(fn,parent){function CustomError(){for(var arguments$1=arguments,args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments$1[_i];if(!(this instanceof CustomError))return new(CustomError.bind.apply(CustomError,__spreadArrays([void 0],args)));parent.apply(this,args),Object.defineProperty(this,"name",{value:fn.name||parent.name,enumerable:!1,configurable:!0}),fn.apply(this,args),fixStack(this,CustomError)}return void 0===parent&&(parent=Error),Object.defineProperties(CustomError,{prototype:{value:Object.create(parent.prototype,{constructor:{value:CustomError,writable:!0,configurable:!0}})}})}});