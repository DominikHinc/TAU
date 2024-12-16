package org.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OrderServiceTest {
    private PaymentService paymentService;
    private InventoryService inventoryService;
    private NotificationService notificationService;
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        paymentService = mock(PaymentService.class);
        inventoryService = mock(InventoryService.class);
        notificationService = mock(NotificationService.class);
        orderService = new OrderService(paymentService, inventoryService, notificationService);
    }

    @Test
    @DisplayName("Test successful order placement")
    void testPlaceOrderSuccess() throws Exception {
        String orderId = "testOrder";
        String productId = "testProduct";
        int quantity = 2;
        double amount = 100.0;
        double price = 50.0;

        when(inventoryService.checkAvailability(productId, quantity)).thenReturn(true);
        when(inventoryService.getPrice(productId)).thenReturn(price);
        when(paymentService.processPayment(orderId, amount)).thenReturn(true);

        boolean result = orderService.placeOrder(orderId, productId, quantity, amount);

        assertTrue(result);
        verify(inventoryService).updateInventory(productId, quantity);
        verify(notificationService).notifyUser(orderId, "Order placed successfully");
    }

    @Test
    @DisplayName("Test order placement when product is unavailable")
    void testPlaceOrderProductUnavailable() throws Exception {
        String orderId = "testOrder";
        String productId = "testProduct";
        int quantity = 2;
        double amount = 100.0;

        when(inventoryService.checkAvailability(productId, quantity)).thenThrow(new ProductUnavailableException("Product does not exist"));

        boolean result = orderService.placeOrder(orderId, productId, quantity, amount);

        assertFalse(result);
        verify(notificationService).notifyUser(orderId, "Order placement failed: Product does not exist");
    }

    @Test
    @DisplayName("Test order placement when payment fails due to insufficient funds")
    void testPlaceOrderPaymentFailed() throws Exception {
        String orderId = "testOrder";
        String productId = "testProduct";
        int quantity = 2;
        double amount = 50.0; // Insufficient funds
        double price = 100.0;

        when(inventoryService.checkAvailability(productId, quantity)).thenReturn(true);
        when(inventoryService.getPrice(productId)).thenReturn(price);

        boolean result = orderService.placeOrder(orderId, productId, quantity, amount);

        assertFalse(result);
        verify(notificationService).notifyUser(productId, "Order validation failed: Insufficient stock or payment amount");
    }

    @Test
    @DisplayName("Test order placement when payment throws an exception")
    void testPlaceOrderPaymentException() throws Exception {
        String orderId = "testOrder";
        String productId = "testProduct";
        int quantity = 2;
        double amount = -100.0; // Negative amount
        double price = -150.0;

        when(inventoryService.checkAvailability(productId, quantity)).thenReturn(true);
        when(inventoryService.getPrice(productId)).thenReturn(-150.0);
        when(paymentService.processPayment(orderId, amount)).thenThrow(new PaymentFailedException("Payment failed"));

        boolean result = orderService.placeOrder(orderId, productId, quantity, amount);

        assertFalse(result);
        verify(notificationService).notifyUser(orderId, "Order placement failed: Payment failed");
    }
}