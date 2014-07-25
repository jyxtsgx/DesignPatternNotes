JavaScript DesignPattern
	1\Create a Class
		function Car(model){
			this.model=model;
			this.color='silver';
			this.year='2012';

			this.getInfo=function(){
				return this.model+" "+this.year;
			}
		}
	2\overView of DesignPattern
		Creational\\创建型模式
			Class
				Factory Method
					工厂方法，基于事件或接口化数据创建一个实例
			Object
				Abstract Factory\\抽象工厂
					基于借口约定或父类，创建一系列（族）实例。消除与具体类的耦合
				Builder
					建立者模式将对象建造和表示隔开
				Prototype
					原型，用作模板
				Singleton
					在全局作用域(global access points)，一个类对应一个
		Structural\\结构型模式
			Class
				Adapter\\适配器
					匹配不同的接口，通常使老接口得以复用
			Object
				Adapter
				Bridge\\桥接
					将一个对象的接口和实现分开
				Composite
					一个简单与复合对象的组织结构，将各部分组织成一个整体
				Decorator
					为对象动态添加可替换的处理方法
				Facade
					隐藏类内部的复杂性
				Flyweight
					一个细粒度的实例，用于分享信息
				Proxy
					一个站位对象，用于代替真实对象
		Behavioral\\表现型模式
			Class
				Iterpreter
					解释器，用于将现有语言元素匹配到目标语言
				Template Method
					在方法中创建一个算法壳，并在具体执行中作出区别
			Object
				Chain of Responsibility
					链式职责传递
				Command
					将命令请求封装到一个对象中，实现日志，队列，错误实现
				Iterator
					迭代器实现在不了解序列内部实现的前提下，按序列获取集合内容
				Mediator
					简化类之间的通信，从而避免一批类之间的相互引用
				Mementto
					捕捉对象内部状态并做延迟存储
				Observer
					通知一系列类进行改变，保持他们之间的一致性
				State
					状态机
				Strategy
					策略模式
						将算法封装到类中，把选择和实现隔开
				Visitor
					在不改变类的前提下，为一个类提供新的方法
完全不懂的模式
	桥接模式
	flyweght
	Template Method
	mediator
	strategy
	visitor
	state
不熟悉的模式
	建造者模式



