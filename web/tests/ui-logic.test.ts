import assert from "node:assert/strict";
import test from "node:test";
import { getActiveNavLabel, getMobileNavRevealClass, isActiveNavPath } from "../src/lib/navigation.ts";
import { buildPropertiesHref, countActivePropertyFilters, getPropertyFilterBadges } from "../src/lib/property-filters.ts";

test("isActiveNavPath matches root and nested property routes", () => {
  assert.equal(isActiveNavPath("/", "/"), true);
  assert.equal(isActiveNavPath("/properties/seafront-villa", "/properties"), true);
  assert.equal(isActiveNavPath("/contact", "/services"), false);
});

test("getActiveNavLabel returns the matched navigation label", () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Contact", href: "/contact" },
  ];

  assert.equal(getActiveNavLabel(navItems, "/properties/diani-villa"), "Properties");
  assert.equal(getActiveNavLabel(navItems, "/unknown"), "Home");
});

test("getMobileNavRevealClass gives consistent stagger classes", () => {
  assert.equal(getMobileNavRevealClass(0), "reveal-up reveal-delay-1");
  assert.equal(getMobileNavRevealClass(3), "reveal-up reveal-delay-4");
  assert.equal(getMobileNavRevealClass(7), "reveal-up");
});

test("property filter helpers count active state and format badges", () => {
  const filters = { query: " villa ", category: "sale", status: "available" };

  assert.equal(countActivePropertyFilters(filters), 3);
  assert.deepEqual(getPropertyFilterBadges(filters), ["Keyword: villa", "For sale", "Available"]);
});

test("buildPropertiesHref normalizes empty values and preserves valid filters", () => {
  assert.equal(buildPropertiesHref({}), "/properties");
  assert.equal(buildPropertiesHref({ query: " beach plot ", category: "sale" }), "/properties?q=beach+plot&category=sale");
  assert.equal(buildPropertiesHref({ query: "", category: "invalid", status: "available" }), "/properties?status=available");
});