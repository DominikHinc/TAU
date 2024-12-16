package org.example;

public class NotificationService {
    public void notifyUser(String orderId, String message) {
        System.out.println(createUserMessage(orderId, message));
    }

    public String createUserMessage(String orderId, String message) {
        return "User message for Order " + orderId + ": " + message;
    }
}
