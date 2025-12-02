// File: CustomStackDemo.java
import java.util.*;

class CustomStack {
    private int[] stack;
    private int size;
    private int maxSize;

    public CustomStack(int maxSize) {
        this.maxSize = maxSize;
        this.stack = new int[maxSize];
        this.size = 0;
    }

    public void push(int x) {
        if (size < maxSize) {
            stack[size] = x;
            size++;
        }
    }

    public int pop() {
        if (size == 0) return -1;
        int top = stack[size - 1];
        size--;
        return top;
    }

    public void increment(int k, int val) {
        int limit = Math.min(k, size);
        for (int i = 0; i < limit; i++) {
            stack[i] += val;
        }
    }
}

public class CustomStackDemo {
    public static void main(String[] args) {
        CustomStack stk = new CustomStack(3);
        stk.push(1);
        stk.push(2);
        System.out.println(stk.pop()); // 2
        stk.push(2);
        stk.push(3);
        stk.push(4); // ignored
        stk.increment(5, 100); 
        stk.increment(2, 100);
        System.out.println(stk.pop()); // 103
        System.out.println(stk.pop()); // 202
        System.out.println(stk.pop()); // 201
        System.out.println(stk.pop()); // -1
    }
}
