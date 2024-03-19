import { Publisher, Subjects, TicketUpdatedEvent } from "@gotickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
