# SAP Sales Order Creation - Automated Testing

This project contains automated tests for creating sales orders in SAP Fiori using Playwright and Cucumber.

## Test Scenario

The test automates the creation of a standard sales order (Transaction VA01) with the following steps:

1. Login to SAP Fiori Launchpad
2. Navigate to Create Sales Orders (VA01) application
3. Fill initial sales order data (Order Type, Sales Org, Distribution Channel, Division)
4. Click Continue to proceed to the overview page
5. Fill header data including Customer Reference, Sold-to Party, Payment Terms
6. Add line item with Material, Quantity (Plant auto-populates)
7. Save the sales order
8. Verify successful creation with order number

## Successfully Tested Data

**Test Execution Date:** November 30, 2025
**Created Order Number:** 6006249

### Test Data Used:

- **Order Type:** OR
- **Sales Organization:** SOGE
- **Distribution Channel:** SD
- **Division:** SS
- **Customer Reference:** PO_tets
- **Customer Ref. Date:** 30.11.2025
- **Sold-to Party:** 15022
- **Ship-to Party:** 15022 (auto-populated)
- **Payment Terms:** 0001 (Pay immediately w/o deduction)
- **Material:** 1000059 (test-P2P & O2C)
- **Order Quantity:** 1 KG
- **Plant:** S100 (auto-populated from material master)

## Working Locators

### Login Page

```typescript
// User field
page.getByRole("textbox", { name: "User" });

// Password field
page.getByRole("textbox", { name: "Password" });

// Log On button
page.getByRole("button", { name: "Log On" });
```

### App Finder

```typescript
// Search box
page.getByRole("searchbox", { name: "Search in catalog" });

// Create Sales Orders VA01 option
page.getByRole("option", { name: "Create Sales Orders VA01" });
```

### Sales Order Creation (Inside iframe #application-SalesDocument-create)

```typescript
// Get iframe context
const iframe = page.locator("#application-SalesDocument-create").contentFrame();

// Initial Data Screen
iframe.getByRole("textbox", { name: "Order Type Required" });
iframe.getByRole("textbox", { name: "Sales Organization" });
iframe.getByRole("textbox", { name: "Distribution Channel" });
iframe.getByRole("textbox", { name: "Division" });
iframe.getByRole("button", { name: "Continue" });

// Header Data
iframe.getByRole("textbox", { name: "Cust. Reference" });
iframe.getByRole("textbox", { name: "Cust. Ref. Date" });
iframe.getByRole("textbox", { name: "Sold-To Party" });
iframe.getByRole("textbox", { name: "Ship-To Party" }); // Read-only, auto-populated
iframe.getByRole("textbox", { name: "Pyt Terms" });

// Line Item Grid
iframe.getByRole("button", { name: "Create Item" });
iframe
  .getByRole("gridcell")
  .filter({ has: page.locator("textbox") })
  .first()
  .locator("textbox");

// Save and Success
iframe.getByRole("button", { name: "Save" });
iframe.getByRole("note").filter({ hasText: "Standard Order" });
```

## Important Notes

### Field Behaviors

1. **Ship-To Party** - Auto-populates based on Sold-To Party (read-only)
2. **Payment Terms** - Becomes editable after double-clicking on a grid cell
3. **Plant** - Auto-populates from material master data
4. **Requested Delivery Date** - Auto-calculated based on system settings
5. **Net Value** - Calculated automatically (100.00 INR for this test)

### SAP-Specific Handling

- All SAP GUI elements are within an iframe (`#application-SalesDocument-create`)
- Use `.contentFrame()` to access iframe elements
- Wait times are critical for SAP's dynamic loading
- Grid interactions require specific cell activation patterns
- Some fields become editable only after certain actions

### Grid Data Entry Pattern

1. Double-click on any grid cell to activate edit mode
2. This enables the Payment Terms field
3. After filling Payment Terms, Material cell becomes active
4. Enter Material number and press Enter
5. System loads material details and activates Quantity field
6. Enter Quantity and press Enter
7. Plant auto-populates from material master

## Project Structure

```
.
├── features/
│   └── create-sales-order.feature          # Gherkin BDD scenarios
├── pages/
│   ├── sap-login-page.ts                   # Login page object
│   └── create-sales-order-page.ts          # Sales order page object
├── tests/
│   └── steps/
│       └── create-sales-order.steps.ts     # Cucumber step definitions
└── playwright.config.ts                     # Playwright configuration
```

## Running the Tests

```bash
# Install dependencies
npm install

# Run the tests
npx cucumber-js

# Run with Playwright
npx playwright test
```

## Test Results

✅ Login successful
✅ Navigation to VA01 successful
✅ Initial data filled (OR/SOGE/SD/SS)
✅ Continue button clicked
✅ Customer Reference filled (PO_tets)
✅ Customer Ref. Date filled (30.11.2025)
✅ Sold-to Party filled (15022)
✅ Ship-to Party auto-populated (15022)
✅ Payment Terms filled (0001)
✅ Material entered (1000059)
✅ Order Quantity filled (1 KG)
✅ Plant auto-populated (S100)
✅ Sales Order saved successfully
✅ Order Number generated: **6006249**

## Verification

The test includes assertions to verify:

- Success message is visible
- Order number is generated (numeric format)
- Message contains "Standard Order X has been saved"
- All required fields are populated
- Order can be retrieved with the generated order number

## Credentials

- **URL:** https://in-blr-s30.corp.capgemini.com:8001/sap/bc/ui2/flp#Shell-appfinder
- **Username:** Trainee19
- **Password:** Sandbox19@Sept

## Troubleshooting

### Common Issues

1. **Field not editable** - Some fields require specific activation steps (e.g., Payment Terms needs grid interaction)
2. **Timeout errors** - Increase wait times for slow SAP loading
3. **Iframe not found** - Ensure you're accessing elements within iframe context
4. **Grid cell not clickable** - Use double-click for grid activation

### Debug Tips

- Use `page.pause()` to inspect elements during test execution
- Check browser console for SAP-specific errors
- Verify iframe is loaded before accessing elements
- Use `page.waitForTimeout()` generously for SAP operations
