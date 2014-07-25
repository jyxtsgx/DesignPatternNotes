The Mediator Pattern//媒介者模式
	1\媒介者模式，通常通过一个对象来建立频道并分发多个事件。相似的还有大家熟知的发布订阅或事件聚簇。在现实世界中，中介代表中立的一方，协助调节冲突和商讨谈判。这里对的Mediator允许我们通过系统中不同的部分可能的交流，露出一个统一的接口。
	2\有个比喻：飞机场的飞机就是各个模块。塔台的负责沟通所有的飞机，塔台相当于一个Mediator
	3\当谈到发布订阅和媒介者，貌似看起来这两个牧师的实现有许多相似的地方，甚至是可以互换的。但实际上的语法和使用这两个模式的意图是十分不同的
	4\媒介者和发布订阅最大的不同在于，发布定于集中的管理了事件分发，而媒介者管理者不同对象之间的关系，并代理一部分工作流和处理过程

用到两种模式的例子
	1\
		var MenuItem=MyFrameworkView.extend({
			events:{
				'click .thatThing':'clickedIt'
			}:,
			clickedIt:function(e){
				e.preventDefault();
				//假设触发'menu:click:foo'
				MyFramework.trigger('menu:click:'+this.model.get('name'));
			}
		})
		// 
		var MyWorkflow=function(){
			MyFramework.on('menu:click:foo',this.doStuff,this);
		}
		//
		MyWorkflow.prototype.doStuff=function(){
			// 实例化多个对象
			// 为这些对象设立事件处理函数
			// 将所有的对象整合到一个有意义的工作流中
		}
	分析：这个例子中，我们把工作流整体抽象出来。当MenuItem被点时，由MyFrame分发事件（订阅分发事件）
	而工作流得到事件后，进行了工作流的处理，这里充当了一个Mediator的角色
	