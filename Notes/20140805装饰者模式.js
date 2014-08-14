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

		//装饰者三号

		function insurance(macbook){
			var v=macbook.cost();
			macbook.cost=function(){
				return v+250;
			}
		}

		//进行多种装饰，实现代码重用

		var mb=new MacBook();
		memory(mb);
		engraving(mb);
		insurance(mb);

		console.log(mb.cost());
		//
		console.log(mb.screenSize());
		//decorator重写了macbook的方法
伪类实现装饰者模式
	来自Pro JavaScript Design Patterns的装饰者有这样的描述：装饰者用于将对象包在另一个实现相同接口的对象中;
	例子：（关于接口的实现详见PJDP书中的描述，这里只写模式实现）
		//这里借由已经实现的接口对象来创建接口
		var reminder=new Interface("List",["summary","placeOrder"]);
		//这个属性显然实现了上面几口中的方法，让我们继续往下看
		var properties={
			name:"Remember to buy the milk",
			date:"05/06/2016",
			actions:{
				summary:function(){
					return "Remember to buy the milk,we are almost out!";
				},
				placeOrder:function(){
					return "Ordering milk from your local grocery store";
				}
			}
		}
		//创建一个构造函数
		function Todo(config){
			//确定config.actions中包含实现了这些参数
			Interface.ensureImplements(config.actions,reminder);

			this.name=config.name;
			this.methods=config.methods;
		}
		//让todoItem拥有这些方法
		var todoItem=Todo(properties);
