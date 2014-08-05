The Module Pattern//模块模式
	Modules
		模块是健壮架构中的一个完整的部分，通常可以保持项目中单元的独立性与组织性
	Js下实现模块的方法：
		The Module pattern//享元模式
		Object literal notation//字面值标注
		AMD modules//异步匿名元模块
		CommonJS modules//CommonJS标准
		ECMAScript Harmony modules//ECMAScript一致性
	Object Literals//字面值
		var muModule={
			myProperty:"someValue",
			//举个例子，我们可以建立一个对象的配置
			myConfig:{
				useCaching:true,
				language:"en"
			},
			//基本方法
			saySomething:function(){
				console.log("Where in the world is Paul Irish today?")
			},
			reportMyConfig:function(){
				console.log("Caching is:"+(this.myConfig.useCaching?"enabled":"disabled"))
			},
			updateMyConfig:function(newConfig){
				if(typeof newConfig=="object"){
					this.myConfig=newConfig;
					console.log(this.myConfig.language);
				}
			}
		}
		//更新config
		myModule.updateMyConfig({
			language:"fr",
			useCaching:false
		})
		//更新
		myModule.reportMyConfig();
	Privacy//私有方法模仿
		var testModule=(function(){
			var counter=0;
			return {
				config:{
					name:"testModule"
				}
				incrementCounter:function(){
					console.log(this.config);
					return counter++;
				},
				resetCounter:function(){
					console.log("counter value prior to reset: "+counter);
					counter=0;
				}
			};
		})();
	Template//一个带有命名空间，私有共有方法的模板
		var myNamespac=(function(){
			var myPrivateVar,myPrivateMethod;
			//evaluation
			myPrivateVar=0;
			myPrivateMethod=function(foo){
				console.log(foo);
			}
			return {
				myPublicVar:"foo",
				myPublicFunction:function(){
					myPrivateVar++;
					myPrivateMegthod(bar);
				}
			}
		})
	Example://一个篮子的实例
		var basketModule=(function(){
			var basket=[];
			function doSomethingPrivate(){
				//...
			}
			function doSomethingElsePrivate(){

			}
			return {
				addItem:function(values){
					basket.push(values);
				},
				getItemCount:function(){
					return basket.length;
				},
				doSomething:doSomethingPrivate,
				getTotal:function(){
					var q=this.getItemCount(),
					p=0;
					while(q--){
						p+=basket[q].price;
					}
					return p;
				}
			}
		})();
		basketModule.addItem({
			item:"bread",
			price:0.5
		})
		console.log(basketModule.getItemCount());
		console.log(basketModule.getTotal());
		console.log(basketModule.basket);//这里会显示未定义，也就是只能在Module内部访问
		这个例子中，有一个私有属性basket还有两个私有方法
		公有方法中，addItem通过访问basket进行私有属性的修改
		getItemcount可以后的私有属性的命名
		doSomething直接指向私有方法doSomethingPrivate()
		getTotal中
			先通过共有方法获得basket数组的数量
			然后递加basket中元素的价格，最后返回总价格
	Module Pattern Variations//一些变化的使用
		Import mixins
			//我们可以轻易的引用其他的模块并进行本地的重命名
			var myModule=(function(jQ,_){
				function privateMethod1(){
					$(".container").html("test");
				}
				function privateMethod2(){
					console.log(_.min([10,5,100,2,10000]));
				}
				return{
					publicMethod:function(){
						privateMethod1();
					}
				}
			})($,_);
			myModule.publicMethod();//这里有一点疑惑，$本来就可以从低级scope中获取，为什么还要传值
		Exprots//向全局作用域输出一个模块
			var myModule=(function(){
				//Module object
				var module={},
				privagteVariable="Hello World";

				function privateMethod(){
					//...
				}

				module.publicProperty="Foobar";
				module.publicMethod=function(){
					console.log(privateVariable);
				};

				return module;
			})();
	Dojo注册模块内对象
		require(["dojo/_base/customStore"],function(store){

			//using dojo.setObject()
			store.setObject("basket.core",(function(){
				var basket=[];

				function privateMethod(){
					console.log(basket);
				}

				return {
					publicMethod:function(){
						privateMethod();
					}
				}
			})());
		})
	Ext中的命名空间
		Ext.namespace("myNameSpace");
		myNameSpace.app=(function(){
			//在这一步中，DOM元素还没有加载
			//私有的变量
			var btn1,
				privVar1=11;
			//私有函数
			var btnHandler=function(button,event){
				console.log("privVar1="+privVar1);
				console.log("this.btn1Text=")
			}
			//公有空间
			return {
				btn1Text:"Button 1",
				init:function(){
					if(Ext.Ext2){
						btn1=new Ext.Button({
							renderTo:"btn1-ct",
							text:this.btn1Text,
							handler:btn1Handler
						});
					}else{
						btn1=new Ext.Button("btn1-ct",{
							text:this.btn1Text,
							handler:btn1Handler
						});
					}
				}
			}
		})();
	YUI
		Y.namespace("store.basket");
		Y.store.basket=(function(){
			var myPrivateVar,myPrivateMethod;
			//一些私有的函数：
			myPrivateVar="I can be accessed only within Y.store.basket";
			myPrivateMethod=function(){
				Y.log("I can be accessed only...")
			}
			return {
				myPublicProperty:"I'm a public property.",
				myPublicMethod:function(){
					Y.log("I'm a public method");

					//在basket内可调用私有函数
					Y.log(myPrivateVar);
					Y.log(myPrivateMethod());
					//
					Y.log(this.myPublicProperty);
				}
			}
		})();
	Jquery
		//这个方法可以添加模块，实现模块的初始化
		function library(module){
			$(function)({
				if(module.init){
					module.init();
				}
			});
			reutrn module;
		}
		var myLibrary=library(function(){
			return{
				init:function(){
					//这里添加模块的实现
				}
			}
		})());




