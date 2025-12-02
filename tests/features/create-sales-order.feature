Feature: Create Sales Order in SAP
  As a sales user
  I want to create a sales order in SAP
  So that I can process customer orders

  Scenario: Create a standard sales order
    Given I am logged into SAP with username "Trainee19" and password "Sandbox19@Sept"
    And I navigate to Create Sales Orders application
    When I fill the sales order initial data
      | Field         | Value |
      | Order Type    | OR    |
      | Sales Org     | SOGE  |
      | Distr Channel | SD    |
      | Division      | SS    |
    And I click Continue
    Then I should see the sales order overview page
    When I fill the header data
      | Field          | Value      |
      | Cust Reference | PO_test    |
      | Cust Ref Date  | 02.12.2025 |
      | Sold-to pt     |      15022 |
      | Ship-to pt     |      15022 |
      | Date           | 02.12.2025 |
      | Payment        |       0001 |
    And I add an item with the following data
      | Field          | Value   |
      | Material       | 1000059 |
      | Order Quantity |       1 |
      | Plant          | S100    |
    And I save the sales order
    Then the sales order should be created successfully

# @sales-order
# Feature: Create Sales Order in SAP

#   Background:
#     Given I navigate to SAP Fiori Launchpad

#   @smoke @positive
#   Scenario: Create a standard sales order with line items
#     Given I am logged in to SAP with username "Trainee19" and password "Sandbox19@Sept"
#     When I navigate to Create Sales Orders VA01 application
#     And I fill the initial order data with order type "OR" and sales org "SOGE" distribution channel "SD" and division "SS"
#     And I click Continue button
#     And I fill the header data with:
#       | field          | value      |
#       | Sold-To Party  | 15022      |
#       | Ship-To Party  | 15022      |
#       | Cust. Reference| PO_test    |
#       | Cust. Ref. Date| 26.11.2025 |
#       | Payment Terms  | 0001       |
#     And I fill the line item data with:
#       | Material | Order Quantity | Req. Deliv. Date | Plant |
#       | 1000059  | 1              | 15.12.2025       | S100  |
#     And I click Save button
#     Then the sales order should be created successfully
#     And I should see a success message containing "has been saved"
