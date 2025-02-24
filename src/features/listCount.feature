Feature: Specificy Number of Events

  Scenario: When user has not specified a number, 32 events are shown by default.
    Given user on main page 
    When number in event count textbox default set to 32 
    Then the number of events displayed is exactly 32 events

  Scenario: User can change the number of events displayed
    Given clicks on textbox with event number count
    When user changes the number of events
    Then page displays number of events user prefers displayed