Feature: Selecting items

Scenario: Select all items

   Given A multiselect widget without selected items
   When User clicks on the select all items button
   Then All items are added to the selected items list
      And All items are removed from the not selected items list

Scenario: Select one item

   Given A multiselect widget without selected items
   When User clicks on the item chekbox
   Then The item is added to the selected items list
      And The item is removed from the not selected items list