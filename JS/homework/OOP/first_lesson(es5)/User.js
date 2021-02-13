function User(name,age){
    this.name = name;
    this.age = age;
    this.goldenAccount = false;
    this.wallet = 0;
    this.posts = new Set();
}

User.prototype.info = function(){
  return  ` Name - ${this.name}
 Age - ${this.age}
 Money - ${this.wallet}
 `
}

User.prototype.setMoney = function(money){
	this.wallet += money;
}

User.prototype.post = function(newPost){
	this.posts.add(newPost);
}

User.prototype.delete = function(post){
	if(this.posts.has(post)){
		this.posts.delete(post);
	}
}

