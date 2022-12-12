package com.starter.fullstack.rest;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.starter.fullstack.api.Inventory;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
public class InventoryControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private MongoTemplate mongoTemplate;

  @Autowired
  private ObjectMapper objectMapper;

  private Inventory inventory;


  @Before
  public void setup() throws Throwable {
    this.inventory = new Inventory();
    this.inventory.setId("ID");
    this.inventory.setName("TEST");
    //Sets the MongoId
    this.inventory = this.mongoTemplate.save(inventory);
  }

  @After
  public void teardown() {
    this.mongoTemplate.dropCollection(Inventory.class);
  }

  /**
   * Test createInventory method
   * @throws Throwable see MockMvc
   */
  @Test
  public void createTest() throws Throwable {
    this.inventory = new Inventory();
    this.inventory.setId("New ID");
    this.inventory.setName("Test 2");
    this.inventory.setNeverExpires(false);
    this.mockMvc.perform(post("/inventory")
        .accept(MediaType.APPLICATION_JSON)
        .contentType(MediaType.APPLICATION_JSON)
        .content(this.objectMapper.writeValueAsString(this.inventory)))
        .andExpect(status().isOk());
    
    Assert.assertEquals(2, this.mongoTemplate.findAll(Inventory.class).size());


  }
  /**
   * Test the deleteInventory method
   * @throws Throwable see MockMvc
   */
  @Test
  public void deleteTest() throws Throwable {
    this.mockMvc.perform(delete("/inventory")
      .accept(MediaType.APPLICATION_JSON)
      .contentType(MediaType.APPLICATION_JSON)
      .content(this.inventory.getId()))
      .andExpect(status().isOk());

    Assert.assertEquals(0, this.mongoTemplate.findAll(Inventory.class).size());
  }
  /**
   * Test the updateInventory method
   * @throws Throwable see MockMvc
   */
  @Test 
  public void updateTest() throws Throwable {
    this.inventory.setName("TestUpdate");
    this.mockMvc.perform(put("/inventory/")
      .accept(MediaType.APPLICATION_JSON)
      .contentType(MediaType.APPLICATION_JSON)
      .content(this.objectMapper.writeValueAsString(this.inventory)))
      .andExpect(status().isOk());

    Assert.assertEquals(this.inventory, this.mongoTemplate.find(new Query()
      .addCriteria(Criteria.where("id").is(this.inventory.getId())), Inventory.class).get(0));
  }

}

