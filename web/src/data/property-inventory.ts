import { properties } from "@/data/properties";
import type { Property, PropertyPayload } from "@/types/property";

function cloneProperty(property: Property): Property {
  return {
    ...property,
    features: property.features.map((feature) => ({ ...feature })),
    amenities: [...property.amenities],
    images: [...property.images],
    coordinates: { ...property.coordinates },
    agent: { ...property.agent },
  };
}

function createLocalPropertyId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// In Next.js dev mode, files are re-evaluated on HMR.
// We use globalThis to persist the inventory across reloads for a better admin experience.
const GLOBAL_INVENTORY_KEY = "__ALEXIANT_PROPERTY_INVENTORY__";
const globalAny = globalThis as any;

if (!globalAny[GLOBAL_INVENTORY_KEY] || globalAny[GLOBAL_INVENTORY_KEY].length < properties.length) {
  globalAny[GLOBAL_INVENTORY_KEY] = properties.map(cloneProperty);
}

const getInventory = (): Property[] => globalAny[GLOBAL_INVENTORY_KEY];
const setInventory = (newInventory: Property[]) => {
  globalAny[GLOBAL_INVENTORY_KEY] = newInventory;
};

export function listPropertyInventory() {
  return getInventory().map(cloneProperty);
}

export function getPropertyInventoryById(id: string) {
  const property = getInventory().find((item) => item.id === id);
  return property ? cloneProperty(property) : null;
}

export function getPropertyInventoryBySlug(slug: string) {
  const property = getInventory().find((item) => item.slug === slug);
  return property ? cloneProperty(property) : null;
}

export function createPropertyInventoryItem(payload: PropertyPayload) {
  const property: Property = {
    id: createLocalPropertyId(),
    ...payload,
  };

  setInventory([property, ...getInventory()]);
  return cloneProperty(property);
}

export function updatePropertyInventoryItem(id: string, payload: PropertyPayload) {
  const inventory = getInventory();
  const index = inventory.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const updatedProperty: Property = {
    id,
    ...payload,
  };

  setInventory(inventory.map((item, itemIndex) => (itemIndex === index ? updatedProperty : item)));
  return cloneProperty(updatedProperty);
}

export function deletePropertyInventoryItem(id: string) {
  const inventory = getInventory();
  const previousLength = inventory.length;
  const newInventory = inventory.filter((item) => item.id !== id);
  setInventory(newInventory);
  return newInventory.length < previousLength;
}