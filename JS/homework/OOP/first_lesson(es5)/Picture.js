function Picture(url,width,height){
	this.url = url;
	this.width = width;
	this.height = height;
}

Picture.prototype.printPictureSize = function() {
	return `Width - ${this.width}, Height - ${this.height}`
};