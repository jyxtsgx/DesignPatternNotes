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
	抽象工厂将一系列单独的工厂


