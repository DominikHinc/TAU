package org.example;

import java.util.HashMap;
import java.util.Map;

public class PaymentService {
    private Map<String, Double> payments = new HashMap<>();

    public boolean processPayment(String orderId, double amount) throws PaymentFailedException {
        if (amount > 0) {
            payments.put(orderId, amount);
            return true;
        }
        throw new PaymentFailedException("Payment failed for order: " + orderId);
    }

    public Double getPayment(String orderId) {
        return payments.get(orderId);
    }
}
