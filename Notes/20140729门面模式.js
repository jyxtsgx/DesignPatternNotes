The Facade Pattern
	这个模式的理解很简单，jquery的每个方法就相当于一个门面，把jquery内部的很多方法和DOM操作都隐藏到了幕后
	example
		\1
		var addMyEvent=function(el,ev,fn){
			if(el.addEventListener){
				el.addEventListener(ev,fn,false);
			}else if(el.attachEvent){
				el.attachEvent("on"+ev,fn);
			}elae{
				el["on"+ev]=fn;
			}
		}
		bindReady:function(){
			if(document.addEventListener){
				document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);
				window.addEventListener("load",jQuery.ready,false);
			}else if(document.attachEvent){
				document.attachEvent("onreadystatechange",DOMContentLoaded);
				window.attachEvent("onload",jQuery.ready);
			}
		}
	作用：
		封装复杂性
	注意：在使用的时候要权衡性能的损失。有时候多一层封装代表着更多的判断
The Factory Pattern//工厂模式
	工厂模式有两个主要功能，组装对象和为产出提供统一接口
	Example
		//轿车的构造函数
		function Car(options){
			this.doors=options.doors||4;
			this.state=opiions.state||"brand new";
			this.color=options.color||"silver";
		}
		//卡车的构造函数
		function Truck(options){
			this.state=options.state||"used";
			this.wheelSize=options.wheelSize||"large";
			this.color=options.color||"blue";
		}

		//交通工具工厂
		function VehicleFactory(){};
		//默认的类是vehicleClass
		VehicleFactory.prototype.vehicleClass=Car;
		VehicleFactory.prototype.createVehicle=function(options){
			switch(options.vehicleType){
				case "car":
					this.vehicleClass=Car;
					break;
				case "truck":
					this.vehicleClass=Truck;
					break;
			}
			return new this.vehicleClass(options);
		};

		var carFacotry=new VehicleFactory();
		var car=carFacotry.createVehicle({
			vehicleType:"car",
			color:"yellow",
			doors:6
		});
		//
		console.log(car instanceof Car);
		console.log(car);
	分析：
		工厂作为一个实例，需要被构建出来。VehicleFactory即为工厂类
		这个工厂类需要有一个工厂方法VehicleFactory.prototype.createVehicle=function...
		工厂方法根据传入的参数进行选择穿件car还是truck
		最后会根据vehicleClass返回一个new对象 return new this.vehicleClass(options);

	子类的使用
		function TruckFactory(){};
		TruckFactory.prototype=new VehicleFactory();
		TruckFactory.prototype.vehicleClass=Truck;

		var truckFactory=new TruckFactory();
		var myBigTruck=truckFactory.createVehicle({
			state:"omg",
			color:"pink",
			wheelSize:"so big"
		})
Abstract Factories//抽象
	抽象工厂将一系列有相同目标的工厂，封装起来。
	var abstractVehicleFactory=(function(){
		//用于存储具体交通工具的类型
		var types={};

		return{
			getVehicle:function(type,customizations){
				var Vehicle=types[type];

				return(Vehicle?new Vehicle(customizations):null);
			},
			registerVehicle:function(type,Vehicle){
				var proto=Vehicle.prototype;
				//实现了接口才会进行工厂返回
				if(proto.drive&&proto.breakDown){
					//这里做具体工厂的注册
					types[type]=Vehicle;
				}
				//可以链式调用
				return abstractVehicleFactory;
			}
		}
	})();
	abstractVehicleFactory.registerVehicle('car',car).registerVehicle('truck',Truck);
	//实例化一个类
	var car=abstractVehicleFactory.getVehicle('car',{
		color:'lime green',
		state:'like new'
	});
	var truck=abstractVehicleFactory.getVehicle('truck',{
		wheelSize:'medium',
		color:'neon yellow'
	})
Mixin Pattern
	subClass//子类
		var Person=function(firstName,lastName){
			this.firstName=firstName;
			this.lastName=lastName;
			this.gender='male';
		}
		//实例化一个普通人类
		var clark=new Person('Clark','Kent');
		var Superhero=function(firstName,lastName,powers){
			Person.call(this,firstName,lastName);
			this.powers=powers;
		};
		//使用prototype继承person的方法
		Superhero.prototype=Object.create(Person.prototype);
		var Superhero.prototype=Object.create(Person.prototype);
		var superman=new Superhero('Clark','Kent',['flight','heat-vision']);
		console.log(superman);
	Mixins//混入功能
		我们可以将混合继承看做收集不同的功能。
		var Car=function(settings){
			this.model=settings.model||'no model provided';
			this.color=settings.color||'no color provided';
		};
		//即将被mixin的类，拥有下面这些方法
		Mixin=function(){};

		Mixin.prototype={
			driveForward:function(){
				console.log('drive forward');
			},
			driveBackward:function(){
				console.log('drive backward');
			},

			driveSideways:function(){
				console.log('drive sideways');
			}

		}

		function augment(receivingClass,givingClass){
			//混入一部分方法
			if(arguments[2]){
				for(var i=2,len=arguments.length;i<len;i++){
					receivingClass.prototype[arguments[i]]=givingClass.prototype[arguments[i]];
				}
			}
			//混入所有的方法
			else{
				for(var methodName in givingClass.prototype){
					if(!Object.hasOwnProperty.call(receivingClass.prorotype,methodName)){
						receivingClass.prorotype[methodName]=givingClass.prorotype[methodName];
					}
				}
			}
		}
		//使用augement方法来增强driveBackward
		augment(Car,Mixin,'driveForward','driveBackward');
		//Create a new Car
		var myCar=new Car({
			model:"Mercedes benz",
			color:'blue'
		});
		//测试
		myCar.driveForward();
		myCar.driveBackward();
		augment(Car,Mixin);
		var mySportsCar=new Car({
			model:'Porsche',
			color:'red'
		});
		mySportsCar.driveSideways();
