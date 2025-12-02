public class Reverse_integer {
    public int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int digit = x % 10;
            x /= 10;

            // check for overflow
            if (rev > Integer.MAX_VALUE / 10 || (rev == Integer.MAX_VALUE / 10 && digit > 7)) {
                return 0;
            }
            if (rev < Integer.MIN_VALUE / 10 || (rev == Integer.MIN_VALUE / 10 && digit < -8)) {
                return 0;
            }

            rev = rev * 10 + digit;
        }
        return rev;
    }

    public static void main(String[] args) {
        Reverse_integer sol = new Reverse_integer();

        System.out.println(sol.reverse(123));   // Output: 321
        System.out.println(sol.reverse(-123));  // Output: -321
        System.out.println(sol.reverse(120));   // Output: 21
        System.out.println(sol.reverse(1534236469)); // Output: 0 (overflow)
    }
}
```// filepath: /home/calystus/Vscode/JavaProjects/Reverse_integer.java
public class Reverse_integer {
    public int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int digit = x % 10;
            x /= 10;

            // check for overflow
            if (rev > Integer.MAX_VALUE / 10 || (rev == Integer.MAX_VALUE / 10 && digit > 7)) {
                return 0;
            }
            if (rev < Integer.MIN_VALUE / 10 || (rev == Integer.MIN_VALUE / 10 && digit < -8)) {
                return 0;
            }

            rev = rev * 10 + digit;
        }
        return rev;
    }

    public static void main(String[] args) {
        Reverse_integer sol = new Reverse_integer();

        System.out.println(sol.reverse(123));   // Output: 321
        System.out.println(sol.reverse(-123));  // Output: -321
        System.out.println(sol.reverse(120));   // Output: 21
        System.out.println(sol.reverse(1534236469)); // Output: 0 (overflow)
    }
}