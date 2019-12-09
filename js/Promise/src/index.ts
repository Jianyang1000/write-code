class Promise2 {
    state = "pending"
    callbacks = []
    resolveOrReject = (state,index,data) => {
        nextTick(() => {
            if (this.state === "pending") {
                this.state = state
                this.callbacks.forEach(callback => {
                    if (typeof callback[index] === "function") {
                        // 这里还有一个坑，不能直接用callback[0]调用
                        // 如果用callback[0]调用this值为callback
                        var fn = callback[index]
                        fn(data)
                    }
                })

            }
        })
    }
    resolve = (data) => {
        this.resolveOrReject("fulfilled",0,data)
    }
    rejected = (data) => {
        this.resolveOrReject("rejected",1,data)
    }
    constructor(fn) {
        if (typeof fn !== "function") {
            throw new Error("传入的不是函数");
        }
        fn(this.resolve, this.rejected)
    }
    then(success?, fail?) {
        let callback = []
        if (typeof success === "function") {
            callback[0] = success
        }
        if (typeof fail === "function") {
            callback[1] = fail
        }
        this.callbacks.push(callback)
        return new Promise2(() => {})
    }
}

export default Promise2


function nextTick(fn) {
    if (process !== undefined && typeof process.nextTick === "function") {
      return process.nextTick(fn);
    } else {
      var counter = 1;
      var observer = new MutationObserver(fn);
      var textNode = document.createTextNode(String(counter));
  
      observer.observe(textNode, {
        characterData: true
      });
  
      counter = counter + 1;
      textNode.data = String(counter);
    }
  }