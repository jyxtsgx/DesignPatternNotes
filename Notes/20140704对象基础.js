基础部分
	Object的创建，三种方法
		1\	var newObject={};//字面值
		2\	var newObject=Object.create(Object.prorotype);//根据原型创建
		3\	var newObject=new Object();//new 关键字
	属性值的创建
		1\	newObject.someKey="Hello World";
		2\	newObject["someKey"]="Hello World";
		3\	Object.defineProperty(newObject,"someKey",{
				value:"for more control of the property's behavior",
				writable:true,
				enumerable:true,
				configurable:true
			})
			//函数式
			var defineProp=function(){
				var config={
					value:value,
					writable:true,
					enumerable:true,
					configurable:true
				}
				Object.defineProperty(obj,key,config);
			}
		4\	Object.defineProperties(newObject,{
				"someKey":{
					value:"Hello World",
					writable:true
				},
				"anotherKey":{
					value:"Foo bar",
					writable:false
				}
			})
	构造函数
		function Car(model,year,miles){
			this.model=model;
			this.year=year;
			this.miles=miles;
			this.toString=function(){
				return this.model+"had done"+this.miles+"miles";
			}
		}
		var civic=new Car('Huayra',2010,5000);
	重写方法
		Car.prorotype.toString=function(){
			return this.model+"had done"+this.miles+"miles";
		}
