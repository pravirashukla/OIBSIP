import java.util.HashMap;
import java.util.Scanner;

public class SimpleAuth_System {
    private static HashMap<String, String> users = new HashMap<>();
    private static String loggedInUser = null;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int choice;

        while (true) {
            System.out.println("\n--- Simple Authentication System ---");
            System.out.println("1. Register");
            System.out.println("2. Login");
            System.out.println("3. Access Secured Page");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");

            choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    registerUser(scanner);
                    break;
                case 2:
                    loginUser(scanner);
                    break;
                case 3:
                    accessSecuredPage();
                    break;
                case 4:
                    System.out.println("Exiting... Goodbye!");
                    scanner.close();
                    System.exit(0);
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }


    private static void registerUser(Scanner scanner) {
        System.out.print("Enter a username: ");
        String username = scanner.nextLine();

        if (users.containsKey(username)) {
            System.out.println("Username already exists. Please choose a different username.");
            return;
        }

        System.out.print("Enter a password: ");
        String password = scanner.nextLine();

        users.put(username, password);
        System.out.println("Registration successful!");
    }

    private static void loginUser(Scanner scanner) {
        System.out.print("Enter your username: ");
        String username = scanner.nextLine();

        System.out.print("Enter your password: ");
        String password = scanner.nextLine();

        if (users.containsKey(username) && users.get(username).equals(password)) {
            loggedInUser = username;
            System.out.println("Login successful! Welcome, " + username + ".");
        } else {
            System.out.println("Invalid username or password. Please try again.");
        }
    }


    private static void accessSecuredPage() {
        if (loggedInUser == null) {
            System.out.println("Access denied. Please log in first.");
        } else {
            System.out.println("Welcome to the secured page, " + loggedInUser + "!");
        }
    }
}
