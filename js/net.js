class Net extends BaseClass {
    constructor(x,y,width,height) {
    super(x,y,50,50);
      var options = {
          isStatic: true
      }
      this.body = Bodies.rectangle(x, y, width, height, options);
    }
  };
