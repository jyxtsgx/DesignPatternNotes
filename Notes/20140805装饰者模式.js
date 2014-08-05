The Desorator Pattern
	装饰者是一个结构化的设计模式，用于实现代码的重用。类似于混入，可以想象成另一个继承模式的变种
	Example1:
		为构造函数增加功能
		function Vehicle(vehicleType){
			//some sane defaults
			this.vehicleType=vehicleType||"car";
			this.model="default";
			this.license="00000-00000";
		};
		//创建一个普通的car
		var testInstance=new Vehicle('car');
		console.log(testInstance);
		//
		var truck=new Vehicle('truck');
		truck.setModel=function(modelName){
			this.model=modelName;
		}
		truck.setColor=function(color){
			this.color=color;
		}
		//这里添加了一些普通的方法
		console.log(truck);
	Example2:
		//等待装饰的构造函数
		function MacBook(){
			this.cost=function(){
				return 997;
			}
			this.screenSize=function(){
				return 11.6;
			}
		}

		//装饰者一号
		function memory(macbook){
			var v=macbook.cost();
			macbook.cost=function(){
				return v+75;
			}
		}

		//装饰者二号

		function engraving(macbook){
			var v=macbook.cost();
			macbook.cost=function(){
				return v+200;
			}
		}