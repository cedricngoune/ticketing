import { Publisher, Subjects, TicketCreatedEvent } from "@gotickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
