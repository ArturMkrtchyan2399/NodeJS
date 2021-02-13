function Post(description,picture){
	this.description = description;
	this.picture = picture;
}

Post.prototype.print = function() {
	return `Description - ${this.description}, ${this.picture.printPictureSize()}`
};
