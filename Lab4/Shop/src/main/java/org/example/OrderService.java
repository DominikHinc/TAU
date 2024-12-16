package org.example;

import java.util.HashMap;
import java.util.Map;

public class OrderService {
    private PaymentService paymentService;
    private InventoryService inventoryService;
    private NotificationService notificationService;
    private Map<String, String> orders = new HashMap<>();

    public OrderService(PaymentService paymentService, InventoryService inventoryService, NotificationService notificationService) {
        this.paymentService = paymentService;
        this.inventoryService = inventoryService;
        this.notificationService = notificationService;
    }

    public boolean placeOrder(String orderId, String productId, int quantity, double amount) {
        try {
            if (validateOrder(productId, quantity, amount)) {
                boolean paymentProcessed = paymentService.processPayment(orderId, amount);
                if (paymentProcessed) {
                    orders.put(orderId, productId);
                    inventoryService.updateInventory(productId, quantity);
                    notificationService.notifyUser(orderId, "Order placed successfully");
                    return true;
                }
            }
        } catch (ProductUnavailableException | PaymentFailedException e) {
            notificationService.notifyUser(orderId, "Order placement failed: " + e.getMessage());
        }
        return false;
    }

    public boolean validateOrder(String productId, int quantity, double amount) throws ProductUnavailableException {
        boolean isAvailable = inventoryService.checkAvailability(productId, quantity);
        double totalPrice = inventoryService.getPrice(productId) * quantity;
        if (!isAvailable || amount < totalPrice) {
            notificationService.notifyUser(productId, "Order validation failed: Insufficient stock or payment amount");
            return false;
        }
        return true;
    }

    public String getOrder(String orderId) {
        return orders.get(orderId);
    }
}
