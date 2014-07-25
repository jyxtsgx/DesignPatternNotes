The Observer Pattern
	观察者模式。一个集合同事依赖于一个对象，这个对象在发生任何改变时都自动通知那些对象。单个发布通知的对象叫做发布者，而接受发布的集合中的对象都成为。
	模块组件：
		发布者
		观察者
		固定发布者
		固定观察者
	实现：
	//列表君，提供一系列删除增加的操作
		function ObserverList(){
			this.observerList=[];
		};
		ObserverList.prototype.add=function(obj){
			return this.observerList.push(obj);
		};
		ObserverList.prototype.count=function(){
			return this.observerList.length;
		};
		ObserverList.prototype.get=function(index){
			if(index>-1&&index<this.observerList.length){
				return this.observerList[index];
			}
		};
		ObserverList.prototype.indexOf=function(obj,startIndex){
			var i=startIndex;

			while(i<this.observerList.length){
				if(this.observerList.length){
					if(this.observerList[i]===obj){
						return i;
					}
					i++;
				}
			}
			return -1;
		};
		ObserverList.prototype.removeAt=function(index){
			this.observerList.splice(index,1);
		}
	//发布者
		function Subject(){
			this.observers=new ObserverList();
		}
		Subject.prototype.addObserver=function(observer){
			this.observers.add(observer);
		}
		Subject.prototype.removeObserver=function(observer){
			this.observers.removeAt(this.observers.indexOf(observers,0));
		}
		Subject.prototype.notify=function(context){
			var observerCount=this.observers.count();
			for(var i=0;i<observerCount;i++){
				this.observers.get(i).update(context);
			}
		};
	//观察者
		function Observer(){
			this.update=function(){
				//
			}
		}

	下面不扯淡，上一个实例
	HTML
		<button id="addNewObserver">Add New Observer checkbox</button>
		<input id="mainCheckbox" type="checkbox"/>
		<div id="observersContainer"></div>		
	Javascript
		function extend(extension,obj){
			for(var key in extension){
				obj[key]=extension[key];
			}
		}
		var controlCheckbox=document.getElementById('mainCheckbox');
		addBtn=document.getElementById('addNewObserver');
		container=document.getElementById('observersContainer');
		//给新对象进行扩展
		extend(new Subject(),controlCheckbox);//checkbox为事件发布者
		//根据自己的check状态去发布通告
		controlCheckbox.onclick=function(){
			controlCheckbox.notify(controlCheckbox.checked);
		}
		add.onclick=addNewObserver;
		function addNewObserver(){
			var check=document.createElement('input');
			check.type="checkbox";
			//
			extend(new Observer(),check);
			check.update=function(value){
				this.checked=value;
			};
			controlCheckbox.addObserver(check);
			container.appendChild(check);
		}做一个
		下面对这个实现稍作分析
			实际发布者:extend(new Subject(),controlCheckbox);
			实际观察者:extend(new Observer,check);
			在addNewObserver中，先进行了元素的创建，然后增加了observer属性
			接着进行了属性扩展
			重写update为this.checked=value;
			接着进行了观察者的添加controlCheckbox.addObserver(check);
			最后在元素内控制元素可见
Publish/Subscribe Implementations发布订阅模式与观察者模式最大的不同，就在于发布订阅模式建立了多个频道
	作为对比，我们来写一个发布订阅模式的架子
		//一个非常简单的邮件处理程序
		//对于接受信息的计数
		var mailCounter=0;
		//初始化订阅者
		//假定已经实现了
		var subscriber1=subscribe("inbox/newMessage",function(topic,data){
			$(".messageSelnder").html(data.sender);
			$('.messagePreview').html(data.body);
		})
		var subscriber2=subscribe('inbox/newMessage',function(topic,data){
			$('.newMessageCounter').html(++mailCounter);
		})
		publish("inbox/newMessage",[{
			sender:"hello@google.com",
			body:"Hey there! How are you doing today?"
		}]);

		1\Jquery版本的实现
		//Publish发布
		$(el).trigger("/login",[{username:"test",userData:"test"}]);
		//Subscribe
		$(el).on("/login",function(event){...});
		//Unsuscribe
		$(el).off("/login");

		2\JS实现
		var pubsub={};
		(function(myObject){
			//主题/频道的存储
			var topics={};
			//主题标识符
			var subUid=-1;
			//在特定的主题上发布或者广播事件，并让数据得以传递
			myObject.publish=function(topic,args){
				if(!topics[topic]){
					return false;
				}
				var subscriber=topics[topic],
					len=subscribers?subscriber.length:0;
				while(len--){
					//这里调用subscriber的func函数，并向subscriber发送参数
					subscribers[len].func(topic,args);

				}

				return this;
			};
			//订阅一个事件，并传入一个回调函数，事件或主题被观察到时，回调函数自执行
			myObject.subscribe=function(topic,func){
				if(!topics[topic]){
					topics[topic]=[];
				}

				var token=(++subUid).toString();
				topics[topic].push({
					token:token,
					func:func
				});
				return token;
			}
			//取消订阅
			myObject.unSubscribe=function(token){
				for(var m in topics){
					if(topics[m]){
						for(var i=0;j=topics[m].length;i<j;i++){
							if(topice[m][i].token===token){
								topics[m].splice(i,1);
								return token;
							}
						}
					}
				}
				return this;
			};
		})(pubsub);
		//简单分析一下上面的代码。首先是一个import入口，可以将任何对象注册为一个新的发布订阅管理者
		//接着对象中有三个方法，可以分别发布topic+args;订阅topic,func,其中func可以接受topic,func参数;
		//取消订阅token.需要注意的是，这里每一次订阅会有一个token标识符，可以直接由token取消订阅


