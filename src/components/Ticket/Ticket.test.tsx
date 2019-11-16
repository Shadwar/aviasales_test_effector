import React from 'react';
import ReactDOM from 'react-dom';
import Ticket from './Ticket.view';
import TicketSegment from './TicketSegment.view';
import { NormalizedSegment, NormalizedTicket } from "../../models/NormalizedTicket";


describe('components/Ticket', () => {
  describe('Ticket', () => {
    it('renders without crashing', () => {
      const ticket: NormalizedTicket = {
        price: [10, '10'],
        carrier: 'Test',
        segments: [
          {
            direction: ['label', 'Value'],
            stops: [0, 'label', 'value'],
            duration: [0, 'label', 'value'],
          },
          {
            direction: ['label', 'Value'],
            stops: [0, 'label', 'value'],
            duration: [0, 'label', 'value'],
          }
        ]
      };

      const div = document.createElement('div');
      ReactDOM.render(<Ticket {...ticket} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe('TicketSegment', () => {
    it('renders without crashing', () => {
      const segment: NormalizedSegment = {
        direction: ['label', 'value'],
        stops: [0, 'label', 'value'],
        duration: [0, 'label', 'value'],
      };

      const div = document.createElement('div');
      ReactDOM.render(<TicketSegment {...segment} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});

