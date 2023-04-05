const eventsList = [];

const resolverDetails = {
  events: (_arguments) => {
    return eventsList;
  },
  createEvent: (_arguments) => {
    const eventDetails = _arguments.eventInput;
    const createEventDetails = {
      _id: Math.random().toString(),
      name: eventDetails.name,
      description: eventDetails.description,
      price: eventDetails.price,
    };
    eventsList.push(createEventDetails);
    return createEventDetails;
  },
};

export { resolverDetails };
