import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import mockData from '../mock-data';
import App from '../App';
import React from 'react';
const feature = loadFeature('./src/features/displayEvent.feature');

defineFeature(feature, (test) => {
  test('Details of Event is hidden by default', ({ given, when, then }) => {
    let detailsContainer;

    given('user is on default homepage', async () => {
      render(<App events={mockData} />);
      const eventListItems = await screen.findAllByRole('listitem');
      expect(eventListItems.length).toBeGreaterThan(0);

      detailsContainer = within(eventListItems[0]).getByTestId('Details');
    });

    when('has not toggled button on event details', async () => {
      const DetailsButton = within(detailsContainer).getByRole('button', { name: 'show details' });
    });

    then('event details hidden', async () => {
      const detailParagraph = within(detailsContainer).queryByRole('paragraph');
      expect(detailParagraph).toBeNull();
    });
  });

  test('Show event details', ({ given, when, then }) => {
    let detailsContainer;

    given('the user is viewing the EventList', async () => {
      render(<App events={mockData} />);
      const eventListItems = await screen.findAllByRole('listitem');
      expect(eventListItems.length).toBeGreaterThan(0);

      detailsContainer = within(eventListItems[0]).getByTestId('Details');
    });

    when(/^the user clicks on the "(.*)" button for information about the event$/, async (arg0) => {
      const showDetailsButton = within(detailsContainer).getByRole('button', { name: 'show details' });
      fireEvent.click(showDetailsButton);

      // Wait for the paragraph to appear
      const detailParagraph = await waitFor(() =>
        within(detailsContainer).getByRole('paragraph')
      );
      expect(detailParagraph).toBeInTheDocument();
    });

    then('the event details should be displayed for that event', async () => {
      const detailParagraph = within(detailsContainer).getByRole('paragraph');
      expect(detailParagraph).toBeInTheDocument();
    });
  });

  test('Hide event details', ({ given, when, then }) => {
    let detailsContainer;

    given('the event details are displayed for an event', async () => {
      render(<App events={mockData} />);
      const eventListItems = await screen.findAllByRole('listitem');
      expect(eventListItems.length).toBeGreaterThan(0);

      detailsContainer = within(eventListItems[0]).getByTestId('Details');
      const showDetailsButton = within(detailsContainer).getByRole('button', { name: 'show details' });
      fireEvent.click(showDetailsButton);

      // Verify paragraph is visible
      const detailParagraph = await waitFor(() =>
        within(detailsContainer).getByRole('paragraph')
      );
      expect(detailParagraph).toBeInTheDocument();
    });

    when('the user clicks on the "Hide Details" button to hide event', async () => {
      const hideDetailsButton = within(detailsContainer).getByRole('button', { name: 'hide details' });
      fireEvent.click(hideDetailsButton);
    });

    then('the event details should be hidden for that event', async () => {
      const detailParagraph = within(detailsContainer).queryByRole('paragraph');
      expect(detailParagraph).toBeNull();
    });
  });
});