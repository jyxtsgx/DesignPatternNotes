The Singleton Pattern
	单例模式。传统上来讲，单例模式可以实现为一个类。我们都知道类可以进行实例化。这个类中有一个方法，如果类的实例尚未创建，可以创建类的实例，如果已经创建，则返回对实例的引用。
	单例模式不同于静态类/对象，我们可以延迟实例化，大体上是因为他们需要的某些信息是不可用的。而且对于之前没有引用他们的代码段，不能轻易的取回他们。因为单例既不是类又不是对象，而是一个结构。想象一下闭包变量为何成为闭包，是因为有函数形成了闭包。
	Inplementation
		var mySingleton=(function(){
			var instance;
			function init(){
				//Singleton
				//Private method and variables
				function privateMethod(){
					console.log("I am private");
				}
				var privateVariable="I'm also private";
				var privateRandomNumber=Math.random();
				return{
					publicMethod:function(){
						console.log("The public can see me!");
					},
					publicProperty:"I am also public",
					getRandomNumber:function(){
						return privateRandomNumber;
					}
				};
			};
			return{
				getInstance:function(){
					if(!instance){
						instance=init();
					}
					return instance;
				}
			}
		})();
		//这里有一个单例的实现
	我们来简单的分析一下这个单例的实现。初始化的时候会生成一级闭包，并附命名空间mySingleton
	var instance//这时在闭包内声明变量instance用于存储单例。
	function init(){}//这个函数是一个普通的模块模式实现，其中包含私有共有方法，可以进行实现
	return {getInstance:function(){}}//这里返回的对象中有一个方法，可以实例化单例或者获取引用
		//这里比较重要的一点是：
		//getInstance对于获取对象一定要做一个存在判断，否则实现的单例无效
			if(!instance){
				instance=init();
			}
	简单了解一下单例的使用场景：
		单例适用于在一个系统中，单个需要跟许多对象进行协作的情况
		var SingletonTester=(function(){
			function Singleton(options){
				options=options||{};
				//设置一些
				this.name="SingletonTester";
				this.pointX=options.pointX||6;
				this.pointY=options.pointY||10;
			}
			//our instance holder
			var instance;
			var _static={
				name:"SingletonTester",
				getInstance:function(options){
					if(instance===undefined){
						instance=new Singleton(options);
					}
					return instance;
				}
			};
			return _static;
		})();
		//测试用例
		var SingletonTester=SingletonTester.getInstance({
			pointX:5
		});
		console.log(SingletonTester.pointX);
		//通过这例子我们可以看出，单例模式的核心在于static的部分
		//这个部分必要的特点为必须进行实例是否存在的判断，并返回实例或引用
		//而在接受参数和实例成员方面，我们可以看到，单例模式可以按自己的需求进行各种变化
		//比如在这个例子中实例的初始话发生了很大的变化，new关键字
		//而接受的参数也给函数填入了新的参数

		下面做一个例子，思考一下单例在什么情况下可以使用，例如全局只需要一个对象去发送post请求:
		var singletonAjax=(function({
			var	poster=function(){
				return{
					post:function(url,data,callback){
						$.post(url,data,callback);
					},
					get:function(){
						$.get(url,data,callback);
					}
				}
			};
			//创建实例
			var instance;
			var _static={
				name="hello,I'm a poster",
				getInstance:function(){
					if(instance===undefined){
						return new poster();
					}
					return instance;
				}
			}
			return _static;
		})();
		console.log(singletonAjax.getInstance());
		

