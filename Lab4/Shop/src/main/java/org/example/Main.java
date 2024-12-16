package org.example;

import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        PaymentService paymentService = new PaymentService();
        
        Map<String, Integer> initialInventory = new HashMap<>();
        initialInventory.put("testProduct", 10);
        
        Map<String, Double> initialPrices = new HashMap<>();
        initialPrices.put("testProduct", 50.0);
        
        InventoryService inventoryService = new InventoryService(initialInventory, initialPrices);
        
        NotificationService notificationService = new NotificationService();
        OrderService orderService = new OrderService(paymentService, inventoryService, notificationService);

        orderService.placeOrder("testOrder", "testProduct", 2, 100.0);
    }
}