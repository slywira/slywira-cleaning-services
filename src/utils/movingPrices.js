export const MOVE_OUT_HOUSE_PRICES = [
  { id: "single-room", label: "Single room", minimum: 5000, maximum: 8000 },
  { id: "bedsitter-studio", label: "Bedsitter / Studio", minimum: 8000, maximum: 15000 },
  { id: "1-bedroom", label: "1 Bedroom House", minimum: 15000, maximum: 22000 },
  { id: "2-bedroom", label: "2 Bedroom House", minimum: 25000, maximum: 35000 },
  { id: "3-bedroom", label: "3 Bedroom House", minimum: 35000, maximum: 50000 },
  { id: "4-bedroom", label: "4 Bedroom House", minimum: 50000, maximum: 70000, maximumPlus: true },
];

export const MOVE_OUT_ADDITIONAL_SERVICES = [
  { id: "packing", label: "Packing services", minimum: 2500, maximum: 8000 },
  { id: "unpacking", label: "Unpacking services", minimum: 2000, maximum: 5000 },
  { id: "dismantling", label: "Furniture dismantling", minimum: 1500, maximum: 4000 },
  { id: "assembly", label: "Furniture assembly", minimum: 1500, maximum: 4000 },
  { id: "loading-offloading", label: "Loading and offloading", minimum: 2000, maximum: 5000 },
  { id: "cleaning-after-moving-out", label: "Deep cleaning after moving out", minimum: 3000, maximum: 10000 },
  { id: "cleaning-at-new-house", label: "Deep cleaning at new house", minimum: 3000, maximum: 10000 },
];

export function getMoveOutQuote(houseType, additionalServiceIds = []) {
  const housePrice = MOVE_OUT_HOUSE_PRICES.find((item) => item.id === houseType);
  if (!housePrice) {
    throw new Error(`Unknown move-out house type: ${houseType}`);
  }

  return additionalServiceIds.reduce(
    (quote, serviceId) => {
      const service = MOVE_OUT_ADDITIONAL_SERVICES.find((item) => item.id === serviceId);
      if (!service) {
        throw new Error(`Unknown move-out additional service: ${serviceId}`);
      }

      return {
        minimum: quote.minimum + service.minimum,
        maximum: quote.maximum + service.maximum,
        maximumPlus: quote.maximumPlus,
      };
    },
    {
      minimum: housePrice.minimum,
      maximum: housePrice.maximum,
      maximumPlus: Boolean(housePrice.maximumPlus),
    }
  );
}
