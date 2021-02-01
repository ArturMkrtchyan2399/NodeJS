function myStack(){
    let stack = []

    return { 
        getSize: () => {
            return stack.length;
        }, 
        isEmpty: () => {
            return stack.length === 0;
        },
        push: (value) => {
            stack.push(value);
        },
        pop: () => {
            if(stack.isEmpty){
                return;
            }
            return stack.pop();
        },
        peek: () => {
            if(stack.isEmpty){
                return;
            }
            return stack[stack.length - 1];
        },
        print:() => {
            stack.forEach(element => {
                console.log(element)
            });
        }
    }
}
//Test
// const stack = myStack();
// stack.push(15);
// stack.push(13);
// stack.push(12);
// stack.push(23);
// stack.push(45);
// console.log(stack.getSize())
// console.log(stack.isEmpty())
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.pop());
// console.log(stack.getSize())
// console.log(stack.isEmpty())

function myQueue(){
    let stack1 = myStack()
    let stack2 = myStack()

    return {
        getSize:() => {
            return stack1.getSize() + stack2.getSize();
        },
        isEmpty:() => {
            return (stack.getSize() + stack2.getSize()) === 0;
        },
        push:(value) => {
            stack1.push(value);
        },
        pop:() => {
            if(stack1.isEmpty() && stack2.isEmpty()){
                return 
            }
            if(stack2.isEmpty()){
                while(!stack1.isEmpty()){
                    stack2.push(stack1.pop())
                }
                return stack2.pop();
            }
            return stack2.pop();
        },
        peek:() => {
            if(stack1.isEmpty() && stack2.isEmpty()){
                return;
            }
            if(stack2.isEmpty()){
                while(!stack1.isEmpty()){
                    stack2.push(stack1.pop())
                }
                return stack2.peek();
            }
            return stack2.peek();
        }
    }
}
// const queue = myQueue();
// queue.push(1);
// queue.push(2);
// queue.push(3);
// queue.push(4);
// queue.push(5);
// queue.push(6);
// console.log(queue.peek())
// console.log(queue.pop())
// console.log(queue.peek())