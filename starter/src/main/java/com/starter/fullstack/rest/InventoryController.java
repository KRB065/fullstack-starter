package com.starter.fullstack.rest;

import com.starter.fullstack.api.Inventory;
import com.starter.fullstack.dao.InventoryDAO;
import java.util.List;
import java.util.Optional;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Inventory Controller.
 */
@RestController
@RequestMapping("/inventory")
public class InventoryController {
  private final InventoryDAO inventoryDAO;

  /**
   * Default Constructor.
   * @param inventoryDAO inventoryDAO.
   */
  public InventoryController(InventoryDAO inventoryDAO) {
    Assert.notNull(inventoryDAO, "Inventory DAO must not be null.");
    this.inventoryDAO = inventoryDAO;
  }

  /**
   * Find Products.
   * @return List of Product.
   */
  @GetMapping
  public List<Inventory> findInventories() {
    return this.inventoryDAO.findAll();
  }
  /**
   * Create Inventory
   * @param inventory inventory
   * @return inventory after create
   */
  @PostMapping
  public Inventory createInventory(Inventory inventory) {
    return this.inventoryDAO.create(inventory);
  }
  /**
   * Delete Inventory
   * @param id id of inventory
   * @return deleted inventory
   */
  @DeleteMapping()
  public Optional<Inventory> deleteInventory(@RequestBody String id) {
    Assert.notNull(id, "id must not be empty");
    return this.inventoryDAO.delete(id);
  }


}

