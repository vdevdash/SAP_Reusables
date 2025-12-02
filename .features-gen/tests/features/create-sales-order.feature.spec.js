// Generated from: tests\features\create-sales-order.feature
import { test } from "playwright-bdd";

test.describe('Create Sales Order in SAP', () => {

  test('Create a standard sales order', async ({ Given, When, Then, And, page }) => { 
    await Given('I am logged into SAP with username "Trainee19" and password "Sandbox19@Sept"', null, { page }); 
    await And('I navigate to Create Sales Orders application', null, { page }); 
    await When('I fill the sales order initial data', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Order Type"},{"value":"OR"}]},{"cells":[{"value":"Sales Org"},{"value":"SOGE"}]},{"cells":[{"value":"Distr Channel"},{"value":"SD"}]},{"cells":[{"value":"Division"},{"value":"SS"}]}]}}); 
    await And('I click Continue'); 
    await Then('I should see the sales order overview page', null, { page }); 
    await When('I fill the header data', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Cust Reference"},{"value":"PO_test"}]},{"cells":[{"value":"Cust Ref Date"},{"value":"02.12.2025"}]},{"cells":[{"value":"Sold-to pt"},{"value":"15022"}]},{"cells":[{"value":"Ship-to pt"},{"value":"15022"}]},{"cells":[{"value":"Date"},{"value":"02.12.2025"}]},{"cells":[{"value":"Payment"},{"value":"0001"}]}]}}); 
    await And('I add an item with the following data', {"dataTable":{"rows":[{"cells":[{"value":"Field"},{"value":"Value"}]},{"cells":[{"value":"Material"},{"value":"1000059"}]},{"cells":[{"value":"Order Quantity"},{"value":"1"}]},{"cells":[{"value":"Plant"},{"value":"S100"}]}]}}); 
    await And('I save the sales order'); 
    await Then('the sales order should be created successfully', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\features\\create-sales-order.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am logged into SAP with username \"Trainee19\" and password \"Sandbox19@Sept\"","stepMatchArguments":[{"group":{"start":35,"value":"\"Trainee19\"","children":[{"start":36,"value":"Trainee19","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"\"Sandbox19@Sept\"","children":[{"start":61,"value":"Sandbox19@Sept","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"And I navigate to Create Sales Orders application","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When I fill the sales order initial data","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"And I click Continue","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then I should see the sales order overview page","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When I fill the header data","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"And I add an item with the following data","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"And I save the sales order","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then the sales order should be created successfully","stepMatchArguments":[]}]},
]; // bdd-data-end