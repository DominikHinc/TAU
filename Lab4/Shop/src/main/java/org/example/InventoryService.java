package org.example;

import java.util.HashMap;
import java.util.Map;

public class InventoryService {
    private Map<String, Integer> inventory;
    private Map<String, Double> prices;

    public InventoryService(Map<String, Integer> initialInventory, Map<String, Double> initialPrices) {
        this.inventory = new HashMap<>(initialInventory);
        this.prices = new HashMap<>(initialPrices);
    }

    public boolean checkAvailability(String productId, int quantity) throws ProductUnavailableException {
        if (!inventory.containsKey(productId)) {
            throw new ProductUnavailableException("Product does not exist: " + productId);
        }
        if (inventory.get(productId) < quantity) {
            throw new ProductUnavailableException("Insufficient stock for product: " + productId);
        }
        return true;
    }

    public void updateInventory(String productId, int quantity) {
        if (inventory.containsKey(productId)) {
            inventory.put(productId, inventory.get(productId) - quantity);
        }
    }

    public double getPrice(String productId) throws ProductUnavailableException {
        if (!prices.containsKey(productId)) {
            throw new ProductUnavailableException("Price not available for product: " + productId);
        }
        return prices.get(productId);
    }
}
