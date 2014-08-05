The Prototype Pattern
	将一个已经存在的对象作为模板，去创建另一个对象
	这种模式在js中实现非常方便，因为js实现了本地的prototype代码,而不用像别的语言一样，模仿这一行为
	1\在ECMA5的标准中，js原型模式提供了这样的标准写法
		var vehicle={
			getModel:function(){
				console.log('The model of the vehicle is..'+this.model);
			}
		};

		var car=Object.create(vehicle,{
			'id':{
				value:MY_CLOBAL.nextId(),
				//writable:false,configurable:false by default
				enumerable:true
			},
			"model":{
				value:"Ford",
				enumerable:true
			}
		})

		//需要注意的一点使用原型创建的属性在枚举和hasOwnProperty()check中会出现问题
	2\如果不使用creat,还可以使用另一种方法
		var vehiclePrototype={
			init:function(carModel){
				this.model=carModel;
			},

			getModel:function(){
				console.log("The model of thie vehicle is.."+this.model);
			}
		};
		//创建模型代码
		function vehicle(prototypeObj){
			function F(){};
			F.prototype=prototypeObj;
			var f=new F();
			return f;
		}
		//还有一个可供选择的实现
		var beget=(function(){
			function F(){}
			return function(proto){
				F.prototype=proto;
				return new F();
			}
		})