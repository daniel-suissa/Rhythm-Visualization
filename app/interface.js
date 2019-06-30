
define(['./Wheel', './Hand', './config'], function (Wheel, Hand, config) {
	var Interface = class {
		constructor(sk) {
			this.sk = sk
			this.wheels = [];
			this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);			
			this.createWheels();
			this.createHand();
		}

		createHand() {
			// should only happen after createWheels
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
			const length = this.wheels[this.wheels.length - 1].radius

			this.hand = new Hand(this.sk, 
				xCenter, 
				yCenter, 
				length,
				this.wheels)
		}
		
		createWheels() {
			this.wheels = []
			const xCenter = this.width / 2;
	    	const yCenter = this.height / 2;
			
			for (var i = 0; i < config.wheelsConfig.wheels.length ; i++) {
				const wheelConfig = config.wheelsConfig.wheels[i]
				let wheel = new Wheel(this.sk, 
										xCenter, 
										yCenter, 
										wheelConfig.radius,
										wheelConfig.color, 
										wheelConfig.base)
				this.wheels.push(wheel)
			}
		}

		preload() {
			this.wheels.forEach( (wheel) => {
				wheel.preload()
			})
		}

		draw() {
			//draw wheels outside-in
			for (var i = this.wheels.length - 1; i > -1 ; i--) {
				this.wheels[i].draw()
			}
			this.hand.draw()
		}

		getIntersectObj(x, y) {
			for(var i = 0; i < this.wheels.length; i++) {
				let obj = this.wheels[i].getIntersectObj(x, y)
				if (obj != null) {
					return obj
				}
			}
			return null
		}


		mousePressed() {
			let obj = this.getIntersectObj(this.sk.mouseX, this.sk.mouseY)

			if (obj != null) {
				obj.clickAction(this.sk.mouseX, this.sk.mouseY)
			}
		}
	}
	return Interface
})