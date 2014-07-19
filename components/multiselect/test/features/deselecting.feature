Feature: Deselecting items

Scenario: Deselect all items

   Given A multiselect widget with selected items 
   When User clicks on the deselect all items button
   Then All items are removed from the selected items list
      And All items are returned to the not selected items list

Scenario: Deselect one item

   Given A multiselect widget with selected items
   When User clicks on the selected item checkbox
   Then The item is removed from the selected items list
      And The item is returned to the not selected items list